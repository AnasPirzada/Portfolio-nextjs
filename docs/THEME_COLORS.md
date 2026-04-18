# Light & dark theme — color reference

This document lists **every theme-related color token** defined in configuration and global styles for this project, plus **fixed brand / utility colors** used alongside the theme. The app uses **`darkMode: 'class'`** (Tailwind): the `<html>` element gets the class **`dark`** for dark mode; without it, light-mode CSS variables apply.

**Runtime:** `contexts/ThemeContext.js` — default saved theme is **`dark`**; `localStorage` key **`theme`**. Toggle applies/removes `document.documentElement.classList('dark')` and sets `data-theme`. The circular reveal overlay uses **`#0a0a0a`** (switching to dark) or **`#f8f8f8`** (switching to light) — not the same as final page background in all cases.

---

## 1. CSS custom properties (`styles/globals.scss`)

These drive `body` background/text and utility classes like `.text-adaptive-primary`, `.bg-adaptive-secondary`, `.text-accent`, etc.

| Token | Light (`:root`) | Dark (`.dark`) |
|-------|-----------------|----------------|
| `--bg-primary` | `#fafafa` | `#000000` |
| `--bg-secondary` | `#ffffff` | `#0a0a0a` |
| `--bg-tertiary` | `#f5f5f5` | `#1a1a1a` |
| `--text-primary` | `#121212` | `#ffffff` |
| `--text-secondary` | `#2b2b2b` | `#d0d0d0` |
| `--text-muted` | `#7a7a7a` | `#a0a0a0` |
| `--border-color` | `#e6e6e6` | `#1f1f1f` |
| `--card-bg` | `#ffffff` | `#0a0a0a` |
| `--card-border` | `#e6e6e6` | `#1a1a1a` |
| `--accent-light` | `#efc041` | `#efc041` |
| `--accent-dark` | `#eeba2c` | `#eeba2c` |
| `--shadow-color` | `rgba(0, 0, 0, 0.1)` | `rgba(0, 0, 0, 0.5)` |

**Same in both modes:** accent gold **`#efc041`**, accent amber **`#eeba2c`**.

---

## 2. Tailwind theme colors (`tailwind.config.js`)

The config **replaces** the default Tailwind color palette at `theme.colors`. Anything listed here is available as utilities (e.g. `bg-yellow`, `text-gray-light-1`, `border-light-border`).

| Token | Hex | Notes |
|-------|-----|--------|
| `transparent` | transparent | |
| `current` | currentColor | |
| `white` | `#ffffff` | |
| `black` | `#000000` | |
| `yellow` | `#efc041` | Primary gold |
| `red` | `#cf0000` | |
| `green` | `#00ac56` | |
| `GoldenGlow.light` | `#efc041` | |
| `GoldenGlow.dark` | `#eeba2c` | |
| `gray.light.1` | `#f5f5f5` | |
| `gray.light.2` | `#e6e6e6` | |
| `gray.light.3` | `#b0b0b0` | |
| `gray.light.4` | `#7a7a7a` | |
| `gray.dark.1` | `#323133` | |
| `gray.dark.2` | `#242225` | |
| `gray.dark.3` | `#1e1b20` | |
| `gray.dark.4` | `#1a171e` | |
| `gray.dark.5` | `#120e16` | |
| `light.bg` | `#fafafa` | |
| `light.surface` | `#ffffff` | |
| `light.text.primary` | `#121212` | |
| `light.text.secondary` | `#2b2b2b` | |
| `light.border` | `#e6e6e6` | |
| `dark.bg` | `#000000` | |
| `dark.surface` | `#1a1a1a` | |
| `dark.text.primary` | `#ffffff` | |
| `dark.text.secondary` | `#aaaaaa` | |
| `dark.border` | `#1f1f1f` | |

**Note:** Many components also use Tailwind’s **default** scale utilities such as `gray-300`, `gray-400`, `gray-900`, `neutral-50`, `emerald-500`, etc. Those come from Tailwind’s **default palette** when those classes are generated (see section 7).

