import { Container } from "@/components/ui/Container";
import { ArrowRightIcon, ChatIcon, MailIcon } from "@/components/ui/Icons";
import { MarkOutline } from "@/components/ui/MarkOutline";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SITE } from "@/lib/site";

const lab = [
  {
    status: "Researching",
    stage: 1,
    title: "Next idea",
    text: "Problems worth solving, validated with real people before a line of code is written.",
  },
  {
    status: "Building",
    stage: 2,
    title: "In progress",
    text: "Small, focused prototypes shipped fast so we learn from real use, not guesses.",
  },
  {
    status: "Launching",
    stage: 3,
    title: "First launch",
    text: "Our first product is on the way. Products are announced here the moment they go live.",
  },
];

const steps = [
  { n: "01", title: "Spot the problem", text: "Start from something people genuinely struggle with." },
  { n: "02", title: "Prototype fast", text: "A working version in weeks, not months." },
  { n: "03", title: "Launch early", text: "Put it in front of real users and listen." },
  { n: "04", title: "Improve or retire", text: "Double down on what works. Stop what doesn't." },
];

const contactSteps = [
  { n: "01", title: "Share your idea", text: "A quick message on WhatsApp or email is enough." },
  { n: "02", title: "We talk it through", text: "Usually within a day, with no jargon." },
  { n: "03", title: "Build it together", text: "Collaborate, give feedback or join early access." },
];

const principles = [
  { title: "Built in the open", text: "We share what we ship and what we learn." },
  { title: "Small and sharp", text: "One problem, done well, beats ten features done halfway." },
  { title: "Studio-grade craft", text: "Products get the same design and engineering standards as client work." },
];

