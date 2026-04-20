import { ZoneState } from "@/src/mock/dashboard";

export function ZoneCard({ zone }: { zone: ZoneState }) {
  return (
    <div className="border border-[#252523] p-4 space-y-3">
      <div>
        <h3 className="text-lg font-medium">{zone.name}</h3>
        <p className="text-xs text-[#8A8680]">{zone.crop}</p>
      </div>

      <div className="text-xs space-y-1">
        <div>Soil: {zone.moisture}%</div>
        <div>Water: {zone.water}</div>
        <div>Energy: {zone.energy}</div>
      </div>

      <div className="text-xs mt-2">
        <strong>Status:</strong> {zone.status}
      </div>

      {zone.alert && (
        <div className="text-xs text-[#8C6A3A]">
          ⚠ {zone.alert}
        </div>
      )}
    </div>
  );
}
