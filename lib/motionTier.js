import { useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * `full` = lg+ and motion OK (blur, deep parallax).
 * `lite` = smaller viewports — springy motion, no blur.
 * `reduced` = prefers-reduced-motion.
 */
export function useMotionTier() {
  const reduce = useReducedMotion();
  const [wide, setWide] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(min-width: 1024px)');
    const sync = () => setWide(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  if (reduce === true) return 'reduced';
  return wide ? 'full' : 'lite';
}
