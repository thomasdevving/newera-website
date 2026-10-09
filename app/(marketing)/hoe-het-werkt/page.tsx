import type { Metadata } from "next";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Faq, type FaqItem } from "@/components/sections/Faq";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Hoe het werkt",
  description:
    "Het proces van Studio NewEra in negen fasen: aanvraag, uitwerking, offerte, akkoord, meten, bestelling, montage, oplevering en service.",
  alternates: { canonical: "/hoe-het-werkt" },
};

const faq: FaqItem[] = [
  {
    question: "Werken jullie ook voor particulieren?",
    answer:
      "Nee. Wij werken uitsluitend voor zakelijke opdrachtgevers, zoals aannemers, projectontwikkelaars, woningcorporaties en installateurs. Bent u particulier, dan verwijzen wij u graag door naar een keukenzaak bij u in de buurt.",
  },
  {
    question: "Wat heb ik nodig om een aanvraag te doen?",
    answer:
      "Een plattegrond of bouwtekening, het aantal keukens en de gewenste leverweek of periode. Heeft u een merkvoorkeur of specificaties, dan kunt u die meesturen. Ontbreekt er nog iets, dan kunt u de aanvraag later aanvullen.",
  },
  {
    question: "Hoe weet ik de status van mijn project?",
    answer:
      "Op dit moment via uw vaste contactpersoon, die u op de hoogte houdt bij elke fase. Straks kunt u de status ook volgen in de klantportal, die gefaseerd wordt uitgerold.",
  },
  {
    question: "Kunnen jullie meerdere keukens tegelijk verzorgen?",
    answer:
      "Ja. Wij zijn ingericht op projecten met meerdere woningen. Per keukentype werken wij een ontwerp uit, waarna meten, bestellen en monteren volgens de bouwplanning verlopen.",
  },
  {
    question: "Wat gebeurt er als de planning op de bouw verschuift?",
    answer:
      "Laat het ons zo vroeg mogelijk weten. Wij stemmen meetmomenten, leverweken en montage opnieuw af en geven aan welke gevolgen een verschuiving heeft.",
  },
];

export default function HoeHetWerktPage() {
  return (
    <>
      <PageHero
        label="Hoe het werkt"
        title="Van plattegrond tot oplevering, in negen heldere fasen."
        intro="Elke fase heeft een duidelijk begin en eind. U weet steeds wat wij van u nodig hebben, wat u van ons ontvangt en wat de volgende stap is."
      />
      <Section>
        <ProcessTimeline />
      </Section>
      <Section ruled>
        <SectionHeader label="Veelgestelde vragen" title="Vragen over de werkwijze." />
        <div className="lg:ml-[25%] lg:pl-2">
          <Faq items={faq} />
        </div>
      </Section>
      <CtaBanner />
    </>
  );
}
