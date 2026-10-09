import { Check, HardHat, Building, Landmark, Plug, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

type Audience = { icon: LucideIcon; title: string; intro: string; benefits: string[] };

const audiences: Audience[] = [
  {
    icon: HardHat,
    title: "Aannemers",
    intro: "Keukens die aansluiten op uw bouwplanning, zonder dat u erachteraan hoeft.",
    benefits: [
      "Meerdere keukens tegelijk, per woningtype uitgewerkt",
      "Meten en montage afgestemd op de bouwplanning",
      "Eén contactpersoon voor uitvoerder en werkvoorbereiding",
    ],
  },
  {
    icon: Building,
    title: "Projectontwikkelaars",
    intro: "Een keukenpakket dat past bij het project en vroeg in de planvorming duidelijk is.",
    benefits: [
      "Ontwerp en technische tekening in de voorbereidingsfase",
      "Duidelijke offerte per keukentype",
      "Vaste planning van akkoord tot oplevering",
    ],
  },
  {
    icon: Landmark,
    title: "Woningcorporaties",
    intro: "Voor nieuwbouw, renovatie en mutatieonderhoud, met aandacht voor de bewoner.",
    benefits: [
      "Uniforme uitvoering over complexen heen",
      "Afspraken over planning per woning",
      "Nazorg via hetzelfde aanspreekpunt",
    ],
  },
  {
    icon: Plug,
    title: "Installateurs en bouwpartners",
    intro: "Heldere afstemming over leidingwerk, aansluitpunten en volgorde op de bouw.",
    benefits: [
      "Leidingadvies voor water, afvoer en elektra",
      "Technische tekeningen met aansluitpunten",
      "Afstemming van montagevolgorde",
    ],
  },
];

/** 2x2 ruled grid of customer types, no gaps between cells. */
export function AudienceGrid() {
  return (
    <ul className="grid border-l border-t border-line md:grid-cols-2">
      {audiences.map(({ icon: Icon, title, intro, benefits }, index) => (
        <Reveal
          as="li"
          key={title}
          delay={(index % 2) * 0.12}
          className="group relative border-b border-r border-line p-7 transition-colors duration-500 hover:bg-elevated md:p-10 xl:p-12"
        >
          <span aria-hidden className="absolute left-0 top-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-700 ease-out-expo group-hover:scale-x-100" />
          <div className="flex items-start justify-between gap-6">
            <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-light leading-tight tracking-[-0.02em]">{title}</h2>
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-line-strong text-accent transition-colors duration-500 group-hover:border-accent">
              <Icon aria-hidden className="h-5 w-5" strokeWidth={1.5} />
            </span>
          </div>
          <p className="mt-4 max-w-[42ch] text-lg text-muted">{intro}</p>
          <ul className="mt-8 space-y-3">
            {benefits.map((benefit, benefitIndex) => (
              <li key={benefit} className={cn("flex items-start gap-3 border-t border-line pt-3 text-ink", benefitIndex === 0 && "border-line")}>
                <Check aria-hidden className="mt-1 h-4 w-4 shrink-0 text-accent" strokeWidth={1.75} />
                {benefit}
              </li>
            ))}
          </ul>
        </Reveal>
      ))}
    </ul>
  );
}
