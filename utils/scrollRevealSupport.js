import gsap from 'gsap';

export function prefersReducedMotion() {
  if (typeof window === 'undefined') return true;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Large screens (lg+), no reduced motion: run GSAP scroll reveals.
 * Below 1024px or reduced motion: keep content visible without ScrollTrigger.
 */
export function isScrollRevealDesktop() {
  if (typeof window === 'undefined') return false;
  if (prefersReducedMotion()) return false;
  return window.matchMedia('(min-width: 1024px)').matches;
}

/**
 * Lenis smooth scroll: wide viewports with fine pointer (mouse / trackpad).
 * Excludes touch-first phones/tablets. Touchscreen laptops usually match (hover: hover).
 */
export function shouldEnableLenis() {
  if (typeof window === 'undefined') return false;
  if (prefersReducedMotion()) return false;
  if (!window.matchMedia('(min-width: 1024px)').matches) return false;
  if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
    return false;
  }
  return true;
}

/**
 * @returns {boolean} true if scroll-based reveals were skipped
 */
export function skipScrollRevealAnimations(root, extraSelectors = []) {
  if (!root || isScrollRevealDesktop()) return false;
  const selectors = ['.staggered-reveal', ...extraSelectors];
  for (const sel of selectors) {
    const nodes = root.querySelectorAll(sel);
    if (nodes.length) {
      gsap.set(nodes, { opacity: 1, y: 0 });
    }
  }
  return true;
}
