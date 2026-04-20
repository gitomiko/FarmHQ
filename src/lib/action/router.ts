import { publishMqtt } from "@/src/lib/mqtt/publisher";

export async function routeAction(action: any) {
  switch (action.commandType) {
    case "publish_mqtt":
      return publishMqtt({
        topic: action.target,
        payload: action.payload,
      });

    case "trigger_workflow":
      // Placeholder for n8n webhook
      console.log("[FarmHQ n8n trigger]", action);
      return { status: "queued", via: "n8n", action };

    case "create_field_log":
      // Placeholder for DB write
      console.log("[FarmHQ field log]", action);
      return { status: "logged", via: "db", action };

    default:
      return { status: "unknown_action", action };
  }
}
