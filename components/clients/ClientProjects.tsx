"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ProjectDetail } from "@/components/clients/ProjectDetail";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { CLIENTS } from "@/lib/clients";

/** Home-page strip of client projects; each opens a detail popup. */
export function ClientProjects() {
  const [open, setOpen] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const c = open === null ? null : CLIENTS[open];

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (c && !d.open) d.showModal();
    document.body.style.overflow = c ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [c]);

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <p className="font-mono text-xs tracking-[0.16em] text-fg-subtle uppercase">Shipped for clients</p>
        <Link
          href="/clients"
          className="group inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
        >
          All clients
          <ArrowRightIcon width={16} height={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {CLIENTS.map((p, n) => (
          <Reveal key={p.slug} delay={n * 60}>
            <button
              type="button"
              onClick={() => setOpen(n)}
              aria-haspopup="dialog"
              className="group flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-xl border border-line bg-surface text-left transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-line-strong"
            >
              <span className="relative block aspect-[16/10] overflow-hidden border-b border-line bg-[#0c0c0c]">
                <Image
                  src={p.shots[0].src}
                  alt=""
                  width={p.shots[0].width}
                  height={p.shots[0].height}
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="size-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
              </span>
              <span className="flex flex-1 flex-col p-5">
                <span className="font-mono text-[11px] tracking-[0.16em] text-fg-subtle uppercase">{p.kind}</span>
                <span className="mt-2 font-display text-[30px] leading-[1.1]">{p.name}</span>
                <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm text-fg-muted transition-colors group-hover:text-fg">
                  View project
                  <ArrowRightIcon width={16} height={16} className="transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      <dialog
        ref={dialog}
        aria-labelledby="project-dialog-title"
        onClose={() => setOpen(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) e.currentTarget.close();
        }}
        className="m-auto max-h-[calc(100dvh-24px)] w-[min(1180px,calc(100vw-24px))] overflow-y-auto rounded-2xl border border-line-strong bg-bg p-0 text-fg backdrop:bg-black/75 backdrop:backdrop-blur-sm"
      >
        {c ? (
          <div className="relative p-5 pt-16 sm:p-8 sm:pt-16 lg:p-10 lg:pt-14">
            <button
              type="button"
              onClick={() => dialog.current?.close()}
              aria-label="Close"
              className="absolute top-4 right-4 flex size-10 cursor-pointer items-center justify-center rounded-lg border border-line bg-white/[0.04] text-fg transition-colors hover:bg-white/[0.1]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
            <ProjectDetail c={c} headingId="project-dialog-title" />
          </div>
        ) : null}
      </dialog>
    </div>
  );
}
