import type { CSSProperties } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

type Demo = {
  niche: string;
  name: string;
  line: string;
  brand: string;
  surface: string;
};

// Palettes from the design system (demo sites keep their own colours).
const demos: Demo[] = [
  { niche: "Coffee cafe", name: "Bean and Brew", line: "Menu, orders and table bookings for a neighbourhood cafe.", brand: "#5C3D2E", surface: "#F3E9DC" },
  { niche: "Gaming cafe", name: "Respawn Arena", line: "Seat booking and tournament sign-ups.", brand: "#8B5CF6", surface: "#0E0B1A" },
  { niche: "Gym", name: "IronCore", line: "Memberships, class schedules and trial passes.", brand: "#E63946", surface: "#141414" },
  { niche: "Clothing", name: "Threadline", line: "A clean storefront for a fashion label.", brand: "#7D8F69", surface: "#F2EFE9" },
  { niche: "Stays", name: "Coastline Stays", line: "Rooms, rates and direct booking enquiries.", brand: "#1D6FA3", surface: "#F4ECDF" },
  { niche: "Restaurant", name: "Saffron Table", line: "Menus, reservations and WhatsApp ordering.", brand: "#E8891C", surface: "#8E1F1A" },
  { niche: "Salon & spa", name: "Luxe Studio", line: "Services, stylists and online appointments.", brand: "#A05C8E", surface: "#F8F0F4" },
  { niche: "Coaching", name: "Apex Academy", line: "Courses, batches and enrolment forms.", brand: "#1F7A4D", surface: "#F3F6F1" },
  { niche: "Bakery", name: "Crumb and Co", line: "Cake catalogue with custom order requests.", brand: "#B23A5B", surface: "#F7D774" },
];

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

