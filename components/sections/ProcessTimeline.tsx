"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useSpring } from "motion/react";
import { cn } from "@/lib/cn";
import { easeOut } from "@/lib/motion";
import { processSteps, type ProcessStep } from "@/lib/process";

/**
 * Full process timeline. A gold spine fills as the visitor scrolls and each
 * phase lights up once it is passed. Alternates sides from md upwards.
 */
export function ProcessTimeline() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 60%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <ol ref={ref} className="relative">
      {/* Spine */}
      <span aria-hidden className="absolute bottom-0 left-[5px] top-0 w-px bg-line-strong md:left-1/2" />
      <motion.span
        aria-hidden
        className="absolute bottom-0 left-[5px] top-0 w-px origin-top bg-accent md:left-1/2"
        style={{ scaleY: fill }}
      />
      {processSteps.map((step, index) => (
        <TimelineStep key={step.id} step={step} index={index} />
      ))}
    </ol>
  );
}

function TimelineStep({ step, index }: { step: ProcessStep; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const passed = useInView(ref, { margin: "0px 0px -40% 0px" });
  const left = index % 2 === 0;
  const Icon = step.icon;
  const number = String(index + 1).padStart(2, "0");

  return (
    <li ref={ref} className="relative grid pb-16 pl-10 last:pb-0 md:grid-cols-2 md:gap-x-24 md:pb-24 md:pl-0">
      {/* Node */}
      <span
        aria-hidden
        className={cn(
          "absolute left-0 top-2 h-[11px] w-[11px] border transition-[background-color,border-color,transform] duration-700 ease-out-expo md:left-1/2 md:-translate-x-[5px]",
          passed ? "scale-125 border-accent bg-accent" : "border-line-strong bg-bg",
        )}
      />

      {/* Large phase number on the opposite side */}
      <motion.span
        aria-hidden
        className={cn(
          "tabular hidden select-none text-[clamp(5rem,9vw,8.5rem)] font-light leading-[0.8] tracking-[-0.05em] transition-colors duration-700 md:block",
          passed ? "text-accent/80" : "text-ink/[0.07]",
          left ? "md:order-2" : "md:order-1 md:text-right",
        )}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -15% 0px" }}
        transition={{ duration: 1, ease: easeOut }}
      >
        {number}
      </motion.span>

      <motion.div
        className={cn(left ? "md:order-1" : "md:order-2")}
        initial={{ opacity: 0, x: left ? -24 : 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "0px 0px -15% 0px" }}
        transition={{ duration: 0.9, ease: easeOut }}
      >
        <p className="tabular text-sm text-muted md:hidden">
          Fase {index + 1} van {processSteps.length}
        </p>
        <h2 className="mt-3 flex md:mt-0 items-center gap-4 text-[clamp(1.75rem,3vw,2.5rem)] font-light leading-tight tracking-[-0.02em]">
          <span className={cn("inline-flex h-11 w-11 shrink-0 items-center justify-center border transition-colors duration-700", passed ? "border-accent text-accent" : "border-line-strong text-muted")}>
            <Icon aria-hidden className="h-5 w-5" strokeWidth={1.5} />
          </span>
          {step.title}
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-muted">{step.description}</p>
        <dl className="mt-6 grid gap-4 text-[15px] sm:grid-cols-2">
          <div className="border-t border-line pt-3">
            <dt className="text-muted">Wat wij van u nodig hebben</dt>
            <dd className="mt-1 text-ink">{step.weReceive}</dd>
          </div>
          <div className="border-t border-line pt-3">
            <dt className="text-muted">Wat u van ons ontvangt</dt>
            <dd className="mt-1 text-ink">{step.youReceive}</dd>
          </div>
        </dl>
      </motion.div>
    </li>
  );
}
