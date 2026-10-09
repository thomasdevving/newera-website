---
name: Studio NewEra
description: Kitchens for professional builders, shown as a construction planning on a near-black board.
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
  hairline: "rgba(245, 243, 239, 0.1)"
  hairline-strong: "rgba(245, 243, 239, 0.2)"
  signal-green: "#6fbf8e"
  signal-red: "#e07a6b"
typography:
  display:
    fontFamily: "Outfit, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 7.4vw, 6rem)"
    fontWeight: 300
    lineHeight: 0.98
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Outfit, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 4.2vw, 3.75rem)"
    fontWeight: 300
    lineHeight: 1.05
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Outfit, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 3vw, 2.5rem)"
    fontWeight: 300
    lineHeight: 1.25
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
    lineHeight: 1.6
  label:
    fontFamily: "Outfit, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    letterSpacing: "0.28em"
  data:
    fontFamily: "Outfit, ui-sans-serif, system-ui, sans-serif"
    fontSize: "11px"
    fontWeight: 400
    letterSpacing: "0.08em"
    fontFeature: "\"tnum\""
rounded:
  none: "0px"
spacing:
  gutter-sm: "16px"
  gutter-md: "40px"
  gutter-xl: "56px"
  section-compact: "80px"
  section: "128px"
  section-xl: "140px"
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
  phase-node:
    backgroundColor: "{colors.ground}"
    rounded: "{rounded.none}"
    size: "11px"
  phase-node-passed:
    backgroundColor: "{colors.champagne}"
---

# Design System: Studio NewEra

## Overview

**Creative North Star: "The Bouwplanning"**

The whole system is a construction schedule pinned to a dark wall. Week columns, phase rows, flat bars and square nodes are not decoration on top of the page; they are the page's grammar. Being on schedule is shown, never claimed: a gold "vandaag" line crossing a planning says more than any slogan.

The surface is a near-black ground with off-white type set large and light, divided by 1px hairlines. Champagne gold is the one voice and it marks only what is live: the primary action, the active phase, today, small functional icons and the logo arc. Everything is cut square; the user asked for a site "zo strak mogelijk", with as few soft edges as possible, and the build carries zero corner radius everywhere.

Motion behaves like a plan being set out: lines draw from left to right, words rise out of a mask as if being typeset, and everything decelerates on one exponential ease-out. Motion is medium to heavy by request, and always yields to reduced-motion preferences.

**Key Characteristics:**
- Near-black ground, off-white light type, champagne gold reserved for what is live.
- Planning-board grammar: week columns, phase rows, flat bars, square nodes, tabular week numbers.
- 1px hairlines at 10% off-white as the only structure; no shadows at rest.
- Zero corner radius on every element.
- Drawn lines, masked word reveals, one exponential ease-out.

## Colors

A monochrome near-black and chalk palette with a single champagne gold accent that means "active" or "act here".

### Primary
- **Champagne** (champagne): primary button fill, the active phase bar, the "vandaag" line and its tag, passed timeline nodes and the scroll-filled timeline spine, the active nav underline, focus outline, selection, checked checkboxes, required-field asterisks, small phase icons and functional labels. It is the logo's arc colour, pinned by the brief.
- **Champagne Bright** (champagne-bright): only the hover wipe on the primary button; never a resting colour.
- **Champagne Wash** (champagne-wash): the fill of the accent badge, behind champagne text.

### Neutral
- **Ground** (ground): the page, html background, theme colour.
- **Board** (board): cards, form controls, autofill fill; one step lifted from the ground.
- **Board Raised** (board-raised): focused form controls.
- **Chalk** (chalk): headings, body copy on emphasis, completed phase text.
- **Chalk Muted** (chalk-muted): intros, supporting copy, inactive nav, field hints.
- **Chalk Faint** (chalk-faint): week numbers, row indices and other planning metadata.
- **Hairline** (hairline): every divider, row rule, card border, section rule and the week-column texture.
- **Hairline Strong** (hairline-strong): borders of interactive controls (secondary button, inputs, checkbox, icon buttons) and planned-but-not-started bars.

