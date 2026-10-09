import Link from "next/link";
import { ArrowLeft, Lock } from "lucide-react";
import { Arc } from "@/components/sections/Arc";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Logo } from "@/components/ui/Logo";

export default function PortalPage() {
  return (
    <>
      <div aria-hidden className="week-grid pointer-events-none absolute inset-0 opacity-50 [--cols:12]" />
      <Arc className="-right-[20%] -top-[20%] h-[120%] w-[90%] min-w-[640px] md:w-[60%]" delay={0.2} />

      <div className="relative flex flex-1 items-center justify-center px-4 py-16">
        <FadeIn className="w-full max-w-[460px]">
          <div className="border border-line-strong bg-bg/90 p-8 backdrop-blur-sm md:p-10">
            <Logo height={44} />
            <h1 className="mt-10 text-4xl font-light tracking-[-0.02em]">Klantportal</h1>
            <p className="mt-4 text-muted">
              De klantportal komt binnenkort beschikbaar. Heeft u een lopend project? Neem contact op met uw contactpersoon.
            </p>

            {/* Visual placeholder only. Not wired to anything. */}
            <form aria-label="Inloggen (nog niet beschikbaar)" className="mt-10 space-y-5 opacity-60">
              <fieldset disabled className="space-y-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="portal-email" className="text-[15px]">
                    E-mailadres
                  </label>
                  <Input id="portal-email" type="email" autoComplete="off" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="portal-password" className="text-[15px]">
                    Wachtwoord
                  </label>
                  <Input id="portal-password" type="password" autoComplete="off" />
                </div>
                <Button type="submit" className="w-full" disabled>
                  <Lock aria-hidden className="h-4 w-4" strokeWidth={1.5} />
                  Inloggen
                </Button>
              </fieldset>
            </form>

            <div className="mt-8 flex flex-col gap-3 border-t border-line pt-6 text-sm sm:flex-row sm:justify-between">
              <Link href="/" className="inline-flex items-center gap-2 text-muted transition-colors hover:text-ink">
                <ArrowLeft aria-hidden className="h-4 w-4" strokeWidth={1.5} />
                Terug naar de website
              </Link>
              <Link href="/contact" className="text-accent transition-colors hover:text-accent-bright">
                Contact opnemen
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </>
  );
}
