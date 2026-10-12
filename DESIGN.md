---
name: Studio NewEra
description: Kitchens for professional builders, shown in dark, photo-led premium pages with one warm paper band per page.
colors:
  ground: "#0a0a0a"
  board: "#121212"
  board-raised: "#181818"
  chalk: "#f5f3ef"
  chalk-muted: "#a8a39a"
  chalk-faint: "rgba(245, 243, 239, 0.42)"
  champagne: "#c9a66b"
  champagne-bright: "#dcbd86"
  champagne-wash: "rgba(201, 166, 107, 0.15)"
  bronze: "#7a5b2b"
  hairline: "rgba(245, 243, 239, 0.1)"
  hairline-strong: "rgba(245, 243, 239, 0.2)"
  paper: "#eeeae3"
  paper-ink: "#16140f"
  paper-muted: "#5c564c"
  paper-line: "rgba(22, 20, 15, 0.14)"
  signal-green: "#6fbf8e"
  signal-red: "#e07a6b"
typography:
  display:
    fontFamily: "Outfit, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 6.6vw, 5.75rem)"
    fontWeight: 300
    lineHeight: 1.05
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Outfit, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 4.25rem)"
    fontWeight: 300
    lineHeight: 1.08
    letterSpacing: "-0.03em"
  headline-section:
    fontFamily: "Outfit, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 4vw, 3.25rem)"
    fontWeight: 300
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Outfit, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 3.4vw, 2.75rem)"
    fontWeight: 300
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Outfit, ui-sans-serif, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.6
    fontFeature: "\"ss01\""
  body-small:
    fontFamily: "Outfit, ui-sans-serif, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.4
  nav:
    fontFamily: "Outfit, ui-sans-serif, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 500
    letterSpacing: "0.16em"
  label:
    fontFamily: "Outfit, ui-sans-serif, system-ui, sans-serif"
    fontSize: "11px"
    fontWeight: 500
    letterSpacing: "0.12em"
  data:
    fontFamily: "Outfit, ui-sans-serif, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    letterSpacing: "0.18em"
    fontFeature: "\"tnum\""
rounded:
  none: "0px"
spacing:
  gutter-sm: "16px"
  gutter-md: "40px"
  gutter-xl: "56px"
  section-compact: "48px"
  section-sm: "64px"
  section: "96px"
  section-xl: "100px"
  container: "1360px"
  header: "72px"
components:
  button-primary:
    backgroundColor: "{colors.champagne}"
    textColor: "{colors.ground}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.champagne-bright}"
    textColor: "{colors.ground}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.chalk}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "48px"
  button-secondary-hover:
    textColor: "{colors.champagne}"
  input:
    backgroundColor: "{colors.board}"
    textColor: "{colors.chalk}"
    rounded: "{rounded.none}"
    padding: "0 16px"
    height: "48px"
  input-focus:
    backgroundColor: "{colors.board-raised}"
  card:
    backgroundColor: "{colors.board}"
    rounded: "{rounded.none}"
  badge-accent:
    backgroundColor: "{colors.champagne-wash}"
    textColor: "{colors.champagne}"
    rounded: "{rounded.none}"
    padding: "0 8px"
    height: "24px"
  paper-band:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.paper-ink}"
    rounded: "{rounded.none}"
  paper-link:
    textColor: "{colors.bronze}"
  slide-marker:
    backgroundColor: "{colors.hairline-strong}"
    height: "2px"
    width: "48px"
  slide-marker-active:
    backgroundColor: "{colors.champagne}"
  step-node:
    backgroundColor: "{colors.ground}"
    rounded: "{rounded.none}"
    size: "11px"
---

# Design System: Studio NewEra

## Overview

**Creative North Star: "The Dark Showroom"**

The site is a short, dark, premium showroom where the kitchens do the talking. Full-bleed photography carries the first impression: a full-height slideshow of kitchens on the home page, darkened photographs behind inner page heroes and behind the closing call-to-action strip. Off-white light type sits over deep gradients that darken from the left and the bottom, so the words always read and the photograph keeps its warmth on the right.

Against the near-black, each page turns over once into a warm paper band: a light, calm section in dark ink where the process, the audience or the values are explained. That single change of material is the page's breath; it is never repeated twice on one page. Champagne gold remains the one voice on the dark ground and marks what is live or actionable; on paper, gold fails contrast for text, so small accent text there turns bronze.

