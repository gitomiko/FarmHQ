import { zones, decision, systemSurface } from "@/src/mock/dashboard";
import { ZoneCard } from "@/components/farmhq/zone-card";
import { DecisionPanel } from "@/components/farmhq/decision-panel";
import { SystemSurface } from "@/components/farmhq/system-surface";

export default function V3() {
  return (
    <main className="min-h-screen bg-[#1C1C1B] text-[#EDE8E0] p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        <header className="flex justify-between border-b border-[#252523] pb-4">
          <div>
            <h1 className="text-3xl">FarmHQ V3</h1>
            <p className="text-sm text-[#8A8680]">Operational Interface</p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <section className="grid grid-cols-2 gap-4">
            {zones.map((z) => (
              <ZoneCard key={z.id} zone={z} />
            ))}
          </section>

          <DecisionPanel decision={decision} />

        </div>

        <SystemSurface surface={systemSurface} />

      </div>
    </main>
  );
}
