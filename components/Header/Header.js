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

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <nav className='w-full fixed top-0 py-4 md:py-8 z-50 select-none bg-gradient-to-b from-black shadow-black transition-all duration-300'>
      <div className='flex justify-between section-container'>
        <a href='#home' className='link'>
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
            aria-labelledby='menu'
            aria-label='menu'
            className='checkbox-toggle link absolute top-0 right-0 w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 opacity-0 cursor-pointer'
            type='checkbox'
            onClick={handleClick}
          />
          <div className='hamburger w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 flex items-center justify-center'>
            <div className='relative flex-none w-full bg-white duration-300 flex items-center justify-center' />
          </div>
          {children}
        </div>
      </div>
    </nav>
  );
};

export default Header;
