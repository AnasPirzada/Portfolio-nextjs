import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Howl } from 'howler';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
// import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import SoundBar from './SoundBar/SoundBar';

const multiPop = new Howl({
  src: ['/sounds/multi-pop.mp3'],
});

const Header = ({ children }) => {
  const inputRef = useRef(null);
  const { isDark } = useTheme();
  const { isRTL, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);

  const handleClick = useCallback(e => {
    if (e.target.checked) multiPop.play();
  }, []);

  const handleKeyDown = useCallback(e => {
    if (e.key === 'Escape' && inputRef.current?.checked) {
      inputRef.current.checked = false;
    }
  }, []);

  // Handle touch events for mobile - prevents double-tap issue
  const handleTouchEnd = useCallback(e => {
    e.preventDefault();
    if (inputRef.current) {
      inputRef.current.checked = !inputRef.current.checked;
      inputRef.current.setAttribute('aria-expanded', inputRef.current.checked);
      if (inputRef.current.checked) multiPop.play();
    }
  }, []);

  // Scroll detection for navbar shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <nav
      className={`w-full fixed top-0 py-4 md:py-8 z-50 select-none transition-all duration-300 ${isRTL ? 'rtl' : 'ltr'} ${
        isScrolled
          ? 'bg-transparent'
          : 'bg-transparent dark:bg-gradient-to-b dark:from-black/50 dark:to-transparent'
      }`}
    >
      <div
        className={`flex justify-between section-container ${isRTL ? 'flex-row-reverse' : ''}`}
      >
        <a href="#home" className="link" aria-label="Go to home page">
          <Image
            src="/logo.svg"
            alt="Logo - Anas Pirzada"
            width={25}
            height={25}
            unoptimized
            className="w-5 h-5 md:w-7 md:h-7 lg:w-8 lg:h-8 xl:w-10 xl:h-10 transition-all duration-300"
            style={{
              filter: isDark ? 'none' : 'invert(1) brightness(0.1)',
            }}
          />
        </a>
        <div
          className={`outer-menu relative flex items-center gap-4 md:gap-8 z-[1] ${isRTL ? 'flex-row-reverse' : ''}`}
        >
          {/* <LanguageSwitcher /> */}
          <ThemeToggle />
          <SoundBar />
          <input
            ref={inputRef}
            id="menu-toggle"
            aria-label="Toggle navigation menu"
            aria-expanded="false"
            aria-controls="navigation-menu"
            className="checkbox-toggle link absolute top-0 right-0 w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 opacity-0 cursor-pointer"
            type="checkbox"
            style={{ touchAction: 'manipulation' }}
            onClick={e => {
              handleClick(e);
              e.target.setAttribute('aria-expanded', e.target.checked);
            }}
            onTouchEnd={handleTouchEnd}
          />
          <div className="hamburger w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 flex items-center justify-center cursor-pointer pointer-events-none">
            <div className="relative w-5 md:w-6 lg:w-7 xl:w-8" />
          </div>
          {children}
        </div>
      </div>
    </nav>
  );
};

export default Header;
