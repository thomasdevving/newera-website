import type { Metadata } from "next";
import { Bell, FileUp, FolderOpen, Layers, MessagesSquare } from "lucide-react";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { DashboardMockup } from "@/components/sections/DashboardMockup";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Klantportal",
  description:
    "De klantportal van Studio NewEra wordt de centrale plek per project: aanvragen indienen, offertes en tekeningen inzien en de status per fase volgen.",
  alternates: { canonical: "/klantportal" },
};

const features = [
  { icon: FileUp, title: "Aanvraag indienen met bijlagen", text: "Plattegronden, aantallen en leverperiode in één gestructureerde aanvraag." },
  { icon: FolderOpen, title: "Offertes en tekeningen inzien", text: "Altijd de actuele versie, per project en per keukentype." },
  { icon: Layers, title: "Projectstatus per fase", text: "Zie in één oogopslag waar elk project staat, van aanvraag tot oplevering." },
  { icon: Bell, title: "Automatische meldingen", text: "Bijvoorbeeld wanneer meten ingepland moet worden of er iets aangeleverd moet worden." },
  { icon: MessagesSquare, title: "Communicatie gebundeld", text: "Alle berichten en documenten per project op één plek, in plaats van verspreid over e-mail." },
];

export default function KlantportalPage() {
  return (
    <>
      <PageHero
        label="Klantportal"
        title="Eén plek per project, voor alles wat u nodig heeft."
        intro="In de klantportal volgt u straks per project de status, bekijkt u offertes en tekeningen en ontvangt u een melding wanneer er iets van u nodig is."
      >
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Button href={siteConfig.cta.login.href} size="lg" arrow>
            {siteConfig.cta.login.label}
          </Button>
          <p className="text-sm text-muted">De klantportal wordt gefaseerd uitgerold.</p>
        </div>
      </PageHero>

      <Section>
        <DashboardMockup />
        <p className="mt-4 text-sm text-muted">Voorbeeldweergave. Projectnamen, aantallen en statussen zijn ter illustratie.</p>
      </Section>

      <Section ruled>
        <SectionHeader
          label="Functies"
          title="Wat de klantportal u gaat bieden."
          intro="De portal wordt stap voor stap beschikbaar. Lopende projecten blijven tot die tijd via uw vaste contactpersoon verlopen."
        />
        <ul className="grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, text }, index) => (
            <Reveal
              as="li"
              key={title}
              delay={(index % 3) * 0.1}
              className="group border-b border-r border-line p-7 transition-colors duration-500 hover:bg-elevated md:p-9"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center border border-line-strong text-accent transition-colors duration-500 group-hover:border-accent">
                <Icon aria-hidden className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <h3 className="mt-8 text-xl text-ink">{title}</h3>
              <p className="mt-2 text-muted">{text}</p>
            </Reveal>
          ))}
          <Reveal as="li" delay={0.2} className="flex flex-col justify-between gap-8 border-b border-r border-line bg-elevated p-7 md:p-9">
            <p className="text-xl font-light leading-snug">Heeft u al een project bij ons lopen?</p>
            <Button href={siteConfig.cta.login.href} variant="secondary" arrow>
              Naar inloggen
            </Button>
          </Reveal>
        </ul>
      </Section>
      <CtaBanner />
    </>
  );
}
