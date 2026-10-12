import { cn } from "@/lib/cn";

/**
 * The three horizontal bars of the "E" in the NewEra wordmark, used as a
 * small brand glyph for bullets and markers.
 */
export function Bars({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("inline-flex w-3 shrink-0 flex-col gap-[2px]", className)}>
      <span className="h-[2px] w-full bg-current" />
      <span className="h-[2px] w-[80%] bg-current" />
      <span className="h-[2px] w-full bg-current" />
    </span>
  );
}
