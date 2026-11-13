import type { Metadata } from "next";
import { ClientsPage } from "@/components/clients/ClientsPage";

export const metadata: Metadata = {
  title: "Clients — Ascendry Studio",
  description: "Platforms Ascendry Studio has designed, built and shipped for clients.",
};

export default function Page() {
  return <ClientsPage />;
}
