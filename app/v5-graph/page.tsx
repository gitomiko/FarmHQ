import { RuleGraphV2 } from "@/components/farmhq/rule-graph-v2";

export default function V5Graph() {
  return (
    <main className="min-h-screen bg-[#1C1C1B] text-[#EDE8E0] p-6">
      <div className="max-w-6xl mx-auto space-y-6">

        <header className="border-b border-[#252523] pb-4">
          <h1 className="text-3xl">FarmHQ</h1>
          <p className="text-sm text-[#8A8680]">V5 · Visual Rule Graph</p>
        </header>

        <RuleGraphV2 />

      </div>
    </main>
  );
}
