"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/cn";
import { easeOut } from "@/lib/motion";

const viewport = { once: true, margin: "0px 0px -10% 0px" } as const;

function Stroke({ d, delay = 0, accent }: { d: string; delay?: number; accent?: boolean }) {
  return (
    <motion.path
      d={d}
      stroke={accent ? "var(--accent)" : "currentColor"}
      strokeWidth={1}
      vectorEffect="non-scaling-stroke"
      fill="none"
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      viewport={viewport}
      transition={{ duration: 1.6, ease: easeOut, delay }}
    />
  );
}

/** Kitchen elevation drawn in thin lines: base units, worktop, wall units, hood. */
export function KitchenElevation({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 360" className={cn("text-ink/40", className)} aria-hidden>
      {/* Floor and worktop */}
      <Stroke d="M20 330 H580" />
      <Stroke d="M40 200 H560 V212 H40 Z" delay={0.1} accent />
      {/* Base units */}
      <Stroke d="M48 212 V320 H552 V212" delay={0.2} />
      <Stroke d="M152 212 V320 M256 212 V320 M360 212 V320 M464 212 V320" delay={0.35} />
      <Stroke d="M60 236 H140 M164 236 H244 M268 236 H348 M372 236 H452 M476 236 H540" delay={0.5} />
      {/* Sink and tap */}
      <Stroke d="M280 200 V196 H340 V200 M326 196 V176 Q326 168 318 168 H306" delay={0.6} />
      {/* Hob */}
      <Stroke d="M392 199 H444" delay={0.65} accent />
      {/* Wall units and hood */}
      <Stroke d="M48 40 H256 V130 H48 Z M152 40 V130" delay={0.4} />
      <Stroke d="M464 40 H552 V130 H464 Z" delay={0.45} />
      <Stroke d="M380 40 H436 V110 L456 136 H360 L380 110 Z" delay={0.55} />
      {/* Dimension line */}
      <Stroke d="M40 350 H560 M40 344 V356 M560 344 V356" delay={0.9} accent />
    </svg>
  );
}

/** Floor plan fragment with an L-shaped kitchen and dimension marks. */
export function FloorPlan({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 420" className={cn("text-ink/40", className)} aria-hidden>
      {/* Walls */}
      <Stroke d="M30 30 H570 V390 H360 M300 390 H30 Z" />
      <Stroke d="M36 36 H564 V384 H360 M300 384 H36 Z" delay={0.1} />
      {/* Door swing */}
      <Stroke d="M300 390 V330 A60 60 0 0 1 360 390" delay={0.4} />
      {/* L-shaped kitchen */}
      <Stroke d="M36 36 H330 V96 H96 V300 H36" delay={0.3} accent />
      <Stroke d="M96 96 V36 M156 96 V36 M216 96 V36 M276 96 V36 M36 160 H96 M36 230 H96" delay={0.6} />
      {/* Island */}
      <Stroke d="M220 190 H420 V250 H220 Z" delay={0.5} />
      {/* Window */}
      <Stroke d="M420 30 V36 M520 30 V36 M420 33 H520" delay={0.7} />
      {/* Dimensions */}
      <Stroke d="M36 14 H330 M36 8 V20 M330 8 V20" delay={0.9} accent />
      <Stroke d="M14 36 V300 M8 36 H20 M8 300 H20" delay={1} accent />
    </svg>
  );
}
