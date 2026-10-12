import type { Metadata } from "next";
import { FileQuestion, Phone } from "lucide-react";
import { AanvraagForm } from "@/components/forms/AanvraagForm";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Aanvraag indienen",
  description:
    "Dien uw keukenproject in bij Studio NewEra: organisatie, project, aantal keukens, gewenste leverweek en plattegronden in één aanvraag.",
  alternates: { canonical: "/aanvraag" },
};

const nextSteps = [
  { title: "Controle", text: "Wij bekijken of de aanvraag compleet is en vragen zo nodig aanvullende informatie op." },
  { title: "Contact", text: `Binnen ${siteConfig.responseDays} werkdagen neemt uw contactpersoon contact met u op.` },
  { title: "Uitwerking", text: "Wij starten met ontwerp, maatvoering en technische tekening." },
];

export default function AanvraagPage() {
  return (
    <>
      <PageHero
        label="Aanvraag indienen"
        title="Vertel ons over uw project."
        intro="Hoe completer de aanvraag, hoe sneller wij met de uitwerking kunnen beginnen. Een plattegrond kunt u ook later aanvullen."
       
      />
      <Container className="grid gap-16 py-16 md:py-24 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-8">
          <AanvraagForm />
        </div>

        <aside className="lg:col-span-4 lg:col-start-9" aria-label="Over uw aanvraag">
          <div className="space-y-px lg:sticky lg:top-[calc(var(--header-h)+32px)]">
            <div className="border border-line border-t-accent bg-elevated p-6 md:p-7">
              <FileQuestion aria-hidden className="h-5 w-5 text-accent" strokeWidth={1.5} />
              <p className="mt-4 text-lg text-ink">Geen plattegrond bij de hand?</p>
              <p className="mt-2 text-muted">Dien de aanvraag toch in, u kunt later aanvullen.</p>
            </div>

            <div className="border border-line bg-elevated p-6 md:p-7">
              <h2 className="label-caps text-accent">Na het indienen</h2>
              <ol className="mt-6 space-y-5">
                {nextSteps.map((step, index) => (
                  <li key={step.title} className="grid grid-cols-[28px_1fr] gap-2">
                    <span className="tabular pt-0.5 text-xs tracking-[0.15em] text-accent">{String(index + 1).padStart(2, "0")}</span>
                    <span>
                      <span className="block text-ink">{step.title}</span>
                      <span className="block text-[15px] text-muted">{step.text}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="border border-line bg-elevated p-6 md:p-7">
              <p className="flex items-center gap-3 text-ink">
                <Phone aria-hidden className="h-4 w-4 text-accent" strokeWidth={1.5} />
                Liever eerst overleggen?
              </p>
              <p className="mt-2 text-[15px] text-muted">
                Bel {siteConfig.contact.phone} of mail naar {siteConfig.contact.email}.
              </p>
            </div>
          </div>
        </aside>
      </Container>
    </>
  );
}
