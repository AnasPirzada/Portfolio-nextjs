import { VIEWPORT } from '@/constants/viewport';
import { useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * `full` = lg+ and motion OK (blur, deep parallax).
 * `tablet` = md–lg only — lighter motion, no heavy parallax (768–1023px).
 * `lite` = phone / narrow — springy motion, no blur.
 * `reduced` = prefers-reduced-motion.
 */
export function useMotionTier() {
  const reduce = useReducedMotion();
  const [tierState, setTierState] = useState('lite');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mqLg = window.matchMedia(`(min-width: ${VIEWPORT.LG}px)`);
    const mqMd = window.matchMedia(`(min-width: ${VIEWPORT.MD}px)`);

    const sync = () => {
      const w = window.innerWidth;
      if (w < VIEWPORT.MIN_COMFORTABLE_WIDTH) {
        setTierState('lite');
        return;
      }
      if (mqLg.matches) {
        setTierState('full');
        return;
      }
      if (mqMd.matches) {
        setTierState('tablet');
        return;
      }
      setTierState('lite');
    };

    sync();
    mqLg.addEventListener('change', sync);
    mqMd.addEventListener('change', sync);
    window.addEventListener('resize', sync);
    return () => {
      mqLg.removeEventListener('change', sync);
      mqMd.removeEventListener('change', sync);
      window.removeEventListener('resize', sync);
    };
  }, []);

  if (reduce === true) return 'reduced';
  return tierState;
}
