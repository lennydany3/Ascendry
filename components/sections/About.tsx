import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

const principles = [
  {
    n: "01",
    title: "You talk to the builders",
    text: "No account managers in between. The people designing and coding your site are the ones on the call.",
  },
  {
    n: "02",
    title: "Design and code, side by side",
    text: "Designers and developers work as one group, so what gets designed is what gets built.",
  },
  {
    n: "03",
    title: "One team, start to finish",
    text: "The same people handle the website, the booking system and the automation behind it.",
  },
];

const facts = [
  { k: "Team", v: "5–10 people" },
  { k: "Based in", v: "Chennai, India" },
  { k: "Clients in", v: "India & the US" },
];

export function About() {
  return (
    <section id="about" className="scroll-mt-16 border-t border-line py-24 md:py-40">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <SectionHeader
              index="03"
              label="About"
              title={
                <>
                  A small team that <em>cares</em>.
                </>
              }
            />
          </Reveal>

          <Reveal delay={60}>
            <div className="max-w-[60ch] space-y-6 text-base leading-[1.7] lg:pt-[52px]">
              <p className="text-lg text-fg">
                We&apos;re a team of 5 to 10 designers, developers and
                automation builders in Chennai, working with small and growing
                businesses in India and the US.
              </p>
              <p>
                Small enough that you always know who&apos;s working on your
                project. Big enough to build the website, the booking system
                and the automation behind it, all in one place, so your
                business keeps moving while you focus on your customers.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:mt-24 md:grid-cols-3">
          {principles.map((p, i) => (
            <Reveal key={p.n} delay={i * 80} className="bg-bg">
              <div className="h-full bg-surface p-6 transition-colors duration-300 hover:bg-surface-hover md:p-8">
                <span className="font-mono text-[11px] leading-none tracking-[0.16em] text-fg-subtle">
                  {p.n}
                </span>
                <h3 className="mt-10 text-xl leading-[1.3] font-medium text-fg">
                  {p.title}
                </h3>
                <p className="mt-3 text-[15px] leading-[1.65] text-fg-muted">
                  {p.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <dl className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {facts.map((f) => (
              <div key={f.k} className="border-l border-line pl-5">
                <dt className="font-mono text-[11px] leading-none tracking-[0.16em] text-fg-subtle uppercase">
                  {f.k}
                </dt>
                <dd className="mt-3 font-display text-[28px] leading-none text-fg">
                  {f.v}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
