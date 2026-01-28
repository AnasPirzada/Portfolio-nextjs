import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useLayoutEffect, useRef } from 'react';

/**
 * Custom hook for scroll reveal animations
 * Prevents animation conflicts and ensures smooth scroll reveals
 * @param {Object} config - Configuration object
 * @param {number} config.duration - Animation duration
 * @param {number} config.stagger - Stagger delay between elements
 * @param {string} config.ease - GSAP easing function
 * @param {string} config.triggerStart - ScrollTrigger start position
 * @returns {React.RefObject} Ref to attach to section element
 */
export const useScrollReveal = (config = {}) => {
  const ref = useRef(null);

  const defaultConfig = {
    duration: 0.8,
    stagger: 0.15,
    ease: 'power2.out',
    triggerStart: 'top 80%',
    ...config,
  };

  useLayoutEffect(() => {
    if (!ref.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const elements = ref.current.querySelectorAll('.staggered-reveal');
      
      if (elements.length === 0) return;

      // Set initial state
      gsap.set(elements, { opacity: 0, y: 30 });

      // Simple one-time reveal animation - no reset on scroll
      gsap.to(elements, {
        opacity: 1,
        y: 0,
        duration: defaultConfig.duration,
        stagger: defaultConfig.stagger,
        ease: defaultConfig.ease,
        scrollTrigger: {
          trigger: ref.current,
          start: defaultConfig.triggerStart,
          once: true, // Only animate once
          toggleActions: 'play none none none',
        },
      });
    }, ref);

    return () => {
      ctx.revert();
    };
  }, [defaultConfig.duration, defaultConfig.ease, defaultConfig.stagger, defaultConfig.triggerStart]);

  return ref;
};
