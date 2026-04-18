import { useRef } from 'react';

/**
 * Legacy hook — returns a ref only. Section reveals use
 * `RevealStagger` / `RevealItem` / `RevealFade` from `@/components/ui/Reveal`.
 */
export const useScrollReveal = () => useRef(null);
