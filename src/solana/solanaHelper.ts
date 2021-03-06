import { WalletContextState } from '@solana/wallet-adapter-react';
import { Connection, PublicKey, Transaction } from '@solana/web3.js';

export async function signSendAndConfirm(
  wallet: WalletContextState,
  connection: Connection,
  transaction: Transaction,
) {
  if (!wallet.signTransaction) {
    throw new Error('wallet.signTransaction is undefined');
  }
  const signed = await wallet.signTransaction(transaction);
  const txid = await connection.sendRawTransaction(signed.serialize());
  await connection.confirmTransaction(txid);
  return txid;
}

export const pubKeyToString = (key: PublicKey | null | string = ``) =>
  typeof key === `string` ? key : key?.toBase58() || ``;
