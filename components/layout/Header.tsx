"use client";

import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";
import { Logo, LogoMark } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";

const links = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 h-16 border-b transition-[background-color,border-color] duration-250 ease-out ${
          scrolled
            ? "border-line bg-bg/80 backdrop-blur-[12px]"
            : "border-transparent bg-transparent"
        }`}
      >
        <div
          className="anim-fade mx-auto grid h-full max-w-[1296px] grid-cols-[1fr_auto_1fr] items-center px-[clamp(24px,4vw,48px)]"
          style={{ "--d": "1200ms" } as CSSProperties}
        >
          <div className="justify-self-start">
            <Logo />
          </div>

          <nav aria-label="Primary" className="hidden gap-8 md:flex">
            {links.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="text-sm text-fg-muted transition-colors duration-150 hover:text-fg"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="col-start-3 flex items-center gap-3 justify-self-end">
            <Button
              href="#contact"
              className="hidden !h-9 !px-4 md:!inline-flex"
            >
              Get a quote
            </Button>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="-mr-2.5 flex size-11 cursor-pointer items-center justify-center border-0 bg-transparent text-fg md:hidden"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M4 8h16" />
                <path d="M4 16h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="anim-fade fixed inset-0 z-[60] flex flex-col bg-bg px-6 pb-8"
          style={{ "--d": "0ms" } as CSSProperties}
        >
          <div className="flex h-16 items-center justify-between">
            <span className="flex items-center gap-[7px] text-fg">
              <LogoMark />
              <span className="text-sm font-medium tracking-[0.2em]">
                ASCENDRY
              </span>
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="-mr-2.5 flex size-11 cursor-pointer items-center justify-center border-0 bg-transparent text-fg"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M6 6l12 12" />
                <path d="M18 6L6 18" />
              </svg>
            </button>
          </div>
          <nav aria-label="Mobile" className="mt-12 flex flex-col gap-2">
            {[...links, { label: "Contact", href: "#contact" }].map((l, i) => (
              <Link
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="anim-menu font-display text-[52px] leading-[1.1] text-fg"
                style={{ "--i": i } as CSSProperties}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div
            className="anim-menu mt-auto flex flex-col gap-4"
            style={{ "--i": 4 } as CSSProperties}
          >
            <Button href="#contact" variant="primary" className="justify-center">
              Get a quote
            </Button>
            <span className="text-center text-sm text-fg-subtle">
              hello@ascendry.in
            </span>
          </div>
        </div>
      ) : null}
    </>
  );
}
