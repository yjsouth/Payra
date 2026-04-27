// Agent DID 발급 — did:xrpl: 기반
export interface AgentDID {
  id: string;           // did:xrpl:rAgent001...
  owner: string;        // 소유자 지갑 주소
  agentType: 'USR' | 'BOT';
  trustScore: number;   // 0~100
  createdAt: string;
}

export function generateDID(walletAddress: string): string {
  return `did:xrpl:${walletAddress}`;
}
