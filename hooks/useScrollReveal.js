import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useLayoutEffect, useRef } from 'react';

/**
 * Custom hook for scroll reveal animations
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
      gsap.from(ref.current.querySelectorAll('.staggered-reveal'), {
        opacity: 0,
        y: 30,
        duration: defaultConfig.duration,
        stagger: defaultConfig.stagger,
        ease: defaultConfig.ease,
        scrollTrigger: {
          trigger: ref.current,
          start: defaultConfig.triggerStart,
          toggleActions: 'play none none none',
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return ref;
};
