import Link from "next/link";
import { ClientsExplorer } from "@/components/clients/ClientsExplorer";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SkipLink } from "@/components/layout/SkipLink";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { Container } from "@/components/ui/Container";
import { ArrowRightIcon, ChatIcon, MailIcon } from "@/components/ui/Icons";
import { PRODUCTS } from "@/lib/products";
import { SITE } from "@/lib/site";

export function ProductsPage() {
  return (
    <>
      <SkipLink />
      <Header brand="products" />
      <main id="main">
        <section className="pt-28 pb-16 md:pt-32 md:pb-24">
          <Container>
            <Link
              href="/labs"
              className="inline-flex items-center gap-3 font-mono text-xs tracking-[0.16em] text-fg-subtle uppercase transition-colors hover:text-fg"
            >
              <span aria-hidden="true">←</span> Ascendry Labs
            </Link>
            <div className="mt-5 mb-8 flex flex-col justify-between gap-3 md:mb-10 md:flex-row md:items-end">
              <h1 className="font-display text-[clamp(36px,5vw,60px)] leading-none font-normal tracking-[-0.02em]">
                What we&apos;ve <em className="text-fg-muted">built</em>.
              </h1>
              <p className="max-w-[40ch] text-[15px] leading-[1.6] text-fg-muted">
                Products designed, engineered and launched in-house by Ascendry Labs.
              </p>
            </div>
            <ClientsExplorer projects={PRODUCTS} />
          </Container>
        </section>

        <section className="bg-invert-bg py-20 text-invert-fg md:py-28">
          <Container>
            <p className="font-mono text-xs tracking-[0.16em] text-invert-muted uppercase">— Early access</p>
            <h2 className="mt-6 max-w-[18ch] font-display text-[clamp(34px,4.4vw,56px)] leading-[1.05] !text-invert-fg">
              Want to try a product <em className="!text-invert-muted">first</em>?
            </h2>
            <p className="mt-6 max-w-[52ch] text-lg leading-[1.6] text-invert-muted">
              Tell us what you&apos;d like to use and we&apos;ll keep you in the loop.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={SITE.whatsapp}
                className="group inline-flex h-12 items-center justify-center gap-2.5 rounded-md bg-invert-fg px-6 text-sm font-medium text-invert-bg transition-colors hover:bg-[#262626]"
              >
                <ChatIcon width={18} height={18} /> Chat on WhatsApp
                <ArrowRightIcon
                  width={16}
                  height={16}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="inline-flex h-12 items-center justify-center gap-2.5 rounded-md border border-black/20 px-6 text-sm font-medium text-invert-fg transition-colors hover:bg-black/5"
              >
                <MailIcon width={18} height={18} /> {SITE.email}
              </a>
            </div>
          </Container>
        </section>
      </main>
      <Footer brand="labs" />
      <WhatsAppButton />
    </>
  );
}