---

## 3. Footer cinematic scope (`components/ui/motion-footer.jsx` — `FOOTER_CINEMATIC_CSS`)

Theme is selected with **`.dark`** vs **`html:not(.dark)`** (light).

| Element / effect | Light (`html:not(.dark)`) | Dark (`.dark`) |
|------------------|----------------------------|----------------|
| `.footer-bg-grid` line color | `rgba(0, 0, 0, 0.06)` | `rgba(239, 192, 65, 0.06)` |
| `.footer-aurora` radial | Gold/amber tints `rgba(239,192,65,0.22)`, `rgba(238,186,44,0.12)` | Softer `0.14` / `0.08` gold |
| `.footer-glass-pill` background | `linear-gradient(145deg, rgba(255,255,255,0.85) 0%, rgba(250,250,250,0.65) 100%)` | `linear-gradient(145deg, rgba(255,255,255,0.06) …)` |
| `.footer-glass-pill` border | `rgba(0, 0, 0, 0.08)` | `rgba(239, 192, 65, 0.18)` |
| `.footer-glass-pill:hover` border | `rgba(239, 192, 65, 0.5)` | `rgba(239, 192, 65, 0.45)` |
| `.footer-giant-bg-text` stroke + fill gradient | Stroke `rgba(0,0,0,0.08)`, gradient from `rgba(0,0,0,0.06)` | Stroke `rgba(239,192,65,0.12)`, gradient from `rgba(255,255,255,0.07)` |
| `.footer-text-glow` text gradient | `#111` → `rgba(17,17,17,0.65)` | `#fff` → `rgba(255,255,255,0.55)` |

**Shared (both modes):** grid mask, heartbeat `rgba(239,192,65,0.35–0.55)`, glass pill shadows with `rgba(0,0,0,0.45)` and gold highlights.

**Footer page background (Tailwind in `Footer.js`):**  
`from-neutral-50 via-white to-neutral-100` (light) · `dark:from-black dark:via-gray-950 dark:to-black` (dark).

---

## 4. Accessibility (`styles/accessibility.css`)

| Usage | Color |
|-------|--------|
| `:focus-visible` outline | `#efc041` |
| `.skip-to-content` background | `#000000` |
| `.skip-to-content` text | `#ffffff` |
| `.skip-to-content` border | `#efc041` |

(Not switched by `.dark` — high-contrast helpers.)

---

## 5. Calendly & third-party overrides (`styles/globals.scss`)

Hardcoded for embed styling (mostly dark UI + gold accents):

| Item | Colors |
|------|--------|
| Overlay backdrop | `rgba(0, 0, 0, 0.9)`, blur |
| Popup shell | Gradient `#000000` → `#1a1a1a`, borders `rgba(239, 192, 65, 0.2–0.3)`, shadows with gold |
| iframe border / glow | `rgba(239, 192, 65, 0.3)`, inner glow gold |
| Buttons / highlights | `#efc041`, `#fff`, `#000` |
| CSS variables | `--calendly-primary-color: #efc041`, `--calendly-text-color: #ffffff`, `--calendly-background-color: #000000` |

Light-mode overrides in the same file use gradients like **`#ffffff` → `#f8f8f8`** and dark text gradients **`#1a1a1a`** with **`#efc041` / `#eeba2c`** for accents (search `globals.scss` for `.light` / `html:not(.dark)` Calendly blocks).

---

## 6. Other global SCSS (`styles/globals.scss`)

Additional **non-variable** hex/rgba appears in:

- **Menu / navigation** (e.g. `#eeba2c`, `#efc041`, `#f97822`, `#fdbb2f`, `#ffdeaa`, `#f4faff`, gradients mixing gold/orange/cream).
- **Tap highlight:** `-webkit-tap-highlight-color: #000000`.
- **Toasts / outlines:** `#efc041`, `#eeba2c`, `#fff`, `#000`.

