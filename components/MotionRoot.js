import { LazyMotion, domAnimation } from 'framer-motion';

/**
 * Lazy-loads Framer Motion's DOM animation feature bundle.
 * Existing `motion.*` imports still work (non-strict LazyMotion).
 */
export default function MotionRoot({ children }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}
