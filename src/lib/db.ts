// 오프체인 원장 — 이벤트 적립, 배치 기록
export interface Event {
  id: string;
  fromAgent: string;
  toAgent: string;
  amount: number;
  task: string;
  status: 'pending' | 'settled';
  createdAt: string;
}

export interface Batch {
  id: string;
  events: Event[];
  totalAmount: number;
  xrplTxId?: string;
  merkleRoot?: string;
  createdAt: string;
}
