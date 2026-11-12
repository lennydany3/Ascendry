import type { CSSProperties } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

type Demo = {
  niche: string;
  name: string;
  line: string;
  brand: string;
  surface: string;
};

// Palettes from the design system (demo sites keep their own colours).
const demos: Demo[] = [
  { niche: "Coffee cafe", name: "Bean and Brew", line: "Menu, orders and table bookings for a neighbourhood cafe.", brand: "#5C3D2E", surface: "#F3E9DC" },
  { niche: "Gaming cafe", name: "Respawn Arena", line: "Seat booking and tournament sign-ups.", brand: "#8B5CF6", surface: "#0E0B1A" },
  { niche: "Gym", name: "IronCore", line: "Memberships, class schedules and trial passes.", brand: "#E63946", surface: "#141414" },
  { niche: "Clothing", name: "Threadline", line: "A clean storefront for a fashion label.", brand: "#7D8F69", surface: "#F2EFE9" },
  { niche: "Stays", name: "Coastline Stays", line: "Rooms, rates and direct booking enquiries.", brand: "#1D6FA3", surface: "#F4ECDF" },
  { niche: "Restaurant", name: "Saffron Table", line: "Menus, reservations and WhatsApp ordering.", brand: "#E8891C", surface: "#8E1F1A" },
  { niche: "Salon & spa", name: "Luxe Studio", line: "Services, stylists and online appointments.", brand: "#A05C8E", surface: "#F8F0F4" },
  { niche: "Coaching", name: "Apex Academy", line: "Courses, batches and enrolment forms.", brand: "#1F7A4D", surface: "#F3F6F1" },
  { niche: "Bakery", name: "Crumb and Co", line: "Cake catalogue with custom order requests.", brand: "#B23A5B", surface: "#F7D774" },
];

function BrowserFrame({ brand, surface }: Pick<Demo, "brand" | "surface">) {
  return (
    <div className="overflow-hidden rounded-lg border border-line">
      <div className="flex h-7 items-center gap-1.5 border-b border-line bg-surface px-3">
        <span className="size-2 rounded-full bg-line-strong" />
        <span className="size-2 rounded-full bg-line-strong" />
        <span className="size-2 rounded-full bg-line-strong" />
      </div>
      <div
        className="relative aspect-[16/10] overflow-hidden"
        style={{ background: surface }}
        aria-hidden="true"
      >
        <div
          className="absolute top-[14%] left-[8%] h-[8%] w-[22%] rounded-[2px]"
          style={{ background: brand }}
        />
        <div
          className="absolute top-[34%] left-[8%] h-[7%] w-[54%] rounded-[2px] opacity-90"
          style={{ background: brand }}
        />
        <div
          className="absolute top-[46%] left-[8%] h-[7%] w-[38%] rounded-[2px] opacity-60"
          style={{ background: brand }}
        />
        <div
          className="absolute right-[8%] bottom-[12%] h-[34%] w-[30%] rounded-[4px]"
          style={{ background: brand }}
        />
      </div>
    </div>
  );
}

export function Work() {
  return (
    <section id="work" className="scroll-mt-16 border-t border-line py-24 md:py-40">
      <Container>
        <Reveal>
          <SectionHeader
            index="01"
            label="Selected work"
            title={
              <>
                Built for <em>real</em> businesses.
              </>
            }
            lead="Nine demo sites across nine industries. Each one is a working starting point for your own."
          />
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {demos.map((d, i) => (
            <Reveal key={d.name} delay={(i % 3) * 60}>
              <article
                className="group h-full rounded-md border border-line bg-surface p-6 transition-colors duration-250 ease-out hover:border-line-strong hover:bg-surface-hover"
                style={{ "--c": d.brand } as CSSProperties}
              >
                <BrowserFrame brand={d.brand} surface={d.surface} />
                <Eyebrow className="mt-6">{d.niche}</Eyebrow>
                <h3 className="mt-2 font-display text-[28px] leading-[1.15] font-normal">
                  {d.name}
                </h3>
                <p className="mt-2 text-sm leading-[1.6] text-fg-muted">
                  {d.line}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
