import mqtt from "mqtt";

let client: mqtt.MqttClient | null = null;

function getClient() {
  if (client) return client;

  const url = process.env.FARMHQ_MQTT_BROKER || "mqtt://localhost:1883";

  client = mqtt.connect(url, {
    reconnectPeriod: 5000,
  });

  client.on("connect", () => {
    console.log("[MQTT] connected to", url);
  });

  client.on("error", (err) => {
    console.error("[MQTT error]", err.message);
  });

  return client;
}

export type MqttPublishInput = {
  topic: string;
  payload: Record<string, unknown>;
  qos?: 0 | 1 | 2;
  retain?: boolean;
};

export async function publishMqtt(input: MqttPublishInput) {
  const c = getClient();

  const message = JSON.stringify({
    ...input.payload,
    publishedAt: new Date().toISOString(),
  });

  return new Promise((resolve, reject) => {
    c.publish(
      input.topic,
      message,
      {
        qos: input.qos ?? 0,
        retain: input.retain ?? false,
      },
      (err) => {
        if (err) {
          console.error("[MQTT publish error]", err);
          reject(err);
        } else {
          console.log("[MQTT published]", input.topic);
          resolve({
            status: "sent",
            topic: input.topic,
            payload: input.payload,
          });
        }
      }
    );
  });
}
