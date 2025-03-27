import * as anchor from "@coral-xyz/anchor";
import { AnchorProvider, Program, web3 } from "@coral-xyz/anchor";
import { PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY, Transaction, TransactionInstruction } from "@solana/web3.js";
import BN from 'bn.js';
import {
    TOKEN_PROGRAM_ID,
    getAssociatedTokenAddress,
    ASSOCIATED_TOKEN_PROGRAM_ID,
    createAssociatedTokenAccountInstruction,
    NATIVE_MINT,
    getAssociatedTokenAddressSync,
} from "@solana/spl-token";
import { getLiquidityPoolAddress, getCashierAddress } from "./utils";
import { IDL, Candy } from "./idl/types";
import { CREATE_CPMM_POOL_FEE_ACC, CREATE_CPMM_POOL_PROGRAM, DEVNET_PROGRAM_ID, getCpmmPdaAmmConfigId, Raydium } from '@raydium-io/raydium-sdk-v2'

export interface InitTokenParams {
    name: string;
    symbol: string;
    uri: string;
    decimals: number;
}

export * from "./utils";

const SWAP_THRESHOLD = 30_000_000_000; // 30 SOL in lamports

export interface ProjectInfo {
    currentPrice: {
        reserveOne: BN;  // token amount
        reserveTwo: BN;  // sol amount
    };
    progress: number;  // progress percentage 0-100
    liquidity: number; // liquidity amount
}

export class CandySDK {
    private program: Program<Candy>;
    private provider: AnchorProvider;
    private raydium: Raydium | undefined;
    private cluster = "mainnet"; //  'mainnet' | 'devnet'
    constructor(
        programId: PublicKey,
        provider: AnchorProvider
    ) {
        this.program = new anchor.Program(IDL, programId, provider) as Program<Candy>;
        this.provider = provider;
    }

    /**
     * Create new token
     * @param name Token name
     * @param symbol Token symbol
     * @param uri Token URI
     * @param decimals Decimal places
     * @param creator Creator public key
     * @param mintPk Token mint public key
     * @param swapFee Swap fee
     * @param swapAdmin Swap admin public key
     * @returns Transaction to be signed and related account information
     */
    async createMint(
        name: string,
        symbol: string,
        uri: string,
        decimals: number,
        creator: PublicKey,
        mintPk: PublicKey,
        swapAdmin?: PublicKey,
        swapFee: number = 0
    ): Promise<{
        instructions: Array<TransactionInstruction>;
        mint: PublicKey;
        pool: PublicKey;
        tokenAccount: PublicKey;
        liquidityAta: PublicKey;
    }> {
        const [pool] = web3.PublicKey.findProgramAddressSync(
            [Buffer.from("liquidity_pool"), mintPk.toBuffer()],
            this.program.programId
        );

        const [dexCfgAccount] = web3.PublicKey.findProgramAddressSync(
            [Buffer.from("CurveConfiguration")],
            this.program.programId
        );

        const [cashier] = web3.PublicKey.findProgramAddressSync(
            [Buffer.from("cashier")],
            this.program.programId
        )
        const [liquidityAccount] = web3.PublicKey.findProgramAddressSync(
            [Buffer.from("liquidity_account"), mintPk.toBuffer()],
            this.program.programId
        );

        const token_account = await getAssociatedTokenAddress(
            mintPk,
            liquidityAccount,
            true
        );

        const tokenMetadataProgram = new web3.PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");
        const [metadataKeyPair] = anchor.web3.PublicKey.findProgramAddressSync(
            [Buffer.from("metadata"), tokenMetadataProgram.toBuffer(), mintPk.toBuffer()],
            tokenMetadataProgram
        );

        const tx = new web3.Transaction();
        tx.add(await this.program.methods.initialize(new BN(swapFee))
            .accounts({
                admin: creator,
                systemProgram: web3.SystemProgram.programId,
                tokenProgram: TOKEN_PROGRAM_ID,
                mint: mintPk,
                associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
                dexConfigurationAccount: dexCfgAccount,
                swapAdmin: swapAdmin,
            }).instruction()
        );

        // create liquidity account token associated account
        tx.add(createAssociatedTokenAccountInstruction(
            creator,
            token_account,
            liquidityAccount, //owner
            mintPk,
            TOKEN_PROGRAM_ID,
            ASSOCIATED_TOKEN_PROGRAM_ID
        ));

        // 添加创建代币指令
        const createIx = await this.program.methods
            .createMint({
                name: name, symbol: symbol, uri: uri,
                decimals: decimals,
            })
            .accounts({
                mint: mintPk,
                payer: creator,
                metadata: metadataKeyPair,
                tokenProgram: TOKEN_PROGRAM_ID,
                systemProgram: web3.SystemProgram.programId,
                rent: web3.SYSVAR_RENT_PUBKEY,
                tokenMetadataProgram: tokenMetadataProgram,
                associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
                tokenAccount: token_account,
                cashier: cashier,
                liquidityAccount: liquidityAccount,
                pool: pool,
            }).instruction();

        tx.add(createIx);

        return {
            liquidityAta: token_account,
            pool,
            instructions: tx.instructions,
            mint: mintPk,
            tokenAccount: token_account,
        };
    }

