/**
 * Central place for brand, contact and navigation data.
 * Replace the bracketed placeholders here; every page reads from this file.
 */

export const siteConfig = {
  name: "Studio NewEra",
  legalName: "[Statutaire naam]",
  description:
    "Studio NewEra ontwerpt, levert en monteert keukens voor aannemers, projectontwikkelaars, woningcorporaties en bouwpartners. Eén partner van aanvraag tot service.",
  tagline: "Keukens voor zakelijke opdrachtgevers, van aanvraag tot service.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://studio-newera.workers.dev",
  locale: "nl_NL",

  /** Number of working days we promise to respond within. */
  responseDays: "[aantal]",

  /** Swap the logo by replacing the file or pointing `src` elsewhere. */
  logo: {
    src: "/brand/logo.webp",
    width: 920,
    height: 260,
    alt: "Studio NewEra",
  },

  contact: {
    email: "[E-mailadres]",
    phone: "[Telefoonnummer]",
    address: "[Adres]",
    postalCity: "[Postcode en plaats]",
    kvk: "[KvK-nummer]",
    vat: "[Btw-nummer]",
    hours: "[Openingstijden]",
  },

  nav: [
    { label: "Home", href: "/" },
    { label: "Hoe het werkt", href: "/hoe-het-werkt" },
    { label: "Voor wie", href: "/voor-wie" },
    { label: "Klantportal", href: "/klantportal" },
    { label: "Over ons", href: "/over-ons" },
    { label: "Contact", href: "/contact" },
  ],

  legal: [
    { label: "Privacyverklaring", href: "/privacy" },
    { label: "Algemene voorwaarden", href: "/voorwaarden" },
  ],

  cta: {
    request: { label: "Aanvraag indienen", href: "/aanvraag" },
    login: { label: "Inloggen", href: "/portal" },
  },
} as const;

/**
 * Image slots. `src: null` renders a labelled placeholder.
 * Drop real photography in /public/images and set the path here.
 */
export const images = {
  about: { src: null as string | null, alt: "Werkplaats van Studio NewEra" },
  team: [
    { src: null as string | null, alt: "[Naam], [Functie]", name: "[Naam]", role: "[Functie]" },
    { src: null as string | null, alt: "[Naam], [Functie]", name: "[Naam]", role: "[Functie]" },
    { src: null as string | null, alt: "[Naam], [Functie]", name: "[Naam]", role: "[Functie]" },
  ],
} as const;

export type NavItem = (typeof siteConfig.nav)[number];
