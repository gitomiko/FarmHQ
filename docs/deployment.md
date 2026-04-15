# Deployment — FarmHQ

FarmHQ follows a layered deployment strategy aligned with the KINETIKA homelab architecture.

---

## Node Roles

### core-111 (Engine Room)

Responsible for:
- Postgres (data)
- API (Next.js routes / FastAPI)
- MQTT broker
- shared services

This node is the **source of truth**.

---

### tools-135 (Root Portal)

Responsible for:
- FarmHQ frontend
- KinetikaHQ
- root portal navigation

This node is the **human-facing surface**.

---

### n8n-188 (Orchestration)

Responsible for:
- workflows
- alerts
- automation
- data ingestion orchestration

---

### monitoring-103

Responsible for:
- Grafana
- metrics
- observability

---

## Deployment Pattern

### Source
- GitHub repository is canonical source

### Sync
- code pulled to core-111
- built or linked to tools-135

### Runtime
- frontend runs on 135
- backend services run on 111

---

## Directory Suggestion

```text
111:/srv/farmhq-source
111:/srv/farmhq-services
135:/srv/farmhq-app
```

---

## Networking

All services are exposed through:
- gateway-100 (reverse proxy)
- auth-101 (SSO layer)

Suggested routes:
- farmhq.homelab.kinetika.id
- api.farmhq.homelab.kinetika.id

---

## Future Expansion

Heavy workloads can be moved to:

### ir0nm0nk
- Python workers
- AI / CV
- analytics

---

## Deployment Principle

- Keep source centralized
- Keep surface isolated
- Keep data close to core
- Keep automation decoupled

---

## Anti-Pattern

Avoid:
- mixing UI and DB on same uncontrolled layer
- unclear source vs runtime location
- undocumented symlink-based deployments

---

FarmHQ deployment should feel predictable, inspectable, and stable.
