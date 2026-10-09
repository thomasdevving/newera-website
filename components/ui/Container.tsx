import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

/** Horizontal page frame shared by every section. */
export function Container({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return <div className={cn("mx-auto w-full max-w-[1360px] px-4 sm:px-6 md:px-10 xl:px-14", className)} {...props} />;
}
