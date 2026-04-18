# Projects section — design & motion (UI/UX reference)

This document describes the **homepage “Projects” block** (`components/Projects/Projects.js` + `components/Projects/ProjectTile/ProjectTile.js`) so designers can align mocks, motion specs, and handoff without reading the codebase. For global tokens, see [`THEME_COLORS.md`](./THEME_COLORS.md).

---

## 1. Role on the page

- **Position:** After **Skills**, before **TagLine** on the home page.
- **Purpose:** Showcase a **curated subset** of work (first **4** projects from the shared projects list), with a path to the full portfolio (`/projects`).
- **Personality:** Premium, calm, slightly cinematic — horizontal discovery on desktop, thumb-friendly carousel on small screens.

---

## 2. Information architecture

| Layer | Content | Notes |
|--------|---------|--------|
| Eyebrow | `PROJECTS` | All caps, spaced tracking — reads as a section label, not a headline. |
| Title | `My Projects` | Primary heading; uses the site **gradient text** utility (`.text-gradient`). |
| Supporting line | Short descriptive sentence | Medium weight; sets tone (“built with love…”). |
| Primary action | `View All Projects` | Button, links to `/projects`. |
| Project cards | One card per featured project | Image-led; title + tech stack on the image; whole card is the hit target (links to `/project/[slug]`). |

Cards do **not** repeat the long project description in this section — emphasis is **visual + title + tech**.

---

## 3. Layout & structure

### Section container

- Full width; on **large/desktop** the section can participate in a **pinned scroll** experience (see §6).
- Uses shared **`section-container`** + **`inner-container`** patterns for alignment with other sections.
- Optional **ambient decoration** (large screens only): two soft, blurred circles (accent-tinted, very low opacity) — left upper area and right lower area — to add depth without competing with content.

### Desktop (horizontal gallery)

- **Header block** (eyebrow, title, subtitle, button) stays in the normal document flow at the top of the section.
- **Project row** is a horizontal strip: cards sit in a **`project-wrapper`** that moves **left** as the user scrolls down, so vertical scroll **scrubs** horizontal position (see §6.2).
- Spacing between cards: roughly **`mr-10` → `mr-16`** from small breakpoints upward (tighter on `xs`, more air on `sm+`).

### Mobile / tablet (touch)

- No pin; the same row becomes a **horizontally scrollable** strip.
- **Snap scrolling:** `snap-x` + `snap-mandatory` + cards **`snap-center`** so each card settles cleanly.
- Cards use a **viewport-relative width** (e.g. ~85vw / 70vw) so peek of the next card invites swiping.
- Horizontal overflow is contained (`overscroll-behavior-x: contain`); scrollbars hidden for a clean look (users still scroll via touch).

### Vertical rhythm

- Gap between the header block and the card row scales with **viewport height** (e.g. larger top margin when `clientHeight > 650`).
- Bottom margin on the card row: **`mb-4`** up to **`md:mb-16`** so the next section breathes.

---

## 4. Typography (summary)

| Element | Approx. scale (Tailwind) | Character |
|---------|---------------------------|-----------|
| Eyebrow | `text-xs` → `md:text-base`, `uppercase`, `tracking-widest` | Muted gray (`text-gray-light-1`). |
| Title | `text-4xl` → `2xl:text-7xl`, `font-medium` | Gradient fill (brand). |
| Subtitle | `text-base` → `lg:text-2xl`, `font-medium` | Body emphasis; max-width constrained for line length. |
| Card title | `text-2xl` → `md:text-4xl`, `font-bold` | White on imagery; strong drop shadow for readability. |

---

## 5. Visual design — project cards (`ProjectTile`)

### Card shape & surface

- **Outer:** Rounded **`rounded-2xl`**, **`overflow-hidden`** on the inner “plate”.
- **Surface:** Light mode: white; dark mode: **`gray-dark-2`**.
- **Border:** Subtle **`gray-200`** / **`gray-dark-3`**.
- **Elevation:** Default shadow in the **`shadow-lg`** family; on interaction, shadow deepens (hover) and GSAP may push a heavier shadow (see §6.3).

### Hero image

- Fixed **height band** by breakpoint: roughly **`h-48` → `md:h-64`** (image is **background-cover**, centered).
- **Readability gradient** over the image: top-to-bottom fade from lighter to strong dark at the bottom (`from-black/90` via mid tones) so title and tech read on any photo.

### Per-project branding

Each project supplies a **two-stop gradient** (`gradient[0]`, `gradient[1]`). It is used for:

- Soft **radial glow** behind the card (blurred; follows cursor on desktop).
- **Hover** treatments: border tint, image overlay, CTA circle, optional title gradient on hover, tech strip accent, **shimmer** highlight.

So: **cards share one layout system**, but **color accent is data-driven** per project.

### Tech stack strip (“glass” chip row)

- Icons sit in a **single frosted strip**: light glass gradient, white border, inner highlight, soft shadow — reads as **UI glass** on top of the photo.
- Icons are small SVGs from `/projects/tech/{name}.svg`; up to **8** shown, then **`+N`** overflow label.

