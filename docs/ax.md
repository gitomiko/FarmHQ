# AX — Agent Experience in FarmHQ

> *If UX asks how humans use this, AX asks how agents navigate it — and how both can coexist without hiding the system.*

FarmHQ inherits the AX philosophy from KINETIKA and applies it to an agro-energy operational surface.

---

## Core AX Questions

When designing any FarmHQ component, ask:

### 1. Can an agent understand the structure?
- Data must be predictable.
- Domain boundaries must be explicit.
- IDs, names, and statuses must be consistent.

### 2. Can an agent take meaningful action?
- The interface must not only expose information, but also actionable state.
- Recommendations, constraints, and commands must be structured.

### 3. Can a human verify the result?
- Every recommendation should expose its source.
- Rules and freshness should be visible.
- System reasoning must be inspectable.

---

## Human Surface vs Agent Surface

FarmHQ is intentionally split into two overlapping surfaces:

### Human Surface
- zoning canvas
- dashboard panels
- logs
- alerts
- tasks

### Agent Surface
- contracts
- APIs
- event schemas
- command schemas
- structured rule traces

### Shared Surface
- naming
- status vocabulary
- timestamps
- source metadata
- node identity

Nothing is hidden from either side.

---

## AX Rules for FarmHQ UI

### Expose source
A recommendation without source is incomplete.

### Expose freshness
Every important panel should show when it was updated.

### Expose rule state
If an action is blocked or recommended, the relevant rule should be visible.

### Expose boundaries
It should be clear whether data comes from:
- weather API
- field log
- MQTT telemetry
- Home Assistant
- automation workflow

### Keep labels explicit
Do not rely on icons alone.

---

## AX and Deployment

FarmHQ follows a layered deployment philosophy:

- **111** = engine room / core truth
- **135** = human-facing root portal
- **188** = automation and orchestration
- **103** = observability

This separation improves both human orientation and agent navigability.

---

## Good AX Example

```text
zone-mid-cassava
status=prep-ready
recommended_action=prepare-planting
blocked_action=open-burning
source=weather-api+field-log
rule=burn_lock.wind_high
freshness=6m
node=core-111
```

This is readable by both humans and agents.

---

## Anti-Patterns

Avoid:
- decorative dashboards without traceability
- inconsistent labels for the same concept
- action surfaces without confidence/source
- opaque system status
- deployment ambiguity

---

## AX Goal

FarmHQ should feel like a system that can be:
- read
- questioned
- trusted
- inspected
- extended

A calm surface, with visible structure underneath.
