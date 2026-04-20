import { DecisionState } from "@/src/mock/dashboard";

export function DecisionPanel({ decision }: { decision: DecisionState }) {
  return (
    <div className="border border-[#252523] p-4 space-y-4">
      <div>
        <h2 className="text-sm text-[#8A8680]">PRIMARY DECISION</h2>
        <p className="text-xl">{decision.title}</p>
      </div>

      <div>
        <h3 className="text-xs text-[#8A8680]">WHY</h3>
        <ul className="text-sm">
          {decision.why.map((w) => (
            <li key={w}>• {w}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-xs text-[#8A8680]">ACTIONS</h3>
        <ul className="text-sm">
          {decision.actions.map((a) => (
            <li key={a.label}>
              [{a.done ? "x" : " "}] {a.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
