"use client";

import { motion } from "motion/react";
import { Bell, CalendarDays, Check, FolderKanban, Image as ImageIcon, LifeBuoy, MessageSquare, Search, type LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Photo } from "@/components/ui/Photo";
import { cn } from "@/lib/cn";
import { easeOut } from "@/lib/motion";
import { processSteps } from "@/lib/process";
import { images } from "@/lib/site-config";

/** Portal statuses mapped to how many of the nine phases are complete. */
const statuses = {
  "Aanvraag ontvangen": 1,
  "In uitwerking": 2,
  "Ontwerp ter goedkeuring": 3,
  Akkoord: 4,
  "Ingepland voor meten": 5,
  Besteld: 6,
  "Montage gepland": 7,
  Opgeleverd: 9,
} as const;

type Status = keyof typeof statuses;

// Demonstration data only, shown as "Voorbeeldweergave"
const projects: Array<{ name: string; kitchens: number; week: string; status: Status }> = [
  { name: "Blok C, appartementen", kitchens: 18, week: "wk 47", status: "Ontwerp ter goedkeuring" },
  { name: "Rijwoningen fase 2", kitchens: 12, week: "wk 3", status: "Ingepland voor meten" },
  { name: "Transformatie kantoorpand", kitchens: 26, week: "wk 50", status: "Besteld" },
  { name: "Seniorenwoningen Oost", kitchens: 14, week: "wk 44", status: "Montage gepland" },
  { name: "Herstructurering Zuid", kitchens: 32, week: "wk 12", status: "In uitwerking" },
  { name: "Appartementen Haven", kitchens: 16, week: "wk 2", status: "Akkoord" },
  { name: "Nieuwbouw Plein", kitchens: 20, week: "wk 9", status: "Aanvraag ontvangen" },
  { name: "Twee-onder-een-kap", kitchens: 8, week: "wk 41", status: "Opgeleverd" },
];

const navItems: Array<{ label: string; icon: LucideIcon; count?: number }> = [
  { label: "Projecten", icon: FolderKanban },
  { label: "Ontwerpen", icon: ImageIcon, count: 1 },
  { label: "Afspraken", icon: CalendarDays },
  { label: "Service", icon: LifeBuoy },
];

const notifications = [
  { icon: ImageIcon, title: "Ontwerp v2 staat klaar ter goedkeuring", project: "Blok C, appartementen", when: "Vandaag", accent: true },
  { icon: CalendarDays, title: "Meetafspraak bevestigd voor week 43", project: "Rijwoningen fase 2", when: "Gisteren" },
  { icon: LifeBuoy, title: "Servicemelding in behandeling", project: "Twee-onder-een-kap", when: "2 dagen" },
];

function badgeTone(status: Status) {
  if (status === "Opgeleverd") return "success" as const;
  if (status === "Ontwerp ter goedkeuring") return "accent" as const;
  if (status === "Aanvraag ontvangen" || status === "In uitwerking") return "muted" as const;
  return "neutral" as const;
}

const viewport = { once: true, margin: "0px 0px -10% 0px" } as const;

/**
 * Static preview of the customer portal. No real data; every value is
 * illustrative and the frame is labelled "Voorbeeldweergave".
 */
