import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Arc } from "@/components/sections/Arc";
import { RevealText } from "@/components/motion/RevealText";
import { FadeIn } from "@/components/motion/FadeIn";

export const metadata: Metadata = {
  title: "Pagina niet gevonden",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" className="relative overflow-hidden border-b border-line pt-[var(--header-h)]">
        <Arc className="-right-[20%] -top-[10%] h-[120%] w-[90%] min-w-[640px] md:w-[60%]" delay={0.2} />
        <div aria-hidden className="week-grid pointer-events-none absolute inset-0 opacity-50 [--cols:12]" />
        <Container className="relative flex min-h-[70svh] flex-col justify-center py-24">
          <FadeIn y={10}>
            <p className="tabular label-caps text-accent">Fout 404</p>
          </FadeIn>
          <RevealText as="h1" immediate delay={0.1} text="Deze pagina staat niet in de planning." className="mt-6 max-w-[16ch] text-[clamp(2.5rem,6vw,5rem)] font-light leading-[1.1] tracking-[-0.03em]" />
          <FadeIn delay={0.4}>
            <p className="mt-6 max-w-[48ch] text-lg text-muted">De pagina bestaat niet of is verplaatst. Ga terug naar de homepage of dien direct een aanvraag in.</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button href="/" arrow>
                Naar de homepage
              </Button>
              <Button href="/aanvraag" variant="secondary">
                Aanvraag indienen
              </Button>
            </div>
          </FadeIn>
        </Container>
      </main>
      <Footer />
    </>
  );
}
