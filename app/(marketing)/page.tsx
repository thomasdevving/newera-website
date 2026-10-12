import { CtaBanner } from "@/components/sections/CtaBanner";
import { Hero } from "@/components/sections/Hero";
import { PortalTeaser } from "@/components/sections/PortalTeaser";
import { ProcessOverview } from "@/components/sections/ProcessOverview";

export const metadata = {
  title: { absolute: "Studio NewEra | Keukenprojecten voor aannemers en ontwikkelaars" },
  description:
    "Studio NewEra ontwerpt, levert en monteert keukens voor aannemers, projectontwikkelaars en woningcorporaties. Van aanvraag tot oplevering: één partner, één overzicht.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProcessOverview />
      <PortalTeaser />
      <CtaBanner />
    </>
  );
}
