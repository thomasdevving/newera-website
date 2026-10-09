import { Building2, MessagesSquare, Waypoints } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";

const items = [
  { icon: Building2, title: "Uitsluitend zakelijk", text: "Voor aannemers, ontwikkelaars, corporaties en bouwpartners." },
  { icon: Waypoints, title: "Eén partner van aanvraag tot service", text: "Ontwerp, levering, montage en nazorg in één hand." },
  { icon: MessagesSquare, title: "Duidelijke communicatie per project", text: "Eén aanspreekpunt dat uw project kent." },
];

export function TrustStrip() {
  return (
    <section aria-label="Waarom Studio NewEra" className="border-y border-line">
      <Container>
        <ul className="grid divide-y divide-line md:grid-cols-3 md:divide-x md:divide-y-0">
          {items.map(({ icon: Icon, title, text }, index) => (
            <Reveal as="li" key={title} delay={index * 0.1} y={16} className="flex gap-5 py-8 md:px-8 md:py-10 md:first:pl-0 md:last:pr-0">
              <Icon aria-hidden className="mt-1 h-5 w-5 shrink-0 text-accent" strokeWidth={1.5} />
              <div>
                <p className="text-[17px] text-ink">{title}</p>
                <p className="mt-1 text-[15px] text-muted">{text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
