import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  const { contact } = siteConfig;
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-line">
      <Container className="grid gap-14 py-16 md:py-20 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <Logo height={40} />
          <p className="mt-6 max-w-[36ch] text-muted">{siteConfig.tagline}</p>
        </div>

        <nav aria-label="Footernavigatie" className="lg:col-span-2 lg:col-start-6">
          <h2 className="label-caps mb-5 text-accent">Website</h2>
          <ul className="space-y-3">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-muted transition-colors hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href={siteConfig.cta.request.href} className="text-muted transition-colors hover:text-ink">
                {siteConfig.cta.request.label}
              </Link>
            </li>
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h2 className="label-caps mb-5 text-accent">Contact</h2>
          <address className="space-y-3 not-italic text-muted">
            <p>
              {contact.address}
              <br />
              {contact.postalCity}
            </p>
            <p>{contact.phone}</p>
            <p>{contact.email}</p>
          </address>
        </div>

        <div className="lg:col-span-2">
          <h2 className="label-caps mb-5 text-accent">Gegevens</h2>
          <ul className="space-y-3 text-muted">
            <li>KvK {contact.kvk}</li>
            <li>Btw {contact.vat}</li>
            {siteConfig.legal.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-t border-line">
        <Container className="flex flex-col gap-3 py-6 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <p className="tabular">
            © {year} {siteConfig.name}
          </p>
          <p className="flex items-center gap-3">
            <span aria-hidden className="inline-block h-1.5 w-1.5 bg-accent" />
            Wij werken uitsluitend zakelijk (B2B)
          </p>
        </Container>
      </div>
    </footer>
  );
}
