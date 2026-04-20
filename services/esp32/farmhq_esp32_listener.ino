#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>

const char* WIFI_SSID = "YOUR_WIFI_SSID";
const char* WIFI_PASSWORD = "YOUR_WIFI_PASSWORD";

const char* MQTT_HOST = "192.168.18.111";
const int MQTT_PORT = 1883;
const char* MQTT_CLIENT_ID = "farmhq-esp32-01";

const char* TOPIC_COMMAND_PUMP = "farm/command/pump/review-window";
const char* TOPIC_STATUS = "farm/device/esp32-01/status";
const char* TOPIC_EVENT = "farm/device/esp32-01/event";

const int RELAY_PIN = 26;
const int LED_PIN = 2;

WiFiClient wifiClient;
PubSubClient mqttClient(wifiClient);

unsigned long lastHeartbeat = 0;

void connectWiFi() {
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
  }
}

void publishStatus(const char* state, const char* detail) {
  StaticJsonDocument<256> doc;
  doc["device_id"] = MQTT_CLIENT_ID;
  doc["state"] = state;
  doc["detail"] = detail;
  doc["ip"] = WiFi.localIP().toString();
  doc["millis"] = millis();

  char buffer[256];
  serializeJson(doc, buffer);
  mqttClient.publish(TOPIC_STATUS, buffer, true);
}

void publishEvent(const char* eventType, const char* detail) {
  StaticJsonDocument<256> doc;
  doc["device_id"] = MQTT_CLIENT_ID;
  doc["event_type"] = eventType;
  doc["detail"] = detail;
  doc["millis"] = millis();

  char buffer[256];
  serializeJson(doc, buffer);
  mqttClient.publish(TOPIC_EVENT, buffer, false);
}

void handlePumpReviewWindow(JsonDocument& doc) {
  const char* preferredWindow = doc["preferred_window"] | "unknown";
  const char* site = doc["site"] | "unknown";

  digitalWrite(LED_PIN, HIGH);
  publishEvent("pump_review_requested", preferredWindow);

  // Placeholder action:
  // In real deployment, replace this with relay control, scheduling logic,
  // or handoff to another controller.
  digitalWrite(RELAY_PIN, HIGH);
  delay(500);
  digitalWrite(RELAY_PIN, LOW);

  StaticJsonDocument<256> response;
  response["device_id"] = MQTT_CLIENT_ID;
  response["site"] = site;
  response["result"] = "review_acknowledged";
  response["preferred_window"] = preferredWindow;

  char buffer[256];
  serializeJson(response, buffer);
  mqttClient.publish("farm/device/esp32-01/ack", buffer, false);

  digitalWrite(LED_PIN, LOW);
}

void mqttCallback(char* topic, byte* payload, unsigned int length) {
  StaticJsonDocument<512> doc;
  DeserializationError error = deserializeJson(doc, payload, length);

  if (error) {
    publishEvent("json_error", error.c_str());
    return;
  }

  if (String(topic) == TOPIC_COMMAND_PUMP) {
    handlePumpReviewWindow(doc);
  }
}

void connectMQTT() {
  mqttClient.setServer(MQTT_HOST, MQTT_PORT);
  mqttClient.setCallback(mqttCallback);

  while (!mqttClient.connected()) {
    if (mqttClient.connect(MQTT_CLIENT_ID)) {
      mqttClient.subscribe(TOPIC_COMMAND_PUMP);
      publishStatus("online", "subscribed to command topics");
    } else {
      delay(2000);
    }
  }
}

void setup() {
  pinMode(RELAY_PIN, OUTPUT);
  pinMode(LED_PIN, OUTPUT);
  digitalWrite(RELAY_PIN, LOW);
  digitalWrite(LED_PIN, LOW);

  connectWiFi();
  connectMQTT();
}

void loop() {
  if (!mqttClient.connected()) {
    connectMQTT();
  }

  mqttClient.loop();

  if (millis() - lastHeartbeat > 30000) {
    lastHeartbeat = millis();
    publishStatus("online", "heartbeat");
  }
}
