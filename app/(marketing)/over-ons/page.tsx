import type { Metadata } from "next";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { KitchenElevation } from "@/components/sections/LineArt";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { images } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Over ons",
  description:
    "Studio NewEra verzorgt keukens voor zakelijke opdrachtgevers, gestructureerd en als één partner. Lees waar wij voor staan.",
  alternates: { canonical: "/over-ons" },
};

const values = [
  {
    title: "Duidelijkheid",
    text: "Heldere afspraken, een vast aanspreekpunt en per fase duidelijk wat er van wie verwacht wordt.",
  },
  {
    title: "Vakmanschap",
    text: "Zorgvuldig ontwerp, nauwkeurige maatvoering en montage die past bij de kwaliteit van het project.",
  },
  {
    title: "Betrouwbaarheid",
    text: "Planningen die worden bewaakt en afwijkingen die vroeg op tafel komen, niet pas in de leverweek.",
  },
];

export default function OverOnsPage() {
  return (
    <>
      <PageHero
        label="Over ons"
        title="Een keukenpartner die werkt zoals de bouw werkt."
        intro="Studio NewEra is opgezet voor zakelijke opdrachtgevers die keukens in projecten afnemen en behoefte hebben aan overzicht, structuur en één partner die de hele keten verzorgt."
      />

      <Section>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5">
            <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-light leading-tight tracking-[-0.02em]">Ons verhaal</h2>
            <div className="mt-6 space-y-5 text-lg text-muted">
              <p>
                Bij projecten met tientallen woningen draait alles om planning. Een keuken die niet op tijd is ingemeten of
                besteld, houdt de oplevering van een hele woning op. Wij richten ons werk daarom in rond de fasen van de bouw.
              </p>
              <p>
                Van de eerste plattegrond tot de nazorg werkt u met hetzelfde team en hetzelfde aanspreekpunt. Een digitale
                werkwijze houdt projecten overzichtelijk, voor ons en voor u.
              </p>
              <p className="border-l border-accent pl-4 text-base text-faint">[Tekst volgt: aanvullend verhaal over de organisatie.]</p>
            </div>
          </Reveal>
          <div className="lg:col-span-6 lg:col-start-7">
            <ImagePlaceholder src={images.about.src} alt={images.about.alt} className="aspect-[4/3] w-full" />
            <KitchenElevation className="mt-10 w-full" />
          </div>
        </div>
      </Section>

      <Section ruled>
        <SectionHeader label="Waar wij voor staan" title="Drie principes in elk project." />
        <ol className="grid border-l border-t border-line md:grid-cols-3">
          {values.map((value, index) => (
            <Reveal as="li" key={value.title} delay={index * 0.12} className="group relative border-b border-r border-line p-7 md:p-10">
              <span aria-hidden className="absolute left-0 top-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-700 ease-out-expo group-hover:scale-x-100" />
              <h3 className="text-[clamp(1.75rem,2.6vw,2.25rem)] font-light tracking-[-0.02em] transition-colors duration-500 group-hover:text-accent">
                {value.title}
              </h3>
              <p className="mt-4 text-muted">{value.text}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section ruled>
        <SectionHeader label="Team" title="De mensen achter uw project." intro="[Tekst volgt: introductie van het team.]" />
        <ul className="grid gap-px sm:grid-cols-2 lg:grid-cols-3">
          {images.team.map((member, index) => (
            <Reveal as="li" key={index} delay={index * 0.1}>
              <ImagePlaceholder src={member.src} alt={member.alt} className="aspect-[4/5] w-full" sizes="(min-width: 1024px) 33vw, 50vw" />
              <p className="mt-4 text-ink">{member.name}</p>
              <p className="text-sm text-muted">{member.role}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section ruled>
        <SectionHeader label="Referenties" title="Projecten en opdrachtgevers." />
        <Reveal className="flex min-h-48 items-center justify-center border border-dashed border-line-strong p-10 text-center text-muted">
          [Referenties volgen. Hier komen projecten en opdrachtgevers, met hun toestemming.]
        </Reveal>
      </Section>

      <CtaBanner />
    </>
  );
}
