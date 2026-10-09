"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/cn";
import { easeOut } from "@/lib/motion";

export type FaqItem = { question: string; answer: string };

/** Accordion; one item open at a time. */
export function Faq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <ul className="border-t border-line">
      {items.map((item, index) => {
        const expanded = open === index;
        const buttonId = `${baseId}-q${index}`;
        const panelId = `${baseId}-a${index}`;
        return (
          <li key={item.question} className="border-b border-line">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpen(expanded ? null : index)}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left text-lg text-ink transition-colors hover:text-accent md:py-7 md:text-xl"
              >
                <span>{item.question}</span>
                <span
                  className={cn(
                    "inline-flex h-9 w-9 shrink-0 items-center justify-center border transition-[border-color,background-color,color,transform] duration-500 ease-out-expo",
                    expanded ? "rotate-45 border-accent bg-accent text-bg" : "border-line-strong text-ink group-hover:border-accent",
                  )}
                >
                  <Plus aria-hidden className="h-4 w-4" strokeWidth={1.5} />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: easeOut }}
                  className="overflow-hidden"
                >
                  <p className="max-w-[64ch] pb-7 pr-14 text-muted">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
