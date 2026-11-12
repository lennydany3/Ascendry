import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

/** The one inverted (white) section on the page. */
export function Contact() {
  return (
    <section
      id="contact"
      className="scroll-mt-16 bg-invert-bg py-24 text-invert-fg md:py-40"
    >
      <Container>
        <Reveal>
          <SectionHeader
            invert
            index="04"
            label="Contact"
            title={
              <>
                Ready to <em>grow</em>?
              </>
            }
            lead="Tell us about your business and get a clear quote, usually within a day."
          />
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="https://wa.me/91XXXXXXXXXX" variant="inverted">
              Chat on WhatsApp
            </Button>
            <a
              href="mailto:hello@ascendry.in"
              className="inline-flex h-11 items-center text-sm font-medium text-invert-fg underline decoration-black/20 underline-offset-4 transition-colors hover:decoration-invert-fg"
            >
              hello@ascendry.in
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
