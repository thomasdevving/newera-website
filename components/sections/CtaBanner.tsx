import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { RevealText } from "@/components/motion/RevealText";
import { siteConfig } from "@/lib/site-config";
import { Arc } from "./Arc";

type CtaBannerProps = {
  title?: string;
  text?: string;
};

/** Closing call to action with the logo arc rising behind it. */
export function CtaBanner({
  title = "Een project in voorbereiding?",
  text = "Dien uw aanvraag in met plattegronden en aantallen. Wij nemen contact op en vertellen welke informatie we nog nodig hebben.",
}: CtaBannerProps) {
  return (
    <section className="relative overflow-hidden border-t border-line">
      <Arc inView className="-bottom-[60%] -right-[10%] h-[180%] w-[110%] min-w-[700px] opacity-40 md:w-[75%] lg:opacity-100" delay={0.1} />
      <Container className="relative grid gap-10 py-24 md:py-32 lg:grid-cols-12 lg:items-end xl:py-[140px]">
        <div className="lg:col-span-8">
          <RevealText text={title} className="max-w-[16ch] text-[clamp(2.4rem,6vw,5rem)] font-light leading-[1] tracking-[-0.03em]" />
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-[52ch] text-lg text-muted">{text}</p>
          </Reveal>
        </div>
        <Reveal delay={0.3} className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:justify-end">
          <Button href={siteConfig.cta.request.href} size="lg" arrow>
            {siteConfig.cta.request.label}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
