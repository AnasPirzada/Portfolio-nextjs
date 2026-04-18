import { AnimatePresence, motion } from 'framer-motion';
import { Howl } from 'howler';
import { useEffect, useState } from 'react';

const SM_BREAKPOINT_PX = 640;

/** Keeps sliding tab indicator math aligned with track padding (mobile vs sm+). */
function useCompactTabTrack() {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${SM_BREAKPOINT_PX - 1}px)`);
    const sync = () => setCompact(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  return compact;
}

const mouseClickSound = new Howl({
  src: ['/sounds/mouse-click.mp3'],
  volume: 0.3,
});

const TabsContent = ({ activeTab }) => {
  return (
    <div className="relative w-full h-full min-h-[400px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab.value}
          initial={{ opacity: 1, y: 0, scale: 1 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.98 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="w-full mt-12 md:mt-10"
          style={{ willChange: 'auto', opacity: 1 }}
        >
          {activeTab.content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const Tabs = ({ tabItems }) => {
  const [activeTab, setActiveTab] = useState(tabItems[0]);
  const [isAnimating, setIsAnimating] = useState(false);
  const compactTrack = useCompactTabTrack();

  const trackPad = compactTrack ? '0.125rem' : '0.25rem';
  const trackPadDouble = compactTrack ? '0.25rem' : '0.5rem';

  const handleOnClick = tab => {
    if (tab.value === activeTab.value || isAnimating) return;
    setIsAnimating(true);
    setActiveTab(tab);
    mouseClickSound.play();
    setTimeout(() => setIsAnimating(false), 300);
  };

  const activeIndex = tabItems.findIndex(tab => tab.value === activeTab.value);
  const tabCount = tabItems.length;

  return (
    <div>
      <div
        className={`flex w-full justify-center overflow-x-auto px-3 pt-8 [scrollbar-width:none] [-ms-overflow-style:none] sm:px-4 [&::-webkit-scrollbar]:hidden ${
          compactTrack ? 'min-w-0' : ''
        }`}
      >
        <div
          className={`relative overflow-hidden rounded-full border border-gray-light-2 bg-gray-light-2/80 backdrop-blur-sm dark:border-gray-dark-2/50 dark:bg-gray-dark-3/50 ${
            compactTrack
              ? 'flex w-full min-w-0 p-0.5'
              : 'inline-flex w-max max-w-none shrink-0 p-1'
          }`}
        >
          {/* Animated indicator with glow */}
          <motion.div
            className={`absolute rounded-full bg-gradient-to-r from-accent-light to-accent-dark ${
              compactTrack ? 'top-0.5 bottom-0.5' : 'top-1 bottom-1'
            }`}
            initial={false}
            animate={{
              left: `calc(${(activeIndex / tabCount) * 100}% + ${trackPad})`,
              width: `calc(${100 / tabCount}% - ${trackPadDouble})`,
            }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 30,
              mass: 1,
            }}
          />

          {/* Subtle glow effect */}
          <motion.div
            className={`absolute rounded-full bg-accent-light/30 ${
              compactTrack ? 'top-0.5 bottom-0.5 blur-sm' : 'top-1 bottom-1 blur-md'
            }`}
            initial={false}
            animate={{
              left: `calc(${(activeIndex / tabCount) * 100}% + ${trackPad})`,
              width: `calc(${100 / tabCount}% - ${trackPadDouble})`,
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              left: { type: 'spring', stiffness: 400, damping: 30 },
              width: { type: 'spring', stiffness: 400, damping: 30 },
              opacity: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
            }}
          />

          {tabItems.map(tab => (
            <motion.button
              key={tab.value}
              onClick={() => handleOnClick(tab)}
              whileTap={{ scale: 0.95 }}
              type="button"
              className={`relative z-[1] inline-flex min-h-0 items-center justify-center whitespace-nowrap rounded-full px-3 py-2 text-center text-xs font-semibold leading-tight transition-colors duration-200 sm:px-8 sm:py-2.5 sm:text-sm sm:leading-normal ${
                compactTrack ? 'min-w-0 flex-1 basis-0 sm:flex-none sm:basis-auto' : ''
              } ${
                activeTab.value === tab.value
                  ? 'text-black'
                  : 'text-gray-light-4 dark:text-gray-light-3 hover:text-gray-dark-3 dark:hover:text-white'
              }`}
            >
              <motion.span
                className="inline-flex max-w-full items-center justify-center whitespace-nowrap text-center"
                initial={false}
                animate={{
                  scale: activeTab.value === tab.value ? 1.05 : 1,
                  fontWeight: activeTab.value === tab.value ? 700 : 600,
                }}
                transition={{ duration: 0.2 }}
              >
                {tab.title}
              </motion.span>
            </motion.button>
          ))}
        </div>
      </div>

      <TabsContent activeTab={activeTab} />
    </div>
  );
};

export default Tabs;
