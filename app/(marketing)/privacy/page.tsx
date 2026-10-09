import type { Metadata } from "next";
import { LegalPlaceholder } from "@/components/sections/LegalPlaceholder";

export const metadata: Metadata = {
  title: "Privacyverklaring",
  description: "Privacyverklaring van Studio NewEra.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return <LegalPlaceholder title="Privacyverklaring" />;
}
