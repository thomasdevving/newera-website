import { Benefits } from "@/components/sections/Benefits";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Hero } from "@/components/sections/Hero";
import { PortalTeaser } from "@/components/sections/PortalTeaser";
import { ProcessPreview } from "@/components/sections/ProcessPreview";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata = {
  title: { absolute: "Studio NewEra | Keukenprojecten voor aannemers en ontwikkelaars" },
  description:
    "Studio NewEra ontwerpt, levert en monteert keukens voor aannemers, projectontwikkelaars en woningcorporaties. Eén partner en overzicht in elke fase, van aanvraag tot service.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Benefits />
      <Section id="werkwijze" className="pt-0 md:pt-0 xl:pt-0">
        <SectionHeader
          label="Werkwijze"
          title="Negen fasen, één partner."
          intro="Van de eerste plattegrond tot nazorg na oplevering. Per fase is duidelijk wat wij van u nodig hebben en wat u van ons ontvangt."
          action={
            <Button href="/hoe-het-werkt" variant="secondary" arrow>
              Bekijk het volledige proces
            </Button>
          }
        />
        <ProcessPreview />
      </Section>
      <PortalTeaser />
      <CtaBanner />
    </>
  );
}
