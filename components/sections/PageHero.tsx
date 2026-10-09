import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import { RevealText } from "@/components/motion/RevealText";
import { Arc } from "./Arc";

type PageHeroProps = {
  label: string;
  title: string;
  intro?: ReactNode;
  children?: ReactNode;
  /** Show the logo arc in the background. */
  arc?: boolean;
};

/** Opening band for inner pages: label rail, large light H1, intro. */
export function PageHero({ label, title, intro, children, arc = true }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-line pt-[var(--header-h)]">
      {arc && <Arc className="-right-[30%] -top-[30%] h-[160%] w-[90%] min-w-[600px] opacity-80 md:-right-[8%] md:w-[60%]" delay={0.2} />}
      <div aria-hidden className="week-grid pointer-events-none absolute inset-0 opacity-50 [--cols:12] [mask-image:linear-gradient(to_bottom,transparent,black_40%,transparent)]" />
      <Container className="relative grid gap-8 pb-16 pt-16 md:pb-24 md:pt-24 lg:grid-cols-12 lg:gap-10 xl:pt-28">
        <FadeIn className="lg:col-span-3 lg:pt-4" y={10}>
          <p className="label-caps flex items-center gap-3 text-accent">
            <span aria-hidden className="inline-block h-px w-6 bg-accent" />
            {label}
          </p>
        </FadeIn>
        <div className="lg:col-span-9">
          <RevealText
            as="h1"
            immediate
            delay={0.1}
            text={title}
            className="max-w-[18ch] text-[clamp(2.5rem,6vw,5.25rem)] font-light leading-[1] tracking-[-0.035em]"
          />
          {intro && (
            <FadeIn delay={0.45}>
              <div className="mt-8 max-w-[58ch] text-lg leading-relaxed text-muted md:text-xl">{intro}</div>
            </FadeIn>
          )}
          {children && <FadeIn delay={0.6}>{children}</FadeIn>}
        </div>
      </Container>
    </section>
  );
}
