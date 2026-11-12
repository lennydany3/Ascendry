import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "inverted";

const variants: Record<Variant, string> = {
  primary: "bg-fg text-bg hover:bg-[#e5e5e5]",
  secondary: "border border-line-strong text-fg hover:bg-surface",
  inverted: "bg-invert-fg text-invert-bg hover:bg-[#262626]",
};

export const buttonBase =
  "inline-flex h-11 items-center gap-2 rounded-sm px-5 text-sm font-medium transition-[background-color,transform] duration-150 ease-out";

export function Button({
  href,
  variant = "secondary",
  children,
  className = "",
}: {
  href: string;
  variant?: Variant;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={`${buttonBase} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}
