"use client";

import Image from "next/image";
import { useState } from "react";
import type { Shot } from "@/lib/clients";

/** Browser frame with a large screenshot and a thumbnail switcher. */
export function Showcase({ shots, url, name }: { shots: Shot[]; url: string; name: string }) {
  const [i, setI] = useState(0);
  const host = url.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <div>
      <div className="overflow-hidden rounded-xl border border-line-strong bg-[#0c0c0c] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)]">
        <div className="relative flex h-8 items-center sm:h-10 border-b border-line px-4">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-white/15" />
          </div>
          <span className="absolute left-1/2 max-w-[65%] -translate-x-1/2 truncate rounded-md bg-white/[0.05] px-2.5 py-0.5 font-mono text-[10px] sm:px-3 sm:py-1 sm:text-[11px] text-fg-subtle">
            {host}
          </span>
        </div>
        <div className="relative aspect-[16/10] bg-[#0c0c0c]">
          {shots.map((s, n) => (
            <Image
              key={s.src}
              src={s.src}
              alt={s.alt}
              width={s.width}
              height={s.height}
              sizes="(min-width: 1280px) 1200px, 100vw"
              priority={n === 0}
              className={`absolute inset-0 size-full object-contain transition-opacity duration-300 ${
                n === i ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            />
          ))}
        </div>
      </div>

      <p className="mt-3 font-mono text-[11px] tracking-[0.14em] text-fg-subtle uppercase sm:hidden" aria-live="polite">
        {shots[i].label}
      </p>

      <div role="tablist" aria-label={`${name} screens`} className="mt-3 grid grid-cols-4 gap-2 sm:mt-4 sm:gap-3">
        {shots.map((s, n) => (
          <button
            key={s.src}
            type="button"
            role="tab"
            aria-selected={n === i}
            aria-label={`Show ${s.label} screen`}
            onClick={() => setI(n)}
            className={`group min-w-0 cursor-pointer text-left transition-opacity ${n === i ? "opacity-100" : "opacity-55 hover:opacity-100"}`}
          >
            <span
              className={`relative block aspect-[16/10] overflow-hidden rounded-md border bg-[#0c0c0c] transition-colors ${
                n === i ? "border-fg" : "border-line group-hover:border-line-strong"
              }`}
            >
              <Image
                src={s.src}
                alt=""
                width={s.width}
                height={s.height}
                sizes="300px"
                className="size-full object-cover object-top"
              />
            </span>
            <span className="mt-2 hidden truncate font-mono text-[11px] tracking-[0.14em] text-fg-subtle uppercase sm:block">
              {s.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
