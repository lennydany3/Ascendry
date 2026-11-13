import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

const lab = [
  {
    status: "Researching",
    title: "Next idea",
    text: "Problems worth solving, validated with real people before a line of code is written.",
  },
  {
    status: "Building",
    title: "In progress",
    text: "Small, focused prototypes shipped fast so we learn from real use, not guesses.",
  },
  {
    status: "Launching",
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

const principles = [
  { title: "Built in the open", text: "We share what we ship and what we learn." },
  { title: "Small and sharp", text: "One problem, done well, beats ten features done halfway." },
  { title: "Studio-grade craft", text: "Products get the same design and engineering standards as client work." },
];

const card =
  "rounded-xl border border-line bg-surface p-6 transition-colors duration-200 hover:border-line-strong md:p-8";

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
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {lab.map((c, i) => (
              <Reveal key={c.title} delay={i * 80}>
                <article className={`${card} h-full`}>
                  <span className="inline-flex items-center gap-2 rounded-full border border-line px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] text-fg-muted uppercase">
                    <span className="size-1.5 rounded-full bg-[#9db0ff]" />
                    {c.status}
                  </span>
                  <h3 className="mt-8 font-display text-3xl leading-none">{c.title}</h3>
                  <p className="mt-4 text-[15px] leading-[1.6] text-fg-muted">{c.text}</p>
                </article>
              </Reveal>
            ))}
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
          <ol className="mt-14 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <li key={s.n} className="bg-bg p-6 md:p-8">
                <span className="font-mono text-xs tracking-[0.16em] text-fg-subtle">{s.n}</span>
                <h3 className="mt-10 text-lg font-medium text-fg">{s.title}</h3>
                <p className="mt-3 text-[15px] leading-[1.6] text-fg-muted">{s.text}</p>
              </li>
            ))}
          </ol>
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
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={i * 80}>
                <div className={`${card} h-full`}>
                  <h3 className="text-lg font-medium text-fg">{p.title}</h3>
                  <p className="mt-3 text-[15px] leading-[1.6] text-fg-muted">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section id="contact" className="scroll-mt-16 bg-invert-bg py-24 text-invert-fg md:py-40">
        <Container>
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
            <div className="mt-10 flex flex-wrap gap-3">
              <Button href="mailto:hello@ascendry.in" variant="inverted">
                Email the lab
              </Button>
              <Button
                href="https://wa.me/91XXXXXXXXXX"
                className="!border-black/20 !text-invert-fg hover:!bg-black/5"
              >
                Chat on WhatsApp
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
