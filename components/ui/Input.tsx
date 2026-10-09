import type { ComponentPropsWithRef } from "react";
import { cn } from "@/lib/cn";

export const controlClasses = cn(
  "w-full border border-line-strong bg-elevated px-4 text-[16px] text-ink",
  "transition-[border-color,background-color] duration-300 ease-out-expo",
  "hover:border-ink/40 focus:border-accent focus:bg-elevated-2 focus:outline-none focus-visible:outline-none",
  "aria-[invalid=true]:border-error",
  "disabled:cursor-not-allowed disabled:opacity-50",
);

export function Input({ className, ...props }: ComponentPropsWithRef<"input">) {
  return <input className={cn(controlClasses, "h-12", className)} {...props} />;
}
