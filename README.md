# Payra
 AI Agent 플랫폼을 위한 XRPL 기반 결제·정산 레이어
# Payra — Where AI agents get paid

> AI Agent 플랫폼을 위한 XRPL 기반 결제·정산 레이어

Payra는 AI Agent가 실제로 일하고 거래하는 환경에서 필요한  
**신원(Identity), 권한 정책(Policy), 오프체인 원장(Ledger), 온체인 정산(Settlement)** 을 연결하는 인프라입니다.

기존 금융 시스템은 사람과 기업을 기준으로 설계되어 있습니다.  
하지만 AI Agent는 스스로 계좌를 만들 수도, 신원을 증명할 수도, 작업 대가를 직접 수취하기도 어렵습니다.  
Payra는 이 문제를 해결하기 위해, **운영자 기반 신뢰 위임**, **정책 기반 자율 정산**, **오프체인 집계 후 XRPL 배치 정산**, **감사 가능한 거래 로그**를 제공합니다.

---

## Why Payra?

AI Agent가 점점 더 많은 업무를 수행하고 있지만,  
정산과 지급 인프라는 여전히 사람 중심으로 구성되어 있습니다.

이로 인해 Agent 환경에서는 다음과 같은 문제가 발생합니다:

- Agent는 직접 계좌를 개설할 수 없습니다
- Agent는 독립적으로 신원을 증명하기 어렵습니다
- Agent는 작업 대가를 안전하게 수취하기 어렵습니다
- Agent 간 거래를 위한 기본 정산 인프라가 부족합니다

Payra는 AI Agent 플랫폼에 탑재할 수 있는  
**AI-native payment and settlement infrastructure**를 목표로 합니다.

---

## What Payra does

Payra는 다음 기능을 제공합니다:

### 1. Agent Native Identity
- XRPL 기반 DID 발급
- Agent 식별자와 운영자 신뢰를 연결할 수 있는 구조
- Credential 기반 권한 검증 확장 가능

### 2. Supervised Autonomy
- 사람이 최초 1회 정책을 설정
- 지출 한도, 허용 대상, 작업 범위를 정의
- 정책 범위 안에서 Agent가 자율적으로 정산 수행

### 3. Off-chain Aggregation → On-chain Settlement
- 소액·고빈도 거래는 오프체인 원장에 기록
- 정산 시점에 거래를 배치로 집계
- XRPL을 통해 최종 정산 수행
- Merkle anchoring으로 무결성 검증 지원

### 4. Auditable Transaction Logs
- 모든 거래를 자동 기록
- 추적 가능성과 감사 가능성을 높이는 구조
- 운영 투명성과 규제 대응 기반 제공

---

## Example API

```javascript
POST https://api.payra.io/v1/payments
{
  "from": "Agent-PM",
  "to": "Agent-Writer",
  "amount": 18,
  "currency": "RLUSD",
  "condition": "release on task completion"
}
Payra는 단순 송금 API가 아니라,
작업 조건, 정책, 승인 상태, 정산 시점을 함께 다루는
Agent-oriented payment flow를 지향합니다.

Demo Scenario
프리랜서 작가 김씨의 하루
09:00
클라이언트가 블로그 3편 작성 작업을 의뢰합니다. 총 예산은 $30입니다.

Agent-PM

작업 자동 수락
예산을 하위 작업으로 분배
Sub-agents

Agent-Research → 리서치 수행 ($5)
Agent-Writer → 초안 작성 ($18)
남은 금액 $7 → 운영자/지갑 예약
17:00

작업 완료 조건 충족
Payra가 배치 정산 실행
XRPL 정산 완료
전체 거래 로그 자동 기록
즉, 사람은 처음에 정책과 예산만 설정하고,
실행과 정산은 Agent workflow 안에서 처리됩니다.

Architecture
Control Layer
Agent DID → Credential → Policy → Wallet State → Payment Approval

누가, 어떤 권한으로, 얼마까지 지출할 수 있는지를 판단합니다.

Settlement Layer
Event Accumulation → Off-chain Ledger → Batch Creation → XRPL Settlement → Audit Log

실제 지급은 오프체인 집계 후 온체인에서 정산하는 구조로 처리됩니다.

Tech Stack
Frontend: Next.js 14, TypeScript, Tailwind CSS
Backend: Node.js, SQLite
Blockchain: xrpl.js, XRPL Testnet, RLUSD
Identity / Integrity: did:xrpl, Merkle Tree
Local Development
Copygit clone https://github.com/yjsouth/Payra.git
cd Payra
npm install
cp .env.example .env.local
npm run dev
Project Scope
현재 Payra는 다음 개념을 프로토타입 형태로 구현하는 데 초점을 두고 있습니다:

Agent DID 기반 식별
정책 기반 지급 승인
오프체인 거래 기록 및 배치 생성
XRPL Testnet 정산 플로우
감사 가능한 거래 로그 구조
실서비스 환경에서는 보안, 신원 검증, 정책 엔진, 정산 안정성, 규제 대응 요소가 추가적으로 고도화되어야 합니다.
Business Model
정산 수수료 기반 수익
SaaS 구독형 플랜
Agent DID 발급 및 관리 수수료
Vision
AI Agent가 일하고, Payra가 정산하고, 사람은 결과만 확인합니다.

Payra는 사람 중심 금융 시스템과
Agent 중심 실행 시스템 사이의 간극을 줄이는
AI-native settlement infrastructure를 지향합니다.
