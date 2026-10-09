import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { DrawLine } from "@/components/motion/DrawLine";
import { Reveal } from "@/components/motion/Reveal";

const benefits = [
  {
    title: "Snel",
    text: "Van aanvraag naar offerte zonder heen-en-weer mailen.",
    detail: "Een gestructureerde aanvraag met plattegronden en aantallen, zodat de uitwerking direct kan starten.",
  },
  {
    title: "Overzichtelijk",
    text: "Alle projectinformatie, tekeningen en afspraken op één plek.",
    detail: "Eén dossier per project en één contactpersoon die het kent.",
  },
  {
    title: "Betrouwbaar",
    text: "Planning bewaakt, zodat vertragingen vroeg zichtbaar zijn.",
    detail: "Meetmomenten en leverweken worden vooraf vastgelegd en actief bewaakt.",
  },
];

/** Three benefits set as a ruled typographic list instead of cards. */
export function Benefits() {
  return (
    <Section>
      <SectionHeader
        label="Werken met ons"
        title="Minder afstemming, meer grip op de planning."
        intro="Een keukenproject raakt veel partijen. Wij houden het overzicht, zodat u dat niet hoeft te doen."
      />

      <ol>
        {benefits.map((benefit, index) => (
          <li key={benefit.title} className="group relative">
            <DrawLine delay={index * 0.12} />
            <span aria-hidden className="absolute left-0 top-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-700 ease-out-expo group-hover:scale-x-100" />
            <Reveal delay={0.1 + index * 0.12} className="grid gap-4 py-10 md:grid-cols-12 md:gap-10 md:py-14">
              <h3 className="text-[clamp(2.25rem,5vw,4.25rem)] font-light leading-none tracking-[-0.03em] text-ink transition-[color,transform] duration-500 ease-out-expo group-hover:translate-x-2 group-hover:text-accent md:col-span-5">
                {benefit.title}
              </h3>
              <div className="md:col-span-6 md:col-start-7">
                <p className="text-xl leading-snug text-ink">{benefit.text}</p>
                <p className="mt-3 text-muted">{benefit.detail}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
