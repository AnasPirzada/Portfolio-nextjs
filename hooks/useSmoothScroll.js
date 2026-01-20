import { useEffect } from 'react';
import Lenis from 'lenis';

const useSmoothScroll = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const width = window.innerWidth;
    const isTouchDevice =
      'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // Keep native scrolling for mobile / tablets to avoid scroll bugs
    if (width < 1024 || isTouchDevice) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Expose lenis to window for GSAP ScrollTrigger integration
    window.lenis = lenis;

    return () => {
      lenis.destroy();
      window.lenis = null;
    };
  }, []);
};

export default useSmoothScroll;
