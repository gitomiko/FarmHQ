import { ruleNodes, ruleEdges } from "@/src/mock/rules";

const positions: Record<string, { x: number; y: number }> = {
  "signal.wind": { x: 80, y: 80 },
  "signal.humidity": { x: 80, y: 180 },
  "signal.fuel": { x: 80, y: 280 },
  "constraint.burn": { x: 330, y: 180 },
  "decision.primary": { x: 590, y: 180 },
  "action.prune": { x: 860, y: 120 },
  "action.boundary": { x: 860, y: 250 },
};

function nodeTone(status: string) {
  switch (status) {
    case "blocked":
      return {
        border: "#7A3F2A",
        fill: "#2A1713",
        text: "#C6886A",
      };
    case "active":
      return {
        border: "#8C6A3A",
        fill: "#2A1C10",
        text: "#D0A36A",
      };
    case "ready":
      return {
        border: "#5A7A6A",
        fill: "#101A18",
        text: "#93B3A3",
      };
    default:
      return {
        border: "#252523",
        fill: "#1A1A19",
        text: "#8A8680",
      };
  }
}

function edgePath(from: { x: number; y: number }, to: { x: number; y: number }) {
  const startX = from.x + 180;
  const startY = from.y + 34;
  const endX = to.x;
  const endY = to.y + 34;
  const c1x = startX + 60;
  const c1y = startY;
  const c2x = endX - 60;
  const c2y = endY;
  return `M ${startX} ${startY} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${endX} ${endY}`;
}

export function RuleGraphV2() {
  return (
    <div className="border border-[#252523] bg-[#161615] p-4 space-y-4 overflow-x-auto">
      <div>
        <div className="text-xs uppercase tracking-[0.2em] text-[#8A8680]">Rule Graph</div>
        <p className="text-sm text-[#C8C4BE] mt-1">
          Signals trigger constraints, constraints shape decisions, and decisions recommend safe substitute actions.
        </p>
      </div>

      <div className="border border-[#252523] bg-[#1A1A19] p-3 min-w-[1080px]">
        <svg viewBox="0 0 1080 380" className="w-full h-auto">
          <defs>
            <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,6 L9,3 z" fill="#4A4A48" />
            </marker>
          </defs>

          {ruleEdges.map((edge, index) => {
            const from = positions[edge.from];
            const to = positions[edge.to];
            if (!from || !to) return null;
            return (
              <g key={`${edge.from}-${edge.to}-${index}`}>
                <path
                  d={edgePath(from, to)}
                  fill="none"
                  stroke="#4A4A48"
                  strokeWidth="2"
                  markerEnd="url(#arrow)"
                />
                {edge.label ? (
                  <text
                    x={(from.x + to.x) / 2}
                    y={(from.y + to.y) / 2 - 14}
                    textAnchor="middle"
                    fontSize="11"
                    fill="#8A8680"
                  >
                    {edge.label}
                  </text>
                ) : null}
              </g>
            );
          })}

          {ruleNodes.map((node) => {
            const pos = positions[node.id];
            if (!pos) return null;
            const tone = nodeTone(node.status);
            return (
              <g key={node.id} transform={`translate(${pos.x}, ${pos.y})`}>
                <rect x="0" y="0" rx="8" ry="8" width="180" height="68" fill={tone.fill} stroke={tone.border} strokeWidth="1.5" />
                <text x="14" y="20" fontSize="10" fill="#8A8680" style={{ textTransform: "uppercase", letterSpacing: "0.16em" }}>
                  {node.kind}
                </text>
                <text x="14" y="40" fontSize="14" fill={tone.text}>
                  {node.label}
                </text>
                <text x="14" y="56" fontSize="10" fill="#C8C4BE">
                  {node.status}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
        <div className="border border-[#252523] p-3 bg-[#1A1A19]">
          <div className="uppercase tracking-[0.2em] text-[10px] text-[#8A8680]">Signal Layer</div>
          <p className="mt-2 text-[#C8C4BE]">Environmental and field conditions entering the rule system.</p>
        </div>
        <div className="border border-[#252523] p-3 bg-[#1A1A19]">
          <div className="uppercase tracking-[0.2em] text-[10px] text-[#8A8680]">Constraint Layer</div>
          <p className="mt-2 text-[#C8C4BE]">Hard limits that block unsafe actions under current conditions.</p>
        </div>
        <div className="border border-[#252523] p-3 bg-[#1A1A19]">
          <div className="uppercase tracking-[0.2em] text-[10px] text-[#8A8680]">Action Layer</div>
          <p className="mt-2 text-[#C8C4BE]">Safe alternatives recommended by the active decision surface.</p>
        </div>
      </div>
    </div>
  );
}
