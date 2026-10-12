import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/site-config";
import { PageHero } from "./PageHero";

/** Shared shell for legal pages until the final text is supplied. */
export function LegalPlaceholder({ title }: { title: string }) {
  return (
    <>
      <PageHero label="Juridisch" title={title} />
      <Container className="py-16 md:py-24">
        <div className="max-w-[68ch] space-y-5 text-lg text-muted lg:ml-[25%]">
          <p className="text-ink">Tekst volgt.</p>
          <p>
            Heeft u in de tussentijd vragen, neem dan contact op via {siteConfig.contact.email} of {siteConfig.contact.phone}.
          </p>
        </div>
      </Container>
    </>
  );
}
