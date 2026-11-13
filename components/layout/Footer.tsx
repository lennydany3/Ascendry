import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArrowUpIcon, MailIcon, PhoneIcon, PinIcon } from "@/components/ui/Icons";
import { CookieSettingsButton } from "@/components/legal/CookieConsent";
import { Logo } from "@/components/ui/Logo";
import { MarkOutline } from "@/components/ui/MarkOutline";
import { SITE } from "@/lib/site";

async function getYear() {
  "use cache";
  return new Date().getFullYear();
}

const pages = {
  studio: [
    { label: "Work", href: "/#work" },
    { label: "Services", href: "/#services" },
    { label: "About", href: "/#about" },
    { label: "Contact", href: "/#contact" },
    { label: "Ascendry Labs", href: "/labs" },
  ],
  labs: [
    { label: "Lab", href: "/labs#lab" },
    { label: "Approach", href: "/labs#approach" },
    { label: "Principles", href: "/labs#principles" },
    { label: "Products", href: "/labs/products" },
    { label: "Contact", href: "/labs#contact" },
    { label: "Ascendry Studio", href: "/" },
  ],
};
const blurb = {
  studio:
    "Websites, booking systems and automation for small and growing businesses in India and the US.",
  labs: "Our own startup ideas, built and launched in the open by Ascendry.",
};
const legal = [
  { label: "Privacy policy", href: "/legal/privacy-policy" },
  { label: "Terms & conditions", href: "/legal/terms-and-conditions" },
  { label: "Refund & cancellation", href: "/legal/refund-cancellation" },
];

const linkCls =
  "text-sm text-fg-muted transition-colors duration-150 hover:text-fg";

export async function Footer({ brand = "studio" }: { brand?: "studio" | "labs" }) {
  const year = await getYear();

  return (
    <footer className="relative overflow-hidden border-t border-line">
      {/* Decorative: top glow, blueprint mark, hairline */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 h-[260px] w-[720px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_70%)]"
      />
      <MarkOutline className="pointer-events-none absolute -top-10 -right-[12%] hidden h-[440px] text-white/[0.06] lg:block" />

      <Container className="relative pt-20 md:pt-24">
        <div className="flex flex-wrap gap-x-8 gap-y-12">
          <div className="flex flex-[2_1_280px] flex-col gap-5">
            <Logo
              href={brand === "labs" ? "/labs" : "/"}
              tag={brand === "labs" ? "Labs" : "Studio"}
            />
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
              <Link key={l.href} href={l.href} className={linkCls}>
                {l.label}
              </Link>
            ))}
            <CookieSettingsButton className={linkCls} />
          </div>

          <div className="flex flex-[1_1_240px] flex-col gap-3.5">
            <Eyebrow className="mb-1.5">Contact</Eyebrow>
            <a href={`mailto:${SITE.email}`} className={`${linkCls} flex items-center gap-2.5`}>
              <MailIcon width={16} height={16} className="shrink-0 text-fg-subtle" />
              {SITE.email}
            </a>
            <a href={`tel:${SITE.phoneTel}`} className={`${linkCls} flex items-center gap-2.5`}>
              <PhoneIcon width={16} height={16} className="shrink-0 text-fg-subtle" />
              {SITE.phoneDisplay}
            </a>
            <span className="flex max-w-[30ch] items-start gap-2.5 text-sm leading-[1.6] text-fg-subtle">
              <PinIcon width={16} height={16} className="mt-[3px] shrink-0" />
              {SITE.address}
            </span>
          </div>
        </div>

        <div className="mt-20 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-line py-6 text-[13px] leading-[1.6] text-fg-subtle md:mt-24">
          <span>© {year} Ascendry · Chennai, India</span>
          <span className="order-last w-full md:order-none md:w-auto">
            Registered under Udyam (MSME), Govt. of India · UDYAM-TN-02-0445785
          </span>
          <Link
            href="#main"
            className="group inline-flex items-center gap-2 text-fg-muted transition-colors hover:text-fg"
          >
            Back to top
            <span className="flex size-8 items-center justify-center rounded-full border border-line-strong transition-colors group-hover:bg-white/[0.06]">
              <ArrowUpIcon width={14} height={14} />
            </span>
          </Link>
        </div>
      </Container>

      {/* Wordmark, fading into the page */}
      <div
        aria-hidden="true"
        className="mt-2 h-[0.7em] overflow-hidden bg-gradient-to-b from-white/[0.12] to-transparent bg-clip-text pl-[0.2em] text-center text-[12.5vw] leading-none font-medium tracking-[0.2em] text-transparent select-none"
      >
        ASCENDRY
      </div>
    </footer>
  );
}
