import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import MotionRoot from '@/components/MotionRoot';
import Meta from '@/components/Meta/Meta';
import VoiceAssistant from '@/components/VoiceAssistant';
import { GTAG } from '@/constants';
import { DeviceProvider } from '@/contexts/DeviceContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { usePerformanceMonitoring } from '@/hooks/usePerformanceMonitoring';
import useSmoothScroll from '@/hooks/useSmoothScroll';
import { logger } from '@/utils/logger';
import { validateEnv } from '@/utils/validateEnv';
import { GoogleAnalytics } from '@next/third-parties/google';
import Script from 'next/script';
import { calibre, jetbrains_mono } from 'public/fonts';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useRouter } from 'next/router';
import '../styles/globals.css';
import '../styles/globals.scss';
import '../styles/accessibility.css';

gsap.registerPlugin(ScrollTrigger);

const App = ({ Component, pageProps }) => {
  usePerformanceMonitoring();
  useSmoothScroll();
  const router = useRouter();

  useEffect(() => {
    validateEnv();
  }, []);

  // Refresh ScrollTrigger on route change and page load
  useEffect(() => {
    const handleRouteChange = () => {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    };

    // Refresh on route change
    router.events.on('routeChangeComplete', handleRouteChange);
    
    // Refresh on initial load
    if (typeof window !== 'undefined') {
      window.addEventListener('load', handleRouteChange);
      // Also refresh after a short delay on mount
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);
    }

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      if (typeof window !== 'undefined') {
        window.removeEventListener('load', handleRouteChange);
      }
    };
  }, [router]);

  // When Lenis is active it already drives ScrollTrigger via lenis.on('scroll').
  // Calling ScrollTrigger.update on both Lenis and native scroll duplicates work and can stutter.
  useEffect(() => {
    const onScroll = () => {
      if (typeof window !== 'undefined' && window.lenis) return;
      ScrollTrigger.update();
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    let t;
    const onResize = () => {
      clearTimeout(t);
      t = setTimeout(() => ScrollTrigger.refresh(), 200);
    };
    window.addEventListener('resize', onResize);
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <>
      <Meta />
      <ErrorBoundary>
        <MotionRoot>
          <ThemeProvider>
            <LanguageProvider>
              <DeviceProvider>
                <main
                  className={`${calibre.variable} font-sans ${jetbrains_mono.variable} font-mono`}
                >
                  <Component {...pageProps} />
                  <GoogleAnalytics gaId={GTAG} />
                  <VoiceAssistant />
                </main>
              </DeviceProvider>
            </LanguageProvider>
          </ThemeProvider>
        </MotionRoot>
      </ErrorBoundary>
      {/* Calendly script */}
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
        onLoad={() => {
          // Mark Calendly as loaded
          if (typeof window !== 'undefined') {
            window.calendlyLoaded = true;
            // Wait a moment for Calendly to initialize
            setTimeout(() => {
              if (window.Calendly) {
              }
            }, 500);
          }
        }}
        onError={e => {
        }}
      />
    </>
  );
};

export default App;
