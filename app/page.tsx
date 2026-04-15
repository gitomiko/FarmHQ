import { Cloud, Droplet, Battery, Leaf } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#1C1C1B] text-[#EDE8E0] p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <header className="flex justify-between items-center border-b border-[#252523] pb-4">
          <div>
            <h1 className="text-3xl font-semibold">FarmHQ</h1>
            <p className="text-sm text-[#8A8680]">site-depok-main · 07:12</p>
          </div>
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-2"><Cloud size={16}/> 29°C</div>
            <div className="flex items-center gap-2"><Droplet size={16}/> 64%</div>
            <div className="flex items-center gap-2"><Battery size={16}/> 78%</div>
          </div>
        </header>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* LEFT — Zoning */}
          <section className="border border-[#252523] p-4">
            <h2 className="text-lg mb-4 flex items-center gap-2">
              <Leaf size={16}/> Zoning
            </h2>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="border border-[#252523] p-3">Front · Stable</div>
              <div className="border border-[#252523] p-3">Mid · Ready</div>
              <div className="border border-[#252523] p-3">Edge · Dense</div>
              <div className="border border-[#252523] p-3">Rear · Watch</div>
            </div>
          </section>

          {/* RIGHT — Decision */}
          <section className="border border-[#252523] p-4">
            <h2 className="text-lg mb-2">Decision</h2>
            <p className="text-xl font-medium">Avoid burning today</p>

            <div className="mt-4 text-sm text-[#C8C4BE] space-y-2">
              <p>• Wind exposure elevated</p>
              <p>• Dry conditions this afternoon</p>
              <p>• Soil stable for prep</p>
            </div>
          </section>

        </div>

        {/* System Surface */}
        <section className="border border-[#252523] p-4 text-xs text-[#8A8680]">
          <p>source: weather-api + field-log</p>
          <p>node: core-111 · n8n-188</p>
          <p>rules: burn_lock.wind_high</p>
        </section>

      </div>
    </main>
  );
}