These are **component-style blocks** inside the global SCSS file; they align with the gold palette but are not all duplicated for light/dark — see file for full list.

---

## 7. Tailwind default palette utilities (used in JSX)

Components frequently use classes like **`text-gray-400`**, **`bg-gray-900`**, **`neutral-50`**, **`emerald-500`**, **`bg-black/30`**, etc. Those map to **Tailwind’s default color scales** (not the custom `theme.colors` table in section 2). Reference for the **gray** scale (Tailwind v3 style):

| Name | Approximate hex |
|------|-----------------|
| gray-50 | `#f9fafb` |
| gray-100 | `#f3f4f6` |
| gray-200 | `#e5e7eb` |
| gray-300 | `#d1d5db` |
| gray-400 | `#9ca3af` |
| gray-500 | `#6b7280` |
| gray-600 | `#4b5563` |
| gray-700 | `#374151` |
| gray-800 | `#1f2937` |
| gray-900 | `#111827` |
| gray-950 | `#030712` |

**Neutral** scale is similar (slightly warmer grays). Use Tailwind docs or your generated `out.css` for exact values if you customize.

---

## 8. Skill tooltip brand colors (not theme tokens)

`components/Skills/Skills.js` — `SKILL_COLORS`: fixed **brand** backgrounds for tooltips (same in light and dark; text may adapt via `isDark` in component).

| Key | Background | Text |
|-----|------------|------|
| html | `#E34F26` | `#FFFFFF` |
| css | `#1572B6` | `#FFFFFF` |
| javascript | `#F7DF1E` | `#000000` |
| typescript | `#3178C6` | `#FFFFFF` |
| react | `#61DAFB` | `#000000` |
| nextjs | `#1a1a1a` | `#FFFFFF` |
| nodejs | `#339933` | `#FFFFFF` |
| git | `#F05032` | `#FFFFFF` |
| sass | `#CC6699` | `#FFFFFF` |
| tailwindcss | `#06B6D4` | `#FFFFFF` |
| mongodb | `#47A248` | `#FFFFFF` |
| mysql | `#4479A1` | `#FFFFFF` |
| firebase | `#FFCA28` | `#000000` |
| figma | `#F24E1E` | `#FFFFFF` |
| postman | `#FF6C37` | `#FFFFFF` |
| redux | `#764ABC` | `#FFFFFF` |
| gsap | `#88CE02` | `#000000` |
| webpack | `#8DD6F9` | `#000000` |
| vite | `#646CFF` | `#FFFFFF` |
| framer-motion | `#0055FF` | `#FFFFFF` |
| django | `#0d4a2a` | `#FFFFFF` |
| laravel | `#FF2D20` | `#FFFFFF` |
| chakra-ui | `#319795` | `#FFFFFF` |
| antdesign | `#0170FE` | `#FFFFFF` |
| sanity-io | `#F03E2F` | `#FFFFFF` |
| emailjs | `#EA4335` | `#FFFFFF` |
| styledcomponents | `#DB7093` | `#FFFFFF` |
| tanstack-query | `#FF4154` | `#FFFFFF` |
| Turborepo | `#EF4444` | `#FFFFFF` |
| ShadcnUi | `#1a1a1a` | `#FFFFFF` |
| default | `#efc041` | `#000000` |

---

## 9. Arbitrary hex used widely in components

Repeated **gold / amber** accents (both modes, often with `dark:` variants):

| Hex | Typical use |
|-----|-------------|
| `#efc041` | Primary gold — buttons, borders, glows |
| `#eeba2c` | Secondary amber — gradients, hover |
| `rgba(239, 192, 65, x)` | Shadows, borders, overlays |

---

## 10. Quick summary

