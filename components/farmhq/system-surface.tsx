export function SystemSurface({ surface }: any) {
  return (
    <div className="border border-[#252523] p-4 text-xs text-[#8A8680] space-y-1">
      <div><strong>source:</strong> {surface.source}</div>
      <div><strong>rule:</strong> {surface.rule}</div>
      <div><strong>freshness:</strong> {surface.freshness}</div>
      <div><strong>nodes:</strong> {surface.nodes}</div>
    </div>
  );
}