### Tertiary (status only)
- **Signal Green** (signal-green): success badges and form success states.
- **Signal Red** (signal-red): invalid control borders and error messages.

### Named Rules
**The Live Gold Rule.** Champagne marks only what is active, current or actionable. If an element is neither the next action nor the current state, it is chalk or hairline.

**The One Wipe Rule.** Champagne Bright exists only as the hover wipe inside the primary button.

## Typography

**Display Font:** Outfit (with ui-sans-serif, system-ui)
**Body Font:** Outfit
**Label/Mono Font:** Outfit with tabular numerals for weeks and phase numbers

**Character:** A single geometric sans whose single-storey forms echo the NewEra wordmark. Headlines are set light and large with tight negative tracking; weight carries almost no hierarchy, size does.

### Hierarchy
- **Display** (display): the home hero headline only, max ~13ch, word-by-word masked reveal.
- **Headline** (headline): section and page headings, max ~20ch, masked reveal on scroll.
- **Title** (title): phase titles in the timeline, large mobile menu items, panel headings.
- **Body** (body): running copy and hero subtext, max 52 to 60ch, muted for intros. Larger intros step up to 18 to 20px.
- **Body Small** (body-small): field labels, definition lists, secondary button text.
- **Label** (label): uppercase, wide-tracked functional labels: figure captions such as the planning caption, footer column headings, the form summary heading, badges (at 11px, 0.12em) and the "vandaag" tag (10px, 0.14em). The client brief also pins this style, in Champagne with a short 1px rule, as the section label: the hero line "Keukens voor professionals" and the left-rail label of SectionHeader and PageHero. That use is a brief commitment, not drift.
- **Data** (data): week numbers, row indices and phase numbers, always tabular, in Chalk Faint.

### Named Rules
**The Light Headline Rule.** Headings are weight 300 with negative tracking. Weight 500 is reserved for buttons and labels. Only weights 300, 400 and 500 are loaded.

**The Tabular Week Rule.** Every week number, phase number and count is set with tabular numerals so columns align like a schedule.

## Layout

A single framed container (max 1360px) with gutters of 16, 24, 40 and 56px from mobile to extra-wide. Sections breathe on a long vertical rhythm (96px, 128px, then 140px on wide screens; 64 to 80px for compact bands), optionally opened by a 1px top rule. The header is fixed at 72px, transparent at the top, then solid ground at 80% with blur and a hairline once scrolled; it tucks away on downward scroll.

Section openings use a 12-column split: a narrow left rail (3 columns) and heading plus intro on the right (9 columns), preceded by a drawn hairline. Planning content uses a fixed label column followed by proportional week columns; the faint week-column texture (1px hairlines at an even column count, 16 in the hero, 6 in the mobile menu) can run behind content to tie it to the schedule. On narrow screens week labels thin out (every fourth, then every second) rather than shrinking.

### Named Rules
**The Schedule Grid Rule.** Things that represent time sit on columns that represent weeks; nothing time-related floats free of the grid.

## Elevation & Depth

Flat. Depth comes from tonal steps (ground, board, board raised) and 1px hairlines, never from shadows at rest. The single shadow in the system is a soft gold glow under the primary button on hover, a state response rather than an elevation level.

### Shadow Vocabulary
- **Action glow** (`box-shadow: 0 8px 28px -12px rgba(201,166,107,0.75)`): primary button hover only.

### Named Rules
**The Flat Board Rule.** Surfaces are flat at rest; separate them with a tonal step or a hairline, not a shadow.

## Shapes

Every corner is square (0px): buttons, inputs, checkboxes, cards, badges, icon buttons, timeline nodes and planning bars. Bars are flat rectangles (8 to 10px tall); nodes are 11px squares that fill gold and scale up when passed. Lines are 1px. The logo's gold arc is the only curve in the world, and it belongs to the logo and its large background echo, not to UI chrome.

### Named Rules
**The Strak Rule.** Zero radius, everywhere. If a corner rounds, it is wrong.

