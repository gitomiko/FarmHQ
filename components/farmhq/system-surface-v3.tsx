export function SystemSurfaceV3({ surface }: any) {
  return (
    <div className="border border-[#252523] bg-[#161615] p-4 text-xs text-[#8A8680] space-y-3">
      <div>
        <div className="uppercase tracking-[0.2em] text-[10px]">Source</div>
        <div className="mt-1 text-[#C8C4BE]">{surface.source}</div>
      </div>
      <div>
        <div className="uppercase tracking-[0.2em] text-[10px]">Rule</div>
        <div className="mt-1 text-[#C8C4BE]">{surface.rule}</div>
      </div>
      <div>
        <div className="uppercase tracking-[0.2em] text-[10px]">Freshness</div>
        <div className="mt-1 text-[#C8C4BE]">{surface.freshness}</div>
      </div>
      <div>
        <div className="uppercase tracking-[0.2em] text-[10px]">Nodes</div>
        <div className="mt-1 text-[#C8C4BE]">{surface.nodes}</div>
      </div>
    </div>
  );
}