| Role | Light | Dark |
|------|--------|------|
| Page background | `#fafafa` (CSS var) | `#000000` (CSS var) |
| Primary text | `#121212` | `#ffffff` |
| Muted text | `#7a7a7a` | `#a0a0a0` |
| Borders | `#e6e6e6` | `#1f1f1f` |
| Accent (shared) | `#efc041` / `#eeba2c` | same |

For **new UI**, prefer **CSS variables** from section 1 or **Tailwind tokens** from section 2 so light/dark stay consistent; use section 7 for standard `gray-*` / `neutral-*` utilities; reserve section 8 for technology brand colors only.

---

## Appendix A — Unique hex values in `styles/globals.scss` (beyond section 1)

These appear in **Calendly styling**, **mobile menu / sandwich navigation**, **`html:not(.dark)` light-mode bridges** (overriding dark-only arbitrary classes), and **component-specific fixes**. They are **not** all paired as “light theme” vs “dark theme” tokens — many are one-off overrides.

| Hex | Typical role in this file |
|-----|---------------------------|
| `#000000` | Pure black — text, backgrounds, tap highlight |
| `#0a0a0a` | Near-black surfaces (often overridden to white in light mode via attribute selectors) |
| `#092E20` | Django green (dark card; light override `#0d4a2a`) |
| `#121212` | Primary dark text on light surfaces |
| `#141414` | Dark panel (light: bridged to `#f8f8f8`) |
| `#1a1a1a` | Dark gray surfaces, gradients |
| `#1f1f1f` | Borders (dark) |
| `#2b2b2b` | Secondary body text on light |
| `#323133` | Matches `gray.dark.1` — labels |
| `#3a3a3a` | Muted headings on light |
| `#4a4a4a` | Muted text |
| `#5a5a5a` | Tertiary text |
| `#7a7a7a` | Muted (matches `--text-muted` light) |
| `#9a9a9a` | Placeholder-style text |
| `#d4a017` | Light-mode gold text substitute for `#efc041` / `#eeba2c` |
| `#e0e0e0` | Light borders |
| `#e6e6e6` | Borders (matches `--border-color` light) |
| `#e8e8e8` | Card borders (light) |
| `#eeba2c` | Accent amber |
| `#efc041` | Accent gold |
| `#f0f0f0` | Light gray fills |
| `#f4faff` | SCSS `$bg` — cool white for menu gradients |
| `#f5f5f5` | Light gray bg (matches `--bg-tertiary` light) |
| `#f8f8f8` | Off-white panels |
| `#fafafa` | Page light background |
| `#f97822` | Orange — menu accents |
| `#f88b42` | Orange — menu |
| `#fdbb2f` | Yellow — menu layers |
| `#ffdeaa` | Cream — menu shadows |
| `#ffffff` | White surfaces / text |

**Dark-only bridge examples:** `html:not(.dark)` rules map borders like `#e0e0e0`, `#e8e8e8`, backgrounds `#ffffff`, `#f8f8f8`, text `#121212` / `#2b2b2b`, etc., when components use dark arbitrary classes.

---

## Appendix B — `rgba` highlights (globals.scss, footer, Calendly)

Repeated alpha mixes (not exhaustive):

| Form | Usage |
|------|--------|
| `rgba(0, 0, 0, 0.1)` | Light shadow (`--shadow-color` light) |
| `rgba(0, 0, 0, 0.5)` | Dark shadow (`--shadow-color` dark) |
| `rgba(0, 0, 0, 0.8–0.95)` | Overlays, modal backdrop |
| `rgba(239, 192, 65, 0.06–0.5)` | Gold grid lines, borders, glows, focus |
| `rgba(238, 186, 44, 0.08–0.25)` | Amber glow |
| `rgba(255, 255, 255, 0.02–0.98)` | Glass pills, text on dark |

---

*Generated from `tailwind.config.js`, `styles/globals.scss`, `styles/accessibility.css`, `contexts/ThemeContext.js`, `components/ui/motion-footer.jsx`, `components/Skills/Skills.js`, and Tailwind default gray reference.*