The brand is carried by two pieces of the logo: the thin gold arc, which draws itself in behind heroes, and the three bars of the "E", now a glyph for bullets and the slide markers. Every corner is square, by the user's request for a site "zo strak mogelijk". Motion is subtle by client request: short fades and wipes on one exponential ease-out, no long delays, and headings wait for the web font so they never reflow mid-animation.

**Key Characteristics:**
- Photo-led: full-height kitchen slideshow with slow zoom, darkened photos behind page heroes and the closing strip.
- Near-black ground, off-white light type, champagne gold reserved for what is live.
- One warm paper band per page, dark ink, bronze for small accent text.
- The logo's arc and its "E" bars as the only brand devices.
- Zero corner radius on every element; 1px hairlines as structure; no shadows at rest.
- Subtle motion: short fades and clip wipes, one exponential ease-out.

## Colors

A near-black and chalk palette with a single champagne accent, plus one warm paper surface that inverts the page once.

### Primary
- **Champagne** (champagne): primary button fill, slide-marker progress, the active nav underline, step nodes and step numbers, focus outline and selection on dark, checked checkboxes, required-field asterisks, the "approve" action and highlighted row in the portal mockup, small functional icons, and the logo arc. It is the logo's arc colour, pinned by the brief.
- **Champagne Bright** (champagne-bright): only the hover wipe on the primary button; never a resting colour.
- **Champagne Wash** (champagne-wash): the fill of the accent badge and the highlighted mockup row, behind champagne text.

### Secondary
- **Bronze** (bronze): the champagne voice translated for the paper band: small accent text, inline links, icons and the focus outline on paper. It holds 5.2:1 on Paper where Champagne manages only 1.9:1.

### Neutral
- **Ground** (ground): the page, html background, and the base of every photo gradient.
- **Board** (board): cards, form controls, the portal mockup frame, autofill fill; one step lifted from the ground.
- **Board Raised** (board-raised): focused form controls.
- **Chalk** (chalk): headings and emphasised copy; at 80% it carries hero subtext and captions over photographs.
- **Chalk Muted** (chalk-muted): intros, supporting copy, step summaries, field hints.
- **Chalk Faint** (chalk-faint): timestamps and quiet metadata.
- **Hairline** (hairline): every divider on dark, row rule, card border and section edge.
- **Hairline Strong** (hairline-strong): borders of interactive controls, the step rail, inactive slide markers.
- **Paper** (paper): the one warm light band per page.
- **Paper Ink** (paper-ink): headings and body copy on Paper; selection fill on Paper.
- **Paper Muted** (paper-muted): supporting copy and numerals on Paper (6:1).
- **Paper Line** (paper-line): grid rules and dividers on Paper.

### Tertiary (status only)
- **Signal Green** (signal-green): success badges and form success states.
- **Signal Red** (signal-red): invalid control borders and error messages.

### Named Rules
**The Live Gold Rule.** On the dark ground, Champagne marks only what is active, current or actionable. If an element is neither the next action nor the current state, it is chalk or hairline.

**The Bronze On Paper Rule.** Gold never sets text on Paper. Small accent text, links and icons there are Bronze; Champagne may appear on Paper only as a non-text hover line.

**The One Wipe Rule.** Champagne Bright exists only as the hover wipe inside the primary button.

## Typography

**Display Font:** Outfit (with ui-sans-serif, system-ui)
**Body Font:** Outfit
**Label/Mono Font:** Outfit with tabular numerals for step numbers, counters and data

**Character:** One geometric sans whose single-storey forms echo the NewEra wordmark, deliberately kept over the serif of the photographic reference. Headlines are set light and large with negative tracking and tight leading; size carries hierarchy, weight barely does.

### Hierarchy
- **Display** (display): the home hero headline only, max about 13ch.
- **Headline** (headline): inner page hero headings, max about 20ch.
- **Headline Section** (headline-section): section headings on dark and on paper; between 2rem and 3.25rem depending on the section's weight.
- **Title** (title): the closing CTA line and large mobile menu items.
- **Body** (body): running copy; hero and page intros step up to 18 to 20px at about 80% Chalk, max 40 to 56ch.
- **Body Small** (body-small): step and card summaries, field labels, inline text links.
- **Nav** (nav): desktop navigation labels, uppercase, wide tracked.
- **Label** (label): uppercase functional labels: badges, slide captions (12px, 0.18em), the mockup's "Voorbeeldweergave" tag and approval heading.
- **Section label** (label): a short uppercase label in Champagne (Bronze on Paper) with a 24 to 32px 1px rule before it, set above a section or page heading: the hero line "Keukens voor professionals", PageHero, PortalTeaser, ProcessOverview and the Voor wie band. This is a deliberate commitment, not drift: the client brief names the hero label explicitly and the user's reference design uses the same device. Keep it to one per section and never stack it with a second kicker.
- **Data** (data): step numbers ("01" to "09"), the slide counter, mockup counts; always tabular.

