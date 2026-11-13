import type { CSSProperties } from "react";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { HeroMark } from "./HeroMark";
import { Marquee } from "./Marquee";

const words = [
  { w: "Websites" },
  { w: "that" },
  { w: "work", italic: true },
  { w: "as" },
  { w: "hard" },
  { w: "as" },
  { w: "you" },
  { w: "do." },
];

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export function Hero() {
  return (
    <section
      aria-label="Introduction"
      className="relative flex min-h-svh flex-col overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[length:64px_64px] bg-[position:center_top] [mask-image:radial-gradient(ellipse_75%_60%_at_50%_40%,#000_10%,transparent_75%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 h-[520px] w-[900px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06),transparent_65%)]"
      />

      <div className="relative mx-auto grid w-full max-w-[1296px] flex-1 content-center items-center gap-10 px-[clamp(20px,4vw,48px)] pt-28 pb-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-8 lg:pt-32 lg:pb-16">
        <div className="min-w-0">
          <div className="anim-rev mb-6 sm:mb-8" style={d(600)}>
            <p className="inline-flex items-center gap-2.5 rounded-full border border-line bg-white/[0.03] py-1.5 pr-3.5 pl-3 font-mono text-[11px] leading-none tracking-[0.14em] text-fg-muted uppercase">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex size-1.5 rounded-full bg-success" />
              </span>
              Web studio · Chennai → Worldwide
            </p>
          </div>

          <h1 className="font-display text-[clamp(44px,13vw,64px)] leading-[0.96] font-normal tracking-[-0.02em] sm:text-[clamp(64px,9vw,88px)] lg:text-[clamp(60px,6.2vw,96px)]">
            {words.map(({ w, italic }, i) => (
              <span
                key={i}
                className={`inline-block overflow-hidden align-top pb-[0.12em] -mb-[0.12em] ${
                  i === words.length - 1 ? "" : italic ? "mr-[0.2em] pr-[0.04em]" : "mr-[0.24em]"
                }`}
              >
                <span
                  className={`anim-word ${italic ? "italic text-fg-muted" : ""}`}
                  style={{ "--i": i } as CSSProperties}
                >
                  {w}
                </span>
              </span>
            ))}
          </h1>

          <p
            className="anim-rev mt-6 max-w-[44ch] text-[17px] leading-[1.6] text-fg-muted [text-wrap:pretty] sm:mt-8 sm:text-[19px]"
            style={d(1250)}
          >
            Premium websites, booking systems and automation for cafes, gyms,
            salons, restaurants and growing businesses.
          </p>

          <div
            className="anim-rev mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row"
            style={d(1350)}
          >
            <MagneticButton href="#work" className="!h-12 justify-center sm:!h-11">
              View our work
            </MagneticButton>
            <Button href="#contact" className="!h-12 justify-center sm:!h-11">
              Get a quote
            </Button>
          </div>

          <ul
            className="anim-rev mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-fg-subtle sm:mt-10"
            style={d(1450)}
          >
            {["Registered business", "Fast delivery", "Built with Next.js"].map(
              (t) => (
                <li key={t} className="flex items-center gap-2">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="text-fg-muted"
                  >
                    <path d="M3 8.5l3.2 3.2L13 5" />
                  </svg>
                  {t}
                </li>
              ),
            )}
          </ul>
        </div>

        <HeroMark />
      </div>

      <Marquee />
    </section>
  );
}
