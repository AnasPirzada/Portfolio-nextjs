import { createContext, useContext, useEffect, useState } from 'react';

const DeviceContext = createContext();

export const DeviceProvider = ({ children }) => {
  const [device, setDevice] = useState({
    isDesktop: true,
    clientHeight: 0,
    clientWidth: 0,
    isMobile: false,
    isTablet: false,
  });

  useEffect(() => {
    const updateDevice = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;
      const isDesktop = !/Android|iPhone|iPad|iPod|IEMobile/.test(
        navigator.userAgent
      );

      setDevice({
        isDesktop,
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