### Named Rules
**The Tight Heading Rule.** Headings sit at line-height 1.05 to 1.1, never looser; the user asked for tighter heading spacing and the build holds it everywhere.

**The Light Weight Rule.** Headlines are Outfit 300; hierarchy comes from size, not weight.

## Layout

A single 1360px container with 16, 24, 40 and 56px side gutters at the sm, md and xl steps. The site is short by client request: each page is a photo hero, a few dark sections, one paper band and a closing photo strip.

- **Home hero:** full viewport height (min 680px from lg), content anchored to the bottom left above a hairline-ruled control row, the arc floating top right.
- **Inner page hero:** compact band, padded below the 72px fixed header, with a darkened photograph or the arc behind.
- **Section rhythm:** standard sections at 64, 96 and 100px vertical padding; compact sections at 48 to 56px; paper bands at 56 to 64px rising to 80 to 96px.
- **Grids:** twelve-column splits on lg (for example 4 to 8 for the portal teaser); four-step cards on paper in a ruled grid, 1, 2 then 4 columns.
- **The stepper** is horizontal across nine columns from xl (1280px) and a vertical rail below.
- **Header:** fixed, transparent over heroes, gaining an 80% Ground fill, hairline and backdrop blur once scrolled; hides on scroll down. Desktop nav from lg; full-screen menu below.

### Named Rules
**The One Paper Band Rule.** Each page gets exactly one Paper section. Two light bands on one page break the dark showroom.

## Elevation & Depth

Flat by default. Depth comes from photography and gradients, not shadows: photos sit under two Ground gradients (left to right, and bottom to top) so type always clears contrast, and the closing strip dims its photo further. Surfaces separate by a tonal step (Ground to Board) or a 1px hairline. The only shadow is a gold glow under the primary button on hover; the scrolled header uses a backdrop blur.

### Shadow Vocabulary
- **Action glow** (`box-shadow: 0 8px 28px -12px rgba(201,166,107,0.75)`): primary button hover only.

### Named Rules
**The Gradient Not Shadow Rule.** Photos are made legible with Ground gradients; nothing floats on a drop shadow.

## Shapes

Every corner is square (0px): buttons, inputs, checkboxes, cards, badges, icon buttons, step nodes, slide markers, mockup chrome and photo frames. Lines are 1px; slide markers and the E-bar glyph are 2px. The logo's gold arc is the only curve in the world and belongs to the logo and its large background echo behind heroes.

### Named Rules
**The Strak Rule.** Zero radius, everywhere. If a corner rounds, it is wrong.

## Components

### Buttons
Square and confident; the fill wipes rather than fades.
- **Shape:** square (0px); 40, 48, 56px tall for sm, md, lg with 16, 24, 32px side padding; weight 500, 0.01em tracking.
- **Primary:** Champagne fill, Ground text. On hover a Champagne Bright layer wipes in from the left (500ms) and the action glow appears.
- **Secondary:** transparent, Hairline Strong border, Chalk text; border and text turn Champagne on hover. Over photographs it takes a 30% Ground fill with a light blur.
- **Ghost:** text only, Chalk to Champagne.
- **Arrow:** optional trailing arrow (1.5 stroke) that slides out right while a twin slides in.
- **Focus:** 1px Champagne outline, 3px offset (Bronze on Paper).

### Chips / Badges
- **Style:** square, 24px tall, 1px border, uppercase label. Tones: neutral (Hairline Strong, Chalk), accent (Champagne at 60% border, Champagne Wash fill, Champagne text), success (Signal Green), muted (Hairline, Chalk Muted).

### Cards / Containers
- **Corner Style:** square (0px).
- **Background:** Board on dark; Paper with Paper Line rules on the paper band.
- **Shadow Strategy:** none; see Elevation & Depth.
- **Border:** 1px Hairline (Paper Line on paper). Paper step cards tint 3% Paper Ink on hover and draw a 2px Champagne line across the top.

