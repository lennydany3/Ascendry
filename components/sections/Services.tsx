import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

const icon = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const services = [
  {
    title: "Websites",
    text: "Fast, sharp sites that look the part and turn visitors into enquiries.",
    icon: (
      <svg {...icon}>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 9h18" />
      </svg>
    ),
  },
  {
    title: "Booking systems",
    text: "Let customers book tables, seats, classes or appointments any time of day.",
    icon: (
      <svg {...icon}>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M8 3v4M16 3v4M3 10h18" />
      </svg>
    ),
  },
  {
    title: "Automation",
    text: "Confirmations, reminders and follow-ups that run without you lifting a finger.",
    icon: (
      <svg {...icon}>
        <path d="M13 2 4 14h7l-1 8 9-12h-7z" />
      </svg>
    ),
  },
];

export function Services() {
  return (
    <section id="services" className="scroll-mt-16 border-t border-line py-24 md:py-40">
      <Container>
        <Reveal>
          <SectionHeader
            index="02"
            label="Services"
            title={
              <>
                Get bookings while you <em>sleep</em>.
              </>
            }
            lead="Everything a growing business needs online, built and handled by one small team."
          />
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 60}>
              <div className="h-full rounded-md border border-line bg-surface p-6 transition-colors duration-250 ease-out hover:border-line-strong hover:bg-surface-hover">
                <span className="text-fg-muted">{s.icon}</span>
                <h3 className="mt-10 text-2xl leading-[1.3] font-medium">
                  {s.title}
                </h3>
                <p className="mt-3 text-base leading-[1.7] text-fg-muted">
                  {s.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
