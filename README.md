# FarmHQ

> *Built by hand. Honest by default.*

**FarmHQ** adalah operational interface untuk sistem agro-energy KINETIKA — sebuah panel yang membaca lahan sebagai ruang, operasi sebagai alur, dan energi sebagai metabolisme site.

FarmHQ bukan sekadar dashboard kebun. Ia dirancang sebagai **human-readable**, **agent-actionable**, dan **verifiable** surface untuk:
- climate
- land / zoning
- water
- energy
- operations
- assets

---

## Prinsip

FarmHQ dibangun dengan tiga fondasi utama dari ekosistem KINETIKA:

- **Nothing is hidden** — struktur, sumber data, rule, dan status sistem harus dapat dibaca.
- **Warmth over coolness** — teknologi tidak harus dingin; antarmuka harus terasa tenang, material, dan jujur.
- **AX by default** — sistem harus bisa dipahami manusia dan agent secara bersamaan.

---

## Tujuan

FarmHQ bertujuan menjadi:

1. **Command surface** untuk keputusan harian di lapangan
2. **Spatial interface** untuk membaca tapak, zona, air, dan energi
3. **Integration layer** untuk homelab, microcontroller, MQTT, Home Assistant, dan otomasi
4. **Foundation** untuk sistem agro-energy KINETIKA yang lebih besar

---

## Arsitektur Ringkas

```text
FarmHQ
├── Web UI (Next.js / TypeScript)
├── API surface (Next.js route handlers, FastAPI later)
├── Automation (n8n)
├── Telemetry bridge (Python)
├── Data layer (Postgres)
└── Device / protocol adapters (MQTT, Home Assistant, Modbus, ESP32)
```

---

## Struktur Repo

```text
FarmHQ/
├── app/
├── components/
├── src/
│   ├── domains/
│   ├── lib/
│   └── mock/
├── services/
│   └── python/
├── docs/
├── data/
└── public/
```

---

## Domain Utama

- **Climate** — cuaca, forecast, humidity, wind, rainfall
- **Land** — site, zones, crops, planting, soil state
- **Water** — tank, pump, irrigation, flow, schedules
- **Energy** — solar, battery, inverter, load windows
- **Operations** — logs, tasks, alerts, field actions
- **Assets** — sensors, relays, devices, nodes

---

## UX / AX Direction

FarmHQ mengikuti bahasa visual **ir0nm0nk**:
- warm-dark, not cold-dark
- monokromatik + oxidized accents
- typography with role separation
- transparent system surface

Dan mengikuti prinsip AX:
- readable structure
- meaningful actions
- human verification

---

## Homelab Placement (Planned)

- **core-111** → Postgres, API, MQTT
- **n8n-188** → workflows, alerts, orchestration
- **monitoring-103** → Grafana / technical charts
- **gateway-100** → reverse proxy
- **auth-101** → SSO
- **tools-135 / dedicated app node** → FarmHQ web UI

---

## Roadmap Awal

### Phase 0 — Foundation
- [x] repo bootstrap
- [ ] docs and contracts
- [ ] UI direction
- [ ] mock zoning surface

### Phase 1 — Usable surface
- [ ] balanced dashboard
- [ ] zone model
- [ ] field log model
- [ ] weather ingestion
- [ ] transparency panel

### Phase 2 — Hardware bridge
- [ ] MQTT topic contracts
- [ ] ESP32 / Home Assistant adapters
- [ ] telemetry normalization
- [ ] Postgres persistence

### Phase 3 — Agro-energy operations
- [ ] water + energy-aware automation
- [ ] battery / solar constraints
- [ ] irrigation window logic
- [ ] rule trace surface

---

## Getting Started

Project scaffolding is being assembled.

For architecture, design, and naming references, see:
- [`docs/vision.md`](./docs/vision.md)
- [`docs/architecture.md`](./docs/architecture.md)
- [`docs/ax.md`](./docs/ax.md)
- [`docs/domain-model.md`](./docs/domain-model.md)
- [`docs/hardware-integration.md`](./docs/hardware-integration.md)
- [`docs/naming.md`](./docs/naming.md)

---

## Status

FarmHQ is currently in **foundation stage**.

The goal is not to rush a feature-complete dashboard, but to build a system surface that can grow honestly with the site, hardware, and operations it represents.
