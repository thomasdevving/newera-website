import {
  CheckCheck,
  ClipboardList,
  FileText,
  Hammer,
  KeyRound,
  LifeBuoy,
  type LucideIcon,
  Package,
  PenTool,
  Ruler,
} from "lucide-react";

export type ProcessStep = {
  id: string;
  title: string;
  summary: string;
  description: string;
  weReceive: string;
  youReceive: string;
  icon: LucideIcon;
};

/** The nine phases of every project, in order. Shared by home, timeline and portal mockup. */
export const processSteps: ProcessStep[] = [
  {
    id: "aanvraag",
    title: "Aanvraag",
    summary: "Wij ontvangen uw project en plattegronden.",
    description:
      "U dient het project in via het aanvraagformulier, met plattegronden, aantallen en de gewenste leverperiode. Wij controleren of alles compleet is.",
    weReceive: "Plattegronden, aantal keukens, gewenste leverweek.",
    youReceive: "Bevestiging van ontvangst en een vast aanspreekpunt.",
    icon: ClipboardList,
  },
  {
    id: "uitwerking",
    title: "Uitwerking",
    summary: "Keukenontwerp, maatvoering en technische tekening, inclusief leidingadvies.",
    description:
      "Wij werken het keukenontwerp per type uit, met maatvoering en een technische tekening. U ontvangt advies over de positie van water, afvoer en elektra.",
    weReceive: "Eventuele merkvoorkeur, specificaties en installatietekeningen.",
    youReceive: "Ontwerp, technische tekening en leidingadvies.",
    icon: PenTool,
  },
  {
    id: "offerte",
    title: "Offerte",
    summary: "Een duidelijke, volledige offerte.",
    description:
      "Op basis van de uitwerking stellen wij een offerte op die per keukentype laat zien wat er geleverd en gemonteerd wordt.",
    weReceive: "Akkoord op de uitwerking of uw opmerkingen.",
    youReceive: "Een volledige offerte per project.",
    icon: FileText,
  },
  {
    id: "akkoord",
    title: "Akkoord",
    summary: "U beoordeelt en keurt goed.",
    description:
      "U beoordeelt de offerte en tekeningen. Na akkoord leggen wij de planning vast en stemmen wij de leverweek af.",
    weReceive: "Getekende offerte en bevestigde leverperiode.",
    youReceive: "Orderbevestiging en vastgelegde planning.",
    icon: CheckCheck,
  },
  {
    id: "meten",
    title: "Meten",
    summary: "Opmeten ter plaatse om alles definitief te controleren.",
    description:
      "Wij meten iedere ruimte op locatie in, zodat de keukens exact passen. Afwijkingen ten opzichte van tekening worden direct teruggekoppeld.",
    weReceive: "Toegang tot de bouwlocatie op de afgesproken dag.",
    youReceive: "Definitieve maatvoering per keuken.",
    icon: Ruler,
  },
  {
    id: "bestelling",
    title: "Bestelling",
    summary: "Bestelling en controle van de orderbevestiging.",
    description:
      "Wij bestellen bij de leveranciers en controleren elke orderbevestiging op maat, uitvoering en leverdatum.",
    weReceive: "Geen actie nodig.",
    youReceive: "Bevestigde leverdatum per keuken.",
    icon: Package,
  },
  {
    id: "montage",
    title: "Montage",
    summary: "Professionele installatie volgens planning.",
    description:
      "Onze monteurs installeren de keukens volgens de afgesproken bouwplanning, woning voor woning.",
    weReceive: "Bouwrijpe ruimtes en afstemming met de uitvoerder.",
    youReceive: "Gemonteerde keukens volgens planning.",
    icon: Hammer,
  },
  {
    id: "oplevering",
    title: "Oplevering",
    summary: "Gezamenlijke oplevering en controle.",
    description:
      "Wij lopen iedere keuken samen met u na. Eventuele punten worden vastgelegd en binnen een afgesproken termijn opgelost.",
    weReceive: "Aanwezigheid bij de oplevering.",
    youReceive: "Opleverrapport per keuken.",
    icon: KeyRound,
  },
  {
    id: "service",
    title: "Service",
    summary: "Nazorg bij vragen of onvolkomenheden.",
    description:
      "Ook na oplevering blijven wij bereikbaar voor vragen, onderhoud of onvolkomenheden, via hetzelfde aanspreekpunt.",
    weReceive: "Een melding met omschrijving en eventueel foto.",
    youReceive: "Opvolging door uw vaste contactpersoon.",
    icon: LifeBuoy,
  },
];
