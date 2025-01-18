import { ComputeBudgetProgram, Connection, Keypair, PublicKey } from "@solana/web3.js";
import { BN, min } from "bn.js";
import { AnchorProvider, Wallet } from "@coral-xyz/anchor";
import CandySDK from "./index";
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";
import dotenv from 'dotenv';

dotenv.config();

async function main() {
    // Business flow: Monitor pool LaunchEvent, then trigger the following process
    // Extract internal liquidity to specified account, default to signer account
    const connection = new Connection("https://devnet.helius-rpc.com/?api-key=e6a535c8-ab44-42c7-b60c-02a36d2fe73d", "confirmed");
    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
        throw new Error("SECRET_KEY is required in environment variables");
    }
    const keypair = Keypair.fromSecretKey(bs58.decode(secretKey));

    const provider = new AnchorProvider(
        connection,
        new Wallet(keypair),
        { commitment: "confirmed" }
    );
    const mint = new PublicKey("FtNNoayczDPYbGsiNyVzhpNnzdG2dd2334akPMjU12yG");

    const solBalanceBefore = await connection.getBalance(keypair.publicKey);
    const tokenBalanceBefore = await connection.getTokenAccountBalance(mint);

    const programId = new PublicKey("FhMqMYk6qy76gLC6ZnDahu25783M7jP47UiXLtz7qJdH");
    const sdk = new CandySDK(programId, provider);
    await sdk.ammPrepare(mint);

    const solBalanceAfter = await connection.getBalance(keypair.publicKey);
    const tokenBalanceAfter = await connection.getTokenAccountBalance(mint);

    console.log('solBalanceBefore', solBalanceBefore);
    console.log('solBalanceAfter', solBalanceAfter);
    console.log('tokenBalanceBefore', tokenBalanceBefore);
    console.log('tokenBalanceAfter', tokenBalanceAfter);


    // Add liquidity to Raydium external pool
    // const tokenAmount = new BN(tokenBalanceAfter.value.amount).sub(new BN(tokenBalanceBefore.value.amount));

    // SOL amount to be added
    // Calculation rule: Total liquidity 85 SOL - 2 SOL - 0.3 SOL = 82.7 SOL
    // 2 SOL is Raydium fee, 0.3 SOL is contract fee
    // const fee = 300000000; // 0.3 sol 
    // const maxAmt = 85000000000 - 2000000000 - fee;
    // const quoteAmount = new BN(maxAmt);
    // const solAmount = new BN(solBalanceAfter).sub(new BN(solBalanceBefore));
    // await sdk.createCpmmPool(mint.toBase58(), tokenAmount, solAmount);
}

main();
