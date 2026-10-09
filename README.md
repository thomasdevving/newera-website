# Studio NewEra website

Marketing website for Studio NewEra, a Dutch company that designs, supplies and installs kitchens for business customers only. Built with Next.js (App Router), TypeScript, Tailwind CSS v4, Motion, react-hook-form and zod.

## Setup

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint
```

Requires Node.js 20.9 or newer.

## Structure

```
app/
  (marketing)/          Public pages with the shared Header and Footer
    page.tsx            Home
    hoe-het-werkt/      Process timeline and FAQ
    voor-wie/           Audience overview
    klantportal/        Portal explanation with dashboard mockup
    aanvraag/           Project request form
    over-ons/           About, values, team and reference placeholders
    contact/            Contact details and form
    privacy/, voorwaarden/   Legal placeholders
  portal/               Future customer portal (own layout, no marketing chrome)
  api/aanvraag/         POST, multipart, validates and forwards the request
  api/contact/          POST, JSON, validates and forwards the message
  not-found.tsx, sitemap.ts, robots.ts, icon.svg
components/
  ui/                   Button, Input, Select, Textarea, Checkbox, Field, Card, Badge, Section, Container, Logo, ...
  sections/             Hero, PlanningBoard, ProcessPreview, ProcessTimeline, DashboardMockup, AudienceGrid, Faq, CtaBanner, ...
  forms/                AanvraagForm, ContactForm, FileDrop, Honeypot
  motion/               Reveal, RevealText, DrawLine, FadeIn, MotionProvider
  layout/               Header, Footer
lib/
  site-config.ts        Name, contact placeholders, navigation, logo and image slots
  process.ts            The nine project phases (used by home, timeline and mockup)
  schemas.ts            Shared zod schemas and attachment rules (client and server)
  mailer.ts             Mail adapter (console by default, Resend optional)
  storage.ts            File storage adapter (discards files by default)
  rate-limit.ts         In-memory rate limiter
```

## Replacing content

| What | Where |
| --- | --- |
| Company name, contact details, KvK, btw, address, response time | `lib/site-config.ts` |
| Logo | Replace `public/brand/logo.png`, or change `siteConfig.logo` (path and pixel size). Only `components/ui/Logo.tsx` reads it. |
| Photography | Put files in `public/images/` and set the paths in `images` in `lib/site-config.ts`. Empty slots show "Afbeelding volgt". |
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

Important on Vercel: serverless functions accept request bodies up to 4.5 MB. The form allows 5 files of 10 MB each, so for production uploads switch to direct-to-storage uploads with presigned URLs. Until then the form shows a clear message when the attachments are too large.

## Adding the customer portal

`app/portal` already has its own layout without the marketing header. Add authentication (NextAuth, Clerk or Supabase Auth) in `app/portal/layout.tsx` and build pages such as `app/portal/projecten`. The design tokens, UI components and `lib/process.ts` phases are shared, and `DashboardMockup` shows the intended status model.

## Cookies and analytics

No tracking scripts are included. If analytics are added, a consent banner belongs in `app/layout.tsx` (marked with a TODO).

## Assumptions

- The user supplied the logo as an image. It was cropped and made transparent (`public/brand/logo.png`) and is used instead of a text-based placeholder.
- The user asked for a design that is as tight as possible: all corners are square (radius 0) instead of the 8 to 10 px in the original brief, and blur or glow is limited to the logo arc and the sticky header.
- Motion is on the generous side, as requested: masked headline reveals, drawn hairlines, a hero planning that draws itself, an auto-advancing phase tracker and a scroll-driven process timeline. Everything respects `prefers-reduced-motion`.
- No em dashes are used in visible copy.
- The brief asked for "je/jij" in form microcopy, but all literal copy in the brief (validation messages, confirmation, process steps) uses "u". The site uses "u" consistently.
- Outfit was chosen from the two allowed fonts because its geometric forms and single-storey "a" match the wordmark.
- Week numbers, project names and statuses in the hero planning and the portal mockup are demonstration data and labelled "Voorbeeldplanning" or "Voorbeeldweergave".
- The rate limiter is in memory. On serverless platforms each instance has its own window; use a shared store for strict limits.
- The copyright year is rendered at build time.

## Still needed from Studio NewEra

- Contact details: address, postal code and city, phone, email, opening hours
- KvK number, btw number, statutory name
- Response time in working days (`responseDays`)
- Final copy for Over ons, team introduction and references
- Privacy statement and terms and conditions
- Photography (team, workshop, projects)
- Email credentials (Resend or SMTP) and a storage provider for attachments
- The production domain (`NEXT_PUBLIC_SITE_URL`)
