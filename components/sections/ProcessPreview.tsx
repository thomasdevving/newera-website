"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";
import { easeOut } from "@/lib/motion";
import { processSteps } from "@/lib/process";

const INTERVAL = 3600;

/**
 * Compact phase tracker. Advances through the nine phases on its own while in
 * view; any click or key press hands control to the visitor.
 */
export function ProcessPreview() {
  const [active, setActive] = useState(0);
  const [manual, setManual] = useState(false);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const inView = useInView(ref, { margin: "-20% 0px -20% 0px" });
  const reduceMotion = useReducedMotion();
  const autoplay = inView && !manual && !paused && !reduceMotion;

  useEffect(() => {
    if (!autoplay) return;
    const timer = window.setTimeout(() => setActive((current) => (current + 1) % processSteps.length), INTERVAL);
    return () => window.clearTimeout(timer);
  }, [autoplay, active]);

  const select = (index: number, focus = false) => {
    setManual(true);
    setActive(index);
    if (focus) tabRefs.current[index]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const last = processSteps.length - 1;
    const keys: Record<string, number> = {
      ArrowRight: active === last ? 0 : active + 1,
      ArrowLeft: active === 0 ? last : active - 1,
      Home: 0,
      End: last,
    };
    if (event.key in keys) {
      event.preventDefault();
      select(keys[event.key], true);
    }
  };

  const step = processSteps[active];
  const Icon = step.icon;

  return (
    <div ref={ref} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {/* Rail */}
      <div className="relative">
        <div aria-hidden className="absolute left-0 right-0 top-[33px] h-px bg-line-strong" />
        <motion.div
          aria-hidden
          className="absolute left-0 top-[33px] h-px origin-left bg-accent"
          style={{ width: "100%" }}
          animate={{ scaleX: active / (processSteps.length - 1) }}
          transition={{ duration: 0.8, ease: easeOut }}
        />
        <div role="tablist" aria-label="Fasen van een project" className="relative grid grid-cols-9" onKeyDown={onKeyDown}>
          {processSteps.map((item, index) => {
            const selected = index === active;
            const passed = index < active;
            return (
              <button
                key={item.id}
                ref={(element) => {
                  tabRefs.current[index] = element;
                }}
                role="tab"
                id={`phase-tab-${item.id}`}
                aria-selected={selected}
                aria-controls="phase-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => select(index)}
                className="group flex flex-col items-start gap-3 pb-2 text-left focus-visible:outline-offset-4"
              >
                <span
                  className={cn(
                    "tabular text-xs tracking-[0.18em] transition-colors duration-300",
                    selected ? "text-accent" : "text-faint group-hover:text-ink",
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="relative flex h-[11px] w-[11px] items-center justify-center">
                  <span
                    className={cn(
                      "h-[11px] w-[11px] border transition-[background-color,border-color,transform] duration-500 ease-out-expo",
                      selected && "scale-125 border-accent bg-accent",
                      passed && "border-accent bg-bg",
                      !selected && !passed && "border-line-strong bg-bg group-hover:border-ink",
                    )}
                  />
                  {selected && autoplay && (
                    <motion.span
                      key={`ring-${active}`}
                      aria-hidden
                      className="absolute h-[11px] w-[11px] border border-accent"
                      initial={{ scale: 1, opacity: 0.8 }}
                      animate={{ scale: 2.6, opacity: 0 }}
                      transition={{ duration: 1.4, ease: easeOut, repeat: Infinity }}
                    />
                  )}
                </span>
                <span
                  className={cn(
                    "hidden pr-2 text-[13px] leading-snug transition-colors duration-300 lg:block",
                    selected ? "text-ink" : "text-muted group-hover:text-ink",
                  )}
                >
                  {item.title}
                </span>
                <span className="sr-only lg:hidden">{item.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Detail */}
      <div
        id="phase-panel"
        role="tabpanel"
        aria-labelledby={`phase-tab-${step.id}`}
        className="relative mt-12 grid min-h-[300px] border-t border-line pt-10 md:mt-16 md:min-h-[240px] lg:grid-cols-12 lg:gap-10"
      >
        {autoplay && (
          <motion.span
            key={`timer-${active}`}
            aria-hidden
            className="absolute left-0 top-[-1px] h-px w-full origin-left bg-accent/60"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: INTERVAL / 1000, ease: "linear" }}
          />
        )}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step.id}
            className="grid lg:col-span-12 lg:grid-cols-12 lg:gap-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              className="lg:col-span-5"
              initial={{ y: 18 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.6, ease: easeOut }}
            >
              <p className="tabular text-sm text-muted">
                Fase {active + 1} van {processSteps.length}
              </p>
              <h3 className="mt-3 flex items-center gap-4 text-[clamp(2rem,4vw,3.25rem)] font-light leading-none tracking-[-0.03em]">
                <Icon aria-hidden className="h-7 w-7 shrink-0 text-accent md:h-8 md:w-8" strokeWidth={1.25} />
                {step.title}
              </h3>
            </motion.div>
            <motion.div
              className="mt-6 lg:col-span-6 lg:col-start-7 lg:mt-0"
              initial={{ y: 18 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.6, ease: easeOut, delay: 0.05 }}
            >
              <p className="text-xl leading-snug text-ink">{step.summary}</p>
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
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