### CTA affordance

- **Arrow control** (top-right on image): circular, **gradient fill** from project colors, **-45°** arrow icon, appears on **group hover** (CSS) and is reinforced by motion on desktop (GSAP).

### Shimmer

- On hover, a **diagonal light band** sweeps across the card (subtle opacity ~20% on the shimmer layer) — “premium product” cue, not a loud glare.

---

## 6. Motion & interaction

### 6.1 Global motion system

- **Framer Motion** powers **scroll-into-view** reveals for the header and card row (`RevealStagger`, `RevealItem`, `RevealFade`).
- This section uses **`premium={false}`** on `RevealFade` for the cards — simpler **fade-up** (no blur/scale premium tier).
- Default reveal: **opacity 0 → 1**, **y: 28 → 0**, **duration 0.5s**, easing **`[0.22, 1, 0.36, 1]`** (deceleration curve). Viewport: **once**, with a **-100px** margin and **~20%** visibility threshold.
- **`prefers-reduced-motion: reduce`:** reveals skip to final state (no entrance animation).

### 6.2 Desktop — pinned horizontal scroll (GSAP ScrollTrigger)

When **`isDesktop`** is true:

1. The **section pins** while the user scrolls (`start: top top`, **scrub ~0.5** for smooth coupling).
2. Only the **`.project-wrapper`** translates on **X** from `0` to **`-scrollDistance`** (however far is needed to bring the last card into view).
3. **Scroll length** (how long the pin lasts) is derived from content width vs viewport, clamped so pacing feels comfortable (roughly between **~0.8×** and **2×** viewport height).
4. **Focal emphasis:** while scrolling, each card gets dynamic **scale**, **opacity**, and **brightness** based on distance from a **focal point** near **~36% of viewport width** — the card nearest that “lane” reads as **hero**; others slightly recede (scale roughly **0.9–1.02**, opacity **0.4–1**). This is **paused** if **`prefers-reduced-motion`** is on.

On leaving the section downward, the strip **stays at the end**; when re-entering from below, it **resets** to the start — avoids jarring jumps when scrolling back up.

### 6.3 Desktop — card micro-interactions (GSAP, pointer devices)

Disabled on **touch** or **reduced motion**. On **`mousemove`** / **`mouseenter`** / **`mouseleave`**:

| Effect | Intent | Approx. behavior |
|--------|--------|------------------|
| **3D tilt** | Tactile, premium | Card rotates subtly around X/Y (roughly **±8°** max), **1000px** perspective. |
| **Image parallax** | Depth | Hero image shifts slightly opposite to cursor and scales to **~1.05–1.08** on hover. |
| **Cursor-follow glow** | Brand color | Radial glow centers track pointer. |
| **Lift** | Affordance | Card shifts **up ~8px** on hover. |
| **Frame** | Focus | Border takes project gradient tint; shadow deepens (**~25px / 70px** spread class of shadow). |
| **Title** | Emphasis | Slight **upward nudge**; on hover, fill can animate to **project gradient text**. |
| **Arrow** | Call to action | Fades/scales in with a **back.out** overshoot. |
| **Tech icons** | Playful hierarchy | Staggered **scale / lift** with **back.out**. |
| **Shimmer** | Delight | Gradient streak moves **left → right** (`power2.inOut`), then resets off-screen on leave. |

**Initial load (all devices):** a short **timeline** fades the card and title up from below and staggers tech icons (`back.out` stagger) — unless reduced motion (then a simplified version still runs without hover).

### 6.4 Mobile / touch

- **No** 3D tilt or cursor glow — avoids jank and false expectations.
- **Horizontal swipe** is the primary navigation; snap keeps one card primary in view.
- Initial **entrance** animation still runs (or simplified if reduced motion).

---

## 7. Accessibility & usability notes

- **`select-none`** on the section avoids accidental text selection while scrubbing/dragging on desktop.
- **Reduced motion:** horizontal scrub and focal depth respect **`prefers-reduced-motion`**; Framer reveals also respect reduced motion.
- Cards are implemented as **links** — entire card is clickable; ensure future design changes preserve **large touch targets** on mobile.

---

## 8. Engineering touchpoints (for handoff)

| Concern | Where it lives |
|--------|----------------|
| Section scroll / pin | `components/Projects/Projects.js` (GSAP + ScrollTrigger) |
| Card visuals & hover | `components/Projects/ProjectTile/ProjectTile.js` + `ProjectTile.module.scss` |
| Scroll reveals | `components/ui/Reveal.js` + `lib/motionVariants.js` |
| Project data (gradients, images, tech) | Shared project constants / config (e.g. `constants` + project entries) |

---

## 9. One-line summary for mocks

**A gradient-labeled projects band with a strong typographic header, a single secondary CTA, and wide image-first cards in a horizontal gallery: on desktop, vertical scroll drives a pinned horizontal reel with a soft “focus” spotlight; on mobile, a snap carousel; each card uses its own two-color gradient for accents, glass tech strip, and hover polish.**