### Inputs / Fields
- **Style:** Board fill, 1px Hairline Strong border, square, 48px, 16px text and side padding. Labels above in body-small Chalk; optional fields say "Optioneel" in Chalk Muted; required fields carry a Champagne asterisk.
- **Focus:** border turns Champagne, fill steps to Board Raised; no glow.
- **Error / Disabled:** Signal Red border and message with a small alert icon, linked by aria-describedby; disabled at 50% opacity.
- **Checkbox:** 20px square, Champagne when checked.

### Navigation
- **Desktop:** uppercase 12px labels at 0.16em in 70% Chalk, full Chalk when active or hovered; hover draws a faint underline from the left, the active link carries a 1px Champagne underline that glides between items.
- **Mobile:** full-screen Ground panel revealed with a top-down clip wipe, large light links divided by hairlines, active link in Champagne, square 40px icon buttons.

### E-Bar Glyph (brand)
Three 2px bars, 12px wide, the middle one at 80%, taken from the logo's "E". Used in Champagne as the bullet for short feature lists (hero values, portal points). It replaces generic dots and checks.

### Hero Slideshow (signature)
Four kitchen photographs cross-fade (1.4s) every 6.5s, each easing from 108% to 100% scale over 9s. Below the copy, a hairline-ruled control row: a tabular "01 / 04" counter, one 2px marker per slide that fills Champagne from the left over the slide's duration, the slide caption in uppercase, and a square pause button. Autoplay and zoom stop under reduced motion.

### Process Stepper (signature)
Nine phases. From xl, a horizontal rail of nine columns: an 11px square node with a Champagne border on a Hairline Strong line that draws in, the tabular Champagne step number, the title with a small muted icon, and a short muted summary. Below xl, a vertical rail with the same nodes and the number set inline before the title.

### Portal Dashboard Mockup (signature)
A static, explicitly labelled preview ("Voorbeeldweergave") of the customer portal in a Board frame with a Hairline Strong border: window bar with three square dots, a sidebar (tabs on mobile) with a 1px Champagne active marker, project rows with a nine-segment phase bar (completed segments 45% Chalk, current segment Champagne) and a status badge, and a design-approval card with a render photo, version tag and two square actions, "Opmerking plaatsen" (outline) and "Akkoord geven" (Champagne). The row awaiting approval is highlighted with Champagne Wash and a 1px Champagne left edge.

### Photo Bands
Inner page heroes and the closing CTA strip sit on a full-bleed photograph under Ground gradients (the CTA photo additionally at 45% opacity). The CTA strip holds one Title line and one primary button.

## Do's and Don'ts

### Do:
- **Do** keep every corner square (0px), including nodes, markers, badges, photo frames and focus states.
- **Do** lead with photography: darken it with Ground gradients from the left and the bottom so type clears contrast.
- **Do** give each page exactly one Paper band, with Paper Ink text, Paper Muted support and Bronze for small accent text and links.
- **Do** reserve Champagne on dark for the primary action, current state, progress and the logo arc.
- **Do** use the E-bar glyph for short brand bullet lists and slide markers.
- **Do** set headlines in Outfit 300 with negative tracking and line-height 1.05 to 1.1, and every step number or counter in tabular figures.
- **Do** keep motion short and quiet: fades with a 16px lift (600ms), heading clip wipes (800ms), all on cubic-bezier(0.16, 1, 0.3, 1); let headings wait for the font, at most 700ms.
- **Do** stop the slideshow autoplay and slow zoom and collapse transitions under prefers-reduced-motion.
- **Do** write copy without em-dashes; use a colon, comma or full stop.
- **Do** keep all imagery in one config so placeholders can be swapped for the client's own photographs.

### Don't:
- **Don't** round any corner or use pill shapes.
- **Don't** set Champagne text on Paper; it fails contrast.
- **Don't** add a second Paper band to a page.
- **Don't** add shadows to resting surfaces; the action glow on the primary button hover is the only shadow.
- **Don't** set headlines heavier than 300 or with leading looser than 1.1.
- **Don't** swap Outfit for a serif display face, even where photographic references use one.
- **Don't** introduce a second accent hue; Signal Green and Signal Red are status only.
- **Don't** use long staggered delays, word-by-word reveals or spring easing.
