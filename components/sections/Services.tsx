import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

const check = (
  <svg
    width="14"
    height="14"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className="mt-[3px] shrink-0 text-fg-muted"
  >
    <path d="M3 8.5l3.2 3.2L13 5" />
  </svg>
);

/* ---------- Illustrations (decorative, pure CSS) ---------- */

/** Website: a browser window with a phone layered in front. */
function WebsiteVisual() {
  return (
    <div className="relative size-full">
      <div className="absolute top-1/2 left-[8%] w-[68%] -translate-y-1/2 overflow-hidden rounded-lg border border-white/12 bg-[#141414] shadow-[0_16px_32px_-12px_rgba(0,0,0,0.8)]">
        <div className="flex h-5 items-center gap-1 border-b border-white/10 px-2">
          <span className="size-1 rounded-full bg-white/20" />
          <span className="size-1 rounded-full bg-white/20" />
          <span className="size-1 rounded-full bg-white/20" />
        </div>
        <div className="space-y-2 p-3">
          <span className="block h-1.5 w-1/4 rounded-full bg-white/25" />
          <span className="block h-3 w-4/5 rounded-sm bg-white/80" />
          <span className="block h-3 w-3/5 rounded-sm bg-white/80" />
          <span className="block h-1.5 w-2/3 rounded-full bg-white/20" />
          <div className="flex gap-1.5 pt-1">
            <span className="block h-4 w-12 rounded-[3px] bg-white" />
            <span className="block h-4 w-10 rounded-[3px] border border-white/25" />
          </div>
          <div className="grid grid-cols-3 gap-1.5 pt-1">
            {[0, 1, 2].map((i) => (
              <span key={i} className="block h-6 rounded-[3px] bg-white/[0.07]" />
            ))}
          </div>
        </div>
      </div>
      <div className="absolute right-[8%] bottom-[12%] w-[24%] overflow-hidden rounded-xl border border-white/20 bg-[#0e0e0e] p-1.5 shadow-[0_16px_32px_-8px_rgba(0,0,0,0.9)]">
        <span className="mx-auto mb-1.5 block h-0.5 w-5 rounded-full bg-white/25" />
        <div className="space-y-1.5">
          <span className="block h-2 w-4/5 rounded-sm bg-white/80" />
          <span className="block h-1 w-full rounded-full bg-white/20" />
          <span className="block h-1 w-2/3 rounded-full bg-white/20" />
          <span className="block h-3 rounded-[3px] bg-white" />
          <span className="block h-8 rounded-[3px] bg-white/[0.07]" />
        </div>
      </div>
    </div>
  );
}

/** Booking: a month grid with one slot confirmed. */
function BookingVisual() {
  const booked = new Set([3, 4, 9, 12, 16, 18, 22]);
  return (
    <div className="relative size-full">
      <div className="absolute top-1/2 left-1/2 w-[76%] -translate-x-1/2 -translate-y-1/2 rounded-lg border border-white/12 bg-[#141414] p-3 shadow-[0_16px_32px_-12px_rgba(0,0,0,0.8)]">
        <div className="mb-2.5 flex items-center justify-between">
          <span className="h-1.5 w-12 rounded-full bg-white/30" />
          <span className="flex gap-1">
            <span className="size-3 rounded-[3px] bg-white/10" />
            <span className="size-3 rounded-[3px] bg-white/10" />
          </span>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: 21 }, (_, i) => (
            <span
              key={i}
              className={`block aspect-square rounded-[3px] ${
                i === 10
                  ? "bg-white"
                  : booked.has(i)
                    ? "bg-white/25"
                    : "bg-white/[0.06]"
              }`}
            />
          ))}
        </div>
      </div>
      <div className="absolute right-[6%] bottom-[10%] flex items-center gap-2 rounded-full border border-white/20 bg-[#0e0e0e] py-1.5 pr-3 pl-2 font-mono text-[10px] leading-none tracking-[0.08em] text-fg shadow-[0_12px_24px_-8px_rgba(0,0,0,0.9)]">
        <span className="flex size-4 items-center justify-center rounded-full bg-white text-bg">
          <svg width="9" height="9" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 8.5l3.2 3.2L13 5" />
          </svg>
        </span>
        Booked · 7:30 pm
      </div>
    </div>
  );
}

