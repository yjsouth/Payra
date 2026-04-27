// Policy 엔진 — 지출 한도, 허용 Agent 검증
export interface Policy {
  agentId: string;
  dailySpendLimit: number;
  allowedAgents: string[];
  allowedTasks: string[];
}

export function checkPolicy(
  policy: Policy,
  toAgent: string,
  amount: number
): { approved: boolean; reason: string } {
  if (!policy.allowedAgents.includes(toAgent)) {
    return { approved: false, reason: '허용되지 않은 Agent' };
  }
  if (amount > policy.dailySpendLimit) {
    return { approved: false, reason: '한도 초과' };
  }
  return { approved: true, reason: '승인' };
}
