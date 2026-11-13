import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Logo } from "@/components/ui/Logo";

async function getYear() {
  "use cache";
  return new Date().getFullYear();
}

const pages = {
  studio: [
    { label: "Work", href: "#work" },
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
    { label: "Ascendry Labs", href: "/labs" },
  ],
  labs: [
    { label: "Lab", href: "#lab" },
    { label: "Approach", href: "#approach" },
    { label: "Principles", href: "#principles" },
    { label: "Contact", href: "#contact" },
    { label: "Ascendry Studio", href: "/" },
  ],
};
const blurb = {
  studio:
    "Websites, booking systems and automation for small and growing businesses in India and the US.",
  labs: "Our own startup ideas, built and launched in the open by Ascendry.",
};
const legal = ["Privacy policy", "Terms & conditions", "Refund & cancellation"];

const linkCls =
  "text-sm text-fg-muted transition-colors duration-150 hover:text-fg";

export async function Footer({ brand = "studio" }: { brand?: "studio" | "labs" }) {
  const year = await getYear();

  return (
    <footer className="overflow-hidden border-t border-line">
      <Container className="pt-24">
        <div className="flex flex-wrap gap-x-8 gap-y-12">
          <div className="flex flex-[2_1_280px] flex-col gap-5">
            <Logo href={brand === "labs" ? "/labs" : "/"} tag={brand === "labs" ? "Labs" : "Studio"} />
            <p className="max-w-[32ch] text-sm leading-[1.6] text-fg-muted">
              {blurb[brand]}
            </p>
          </div>

          <div className="flex flex-[1_1_140px] flex-col gap-3.5">
            <Eyebrow className="mb-1.5">Pages</Eyebrow>
            {pages[brand].map((p) => (
              <Link key={p.label} href={p.href} className={linkCls}>
                {p.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-[1_1_160px] flex-col gap-3.5">
            <Eyebrow className="mb-1.5">Legal</Eyebrow>
            {legal.map((l) => (
              <Link key={l} href="#" className={linkCls}>
                {l}
              </Link>
            ))}
          </div>

          <div className="flex flex-[1_1_220px] flex-col gap-3.5">
            <Eyebrow className="mb-1.5">Contact</Eyebrow>
            <a href="mailto:hello@ascendry.in" className={linkCls}>
              hello@ascendry.in
            </a>
            <a href="https://wa.me/91XXXXXXXXXX" className={linkCls}>
              WhatsApp +91 XXXXXXXXXX
            </a>
            <span className="max-w-[28ch] text-sm leading-[1.6] text-fg-subtle">
              3rd Block 1st Street, Kannadasan Nagar, Chennai 600118, Tamil
              Nadu, India
            </span>
          </div>
        </div>

        <div className="mt-24 flex flex-wrap justify-between gap-x-6 gap-y-2 border-t border-line py-6 text-[13px] leading-[1.6] text-fg-subtle">
          <span>© {year} Ascendry · Chennai, India</span>
          <span>
            Registered under Udyam (MSME), Govt. of India · UDYAM-TN-02-0445785
          </span>
        </div>
      </Container>

      <div
        aria-hidden="true"
        className="mt-4 h-[0.64em] overflow-hidden pl-[0.2em] text-center text-[12.5vw] leading-none font-medium tracking-[0.2em] text-[#141414] select-none"
      >
        ASCENDRY
      </div>
    </footer>
  );
}
