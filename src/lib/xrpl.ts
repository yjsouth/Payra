// XRPL 연동 — 지갑 생성, 송금, DID 발급
import { Client, Wallet } from 'xrpl';

export const XRPL_NETWORK = process.env.XRPL_WEBSOCKET || 'wss://s.altnet.rippletest.net:51233';

export async function getClient(): Promise<Client> {
  const client = new Client(XRPL_NETWORK);
  await client.connect();
  return client;
}

export async function createWallet(): Promise<Wallet> {
  return Wallet.generate();
}
