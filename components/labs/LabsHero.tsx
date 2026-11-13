import type { CSSProperties } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";

const words = [
  { w: "Ideas" },
  { w: "that" },
  { w: "become" },
  { w: "products.", italic: true },
];

const facts = [
  ["Built", "In-house"],
  ["Shipped", "In the open"],
  ["Based in", "Chennai, IN"],
];

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/** Exploded-view illustration: wireframe -> glass -> chrome (public/labs-hero.svg). */
function LaunchPanel() {
  return (
    <div
      className="anim-fade w-full justify-self-center lg:justify-self-end"
      style={d(500)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/labs-hero.svg"
        alt="The Ascendry A shown as an exploded assembly: a wireframe crossbar (idea), a glass left leg (prototype) and a finished chrome right leg (launch)."
        width={560}
        height={640}
        className="mx-auto block h-auto w-full max-w-[560px] lg:mr-0"
      />
    </div>
  );
}

export function LabsHero() {
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
        className="pointer-events-none absolute top-0 left-1/2 h-[520px] w-[900px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(150,170,255,0.08),transparent_65%)]"
      />

      <div className="relative mx-auto grid w-full max-w-[1296px] flex-1 content-center items-center gap-10 px-[clamp(20px,4vw,48px)] pt-28 pb-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-8 lg:pt-32">
        <div className="min-w-0">
          <h1 className="font-display text-[clamp(44px,13vw,64px)] leading-[0.96] font-normal tracking-[-0.02em] sm:text-[clamp(64px,9vw,88px)] lg:text-[clamp(60px,6.2vw,96px)]">
            {words.map(({ w, italic }, i) => (
              <span
                key={i}
                className={`inline-block overflow-hidden align-top pb-[0.12em] -mb-[0.12em] ${
                  i === words.length - 1 ? "" : "mr-[0.24em]"
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
            className="anim-rev mt-7 max-w-[46ch] text-[17px] leading-[1.65] text-fg-muted [text-wrap:pretty] sm:mt-9 sm:text-[19px]"
            style={d(1100)}
          >
            Our own startup ideas, built and launched in the open — one
            product at a time.
          </p>

          <div
            className="anim-rev mt-9 flex flex-col gap-3 sm:mt-11 sm:flex-row"
            style={d(1200)}
          >
            <MagneticButton href="#lab" className="!h-12 justify-center sm:!h-11">
              See the lab
            </MagneticButton>
            <Button href="#contact" className="!h-12 justify-center sm:!h-11">
              Get in touch
            </Button>
          </div>

          <dl
            className="anim-rev mt-12 grid max-w-[520px] grid-cols-3 gap-6 border-t border-line pt-6 sm:mt-14"
            style={d(1300)}
          >
            {facts.map(([k, v]) => (
              <div key={k}>
                <dt className="font-mono text-[10px] tracking-[0.18em] text-fg-subtle uppercase">
                  {k}
                </dt>
                <dd className="mt-2 text-[15px] text-fg">{v}</dd>
              </div>
            ))}
          </dl>

          <p
            className="anim-rev mt-8 text-sm leading-[1.6] text-fg-subtle"
            style={d(1400)}
          >
            Looking for client work?{" "}
            <Link
              href="/"
              className="text-fg-muted underline decoration-white/20 underline-offset-4 transition-colors hover:text-fg hover:decoration-fg"
            >
              Visit Ascendry Studio →
            </Link>
          </p>
        </div>

        <LaunchPanel />
      </div>
    </section>
  );
}
