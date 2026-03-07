import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';
import { useRef } from 'react';

const ThemeToggle = () => {
  const { theme, toggleTheme, isTransitioning } = useTheme();
  const isDark = theme === 'dark';
  const buttonRef = useRef(null);

  const handleClick = () => {
    if (isTransitioning) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    toggleTheme(x, y);
  };

  return (
    <motion.button
      ref={buttonRef}
      onClick={handleClick}
      disabled={isTransitioning}
      className="relative inline-flex h-7 w-24 items-center rounded-full border border-white/10 bg-black/5 px-1 text-[0.65rem] shadow-sm backdrop-blur-sm transition-colors duration-200 dark:bg-white/5"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Toggle orb (sun/moon) */}
      <motion.div
        className="relative flex h-5 w-5 items-center justify-center text-[0.65rem]"
        // In dark mode (moon), keep the orb on the left; in light mode (sun), move it to the right
        animate={{ x: isDark ? 0 : 68 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        {isDark ? (
          <>
            <div className="font-mono text-[1.2rem] font-semibold tracking-wide text-[#efc041]">
              N
            </div>
          </>
        ) : (
          <>
            <div className="font-mono text-[1.2rem] font-semibold tracking-wide text-[#efc041]">
              D
            </div>
          </>
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
