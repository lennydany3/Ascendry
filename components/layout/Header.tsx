"use client";

import Link from "next/link";
import { useCallback, useEffect, useState, type CSSProperties } from "react";
import { Logo, LogoMark } from "@/components/ui/Logo";

export type Brand = "studio" | "labs";

const config = {
  studio: {
    home: "/",
    tag: "Studio",
    links: [
      { label: "Work", href: "#work" },
      { label: "Services", href: "#services" },
      { label: "About", href: "#about" },
    ],
    cta: "Get a quote",
  },
  labs: {
    home: "/labs",
    tag: "Labs",
    links: [
      { label: "Lab", href: "#lab" },
      { label: "Approach", href: "#approach" },
      { label: "Principles", href: "#principles" },
    ],
    cta: "Get in touch",
  },
} as const;

function BrandSwitch({ brand, className = "" }: { brand: Brand; className?: string }) {
  return (
    <div
      role="group"
      aria-label="Switch between Ascendry Studio and Labs"
      className={`items-center rounded-lg border border-white/15 bg-white/[0.05] p-0.5 ${className}`}
    >
      {(["studio", "labs"] as const).map((b) => (
        <Link
          key={b}
          href={config[b].home}
          scroll={false}
          onClick={() => {
            try {
              sessionStorage.setItem("brand-switch", "1");
              // Tells the destination which loader variant to play.
              if (b !== brand) sessionStorage.setItem("ascendry-toggle-to", b);
            } catch {}
          }}
          aria-current={b === brand ? "page" : undefined}
          className={`rounded-md px-3 py-1.5 font-mono text-[11px] leading-none tracking-[0.12em] uppercase transition-colors duration-200 ${
            b === brand
              ? "bg-white/[0.16] text-fg"
              : "text-[#a8a8a8] hover:text-fg"
          }`}
        >
          {config[b].tag}
        </Link>
      ))}
    </div>
  );
}

function Arrow() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="transition-transform duration-200 ease-out group-hover:translate-x-0.5"
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

export function Header({ brand = "studio" }: { brand?: Brand }) {
  const { links, cta, tag, home } = config[brand];
  const mobileLinks = [...links, { label: "Contact", href: "#contact" }];
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [active, setActive] = useState<string>("");

  const close = useCallback(() => {
    setClosing(true);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.setTimeout(
      () => {
        setOpen(false);
        setClosing(false);
      },
      reduced ? 0 : 320,
    );
  }, []);

  // After switching Studio <-> Labs always land at the top of the new page
  // (Next's default scroll handling can land on the footer).
  useEffect(() => {
    try {
      if (sessionStorage.getItem("brand-switch")) {
        sessionStorage.removeItem("brand-switch");
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }
    } catch {}
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight the nav link of the section crossing the viewport middle.
  useEffect(() => {
    const ids = [...config[brand].links.map((l) => l.href.slice(1)), "contact"];
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (!els.length || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) setActive(en.target.id);
          else setActive((cur) => (cur === en.target.id ? "" : cur));
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [brand]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
        <div
          className="anim-fade mx-auto max-w-[1296px]"
          style={{ "--d": "1000ms" } as CSSProperties}
        >
          <div
            className={`grid h-14 grid-cols-[1fr_auto] items-center rounded-xl border pr-1.5 pl-4 transition-[background-color,border-color,box-shadow] duration-300 ease-out md:grid-cols-[1fr_auto_1fr] md:pl-5 ${
              scrolled
                ? "border-white/20 bg-[#0a0a0a]/95 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.9)] backdrop-blur-xl"
                : "border-white/10 bg-[#0a0a0a]/40 backdrop-blur-md"
            }`}
          >
            <div className="justify-self-start">
              <Logo href={home} tag={tag} />
            </div>

            <nav
              aria-label="Primary"
              className="hidden items-center gap-1 rounded-full border border-white/15 bg-white/[0.05] p-1 md:flex"
            >
              {links.map((l) => {
                const on = active === l.href.slice(1);
                return (
                  <Link
                    key={l.label}
                    href={l.href}
                    aria-current={on ? "location" : undefined}
                    className={`rounded-full px-4 py-1.5 text-sm transition-[color,background-color] duration-200 ${
                      on
                        ? "bg-white/[0.16] text-fg"
                        : "text-[#d4d4d4] hover:bg-white/[0.08] hover:text-fg"
                    }`}
                  >
                    {l.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-3 justify-self-end">
              <BrandSwitch brand={brand} className="hidden lg:flex" />
              <Link
                href="#contact"
                className="group hidden h-10 items-center gap-2 rounded-lg bg-fg px-4 text-sm font-medium text-bg transition-colors duration-150 hover:bg-[#e5e5e5] md:inline-flex"
              >
                {cta}
                <Arrow />
              </Link>
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                aria-expanded={open}
                aria-haspopup="dialog"
                className="flex size-11 cursor-pointer items-center justify-center rounded-lg border-0 bg-transparent text-fg transition-colors hover:bg-white/[0.06] md:hidden"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M4 8h16" />
                  <path d="M9 16h11" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className={`${closing ? "menu-out pointer-events-none" : "anim-fade"} fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-bg px-5 pt-3 pb-[max(2rem,env(safe-area-inset-bottom))]`}
          style={{ "--d": "0ms" } as CSSProperties}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-[60%] bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(255,255,255,0.07),transparent_70%)]"
          />
          <div className="relative flex h-14 items-center justify-between pl-1">
            <span className="flex items-center gap-[7px] text-fg">
              <LogoMark />
              <span className="text-sm font-medium tracking-[0.2em]">
                ASCENDRY
              </span>
            </span>
            <button
              type="button"
              onClick={close}
              aria-label="Close menu"
              className="flex size-11 cursor-pointer items-center justify-center rounded-lg border border-line bg-white/[0.03] text-fg"
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

          <BrandSwitch brand={brand} className="relative mt-6 flex w-fit" />

          <nav
            aria-label="Mobile"
            className="relative mt-4 flex flex-col border-t border-line"
          >
            {mobileLinks.map((l, i) => (
              <Link
                key={l.label}
                href={l.href}
                onClick={close}
                className="anim-menu group flex items-baseline justify-between border-b border-line py-5"
                style={{ "--i": i } as CSSProperties}
              >
                <span className="flex items-baseline gap-4">
                  <span className="font-mono text-xs tracking-[0.16em] text-fg-subtle">
                    0{i + 1}
                  </span>
                  <span className="font-display text-[clamp(40px,12vw,56px)] leading-none text-fg">
                    {l.label}
                  </span>
                </span>
                <span className="text-fg-subtle transition-transform duration-200 group-active:translate-x-1">
                  <Arrow />
                </span>
              </Link>
            ))}
          </nav>

          <div
            className="anim-menu relative mt-auto flex flex-col gap-4 pt-10"
            style={{ "--i": 5 } as CSSProperties}
          >
            <Link
              href="#contact"
              onClick={close}
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-fg text-sm font-medium text-bg"
            >
              {cta}
              <Arrow />
            </Link>
            <a
              href="mailto:hello@ascendry.in"
              className="text-center text-sm text-fg-subtle"
            >
              hello@ascendry.in
            </a>
          </div>
        </div>
      ) : null}
    </>
  );
}
