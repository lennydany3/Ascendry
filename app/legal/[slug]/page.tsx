import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/legal/LegalPage";
import { LEGAL_DOCS, getDoc } from "@/components/legal/content";

export function generateStaticParams() {
  return LEGAL_DOCS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata(
  props: PageProps<"/legal/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const doc = getDoc(slug);
  if (!doc) return {};
  return {
    title: `${doc.title} — Ascendry`,
    description: doc.summary,
  };
}

type Params = PageProps<"/legal/[slug]">["params"];

async function Doc({ params }: { params: Params }) {
  const { slug } = await params;
  const doc = getDoc(slug);
  if (!doc) notFound();
  return <LegalPage doc={doc} />;
}

export default function Page(props: PageProps<"/legal/[slug]">) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-bg" aria-busy="true" />}>
      <Doc params={props.params} />
    </Suspense>
  );
}