    /**
     * Swap tokens
     * @param mint Token mint address
     * @param amount Swap amount
     * @param user User address
     * @param style Trading style
     * @param minOut Minimum output amount
     * @returns Unsigned transaction and related account information
     */
    async swap(
        mint: PublicKey,
        amount: anchor.BN,
        user: PublicKey,
        style: anchor.BN,
        minOut: anchor.BN = new BN(0),
        swapAdmin?: PublicKey
    ): Promise<{
        instructions: Array<TransactionInstruction>;
        userTokenAccount: PublicKey;
        poolTokenAccount: PublicKey;
    }> {
        const [pool] = await getLiquidityPoolAddress(this.program.programId, mint);
        const [cashier] = await getCashierAddress(this.program.programId);

        const [liquidityAccount] = web3.PublicKey.findProgramAddressSync(
            [Buffer.from("liquidity_account"), mint.toBuffer()],
            this.program.programId
        );
        const userTokenAccount = await getAssociatedTokenAddress(mint, user);
        const poolTokenAccount = await getAssociatedTokenAddress(mint, liquidityAccount, true);

        const [dexConfigurationAccount] = PublicKey.findProgramAddressSync(
            [Buffer.from("CurveConfiguration")],
            this.program.programId
        );

        const dexConfiguration = await this.program.account.curveConfiguration.fetch(dexConfigurationAccount);
        const instructions: TransactionInstruction[] = [];

        const swapInstruction = await this.program.methods
            .swap(amount, style, minOut)
            .accounts({
                dexConfigurationAccount,
                pool,
                liquidityAccount: liquidityAccount,
                mintTokenOne: mint,
                poolTokenAccountOne: poolTokenAccount,
                userTokenAccountOne: userTokenAccount,
                user,
                rent: SYSVAR_RENT_PUBKEY,
                systemProgram: SystemProgram.programId,
                tokenProgram: TOKEN_PROGRAM_ID,
                associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
                admin: dexConfiguration.admin,
                swapAdmin: swapAdmin,
            })
            .instruction();

        instructions.push(swapInstruction);

        return {
            instructions,
            userTokenAccount,
            poolTokenAccount,
        };
    }

    async setSwapAdmin(mint: PublicKey, swapAdmin: PublicKey) {
        const [dexCfgAccount] = PublicKey.findProgramAddressSync(
            [Buffer.from("CurveConfiguration")],
            this.program.programId
        );

        const setSwapAdminIx = await this.program.methods.setSwapAdmin(swapAdmin).accounts({
            dexConfigurationAccount: dexCfgAccount,
            admin: this.provider.publicKey,
            systemProgram: web3.SystemProgram.programId,
            swapAdmin: swapAdmin,
        }).instruction();

        return setSwapAdminIx;
    }

    /**
     * Get liquidity pool information
     * @param mint Token mint address
     */
    async getPoolInfo(mint: PublicKey) {
        const [pool] = await getLiquidityPoolAddress(this.program.programId, mint);
        return await this.program.account.liquidityPool.fetch(pool);
    }

    /**
     * Get project information, price and current progress
     * @param mint Token mint address
     * @returns Project information
     */
    async getProjectInfo(mint: PublicKey): Promise<ProjectInfo> {
        const [pool] = PublicKey.findProgramAddressSync(
            [Buffer.from("liquidity_pool"), mint.toBuffer()],
            this.program.programId
        );

        const [liquidityAccount] = PublicKey.findProgramAddressSync(
            [Buffer.from("liquidity_account"), mint.toBuffer()],
            this.program.programId
        );

        const poolInfo = await this.program.account.liquidityPool.fetch(pool);
        const liquidityBalance = await this.program.provider.connection.getBalance(liquidityAccount);
        const minRent = await this.program.provider.connection.getMinimumBalanceForRentExemption(0);

        const progress = Math.min(100, ((liquidityBalance - minRent) * 100.0 / SWAP_THRESHOLD));

        return {
            currentPrice: {
                reserveOne: new BN(poolInfo.reserveOne.toString()),
                reserveTwo: new BN(poolInfo.reserveTwo.toString()),
            },
            progress: Math.max(0, progress),
            liquidity: liquidityBalance,
        };
    }


