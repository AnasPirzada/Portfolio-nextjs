/**
 * Animation variants for Framer Motion.
 *
 * Standardized on the primary deceleration curve (ease-out-expo) used across the
 * site (`lib/motionVariants.js`). No bouncy springs, no left/right slide-ins —
 * reveals are calm fade + small upward travel so the page reads as deliberate,
 * not "everything flies in from the side".
 */

/** Primary deceleration curve — Apple / Linear-style ease-out-expo */
export const EASING_PRIMARY = [0.22, 1, 0.36, 1];

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.06,
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASING_PRIMARY },
  },
};

export const cardHoverVariants = {
  rest: {
    scale: 1,
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.10)',
  },
  hover: {
    scale: 1.02,
    boxShadow: '0 18px 40px rgba(0, 0, 0, 0.22)',
    transition: { duration: 0.35, ease: EASING_PRIMARY },
  },
};

export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: EASING_PRIMARY },
  },
};

/**
 * Legacy `slideIn*` names are kept so existing imports don't break, but they no
 * longer slide horizontally — they resolve to the calm fade-up reveal. This kills
 * the "boring left/right" entrances wherever they were still wired up.
 */
export const slideInVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASING_PRIMARY },
  },
};

export const slideInRightVariants = slideInVariants;

export const scaleInVariants = {
  hidden: { scale: 0.96, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: EASING_PRIMARY },
  },
};

export const rotateInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASING_PRIMARY },
  },
};

export const getTransitionVariants = (type = 'default') => {
  const transitions = {
    default: { type: 'tween', duration: 0.5, ease: EASING_PRIMARY },
    spring: { type: 'tween', duration: 0.5, ease: EASING_PRIMARY },
    bounce: { type: 'tween', duration: 0.6, ease: EASING_PRIMARY },
    smooth: { type: 'tween', duration: 0.8, ease: EASING_PRIMARY },
    fast: { type: 'tween', duration: 0.25, ease: EASING_PRIMARY },
  };

  return transitions[type] || transitions.default;
};
