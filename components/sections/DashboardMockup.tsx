"use client";

import { motion } from "motion/react";
import { Bell, CalendarClock, Check, FileText, Paperclip, Search, type LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";
import { easeOut } from "@/lib/motion";
import { processSteps } from "@/lib/process";

/** Portal statuses mapped to how many of the nine phases are complete. */
const statuses = {
  "Aanvraag ontvangen": 1,
  "In uitwerking": 2,
  "Offerte verstuurd": 3,
  Akkoord: 4,
  "Ingepland voor meten": 5,
  Besteld: 6,
  "Montage gepland": 7,
  Opgeleverd: 9,
} as const;

type Status = keyof typeof statuses;

// Demonstration data only, shown as "Voorbeeldweergave"
const projects: Array<{ name: string; kitchens: number; week: string; status: Status; alert?: boolean }> = [
  { name: "Blok C, appartementen", kitchens: 18, week: "wk 47", status: "Ingepland voor meten", alert: true },
  { name: "Rijwoningen fase 2", kitchens: 12, week: "wk 3", status: "Offerte verstuurd" },
  { name: "Transformatie kantoorpand", kitchens: 26, week: "wk 50", status: "Besteld" },
  { name: "Seniorenwoningen Oost", kitchens: 14, week: "wk 44", status: "Montage gepland" },
  { name: "Herstructurering Zuid", kitchens: 32, week: "wk 12", status: "In uitwerking" },
  { name: "Appartementen Haven", kitchens: 16, week: "wk 2", status: "Akkoord" },
  { name: "Nieuwbouw Plein", kitchens: 20, week: "wk 9", status: "Aanvraag ontvangen" },
  { name: "Twee-onder-een-kap", kitchens: 8, week: "wk 41", status: "Opgeleverd" },
];

const notifications: Array<{ icon: LucideIcon; title: string; project: string; when: string; accent?: boolean }> = [
  { icon: CalendarClock, title: "Meten inplannen vóór week 41", project: "Blok C, appartementen", when: "Vandaag", accent: true },
  { icon: FileText, title: "Offerte klaar voor beoordeling", project: "Rijwoningen fase 2", when: "Gisteren" },
  { icon: Paperclip, title: "Plattegrond type B ontbreekt", project: "Nieuwbouw Plein", when: "2 dagen" },
  { icon: Check, title: "Orderbevestiging gecontroleerd", project: "Transformatie kantoorpand", when: "3 dagen" },
];

function badgeTone(status: Status) {
  if (status === "Opgeleverd") return "success" as const;
  if (status === "Aanvraag ontvangen" || status === "In uitwerking") return "muted" as const;
  return "neutral" as const;
}

const viewport = { once: true, margin: "0px 0px -10% 0px" } as const;

/**
 * Static preview of the future customer portal. No real data; every value is
 * illustrative and the frame is labelled "Voorbeeldweergave".
 */
export function DashboardMockup({ compact = false, className }: { compact?: boolean; className?: string }) {
  const rows = compact ? projects.slice(0, 4) : projects;
  const alerts = compact ? notifications.slice(0, 3) : notifications;

  return (
    <motion.div
      className={cn("relative border border-line-strong bg-elevated text-[13px]", className)}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 1, ease: easeOut }}
      role="img"
      aria-label="Voorbeeldweergave van de klantportal met een projectoverzicht, de status per project en meldingen"
    >
      {/* Window bar */}
      <div aria-hidden className="flex h-11 items-center justify-between gap-4 border-b border-line px-4">
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

      <div aria-hidden className={cn("grid", !compact && "xl:grid-cols-[1fr_300px]")}>
        {/* Projects */}
        <div className="min-w-0">
          <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-4 md:px-5">
            <div>
              <p className="text-base text-ink">Lopende projecten</p>
              <p className="tabular text-muted">{rows.length} projecten, {rows.reduce((sum, row) => sum + row.kitchens, 0)} keukens</p>
            </div>
            <span className="hidden h-8 items-center gap-2 border border-line px-3 text-muted sm:flex">
              <Search className="h-3.5 w-3.5" strokeWidth={1.5} />
              Zoek project
            </span>
          </div>

          <ul>
            {rows.map((project, index) => {
              const completed = statuses[project.status];
              return (
                <motion.li
                  key={project.name}
                  className={cn("relative grid gap-3 border-b border-line px-4 py-3.5 md:px-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-x-6", project.alert && "bg-accent-soft/40")}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={viewport}
                  transition={{ duration: 0.7, ease: easeOut, delay: 0.3 + index * 0.07 }}
                >
                  {project.alert && <span className="absolute inset-y-0 left-0 w-px bg-accent" />}
                  <div className="min-w-0">
                    <p className="truncate text-ink">{project.name}</p>
                    <p className="tabular text-muted">
                      {project.kitchens} keukens, levering {project.week}
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-4 sm:justify-end">
                    <PhaseBar completed={completed} delay={0.6 + index * 0.07} />
                    <Badge tone={badgeTone(project.status)} className="w-[176px] justify-center px-2 text-[10px] tracking-[0.08em]">
                      {project.status}
                    </Badge>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </div>

        {/* Notifications */}
        <div className={cn("border-line", compact ? "border-t-0" : "xl:border-l")}>
          <div className="flex items-center justify-between border-b border-line px-4 py-4 md:px-5">
            <p className="flex items-center gap-2 text-base text-ink">
              <Bell className="h-4 w-4 text-accent" strokeWidth={1.5} />
              Meldingen
            </p>
            <motion.span
              className="tabular inline-flex h-5 min-w-5 items-center justify-center bg-accent px-1 text-[11px] font-medium text-bg"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={viewport}
              transition={{ duration: 0.5, ease: easeOut, delay: 1.3 }}
            >
              {alerts.length}
            </motion.span>
          </div>
          <ul>
            {alerts.map(({ icon: Icon, title, project, when, accent }, index) => (
              <motion.li
                key={title}
                className="flex gap-3 border-b border-line px-4 py-3.5 last:border-b-0 md:px-5"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewport}
                transition={{ duration: 0.7, ease: easeOut, delay: 0.9 + index * 0.12 }}
              >
                <span className={cn("mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center border", accent ? "border-accent text-accent" : "border-line-strong text-muted")}>
                  <Icon className="h-3.5 w-3.5" strokeWidth={1.5} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-ink">{title}</span>
                  <span className="block truncate text-muted">{project}</span>
                </span>
                <span className="shrink-0 text-[11px] text-faint">{when}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

/** Nine segments, one per phase, filling in sequence. */
function PhaseBar({ completed, delay }: { completed: number; delay: number }) {
  return (
    <span className="flex gap-[3px]" title={`${completed} van ${processSteps.length} fasen`}>
      {processSteps.map((step, index) => {
        const filled = index < completed;
        const current = index === completed - 1 && completed < processSteps.length;
        return (
          <motion.span
            key={step.id}
            className={cn("h-3 w-2.5 origin-bottom md:w-3", filled ? (current ? "bg-accent" : "bg-ink/45") : "bg-line")}
            initial={filled ? { scaleY: 0 } : false}
            whileInView={{ scaleY: 1 }}
            viewport={viewport}
            transition={{ duration: 0.4, ease: easeOut, delay: delay + index * 0.05 }}
          />
        );
      })}
    </span>
  );
}
