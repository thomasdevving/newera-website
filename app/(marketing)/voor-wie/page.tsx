import type { Metadata } from "next";
import { Building2 } from "lucide-react";
import { AudienceGrid } from "@/components/sections/AudienceGrid";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { FloorPlan } from "@/components/sections/LineArt";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Voor wie",
  description:
    "Studio NewEra werkt voor aannemers, projectontwikkelaars, woningcorporaties, installateurs en bouwpartners. Uitsluitend zakelijke opdrachtgevers.",
  alternates: { canonical: "/voor-wie" },
};

export default function VoorWiePage() {
  return (
    <>
      <PageHero
        label="Voor wie"
        title="Voor wie keukens in projecten bouwt."
        intro="Wij werken voor partijen die meerdere keukens tegelijk nodig hebben en waarvoor de planning op de bouw leidend is."
      />
      <Section>
        <AudienceGrid />

        <div className="mt-20 grid gap-12 border-t border-line pt-12 md:mt-28 lg:grid-cols-12 lg:items-center lg:gap-10">
          <Reveal className="lg:col-span-5">
            <p className="flex items-center gap-3 text-accent">
              <Building2 aria-hidden className="h-5 w-5" strokeWidth={1.5} />
              <span className="label-caps">Uitsluitend zakelijk</span>
            </p>
            <p className="mt-6 text-[clamp(1.6rem,2.6vw,2.25rem)] font-light leading-snug tracking-[-0.015em]">
              Wij werken uitsluitend voor zakelijke opdrachtgevers.
            </p>
            <p className="mt-4 text-muted">
              Bent u particulier op zoek naar een keuken? Dan kunnen wij u helaas niet helpen. Een keukenzaak bij u in de
              buurt is dan de beste plek om te beginnen.
            </p>
          </Reveal>
          <div className="lg:col-span-6 lg:col-start-7">
            <FloorPlan className="w-full" />
          </div>
        </div>
      </Section>
      <CtaBanner title="Past uw project hierbij?" />
    </>
  );
}
