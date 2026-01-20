import { useTheme } from '@/contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
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

  const stars = [
    { top: '18%', left: '52%', size: 'w-1 h-1', delay: 0 },
    { top: '45%', left: '68%', size: 'w-0.5 h-0.5', delay: 0.15 },
    { top: '28%', left: '78%', size: 'w-0.5 h-0.5', delay: 0.3 },
    { top: '65%', left: '75%', size: 'w-1 h-1', delay: 0.2 },
    { top: '55%', left: '55%', size: 'w-0.5 h-0.5', delay: 0.25 },
  ];

  return (
    <motion.button
      ref={buttonRef}
      onClick={handleClick}
      disabled={isTransitioning}
      className="relative w-[72px] h-9 rounded-full p-1 overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#efc041]/50 focus:ring-offset-2 disabled:cursor-not-allowed border border-[#efc041]/20 dark:border-[#efc041]/30 transition-all duration-300"
      style={{
        background: isDark
          ? 'linear-gradient(145deg, #000000 0%, #0a0a0a 50%, #1a1a1a 100%)'
          : 'linear-gradient(145deg, #fafafa 0%, #ffffff 50%, #f5f5f5 100%)',
        boxShadow: isDark
          ? 'inset 0 2px 4px rgba(0,0,0,0.5), 0 2px 8px rgba(239, 192, 65, 0.1), 0 0 0 1px rgba(239, 192, 65, 0.1)'
          : 'inset 0 2px 4px rgba(255,255,255,0.8), 0 2px 8px rgba(239, 192, 65, 0.15), 0 0 0 1px rgba(239, 192, 65, 0.2)',
      }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: isDark
          ? 'inset 0 2px 4px rgba(0,0,0,0.5), 0 4px 12px rgba(239, 192, 65, 0.2), 0 0 0 1px rgba(239, 192, 65, 0.3)'
          : 'inset 0 2px 4px rgba(255,255,255,0.8), 0 4px 12px rgba(239, 192, 65, 0.25), 0 0 0 1px rgba(239, 192, 65, 0.3)'
      }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Stars for dark mode - using gold accent color */}
      <AnimatePresence>
        {isDark &&
          stars.map((star, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0.5, 1, 0.5], 
                scale: [0.8, 1.3, 0.8],
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{
                delay: star.delay,
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className={`absolute ${star.size} rounded-full`}
              style={{ 
                top: star.top, 
                left: star.left,
                background: 'radial-gradient(circle, #efc041 0%, #eeba2c 100%)',
                boxShadow: '0 0 4px rgba(239, 192, 65, 0.6)',
              }}
            />
          ))}
      </AnimatePresence>

      {/* Subtle gradient rays for light mode */}
      <AnimatePresence>
        {!isDark && (
          <>
            <motion.div
              initial={{ opacity: 0, rotate: 0 }}
              animate={{ 
                opacity: [0.3, 0.5, 0.3], 
                rotate: [0, 180, 360] 
              }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: 8, 
                repeat: Infinity, 
                ease: 'linear' 
              }}
              className="absolute inset-0 rounded-full"
              style={{
                background: 'conic-gradient(from 0deg, transparent 0deg, rgba(239, 192, 65, 0.1) 45deg, transparent 90deg, rgba(238, 186, 44, 0.1) 135deg, transparent 180deg)',
              }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Toggle orb (Sun/Moon) - using site's gold accent colors */}
      <motion.div
        className="relative w-7 h-7 rounded-full flex items-center justify-center"
        style={{
          background: isDark
            ? 'linear-gradient(135deg, #efc041 0%, #eeba2c 50%, #d4a429 100%)'
            : 'linear-gradient(135deg, #efc041 0%, #facc15 50%, #eeba2c 100%)',
          boxShadow: isDark
            ? '0 0 16px rgba(239, 192, 65, 0.7), 0 0 32px rgba(238, 186, 44, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.2)'
            : '0 0 20px rgba(239, 192, 65, 0.9), 0 0 40px rgba(238, 186, 44, 0.5), inset 0 1px 2px rgba(255, 255, 255, 0.3)',
        }}
        animate={{ 
          x: isDark ? 0 : 36, 
          rotate: isDark ? 0 : 360,
        }}
        transition={{ 
          type: 'spring', 
          stiffness: 300, 
          damping: 25,
        }}
      >
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 90 }}
              transition={{ duration: 0.4, ease: 'backOut' }}
              className="relative w-full h-full rounded-full overflow-hidden"
            >
              {/* Moon surface with gold tint */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    'radial-gradient(circle at 30% 30%, rgba(239, 192, 65, 0.4) 0%, rgba(238, 186, 44, 0.2) 30%, transparent 60%)',
                }}
              />
              {/* Moon craters with gold accents */}
              <div
                className="absolute w-2 h-2 rounded-full"
                style={{
                  background:
                    'radial-gradient(circle, rgba(239, 192, 65, 0.5) 0%, rgba(238, 186, 44, 0.2) 100%)',
                  top: '20%',
                  left: '15%',
                  boxShadow: '0 0 2px rgba(239, 192, 65, 0.3)',
                }}
              />
              <div
                className="absolute w-1.5 h-1.5 rounded-full"
                style={{
                  background:
                    'radial-gradient(circle, rgba(239, 192, 65, 0.4) 0%, rgba(238, 186, 44, 0.15) 100%)',
                  top: '50%',
                  left: '45%',
                  boxShadow: '0 0 2px rgba(239, 192, 65, 0.2)',
                }}
              />
              <div
                className="absolute w-1 h-1 rounded-full"
                style={{
                  background: 'rgba(239, 192, 65, 0.3)',
                  top: '65%',
                  left: '25%',
                  boxShadow: '0 0 1px rgba(239, 192, 65, 0.2)',
                }}
              />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ duration: 0.4, ease: 'backOut' }}
              className="relative w-full h-full flex items-center justify-center"
            >
              {/* Sun rays using site's gold colors */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: '2px',
                    height: '7px',
                    background: 'linear-gradient(to bottom, #efc041, #eeba2c)',
                    transform: `rotate(${i * 45}deg) translateY(-15px)`,
                    transformOrigin: 'center center',
                  }}
                  animate={{
                    opacity: [0.7, 1, 0.7],
                    height: ['7px', '9px', '7px'],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: 'easeInOut',
                  }}
                />
              ))}
              {/* Sun center */}
              <div
                className="w-4 h-4 rounded-full"
                style={{
                  background:
                    'radial-gradient(circle at 35% 35%, #efc041 0%, #eeba2c 50%, #d4a429 100%)',
                  boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.3)',
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
