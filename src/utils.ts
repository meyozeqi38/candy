import { PublicKey } from "@solana/web3.js";
import { getAssociatedTokenAddress } from "@solana/spl-token";
import {
    AddressLookupTableProgram,
    Connection,
    SystemProgram,
    SYSVAR_RENT_PUBKEY,
    Transaction,
    sendAndConfirmTransaction,
    Keypair,
} from "@solana/web3.js";

/**
 * Get token account address
 * @param mint Token mint address
 * @param owner Owner address
 * @returns Token account address
 */
export async function getTokenAccount(mint: PublicKey, owner: PublicKey): Promise<PublicKey> {
    return await getAssociatedTokenAddress(mint, owner);
}

/**
 * Get liquidity pool PDA address
 * @param programId Program ID
 * @param mint Token mint address
 * @returns Liquidity pool address
 */
export async function getLiquidityPoolAddress(programId: PublicKey, mint: PublicKey): Promise<[PublicKey, number]> {
    return PublicKey.findProgramAddressSync(
        [Buffer.from("liquidity_pool"), mint.toBuffer()],
        programId
    );
}

/**
 * Get cashier PDA address
 * @param programId Program ID
 * @returns Cashier address
 */
export async function getCashierAddress(programId: PublicKey): Promise<[PublicKey, number]> {
    return PublicKey.findProgramAddressSync(
        [Buffer.from("cashier")],
        programId
    );
}

/**
 * Create and initialize Address Lookup Table
 * @param connection Solana connection instance
 * @param payer Payer keypair
 * @param slot Current slot
 * @returns Address Lookup Table address
 */
export async function createAddressLookupTable(
    connection: Connection,
    payer: Keypair,
    slot: number,
): Promise<PublicKey> {
    // Create a new Address Lookup Table account
    const [createIx, lookupTableAddress] = AddressLookupTableProgram.createLookupTable({
        authority: payer.publicKey,
        payer: payer.publicKey,
        recentSlot: slot,
    });

    // Create and send transaction
    const tx = new Transaction().add(createIx);
    await sendAndConfirmTransaction(connection, tx, [payer], {
        commitment: 'confirmed',
        preflightCommitment: 'confirmed',
    });

    return lookupTableAddress;
}

/**
 * Add addresses to Address Lookup Table
 * @param connection Solana connection instance
 * @param payer Payer keypair
 * @param lookupTableAddress Address Lookup Table address
 * @param addresses Addresses to add
 */
export async function extendAddressLookupTable(
    connection: Connection,
    payer: Keypair,
    lookupTableAddress: PublicKey,
    addresses: PublicKey[],
): Promise<void> {
    // Create extension instruction
    const extendIx = AddressLookupTableProgram.extendLookupTable({
        payer: payer.publicKey,
        authority: payer.publicKey,
        lookupTable: lookupTableAddress,
        addresses: addresses,
    });

    // Create and send transaction
    const tx = new Transaction().add(extendIx);
    await sendAndConfirmTransaction(connection, tx, [payer], {
        commitment: 'confirmed',
        preflightCommitment: 'confirmed',
    });
}

/**
 * Get or create Address Lookup Table for Swap operation
 * @param connection Solana connection instance
 * @param payer Payer keypair
 * @param programId Program ID
 * @param mint Token mint address
 * @returns Address Lookup Table address and whether it is newly created
 */
export async function getOrCreateSwapLookupTable(
    connection: Connection,
    payer: Keypair,
    programId: PublicKey,
    mint: PublicKey,
): Promise<{ address: PublicKey; isNew: boolean }> {
    // Calculate lookup table seed
    const seed = `swap_${mint.toBase58()}`;
    const derivedAddress = PublicKey.findProgramAddressSync(
        [Buffer.from(seed)],
        programId
    )[0];

    // Try to get existing lookup table
    const existingTable = await connection.getAddressLookupTable(derivedAddress).then(res => res.value);
    if (existingTable) {
        return { address: derivedAddress, isNew: false };
    }

    // If not found, create new lookup table
    const slot = await connection.getSlot();
    const lookupTableAddress = await createAddressLookupTable(connection, payer, slot);

    // Get required account addresses
    const [dexCfgAccount] = PublicKey.findProgramAddressSync(
        [Buffer.from("CurveConfiguration")],
        programId
    );

    const [pool] = await getLiquidityPoolAddress(programId, mint);
    const [liquidityAccount] = PublicKey.findProgramAddressSync(
        [Buffer.from("liquidity_account"), mint.toBuffer()],
        programId
    );
    const [cashier] = await getCashierAddress(programId);

    const poolTokenAccount = await getAssociatedTokenAddress(mint, pool, true);

    // Add addresses to lookup table
    const addresses = [
        dexCfgAccount,
        pool,
        liquidityAccount,
        mint,
        poolTokenAccount,
        cashier,
        SYSVAR_RENT_PUBKEY,
        SystemProgram.programId,
    ];

    await extendAddressLookupTable(connection, payer, lookupTableAddress, addresses);

    // Wait for lookup table to be ready
    await new Promise(resolve => setTimeout(resolve, 2000));

    return { address: lookupTableAddress, isNew: true };
} 