import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { DrawLine } from "@/components/motion/DrawLine";
import { Reveal } from "@/components/motion/Reveal";
import { RevealText } from "@/components/motion/RevealText";

type SectionHeaderProps = {
  /** Short index label shown in the left rail. */
  label: string;
  title: string;
  intro?: ReactNode;
  action?: ReactNode;
  className?: string;
};

/**
 * Two-column section opening: a label rail on the left, heading and intro on
 * the right, separated from the content above by a drawn hairline.
 */
export function SectionHeader({ label, title, intro, action, className }: SectionHeaderProps) {
  return (
    <div className={cn("mb-14 md:mb-20", className)}>
      <DrawLine className="mb-8 md:mb-10" />
      <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-3" y={12}>
          <p className="label-caps flex items-center gap-3 text-accent">
            <span aria-hidden className="inline-block h-px w-6 bg-accent" />
            {label}
          </p>
        </Reveal>
        <div className="lg:col-span-9">
          <RevealText text={title} className="max-w-[20ch] text-[clamp(2rem,4.2vw,3.75rem)] font-light leading-[1.05] tracking-[-0.025em]" />
          {(intro || action) && (
            <Reveal delay={0.15} className="mt-6 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              {intro && <div className="max-w-[60ch] text-lg text-muted">{intro}</div>}
              {action}
            </Reveal>
          )}
        </div>
      </div>
    </div>
  );
}
