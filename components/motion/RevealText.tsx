"use client";

import { motion } from "motion/react";
import { easeOut } from "@/lib/motion";

type RevealTextProps = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
  /** Animate on mount instead of on scroll into view. */
  immediate?: boolean;
};

/** Each word rises out of a mask, staggered, like type being set. */
export function RevealText({ text, as = "h2", className, delay = 0, immediate }: RevealTextProps) {
  const Tag = motion[as];
  const words = text.split(" ");
  const trigger = immediate ? { animate: "show" } : { whileInView: "show", viewport: { once: true, margin: "0px 0px -10% 0px" } };

  return (
    <Tag className={className} initial="hidden" {...trigger} transition={{ staggerChildren: 0.06, delayChildren: delay }}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-top">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "110%" },
              show: { y: "0%", transition: { duration: 1, ease: easeOut } },
            }}
          >
            {word}
          </motion.span>
          {index < words.length - 1 && " "}
        </span>
      ))}
    </Tag>
  );
}
