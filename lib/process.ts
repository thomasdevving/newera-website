import {
  CheckCheck,
  ClipboardList,
  Hammer,
  KeyRound,
  LifeBuoy,
  type LucideIcon,
  Package,
  PenTool,
  Ruler,
  FileText,
} from "lucide-react";

export type ProcessStep = {
  id: string;
  title: string;
  summary: string;
  icon: LucideIcon;
};

/** The nine phases of every project, in order. */
export const processSteps: ProcessStep[] = [
  { id: "aanvraag", title: "Aanvraag", summary: "U dient het project in met plattegronden, aantallen en gewenste leverweek.", icon: ClipboardList },
  { id: "uitwerking", title: "Uitwerking", summary: "Ontwerp, maatvoering en technische tekening, inclusief leidingadvies.", icon: PenTool },
  { id: "offerte", title: "Offerte", summary: "Een duidelijke, volledige offerte per keukentype.", icon: FileText },
  { id: "akkoord", title: "Akkoord", summary: "U keurt ontwerp en offerte goed en wij leggen de planning vast.", icon: CheckCheck },
  { id: "meten", title: "Meten", summary: "Wij meten op locatie in, zodat elke keuken exact past.", icon: Ruler },
  { id: "bestelling", title: "Bestelling", summary: "Wij bestellen en controleren elke orderbevestiging.", icon: Package },
  { id: "montage", title: "Montage", summary: "Installatie woning voor woning, volgens de bouwplanning.", icon: Hammer },
  { id: "oplevering", title: "Oplevering", summary: "Samen nalopen en eventuele punten vastleggen.", icon: KeyRound },
  { id: "service", title: "Service", summary: "Nazorg via hetzelfde vaste aanspreekpunt.", icon: LifeBuoy },
];

/** Four-step summary used on the homepage. */
export const processOverview: Array<{ title: string; text: string; icon: LucideIcon }> = [
  { title: "Aanvraag", text: "Plattegronden en aantallen in één aanvraag.", icon: ClipboardList },
  { title: "Ontwerp & offerte", text: "Tekening, leidingadvies en een heldere offerte.", icon: PenTool },
  { title: "Meten & bestellen", text: "Ingemeten op locatie, besteld en gecontroleerd.", icon: Ruler },
  { title: "Montage & service", text: "Volgens planning geplaatst, met nazorg erna.", icon: Hammer },
];
