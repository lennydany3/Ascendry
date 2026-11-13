import Link from "next/link";
import { ClientsExplorer } from "@/components/clients/ClientsExplorer";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SkipLink } from "@/components/layout/SkipLink";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { Container } from "@/components/ui/Container";
import { ChatIcon, MailIcon } from "@/components/ui/Icons";
import { SITE } from "@/lib/site";

export function ClientsPage() {
  return (
    <>
      <SkipLink />
      <Header brand="clients" />
      <main id="main">
        <section className="pt-28 pb-16 md:pt-32 md:pb-24">
          <Container>
            <Link
              href="/"
              className="inline-flex items-center gap-3 font-mono text-xs tracking-[0.16em] text-fg-subtle uppercase transition-colors hover:text-fg"
            >
              <span aria-hidden="true">←</span> Ascendry Studio
            </Link>
            <div className="mt-5 mb-8 flex flex-col justify-between gap-3 md:mb-10 md:flex-row md:items-end">
              <h1 className="font-display text-[clamp(36px,5vw,60px)] leading-none font-normal tracking-[-0.02em]">
                Platforms in <em className="text-fg-muted">production</em>.
              </h1>
              <p className="max-w-[40ch] text-[15px] leading-[1.6] text-fg-muted">
                Choose a project to see what we built and how it looks.
              </p>
            </div>
            <ClientsExplorer />
          </Container>
        </section>

        <section className="bg-invert-bg py-20 text-invert-fg md:py-28">
          <Container>
            <p className="font-mono text-xs tracking-[0.16em] text-invert-muted uppercase">— Work with us</p>
            <h2 className="mt-6 max-w-[18ch] font-display text-[clamp(34px,4.4vw,56px)] leading-[1.05] !text-invert-fg">
              Your project could be <em className="!text-invert-muted">next</em>.
            </h2>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={SITE.whatsapp}
                className="inline-flex h-12 items-center justify-center gap-2.5 rounded-md bg-invert-fg px-6 text-sm font-medium text-invert-bg transition-colors hover:bg-[#262626]"
              >
                <ChatIcon width={18} height={18} /> Chat on WhatsApp
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
      <Footer brand="studio" />
      <WhatsAppButton />
    </>
  );
}
