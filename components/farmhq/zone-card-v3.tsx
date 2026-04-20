import { Droplets, BatteryCharging, AlertTriangle, Sprout } from "lucide-react";
import type { ZoneState } from "@/src/mock/dashboard";

function meterClass(value: number) {
  if (value >= 60) return "bg-[#5A7A6A]";
  if (value >= 40) return "bg-[#8C6A3A]";
  return "bg-[#7A3F2A]";
}

function statusTone(status: ZoneState["status"]) {
  switch (status) {
    case "stable":
      return "text-[#5A7A6A] border-[#2A4A42] bg-[#101A18]";
    case "ready":
      return "text-[#8C6A3A] border-[#5A3A22] bg-[#2A1C10]";
    case "dense":
      return "text-[#8C6A3A] border-[#5A3A22] bg-[#2A1C10]";
    case "watch":
      return "text-[#C8C4BE] border-[#3A3A38] bg-[#1A1A19]";
  }
}

export function ZoneCardV3({
  zone,
  selected,
  onSelect,
}: {
  zone: ZoneState;
  selected?: boolean;
  onSelect?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={[
        "w-full text-left border p-4 transition-colors space-y-4",
        selected ? "border-[#8C6A3A] bg-[#191411]" : "border-[#252523] bg-[#161615] hover:bg-[#1A1A19]",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Sprout size={15} className="text-[#C8C4BE]" />
            <h3 className="text-lg font-medium text-[#EDE8E0]">{zone.name}</h3>
          </div>
          <p className="text-xs text-[#8A8680] mt-1">{zone.crop}</p>
        </div>
        <span className={["text-[10px] uppercase tracking-[0.18em] px-2 py-1 border", statusTone(zone.status)].join(" ")}>
          {zone.status}
        </span>
      </div>

      <div className="space-y-3 text-xs text-[#C8C4BE]">
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="flex items-center gap-2"><Droplets size={13} /> Soil</span>
            <span>{zone.moisture}%</span>
          </div>
          <div className="h-2 bg-[#252523] overflow-hidden">
            <div className={["h-full", meterClass(zone.moisture)].join(" ")} style={{ width: `${zone.moisture}%` }} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="border border-[#252523] px-2 py-2">
            <div className="text-[#8A8680] uppercase tracking-[0.14em] text-[10px]">Water</div>
            <div className="mt-1">{zone.water}</div>
          </div>
          <div className="border border-[#252523] px-2 py-2">
            <div className="text-[#8A8680] uppercase tracking-[0.14em] text-[10px] flex items-center gap-1"><BatteryCharging size={12} /> Energy</div>
            <div className="mt-1">{zone.energy}</div>
          </div>
        </div>
      </div>

      {zone.alert ? (
        <div className="border border-[#5A3A22] bg-[#2A1C10] px-2 py-2 text-xs text-[#8C6A3A] flex items-start gap-2">
          <AlertTriangle size={13} className="mt-0.5" />
          <span>{zone.alert}</span>
        </div>
      ) : (
        <div className="border border-[#252523] px-2 py-2 text-xs text-[#8A8680]">No active alert</div>
      )}
    </button>
  );
}
