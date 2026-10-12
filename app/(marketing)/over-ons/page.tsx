import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { Bars } from "@/components/ui/Bars";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { Section } from "@/components/ui/Section";
import { images } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Over ons",
  description: "Studio NewEra verzorgt keukens voor zakelijke opdrachtgevers, gestructureerd en als één partner.",
  alternates: { canonical: "/over-ons" },
};

const values = [
  { title: "Duidelijkheid", text: "Vaste afspraken en één aanspreekpunt per project." },
  { title: "Vakmanschap", text: "Nauwkeurig ontwerp, maatvoering en montage." },
  { title: "Betrouwbaarheid", text: "Planning bewaakt, afwijkingen vroeg op tafel." },
];

export default function OverOnsPage() {
  return (
    <>
      <PageHero label="Over ons" title="Een keukenpartner die werkt zoals de bouw werkt." image={images.building} />

      <Section>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-10">
          <Reveal className="lg:col-span-5">
            <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-light leading-[1.1] tracking-[-0.02em]">Ons verhaal</h2>
            <div className="mt-5 space-y-4 text-lg text-muted">
              <p>
                Bij projecten met tientallen woningen draait alles om planning. Daarom richten wij ons werk in rond de
                fasen van de bouw, met één team van eerste plattegrond tot nazorg.
              </p>
              <p className="border-l border-accent pl-4 text-base text-faint">[Tekst volgt: aanvullend verhaal over de organisatie.]</p>
            </div>
          </Reveal>
          <Reveal delay={0.08} className="aspect-[4/3] overflow-hidden lg:col-span-6 lg:col-start-7">
            <Photo src={images.about.src} alt={images.about.alt} sizes="(min-width: 1024px) 50vw, 100vw" />
          </Reveal>
        </div>
      </Section>

      <section className="surface-paper py-14 md:py-20" aria-labelledby="waarden">
        <Container>
          <h2 id="waarden" className="text-[clamp(1.75rem,3vw,2.5rem)] font-light leading-[1.1] tracking-[-0.02em]">
            Waar wij voor staan
          </h2>
          <ul className="mt-10 grid border-l border-t border-paper-line md:grid-cols-3">
            {values.map((value, index) => (
              <Reveal as="li" key={value.title} delay={index * 0.06} className="border-b border-r border-paper-line p-6 md:p-8">
                <Bars className="w-4 text-accent" />
                <h3 className="mt-5 text-2xl font-light">{value.title}</h3>
                <p className="mt-2 text-paper-muted">{value.text}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