export function DashboardMockup({ compact = false, className }: { compact?: boolean; className?: string }) {
  const rows = compact ? projects.slice(0, 4) : projects;

  return (
    <motion.div
      className={cn("relative border border-line-strong bg-elevated text-[13px] text-ink", className)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.7, ease: easeOut }}
      role="img"
      aria-label="Voorbeeldweergave van de klantportal: projecten met status per fase, een ontwerp ter goedkeuring en meldingen"
    >
      <div aria-hidden>
        {/* Window bar */}
        <div className="flex h-11 items-center justify-between gap-4 border-b border-line px-4">
          <div className="flex items-center gap-3">
            <span className="flex gap-1.5">
              <span className="h-2 w-2 bg-line-strong" />
              <span className="h-2 w-2 bg-line-strong" />
              <span className="h-2 w-2 bg-line-strong" />
            </span>
            <span className="text-muted">Klantportal</span>
          </div>
          <span className="label-caps text-[10px] text-accent">Voorbeeldweergave</span>
        </div>

        <div className="grid md:grid-cols-[168px_minmax(0,1fr)]">
          {/* Navigation: sidebar from md, tabs below */}
          <nav className="flex overflow-hidden border-b border-line md:flex-col md:border-b-0 md:border-r md:py-3">
            {navItems.map(({ label, icon: Icon, count }, index) => (
              <span
                key={label}
                className={cn(
                  "relative flex flex-1 items-center justify-center gap-2 px-3 py-3 md:flex-none md:justify-start md:px-4 md:py-2.5",
                  index === 0 ? "text-ink" : "text-muted",
                )}
              >
                {index === 0 && <span className="absolute inset-x-0 bottom-0 h-px bg-accent md:inset-y-1 md:left-0 md:right-auto md:h-auto md:w-px" />}
                <Icon className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                <span className="hidden sm:inline">{label}</span>
                {count && <span className="tabular ml-auto hidden bg-accent px-1.5 text-[10px] font-medium text-bg md:inline">{count}</span>}
              </span>
            ))}
          </nav>

          <div className={cn("grid min-w-0", !compact && "xl:grid-cols-[minmax(0,1fr)_300px]")}>
            {/* Projects */}
            <div className="min-w-0">
              <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-3.5 md:px-5">
                <div>
                  <p className="text-base">Projecten</p>
                  <p className="tabular text-muted">
                    {projects.length} lopend, {projects.reduce((sum, project) => sum + project.kitchens, 0)} keukens
                  </p>
                </div>
                <span className="hidden h-8 items-center gap-2 border border-line px-3 text-muted sm:flex">
                  <Search className="h-3.5 w-3.5" strokeWidth={1.5} />
                  Zoek project
                </span>
              </div>
              <ul>
                {rows.map((project, index) => (
                  <motion.li
                    key={project.name}
                    className={cn(
                      "relative grid gap-2.5 border-b border-line px-4 py-3 last:border-b-0 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-x-5 md:px-5",
                      project.status === "Ontwerp ter goedkeuring" && "bg-accent-soft/40",
                    )}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={viewport}
                    transition={{ duration: 0.5, delay: 0.15 + index * 0.05 }}
                  >
                    {project.status === "Ontwerp ter goedkeuring" && <span className="absolute inset-y-0 left-0 w-px bg-accent" />}
                    <div className="min-w-0">
                      <p className="truncate">{project.name}</p>
                      <p className="tabular text-muted">
                        {project.kitchens} keukens, levering {project.week}
                      </p>
                    </div>
                    <div className="flex items-center justify-between gap-4 sm:justify-end">
                      <PhaseBar completed={statuses[project.status]} delay={0.3 + index * 0.05} />
                      <Badge tone={badgeTone(project.status)} className="justify-center px-1.5 text-[9.5px] tracking-[0.04em] sm:w-[188px] sm:px-2 sm:text-[10px] sm:tracking-[0.06em]">
                        {project.status}
                      </Badge>
                    </div>
                  </motion.li>
                ))}
              </ul>
              {compact && <ApprovalCard horizontal />}
            </div>

            {!compact && (
              <div className="border-t border-line xl:border-l xl:border-t-0">
                <ApprovalCard />
                <div className="border-t border-line">
                  <p className="flex items-center gap-2 px-4 py-3.5 text-base md:px-5">
                    <Bell className="h-4 w-4 text-accent" strokeWidth={1.5} />
                    Meldingen
                  </p>
                  <ul>
                    {notifications.map(({ icon: Icon, title, project, when, accent }) => (
                      <li key={title} className="flex gap-3 border-t border-line px-4 py-3 md:px-5">
                        <span className={cn("mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center border", accent ? "border-accent text-accent" : "border-line-strong text-muted")}>
                          <Icon className="h-3.5 w-3.5" strokeWidth={1.5} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block">{title}</span>
                          <span className="block truncate text-muted">{project}</span>
                        </span>
                        <span className="shrink-0 text-[11px] text-faint">{when}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/** Design waiting for approval: render, version and the two client actions. */
function ApprovalCard({ horizontal = false }: { horizontal?: boolean }) {
  return (
    <div className={cn("p-4 md:p-5", horizontal && "grid gap-4 border-t border-line sm:grid-cols-[200px_1fr] sm:items-center")}>
      <div className="relative aspect-[16/10] overflow-hidden border border-line">
        <Photo src={images.render.src} alt="" sizes="320px" />
        <span className="absolute left-2 top-2 bg-bg/85 px-1.5 py-0.5 text-[10px] font-medium tracking-[0.1em] text-accent">v2</span>
      </div>
      <div className={cn(!horizontal && "mt-4")}>
        <p className="text-[11px] uppercase tracking-[0.14em] text-accent">Ontwerp ter goedkeuring</p>
        <p className="mt-1 text-[15px]">Keukentype B, Blok C</p>
        <p className="flex items-center gap-1.5 text-muted">
          <MessageSquare className="h-3.5 w-3.5" strokeWidth={1.5} />2 opmerkingen verwerkt
        </p>
        <div className="mt-3 flex flex-wrap gap-2 whitespace-nowrap text-[12px]">
          <span className="inline-flex h-8 items-center border border-line-strong px-2.5">Opmerking plaatsen</span>
          <span className="inline-flex h-8 items-center gap-1.5 bg-accent px-2.5 font-medium text-bg">
            <Check className="h-3.5 w-3.5" strokeWidth={2} />
            Akkoord geven
          </span>
        </div>
      </div>
    </div>
  );
}

/** Nine segments, one per phase, filling in sequence. */
function PhaseBar({ completed, delay }: { completed: number; delay: number }) {
  return (
    <span className="flex gap-[3px]">
      {processSteps.map((step, index) => {
        const filled = index < completed;
        const current = index === completed - 1 && completed < processSteps.length;
        return (
          <motion.span
            key={step.id}
            className={cn("h-3 w-2 origin-bottom md:w-2.5", filled ? (current ? "bg-accent" : "bg-ink/45") : "bg-line")}
            initial={filled ? { scaleY: 0 } : false}
            whileInView={{ scaleY: 1 }}
            viewport={viewport}
            transition={{ duration: 0.35, ease: easeOut, delay: delay + index * 0.04 }}
          />
        );
      })}
    </span>
  );
}
