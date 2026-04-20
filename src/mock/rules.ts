export type RuleNodeState = {
  id: string;
  label: string;
  kind: "signal" | "condition" | "constraint" | "decision" | "action";
  status: "active" | "blocked" | "ready" | "info";
  detail: string;
};

export type RuleEdgeState = {
  from: string;
  to: string;
  label?: string;
};

export const ruleNodes: RuleNodeState[] = [
  {
    id: "signal.wind",
    label: "wind.high",
    kind: "signal",
    status: "active",
    detail: "Afternoon wind exposure elevated.",
  },
  {
    id: "signal.humidity",
    label: "humidity.drop",
    kind: "signal",
    status: "active",
    detail: "Humidity expected to drop after noon.",
  },
  {
    id: "signal.fuel",
    label: "fuel.dry",
    kind: "signal",
    status: "active",
    detail: "Dry material remains on edge zone.",
  },
  {
    id: "constraint.burn",
    label: "burn_lock.wind_high",
    kind: "constraint",
    status: "blocked",
    detail: "Open burning is blocked while wind risk is high.",
  },
  {
    id: "decision.primary",
    label: "avoid_burning_today",
    kind: "decision",
    status: "active",
    detail: "Primary decision derived from active constraints.",
  },
  {
    id: "action.prune",
    label: "selective_pruning",
    kind: "action",
    status: "ready",
    detail: "Safe substitute action for current condition.",
  },
  {
    id: "action.boundary",
    label: "map_boundary",
    kind: "action",
    status: "ready",
    detail: "Field mapping can proceed under current conditions.",
  }
];

export const ruleEdges: RuleEdgeState[] = [
  { from: "signal.wind", to: "constraint.burn" },
  { from: "signal.humidity", to: "constraint.burn" },
  { from: "signal.fuel", to: "constraint.burn" },
  { from: "constraint.burn", to: "decision.primary", label: "blocks burn" },
  { from: "decision.primary", to: "action.prune", label: "recommend" },
  { from: "decision.primary", to: "action.boundary", label: "recommend" }
];
