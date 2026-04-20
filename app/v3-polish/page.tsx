"use client";

import { useState } from "react";
import { zones, decision, systemSurface } from "@/src/mock/dashboard";
import { ZoneCardV3 } from "@/components/farmhq/zone-card-v3";
import { DecisionPanelV3 } from "@/components/farmhq/decision-panel-v3";
import { SystemSurfaceV3 } from "@/components/farmhq/system-surface-v3";

export default function V3Polish() {
  const [selected, setSelected] = useState<string | null>(null);
  const [overlay, setOverlay] = useState<"none" | "water" | "energy">("none");

  return (
    <main className="min-h-screen bg-[#1C1C1B] text-[#EDE8E0] p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        <header className="flex justify-between items-center border-b border-[#252523] pb-4">
          <div>
            <h1 className="text-3xl">FarmHQ</h1>
            <p className="text-sm text-[#8A8680]">V3 · Operational Interface</p>
          </div>

          <div className="flex gap-2 text-xs">
            {(["none", "water", "energy"] as const).map((o) => (
              <button
                key={o}
                onClick={() => setOverlay(o)}
                className={[
                  "px-3 py-1 border",
                  overlay === o
                    ? "border-[#8C6A3A] text-[#8C6A3A]"
                    : "border-[#252523] text-[#8A8680]",
                ].join(" ")}
              >
                {o}
              </button>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <section className="grid grid-cols-2 gap-4">
            {zones.map((z) => (
              <ZoneCardV3
                key={z.id}
                zone={z}
                selected={selected === z.id}
                onSelect={() => setSelected(z.id)}
              />
            ))}
          </section>

          <div className="space-y-4">
            <DecisionPanelV3 decision={decision} />

            {selected && (
              <div className="border border-[#252523] p-4 text-sm text-[#C8C4BE]">
                <div className="text-xs text-[#8A8680] uppercase">Zone Detail</div>
                <div className="mt-2">Selected: {selected}</div>
                <div className="mt-1">Overlay: {overlay}</div>
              </div>
            )}
          </div>

        </div>

        <SystemSurfaceV3 surface={systemSurface} />

      </div>
    </main>
  );
}
