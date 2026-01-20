import { useLanguage, LANGUAGES } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Howl } from 'howler';

const clickSound = new Howl({
  src: ['/sounds/mouse-click.mp3'],
  volume: 0.3,
});

const LanguageSwitcher = () => {
  const { language, changeLanguage, currentLanguage, isRTL } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = langCode => {
    clickSound.play();
    changeLanguage(langCode);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    clickSound.play();
    setIsOpen(!isOpen);
  };

  return (
    <div ref={dropdownRef} className="relative">
      <motion.button
        onClick={toggleDropdown}
        className="flex items-center gap-2 px-3 py-2 rounded-full bg-gray-800/50 backdrop-blur-sm border border-gray-600/30 hover:border-[#efc041]/50 transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Change language"
        aria-expanded={isOpen}
      >
        <span className="text-lg">{currentLanguage?.flag}</span>
        <span className="text-sm font-medium text-white hidden sm:inline">
          {currentLanguage?.code.toUpperCase()}
        </span>
        <motion.svg
          className="w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </motion.svg>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={`absolute top-full mt-2 ${isRTL ? 'left-0' : 'right-0'} min-w-[160px] bg-gray-900/95 backdrop-blur-md rounded-xl border border-gray-700/50 shadow-xl shadow-black/20 overflow-hidden z-50`}
          >
            {Object.values(LANGUAGES).map(lang => (
              <motion.button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full flex items-center gap-3 px-4 py-3 transition-all duration-200 ${
                  isRTL ? 'text-right flex-row-reverse' : 'text-left'
                } ${
                  language === lang.code
                    ? 'bg-[#efc041]/20 text-[#efc041]'
                    : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                }`}
                whileHover={{ x: isRTL ? -4 : 4 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-xl">{lang.flag}</span>
                <div
                  className={`flex flex-col ${isRTL ? 'items-end' : 'items-start'}`}
                >
                  <span className="text-sm font-medium">{lang.nativeName}</span>
                  <span className="text-xs text-gray-500">{lang.name}</span>
                </div>
                {language === lang.code && (
                  <motion.svg
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`w-4 h-4 text-[#efc041] ${isRTL ? 'mr-auto' : 'ml-auto'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </motion.svg>
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;
