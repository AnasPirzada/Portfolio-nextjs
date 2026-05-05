import { VIEWPORT } from '@/constants/viewport';
import { createContext, useContext, useEffect, useState } from 'react';

const DeviceContext = createContext();

export const DeviceProvider = ({ children }) => {
  const [device, setDevice] = useState({
    /** Viewport lg+ and not ultra-narrow — drives Projects pin, “desktop” layouts */
    isDesktop: true,
    /** Classic desktop/tablet UA without forcing layout (custom cursor, etc.) */
    isDesktopUa: true,
    /** Wearables / ultra-narrow — force mobile-style layout */
    isUltraNarrow: false,
    clientHeight: 0,
    clientWidth: 0,
    isMobile: false,
    isTablet: false,
  });

  useEffect(() => {
    const updateDevice = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isUltraNarrow = width < VIEWPORT.MIN_COMFORTABLE_WIDTH;
      const isMobile = width < VIEWPORT.MD;
      const isTablet =
        width >= VIEWPORT.MD && width < VIEWPORT.LG;
      const isDesktop =
        width >= VIEWPORT.LG && !isUltraNarrow;
      const isDesktopUa = !/Android|iPhone|iPad|iPod|IEMobile/.test(
        navigator.userAgent
      );

      setDevice({
        isDesktop,
        isDesktopUa,
        isUltraNarrow,
        clientHeight: height,
        clientWidth: width,
        isMobile,
        isTablet,
      });
    };

    updateDevice();
    window.addEventListener('resize', updateDevice);
    return () => window.removeEventListener('resize', updateDevice);
  }, []);

  return (
    <DeviceContext.Provider value={device}>{children}</DeviceContext.Provider>
  );
};

export const useDevice = () => {
  const context = useContext(DeviceContext);
  if (!context) {
    throw new Error('useDevice must be used within DeviceProvider');
  }
  return context;
};
