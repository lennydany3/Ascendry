import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SkipLink } from "@/components/layout/SkipLink";
import { Container } from "@/components/ui/Container";
import { MarkOutline } from "@/components/ui/MarkOutline";
import { ArrowRightIcon, ChatIcon, MailIcon, PhoneIcon } from "@/components/ui/Icons";
import { SITE } from "@/lib/site";
import { Rich } from "./Rich";
import { TocNav } from "./TocNav";
import { LEGAL_DOCS, type Block, type LegalDoc } from "./content";

const body = "text-[16px] leading-[1.8] text-fg-muted";

function renderBlock(b: Block, i: number) {
  if (typeof b === "string") {
    return (
      <p key={i} className={body}>
        <Rich text={b} />
      </p>
    );
  }
  if (Array.isArray(b)) {
    return (
      <ul key={i} className="space-y-3">
        {b.map((li, j) => (
          <li key={j} className={`${body} flex gap-3.5`}>
            <span
              aria-hidden="true"
              className="mt-[0.8em] size-1 shrink-0 rounded-full bg-fg-subtle"
            />
            <span>
              <Rich text={li} />
            </span>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <h3 key={i} className="pt-2 text-[17px] font-medium text-fg">
      {b.h}
    </h3>
  );
}

function ContactBlock() {
  const rows = [
    ["Business", "Ascendry"],
    ["Udyam registration", SITE.udyam],
    ["Address", SITE.address],
    ["Email", SITE.email],
    ["Phone", SITE.phoneDisplay],
    ["Website", SITE.domain],
  ];
  return (
    <section
      aria-labelledby="contact-us"
      className="overflow-hidden rounded-xl border border-line bg-surface"
    >
      <div className="flex flex-col gap-5 border-b border-line p-6 sm:flex-row sm:items-center sm:justify-between md:p-8">
        <div>
          <h2 id="contact-us" className="font-display text-[30px] leading-[1.1] font-normal">
            Contact us
          </h2>
          <p className="mt-2 text-[15px] text-fg-muted">
            Questions about this page? We&apos;re happy to help.
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <a
            href={`mailto:${SITE.email}`}
            className="inline-flex h-10 items-center gap-2 rounded-md border border-line-strong px-4 text-sm font-medium text-fg transition-colors hover:bg-white/[0.06]"
          >
            <MailIcon width={16} height={16} /> Email
          </a>
          <a
            href={`tel:${SITE.phoneTel}`}
            className="inline-flex h-10 items-center gap-2 rounded-md border border-line-strong px-4 text-sm font-medium text-fg transition-colors hover:bg-white/[0.06]"
          >
            <PhoneIcon width={16} height={16} /> Call
          </a>
          <a
            href={SITE.whatsapp}
            className="inline-flex h-10 items-center gap-2 rounded-md bg-fg px-4 text-sm font-medium text-bg transition-colors hover:bg-[#e5e5e5]"
          >
            <ChatIcon width={16} height={16} /> WhatsApp
          </a>
        </div>
      </div>
      <dl className="grid gap-px bg-line sm:grid-cols-2">
        {rows.map(([k, v]) => (
          <div key={k} className="bg-surface p-5 md:px-8">
            <dt className="font-mono text-[11px] tracking-[0.16em] text-fg-subtle uppercase">
              {k}
            </dt>
            <dd className="mt-2 text-[15px] text-fg">
              <Rich text={v} />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function LegalPage({ doc }: { doc: LegalDoc }) {
  const others = LEGAL_DOCS.filter((d) => d.slug !== doc.slug);

  return (
    <>
      <SkipLink />
      <Header brand="legal" />
      <main id="main">
        {/* Title block: blueprint hero built around the Ascendry wireframe mark */}
        <section className="relative overflow-hidden border-b border-line pt-36 pb-16 md:pt-44 md:pb-24">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[length:64px_64px] [mask-image:radial-gradient(ellipse_80%_100%_at_70%_0%,#000_10%,transparent_75%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 right-[8%] h-[420px] w-[620px] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.08),transparent_70%)]"
          />
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-[4%] hidden w-[420px] items-center lg:flex">
            <div className="relative w-full">
              <MarkOutline className="w-full text-white/[0.22]" />
              <span className="absolute top-[6%] left-0 font-mono text-[10px] tracking-[0.18em] text-fg-subtle uppercase">
                01 — Clarity
              </span>
              <span className="absolute top-[46%] right-0 font-mono text-[10px] tracking-[0.18em] text-fg-subtle uppercase">
                02 — Trust
              </span>
              <span className="absolute -bottom-[2%] left-[28%] font-mono text-[10px] tracking-[0.18em] text-fg-subtle uppercase">
                03 — Fair terms
              </span>
            </div>
          </div>
          <Container className="relative">
            <p className="inline-flex items-center gap-3 font-mono text-xs tracking-[0.16em] text-fg-subtle uppercase">
              <span className="h-px w-8 bg-fg-subtle" /> Legal &amp; trust
            </p>
            <h1 className="mt-6 max-w-[14ch] font-display text-[clamp(48px,7.5vw,92px)] leading-[0.96] font-normal tracking-[-0.02em]">
              {doc.title}
            </h1>
            <p className="mt-7 max-w-[52ch] text-lg leading-[1.65] text-fg-muted">
              {doc.summary}
            </p>
            <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-line pt-6">
              <div>
                <dt className="font-mono text-[11px] tracking-[0.16em] text-fg-subtle uppercase">Last updated</dt>
                <dd className="mt-1.5 text-[15px] text-fg">{SITE.legalUpdated}</dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] tracking-[0.16em] text-fg-subtle uppercase">Sections</dt>
                <dd className="mt-1.5 text-[15px] text-fg tabular-nums">{String(doc.sections.length).padStart(2, "0")}</dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] tracking-[0.16em] text-fg-subtle uppercase">Registered</dt>
                <dd className="mt-1.5 text-[15px] text-fg">MSME · {SITE.udyam}</dd>
              </div>
            </dl>
            <div className="mt-8 flex flex-wrap gap-2" role="navigation" aria-label="Legal pages">
              {LEGAL_DOCS.map((d) => (
                <Link
                  key={d.slug}
                  href={`/legal/${d.slug}`}
                  scroll={false}
                  aria-current={d.slug === doc.slug ? "page" : undefined}
                  className={`rounded-full border px-4 py-2 text-[13px] transition-colors ${
                    d.slug === doc.slug
                      ? "border-fg bg-fg text-bg"
                      : "border-line-strong text-fg-muted hover:border-fg hover:text-fg"
                  }`}
                >
                  {d.nav}
                </Link>
              ))}
            </div>
          </Container>
        </section>

        {/* Content */}
        <Container className="py-14 md:py-24">
          <div className="grid gap-12 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-20">
            <aside className="hidden lg:block">
              <div className="sticky top-28">
                <TocNav items={doc.sections.map(({ id, title }) => ({ id, title }))} />
              </div>
            </aside>

            <div className="min-w-0">

              <article className="max-w-[72ch] space-y-16">
                {doc.sections.map((s, i) => (
                  <section
                    key={s.id}
                    id={s.id}
                    aria-labelledby={`${s.id}-h`}
                    className="scroll-mt-28"
                  >
                    <div className="flex items-center gap-4 border-b border-line pb-5">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-md border border-line-strong bg-white/[0.04] font-mono text-xs tracking-[0.08em] text-fg tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h2
                        id={`${s.id}-h`}
                        className="font-display text-[clamp(28px,3.4vw,36px)] leading-[1.1] font-normal"
                      >
                        {s.title}
                      </h2>
                    </div>
                    <div className="mt-6 space-y-5">{s.blocks.map(renderBlock)}</div>
                  </section>
                ))}
              </article>

              <div className="mt-20 max-w-[72ch]">
                <ContactBlock />
              </div>

              <div className="mt-10 grid max-w-[72ch] gap-3 sm:grid-cols-2">
                {others.map((d) => (
                  <Link
                    key={d.slug}
                    href={`/legal/${d.slug}`}
                    scroll={false}
                    className="group flex items-center justify-between rounded-lg border border-line p-5 transition-colors hover:border-line-strong hover:bg-surface"
                  >
                    <span>
                      <span className="block font-mono text-[11px] tracking-[0.16em] text-fg-subtle uppercase">
                        Also read
                      </span>
                      <span className="mt-1.5 block text-[15px] text-fg">{d.nav}</span>
                    </span>
                    <ArrowRightIcon
                      width={18}
                      height={18}
                      className="text-fg-muted transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </main>
      <Footer brand="studio" />
    </>
  );
}
