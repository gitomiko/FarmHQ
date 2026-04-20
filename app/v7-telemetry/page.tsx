import { ZoneCardV3 } from "@/components/farmhq/zone-card-v3";
import { TelemetryPanel } from "@/components/farmhq/telemetry-panel";
import { zones } from "@/src/mock/dashboard";

export default function V7Telemetry() {
  return (
    <main className="min-h-screen bg-[#1C1C1B] text-[#EDE8E0] p-6">
      <div className="max-w-6xl mx-auto space-y-6">

        <header className="border-b border-[#252523] pb-4">
          <h1 className="text-3xl">FarmHQ</h1>
          <p className="text-sm text-[#8A8680]">V7 · Telemetry Layer</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <section className="grid grid-cols-2 gap-4">
            {zones.map((z) => (
              <ZoneCardV3 key={z.id} zone={z} />
            ))}
          </section>

          <TelemetryPanel />
        </div>

      </div>
    </main>
  );
}
