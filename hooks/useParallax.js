import { useScroll, useTransform } from 'framer-motion';

/**
 * Custom hook for parallax scroll effect
 * @param {number} multiplier - Parallax intensity (0.5 = half the scroll speed)
 * @returns {Object} Transform values from Framer Motion
 */
export const useParallax = (multiplier = 0.5) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 1000 * multiplier]);
  return y;
};
