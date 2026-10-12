import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Bars } from "@/components/ui/Bars";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { RevealText } from "@/components/motion/RevealText";
import { DashboardMockup } from "./DashboardMockup";

const points = ["Aanvraag en status volgen", "Ontwerpen bekijken en goedkeuren", "Afspraken plannen", "Service melden"];

/** Home: short portal pitch next to a compact dashboard preview. */
export function PortalTeaser() {
  return (
    <Section className="overflow-hidden">
      <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className="lg:col-span-4">
          <p className="label-caps flex items-center gap-3 text-accent">
            <span aria-hidden className="inline-block h-px w-6 bg-accent" />
            Klantportal
          </p>
          <RevealText
            text="Alles over uw project op één plek."
            className="mt-5 text-[clamp(2rem,3.6vw,3rem)] font-light leading-[1.1] tracking-[-0.025em]"
          />
          <Reveal>
            <ul className="mt-8 space-y-3 border-t border-line pt-6">
              {points.map((point) => (
                <li key={point} className="flex items-center gap-3">
                  <Bars className="text-accent" />
                  {point}
                </li>
              ))}
            </ul>
            <Link
              href="/klantportal"
              className="group mt-8 inline-flex items-center gap-3 text-[15px] text-accent underline-offset-4 hover:underline"
            >
              Meer over de klantportal
              <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-1" strokeWidth={1.5} />
            </Link>
          </Reveal>
        </div>
        <div className="lg:col-span-8 lg:pl-4">
          <DashboardMockup compact />
        </div>
      </div>
    </Section>
  );
}
