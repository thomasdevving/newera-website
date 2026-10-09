import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "neutral" | "accent" | "success" | "muted";

const tones: Record<Tone, string> = {
  neutral: "border-line-strong text-ink",
  accent: "border-accent/60 bg-accent-soft text-accent",
  success: "border-success/50 text-success",
  muted: "border-line text-muted",
};

/** Square status label. */
export function Badge({ tone = "neutral", className, children }: { tone?: Tone; className?: string; children: ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center gap-1.5 border px-2 text-[11px] font-medium uppercase tracking-[0.12em] whitespace-nowrap",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
