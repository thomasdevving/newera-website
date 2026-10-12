import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { RevealText } from "@/components/motion/RevealText";
import type { ImageSlot } from "@/lib/site-config";
import { Arc } from "./Arc";

type PageHeroProps = {
  label: string;
  title: string;
  intro?: ReactNode;
  children?: ReactNode;
  /** Darkened background photograph; without it the logo arc is shown. */
  image?: ImageSlot;
};

/** Compact opening band for inner pages. */
export function PageHero({ label, title, intro, children, image }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      {image ? (
        <div aria-hidden className="absolute inset-0">
          <Photo src={image.src} alt="" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/85 to-bg/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-bg/70" />
        </div>
      ) : (
        <Arc className="-right-[35%] -top-[40%] h-[170%] w-[90%] min-w-[600px] opacity-70 md:-right-[6%] md:w-[50%]" delay={0.1} />
      )}
      <Container className="relative pb-12 pt-[calc(var(--header-h)+48px)] md:pb-16 md:pt-[calc(var(--header-h)+72px)]">
        <p className="label-caps flex items-center gap-3 text-accent">
          <span aria-hidden className="inline-block h-px w-6 bg-accent" />
          {label}
        </p>
        <RevealText
          as="h1"
          immediate
          text={title}
          className="mt-5 max-w-[20ch] text-[clamp(2.25rem,5vw,4.25rem)] font-light leading-[1.08] tracking-[-0.03em]"
        />
        {intro && <div className="mt-5 max-w-[56ch] text-lg leading-relaxed text-ink/80">{intro}</div>}
        {children}
      </Container>
    </section>
  );
}