    /**
     * Create CPMM pool
     * @param baseToken Base token
     * @param baseAmount Base token amount
     * @param quoteAmount Quote token amount
     * @returns 
     */
    async createCpmmPool(baseToken: string, baseAmount: BN, quoteAmount: BN) {
        const raydium = await this.initSdk({ loadToken: true })
        const mintA = await raydium.token.getTokenInfo(baseToken);
        const mintB = await raydium.token.getTokenInfo(NATIVE_MINT.toBase58());
        const feeConfigs = await raydium.api.getCpmmConfigs()

        if (raydium.cluster === 'devnet') {
            feeConfigs.forEach((config) => {
                config.id = getCpmmPdaAmmConfigId(DEVNET_PROGRAM_ID.CREATE_CPMM_POOL_PROGRAM, config.index).publicKey.toBase58()
            })
        }

        const programId = raydium.cluster === 'devnet' ? DEVNET_PROGRAM_ID.CREATE_CPMM_POOL_PROGRAM : CREATE_CPMM_POOL_PROGRAM
        const poolFeeAccount = raydium.cluster === 'devnet' ? DEVNET_PROGRAM_ID.CREATE_CPMM_POOL_FEE_ACC : CREATE_CPMM_POOL_FEE_ACC
        const { execute, extInfo } = await raydium.cpmm.createPool({
            programId: programId, // devnet: DEVNET_PROGRAM_ID.CREATE_CPMM_POOL_PROGRAM
            poolFeeAccount: poolFeeAccount, // devnet: DEVNET_PROGRAM_ID.CREATE_CPMM_POOL_PROGRAM
            mintA,
            mintB,
            mintAAmount: baseAmount,
            mintBAmount: quoteAmount,
            startTime: new BN(0),
            feeConfig: feeConfigs[0],
            associatedOnly: false,
            ownerInfo: {
                useSOLBalance: true,
            },
            txVersion: 0,
        })

        // don't want to wait confirm, set sendAndConfirm to false or don't pass any params to execute
        const { txId } = await execute({ sendAndConfirm: true })
        console.log('pool created', {
            txId,
            poolKeys: Object.keys(extInfo.address).reduce(
                (acc, cur) => ({
                    ...acc,
                    [cur]: extInfo.address[cur as keyof typeof extInfo.address].toString(),
                }),
                {}
            ),
        })
        return { pool: extInfo.address }
    }

    async initSdk(params?: { loadToken?: boolean }) {
        if (this.raydium) return this.raydium
        const cluster = this.cluster as any
        const connection = this.provider.connection
        const owner = this.provider.wallet.publicKey
        this.raydium = await Raydium.load({
            owner,
            connection,
            cluster,
            disableFeatureCheck: true,
            disableLoadToken: !params?.loadToken,
            blockhashCommitment: 'finalized',
        })

        return this.raydium
    }

    /**
     * Prepare liquidity
     * @param mint Token mint address
     * @returns 
     */
    async ammPrepare(mint: PublicKey) {
        const [cashier] = web3.PublicKey.findProgramAddressSync(
            [Buffer.from("cashier")],
            this.program.programId
        )

        const userAta = getAssociatedTokenAddressSync(
            mint,
            this.provider.publicKey,
        );

        const target = this.provider.publicKey;
        const [liquidityAccount] = web3.PublicKey.findProgramAddressSync(
            [Buffer.from("liquidity_account"), mint.toBuffer()],
            this.program.programId
        );

        const liquidityTokenAccount = getAssociatedTokenAddressSync(
            mint,
            liquidityAccount,
            true
        );

        const [pool] = web3.PublicKey.findProgramAddressSync(
            [Buffer.from("liquidity_pool"), mint.toBuffer()],
            this.program.programId
        );

        const tx = await this.program.methods.ammPrepare().accounts({
            mint: mint,
            payer: this.provider.publicKey,
            tokenProgram: TOKEN_PROGRAM_ID,
            systemProgram: web3.SystemProgram.programId,
            rent: web3.SYSVAR_RENT_PUBKEY,
            cashier: cashier,
            target: target,
            liquidityAccount: liquidityAccount,
            poolTokenAccountOne: liquidityTokenAccount,
            pool: pool,
            targetTokenAccount: userAta,
        }).signers([]).rpc();
        return tx;
    }

    /**
     * Calculate output amount
     * @param mint Token mint address
     * @param amountIn Input amount
     * @param direction Trading direction
     * @param slippage Slippage percentage
     * @returns Output amount
     */
    async computeAmountOut(mint: PublicKey, amountIn: BN, direction: 'buy' | 'sell', slippage: number = 0.01) {
        if (slippage <= 0 || slippage >= 1) {
            throw new Error('Slippage must be between 0 and 1');
        }
        const [pool] = web3.PublicKey.findProgramAddressSync(
            [Buffer.from("liquidity_pool"), mint.toBuffer()],
            this.program.programId
        );

        const poolInfo = await this.program.account.liquidityPool.fetch(pool);
        const r1 = poolInfo.reserveOne; // token
        const r2 = poolInfo.reserveTwo; // sol

        let mintOut = new BN(0);
        // buy
        // r1 * r2 = (r2 + amountIn) * (r2 - mintOut)
        // mintOut = r1 * r2 / (r2 + amountIn)

        // sell
        // r1 * r2 = (r2 - amountIn) * (r2 + mintOut)
        // mintOut = r1 * r2 / (r2 - amountIn)
        if (direction === 'buy') {
            mintOut = r1.mul(r2).div(r2.add(amountIn));
        } else {
            mintOut = r1.mul(r2).div(r2.sub(amountIn));
        }

        return mintOut.sub(mintOut.mul(new BN(slippage)));
    }
}

export default CandySDK;
