import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { RevealText } from "@/components/motion/RevealText";
import { DashboardMockup } from "./DashboardMockup";

const points = [
  "Status per fase, per project",
  "Offertes en tekeningen op één plek",
  "Meldingen wanneer actie nodig is",
];

export function PortalTeaser() {
  return (
    <Section ruled className="overflow-hidden bg-elevated/40">
      <div className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className="lg:col-span-4">
          <Reveal y={12}>
            <p className="label-caps flex items-center gap-3 text-accent">
              <span aria-hidden className="inline-block h-px w-6 bg-accent" />
              Klantportal
            </p>
          </Reveal>
          <RevealText
            text="Uw projecten, per fase in beeld."
            className="mt-6 text-[clamp(2rem,4vw,3.25rem)] font-light leading-[1.1] tracking-[-0.025em]"
          />
          <Reveal delay={0.15}>
            <p className="mt-6 text-lg text-muted">
              Wij bouwen aan een klantportal waarin u aanvragen indient, de status van elk project volgt en alle
              documenten terugvindt. De portal wordt gefaseerd uitgerold.
            </p>
            <ul className="mt-8 space-y-3 border-t border-line pt-6">
              {points.map((point) => (
                <li key={point} className="flex items-center gap-3 text-ink">
                  <Check aria-hidden className="h-4 w-4 text-accent" strokeWidth={1.75} />
                  {point}
                </li>
              ))}
            </ul>
            <Button href="/klantportal" variant="secondary" className="mt-10" arrow>
              Meer over de klantportal
            </Button>
          </Reveal>
        </div>
        <div className="lg:col-span-8 lg:pl-6">
          <DashboardMockup compact />
        </div>
      </div>
    </Section>
  );
}
