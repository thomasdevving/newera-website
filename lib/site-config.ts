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

export type ImageSlot = { src: string; alt: string };

/**
 * All imagery in one place. Every `src` is either an Unsplash placeholder
 * (made with `unsplash()`) or a local path such as "/images/hero-1.jpg".
 */
export const images = {
  hero: [
    { src: unsplash("1759147960461-b74a7e9a75d4"), alt: "Donkere keuken met houten kookeiland en barkrukken", caption: "Ontwerp per woningtype" },
    { src: unsplash("1776831293955-f569f2f3a4b5"), alt: "Keuken met marmeren eiland in warm licht", caption: "Materiaal en detail" },
    { src: unsplash("1758448755927-e5c5ae14790c"), alt: "Kookeiland met marmeren accenten en hanglamp", caption: "Montage volgens planning" },
    { src: unsplash("1632583824020-937ae9564495"), alt: "Moderne keuken met bar en houten wandkasten", caption: "Oplevering per woning" },
  ],
  materials: { src: unsplash("1752321532730-ed24a51e7b3f"), alt: "Donkere houtfineer met gouden nerf" },
  building: { src: unsplash("1624204386084-dd8c05e32226"), alt: "Appartementengebouw met balkons in avondlicht" },
  floorPlan: { src: unsplash("1603901622056-0a5bee231395"), alt: "Bouwtekeningen met potloden op een werktafel" },
  render: { src: unsplash("1778731660388-36c3a51bed99"), alt: "Ontwerp van een keuken met kookeiland en barkrukken" },
  about: { src: unsplash("1752321532314-90800e0e8c2a"), alt: "Stalen van natuurlijke materialen naast elkaar" },
} as const;

export type NavItem = (typeof siteConfig.nav)[number];
