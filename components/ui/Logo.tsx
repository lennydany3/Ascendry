import Link from "next/link";

/** "Split Summit" A — exact paths from the design system. Never redraw. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="8 0 112 116"
      width="14"
      height="15"
      aria-hidden="true"
      className={className}
    >
      <g fill="currentColor">
        <path d="M8 116 41 18h17L34 116z" />
        <path d="M73 0h17l30 116H94z" />
        <path d="M25 82h40l4 14H21z" />
      </g>
    </svg>
  );
}

export function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link
      href={href}
      aria-label="Ascendry home"
      className="flex items-center gap-[7px] text-fg"
    >
      <LogoMark className="block" />
      <span className="text-sm font-medium leading-none tracking-[0.2em]">
        ASCENDRY
      </span>
    </Link>
  );
}
