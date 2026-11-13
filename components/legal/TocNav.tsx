"use client";

import { useEffect, useState } from "react";

type Item = { id: string; title: string };

/** Sticky table of contents with scroll-spy. */
export function TocNav({ items }: { items: Item[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const els = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => !!el);
    if (!els.length || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) setActive(en.target.id);
        });
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav aria-label="On this page">
      <p className="mb-4 font-mono text-[11px] tracking-[0.16em] text-fg-subtle uppercase">
        On this page
      </p>
      <ol className="space-y-0.5 border-l border-line">
        {items.map((it, i) => {
          const on = active === it.id;
          return (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                aria-current={on ? "location" : undefined}
                className={`-ml-px flex gap-3 border-l py-1.5 pl-4 text-sm leading-snug transition-colors duration-150 ${
                  on
                    ? "border-fg text-fg"
                    : "border-transparent text-fg-muted hover:text-fg"
                }`}
              >
                <span className="font-mono text-[11px] leading-[1.6] text-fg-subtle tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {it.title}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