export function LabsSections() {
  return (
    <>
      <section id="lab" className="scroll-mt-16 border-t border-line py-24 md:py-40">
        <Container>
          <Reveal>
            <SectionHeader
              index="01"
              label="The lab"
              title={
                <>
                  What we&apos;re <em>building</em>.
                </>
              }
              lead="Products are announced when they launch. Until then, this is what moves through the lab."
            />
          </Reveal>
          {/* Pipeline: three stages joined by a line, each card with a progress meter */}
          <div className="relative mt-16">
            <div
              aria-hidden="true"
              className="absolute top-[7px] right-[16%] left-[16%] hidden h-px bg-gradient-to-r from-white/30 via-white/15 to-white/5 md:block"
            />
            <ol className="grid gap-6 md:grid-cols-3 md:gap-5">
              {lab.map((c, i) => (
                <Reveal key={c.title} delay={i * 100}>
                  <li className="group relative flex h-full flex-col">
                    <div className="mb-6 flex items-center gap-3 md:justify-center">
                      <span className="relative flex size-3.5 items-center justify-center">
                        {c.stage === 2 ? (
                          <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#9db0ff] opacity-50 motion-reduce:hidden" />
                        ) : null}
                        <span
                          className={`relative size-3.5 rounded-full border ${
                            c.stage === 3
                              ? "border-fg bg-fg"
                              : c.stage === 2
                                ? "border-[#9db0ff] bg-[#9db0ff]"
                                : "border-fg-subtle bg-bg"
                          }`}
                        />
                      </span>
                      <span className="font-mono text-[11px] tracking-[0.18em] text-fg-subtle uppercase md:hidden">
                        Stage {String(c.stage).padStart(2, "0")}
                      </span>
                    </div>

                    <article className="relative flex-1 overflow-hidden rounded-xl border border-line bg-surface p-6 transition-[border-color,transform,box-shadow] duration-300 group-hover:-translate-y-1 group-hover:border-line-strong group-hover:shadow-[0_24px_60px_-24px_rgba(157,176,255,0.25)] md:p-8">
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute -top-px left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      />
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute -right-2 -bottom-6 font-display text-[132px] leading-none text-white/[0.035] select-none"
                      >
                        0{c.stage}
                      </span>

                      <div className="relative flex items-center justify-between">
                        <span className="inline-flex items-center gap-2 rounded-full border border-line px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] text-fg-muted uppercase">
                          <span className="size-1.5 rounded-full bg-[#9db0ff]" />
                          {c.status}
                        </span>
                        <span className="font-mono text-[10px] tracking-[0.16em] text-fg-subtle uppercase">
                          {c.stage}/3
                        </span>
                      </div>

                      <h3 className="relative mt-10 font-display text-[34px] leading-none">{c.title}</h3>
                      <p className="relative mt-4 text-[15px] leading-[1.65] text-fg-muted">{c.text}</p>

                      <div className="relative mt-8 flex gap-1.5" aria-hidden="true">
                        {[1, 2, 3].map((n) => (
                          <span
                            key={n}
                            className={`h-[3px] flex-1 rounded-full ${
                              n <= c.stage ? "bg-fg" : "bg-white/10"
                            }`}
                          />
                        ))}
                      </div>
                    </article>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <section id="approach" className="scroll-mt-16 border-t border-line py-24 md:py-40">
        <Container>
          <Reveal>
            <SectionHeader
              index="02"
              label="Approach"
              title={
                <>
                  From idea to <em>launch</em>.
                </>
              }
              lead="A simple loop we repeat for every product."
            />
          </Reveal>
          <div className="relative mt-16">
            {/* rail through all four steps */}
            <div
              aria-hidden="true"
              className="absolute top-[22px] right-0 left-0 hidden h-px bg-gradient-to-r from-white/35 via-white/15 to-white/35 lg:block"
            />
            <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {steps.map((st, i) => (
                <Reveal key={st.n} delay={i * 90}>
                  <li className="group relative">
                    <span className="relative z-10 flex size-11 items-center justify-center rounded-full border border-line-strong bg-bg font-mono text-xs tracking-[0.08em] text-fg transition-[background-color,color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:bg-fg group-hover:text-bg">
                      {st.n}
                    </span>
                    <div className="mt-7 border-l border-line pl-5 transition-colors duration-300 group-hover:border-fg">
                      <h3 className="font-display text-[28px] leading-[1.05] text-fg">{st.title}</h3>
                      <p className="mt-3 max-w-[30ch] text-[15px] leading-[1.65] text-fg-muted">{st.text}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
            <p className="mt-12 inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.18em] text-fg-subtle uppercase">
              <span aria-hidden="true" className="text-base leading-none">↻</span>
              Then we loop, with the next idea
            </p>
          </div>
        </Container>
      </section>

      <section id="principles" className="scroll-mt-16 border-t border-line py-24 md:py-40">
        <Container>
          <Reveal>
            <SectionHeader
              index="03"
              label="Principles"
              title={
                <>
                  How the lab <em>works</em>.
                </>
              }
            />
          </Reveal>
          <ul className="mt-14 border-t border-line">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={i * 80}>
                <li className="group relative grid items-baseline gap-3 border-b border-line py-8 transition-colors duration-300 hover:bg-white/[0.02] md:grid-cols-[72px_minmax(0,1.1fr)_minmax(0,1fr)_32px] md:gap-8 md:py-10">
                  <span className="font-mono text-xs tracking-[0.16em] text-fg-subtle tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-[clamp(30px,4vw,46px)] leading-[1.02] text-fg transition-transform duration-300 group-hover:translate-x-1.5">
                    {p.title}
                  </h3>
                  <p className="max-w-[40ch] text-[16px] leading-[1.65] text-fg-muted">{p.text}</p>
                  <span
                    aria-hidden="true"
                    className="hidden text-xl text-fg-subtle transition-[transform,color] duration-300 group-hover:translate-x-1 group-hover:text-fg md:block"
                  >
                    →
                  </span>
                </li>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <section
        id="contact"
        className="relative scroll-mt-16 overflow-hidden bg-invert-bg py-24 text-invert-fg md:py-40"
      >
        {/* Decorative: dot grid + blueprint wireframe of the mark, same as Studio */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(0,0,0,0.12)_1px,transparent_1px)] bg-[length:24px_24px] [mask-image:radial-gradient(ellipse_60%_70%_at_75%_50%,#000_10%,transparent_75%)]"
        />
        <MarkOutline className="pointer-events-none absolute top-1/2 -right-[6%] hidden h-[130%] -translate-y-1/2 text-black/[0.13] lg:block" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/20 to-transparent"
        />

        <Container className="relative">
          <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            <Reveal>
              <SectionHeader
                invert
                index="04"
                label="Contact"
                title={
                  <>
                    Got an idea worth <em>launching</em>?
                  </>
                }
                lead="Collaborations, feedback or early-access interest — we'd love to hear from you."
              />
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={SITE.whatsapp}
                  className="group inline-flex h-12 items-center justify-center gap-2.5 rounded-md bg-invert-fg px-6 text-sm font-medium text-invert-bg transition-colors duration-150 hover:bg-[#262626]"
                >
                  <ChatIcon width={18} height={18} />
                  Chat on WhatsApp
                  <ArrowRightIcon
                    width={16}
                    height={16}
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </a>
                <a
                  href={`mailto:${SITE.email}`}
                  className="inline-flex h-12 items-center justify-center gap-2.5 rounded-md border border-black/20 px-6 text-sm font-medium text-invert-fg transition-colors duration-150 hover:bg-black/5"
                >
                  <MailIcon width={18} height={18} />
                  {SITE.email}
                </a>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <ol className="overflow-hidden rounded-xl border border-black/10 bg-invert-bg/90 backdrop-blur-sm">
                {contactSteps.map((st, i) => (
                  <li
                    key={st.n}
                    className={`flex gap-5 p-6 md:p-7 ${i ? "border-t border-black/10" : ""}`}
                  >
                    <span className="pt-1 font-mono text-xs tracking-[0.16em] text-invert-muted">
                      {st.n}
                    </span>
                    <div>
                      <h3 className="font-display text-[26px] leading-[1.15] !text-invert-fg">
                        {st.title}
                      </h3>
                      <p className="mt-2 text-[15px] leading-[1.6] text-invert-muted">
                        {st.text}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
