// XRPL 연동 — 지갑 생성, 송금, DID 발급
// 데모: XRP (Testnet) | 실서비스: RLUSD (Mainnet)
import { Client, Wallet, Payment } from 'xrpl';

export const XRPL_NETWORK = 
  process.env.XRPL_WEBSOCKET || 'wss://s.altnet.rippletest.net:51233';

// RLUSD 발행자 주소 (Mainnet)
export const RLUSD_ISSUER = 'rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh';

export async function getClient(): Promise<Client> {
  const client = new Client(XRPL_NETWORK);
  await client.connect();
  return client;
}

export async function createWallet(): Promise<Wallet> {
  return Wallet.generate();
}

// 데모용 XRP 송금 (Testnet)
export async function sendXRP(
  client: Client,
  senderWallet: Wallet,
  destination: string,
  amount: string, // drops 단위
  memo?: string
): Promise<string> {
  const tx: Payment = {
    TransactionType: 'Payment',
    Account: senderWallet.address,
    Destination: destination,
    Amount: amount,
    Memos: memo ? [{
      Memo: {
        MemoData: Buffer.from(memo).toString('hex').toUpperCase()
      }
    }] : undefined
  };
  const result = await client.submitAndWait(tx, { wallet: senderWallet });
  return result.result.hash;
}

// 실서비스용 RLUSD 송금 (Mainnet)
export async function sendRLUSD(
  client: Client,
  senderWallet: Wallet,
  destination: string,
  amount: string,
  memo?: string
): Promise<string> {
  const tx: Payment = {
    TransactionType: 'Payment',
    Account: senderWallet.address,
    Destination: destination,
    Amount: {
      currency: 'RLUSD',
      issuer: RLUSD_ISSUER,
      value: amount
    },
    Memos: memo ? [{
      Memo: {
        MemoData: Buffer.from(memo).toString('hex').toUpperCase()
      }
    }] : undefined
  };
  const result = await client.submitAndWait(tx, { wallet: senderWallet });
  return result.result.hash;
}
