import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SkipLink } from "@/components/layout/SkipLink";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { Container } from "@/components/ui/Container";
import { ArrowRightIcon, ChatIcon, MailIcon } from "@/components/ui/Icons";
import { MarkOutline } from "@/components/ui/MarkOutline";
import { Reveal } from "@/components/ui/Reveal";
import { SITE } from "@/lib/site";
import { PRODUCTS, type Product, type ProductStatus } from "@/lib/products";

const STATUS: Record<ProductStatus, { label: string; dot: string }> = {
  live: { label: "Live", dot: "bg-emerald-400" },
  beta: { label: "In beta", dot: "bg-[#9db0ff]" },
  soon: { label: "Coming soon", dot: "bg-fg-subtle" },
};

function StatusPill({ status }: { status: ProductStatus }) {
  const s = STATUS[status];
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] text-fg-muted uppercase">
      <span className={`size-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}

function SampleTag() {
  return (
    <span className="rounded-full border border-dashed border-line-strong px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] text-fg-subtle uppercase">
      Sample
    </span>
  );
}

function Tags({ tags }: { tags: string[] }) {
  return (
    <ul className="mt-6 flex flex-wrap gap-2">
      {tags.map((t) => (
        <li key={t} className="rounded-md border border-line px-2.5 py-1 text-[13px] text-fg-muted">
          {t}
        </li>
      ))}
    </ul>
  );
}

function Visit({ p }: { p: Product }) {
  if (!p.href) {
    return (
      <span className="font-mono text-[11px] tracking-[0.14em] text-fg-subtle uppercase">
        {p.status === "soon" ? "Announced at launch" : "Link coming soon"}
      </span>
    );
  }
  return (
    <a href={p.href} className="group/v inline-flex items-center gap-2 text-sm font-medium text-fg">
      Visit {p.name}
      <ArrowRightIcon
        width={16}
        height={16}
        className="transition-transform duration-200 group-hover/v:translate-x-1"
      />
    </a>
  );
}

/** Generic app-window mock-up, drawn in CSS so no screenshot is needed. */
function WindowMock() {
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden rounded-xl border border-line-strong bg-[#0c0c0c] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]"
    >
      <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="ml-4 h-5 w-44 rounded-md bg-white/[0.05]" />
      </div>
      <div className="grid grid-cols-[120px_1fr] sm:grid-cols-[150px_1fr]">
        <div className="space-y-2.5 border-r border-line p-4">
          {[70, 55, 62, 48, 58].map((w, i) => (
            <span
              key={i}
              className={`block h-2 rounded-full ${i === 0 ? "bg-fg/70" : "bg-white/10"}`}
              style={{ width: `${w}%` }}
            />
          ))}
        </div>
        <div className="space-y-5 p-5">
          <span className="block h-3 w-1/3 rounded-full bg-white/25" />
          <div className="grid grid-cols-3 gap-3">
            {[0, 1, 2].map((i) => (
              <span key={i} className="block h-16 rounded-lg border border-line bg-white/[0.03]" />
            ))}
          </div>
          <div className="flex h-24 items-end gap-2">
            {[40, 65, 50, 80, 60, 92, 74].map((h, i) => (
              <span
                key={i}
                className="flex-1 rounded-t-sm bg-gradient-to-t from-white/5 to-white/35"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Featured({ p }: { p: Product }) {
  return (
    <Reveal>
      <article className="relative overflow-hidden rounded-2xl border border-line-strong bg-surface">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 right-0 h-[360px] w-[560px] bg-[radial-gradient(ellipse_at_center,rgba(157,176,255,0.12),transparent_70%)]"
        />
        <div className="relative grid items-center gap-10 p-6 md:p-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14 lg:p-14">
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="font-mono text-[11px] tracking-[0.16em] text-fg-subtle uppercase">
                Featured
              </span>
              <StatusPill status={p.status} />
              {p.placeholder ? <SampleTag /> : null}
            </div>
            <h2 className="mt-6 font-display text-[clamp(40px,5vw,64px)] leading-[1] font-normal">
              {p.name}
            </h2>
            <p className="mt-3 text-xl text-fg">{p.tagline}</p>
            <p className="mt-5 max-w-[46ch] text-[16px] leading-[1.7] text-fg-muted">{p.description}</p>
            <Tags tags={p.tags} />
            <div className="mt-8">
              <Visit p={p} />
            </div>
          </div>
          <WindowMock />
        </div>
      </article>
    </Reveal>
  );
}

function Card({ p, i }: { p: Product; i: number }) {
  return (
    <Reveal delay={i * 90}>
      <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface p-6 transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-[0_24px_60px_-24px_rgba(157,176,255,0.25)] md:p-8">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-px left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
        <div className="flex flex-wrap items-center gap-2.5">
          <StatusPill status={p.status} />
          {p.placeholder ? <SampleTag /> : null}
        </div>
        <h3 className="mt-10 font-display text-[36px] leading-none">{p.name}</h3>
        <p className="mt-3 text-[16px] text-fg">{p.tagline}</p>
        <p className="mt-4 text-[15px] leading-[1.65] text-fg-muted">{p.description}</p>
        <Tags tags={p.tags} />
        <div className="mt-auto pt-8">
          <Visit p={p} />
        </div>
      </article>
    </Reveal>
  );
}

const stat = "font-mono text-[11px] tracking-[0.16em] text-fg-subtle uppercase";

export function ProductsPage() {
  const [featured, ...rest] = PRODUCTS;
  const live = PRODUCTS.filter((p) => p.status === "live").length;

  return (
    <>
      <SkipLink />
      <Header brand="products" />
      <main id="main">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-line pt-36 pb-16 md:pt-44 md:pb-24">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[length:64px_64px] [mask-image:radial-gradient(ellipse_80%_100%_at_70%_0%,#000_10%,transparent_75%)]"
          />
          <MarkOutline className="pointer-events-none absolute top-1/2 -right-[4%] hidden h-[115%] -translate-y-1/2 text-white/[0.09] lg:block" />
          <Container className="relative">
            <Link
              href="/labs"
              className="inline-flex items-center gap-3 font-mono text-xs tracking-[0.16em] text-fg-subtle uppercase transition-colors hover:text-fg"
            >
              <span aria-hidden="true">←</span> Ascendry Labs
            </Link>
            <h1 className="mt-6 max-w-[14ch] font-display text-[clamp(48px,7.5vw,92px)] leading-[0.96] font-normal tracking-[-0.02em]">
              What we&apos;ve <em className="text-fg-muted">built</em>.
            </h1>
            <p className="mt-7 max-w-[52ch] text-lg leading-[1.65] text-fg-muted">
              Products designed, engineered and launched in-house by Ascendry Labs.
            </p>
            <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-line pt-6">
              <div>
                <dt className={stat}>Products</dt>
                <dd className="mt-1.5 text-[15px] text-fg tabular-nums">
                  {String(PRODUCTS.length).padStart(2, "0")}
                </dd>
              </div>
              <div>
                <dt className={stat}>Live</dt>
                <dd className="mt-1.5 text-[15px] text-fg tabular-nums">
                  {String(live).padStart(2, "0")}
                </dd>
              </div>
              <div>
                <dt className={stat}>Built by</dt>
                <dd className="mt-1.5 text-[15px] text-fg">Ascendry, Chennai</dd>
              </div>
            </dl>
          </Container>
        </section>

        {/* Products */}
        <section className="py-16 md:py-28">
          <Container>
            {featured ? <Featured p={featured} /> : null}
            {rest.length ? (
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                {rest.map((p, i) => (
                  <Card key={p.slug} p={p} i={i} />
                ))}
              </div>
            ) : null}
          </Container>
        </section>

        {/* Contact */}
        <section className="relative overflow-hidden bg-invert-bg py-24 text-invert-fg md:py-36">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(0,0,0,0.12)_1px,transparent_1px)] bg-[length:24px_24px] [mask-image:radial-gradient(ellipse_60%_70%_at_75%_50%,#000_10%,transparent_75%)]"
          />
          <Container className="relative">
            <p className="font-mono text-xs tracking-[0.16em] text-invert-muted uppercase">
              — Early access
            </p>
            <h2 className="mt-6 max-w-[18ch] font-display text-[clamp(34px,4.4vw,56px)] leading-[1.05] !text-invert-fg">
              Want to try a product <em className="!text-invert-muted">first</em>?
            </h2>
            <p className="mt-6 max-w-[52ch] text-lg leading-[1.6] text-invert-muted">
              Tell us what you&apos;d like to use and we&apos;ll keep you in the loop.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={SITE.whatsapp}
                className="group inline-flex h-12 items-center justify-center gap-2.5 rounded-md bg-invert-fg px-6 text-sm font-medium text-invert-bg transition-colors hover:bg-[#262626]"
              >
                <ChatIcon width={18} height={18} /> Chat on WhatsApp
                <ArrowRightIcon
                  width={16}
                  height={16}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="inline-flex h-12 items-center justify-center gap-2.5 rounded-md border border-black/20 px-6 text-sm font-medium text-invert-fg transition-colors hover:bg-black/5"
              >
                <MailIcon width={18} height={18} /> {SITE.email}
              </a>
            </div>
          </Container>
        </section>
      </main>
      <Footer brand="labs" />
      <WhatsAppButton />
    </>
  );
}
