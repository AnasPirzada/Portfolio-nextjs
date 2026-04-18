import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useEffect } from 'react';
import Lenis from 'lenis';
import { shouldEnableLenis } from '@/utils/scrollRevealSupport';

gsap.registerPlugin(ScrollTrigger);

const useSmoothScroll = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let lenis = null;
    let tickerCallback = null;
    let destroyed = false;
    let resizeTimer;

    const teardownLenis = () => {
      if (lenis) {
        lenis.off('scroll', ScrollTrigger.update);
        lenis.destroy();
        window.lenis = null;
        lenis = null;
      }
      if (tickerCallback) {
        gsap.ticker.remove(tickerCallback);
        tickerCallback = null;
      }
      gsap.ticker.lagSmoothing(500, 33);
    };

    const setupLenis = () => {
      teardownLenis();
      if (destroyed) return;

      if (!shouldEnableLenis()) {
        requestAnimationFrame(() => ScrollTrigger.refresh());
        return;
      }

      gsap.ticker.lagSmoothing(0);

      const instance = new Lenis({
        duration: 1.1,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.8,
        touchMultiplier: 1,
        infinite: false,
      });

      instance.on('scroll', ScrollTrigger.update);

      tickerCallback = time => {
        instance.raf(time * 1000);
      };
      gsap.ticker.add(tickerCallback);

      lenis = instance;
      window.lenis = lenis;

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    };

    setupLenis();

    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setupLenis();
      }, 200);
    };
    window.addEventListener('resize', onResize);

    return () => {
      destroyed = true;
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
      teardownLenis();
    };
  }, []);
};

export default useSmoothScroll;
