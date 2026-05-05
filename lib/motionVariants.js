/**
 * Shared Framer Motion variants and viewport defaults.
 * Use with Reveal components or LazyMotion `m` primitives.
 */

/** Consistent durations (seconds) */
export const DURATION = {
  fast: 0.3,
  normal: 0.5,
  slow: 0.8,
};

/** Primary product curve — Apple / Linear-style deceleration */
export const EASING_PRIMARY = [0.22, 1, 0.36, 1];

export const defaultViewport = {
  once: true,
  margin: '-100px',
  amount: 0.2,
};

/** Section / group: orchestrates staggered children */
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.06,
    },
  },
};

/** Premium stagger — slightly more deliberate hierarchy */
export const staggerContainerPremium = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.08,
    },
  },
};

/** Tablet: shorter stagger so sections don’t feel “stuck” waiting on children */
export const staggerContainerTablet = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.03,
    },
  },
};

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.normal, ease: EASING_PRIMARY },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATION.normal, ease: EASING_PRIMARY },
  },
};

/** Large screens: depth + clarity reveal (blur resolves) */
export const fadeUpPremium = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.96,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.7,
      ease: EASING_PRIMARY,
    },
  },
};

/** Tablets / small laptops: spring physics, no blur (perf + clarity) */
export const fadeUpPremiumLite = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 380,
      damping: 32,
      mass: 0.9,
    },
  },
};

/** `md`–`lg` tablets only: short travel, tween (no spring “bounce”, avoids stuck layouts) */
export const fadeUpTablet = {
  hidden: {
    opacity: 0,
    y: 14,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, ease: EASING_PRIMARY },
  },
};

export const fadeInTablet = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.35, ease: EASING_PRIMARY },
  },
};

export const fadeInPremium = {
  hidden: {
    opacity: 0,
    scale: 0.98,
    filter: 'blur(6px)',
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: DURATION.slow, ease: EASING_PRIMARY },
  },
};

export const fadeInPremiumLite = {
  hidden: { opacity: 0, scale: 0.99 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 360,
      damping: 30,
    },
  },
};

/** prefers-reduced-motion: keep layout, skip motion */
export const instantVisible = {
  hidden: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0 } },
};

export const instantStaggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0, delayChildren: 0 } },
};

export function pickFadeUpVariant(tier) {
  if (tier === 'reduced') return instantVisible;
  if (tier === 'full') return fadeUpPremium;
  if (tier === 'tablet') return fadeUpTablet;
  return fadeUpPremiumLite;
}

export function pickFadeInVariant(tier) {
  if (tier === 'reduced') return instantVisible;
  if (tier === 'full') return fadeInPremium;
  if (tier === 'tablet') return fadeInTablet;
  return fadeInPremiumLite;
}

export function pickStaggerContainer(tier) {
  if (tier === 'reduced') return instantStaggerContainer;
  if (tier === 'tablet') return staggerContainerTablet;
  return staggerContainerPremium;
}
