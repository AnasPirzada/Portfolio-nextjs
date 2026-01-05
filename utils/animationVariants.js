/**
 * Advanced animation variants for Framer Motion
 */

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10,
    },
  },
};

export const cardHoverVariants = {
  rest: {
    scale: 1,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  hover: {
    scale: 1.05,
    boxShadow: '0 20px 25px rgba(0, 0, 0, 0.3)',
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 10,
    },
  },
};

export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

export const slideInVariants = {
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100, damping: 15 },
  },
};

export const slideInRightVariants = {
  hidden: { x: 100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100, damping: 15 },
  },
};

export const scaleInVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100, damping: 10 },
  },
};

export const rotateInVariants = {
  hidden: { rotate: -10, opacity: 0 },
  visible: {
    rotate: 0,
    opacity: 1,
    transition: { duration: 0.6 },
  },
};

export const getTransitionVariants = (type = 'default') => {
  const transitions = {
    default: { type: 'tween', duration: 0.5, ease: 'easeInOut' },
    spring: { type: 'spring', stiffness: 100, damping: 10 },
    bounce: { type: 'spring', stiffness: 200, damping: 8 },
    smooth: { type: 'tween', duration: 0.8, ease: 'easeInOut' },
    fast: { type: 'tween', duration: 0.2, ease: 'easeOut' },
  };

  return transitions[type] || transitions.default;
};
