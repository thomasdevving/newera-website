"use client";

import { motion } from "motion/react";
import { useId } from "react";
import { cn } from "@/lib/cn";
import { easeOut } from "@/lib/motion";

/**
 * The logo's sunrise arc: a thin gold curve that draws itself in, with a
 * restrained glow at its brightest point.
 */
export function Arc({ className, delay = 0.3, inView = false }: { className?: string; delay?: number; inView?: boolean }) {
  const id = useId().replace(/:/g, "");
  const draw = { pathLength: 1, opacity: 1 };
  const trigger = inView
    ? { whileInView: draw, viewport: { once: true, margin: "0px 0px -10% 0px" } }
    : { animate: draw };

  return (
    <div aria-hidden className={cn("pointer-events-none absolute", className)}>
      <svg viewBox="0 0 1000 1000" fill="none" className="h-full w-full overflow-visible">
        <defs>
          <linearGradient id={`${id}-stroke`} x1="300" y1="80" x2="1000" y2="900" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#C9A66B" stopOpacity="0" />
            <stop offset="0.12" stopColor="#F3D9A8" stopOpacity="1" />
            <stop offset="0.45" stopColor="#C9A66B" stopOpacity="0.75" />
            <stop offset="1" stopColor="#C9A66B" stopOpacity="0.05" />
          </linearGradient>
          <radialGradient id={`${id}-glint`} cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#F6DDB0" stopOpacity="0.9" />
            <stop offset="0.2" stopColor="#C9A66B" stopOpacity="0.3" />
            <stop offset="1" stopColor="#C9A66B" stopOpacity="0" />
          </radialGradient>
          <filter id={`${id}-blur`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>

        {/* Glow under the line */}
        <motion.path
          d="M 300 90 A 820 820 0 0 1 1000 900"
          stroke={`url(#${id}-stroke)`}
          strokeWidth="6"
          filter={`url(#${id}-blur)`}
          opacity={0.5}
          initial={{ pathLength: 0, opacity: 0 }}
          {...trigger}
          transition={{ duration: 2.4, ease: easeOut, delay }}
        />
        <motion.path
          d="M 300 90 A 820 820 0 0 1 1000 900"
          stroke={`url(#${id}-stroke)`}
          strokeWidth="1.25"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0, opacity: 0 }}
          {...trigger}
          transition={{ duration: 2.4, ease: easeOut, delay }}
        />
        {/* Sunrise glint near the start of the arc */}
        <motion.circle
          cx="420"
          cy="118"
          r="46"
          fill={`url(#${id}-glint)`}
          initial={{ opacity: 0, scale: 0.4 }}
          {...(inView
            ? { whileInView: { opacity: 1, scale: 1 }, viewport: { once: true } }
            : { animate: { opacity: 1, scale: 1 } })}
          transition={{ duration: 1.6, ease: easeOut, delay: delay + 0.5 }}
          style={{ transformOrigin: "420px 118px" }}
        />
      </svg>
    </div>
  );
}
