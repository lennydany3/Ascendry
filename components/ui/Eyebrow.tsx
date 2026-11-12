import type { ReactNode } from "react";

export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`font-mono text-xs leading-[1.4] tracking-[0.16em] uppercase text-fg-subtle ${className}`}
    >
      {children}
    </p>
  );
}
