export type MqttPublishInput = {
  topic: string;
  payload: Record<string, unknown>;
  qos?: 0 | 1 | 2;
  retain?: boolean;
};

/**
 * Placeholder MQTT publisher.
 *
 * In production this should connect to Mosquitto on core-111,
 * or publish through an internal broker/API bridge.
 */
export async function publishMqtt(input: MqttPublishInput) {
  const message = {
    topic: input.topic,
    payload: input.payload,
    qos: input.qos ?? 0,
    retain: input.retain ?? false,
    publishedAt: new Date().toISOString(),
  };

  console.log("[FarmHQ MQTT Publish]", JSON.stringify(message, null, 2));

  return {
    status: "queued",
    broker: process.env.FARMHQ_MQTT_BROKER ?? "mock-broker",
    ...message,
  };
}
