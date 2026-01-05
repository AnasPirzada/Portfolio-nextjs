import { useEffect, useRef } from 'react';

/**
 * Custom hook for Intersection Observer
 * @param {Function} callback - Callback function when element enters viewport
 * @param {Object} options - IntersectionObserver options
 * @returns {React.RefObject} Ref to attach to element
 */
export const useIntersectionObserver = (callback, options = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          callback();
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, ...options }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [callback]);

  return ref;
};
