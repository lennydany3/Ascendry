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

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

const stages = [
  { n: "01", label: "Idea", x: 40, y: 250 },
  { n: "02", label: "Prototype", x: 170, y: 170 },
  { n: "03", label: "Launch", x: 300, y: 70 },
];

/** Idea → Prototype → Launch trajectory. Pure SVG + CSS, no JS. */
function LaunchPanel() {
  return (
    <div
      aria-hidden="true"
      className="anim-fade relative aspect-[5/4] w-full overflow-hidden rounded-2xl border border-line bg-[radial-gradient(ellipse_70%_60%_at_60%_35%,rgba(150,170,255,0.09),transparent_70%)] sm:aspect-[16/11] lg:aspect-auto lg:h-[clamp(480px,68vh,640px)]"
      style={d(500)}
    >
      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-4 py-3 font-mono text-[10px] tracking-[0.16em] text-fg-subtle uppercase">
        <span>Fig. 02</span>
        <span>Idea → Launch</span>
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[length:40px_40px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_55%,#000_20%,transparent_80%)]" />
      <svg
        viewBox="0 0 340 320"
        className="absolute inset-0 m-auto h-[82%] w-[88%] overflow-visible"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="labs-line" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.1" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0.95" />
          </linearGradient>
        </defs>
        <path
          d="M40 250 C 100 250, 120 175, 170 170 S 250 80, 300 70"
          fill="none"
          stroke="url(#labs-line)"
          strokeWidth="1.5"
          strokeDasharray="1"
          pathLength="1"
          className="labs-draw"
        />
        {stages.map((s, i) => (
          <g key={s.n} transform={`translate(${s.x} ${s.y})`}>
            <g className="anim-fade" style={d(1100 + i * 350)}>
              <circle r="14" fill="rgba(255,255,255,0.05)" />
              <circle
                r="5"
                fill={i === 2 ? "#fafafa" : "#0a0a0a"}
                stroke="#fafafa"
                strokeWidth="1.5"
              />
              <text
                y="-26"
                textAnchor="middle"
                className="fill-[#7c7c7c] font-mono text-[9px] tracking-[0.16em]"
              >
                {s.n}
              </text>
              <text
                y="34"
                textAnchor="middle"
                className="fill-[#fafafa] font-mono text-[10px] tracking-[0.14em] uppercase"
              >
                {s.label}
              </text>
            </g>
          </g>
        ))}
      </svg>
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
          <div className="anim-rev mb-6 sm:mb-8" style={d(600)}>
            <p className="inline-flex items-center gap-2.5 rounded-full border border-line bg-white/[0.03] py-1.5 pr-3.5 pl-3 font-mono text-[11px] leading-none tracking-[0.14em] text-fg-muted uppercase">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#9db0ff] opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex size-1.5 rounded-full bg-[#9db0ff]" />
              </span>
              Ascendry Labs · Our own products
            </p>
          </div>

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
            className="anim-rev mt-6 max-w-[44ch] text-[17px] leading-[1.6] text-fg-muted [text-wrap:pretty] sm:mt-8 sm:text-[19px]"
            style={d(1100)}
          >
            Ascendry Labs is where our own startup ideas get built and
            launched — designed, shipped and improved in the open, one product
            at a time.
          </p>

          <div
            className="anim-rev mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row"
            style={d(1200)}
          >
            <MagneticButton href="#lab" className="!h-12 justify-center sm:!h-11">
              See the lab
            </MagneticButton>
            <Button href="#contact" className="!h-12 justify-center sm:!h-11">
              Get in touch
            </Button>
          </div>

          <p
            className="anim-rev mt-8 text-sm leading-[1.6] text-fg-subtle sm:mt-10"
            style={d(1300)}
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
