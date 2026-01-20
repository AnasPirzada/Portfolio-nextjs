import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';

const ThemeContext = createContext();

/**
 * Theme Provider Component
 * Manages dark/light theme switching with page transition animation
 */
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');
  const [mounted, setMounted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Default to dark mode (black) instead of light mode (white)
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);

    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = useCallback(
    (clickX, clickY) => {
      const newTheme = theme === 'dark' ? 'light' : 'dark';

      // Start transition animation
      setIsTransitioning(true);

      // Create circular reveal overlay
      const overlay = document.createElement('div');
      overlay.id = 'theme-transition-overlay';
      overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 99999;
      background: ${newTheme === 'dark' ? '#0a0a0a' : '#f8f8f8'};
      clip-path: circle(0% at ${clickX}px ${clickY}px);
      transition: clip-path 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    `;
      document.body.appendChild(overlay);

      // Trigger animation
      requestAnimationFrame(() => {
        const maxDim = Math.max(window.innerWidth, window.innerHeight);
        const radius = Math.sqrt(Math.pow(maxDim, 2) + Math.pow(maxDim, 2));
        overlay.style.clipPath = `circle(${radius}px at ${clickX}px ${clickY}px)`;
      });

      // Apply theme change midway through animation
      setTimeout(() => {
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);

        if (newTheme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        document.documentElement.setAttribute('data-theme', newTheme);
      }, 300);

      // Cleanup overlay
      setTimeout(() => {
        overlay.remove();
        setIsTransitioning(false);
      }, 650);
    },
    [theme]
  );

  if (!mounted) return null;

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme, isDark: theme === 'dark', isTransitioning }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
