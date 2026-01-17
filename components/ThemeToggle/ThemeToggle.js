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
    { top: '15%', left: '55%', size: 'w-1 h-1', delay: 0 },
    { top: '60%', left: '65%', size: 'w-0.5 h-0.5', delay: 0.1 },
    { top: '25%', left: '75%', size: 'w-0.5 h-0.5', delay: 0.2 },
    { top: '70%', left: '80%', size: 'w-1 h-1', delay: 0.15 },
    { top: '40%', left: '58%', size: 'w-0.5 h-0.5', delay: 0.25 },
  ];

  return (
    <motion.button
      ref={buttonRef}
      onClick={handleClick}
      disabled={isTransitioning}
      className='relative w-[72px] h-9 rounded-full p-1 overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#efc041]/50 focus:ring-offset-2 disabled:cursor-not-allowed'
      style={{
        background: isDark 
          ? 'linear-gradient(145deg, #0f172a 0%, #1e293b 40%, #334155 100%)' 
          : 'linear-gradient(145deg, #7dd3fc 0%, #38bdf8 40%, #0ea5e9 100%)',
        boxShadow: isDark
          ? 'inset 0 2px 4px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3)'
          : 'inset 0 2px 4px rgba(0,0,0,0.1), 0 1px 2px rgba(255,255,255,0.3)',
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Stars for dark mode */}
      <AnimatePresence>
        {isDark && stars.map((star, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ delay: star.delay, duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className={`absolute ${star.size} bg-white rounded-full`}
            style={{ top: star.top, left: star.left }}
          />
        ))}
      </AnimatePresence>

      {/* Clouds for light mode */}
      <AnimatePresence>
        {!isDark && (
          <>
            <motion.div
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: [0.6, 0.9, 0.6], x: [0, 2, 0] }}
              exit={{ opacity: 0, x: 15 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className='absolute w-5 h-2.5 bg-white/90 rounded-full'
              style={{ top: '20%', right: '12%', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}
            />
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: [0.5, 0.8, 0.5], x: [0, -2, 0] }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ delay: 0.2, duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className='absolute w-4 h-2 bg-white/80 rounded-full'
              style={{ top: '55%', right: '20%' }}
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              className='absolute w-3 h-1.5 bg-white/60 rounded-full'
              style={{ top: '75%', right: '35%' }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Toggle orb (Sun/Moon) */}
      <motion.div
        className='relative w-7 h-7 rounded-full flex items-center justify-center'
        style={{
          background: isDark 
            ? 'linear-gradient(135deg, #fef3c7 0%, #fcd34d 50%, #f59e0b 100%)' 
            : 'linear-gradient(135deg, #fef08a 0%, #facc15 50%, #eab308 100%)',
          boxShadow: isDark 
            ? '0 0 20px rgba(252, 211, 77, 0.6), 0 0 40px rgba(245, 158, 11, 0.3)' 
            : '0 0 25px rgba(250, 204, 21, 0.8), 0 0 50px rgba(234, 179, 8, 0.4)',
        }}
        animate={{ x: isDark ? 0 : 36, rotate: isDark ? 0 : 360 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        <AnimatePresence mode='wait'>
          {isDark ? (
            <motion.div
              key='moon'
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 90 }}
              transition={{ duration: 0.4, ease: 'backOut' }}
              className='relative w-full h-full rounded-full overflow-hidden'
            >
              <div className='absolute inset-0 rounded-full' style={{ background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 50%)' }} />
              <div className='absolute w-2 h-2 rounded-full' style={{ background: 'radial-gradient(circle, rgba(180,160,100,0.4) 0%, rgba(180,160,100,0.1) 100%)', top: '20%', left: '15%' }} />
              <div className='absolute w-1.5 h-1.5 rounded-full' style={{ background: 'radial-gradient(circle, rgba(180,160,100,0.3) 0%, rgba(180,160,100,0.1) 100%)', top: '50%', left: '45%' }} />
              <div className='absolute w-1 h-1 rounded-full' style={{ background: 'rgba(180,160,100,0.25)', top: '65%', left: '25%' }} />
            </motion.div>
          ) : (
            <motion.div
              key='sun'
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ duration: 0.4, ease: 'backOut' }}
              className='relative w-full h-full flex items-center justify-center'
            >
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className='absolute rounded-full'
                  style={{
                    width: '2px',
                    height: '6px',
                    background: 'linear-gradient(to bottom, #f59e0b, #fbbf24)',
                    transform: `rotate(${i * 45}deg) translateY(-14px)`,
                    transformOrigin: 'center center',
                  }}
                  animate={{ opacity: [0.6, 1, 0.6], height: ['6px', '8px', '6px'] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1, ease: 'easeInOut' }}
                />
              ))}
              <div className='w-4 h-4 rounded-full' style={{ background: 'radial-gradient(circle at 35% 35%, #fef3c7 0%, #fcd34d 50%, #f59e0b 100%)' }} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
