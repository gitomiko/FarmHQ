import { ruleNodes, ruleEdges } from "@/src/mock/rules";

function color(node: any) {
  if (node.status === "blocked") return "border-[#7A3F2A] text-[#7A3F2A]";
  if (node.status === "active") return "border-[#8C6A3A] text-[#8C6A3A]";
  if (node.status === "ready") return "border-[#5A7A6A] text-[#5A7A6A]";
  return "border-[#252523] text-[#8A8680]";
}

export function RuleGraph() {
  return (
    <div className="border border-[#252523] bg-[#161615] p-4 space-y-4">
      <div className="text-xs uppercase tracking-[0.2em] text-[#8A8680]">Rule Graph</div>

      <div className="space-y-2">
        {ruleNodes.map((node) => (
          <div key={node.id} className={["border px-3 py-2 text-xs", color(node)].join(" ")}>
            <div className="font-medium">{node.label}</div>
            <div className="text-[#8A8680]">{node.detail}</div>
          </div>
        ))}
      </div>

      <div className="text-[10px] text-[#8A8680]">
        {ruleEdges.map((e, i) => (
          <div key={i}>{e.from} → {e.to} {e.label ? `(${e.label})` : ""}</div>
        ))}
      </div>
    </div>
  );
}