/** Automation: a trigger → action → action chain. */
function AutomationVisual() {
  const steps = [
    { label: "New booking", state: "done" },
    { label: "WhatsApp confirmation", state: "done" },
    { label: "Reminder · 2h before", state: "next" },
  ];
  return (
    <div className="relative flex size-full items-center justify-center">
      <div className="relative flex w-[78%] flex-col gap-3">
        <span className="absolute top-4 bottom-4 left-[15px] w-px bg-white/15" />
        {steps.map((s) => (
          <div
            key={s.label}
            className="relative flex items-center gap-3 rounded-lg border border-white/12 bg-[#141414] py-2 pr-3 pl-2 shadow-[0_10px_20px_-10px_rgba(0,0,0,0.8)]"
          >
            <span
              className={`flex size-[22px] shrink-0 items-center justify-center rounded-full ${
                s.state === "done"
                  ? "bg-white text-bg"
                  : "border border-white/30 text-fg-muted"
              }`}
            >
              {s.state === "done" ? (
                <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 8.5l3.2 3.2L13 5" />
                </svg>
              ) : (
                <span className="size-1.5 rounded-full bg-white/50" />
              )}
            </span>
            <span className="font-mono text-[10px] leading-none tracking-[0.08em] text-fg">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

type Service = {
  index: string;
  title: string;
  text: string;
  points: string[];
  visual: ReactNode;
};

const services: Service[] = [
  {
    index: "01",
    title: "Websites",
    text: "Fast, sharp sites that look the part and turn visitors into enquiries.",
    points: ["Designed mobile-first", "Quick to load, easy to find", "Clear calls to action"],
    visual: <WebsiteVisual />,
  },
  {
    index: "02",
    title: "Booking systems",
    text: "Let customers book tables, seats, classes or appointments any time of day.",
    points: ["Tables, seats, classes, appointments", "Live availability", "Works while you sleep"],
    visual: <BookingVisual />,
  },
  {
    index: "03",
    title: "Automation",
    text: "Confirmations, reminders and follow-ups that run without you lifting a finger.",
    points: ["Instant confirmations", "Automatic reminders", "Follow-ups that bring people back"],
    visual: <AutomationVisual />,
  },
];

export function Services() {
  return (
    <section id="services" className="scroll-mt-16 border-t border-line py-24 md:py-40">
      <Container>
        <Reveal>
          <SectionHeader
            index="02"
            label="Services"
            title={
              <>
                Get bookings while you <em>sleep</em>.
              </>
            }
            lead="Everything a growing business needs online, built and handled by one small team."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 md:mt-16 md:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 80}>
              <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface transition-[border-color,background-color] duration-300 ease-out hover:border-line-strong hover:bg-surface-hover">
                {/* illustration */}
                <div
                  aria-hidden="true"
                  className="relative h-[230px] overflow-hidden border-b border-line bg-[radial-gradient(ellipse_80%_70%_at_50%_0%,rgba(255,255,255,0.06),transparent_70%)]"
                >
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[length:28px_28px] [mask-image:radial-gradient(ellipse_75%_75%_at_50%_50%,#000_30%,transparent_85%)]" />
                  <div className="relative size-full transition-transform duration-500 ease-out group-hover:scale-[1.03]">
                    {s.visual}
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <span className="font-mono text-[11px] leading-none tracking-[0.16em] text-fg-subtle">
                    {s.index}
                  </span>
                  <h3 className="mt-4 font-display text-[32px] leading-[1.1] font-normal">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-[1.65] text-fg-muted">
                    {s.text}
                  </p>
                  <ul className="mt-6 space-y-2.5 border-t border-line pt-6">
                    {s.points.map((p) => (
                      <li
                        key={p}
                        className="flex items-start gap-2.5 text-sm leading-[1.5] text-fg-muted"
                      >
                        {check}
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
