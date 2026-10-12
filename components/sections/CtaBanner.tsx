import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/motion/Reveal";
import { images, siteConfig } from "@/lib/site-config";

/** Closing strip: one line and one button, over a darkened material photo. */
export function CtaBanner({ title = "Een project in voorbereiding?" }: { title?: string }) {
  return (
    <section className="relative overflow-hidden border-t border-line">
      <div aria-hidden className="absolute inset-0">
        <Photo src={images.materials.src} alt="" sizes="100vw" className="opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/85 to-bg/40" />
      </div>
      <Container className="relative flex flex-col gap-6 py-12 md:flex-row md:items-center md:justify-between md:py-16">
        <Reveal>
          <h2 className="text-[clamp(1.75rem,3.4vw,2.75rem)] font-light leading-[1.1] tracking-[-0.02em]">{title}</h2>
        </Reveal>
        <Reveal delay={0.08}>
          <Button href={siteConfig.cta.request.href} size="lg" arrow>
            {siteConfig.cta.request.label}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
