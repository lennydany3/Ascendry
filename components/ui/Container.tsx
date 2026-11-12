import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full max-w-[1296px] px-[clamp(24px,4vw,48px)] ${className}`}
    >
      {children}
    </div>
  );
}
