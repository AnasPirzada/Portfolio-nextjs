import { Howl } from 'howler';
import Image from 'next/image';
import { useCallback, useEffect, useRef } from 'react';
// import SoundBar from './SoundBar/SoundBar';

const multiPop = new Howl({
  src: ['/sounds/multi-pop.mp3'],
});

const Header = ({ children }) => {
  const inputRef = useRef(null);

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

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <nav className='w-full fixed top-0 py-4 md:py-8 z-50 select-none bg-gradient-to-b from-black shadow-black transition-all duration-300'>
      <div className='flex justify-between section-container'>
        <a 
          href='#home' 
          className='link'
          aria-label='Go to home page'
        >
          <Image
            src='/logo.svg'
            alt='Logo - Anas Pirzada'
            width={25}
            height={25}
            className='w-5 h-5 md:w-7 md:h-7 lg:w-8 lg:h-8 xl:w-10 xl:h-10'
          />
        </a>
        <div className='outer-menu relative flex items-center gap-4 md:gap-8 z-[1]'>
          {/* <SoundBar /> */}
          <input
            ref={inputRef}
            id='menu-toggle'
            aria-label='Toggle navigation menu'
            aria-expanded='false'
            aria-controls='navigation-menu'
            className='checkbox-toggle link absolute top-0 right-0 w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 opacity-0 cursor-pointer'
            type='checkbox'
            style={{ touchAction: 'manipulation' }}
            onClick={(e) => {
              handleClick(e);
              e.target.setAttribute('aria-expanded', e.target.checked);
            }}
            onTouchEnd={handleTouchEnd}
          />
          <div className='hamburger w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 flex items-center justify-center cursor-pointer pointer-events-none'>
            <div className='relative w-5 md:w-6 lg:w-7 xl:w-8' />
          </div>
          {children}
          {/* Contact Us Button - Right side bottom on laptop/desktop */}
          <div className='contact-btn-desktop hidden md:block fixed right-8 lg:right-12 xl:right-16 bottom-8 lg:bottom-12 z-[9999]'>
            <a
              href='#contact'
              className='link relative inline-block font-bold md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl duration-300 md:px-6 md:py-3 lg:px-8 lg:py-4 xl:px-10 xl:py-5 rounded-lg border-2 border-white text-white hover:bg-[#efc041] hover:text-black hover:border-[#efc041] transition-all whitespace-nowrap'
              style={{
                fontFamily:
                  'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              }}
              onClick={() => {
                if (inputRef.current) {
                  inputRef.current.checked = false;
                }
              }}
            >
              CONTACT US
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
