import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import Meta from '@/components/Meta/Meta';
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
import '../styles/globals.css';
import '../styles/globals.scss';

const App = ({ Component, pageProps }) => {
  usePerformanceMonitoring();
  useSmoothScroll();

  useEffect(() => {
    validateEnv();
    logger.info('Application initialized');
  }, []);

  return (
    <>
      <Meta />
      <ErrorBoundary>
        <ThemeProvider>
          <LanguageProvider>
            <DeviceProvider>
              <main
                className={`${calibre.variable} font-sans ${jetbrains_mono.variable} font-mono`}
              >
                <Component {...pageProps} />
                <GoogleAnalytics gaId={GTAG} />
              </main>
            </DeviceProvider>
          </LanguageProvider>
        </ThemeProvider>
      </ErrorBoundary>
      {/* Calendly script */}
      <Script
        src='https://assets.calendly.com/assets/external/widget.js'
        strategy='afterInteractive'
        onLoad={() => {
          // Mark Calendly as loaded
          if (typeof window !== 'undefined') {
            window.calendlyLoaded = true;
            console.log('Calendly script loaded via Next.js Script component');
            // Wait a moment for Calendly to initialize
            setTimeout(() => {
              if (window.Calendly) {
                console.log('Calendly object is available:', window.Calendly);
              } else {
                console.warn('Calendly object not found after script load');
              }
            }, 500);
          }
        }}
        onError={e => {
          console.error('Failed to load Calendly script:', e);
        }}
      />
    </>
  );
};

export default App;
