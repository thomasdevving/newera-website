"use client";

import { motion } from "motion/react";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";
import { easeOut } from "@/lib/motion";
import { processSteps } from "@/lib/process";

/** Demonstration planning: one project of 20 kitchens across 16 weeks. */
const FIRST_WEEK = 36;
const WEEKS = 16;
const TODAY = 8.35;
const bars: Array<[number, number]> = [
  [0, 1],
  [1, 3],
  [3, 4],
  [4, 5],
  [5, 6.5],
  [6.5, 9.5],
  [9.5, 13],
  [13, 14],
  [14, 16],
];

const pct = (weeks: number) => `${(weeks / WEEKS) * 100}%`;
const BAR_START = 1.1;

/**
 * Full-width phase planning used in the hero. Bars draw in phase by phase,
 * then the "vandaag" line slides into place.
 */
export function PlanningBoard({ className }: { className?: string }) {
  return (
    <figure className={cn("relative", className)} aria-labelledby="planning-caption">
      {/* Caption bar */}
      <figcaption
        id="planning-caption"
        className="flex items-center justify-between gap-4 border-y border-line py-3 text-[13px] text-muted"
      >
        <span className="flex items-center gap-3">
          <span className="label-caps text-[11px] text-accent">Voorbeeldplanning</span>
          <span className="hidden sm:inline">Project van 20 woningen, één keuken per woning</span>
        </span>
        <span className="hidden items-center gap-5 md:flex" aria-hidden>
          <Legend swatch="bg-ink/25" label="Afgerond" />
          <Legend swatch="bg-accent" label="Lopend" />
          <Legend swatch="border border-line-strong" label="Gepland" />
        </span>
      </figcaption>

      <div className="relative">
      <div className="grid grid-cols-[var(--label-w)_1fr]">
        {/* Week header */}
        <div className="h-8 border-b border-line" />
        <div className="relative h-8 border-b border-line" aria-hidden>
          {Array.from({ length: WEEKS }, (_, index) => (
            <motion.span
              key={index}
              className={cn(
                "tabular absolute top-1/2 -translate-y-1/2 pl-1.5 text-[10px] tracking-[0.08em] text-faint md:text-[11px]",
                index % 4 !== 0 && "max-md:hidden",
                index % 2 === 1 && "md:max-lg:hidden",
              )}
              style={{ left: pct(index) }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.03 }}
            >
              {index === 0 ? `wk ${FIRST_WEEK}` : FIRST_WEEK + index}
            </motion.span>
          ))}
        </div>

        {/* Phase rows */}
        {processSteps.map((step, index) => {
          const [start, end] = bars[index];
          const done = end <= TODAY;
          const active = start < TODAY && end > TODAY;
          const progress = active ? (TODAY - start) / (end - start) : 0;
          const delay = BAR_START + index * 0.09;

          return (
            <div key={step.id} className="contents">
              <div
                className={cn(
                  "flex h-7 items-center gap-2 border-b border-line pr-3 text-[12px] md:h-8 md:text-[13px]",
                  active ? "text-accent" : done ? "text-ink/70" : "text-muted",
                )}
              >
                <span className="tabular w-4 text-[10px] text-faint">{index + 1}</span>
                <span className="truncate">{step.title}</span>
                {done && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: easeOut, delay: delay + 0.6 }}
                    className="ml-auto hidden sm:inline-flex"
                  >
                    <Check aria-label="afgerond" className="h-3 w-3 text-ink/50" strokeWidth={2} />
                  </motion.span>
                )}
              </div>
              <div className="relative h-7 border-b border-line md:h-8">
                <motion.div
                  className={cn(
                    "absolute top-1/2 h-2 -translate-y-1/2 origin-left md:h-2.5",
                    done && "bg-ink/25",
                    active && "border border-accent bg-transparent",
                    !done && !active && "border border-line-strong",
                    index === bars.length - 1 && "border-dashed",
                  )}
                  style={{ left: pct(start), width: pct(end - start) }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.9, ease: easeOut, delay }}
                >
                  {active && (
                    <motion.span
                      className="absolute inset-y-0 left-0 origin-left bg-accent"
                      style={{ width: `${progress * 100}%` }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 1.2, ease: easeOut, delay: delay + 0.6 }}
                    />
                  )}
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Today line, spans the week header and all rows */}
      <div className="pointer-events-none absolute inset-y-0 left-[var(--label-w)] right-0" aria-hidden>
        <motion.div
          className="absolute inset-y-0 w-px bg-accent"
          initial={{ left: "0%", opacity: 0 }}
          animate={{ left: pct(TODAY), opacity: 1 }}
          transition={{ duration: 1.6, ease: easeOut, delay: BAR_START + 0.7 }}
        >
          <span className="absolute top-[7px] left-1/2 -translate-x-1/2 bg-accent px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-bg whitespace-nowrap">
            Vandaag
          </span>
        </motion.div>
      </div>
      </div>
      <p className="sr-only">
        Voorbeeld van een projectplanning over zestien weken. De fasen aanvraag tot en met meten zijn afgerond, de
        bestelling loopt, montage, oplevering en service zijn gepland.
      </p>
    </figure>
  );
}

function Legend({ swatch, label }: { swatch: string; label: string }) {
  return (
    <span className="flex items-center gap-2">
      <span className={cn("inline-block h-2 w-4", swatch)} />
      {label}
    </span>
  );
}
