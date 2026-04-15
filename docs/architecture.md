# Architecture — FarmHQ

FarmHQ dibangun dengan pendekatan layered system.

---

## Layer

### 1. Reality Layer
- sensor
- cuaca
- manusia
- device

### 2. Data Layer
- telemetry
- master data
- logs

### 3. Logic Layer
- rules
- automation
- constraints

### 4. Interface Layer
- web UI
- API
- agent surface

---

## Stack

- Frontend: Next.js + TypeScript
- Styling: Tailwind
- API: Next.js routes / FastAPI (future)
- Automation: n8n
- DB: Postgres
- Messaging: MQTT
- Device bridge: Python services

---

## Node Mapping

- core-111 → DB + API + MQTT
- n8n-188 → workflows
- monitoring-103 → Grafana
- app node → FarmHQ UI

---

## Data Flow

Device → MQTT → Python bridge → Postgres → API → UI

n8n reads data → triggers workflows → updates state → notifies user
