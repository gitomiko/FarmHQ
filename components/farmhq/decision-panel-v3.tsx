import type { DecisionState } from "@/src/mock/dashboard";

export function DecisionPanelV3({ decision }: { decision: DecisionState }) {
  return (
    <div className="border border-[#252523] bg-[#161615] p-4 space-y-5">
      <div>
        <h2 className="text-xs text-[#8A8680] uppercase tracking-[0.2em]">Primary Decision</h2>
        <p className="text-xl text-[#EDE8E0] mt-1">{decision.title}</p>
      </div>

      <div>
        <h3 className="text-xs text-[#8A8680] uppercase tracking-[0.2em]">Why</h3>
        <ul className="mt-2 space-y-1 text-sm text-[#C8C4BE]">
          {decision.why.map((w) => (
            <li key={w}>• {w}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-xs text-[#8A8680] uppercase tracking-[0.2em]">Actions</h3>
        <ul className="mt-2 space-y-2 text-sm">
          {decision.actions.map((a) => (
            <li key={a.label} className="flex items-center gap-2">
              <span className={[
                "inline-flex items-center justify-center w-5 h-5 border",
                a.done ? "border-[#5A7A6A] text-[#5A7A6A]" : "border-[#252523] text-[#8A8680]",
              ].join(" ")}>
                {a.done ? "✓" : ""}
              </span>
              <span className={a.done ? "text-[#8A8680] line-through" : "text-[#EDE8E0]"}>
                {a.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
