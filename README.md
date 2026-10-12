# Studio NewEra website

Marketing website for Studio NewEra, a Dutch company that designs, supplies and installs kitchens for business customers only. Built with Next.js (App Router), TypeScript, Tailwind CSS v4, Motion, react-hook-form and zod. Hosted on Cloudflare Workers through the OpenNext adapter.

## Setup

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint
npm run preview  # build and run in the Cloudflare Workers runtime locally
npm run deploy   # build and deploy to Cloudflare (needs `npx wrangler login` once)
```

Requires Node.js 20.9 or newer.

## Hosting on Cloudflare

The site runs on Cloudflare Workers (free plan) via `@opennextjs/cloudflare`. Configuration lives in `wrangler.jsonc` and `open-next.config.ts`.

- Next.js is pinned to 16.3.8: the adapter does not yet handle a manifest file introduced in 16.4. Upgrade once `@opennextjs/cloudflare` supports it, and test with `npm run preview` first.
- `next/image` runs unoptimized, because Workers has no built-in Next.js image optimizer. Images in `public/` should be exported at the size they are shown (the logo is a 600px WebP).
- Environment variables for production are set in the Cloudflare dashboard (Workers, studio-newera, Settings, Variables and Secrets) or with `npx wrangler secret put NAME`.
- Server logs (including submitted requests while no mail provider is connected) appear under Workers, studio-newera, Logs, or live with `npx wrangler tail`.
- A custom domain can be attached under Workers, studio-newera, Settings, Domains and Routes. Then set `NEXT_PUBLIC_SITE_URL` to that domain and redeploy.

## Structure

```
app/
  (marketing)/          Public pages with the shared Header and Footer
    page.tsx            Home: hero, 4-step werkwijze, portal teaser, closing CTA
    werkwijze/          9-step process, audiences (#voor-wie), FAQ
    klantportal/        Portal scope with dashboard mockup
    aanvraag/           Project request form (optional details collapsed)
    over-ons/           Story and values
    contact/            Contact details and form
    privacy/, voorwaarden/   Legal placeholders
  portal/               Future customer portal (own layout, no marketing chrome)
  api/aanvraag/         POST, multipart, validates and forwards the request
  api/contact/          POST, JSON, validates and forwards the message
  not-found.tsx, sitemap.ts, robots.ts, icon.svg
components/
  ui/                   Button, Input, Select, Textarea, Checkbox, Field, Badge, Bars, Photo, Section, Container, Logo
  sections/             Hero, ProcessOverview, ProcessStepper, PortalTeaser, DashboardMockup, Faq, CtaBanner, PageHero, Arc, ...
  forms/                AanvraagForm, ContactForm, FileDrop, Honeypot
  motion/               Reveal, RevealText, DrawLine, FadeIn, MotionProvider
  layout/               Header, Footer
lib/
  site-config.ts        Name, contact placeholders, navigation, logo and all photography
  process.ts            The nine project phases and the four-step homepage summary
  schemas.ts            Shared zod schemas and attachment rules (client and server)
  mailer.ts             Mail adapter (console by default, Resend optional)
  storage.ts            File storage adapter (discards files by default)
  rate-limit.ts         In-memory rate limiter
```

## Replacing content

| What | Where |
| --- | --- |
| Company name, contact details, KvK, btw, address, response time | `lib/site-config.ts` |
| Logo | Replace `public/brand/logo.webp` (shown on the site; `logo.png` is the full-size source), or change `siteConfig.logo` (path and pixel size). Only `components/ui/Logo.tsx` reads it. |
| Photography | All photos are placeholders from Unsplash, set in `images` in `lib/site-config.ts`. Put the client's own photos in `public/images/` and replace each `src` with a path such as `/images/hero-1.jpg` (export them about 2200px wide). |
| Process phases and texts | `lib/process.ts` |
| Open Graph image | `public/og.png` (1200x630) |
| Favicon | `app/icon.svg` |

## Environment variables

Copy `.env.example` to `.env.local` and fill in what you need.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata, sitemap and Open Graph |
| `MAIL_PROVIDER` | `resend` to send email, empty to log to the server console |
| `RESEND_API_KEY`, `MAIL_FROM`, `MAIL_TO` | Resend credentials and addresses (`MAIL_TO` accepts a comma separated list) |
| `STORAGE_PROVIDER` | `s3`, `supabase` or `azure` once implemented, empty to discard uploads |

## Connecting email

Submissions currently go to the server log. To send real email with Resend, set `MAIL_PROVIDER=resend` plus `RESEND_API_KEY`, `MAIL_FROM` (a verified sender) and `MAIL_TO`. The implementation is in `lib/mailer.ts`; an SMTP variant can be added in the same file (see the TODO).

## Connecting file storage

`lib/storage.ts` defines a `StorageAdapter` with one method, `save(file, folder)`. Implement it for S3, Supabase Storage or Azure Blob, select it in `getStorage()`, and the request endpoint will include the stored URLs in the email.

On Cloudflare Workers the request body limit is 100 MB on the free plan, so the form's limit of 5 files of 10 MB each fits. Workers parse uploads in 128 MB of memory, so for heavy use switch to direct-to-storage uploads with presigned URLs. If a body is ever rejected as too large, the form shows a clear message.

## Adding the customer portal

`app/portal` already has its own layout without the marketing header. The decided scope is a web app for three roles: clients, the Studio NewEra team and installers. Add authentication (NextAuth, Clerk or Supabase Auth) in `app/portal/layout.tsx` and build pages such as `app/portal/projecten`. The design tokens, UI components and `lib/process.ts` phases are shared, and `DashboardMockup` shows the intended navigation (Projecten, Ontwerpen, Afspraken, Service), status model and design-approval flow.

## Redirects

`/hoe-het-werkt` and `/voor-wie` were merged into `/werkwijze`. Permanent redirects live in `next.config.ts`.

## Cookies and analytics

No tracking scripts are included. If analytics are added, a consent banner belongs in `app/layout.tsx` (marked with a TODO).

## Assumptions

- The user supplied the logo as an image. It was cropped and made transparent (`public/brand/logo.png`) and is used instead of a text-based placeholder.
- The user asked for a design that is as tight as possible: all corners are square (radius 0) instead of the 8 to 10 px in the original brief, and blur or glow is limited to the logo arc and the sticky header.
- After client feedback, motion is subtle: short fades and wipes, a hero slideshow with a slow zoom (with a pause button) and no long entrance delays. Headings wait at most 700 ms for the web font so their line breaks never jump. Everything respects `prefers-reduced-motion`.
- The second round followed a photography-led reference supplied by the user, without copying it: the typeface stays Outfit (matching the wordmark) instead of a serif, and the logo's gold arc and the three bars of its "E" are used as recurring motifs.
- One warm light band per page echoes the reference. On that band small accent text uses a darker bronze (#7a5b2b) because champagne gold does not meet contrast on a light background.
- All photography is placeholder imagery from Unsplash (free license), hotlinked so it can be swapped in one place. Captions on the hero slides describe themes, not real projects.
- "Type organisatie" became optional in the request form, consistently on client and server.
- The homepage keeps two CTA areas (hero and closing strip) because the brief asks for both there; every other page has at most one.
- No em dashes are used in visible copy.
- The brief asked for "je/jij" in form microcopy, but all literal copy in the brief (validation messages, confirmation, process steps) uses "u". The site uses "u" consistently.
- Outfit was chosen from the two allowed fonts because its geometric forms and single-storey "a" match the wordmark.
- Project names, numbers, statuses and notifications in the portal mockup are demonstration data and labelled "Voorbeeldweergave".
- The rate limiter is in memory. On Cloudflare Workers each isolate has its own window; use a shared store (KV, Durable Objects) for strict limits.
- The copyright year is rendered at build time.

## Still needed from Studio NewEra

- Contact details: address, postal code and city, phone, email, opening hours
- KvK number, btw number, statutory name
- Response time in working days (`responseDays`)
- Final copy for Over ons
- Privacy statement and terms and conditions
- Photography to replace the placeholders: 4 hero kitchens, a material close-up, a building, plans or drawings, a design render for the portal mockup, and an Over ons image
- Email credentials (Resend or SMTP) and a storage provider for attachments
- The production domain (`NEXT_PUBLIC_SITE_URL`)
