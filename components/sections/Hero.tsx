"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Pause, Play } from "lucide-react";
import { Bars } from "@/components/ui/Bars";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { RevealText } from "@/components/motion/RevealText";
import { cn } from "@/lib/cn";
import { easeOut } from "@/lib/motion";
import { images, siteConfig } from "@/lib/site-config";
import { Arc } from "./Arc";

const INTERVAL = 6500;
const slides = images.hero;

/**
 * Full-height photo hero. Slides cross-fade with a slow zoom; the slide
 * markers are the three bars of the logo's "E".
 */
export function Hero() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const reduceMotion = useReducedMotion();
  const autoplay = playing && !reduceMotion;

  useEffect(() => {
    if (!autoplay) return;
    const timer = window.setTimeout(() => setActive((current) => (current + 1) % slides.length), INTERVAL);
    return () => window.clearTimeout(timer);
  }, [autoplay, active]);

  return (
    <section className="relative flex min-h-svh flex-col overflow-hidden lg:h-svh lg:min-h-[680px]">
      {/* Photographs */}
      <div className="absolute inset-0" aria-hidden>
        <AnimatePresence initial={false}>
          <motion.div
            key={active}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: easeOut }}
          >
            <Photo src={slides[active].src} alt="" priority={active === 0} className="slow-zoom" />
          </motion.div>
        </AnimatePresence>
        {/* Legibility: dark from the left and the bottom, light touch on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-bg/90 via-bg/55 to-transparent max-md:via-bg/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-bg/50" />
      </div>

      <Arc className="-right-[30%] top-[6%] h-[70%] w-[90%] opacity-70 md:-right-[8%] md:w-[55%] lg:opacity-100" delay={0.2} />

      <Container className="relative flex flex-1 flex-col justify-end pb-10 pt-[calc(var(--header-h)+48px)] md:pb-14">
        <motion.p
          className="label-caps mb-6 flex items-center gap-3 text-accent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <span aria-hidden className="inline-block h-px w-8 bg-accent" />
          Keukens voor professionals
        </motion.p>
        <RevealText
          as="h1"
          immediate
          text="Keukenprojecten die op schema blijven."
          className="max-w-[13ch] text-[clamp(2.6rem,6.6vw,5.75rem)] font-light leading-[1.05] tracking-[-0.035em]"
        />
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: easeOut, delay: 0.15 }}>
          <p className="mt-6 max-w-[40ch] text-lg leading-relaxed text-ink/80 md:text-xl">
            Van aanvraag tot oplevering: één partner, één overzicht, voor elk project.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={siteConfig.cta.request.href} size="lg" arrow>
              {siteConfig.cta.request.label}
            </Button>
            <Button href={siteConfig.cta.login.href} variant="secondary" size="lg" className="bg-bg/30 backdrop-blur-sm">
              {siteConfig.cta.login.label}
            </Button>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-7 gap-y-2 text-sm tracking-[0.04em] text-ink/80">
            {["Snel", "Overzichtelijk", "Betrouwbaar"].map((word) => (
              <li key={word} className="flex items-center gap-2.5">
                <Bars className="text-accent" />
                {word}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Slide controls */}
        <div className="mt-10 flex items-center gap-5 border-t border-line pt-5 md:mt-14">
          <span className="tabular w-14 text-xs tracking-[0.18em] text-ink/80" aria-hidden>
            {String(active + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </span>
          <div className="flex gap-2" role="group" aria-label="Beelden">
            {slides.map((slide, index) => (
              <button
                key={slide.src}
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Toon beeld ${index + 1}: ${slide.caption}`}
                aria-current={index === active}
                className="group relative flex h-6 w-8 items-center md:w-12"
              >
                <span className="relative block h-[2px] w-full overflow-hidden bg-ink/25 transition-colors group-hover:bg-ink/50">
                  {index === active && (
                    <motion.span
                      key={`${active}-${autoplay}`}
                      className="absolute inset-0 origin-left bg-accent"
                      initial={{ scaleX: autoplay ? 0 : 1 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: autoplay ? INTERVAL / 1000 : 0, ease: "linear" }}
                    />
                  )}
                </span>
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={active}
              className="hidden text-xs uppercase tracking-[0.18em] text-ink/80 sm:block"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.4, ease: easeOut }}
            >
              {slides[active].caption}
            </motion.span>
          </AnimatePresence>
          <button
            type="button"
            onClick={() => setPlaying((value) => !value)}
            aria-label={playing ? "Diavoorstelling pauzeren" : "Diavoorstelling afspelen"}
            className={cn(
              "ml-auto inline-flex h-9 w-9 items-center justify-center border border-line-strong text-ink/80 transition-colors hover:border-accent hover:text-accent",
              reduceMotion && "hidden",
            )}
          >
            {playing ? <Pause aria-hidden className="h-3.5 w-3.5" strokeWidth={1.5} /> : <Play aria-hidden className="h-3.5 w-3.5" strokeWidth={1.5} />}
          </button>
        </div>
        <p className="sr-only">Sfeerbeelden van keukens. Beeld {active + 1} van {slides.length}: {slides[active].caption}.</p>
      </Container>
    </section>
  );
}
