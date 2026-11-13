"use client";

import { useState } from "react";
import { ProjectDetail } from "@/components/clients/ProjectDetail";
import { CLIENTS } from "@/lib/clients";

/** Pick a project, see all of its details in one view. */
export function ClientsExplorer() {
  const [i, setI] = useState(0);
  const c = CLIENTS[i];

  return (
    <div>
      <div
        role="tablist"
        aria-label="Projects"
        className="flex gap-1 overflow-x-auto border-b border-line [scrollbar-width:none]"
      >
        {CLIENTS.map((p, n) => (
          <button
            key={p.slug}
            type="button"
            role="tab"
            id={`tab-${p.slug}`}
            aria-selected={n === i}
            aria-controls="project-panel"
            onClick={() => setI(n)}
            className={`-mb-px flex shrink-0 cursor-pointer items-baseline gap-2.5 border-b-2 px-4 py-3 transition-colors ${
              n === i ? "border-fg text-fg" : "border-transparent text-fg-subtle hover:text-fg"
            }`}
          >
            <span className="font-mono text-[11px] tabular-nums">{String(n + 1).padStart(2, "0")}</span>
            <span className="font-display text-[22px] leading-none md:text-[26px]">{p.name}</span>
          </button>
        ))}
      </div>

      <div
        id="project-panel"
        role="tabpanel"
        aria-labelledby={`tab-${c.slug}`}
        className="pt-8 md:pt-10"
      >
        <ProjectDetail c={c} />
      </div>
    </div>
  );
}
