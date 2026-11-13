import { Showcase } from "@/components/clients/Showcase";
import { ArrowRightIcon } from "@/components/ui/Icons";
import type { Client } from "@/lib/clients";

const label = "font-mono text-[11px] tracking-[0.16em] text-fg-subtle uppercase";

/** Everything about one project, laid out to fit a single screen. */
export function ProjectDetail({ c, headingId }: { c: Client; headingId?: string }) {
  return (
    <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-12">
      <Showcase key={c.slug} shots={c.shots} url={c.href} name={c.name} />

      <div className="lg:pt-2">
        <p className={`${label} flex items-center gap-2.5`}>
          <span className="size-2 rounded-full" style={{ background: c.brand }} aria-hidden="true" />
          {c.kind}
        </p>
        <h2
          id={headingId}
          className="mt-4 font-display text-[clamp(36px,4.2vw,56px)] leading-none font-normal tracking-[-0.01em]"
        >
          {c.name}
        </h2>
        {c.client ? <p className="mt-3 text-sm text-fg-muted">For {c.client}</p> : null}
        <p className="mt-5 text-[15px] leading-[1.7] text-fg-muted">{c.summary}</p>

        <ul className="mt-6 divide-y divide-line border-y border-line">
          {c.features.map((f) => (
            <li key={f} className="py-2.5 text-[14px] leading-[1.5] text-fg">
              {f}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap items-center gap-3">
        <a
          href={c.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex h-11 items-center gap-2 rounded-lg bg-fg px-5 text-sm font-medium text-bg transition-colors hover:bg-[#e5e5e5]"
        >
          Visit live site
          <ArrowRightIcon
            width={16}
            height={16}
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </a>
          {c.extra ? (
            <a
              href={c.extra.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center rounded-lg border border-line-strong px-5 text-sm font-medium text-fg transition-colors hover:bg-white/[0.06]"
            >
              {c.extra.label}
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}
