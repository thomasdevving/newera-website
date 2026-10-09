"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { easeOut } from "@/lib/motion";

type RevealTextProps = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
  /** Animate on mount instead of on scroll into view. */
  immediate?: boolean;
};

/** Resolves once the web fonts are loaded, so text never reflows mid-animation. */
function useFontsReady() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let active = true;
    // Fall back after a short wait so a slow font never hides the heading
    const timer = window.setTimeout(() => active && setReady(true), 1500);
    (document.fonts?.ready ?? Promise.resolve()).then(() => active && setReady(true));
    return () => {
      active = false;
      window.clearTimeout(timer);
    };
  }, []);
  return ready;
}

/**
 * Heading that wipes up into view as one block of normal running text.
 * It waits for the font, so the line breaks are final before it appears.
 */
export function RevealText({ text, as = "h2", className, delay = 0, immediate }: RevealTextProps) {
  const Tag = motion[as];
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const fontsReady = useFontsReady();
  const show = fontsReady && (immediate || inView);

  return (
    <Tag
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 24, clipPath: "inset(0% 0% 100% 0%)" }}
      animate={show ? { opacity: 1, y: 0, clipPath: "inset(-20% -5% -20% -5%)" } : undefined}
      transition={{ duration: 1, ease: easeOut, delay }}
    >
      {text}
    </Tag>
  );
}
