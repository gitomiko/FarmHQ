import type { ZoneState } from "@/src/mock/dashboard";

function overlayText(zone: ZoneState, overlay: "none" | "water" | "energy") {
  if (overlay === "water") return `Water state is ${zone.water}. Soil moisture is ${zone.moisture}%.`;
  if (overlay === "energy") return `Energy availability is ${zone.energy}. Current zone status is ${zone.status}.`;
  return `Zone ${zone.name} is currently ${zone.status} and mapped for ${zone.crop.toLowerCase()}.`;
}

export function ZoneDetailPanel({
  zone,
  overlay,
}: {
  zone: ZoneState;
  overlay: "none" | "water" | "energy";
}) {
  const recommended =
    zone.status === "ready"
      ? ["Prepare planting", "Review moisture tomorrow morning", "Keep fire activity deferred"]
      : zone.status === "dense"
        ? ["Selective pruning", "Remove dry material", "Delay burn activity"]
        : zone.status === "watch"
          ? ["Inspect tank level", "Review irrigation schedule", "Check low-water condition"]
          : ["Observe only", "Maintain current state", "No immediate action needed"];

  const recentLogs = [
    `07:02 ${zone.id}.field-note-added`,
    `07:07 ${zone.id}.status-confirmed`,
    `07:12 ${zone.id}.overlay-${overlay}`,
  ];

  return (
    <div className="border border-[#252523] bg-[#161615] p-4 space-y-5">
      <div>
        <div className="text-xs uppercase tracking-[0.2em] text-[#8A8680]">Zone Detail</div>
        <h3 className="text-xl text-[#EDE8E0] mt-1">{zone.name}</h3>
        <p className="text-sm text-[#8A8680] mt-1">{zone.crop}</p>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="border border-[#252523] p-3">
          <div className="text-[10px] uppercase tracking-[0.16em] text-[#8A8680]">Status</div>
          <div className="mt-1 text-[#EDE8E0]">{zone.status}</div>
        </div>
        <div className="border border-[#252523] p-3">
          <div className="text-[10px] uppercase tracking-[0.16em] text-[#8A8680]">Overlay</div>
          <div className="mt-1 text-[#EDE8E0]">{overlay}</div>
        </div>
        <div className="border border-[#252523] p-3">
          <div className="text-[10px] uppercase tracking-[0.16em] text-[#8A8680]">Soil Moisture</div>
          <div className="mt-1 text-[#EDE8E0]">{zone.moisture}%</div>
        </div>
        <div className="border border-[#252523] p-3">
          <div className="text-[10px] uppercase tracking-[0.16em] text-[#8A8680]">Water / Energy</div>
          <div className="mt-1 text-[#EDE8E0]">{zone.water} / {zone.energy}</div>
        </div>
      </div>

      <div>
        <div className="text-xs uppercase tracking-[0.2em] text-[#8A8680]">Readout</div>
        <p className="mt-2 text-sm text-[#C8C4BE]">{overlayText(zone, overlay)}</p>
      </div>

      <div>
        <div className="text-xs uppercase tracking-[0.2em] text-[#8A8680]">Recommended</div>
        <ul className="mt-2 space-y-1 text-sm text-[#EDE8E0]">
          {recommended.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </div>

      <div>
        <div className="text-xs uppercase tracking-[0.2em] text-[#8A8680]">Recent Logs</div>
        <ul className="mt-2 space-y-1 text-xs text-[#8A8680]">
          {recentLogs.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
