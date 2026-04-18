/**
 * Loads Calendly script if not already loaded
 */
const loadCalendlyScript = () => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('Window is not defined'));
      return;
    }

    // Check if Calendly is already loaded
    if (
      window.Calendly &&
      typeof window.Calendly.initPopupWidget === 'function'
    ) {
      console.log('Calendly already loaded');
      resolve();
      return;
    }

    // Check if script is already being loaded
    if (window.calendlyLoading) {
      console.log('Calendly script is loading, waiting...');
      // Wait for existing load to complete
      let attempts = 0;
      const maxAttempts = 50; // 5 seconds max wait
      const checkInterval = setInterval(() => {
        attempts++;
        if (
          window.Calendly &&
          typeof window.Calendly.initPopupWidget === 'function'
        ) {
          clearInterval(checkInterval);
          console.log('Calendly loaded after waiting');
          resolve();
        } else if (attempts >= maxAttempts) {
          clearInterval(checkInterval);
          reject(new Error('Calendly script loading timeout'));
        }
      }, 100);
      return;
    }

    // Load the script
    console.log('Loading Calendly script...');
    window.calendlyLoading = true;
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    script.onload = () => {
      console.log('Calendly script loaded, initializing...');
      window.calendlyLoading = false;
      // Wait a bit for Calendly to initialize
      let attempts = 0;
      const maxAttempts = 50; // 5 seconds max wait
      const initInterval = setInterval(() => {
        attempts++;
        if (
          window.Calendly &&
          typeof window.Calendly.initPopupWidget === 'function'
        ) {
          clearInterval(initInterval);
          console.log('Calendly initialized successfully');
          resolve();
        } else if (attempts >= maxAttempts) {
          clearInterval(initInterval);
          reject(new Error('Calendly failed to initialize'));
        }
      }, 100);
    };
    script.onerror = () => {
      window.calendlyLoading = false;
      console.error('Failed to load Calendly script');
      reject(new Error('Failed to load Calendly script'));
    };
    document.head.appendChild(script);
  });
};

/**
 * Opens Calendly popup widget
 * @param {string} url - Calendly scheduling URL (e.g., 'https://calendly.com/username' or 'https://calendly.com/username/30min')
 * @param {object} options - Additional Calendly options (prefill, utm, etc.)
 */
export const openCalendlyPopup = async (url, options = {}) => {
  if (typeof window === 'undefined') {
    console.error('Window is not defined');
    return;
  }

  if (!url || url === 'https://calendly.com/your-username') {
    console.warn(
      'Please update CALENDLY_URL in constants.js with your actual Calendly URL'
    );
    return;
  }

  console.log('Opening Calendly popup with URL:', url);
  console.log('Window.Calendly available:', !!window.Calendly);

  try {
    // Ensure Calendly script is loaded
    await loadCalendlyScript();

    console.log('Calendly script ready, initializing popup...');
    console.log('Calendly object:', window.Calendly);
    console.log(
      'initPopupWidget function:',
      typeof window.Calendly?.initPopupWidget
    );

    if (window.Calendly) {
      console.log(
        'Calendly object available, methods:',
        Object.keys(window.Calendly)
      );

      // First, try to initialize the popup widget properly
      if (typeof window.Calendly.initPopupWidget === 'function') {
        console.log('Initializing popup widget with URL:', url);
        try {
          window.Calendly.initPopupWidget({
            url: url,
            text: 'Schedule time with me',
            color: '#c8860a',
            textColor: '#ffffff',
            branding: false,
            ...options,
          });
          console.log('Popup widget initialized');

          // Wait a moment for initialization, then try to show it
          setTimeout(() => {
            if (typeof window.Calendly.showPopupWidget === 'function') {
              console.log('Showing popup widget');
              try {
                window.Calendly.showPopupWidget(url);
                console.log('Popup widget shown successfully');

                // Check if popup actually appeared after a short delay
                setTimeout(() => {
                  const calendlyPopup = document.querySelector(
                    '.calendly-popup-content, [data-calendly-popup]'
                  );
                  if (!calendlyPopup) {
                    console.warn(
                      'Popup widget called but popup not visible, opening in new window'
                    );
                    window.open(
                      url,
                      '_blank',
                      'noopener,noreferrer,width=800,height=600'
                    );
                  } else {
                    console.log('Popup is visible on page');
                    // Ensure popup has high z-index
                    if (calendlyPopup) {
                      calendlyPopup.style.zIndex = '999999';
                    }
                  }
                }, 500);
              } catch (showError) {
                console.error('Error showing popup widget:', showError);
                // Fallback to new window
                console.log('Falling back to new window');
                window.open(
                  url,
                  '_blank',
                  'noopener,noreferrer,width=800,height=600'
                );
              }
            } else {
              // If showPopupWidget doesn't exist, the popup should auto-open
              console.log('Popup should auto-open after initialization');
              // Check after a delay if popup appeared
              setTimeout(() => {
                const calendlyPopup = document.querySelector(
                  '.calendly-popup-content, [data-calendly-popup]'
                );
                if (!calendlyPopup) {
                  console.warn('Popup did not appear, opening in new window');
                  window.open(
                    url,
                    '_blank',
                    'noopener,noreferrer,width=800,height=600'
                  );
                }
              }, 1000);
            }
          }, 300);

          return; // Exit early after initialization
        } catch (initError) {
          console.error('Error initializing popup widget:', initError);
          // Fallback to new window
          window.open(
            url,
            '_blank',
            'noopener,noreferrer,width=800,height=600'
          );
        }
      } else {
        throw new Error('initPopupWidget is not available');
      }
    } else {
      throw new Error('Calendly not available');
    }
  } catch (error) {
    console.error('Error opening Calendly popup:', error);
    console.log('Falling back to opening in new tab');
    // Fallback: open in new tab
    window.open(url, '_blank', 'noopener,noreferrer');
  }
};
