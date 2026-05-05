/**
 * Layout breakpoints aligned with Tailwind (`tailwind.config.js` uses default screens).
 * Use for Lenis, pinned GSAP sections, and custom cursor — not for every responsive tweak.
 */
export const VIEWPORT = Object.freeze({
  /** `lg:` — laptops, desktops, large tablets in landscape (1080p-class layouts) */
  LG: 1024,
  /** `md:` */
  MD: 768,
  /**
   * Viewports narrower than this (many watches, legacy tiny browsers) skip
   * “desktop layout” features entirely — native scroll and mobile patterns only.
   */
  MIN_COMFORTABLE_WIDTH: 320,
});
