import { telemetryReadings } from "@/src/mock/telemetry";

export function TelemetryPanel() {
  return (
    <div className="border border-[#252523] bg-[#161615] p-4 space-y-4">
      <div className="text-xs uppercase tracking-[0.2em] text-[#8A8680]">Telemetry Feed</div>

      <div className="space-y-2">
        {telemetryReadings.map((t) => (
          <div key={t.id} className="border border-[#252523] p-3 text-xs">
            <div className="flex justify-between text-[#8A8680]">
              <span>{t.metric}</span>
              <span>{t.observedAt}</span>
            </div>
            <div className="text-sm text-[#EDE8E0] mt-1">
              {t.value} {t.unit}
            </div>
            <div className="text-[10px] text-[#8A8680] mt-1">
              zone: {t.zoneId} · device: {t.deviceId}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
