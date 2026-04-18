import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Howl } from 'howler';

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
      <div className="pt-8 flex justify-center">
        <div className="relative bg-gray-light-2/80 dark:bg-gray-dark-3/50 backdrop-blur-sm rounded-full p-1 flex border border-gray-light-2 dark:border-gray-dark-2/50 overflow-hidden">
          {/* Animated indicator with glow */}
          <motion.div
            className="absolute top-1 bottom-1 rounded-full bg-gradient-to-r from-accent-light to-accent-dark"
            initial={false}
            animate={{
              left: `calc(${(activeIndex / tabCount) * 100}% + 0.25rem)`,
              width: `calc(${100 / tabCount}% - 0.5rem)`,
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
            className="absolute top-1 bottom-1 rounded-full bg-accent-light/30 blur-md"
            initial={false}
            animate={{
              left: `calc(${(activeIndex / tabCount) * 100}% + 0.25rem)`,
              width: `calc(${100 / tabCount}% - 0.5rem)`,
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
              className={`relative z-[1] px-5 sm:px-8 py-2.5 text-center text-sm font-semibold transition-colors duration-200 rounded-full whitespace-nowrap ${
                activeTab.value === tab.value
                  ? 'text-black'
                  : 'text-gray-light-4 dark:text-gray-light-3 hover:text-gray-dark-3 dark:hover:text-white'
              }`}
            >
              <motion.span
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
