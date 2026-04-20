export type ActionCommand = {
  id: string;
  label: string;
  commandType: "create_field_log" | "trigger_workflow" | "publish_mqtt";
  target: string;
  payload: Record<string, unknown>;
  description: string;
};

export const actionCommands: ActionCommand[] = [
  {
    id: "action.map-boundary",
    label: "Map field boundary",
    commandType: "create_field_log",
    target: "zone-mid-cassava",
    payload: {
      action: "map_boundary",
      note: "Boundary mapping requested from FarmHQ",
    },
    description: "Create a field action log for boundary mapping.",
  },
  {
    id: "action.selective-pruning",
    label: "Selective pruning on edge banana",
    commandType: "trigger_workflow",
    target: "n8n-188",
    payload: {
      workflow: "field_pruning_review",
      zone: "zone-edge-banana",
    },
    description: "Trigger pruning review workflow through n8n.",
  },
  {
    id: "action.pump-window",
    label: "Review pump window at solar peak",
    commandType: "publish_mqtt",
    target: "farm/command/pump/review-window",
    payload: {
      site: "site-depok-main",
      preferred_window: "11:00-14:00",
    },
    description: "Publish an operational review command to MQTT.",
  },
];
