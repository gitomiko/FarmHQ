# FarmHQ System Overview

## Core Concept
FarmHQ is an operational interface for a living system (land, water, energy).

It is NOT:
- a dashboard
- a GIS tool
- a monitoring panel

It IS:
- a control interface
- a reasoning system
- a feedback loop between human and environment

---

## Core Loop

Zone State → Telemetry → Rule Engine → Decision → Action → Device → Telemetry

---

## Main Components

### Zone Layer
Represents physical land zones.
- soil moisture
- crop
- status

### Telemetry Layer
Input from devices (ESP32 via MQTT)

### Rule Engine
Transforms signals into constraints and decisions

### Decision Layer
Human-readable reasoning output

### Action Layer
Triggers:
- MQTT
- n8n
- logs

### Device Layer
ESP32 + actuators

### UI Layer
FarmHQ interface

---

## System Architecture

UI → API → Action Router → MQTT / n8n / DB

Devices → MQTT → UI (Realtime)

---

## Current Status

- UI: implemented
- Action system: implemented
- MQTT: live
- ESP32: connected
- Telemetry: realtime basic

---

## Next Direction

Focus on real-world deployment first:
- sensor installation
- irrigation setup
- basic automation

System development continues AFTER physical system is ready