/** Perceived luminance → pick a readable ink colour for the demo surface. */
function inkFor(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const lum = (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
  return lum > 0.5 ? "#1a1714" : "#f5f2ee";
}

const mix = (c: string, pct: number) =>
  `color-mix(in srgb, ${c} ${pct}%, transparent)`;

/**
 * A miniature website: nav, hero copy, call-to-action, media tile and feature
 * strip, drawn with the demo's own palette. Sized in container-query units so
 * it scales perfectly in every card.
 */
function MiniSite({ brand, surface }: Pick<Demo, "brand" | "surface">) {
  const ink = inkFor(surface);
  const bar = (w: string, h: string, c: string, extra = "") => (
    <span
      className={`block shrink-0 rounded-[0.5cqw] ${extra}`}
      style={{ width: w, height: h, background: c }}
    />
  );
  return (
    <div
      aria-hidden="true"
      className="@container absolute inset-0 overflow-hidden"
      style={{ background: surface }}
    >
      <div className="flex h-full flex-col p-[5cqw]">
        {/* nav */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[1.2cqw]">
            <span
              className="block size-[3cqw] rounded-[0.8cqw]"
              style={{ background: brand }}
            />
            {bar("11cqw", "1.6cqw", ink)}
          </div>
          <div className="flex items-center gap-[3cqw]">
            {bar("5cqw", "1.1cqw", mix(ink, 40))}
            {bar("5cqw", "1.1cqw", mix(ink, 40))}
            {bar("5cqw", "1.1cqw", mix(ink, 40))}
            <span
              className="block h-[3.6cqw] w-[9cqw] rounded-[1cqw]"
              style={{ background: brand }}
            />
          </div>
        </div>

        {/* hero */}
        <div className="mt-[5cqw] flex flex-1 items-start gap-[4cqw]">
          <div className="flex min-w-0 flex-1 flex-col gap-[1.6cqw]">
            {bar("11cqw", "1.2cqw", brand, "mb-[1cqw]")}
            {bar("92%", "4.6cqw", ink, "rounded-[0.8cqw]")}
            {bar("64%", "4.6cqw", ink, "rounded-[0.8cqw]")}
            <div className="mt-[1.2cqw] flex flex-col gap-[1.2cqw]">
              {bar("82%", "1.4cqw", mix(ink, 38))}
              {bar("58%", "1.4cqw", mix(ink, 38))}
            </div>
            <div className="mt-[2cqw] flex items-center gap-[1.6cqw]">
              <span
                className="block h-[4.4cqw] w-[14cqw] rounded-[1cqw]"
                style={{ background: brand }}
              />
              <span
                className="block h-[4.4cqw] w-[11cqw] rounded-[1cqw] border"
                style={{ borderColor: mix(ink, 28) }}
              />
            </div>
          </div>
          <div
            className="relative h-[27cqw] w-[34cqw] shrink-0 overflow-hidden rounded-[1.6cqw]"
            style={{
              background: `linear-gradient(140deg, ${brand}, color-mix(in srgb, ${brand} 55%, #000))`,
            }}
          >
            <span className="absolute -top-[7cqw] -right-[5cqw] block size-[22cqw] rounded-full bg-white/15" />
            <span className="absolute -bottom-[9cqw] left-[3cqw] block size-[18cqw] rounded-full bg-black/15" />
          </div>
        </div>

        {/* feature strip */}
        <div className="mt-[3cqw] grid grid-cols-3 gap-[2cqw]">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block h-[7cqw] rounded-[1.2cqw] border"
              style={{ background: mix(ink, 6), borderColor: mix(ink, 14) }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function BrowserFrame({ demo }: { demo: Demo }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg border border-white/10 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.8)] transition-transform duration-500 ease-out group-hover:-translate-y-1">
      <div className="relative flex h-8 shrink-0 items-center border-b border-white/10 bg-[#161616] px-3">
        <div className="flex gap-1.5">
          <span className="size-2 rounded-full bg-white/15" />
          <span className="size-2 rounded-full bg-white/15" />
          <span className="size-2 rounded-full bg-white/15" />
        </div>
        <span className="absolute left-1/2 -translate-x-1/2 rounded-md bg-white/[0.06] px-3 py-0.5 font-mono text-[10px] leading-4 tracking-[0.04em] text-fg-subtle">
          {slug(demo.name)}
        </span>
      </div>
      <div className="relative aspect-[16/10] w-full">
        <MiniSite brand={demo.brand} surface={demo.surface} />
      </div>
    </div>
  );
}

export function Work() {
  return (
    <section id="work" className="scroll-mt-16 border-t border-line py-24 md:py-40">
      <Container>
        <Reveal>
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHeader
              index="01"
              label="Selected work"
              title={
                <>
                  Built for <em>real</em> businesses.
                </>
              }
              lead="Nine demo sites across nine industries. Each one is a working starting point for your own."
            />
            <p className="font-mono text-xs leading-[1.6] tracking-[0.16em] whitespace-nowrap text-fg-subtle uppercase md:text-right">
              <span className="text-fg">09</span> demo sites
              <br />
              <span className="text-fg">09</span> industries
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 md:mt-16">
          {demos.map((d, i) => {
            return (
              <Reveal key={d.name} delay={(i % 3) * 60}>
                <article
                  className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface p-4 transition-[border-color,background-color] duration-300 ease-out hover:border-[color-mix(in_srgb,var(--c)_50%,rgba(255,255,255,0.1))] sm:p-5"
                  style={{ "--c": d.brand } as CSSProperties}
                >
                  {/* brand-coloured glow on hover */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,color-mix(in_srgb,var(--c)_22%,transparent),transparent_70%)]"
                  />

                  <div className="relative flex flex-1 flex-col">
                    <div className="flex-1">
                      <BrowserFrame demo={d} />
                    </div>

                    <div className="mt-6 flex items-center justify-between gap-4">
                      <span className="flex items-center gap-2 font-mono text-[11px] leading-none tracking-[0.16em] text-fg-subtle uppercase">
                        <span
                          className="size-2 rounded-full ring-1 ring-white/20"
                          style={{ background: d.brand }}
                        />
                        {d.niche}
                      </span>
                      <span className="font-mono text-[11px] leading-none tracking-[0.16em] text-fg-subtle tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-3 font-display text-[30px] leading-[1.1] font-normal">
                      {d.name}
                    </h3>
                    <p className="mt-2 max-w-[46ch] text-sm leading-[1.6] text-fg-muted">
                      {d.line}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal>
          <div className="mt-14 flex flex-col items-start justify-between gap-6 rounded-xl border border-line bg-white/[0.02] p-6 sm:flex-row sm:items-center md:p-8">
            <p className="font-display text-[clamp(24px,3vw,32px)] leading-[1.15] text-fg">
              Your business could be <em className="text-fg-muted">next</em>.
            </p>
            <Button href="#contact" variant="primary" className="!h-12 shrink-0">
              Get a quote
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
