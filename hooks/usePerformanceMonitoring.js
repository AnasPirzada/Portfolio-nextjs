import { useEffect } from 'react';

/**
 * Custom hook for performance monitoring
 * Tracks Core Web Vitals (LCP, FID, CLS) and page load metrics
 */
export const usePerformanceMonitoring = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Track page load time
    window.addEventListener('load', () => {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;

      if (process.env.NODE_ENV === 'development') {
      }

      // Send to analytics service
      if (window.gtag) {
        window.gtag('event', 'page_load_time', {
          value: pageLoadTime,
          event_category: 'Performance',
          event_label: 'Page Load Time',
        });
      }
    });

    // Track Paint metrics (FCP, LCP)
    if ('PerformanceObserver' in window) {
      try {
        const paintObserver = new PerformanceObserver(list => {
          const entries = list.getEntries();
          entries.forEach(entry => {
            const metricName = entry.name;
            const metricValue = Math.round(
              entry.startTime || entry.renderTime || 0
            );

            if (process.env.NODE_ENV === 'development') {
            }

            // Send to Google Analytics
            if (window.gtag) {
              window.gtag(
                'event',
                metricName.toLowerCase().replace(/\s+/g, '_'),
                {
                  value: metricValue,
                  event_category: 'Performance',
                  event_label: metricName,
                  non_interaction: true,
                }
              );
            }
          });
        });

        paintObserver.observe({ entryTypes: ['paint', 'measure'] });

        // Track Core Web Vitals
        // Largest Contentful Paint (LCP)
        const lcpObserver = new PerformanceObserver(list => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1]; // Use the latest LCP entry
          const lcp = Math.round(lastEntry.renderTime || lastEntry.loadTime);

          if (process.env.NODE_ENV === 'development') {
          }

          // Send to Google Analytics
          if (window.gtag) {
            window.gtag('event', 'web_vitals', {
              event_category: 'Web Vitals',
              event_label: 'LCP',
              value: lcp,
              non_interaction: true,
            });

            // Also send as a metric
            window.gtag('event', 'lcp', {
              value: lcp,
              event_category: 'Performance',
              non_interaction: true,
            });
          }

          // Log to logger if available
          if (window.logger) {
            window.logger.info('LCP metric', { value: lcp });
          }
        });

        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // First Input Delay (FID) - Note: FID is deprecated in favor of INP
        // We'll track INP (Interaction to Next Paint) if available
        let fidObserver = null;
        try {
          fidObserver = new PerformanceObserver(list => {
            const entries = list.getEntries();
            entries.forEach(entry => {
              const fid = Math.round(entry.processingStart - entry.startTime);

              if (process.env.NODE_ENV === 'development') {
              }

              if (window.gtag) {
                window.gtag('event', 'web_vitals', {
                  event_category: 'Web Vitals',
                  event_label: 'FID',
                  value: fid,
                  non_interaction: true,
                });

                window.gtag('event', 'fid', {
                  value: fid,
                  event_category: 'Performance',
                  non_interaction: true,
                });
              }

              if (window.logger) {
                window.logger.info('FID metric', { value: fid });
              }
            });
          });

          fidObserver.observe({ entryTypes: ['first-input'] });
        } catch (e) {
          // FID observer may not be supported in all browsers
          if (process.env.NODE_ENV === 'development') {
          }
        }

        // Cumulative Layout Shift (CLS)
        let clsValue = 0;
        const clsObserver = new PerformanceObserver(list => {
          const entries = list.getEntries();
          entries.forEach(entry => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });


          // Send to Google Analytics (only on page unload or when significant)
          if (window.gtag && clsValue > 0) {
            window.gtag('event', 'web_vitals', {
              event_category: 'Web Vitals',
              event_label: 'CLS',
              value: Math.round(clsValue * 1000), // Convert to integer for GA
              non_interaction: true,
            });

            window.gtag('event', 'cls', {
              value: Math.round(clsValue * 1000),
              event_category: 'Performance',
              non_interaction: true,
            });
          }

          if (window.logger && clsValue > 0) {
            window.logger.info('CLS metric', { value: clsValue });
          }
        });

        clsObserver.observe({ entryTypes: ['layout-shift'] });

        // Track Navigation Timing
        window.addEventListener('load', () => {
          const perfData = window.performance.timing;
          const metrics = {
            dns: perfData.domainLookupEnd - perfData.domainLookupStart,
            tcp: perfData.connectEnd - perfData.connectStart,
            request: perfData.responseStart - perfData.requestStart,
            response: perfData.responseEnd - perfData.responseStart,
            dom: perfData.domComplete - perfData.domLoading,
            load: perfData.loadEventEnd - perfData.loadEventStart,
          };

          if (process.env.NODE_ENV === 'development') {
            console.log('📈 Navigation Timing:', metrics);
          }

          if (window.gtag) {
            Object.entries(metrics).forEach(([key, value]) => {
              window.gtag('event', `navigation_${key}`, {
                value: Math.round(value),
                event_category: 'Performance',
                event_label: key.toUpperCase(),
                non_interaction: true,
              });
            });
          }
        });

        // Cleanup
        return () => {
          paintObserver.disconnect();
          lcpObserver.disconnect();
          clsObserver.disconnect();
          if (fidObserver) {
            try {
              fidObserver.disconnect();
            } catch (e) {
              // Ignore disconnect errors
            }
          }
        };
      } catch (e) {
      }
    }

    // Track page visibility changes (to measure actual user engagement)
    if ('visibilityState' in document) {
      const handleVisibilityChange = () => {
        if (document.visibilityState === 'visible') {
          if (window.gtag) {
            window.gtag('event', 'page_visible', {
              event_category: 'Engagement',
              non_interaction: true,
            });
          }
        }
      };

      document.addEventListener('visibilitychange', handleVisibilityChange);

      return () => {
        document.removeEventListener(
          'visibilitychange',
          handleVisibilityChange
        );
      };
    }
  }, []);
};
