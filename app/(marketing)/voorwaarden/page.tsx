import type { Metadata } from "next";
import { LegalPlaceholder } from "@/components/sections/LegalPlaceholder";

export const metadata: Metadata = {
  title: "Algemene voorwaarden",
  description: "Algemene voorwaarden van Studio NewEra.",
  alternates: { canonical: "/voorwaarden" },
};

export default function VoorwaardenPage() {
  return <LegalPlaceholder title="Algemene voorwaarden" />;
}
