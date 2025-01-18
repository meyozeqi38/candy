import { ComputeBudgetProgram, Connection, Keypair, PublicKey, Transaction } from "@solana/web3.js";
import { BN } from "bn.js";
import { AnchorProvider,Wallet } from "@coral-xyz/anchor";
import CandySDK from "./index";
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";
import dotenv from 'dotenv';

dotenv.config();

async function main() {
    const connection = new Connection("https://devnet.helius-rpc.com/?api-key=e6a535c8-ab44-42c7-b60c-02a36d2fe73d", "confirmed");
    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
        throw new Error("SECRET_KEY is required in environment variables");
    }
    const keypair = Keypair.fromSecretKey(bs58.decode(process.env.SECRET_KEY!));
    const provider = new AnchorProvider(
        connection,
        new Wallet(keypair),
        { commitment: "confirmed" }
    );

    const programId = new PublicKey("FhMqMYk6qy76gLC6ZnDahu25783M7jP47UiXLtz7qJdH");
    const sdk = new CandySDK(programId, provider);

    try {
        const mintKeypair = Keypair.generate();
        const { mint, instructions } = await sdk.createMint(
            "mint",
            "MTK",
            "",
            9,
            keypair.publicKey,
            mintKeypair.publicKey
        );

        // Add priority fee instructions
        instructions.push(
            ComputeBudgetProgram.setComputeUnitLimit({
                units: 800_000,
            }),
            ComputeBudgetProgram.setComputeUnitPrice({
                microLamports: 50000n,
            }),
        );
        // Get latest blockhash
        const transaction = new Transaction();
        transaction.add(...instructions);
        const latestBlockhash = await connection.getLatestBlockhash();
        transaction.recentBlockhash = latestBlockhash.blockhash;
        transaction.feePayer = keypair.publicKey;

        // Sign and send transaction
        transaction.sign(mintKeypair, keypair);
        await connection.simulateTransaction(transaction);
        console.log("send create tx.....");
        const txId = await connection.sendRawTransaction(transaction.serialize());
        await connection.confirmTransaction(txId);

        console.log("Token created:", txId);
        console.log("Mint address:", mint.toBase58());

        // Execute swap
        console.log("\nPerforming swap...");
        const amount = new BN(1_000_000_000); // 1 SOL
        const { instructions: swapTx } = await sdk.swap(
            mint,
            amount,
            keypair.publicKey,
            new BN(0) // Buy direction
        );
        // Add priority fee instructions
        swapTx.push(
            ComputeBudgetProgram.setComputeUnitLimit({
                units: 800_000,
            }),
            ComputeBudgetProgram.setComputeUnitPrice({
                microLamports: 50000n,
            }),
        );
        const hash = await connection.getLatestBlockhash();
        const transaction2   = new Transaction();
        transaction2.add(...swapTx);
        transaction2.recentBlockhash = hash.blockhash;
        transaction2.feePayer = keypair.publicKey;

        // Sign transaction
        transaction2.sign(keypair);

        // Send transaction
        await connection.simulateTransaction(transaction2);
        console.log("send swap tx.....");
        const swapTxId = await connection.sendRawTransaction(transaction2.serialize());
        await connection.confirmTransaction(swapTxId);

        console.log("Swap completed:", swapTxId);

        // Get pool information
        console.log("\nGetting pool info...");
        const poolInfo = await sdk.getPoolInfo(mint);
        console.log("Pool info:", poolInfo);

    } catch (error) {
        console.error("Error:", error);
    }
}

if (require.main === module) {
    main();
}
