import type { CSSProperties } from "react";

const niches = [
  "Cafes",
  "Gaming cafes",
  "Gyms",
  "Fashion",
  "Stays",
  "Restaurants",
  "Salons",
  "Coaching",
  "Bakeries",
];

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="flex gap-14 pr-14" aria-hidden={hidden || undefined}>
      {niches.map((n) => (
        <span key={n} className="flex gap-14">
          <span>{n}</span>
          <span aria-hidden="true">·</span>
        </span>
      ))}
    </div>
  );
}

export function Marquee() {
  return (
    <div
      className="marquee anim-rev relative overflow-hidden border-t border-line py-[22px] [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]"
      style={{ "--d": "1650ms" } as CSSProperties}
    >
      <div
        role="group"
        aria-label="Industries we build for"
        className="marquee-track flex w-max font-mono text-xs leading-[1.4] tracking-[0.16em] text-fg-subtle uppercase"
      >
        <Row />
        <Row hidden />
      </div>
    </div>
  );
}
