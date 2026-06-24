# DESIGN.md — Warm Editorial, Elevated

The design system for lifting the portfolio from "competent" to "high-end". Every section change
should align to this. Goal: cohesive, smooth, intentional — never "AI made that".

## Color (committed — do not reinvent)
Tokens live in `styles/globals.scss` (`:root` / `.dark`). Use the CSS variables, never new hardcoded hex.
- Light: `--bg-primary #f7f4ef` · `--bg-secondary #fdfbf7` · `--bg-tertiary #efe9e0` ·
  ink `--text-primary #1a1410` · `--text-secondary #3d3530` · accent `--accent-light #c8860a`.
- Dark: bg `#000` · ink `#fff` · accent `--accent-light #efc041`.
- Gold is an **accent** (≤10% of surface), not a wash. No gradient text as decoration.
- Body text must hit ≥4.5:1. Avoid muted gold/gray body copy on tinted bg.

## Typography
- Families already wired: **Calibre** (sans, `--font-calibre`) + **JetBrains Mono** (`--font-jetbrains-mono`)
  via `_app.js` + Tailwind `font-sans`/`font-mono`. **Remove the Poppins override** in globals.scss so the
  intended typeface actually renders — that swap alone reads as more "designed".
- Display headings: fluid `clamp()`, ceiling ~`clamp(2rem, 6vw, 4.5rem)`, letter-spacing ≥ -0.03em,
  `text-wrap: balance`. Body: `text-wrap: pretty`, line length 60–75ch.
- Mono is for labels / kickers / metadata only — supports the "precise" voice. Don't overuse.

## Motion (the smoothness contract)
- **One curve to rule reveals:** `EASING_PRIMARY = [0.22, 1, 0.36, 1]` (ease-out-expo). Already in
  `lib/motionVariants.js`. **No springs with bounce, no elastic** on reveals.
- Standardize section entrances on `RevealStagger` / `RevealItem` / `RevealFade` (`components/ui/Reveal.js`).
  Retire ad-hoc `x:-100/100` slide-ins and the old `utils/animationVariants.js` springs.
- Reveal = enhance an already-visible default (fade + small `y`, optional blur on `full` tier). Never
  leave content gated invisible if motion doesn't fire. **No content should pulse/dim on scroll** (kills
  the About scroll-flicker).
- Premium materials allowed when they earn it: blur, soft shadow/glow, clip-path, mask — kept 60fps.
- Every motion path has a `prefers-reduced-motion` fallback (already handled via `reduced` tier).

## Layout & rhythm
- Container: `.section-container` (`max-w-[1400px]`, responsive padding). Keep one rhythm.
- Vary vertical spacing for cadence; don't repeat one identical section shell.
- Flex for 1D, Grid for 2D. Responsive grids: `repeat(auto-fit, minmax(280px, 1fr))`.

## Anti-slop guardrails (this brief is in the "warm editorial" AI lane — stay out of the cliché)
- No tiny uppercase tracked **eyebrow above every section** ("ABOUT", "PROJECTS"…). One deliberate
  cadence, not a reflex on every heading. (About currently has "ABOUT ME" — rework.)
- No `01 / 02 / 03` numbered section markers as scaffolding.
- No side-stripe (thick `border-left`) accents. No decorative gradient text. No decorative glassmorphism.
- No identical icon+heading+text card grids repeated endlessly.

## Cleanup debt (root causes of "messy / not professional")
- `styles/globals.scss` is ~2,900 lines, much of it `!important` attribute-selector light-mode patches.
  Migrate toward token-driven styles; shrink the override pile over time.
- One font system (Calibre/JetBrains), not Poppins + Calibre fighting.
