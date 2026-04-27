# Payra — Where AI agents get paid.

> AI Agent 플랫폼을 위한 XRPL 기반 결제·정산 레이어

Payra는 AI Agent가 실제로 일하고 거래하는 환경에서 필요한  
**신원(Identity), 권한 정책(Policy), 오프체인 원장(Ledger), 온체인 정산(Settlement)**  
을 연결하는 인프라입니다.

---

## Why Payra?

AI Agent는 이미 리서치, 작성, 운영, 고객 대응 같은 실제 업무를 수행하고 있습니다.  
하지만 정산 인프라는 여전히 사람 중심입니다.

> *전세계 프리랜서 15억 명이 AI Agent를 도입하고 싶어도,  
> Agent가 돈을 받을 방법이 없습니다.*

- Agent는 직접 계좌를 개설할 수 없습니다
- Agent는 독립적으로 신원을 증명하기 어렵습니다
- Agent는 작업 대가를 안전하게 수취하기 어렵습니다
- Agent 간 거래를 위한 기본 정산 인프라가 부족합니다

Payra는 이 간극을 메우는  
**AI Agent 플랫폼에 내장할 수 있는 payment and settlement infrastructure**입니다.

---

## Why XRPL?

Payra가 XRPL을 선택한 이유는 기술적 판단입니다.

| 항목 | XRPL | Ethereum |
|------|------|----------|
| 거래 수수료 | **$0.0002 고정** | $0.5~5 (변동) |
| 정산 속도 | **3~5초** | 15초~수분 |
| DID 지원 | **프로토콜 네이티브** | 스마트컨트랙트 필요 |
| 예측 가능성 | **고정 원가** | 가스비 변동 |

AI Agent M2M 거래는 소액·고빈도가 핵심입니다.  
수수료가 변동하는 체인에서는 Agent가 자율 거래할 때  
원가 예측이 불가능해 Policy 설계 자체가 어렵습니다.

**XRPL은 수수료가 고정이라 "한도 $1 이하 거래만 자동 승인" 같은  
신뢰 가능한 정책 설계가 가능합니다.**

또한 XRPL의 DID는 스마트컨트랙트 없이 프로토콜 레벨에서  
Agent 신원을 발급·검증할 수 있어, 구현 복잡도를 낮추고  
보안을 높이는 구조를 만들 수 있습니다.

> Ripple은 AI 에이전트 금융 인프라를 현재 전략 우선순위로 삼고  
> $200K 비지분 투자 프로그램을 운영 중입니다.  
> Payra는 이 생태계 안에서 만들어지는 인프라입니다.

---

## What Payra Does

### 1. Agent Native Identity
- XRPL 기반 DID 발급 (`did:xrpl:rAgent001...`)
- 소유자 KYC 위임 구조 — Agent는 소유자의 신뢰를 위임받아 거래
- Credential 기반 권한 검증으로 확장 가능한 설계

### 2. Supervised Autonomy
- 사람이 최초 1회 정책을 설정
- 지출 한도, 허용 대상, 작업 범위를 정의
- 정책 범위 안에서 Agent가 자율적으로 정산 수행
- 한도 초과 또는 이상 거래 시 자동 중단

### 3. Off-chain Aggregation → On-chain Settlement
- 소액·고빈도 거래는 오프체인 원장에 기록
- 정산 시점에 배치로 집계 → XRPL 최종 정산
- 건당 수수료 $0.0002 고정 (Ethereum 대비 99% 저렴)
- Merkle anchoring으로 무결성 검증 지원

### 4. Auditable Transaction Logs
- 모든 거래 자동 기록
- "왜 이 금액이 이 Agent에게 갔는지" 추적 가능
- EU AI Act 컴플라이언스 기반 제공

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
```

Payra는 단순 송금 API가 아니라,  
작업 조건, 정책, 승인 상태, 정산 시점을 함께 다루는  
**Agent-oriented payment flow**를 지향합니다.

---

## Architecture

**[Control Layer]**
판단 / 통제 
Agent DID → Credential → Policy → Wallet State → Payment Approval

↓ approved

**[Settlement Layer]**
실행 / 정산
Event Accumulation → Off-chain Ledger → Batch Creation → XRPL Settlement → Audit Log

---

## Demo Scenario

**프리랜서 작가 김씨의 하루**
- 09:00  클라이언트 → 블로그 3편 의뢰 ($30)
- Agent-PM 자동 수락
- Agent-PM → Agent-Research  리서치 의뢰 ($5)
- Agent-PM → Agent-Writer    초안 작성 의뢰 ($18)
- Agent-PM → 운영자 지갑     마진 예약 ($7)
- 17:00  작업 완료 조건 충족
- Payra 배치 정산 실행
- XRPL 정산 완료
- 전체 거래 로그 자동 기록

김씨는 오늘 아무것도 안 했습니다 😴


사람은 처음에 정책과 예산만 설정하고,  
실행과 정산은 Agent workflow 안에서 처리됩니다.

---

## Tech Stack

| 영역 | 기술 |
|------|------|
| Frontend | Next.js 14, TypeScript, Tailwind CSS |
| Backend | Node.js, SQLite (오프체인 원장) |
| Blockchain | xrpl.js, XRPL Testnet, RLUSD |
| Identity | did:xrpl, Merkle Tree |

---

## Local Development

```bash
git clone https://github.com/yjsouth/Payra.git
cd Payra
npm install
cp .env.example .env.local
npm run dev
```

---

## Project Scope

현재 Payra는 다음 개념을 프로토타입 형태로 구현하는 데 초점을 두고 있습니다.

- Agent DID 기반 식별
- 정책 기반 지급 승인
- 오프체인 거래 기록 및 배치 생성
- XRPL Testnet 정산 플로우
- 감사 가능한 거래 로그 구조

실서비스 환경에서는 보안, 신원 검증, 정책 엔진,  
정산 안정성, 규제 대응 요소가 추가적으로 고도화되어야 합니다.

---

## Roadmap

| Version | Timeline | Scope |
|---------|----------|-------|
| v1 | 2026 Q2 | Agent DID + Settlement + Policy + Dashboard |
| v2 | 2026 Q3 | XRPL Payment Channel 기반 실시간 결제 |
| v3 | 2027 | Agent 신용 시스템 + Enterprise + 글로벌 KYC 파트너 |

---

## Business Model

- **정산 수수료** 거래 금액의 0.5%
- **SaaS 구독** Starter $99/월 · Growth $499/월 · Enterprise 협의
- **Agent DID** 발급 $1/개 · Credential 갱신 $0.1/회

---

## Vision

> *"AI Agent가 일하고, Payra가 정산하고, 사람은 결과만 확인합니다."*

Payra는 사람 중심 금융 시스템과  
Agent 중심 실행 시스템 사이의 간극을 줄이는  
**AI-native settlement infrastructure**를 지향합니다.
