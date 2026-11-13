import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/layout/SkipLink";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { LabsHero } from "@/components/labs/LabsHero";
import { LabsSections } from "@/components/labs/LabsSections";

export const metadata: Metadata = {
  title: "Ascendry Labs — Ideas that become products",
  description:
    "Ascendry Labs is where our own startup ideas get built and launched.",
};

export default function LabsPage() {
  return (
    <>
      <SkipLink />
      <Header brand="labs" />
      <main id="main">
        <LabsHero />
        <LabsSections />
      </main>
      <Footer brand="labs" />
      <WhatsAppButton />
    </>
  );
}
