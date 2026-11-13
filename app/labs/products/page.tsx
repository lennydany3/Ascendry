import type { Metadata } from "next";
import { ProductsPage } from "@/components/labs/ProductsPage";

export const metadata: Metadata = {
  title: "Products — Ascendry Labs",
  description: "Products designed, engineered and launched in-house by Ascendry Labs.",
};

export default function Page() {
  return <ProductsPage />;
}
