---
version: 1
slug: "app-marketing-page-tsx"
primary_target: "app/(marketing)/page.tsx"
related_targets: ["app/(marketing)","app/portal"]
---

## Scope

Whole marketing site for Studio NewEra (all public routes plus the /portal placeholder). Mode: Persuade. Visitor: professional buyer of kitchens for a construction project. Action: submit a structured request at /aanvraag. Proof: the process itself, shown as a planning, never claimed with numbers. Constraints: brief-pinned tokens, logo image, Dutch copy, no em-dashes, no invented facts.

## Direction contract

THESIS: The site is a bouwplanning. Week columns, phase rows and a gold "vandaag" line carry the page, so "op schema" is shown instead of said. Refuses the category default of a photo hero with a centred slogan and a row of soft icon cards.

OWN-WORLD: Near-black ground (#0A0A0A), off-white light type, champagne gold only for the active phase, today line, primary action and the logo arc. 1px hairlines at 10% off-white, zero corner radius everywhere, square nodes, bars as flat rectangles, tabular numerals for weeks.

STORY: A buyer sees a project laid out week by week, understands that one partner runs all nine phases, sees how the future portal will show status, and submits a request with floor plans.

FIRST VIEWPORT: Header with logo left, nav, Inloggen and Aanvraag indienen. Hero headline set large and light at top left over faint week-column hairlines that run the full hero height; subtext and both CTAs under it. The lower band is a full-width nine-row phase planning (Voorbeeldplanning) whose bars draw in left to right, then the gold today line slides into place. The logo's gold arc rises behind the top right.

FORM: Planning board / Gantt as page grammar, brief-pinned world (no concept roll: brief pins palette, type, motifs). Seed key: pinned-brief.

Signature interaction: the phase tracker. The home process rail auto-advances through the nine phases and can be stepped by the visitor; on /hoe-het-werkt the timeline spine fills gold with scroll and each phase lights as it is passed. Motion grammar: things are drawn like a plan being set out (scaleX lines, masked line reveals, exponential ease-out).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