## Components

### Buttons
Square, confident, and drawn rather than faded.
- **Shape:** square corners (0px); heights 40, 48, 56px for sm, md, lg with 16, 24, 32px side padding.
- **Primary:** Champagne fill, Ground text, weight 500, 0.01em tracking. On hover a Champagne Bright layer wipes in from the left (scaleX, 500ms ease-out) and the action glow appears.
- **Secondary:** transparent with a Hairline Strong border and Chalk text; border and text turn Champagne on hover.
- **Ghost:** text only, Chalk to Champagne on hover.
- **Arrow:** an optional trailing arrow (1.5 stroke) slides out right while a twin slides in from the left.
- **Focus:** 1px Champagne outline, 3px offset (global).

### Chips / Badges
- **Style:** square, 24px tall, 1px border, 11px uppercase label at 0.12em. Tones: neutral (Hairline Strong border, Chalk), accent (Champagne at 60% border, Champagne Wash fill, Champagne text), success (Signal Green), muted (Hairline border, Chalk Muted).

### Cards / Containers
- **Corner Style:** square (0px).
- **Background:** Board.
- **Shadow Strategy:** none; see Elevation & Depth.
- **Border:** 1px Hairline.

### Inputs / Fields
- **Style:** Board fill, 1px Hairline Strong border, square, 48px tall, 16px text, 16px side padding. Labels sit above in body-small Chalk; optional fields say "Optioneel" in Chalk Muted, required ones carry a Champagne asterisk.
- **Focus:** border turns Champagne and the fill steps up to Board Raised; no glow.
- **Error / Disabled:** Signal Red border and message with a small alert icon, linked by aria-describedby; disabled at 50% opacity.
- **Checkbox:** 20px square, fills Champagne when checked with a Ground check that scales in.

### Navigation
- **Desktop:** 14px Chalk Muted links at 0.02em; hover draws a 1px Chalk underline from the left; the active link gets a 1px Champagne underline that glides between items.
- **Mobile:** a full-screen Ground panel revealed top-down with a clip-path wipe, faint week columns behind, large light links divided by hairlines, active link in Champagne, square 40px icon buttons.

### Planning Board (signature)
A figure with a hairline caption bar, a tabular week header and nine phase rows. Completed bars are Chalk at 25%, the active bar is a Champagne outline filling with Champagne to today's position, planned bars are Hairline Strong outlines, and the final open-ended phase is dashed. Bars draw in left to right in sequence, then the 1px Champagne "vandaag" line slides into place with a small square Champagne tag.

### Phase Tracker (signature)
A nine-step rail of square nodes on a hairline track with a Champagne progress line; it auto-advances and can be stepped by the visitor. On the long timeline the spine fills Champagne with scroll and each square node lights and scales as it is passed, with a large faint phase numeral turning gold opposite.

## Do's and Don'ts

### Do:
- **Do** keep every corner square (0px), including nodes, bars, badges and focus states.
- **Do** separate surfaces with 1px hairlines at 10% off-white (Hairline) and use Hairline Strong only on interactive controls.
- **Do** reserve Champagne for the primary action, the active or passed phase, today, small functional icons, functional labels and the logo arc.
- **Do** set headlines in Outfit 300 with negative tracking, and every week or phase number in tabular figures.
- **Do** animate by drawing: scaleX from the left for lines and bars, masked word reveals for headings, all on cubic-bezier(0.16, 1, 0.3, 1).
- **Do** stop marquees and pulses and collapse transitions under prefers-reduced-motion.
- **Do** write copy without em-dashes; use a colon, comma or full stop.

### Don't:
- **Don't** round any corner or use pill shapes.
- **Don't** add shadows to resting surfaces; the action glow on the primary button hover is the only shadow.
- **Don't** use Champagne for decoration, large fills or body text.
- **Don't** set headlines heavier than 300; hierarchy comes from size, not weight.
- **Don't** introduce a second accent hue; Signal Green and Signal Red are status only.
- **Don't** use spring or bouncy easing; everything decelerates exponentially.
