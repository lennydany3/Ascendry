"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { buttonBase } from "./Button";

/** Primary button with a subtle (<= 6px) magnetic pull and sliding arrow. */
export function MagneticButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const arrow = useRef<HTMLSpanElement>(null);

  const reduced = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <Link
      ref={ref}
      href={href}
      className={`${buttonBase} bg-fg text-bg hover:bg-[#e5e5e5] ${className}`}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el || reduced()) return;
        const r = el.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
        const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
        el.style.transform = `translate(${(dx * 6).toFixed(2)}px,${(dy * 6).toFixed(2)}px)`;
        if (arrow.current) arrow.current.style.transform = "translateX(3px)";
      }}
      onMouseLeave={() => {
        if (ref.current) ref.current.style.transform = "";
        if (arrow.current) arrow.current.style.transform = "";
      }}
    >
      {children}
      <span
        ref={arrow}
        aria-hidden="true"
        className="inline-block transition-transform duration-150 ease-out"
      >
        →
      </span>
    </Link>
  );
}
