# Naming — FarmHQ

Consistency in naming is critical for both humans and agents.

---

## Site

```text
site-depok-main
site-kajadi
```

---

## Zones

```text
zone-front-ornamental
zone-mid-cassava
zone-edge-banana
zone-rear-water
```

---

## Sensors

```text
sensor-zone-mid-soil-01
sensor-tank-level-01
sensor-battery-01
```

---

## Assets

```text
pump-irrigation-01
solar-array-01
battery-bank-01
```

---

## Nodes

Follow homelab convention:

```text
node-111-core
node-135-tools
node-188-n8n
node-103-monitoring
```

---

## MQTT Topics

```text
farm/zone/mid/soil-moisture
farm/water/tank/level
farm/energy/battery/soc
```

---

## Rules

```text
burn_lock.wind_high
irrigation_window.solar_peak
battery_constraint.low_soc
```

---

## Principle

- lowercase
- hyphen-separated
- explicit meaning
- stable identifiers

Naming should be readable without context.
