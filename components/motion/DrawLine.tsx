"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/cn";
import { easeOut } from "@/lib/motion";

/** A 1px rule that draws itself from left to right when scrolled into view. */
export function DrawLine({ className, delay = 0, accent }: { className?: string; delay?: number; accent?: boolean }) {
  return (
    <motion.span
      aria-hidden
      className={cn("block h-px w-full origin-left", accent ? "bg-accent" : "bg-line", className)}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "0px 0px -5% 0px" }}
      transition={{ duration: 1.4, ease: easeOut, delay }}
    />
  );
}
