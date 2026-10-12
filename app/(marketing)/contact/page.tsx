import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description: "Neem contact op met Studio NewEra. Voor projectaanvragen gebruikt u het aanvraagformulier.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const { contact } = siteConfig;
  const details = [
    { icon: Phone, label: "Telefoon", value: contact.phone },
    { icon: Mail, label: "E-mail", value: contact.email },
    { icon: MapPin, label: "Adres", value: `${contact.address}, ${contact.postalCity}` },
    { icon: Clock, label: "Bereikbaar", value: contact.hours },
  ];

  return (
    <>
      <PageHero label="Contact" title="Neem contact op." intro="Voor algemene vragen, samenwerking of een lopend project." />
      <Container className="grid gap-16 py-16 md:py-24 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <ul className="border-t border-line">
            {details.map(({ icon: Icon, label, value }, index) => (
              <Reveal as="li" key={label} delay={index * 0.06} y={12} className="flex gap-4 border-b border-line py-5">
                <Icon aria-hidden className="mt-1 h-4 w-4 shrink-0 text-accent" strokeWidth={1.5} />
                <span>
                  <span className="block text-sm text-muted">{label}</span>
                  <span className="block text-ink">{value}</span>
                </span>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.3} className="mt-10 border border-line border-t-accent bg-elevated p-6">
            <p className="text-ink">Een project aanvragen?</p>
            <p className="mt-2 text-[15px] text-muted">
              Gebruik daarvoor het aanvraagformulier. Daarin kunt u ook plattegronden meesturen.
            </p>
            <Button href={siteConfig.cta.request.href} size="sm" className="mt-5" arrow>
              {siteConfig.cta.request.label}
            </Button>
          </Reveal>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <h2 className="mb-8 text-2xl font-light">Stuur een bericht</h2>
          <ContactForm />
        </div>
      </Container>
    </>
  );
}
