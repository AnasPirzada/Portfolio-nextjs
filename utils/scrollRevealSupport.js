import { VIEWPORT } from '@/constants/viewport';
import gsap from 'gsap';

export function prefersReducedMotion() {
  if (typeof window === 'undefined') return true;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Large screens (lg+), no reduced motion: run GSAP scroll reveals.
 * Below lg or reduced motion: keep content visible without ScrollTrigger.
 */
export function isScrollRevealDesktop() {
  if (typeof window === 'undefined') return false;
  if (prefersReducedMotion()) return false;
  if (typeof window.innerWidth === 'number') {
    if (window.innerWidth < VIEWPORT.MIN_COMFORTABLE_WIDTH) return false;
  }
  return window.matchMedia(`(min-width: ${VIEWPORT.LG}px)`).matches;
}

/**
 * Lenis smooth scroll: laptop/desktop-class viewports with hover-capable pointers.
 * Skips phones, tablets, watches (ultra-narrow), and touch-first coarse pointers.
 */
export function shouldEnableLenis() {
  if (typeof window === 'undefined') return false;
  if (prefersReducedMotion()) return false;
  if (
    typeof window.innerWidth === 'number' &&
    window.innerWidth < VIEWPORT.MIN_COMFORTABLE_WIDTH
  ) {
    return false;
  }
  if (!window.matchMedia(`(min-width: ${VIEWPORT.LG}px)`).matches) return false;
  if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
    return false;
  }
  return true;
}

/**
 * In-page scroll that respects Lenis when active (avoids fighting native smooth-scroll).
 */
export function scrollToElementSmooth(element, options = {}) {
  if (!element || typeof window === 'undefined') return;
  const { offset = 0 } = options;
  const lenis = window.lenis;
  if (lenis && typeof lenis.scrollTo === 'function') {
    lenis.scrollTo(element, { offset });
    return;
  }
  element.scrollIntoView({
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
  });
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
