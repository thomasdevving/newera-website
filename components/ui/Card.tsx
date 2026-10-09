import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

/** Flat elevated panel with a hairline border. */
export function Card({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return <div className={cn("border border-line bg-elevated", className)} {...props} />;
}
