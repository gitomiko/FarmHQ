# Hardware Integration — FarmHQ

FarmHQ connects digital systems with physical infrastructure.

---

## Device Classes

### Sensors
- soil moisture
- temperature
- humidity
- water level
- flow meter

### Actuators
- relay
- pump
- valve
- smart plug

### Energy
- solar controller
- battery monitor
- inverter

---

## Protocols

FarmHQ supports:

- MQTT
- HTTP / REST
- Modbus (TCP / RTU)
- Home Assistant API

---

## Python Role

Python services act as:

### Telemetry Bridge
- subscribe to MQTT
- normalize data
- write to Postgres

### Device Adapter
- ESP32 integration
- Home Assistant sync
- Modbus integration

### Rule Worker
- compute recommendations
- enforce constraints

---

## Data Flow

```text
Device → MQTT → Python → Postgres → API → UI
```

---

## Example Topic

```text
farm/zone/mid/soil-moisture
```

Payload:

```json
{
  "value": 48,
  "unit": "%",
  "timestamp": "2026-04-15T07:12:00Z"
}
```

---

## Integration with n8n

n8n can:
- listen to DB changes
- trigger workflows
- send alerts
- control devices

---

## Future

- ESPHome integration
- camera / CV pipeline
- predictive models
- energy optimization

---

FarmHQ treats hardware as part of the system — not an external add-on.
