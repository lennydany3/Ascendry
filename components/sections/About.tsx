import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function About() {
  return (
    <section id="about" className="scroll-mt-16 border-t border-line py-24 md:py-40">
      <Container className="grid gap-12 lg:grid-cols-2 lg:gap-24">
        <Reveal>
          <SectionHeader
            index="03"
            label="About"
            title={
              <>
                A small studio that <em>cares</em>.
              </>
            }
          />
        </Reveal>
        <Reveal delay={60}>
          <div className="max-w-[60ch] space-y-6 text-base leading-[1.7]">
            <p>
              Ascendry is a web studio based in Chennai, working with small and
              growing businesses in India and the US. We keep the team small so
              every project gets real attention.
            </p>
            <p>
              We build clear, fast websites and the booking and automation
              tools behind them, so your business keeps moving while you focus
              on your customers.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
