import gsap from 'gsap';
import { useEffect, useLayoutEffect, useRef } from 'react';
import Typed from 'typed.js';
import { CALENDLY_URL, MENULINKS, TYPED_STRINGS } from '../../constants';
import { openCalendlyPopup } from '../../utils/calendly';
import Button from '../Button/Button';
import Profiles from '../Profiles/Profiles';
import styles from './Hero.module.scss';

const options = {
  strings: TYPED_STRINGS,
  typeSpeed: 50,
  startDelay: 1500,
  backSpeed: 50,
  backDelay: 8000,
  loop: true,
};

const Hero = () => {
  const sectionRef = useRef(null);
  const typedElementRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'none' } })
        .to(sectionRef.current, { opacity: 1, duration: 2 })
        .from(
          sectionRef.current.querySelectorAll('.staggered-reveal'),
          { opacity: 0, duration: 0.5, stagger: 0.5 },
          '<'
        );
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const typed = new Typed(typedElementRef.current, options);

    return () => typed.destroy();
  }, [typedElementRef]);

  return (
    <section
      ref={sectionRef}
      id={MENULINKS[0].ref}
      className='w-full flex items-center md:items-center py-8 sm:py-12 md:py-8 2xl:container mx-auto xl:px-20 md:px-12 px-4 sm:px-6 min-h-screen relative mb-4 md:mb-24'
      style={{ opacity: 0 }}
    >
      <style global jsx>
        {`
          .typed-cursor {
            font-size: 2.25rem;
            display: inline-block;
            vertical-align: baseline;
            line-height: inherit;
            margin-left: 2px;
          }
          @media (min-width: 640px) {
            .typed-cursor {
              font-size: 2.75rem;
            }
          }
          @media (min-width: 768px) {
            .typed-cursor {
              font-size: 2rem;
            }
          }
        `}
      </style>
      <div
        className='flex flex-col justify-center items-start md:items-start text-left md:text-left pt-0 md:pt-0 select-none w-full md:max-w-[50%] lg:max-w-[45%] relative z-10'
        style={{ pointerEvents: 'auto' }}
      >
        <h5
          className={`${styles.intro} font-mono font-medium text-GoldenGlow-light staggered-reveal text-sm sm:text-base md:text-base lg:text-lg mb-6 sm:mb-7`}
        >
          Hi, My Name is
        </h5>
        <h1
          className={`${styles.heroName} text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl font-semibold mb-6 sm:mb-7 leading-tight`}
        >
          <span className={`relative ${styles.emphasize} staggered-reveal`}>
            Anas
          </span>
          <span className='staggered-reveal'> Pirzada</span>
        </h1>
        <p className='mb-6 sm:mb-7 inline-block w-full md:max-w-full'>
          <span
            ref={typedElementRef}
            className='staggered-reveal text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-light-3 font-mono leading-relaxed inline-block min-h-[2rem] sm:min-h-[2.5rem] md:min-h-[3rem] break-words'
          />
        </p>
        <div className='staggered-reveal mb-6'>
          <Profiles />
        </div>
        <div
          className='staggered-reveal pt-2'
          style={{ position: 'relative', zIndex: 10, pointerEvents: 'auto' }}
        >
          <Button
            href='#'
            onClick={async e => {
              e.preventDefault();
              e.stopPropagation();
              console.log('Button clicked!', CALENDLY_URL);

              if (
                CALENDLY_URL &&
                CALENDLY_URL !== 'https://calendly.com/your-username'
              ) {
                // Check if Calendly is available
                if (typeof window !== 'undefined' && window.Calendly) {
                  try {
                    await openCalendlyPopup(CALENDLY_URL);
                    // Note: If popup fails due to X-Frame-Options,
                    // the function will automatically fallback to new window
                  } catch (error) {
                    console.error('Failed to open Calendly:', error);
                    // Final fallback: open in new window
                    window.open(
                      CALENDLY_URL,
                      '_blank',
                      'noopener,noreferrer,width=800,height=600'
                    );
                  }
                } else {
                  // If Calendly isn't loaded, open in new tab
                  console.warn('Calendly not loaded, opening in new tab');
                  window.open(
                    CALENDLY_URL,
                    '_blank',
                    'noopener,noreferrer,width=800,height=600'
                  );
                }
              } else {
                console.warn('Please update CALENDLY_URL in constants.js');
                // Fallback to contact section
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }
            }}
            classes='link'
            type='primary'
            style={{
              pointerEvents: 'auto',
              position: 'relative',
              zIndex: 10,
              cursor: 'pointer',
            }}
          >
            Let&apos;s Talk
          </Button>
        </div>
      </div>
      <div
        className='absolute invisible md:visible md:right-8 lg:right-12 2xl:right-16 bottom-0 flex items-end justify-center z-0'
        style={{
          width: 'clamp(500px, 55vw, 800px)',
          maxHeight: '95vh',
          pointerEvents: 'none',
          backgroundColor: 'transparent',
        }}
      >
        <div className={styles.imageWrapper}>
          <img
            src='/lottie/anas.svg'
            alt='Anas Pirzada - Developer illustration'
            className={`w-full h-auto object-contain ${styles.heroImage}`}
            style={{
              maxWidth: '100%',
              maxHeight: '95vh',
            }}
            loading='lazy'
            decoding='async'
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
