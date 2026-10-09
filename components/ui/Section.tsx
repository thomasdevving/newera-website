import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./Container";

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  /** Draws a 1px rule along the top edge. */
  ruled?: boolean;
  /** Tighter vertical padding for secondary bands. */
  compact?: boolean;
  containerClassName?: string;
};

export function Section({ ruled, compact, className, containerClassName, children, ...props }: SectionProps) {
  return (
    <section
      className={cn(
        "relative",
        compact ? "py-16 md:py-20" : "py-24 md:py-32 xl:py-[140px]",
        ruled && "border-t border-line",
        className,
      )}
      {...props}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
