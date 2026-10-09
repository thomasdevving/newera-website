import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import { RevealText } from "@/components/motion/RevealText";
import { siteConfig } from "@/lib/site-config";
import { Arc } from "./Arc";
import { PlanningBoard } from "./PlanningBoard";

/**
 * Home hero. The headline sits on the planning's week columns, which run the
 * full height of the hero; the planning itself forms the lower band.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden pt-[var(--header-h)]">
      <Arc className="-right-[45%] top-0 h-[380px] w-[110%] opacity-50 md:-right-[20%] md:h-[520px] md:w-[80%] lg:-right-[4%] lg:top-[2%] lg:h-[62%] lg:w-[50%] lg:opacity-100" delay={0.2} />

      <Container className="relative [--label-w:6.75rem] md:[--label-w:9.5rem]">
        {/* Week columns aligned with the planning below */}
        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-[calc(var(--label-w)+1rem)] right-4 sm:left-[calc(var(--label-w)+1.5rem)] sm:right-6 md:left-[calc(var(--label-w)+2.5rem)] md:right-10 xl:left-[calc(var(--label-w)+3.5rem)] xl:right-14">
          <FadeIn delay={0.1} y={0} className="week-grid h-full w-full opacity-70 [--cols:16] [mask-image:linear-gradient(to_bottom,transparent,black_18%,black)]">
            {null}
          </FadeIn>
        </div>

        <div className="relative pb-12 pt-12 md:pt-16 lg:pb-14 xl:pt-16">
          <FadeIn delay={0.05} y={10}>
            <p className="label-caps mb-7 flex items-center gap-3 text-accent">
              <span aria-hidden className="inline-block h-px w-8 bg-accent" />
              Keukens voor professionals
            </p>
          </FadeIn>
          <RevealText
            as="h1"
            immediate
            delay={0.15}
            text="Keukenprojecten die op schema blijven."
            className="max-w-[13ch] text-[clamp(2.6rem,7.4vw,6rem)] font-light leading-[1.1] tracking-[-0.035em]"
          />
          <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:gap-14">
            <FadeIn delay={0.55}>
              <p className="max-w-[52ch] text-[17px] leading-relaxed text-muted">
                Studio NewEra verzorgt keukens voor aannemers, ontwikkelaars en woningbouwers: van aanvraag en
                uitwerking tot montage en service, met één duidelijk aanspreekpunt en overzicht in elke fase.
              </p>
            </FadeIn>
            <FadeIn delay={0.7} className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <Button href={siteConfig.cta.request.href} size="lg" arrow>
                {siteConfig.cta.request.label}
              </Button>
              <Button href="/#werkwijze" variant="secondary" size="lg">
                Bekijk hoe het werkt
              </Button>
            </FadeIn>
          </div>
        </div>

        <PlanningBoard className="relative pb-16 md:pb-24" />
      </Container>
    </section>
  );
}
