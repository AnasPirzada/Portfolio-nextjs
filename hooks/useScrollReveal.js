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
      const elements = ref.current.querySelectorAll('.staggered-reveal');
      
      if (elements.length === 0) return;

      // Set initial state
      gsap.set(elements, { opacity: 0, y: 30 });

      // Create animation that can re-trigger
      const animation = gsap.to(elements, {
        opacity: 1,
        y: 0,
        duration: defaultConfig.duration,
        stagger: defaultConfig.stagger,
        ease: defaultConfig.ease,
        paused: true,
      });

      // Create ScrollTrigger that resets and re-triggers
      ScrollTrigger.create({
        trigger: ref.current,
        start: defaultConfig.triggerStart,
        toggleActions: 'play reset play reset',
        animation: animation,
        onEnter: () => {
          animation.play();
        },
        onEnterBack: () => {
          // Reset and play when scrolling back up
          gsap.set(elements, { opacity: 0, y: 30 });
          animation.restart();
        },
        onLeave: () => {
          // Keep visible when scrolling past
        },
        onLeaveBack: () => {
          // Reset when scrolling back up past the section
          gsap.set(elements, { opacity: 0, y: 30 });
        },
      });

      // Check if already in viewport on mount
      const rect = ref.current.getBoundingClientRect();
      const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isInViewport) {
        // Small delay to ensure ScrollTrigger is ready
        setTimeout(() => {
          animation.play();
        }, 100);
      }
    }, ref);

    return () => {
      ctx.revert();
      // Refresh ScrollTrigger after cleanup
      ScrollTrigger.refresh();
    };
  }, []);

  return ref;
};
