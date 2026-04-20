"use client";

import { actionCommands } from "@/src/mock/actions";

export function ActionPanel() {
  async function runAction(cmd: any) {
    await fetch("/api/action", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cmd),
    });

    alert(`Action triggered: ${cmd.label}`);
  }

  return (
    <div className="border border-[#252523] bg-[#161615] p-4 space-y-4">
      <div className="text-xs uppercase tracking-[0.2em] text-[#8A8680]">Action Panel</div>

      <div className="space-y-2">
        {actionCommands.map((cmd) => (
          <button
            key={cmd.id}
            onClick={() => runAction(cmd)}
            className="w-full text-left border border-[#252523] px-3 py-2 hover:bg-[#1A1A19]"
          >
            <div className="text-sm text-[#EDE8E0]">{cmd.label}</div>
            <div className="text-xs text-[#8A8680]">{cmd.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
