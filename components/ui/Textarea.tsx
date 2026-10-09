import type { ComponentPropsWithRef } from "react";
import { cn } from "@/lib/cn";
import { controlClasses } from "./Input";

export function Textarea({ className, rows = 4, ...props }: ComponentPropsWithRef<"textarea">) {
  return <textarea rows={rows} className={cn(controlClasses, "min-h-28 resize-y py-3 leading-relaxed", className)} {...props} />;
}
