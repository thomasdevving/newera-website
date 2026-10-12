import type { Metadata } from "next";
import { Building, Building2, HardHat, Landmark, Plug } from "lucide-react";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Faq, type FaqItem } from "@/components/sections/Faq";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessStepper } from "@/components/sections/ProcessStepper";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { images } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Werkwijze",
  description:
    "De werkwijze van Studio NewEra in negen fasen, van aanvraag tot service, voor aannemers, projectontwikkelaars, woningcorporaties en bouwpartners.",
  alternates: { canonical: "/werkwijze" },
};

const audiences = [
  { icon: HardHat, title: "Aannemers", text: "Meerdere keukens tegelijk, afgestemd op de bouwplanning." },
  { icon: Building, title: "Projectontwikkelaars", text: "Een keukenpakket dat vroeg in het plan duidelijk is." },
  { icon: Landmark, title: "Woningcorporaties", text: "Uniforme uitvoering bij nieuwbouw en renovatie." },
  { icon: Plug, title: "Installateurs & bouwpartners", text: "Heldere afspraken over leidingwerk en aansluitpunten." },
];

const faq: FaqItem[] = [
  {
    question: "Werken jullie ook voor particulieren?",
    answer: "Nee. Wij werken uitsluitend voor zakelijke opdrachtgevers.",
  },
  {
    question: "Wat heb ik nodig om een aanvraag te doen?",
    answer: "Een plattegrond, het aantal keukens en de gewenste leverweek. Ontbreekt er iets, dan kunt u later aanvullen.",
  },
  {
    question: "Hoe weet ik de status van mijn project?",
    answer: "Nu via uw vaste contactpersoon. Straks ook in de klantportal, die gefaseerd wordt uitgerold.",
  },
  {
    question: "Wat als de planning op de bouw verschuift?",
    answer: "Meld het zo vroeg mogelijk. Wij stemmen meetmoment, levering en montage opnieuw af.",
  },
];

export default function WerkwijzePage() {
  return (
    <>
      <PageHero
        label="Werkwijze"
        title="Van plattegrond tot oplevering, in negen fasen."
        intro="Per fase is duidelijk wat er gebeurt en wat de volgende stap is."
        image={images.floorPlan}
      />

      <Section>
        <ProcessStepper />
      </Section>

      <section id="voor-wie" className="surface-paper scroll-mt-20 py-16 md:py-20" aria-labelledby="voor-wie-titel">
        <Container>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="label-caps flex items-center gap-3 text-accent-deep">
                <span aria-hidden className="inline-block h-px w-6 bg-accent-deep" />
                Voor wie
              </p>
              <h2 id="voor-wie-titel" className="mt-5 text-[clamp(1.75rem,3.4vw,2.75rem)] font-light leading-[1.1] tracking-[-0.02em]">
                Voor wie keukens in projecten bouwt.
              </h2>
            </div>
            <p className="flex items-center gap-2.5 text-[15px] text-paper-muted">
              <Building2 aria-hidden className="h-4 w-4 text-accent-deep" strokeWidth={1.5} />
              Wij werken uitsluitend voor zakelijke opdrachtgevers.
            </p>
          </div>
          <ul className="mt-10 grid border-l border-t border-paper-line sm:grid-cols-2 xl:grid-cols-4">
            {audiences.map(({ icon: Icon, title, text }, index) => (
              <Reveal as="li" key={title} delay={index * 0.05} className="border-b border-r border-paper-line p-6 md:p-7">
                <Icon aria-hidden className="h-5 w-5 text-accent-deep" strokeWidth={1.5} />
                <h3 className="mt-5 text-lg">{title}</h3>
                <p className="mt-1.5 text-[15px] leading-snug text-paper-muted">{text}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <Section>
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <h2 className="text-[clamp(1.75rem,3.4vw,2.75rem)] font-light leading-[1.1] tracking-[-0.02em] lg:col-span-4">
            Veelgestelde vragen
          </h2>
          <div className="lg:col-span-8">
            <Faq items={faq} />
          </div>
        </div>
      </Section>

      <CtaBanner title="Past uw project hierbij?" />
    </>
  );
}
