export type ZoneState = {
  id: string;
  name: string;
  crop: string;
  status: "stable" | "ready" | "dense" | "watch";
  moisture: number;
  water: "ok" | "low" | "standby";
  energy: "low" | "medium" | "high";
  alert?: string;
};

export type DecisionState = {
  title: string;
  why: string[];
  actions: { label: string; done: boolean }[];
};

export const zones: ZoneState[] = [
  {
    id: "zone-front-ornamental",
    name: "Front",
    crop: "Ornamental / Entry",
    status: "stable",
    moisture: 62,
    water: "ok",
    energy: "medium",
  },
  {
    id: "zone-mid-cassava",
    name: "Mid",
    crop: "Cassava / Prep",
    status: "ready",
    moisture: 48,
    water: "ok",
    energy: "medium",
  },
  {
    id: "zone-edge-banana",
    name: "Edge",
    crop: "Banana / Selective Pruning",
    status: "dense",
    moisture: 71,
    water: "standby",
    energy: "high",
    alert: "Dry fuel load present",
  },
  {
    id: "zone-rear-water",
    name: "Rear",
    crop: "Water / Service",
    status: "watch",
    moisture: 39,
    water: "low",
    energy: "low",
    alert: "Tank check recommended",
  },
];

export const decision: DecisionState = {
  title: "Avoid burning today",
  why: ["wind.high", "humidity.drop", "fuel.dry"],
  actions: [
    { label: "Map field boundary", done: false },
    { label: "Selective pruning on edge banana", done: false },
    { label: "Delay open burning", done: false },
    { label: "Review pump window at solar peak", done: true },
  ],
};

export const systemSurface = {
  source: "weather-api + field-log",
  rule: "burn_lock.wind_high",
  freshness: "6m",
  nodes: "surface:135 · core:111 · flow:n8n-188",
};
