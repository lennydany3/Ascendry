import type { CSSProperties } from "react";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Eyebrow } from "@/components/ui/Eyebrow";
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
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[length:64px_64px] bg-[position:center_top] [mask-image:radial-gradient(ellipse_65%_60%_at_60%_45%,#000_20%,transparent_75%)]"
      />

      <div className="relative mx-auto flex w-full max-w-[1296px] flex-1 flex-col items-center justify-center gap-x-12 gap-y-6 px-[clamp(24px,4vw,48px)] pt-28 pb-16 md:flex-row-reverse">
        <HeroMark />

        <div className="w-full md:flex-[1_1_540px]">
          <div className="anim-rev mb-8" style={d(600)}>
            <Eyebrow>— Web studio · Chennai → Worldwide</Eyebrow>
          </div>

          <h1 className="font-display text-[clamp(52px,6.6vw,96px)] leading-[0.95] font-normal tracking-[-0.02em]">
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
            className="anim-rev mt-8 max-w-[46ch] text-[clamp(18px,1.4vw,20px)] leading-[1.6] text-fg-muted [text-wrap:pretty]"
            style={d(1250)}
          >
            Premium websites, booking systems and automation for cafes, gyms,
            salons, restaurants and growing businesses.
          </p>

          <div className="anim-rev mt-10 flex flex-wrap gap-3" style={d(1350)}>
            <MagneticButton href="#work">View our work</MagneticButton>
            <Button href="#contact">Get a quote</Button>
          </div>

          <p
            className="anim-rev mt-8 text-sm leading-[1.6] text-fg-subtle"
            style={d(1450)}
          >
            Registered business · Fast delivery · Built with Next.js
          </p>
        </div>
      </div>

      <Marquee />
    </section>
  );
}
