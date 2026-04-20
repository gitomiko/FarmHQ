export type TelemetryReading = {
  id: string;
  zoneId: string;
  deviceId: string;
  metric: "soil_moisture" | "tank_level" | "battery_soc" | "relay_state";
  value: number | string;
  unit: string;
  source: "mqtt" | "field-log" | "system";
  observedAt: string;
};

export const telemetryReadings: TelemetryReading[] = [
  {
    id: "reading-001",
    zoneId: "zone-mid-cassava",
    deviceId: "esp32-01",
    metric: "soil_moisture",
    value: 48,
    unit: "%",
    source: "mqtt",
    observedAt: "2026-04-21T07:12:00Z",
  },
  {
    id: "reading-002",
    zoneId: "zone-rear-water",
    deviceId: "esp32-01",
    metric: "tank_level",
    value: 64,
    unit: "%",
    source: "mqtt",
    observedAt: "2026-04-21T07:12:10Z",
  },
  {
    id: "reading-003",
    zoneId: "zone-edge-banana",
    deviceId: "esp32-01",
    metric: "relay_state",
    value: "idle",
    unit: "state",
    source: "system",
    observedAt: "2026-04-21T07:12:15Z",
  },
  {
    id: "reading-004",
    zoneId: "zone-mid-cassava",
    deviceId: "esp32-01",
    metric: "battery_soc",
    value: 78,
    unit: "%",
    source: "mqtt",
    observedAt: "2026-04-21T07:12:20Z",
  }
];
