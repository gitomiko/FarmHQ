# Domain Model — FarmHQ

FarmHQ treats a site as a layered operational system.

This document defines the core entities, their relationships, and the distinction between:
- master data
- telemetry
- logs
- rules
- commands
- events

---

## Model Layers

### 1. Master Data
Relatively stable reference data.

Examples:
- sites
- zones
- assets
- sensors
- crops
- rules

### 2. Telemetry
Continuously changing machine or environmental readings.

Examples:
- soil moisture
- tank level
- battery SOC
- inverter load
- rainfall
- temperature

### 3. Operational Logs
Human or workflow-generated records of actions.

Examples:
- field cleared
- banana pruned
- irrigation started
- sensor replaced
- note added

### 4. Events
Structured state changes significant enough to trigger action.

Examples:
- rain.started
- battery.low
- pump.started
- burn.blocked
- irrigation.window.open

### 5. Commands
Explicit actions requested by a user, workflow, or agent.

Examples:
- start_irrigation
- stop_pump
- acknowledge_alert
- log_field_action

---

## Core Entities

### Site
Represents one physical operational site.

Fields:
- id
- slug
- name
- timezone
- notes

Example:

```json
{
  "id": "site-depok-main",
  "name": "Depok Main Site",
  "timezone": "Asia/Jakarta"
}
```

---

### Zone
Represents a spatial subdivision inside a site.

Fields:
- id
- site_id
- slug
- name
- zone_type
- geometry_ref
- status
- notes

Example:

```json
{
  "id": "zone-mid-cassava",
  "site_id": "site-depok-main",
  "name": "Mid Cassava",
  "zone_type": "cultivation",
  "status": "prep-ready"
}
```

---

### Crop
Represents a crop type.

Fields:
- id
- slug
- name
- category
- notes

Example:

```json
{
  "id": "crop-cassava",
  "name": "Cassava",
  "category": "food"
}
```

---

### Planting
Represents a crop assigned to a zone for a period of time.

Fields:
- id
- zone_id
- crop_id
- started_at
- expected_harvest_at
- status
- notes

---

### Sensor
Represents a sensing device.

Fields:
- id
- site_id
- zone_id
- asset_id
- sensor_type
- protocol
- topic
- status

Example:

```json
{
  "id": "sensor-zone-mid-soil-01",
  "zone_id": "zone-mid-cassava",
  "sensor_type": "soil_moisture",
  "protocol": "mqtt",
  "topic": "farm/zone/mid/soil-moisture",
  "status": "active"
}
```

---

### Asset
Represents an active or passive operational device.

Fields:
- id
- site_id
- zone_id
- asset_type
- name
- status
- protocol
- metadata

Examples:
- pump-irrigation-01
- battery-bank-01
- solar-array-01
- tank-main-01

---

### Rule
Represents a structured recommendation or constraint logic.

Fields:
- id
- slug
- rule_type
- severity
- status
- source
- description

Examples:
- burn_lock.wind_high
- irrigation_window.solar_peak
- battery_constraint.low_soc

---

### Alert
Represents a surfaced condition requiring attention.

Fields:
- id
- site_id
- zone_id
- rule_id
- severity
- title
- message
- status
- created_at
- acknowledged_at

---

## Telemetry Models

Telemetry should be stored as normalized records.

### TelemetryReading
Fields:
- id
- site_id
- zone_id
- sensor_id
- asset_id
- metric
- value
- unit
- source
- observed_at
- ingested_at

Example:

```json
{
  "site_id": "site-depok-main",
  "zone_id": "zone-mid-cassava",
  "sensor_id": "sensor-zone-mid-soil-01",
  "metric": "soil_moisture",
  "value": 48,
  "unit": "%",
  "source": "mqtt",
  "observed_at": "2026-04-15T07:12:00Z"
}
```

---

## Operational Log Models

### OperationLog
Fields:
- id
- site_id
- zone_id
- actor_type
- actor_id
- action_type
- message
- source
- created_at
- metadata

Examples:
- human / manual log
- workflow / automated action
- agent / suggested action

---

## Event Models

### Event
Fields:
- id
- site_id
- zone_id
- event_type
- source
- severity
- payload
- occurred_at

Examples:
- weather.wind_high
- field.cleared
- battery.low
- irrigation.window_open

---

## Command Models

### Command
Fields:
- id
- site_id
- zone_id
- command_type
- target_type
- target_id
- requested_by
- source
- status
- payload
- created_at
- executed_at

Examples:
- start_pump
- stop_pump
- acknowledge_alert
- create_field_log

---

## Relationship Map

```text
Site
├── Zones
│   ├── Plantings
│   ├── Sensors
│   ├── Assets
│   ├── TelemetryReadings
│   ├── OperationLogs
│   ├── Events
│   └── Alerts
│
├── Site-level Assets
├── Rules
└── Commands
```

---

## Domain Buckets

### Climate
- weather observations
- forecast
- wind
- rainfall
- humidity
- temperature

### Land
- zones
- crops
- planting state
- field condition
- notes

### Water
- tank
- pump
- valve
- irrigation schedule
- flow rate

### Energy
- solar generation
- battery SOC
- inverter load
- priority tier
- operating window

### Operations
- logs
- tasks
- alerts
- acknowledgements

### Assets
- sensors
- relays
- microcontrollers
- power devices

---

## UI Mapping

### Balanced Dashboard
Should read from:
- Zone status summary
- Active alerts
- Recommendation surface
- Rule trace
- Source freshness

### Spatial View
Should read from:
- Site
- Zones
- Zone status
- Asset placement
- Sensor placement
- overlays derived from telemetry

### Transparency Panel
Should read from:
- source
- freshness
- node identity
- active rules
- blocked actions

---

## MQTT Mapping

FarmHQ topic examples:

```text
farm/site/depok-main/weather/current
farm/zone/mid/soil-moisture
farm/water/tank/main/level
farm/energy/battery/main/soc
farm/event/burn/blocked
```

---

## Python Mapping

Python services should understand these categories:
- telemetry ingestion
- event normalization
- command dispatch
- rule computation

They should not invent ad-hoc data structures outside these contracts.

---

## Database Guidance

Suggested tables:
- sites
- zones
- crops
- plantings
- sensors
- assets
- telemetry_readings
- operation_logs
- events
- commands
- rules
- alerts

---

## Modeling Principle

Do not collapse everything into one table or one generic payload.

Prefer:
- explicit entities
- stable names
- inspectable relations
- visible source and timestamps

FarmHQ should model the site honestly, not flatten it for convenience.
