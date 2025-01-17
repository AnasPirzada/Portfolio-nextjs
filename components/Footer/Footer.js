/* eslint-disable @next/next/no-img-element */
import { Howl } from 'howler';
import { useState } from 'react';
import { Fade } from 'react-reveal';
import { theme } from 'tailwind.config';
import { MENULINKS } from '../../constants';
import Button from '../Button/Button';
import Profiles from '../Profiles/Profiles';
import FooterBg from './FooterBg/FooterBg';

const Footer = () => {
  const [playbackRate, setPlaybackRate] = useState(0.75);

  const heartClickSound = new Howl({
    src: ['/sounds/glug-a.mp3'],
    rate: playbackRate,
    volume: 0.5,
  });

  const handleClick = () => {
    setPlaybackRate(rate => rate + 0.1);
    heartClickSound.play();
  };

  return (
    <footer
      className='w-full relative select-none bg-cover'
      style={{
        backgroundImage: `linear-gradient(to right, ${theme.colors.GoldenGlow.light}, ${theme.colors.GoldenGlow.dark})`,
      }}
    >
      <FooterBg />
      <Fade bottom distance={'4rem'}>
        <div className='w-full h-full pt-32'>
          <div className='section-container flex flex-col h-full justify-end z-10 items-center py-12'>
            <h1 className='font-medium text-3xl md:text-4xl text-center'>
              Feel free to connect on social media.
            </h1>
            <div className='text-center'>
              <Profiles />
            </div>
            <div className='pt-4 text-center'>
              <Button
                href={`#${MENULINKS[4].ref}`}
                classes='link'
                type='secondary'
              >
                Let&apos;s Talk
              </Button>
            </div>
            <p className='text-center text-white text-sm sm:text-base font-medium tracking-wide mt-8'>
              Developed with{' '}
              <button onClick={handleClick} className='link cursor-none'>
                <span className='block animate-bounce'>❤️</span>
              </button>{' '}
              by <span className='text-white'>Anas Pirzada</span>
            </p>
          </div>
        </div>
      </Fade>
      <img
        src='/footer-curve.svg'
        className='w-full rotate-180'
        alt=''
        loading='eager'
        height={180}
      />
    </footer>
  );
};

export default Footer;
