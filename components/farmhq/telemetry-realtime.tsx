"use client";

import { useEffect, useState } from "react";
import mqtt from "mqtt";

export function TelemetryRealtime() {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_FARMHQ_MQTT_WS;
    const topic = process.env.NEXT_PUBLIC_FARMHQ_MQTT_TOPIC || "farm/device/#";

    if (!url) {
      console.warn("No MQTT WS URL configured");
      return;
    }

    const client = mqtt.connect(url);

    client.on("connect", () => {
      console.log("[MQTT WS] connected");
      client.subscribe(topic);
    });

    client.on("message", (topic, payload) => {
      try {
        const data = JSON.parse(payload.toString());
        setMessages((prev) => [
          {
            topic,
            data,
            ts: new Date().toISOString(),
          },
          ...prev.slice(0, 20),
        ]);
      } catch (e) {
        console.warn("Invalid JSON", payload.toString());
      }
    });

    return () => {
      client.end();
    };
  }, []);

  return (
    <div className="border border-[#252523] bg-[#161615] p-4 space-y-3">
      <div className="text-xs uppercase tracking-[0.2em] text-[#8A8680]">
        Realtime Telemetry
      </div>

      <div className="space-y-2 text-xs">
        {messages.length === 0 && (
          <div className="text-[#8A8680]">Waiting for telemetry...</div>
        )}

        {messages.map((m, i) => (
          <div key={i} className="border border-[#252523] p-2">
            <div className="text-[#8A8680]">{m.topic}</div>
            <div className="text-[#EDE8E0] break-all">
              {JSON.stringify(m.data)}
            </div>
            <div className="text-[10px] text-[#8A8680]">{m.ts}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
