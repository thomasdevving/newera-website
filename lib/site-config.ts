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
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://studio-newera.tndesignsdzn.workers.dev",
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
    { label: "Werkwijze", href: "/werkwijze" },
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
 * Builds an Unsplash image URL at a given width. Placeholder photography only:
 * replace with the client's own photos by pointing `src` at /public/images/...
 */
export const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}`;

/**
 * A photo in /public/images, exported as WebP at each of the given widths and
 * named "{name}-{width}.webp". The largest width is the fallback `src`.
 */
const local = (name: string, widths: number[]) => ({
  src: `/images/${name}-${widths[widths.length - 1]}.webp`,
  srcSet: widths.map((width) => `/images/${name}-${width}.webp ${width}w`).join(", "),
});

export type ImageSlot = { src: string; alt: string; srcSet?: string };

/**
 * All imagery in one place. Every `src` is either a local photo (made with
 * `local()`), an Unsplash placeholder (made with `unsplash()`) or a plain
 * local path such as "/images/hero-1.jpg".
 */
export const images = {
  hero: [
    { ...local("keuken-donker", [800, 1400, 2000]), alt: "Donkere keuken met kookeiland, visgraatvloer en eettafel", caption: "Ontwerp per woningtype" },
    { ...local("keuken-notenhout", [800, 1544]), alt: "Notenhouten kastenwand met een kookeiland in licht natuursteen", caption: "Materiaal en detail" },
    { ...local("keuken-zonlicht", [800, 1544]), alt: "Lichte keuken met kookeiland en verlichte vitrinekasten in zonlicht", caption: "Montage volgens planning" },
    { ...local("keuken-eiken", [800, 1400, 2000]), alt: "Eikenhouten kookeiland onder houten spanten en dakramen", caption: "Oplevering per woning" },
  ],
  materials: { src: unsplash("1752321532730-ed24a51e7b3f"), alt: "Donkere houtfineer met gouden nerf" },
  building: { src: unsplash("1624204386084-dd8c05e32226"), alt: "Appartementengebouw met balkons in avondlicht" },
  floorPlan: { src: unsplash("1603901622056-0a5bee231395"), alt: "Bouwtekeningen met potloden op een werktafel" },
  render: { ...local("keuken-eiken", [800]), alt: "Ontwerp van een keuken met eikenhouten kookeiland" },
  about: { src: unsplash("1752321532314-90800e0e8c2a"), alt: "Stalen van natuurlijke materialen naast elkaar" },
} as const;

export type NavItem = (typeof siteConfig.nav)[number];
