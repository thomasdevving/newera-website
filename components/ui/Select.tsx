import type { ComponentPropsWithRef } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import { controlClasses } from "./Input";

export function Select({ className, children, ...props }: ComponentPropsWithRef<"select">) {
  return (
    <div className="relative">
      <select className={cn(controlClasses, "h-12 cursor-pointer appearance-none pr-12", className)} {...props}>
        {children}
      </select>
      <ChevronDown aria-hidden className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-accent" strokeWidth={1.5} />
    </div>
  );
}
