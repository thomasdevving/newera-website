"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { duration, easeOut } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  /** Vertical travel in px. */
  y?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article" | "p" | "span";
};

/** Fades and lifts content into place the first time it enters the viewport. */
export function Reveal({ children, delay = 0, y = 28, className, as = "div" }: RevealProps) {
  const Component = motion[as];
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: duration.base + 0.2, ease: easeOut, delay }}
    >
      {children}
    </Component>
  );
}
