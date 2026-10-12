import type { Metadata } from "next";
import { CalendarDays, ClipboardList, Eye, FileClock, Layers, LifeBuoy, Ruler } from "lucide-react";
import { DashboardMockup } from "@/components/sections/DashboardMockup";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Klantportal",
  description:
    "De klantportal van Studio NewEra wordt de centrale plek per project: aanvragen, status per fase, ontwerpen goedkeuren, afspraken en servicemeldingen.",
  alternates: { canonical: "/klantportal" },
};

const clientFeatures = [
  { icon: ClipboardList, text: "Aanvraag indienen met plattegronden" },
  { icon: Layers, text: "Projectstatus per fase volgen" },
  { icon: Eye, text: "Ontwerpen en renderings bekijken, opmerkingen plaatsen en akkoord geven" },
  { icon: CalendarDays, text: "Afspraken inplannen" },
  { icon: FileClock, text: "Bestel- en projecthistorie inzien" },
  { icon: LifeBuoy, text: "Klachten en servicemeldingen indienen met foto's" },
];

export default function KlantportalPage() {
  return (
    <>
      <PageHero
        label="Klantportal"
        title="Eén plek voor elk project."
        intro="De klantportal wordt de centrale plek voor elk project: voor opdrachtgevers, voor ons team en voor onze monteurs."
      >
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Button href={siteConfig.cta.login.href} size="lg" arrow>
            {siteConfig.cta.login.label}
          </Button>
          <p className="text-sm text-muted">De klantportal wordt gefaseerd uitgerold.</p>
        </div>
      </PageHero>

      <Section compact className="pt-12 md:pt-16">
        <DashboardMockup />
      </Section>

      <section className="surface-paper py-14 md:py-20" aria-labelledby="voor-opdrachtgevers">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <h2 id="voor-opdrachtgevers" className="text-[clamp(1.75rem,3.2vw,2.5rem)] font-light leading-[1.1] tracking-[-0.02em]">
              Voor opdrachtgevers
            </h2>
            <p className="mt-4 text-paper-muted">Wat u in de portal kunt doen.</p>
          </div>
          <ul className="grid border-l border-t border-paper-line sm:grid-cols-2 lg:col-span-8">
            {clientFeatures.map(({ icon: Icon, text }, index) => (
              <Reveal as="li" key={text} delay={index * 0.04} className="flex items-start gap-4 border-b border-r border-paper-line p-5 md:p-6">
                <Icon aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-accent-deep" strokeWidth={1.5} />
                <span className="leading-snug">{text}</span>
              </Reveal>
            ))}
          </ul>
          <div className="flex items-start gap-4 border-t border-paper-line pt-6 lg:col-span-8 lg:col-start-5">
            <Ruler aria-hidden className="mt-1 h-5 w-5 shrink-0 text-accent-deep" strokeWidth={1.5} />
            <p>
              <span className="font-medium">Voor monteurs.</span>{" "}
              <span className="text-paper-muted">
                Onze monteurs leggen meet- en locatiegegevens digitaal vast, zodat montage en levering beter voorbereid zijn.
              </span>
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
