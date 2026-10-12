import { DrawLine } from "@/components/motion/DrawLine";
import { Reveal } from "@/components/motion/Reveal";
import { processSteps } from "@/lib/process";

/**
 * The nine phases: a horizontal stepper from xl, a compact vertical list below.
 */
export function ProcessStepper() {
  return (
    <>
      {/* Desktop: horizontal */}
      <ol className="relative hidden grid-cols-9 gap-5 xl:grid">
        <DrawLine className="absolute left-0 right-0 top-[5px] bg-line-strong" />
        {processSteps.map(({ id, title, summary, icon: Icon }, index) => (
          <Reveal as="li" key={id} delay={index * 0.05} y={10} className="relative pt-0">
            <span aria-hidden className="relative block h-[11px] w-[11px] border border-accent bg-bg" />
            <p className="tabular mt-5 text-xs tracking-[0.18em] text-accent">{String(index + 1).padStart(2, "0")}</p>
            <h3 className="mt-2 flex items-center gap-2 text-lg">
              <Icon aria-hidden className="h-4 w-4 shrink-0 text-muted" strokeWidth={1.5} />
              {title}
            </h3>
            <p className="mt-2 text-sm leading-snug text-muted">{summary}</p>
          </Reveal>
        ))}
      </ol>

      {/* Mobile and tablet: vertical */}
      <ol className="relative xl:hidden">
        <span aria-hidden className="absolute bottom-3 left-[5px] top-3 w-px bg-line-strong" />
        {processSteps.map(({ id, title, summary }, index) => (
          <Reveal as="li" key={id} y={8} className="relative grid grid-cols-[11px_1fr] gap-5 py-3.5">
            <span aria-hidden className="relative mt-[7px] block h-[11px] w-[11px] border border-accent bg-bg" />
            <div className="md:grid md:grid-cols-[220px_1fr] md:gap-6">
              <h3 className="flex items-baseline gap-3 text-lg">
                <span className="tabular text-xs tracking-[0.18em] text-accent">{String(index + 1).padStart(2, "0")}</span>
                {title}
              </h3>
              <p className="mt-1 text-[15px] leading-snug text-muted md:mt-0.5">{summary}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </>
  );
}
