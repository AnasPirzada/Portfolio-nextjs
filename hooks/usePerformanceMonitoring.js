import { useEffect } from 'react';

/**
 * Custom hook for performance monitoring
 * Tracks Core Web Vitals and page load metrics
 */
export const usePerformanceMonitoring = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Track page load time
    window.addEventListener('load', () => {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;

      if (process.env.NODE_ENV === 'development') {
        console.log(`⏱️ Page Load Time: ${pageLoadTime}ms`);
      }

      // Send to analytics service if needed
      if (window.gtag) {
        window.gtag('event', 'page_load_time', {
          value: pageLoadTime,
        });
      }
    });

    // Track First Contentful Paint
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver(list => {
          const entries = list.getEntries();
          entries.forEach(entry => {
            if (process.env.NODE_ENV === 'development') {
              console.log(`📊 ${entry.name}: ${Math.round(entry.startTime)}ms`);
            }
          });
        });

        observer.observe({ entryTypes: ['paint', 'measure'] });

        return () => observer.disconnect();
      } catch (e) {
        console.warn('PerformanceObserver not supported');
      }
    }
  }, []);
};
