import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => {
  return (
    <Html lang="en" dir="ltr" className="dark">
      <Head>
        {/* Theme and Language initialization script to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  // Theme initialization - default to dark mode (black)
                  var theme = localStorage.getItem('theme') || 'dark';
                  if (theme === 'light') {
                    document.documentElement.classList.remove('dark');
                  } else {
                    document.documentElement.classList.add('dark');
                  }
                  document.documentElement.setAttribute('data-theme', theme);
                  
                  // Language/RTL initialization
                  var lang = localStorage.getItem('language') || 'en';
                  var isRTL = lang === 'ar';
                  document.documentElement.setAttribute('lang', lang);
                  document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
                  if (isRTL) {
                    document.documentElement.classList.add('rtl');
                  } else {
                    document.documentElement.classList.remove('rtl');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        {/* Google Fonts - Noto Sans Arabic for RTL support */}
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link rel="preconnect" href="https://res.cloudinary.com" />

        {/* DNS prefetch for better performance */}
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="https://assets.calendly.com" />

        {/* Security headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta
          httpEquiv="Referrer-Policy"
          content="strict-origin-when-cross-origin"
        />
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://www.gstatic.com https://assets.calendly.com https://calendly.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://assets.calendly.com https://calendly.com; font-src 'self' https://fonts.gstatic.com https://assets.calendly.com; img-src 'self' data: https: blob:; media-src 'self' blob: data: https://api.elevenlabs.io https://api.openai.com; connect-src 'self' https://www.google-analytics.com https://api.emailjs.com https://calendly.com https://*.calendly.com https://api.calendly.com https://api.elevenlabs.io https://api.openai.com; frame-src 'self' https://www.google.com https://calendly.com https://*.calendly.com; object-src 'none'; base-uri 'self';"
        />

        {/* Mobile web app meta tags */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
