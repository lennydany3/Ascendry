import { Container } from "@/components/ui/Container";
import { ArrowRightIcon, ChatIcon, MailIcon } from "@/components/ui/Icons";
import { MarkOutline } from "@/components/ui/MarkOutline";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SITE } from "@/lib/site";

const steps = [
  { n: "01", title: "Tell us about your business", text: "A quick message on WhatsApp or email is enough." },
  { n: "02", title: "Get a clear quote", text: "Usually within a day, with no jargon." },
  { n: "03", title: "We build and launch", text: "You stay in the loop with the people doing the work." },
];

/** The one inverted (white) section on the page. */
export function Contact() {
  return (
    <section
      id="contact"
      className="relative scroll-mt-16 overflow-hidden bg-invert-bg py-24 text-invert-fg md:py-40"
    >
      {/* Decorative: dot grid + blueprint wireframe of the mark */}
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
                  Ready to <em>grow</em>?
                </>
              }
              lead="Tell us about your business and get a clear quote, usually within a day."
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
              {steps.map((s, i) => (
                <li
                  key={s.n}
                  className={`flex gap-5 p-6 md:p-7 ${i ? "border-t border-black/10" : ""}`}
                >
                  <span className="pt-1 font-mono text-xs tracking-[0.16em] text-invert-muted">
                    {s.n}
                  </span>
                  <div>
                    <h3 className="font-display text-[26px] leading-[1.15] !text-invert-fg">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-[1.6] text-invert-muted">
                      {s.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
