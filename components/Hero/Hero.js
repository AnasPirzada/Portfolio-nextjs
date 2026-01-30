import gsap from 'gsap';
import Image from 'next/image';
import { useEffect, useLayoutEffect, useRef } from 'react';
import Typed from 'typed.js';
import { CALENDLY_URL, MENULINKS, TYPED_STRINGS } from '../../constants';
import { openCalendlyPopup } from '../../utils/calendly';
import Button from '../Button/Button';
import FiverrBadge from '../FiverrBadge/FiverrBadge';
import UpworkBadge from '../UpworkBadge/UpworkBadge';
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
  const floatingRef = useRef(null);

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

      // Floating particles animation
      const particles =
        sectionRef.current.querySelectorAll('.floating-particle');
      particles.forEach((particle, i) => {
        gsap.to(particle, {
          y: 'random(-20, 20)',
          x: 'random(-10, 10)',
          rotation: 'random(-15, 15)',
          duration: 'random(3, 5)',
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.2,
        });
      });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const typed = new Typed(typedElementRef.current, options);

    return () => typed.destroy();
  }, [typedElementRef]);

  // Magnetic button effect
  const handleMouseMove = e => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(btn, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = e => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)',
    });
  };

  return (
    <section
      ref={sectionRef}
      id={MENULINKS[0].ref}
      className="w-full flex items-center md:items-center py-6 sm:py-10 md:py-8 2xl:container mx-auto xl:px-20 md:px-12 px-4 sm:px-6 min-h-[70vh] md:min-h-screen relative mb-0 md:mb-24"
      style={{ opacity: 0 }}
    >
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-particle absolute top-20 left-10 w-3 h-3 bg-[#efc041] rounded-full opacity-40" />
        <div className="floating-particle absolute top-40 right-20 w-2 h-2 bg-[#eeba2c] rounded-full opacity-30" />
        <div className="floating-particle absolute bottom-32 left-1/4 w-4 h-4 border-2 border-[#efc041] rounded-full opacity-30" />
        <div
          className="floating-particle absolute top-1/3 left-1/3 w-2 h-2 bg-[#efc041] opacity-20"
          style={{ transform: 'rotate(45deg)' }}
        />
        <div
          className="floating-particle absolute bottom-1/4 right-1/3 w-3 h-3 border border-[#eeba2c] opacity-25"
          style={{ transform: 'rotate(45deg)' }}
        />
      </div>

      <style jsx global>{`
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
      `}</style>
      <div
        className="flex flex-col justify-center items-start md:items-start text-left md:text-left pt-0 md:pt-0 select-none w-full md:max-w-[50%] lg:max-w-[45%] relative z-10"
        style={{ pointerEvents: 'auto' }}
      >
        <h5
          className={`${styles.intro} font-mono font-medium text-GoldenGlow-light staggered-reveal text-sm sm:text-base md:text-base lg:text-lg mb-3 sm:mb-4 md:mb-6 lg:mb-7`}
        >
          Hi, I&apos;m
        </h5>
        <h1
          className={`${styles.heroName} text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl font-semibold mb-2 sm:mb-3 md:mb-4 lg:mb-5 leading-tight`}
        >
          <span className={`relative ${styles.emphasize} staggered-reveal`}>
            Anas
          </span>
          <span className="staggered-reveal"> Pirzada</span>
        </h1>
        <p className="mb-3 sm:mb-4 md:mb-5 lg:mb-6 inline-block w-full break-words">
          <span
            ref={typedElementRef}
            className="staggered-reveal text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-light-3 font-mono leading-relaxed inline-block min-h-[2rem] sm:min-h-[2.5rem] md:min-h-[3rem] max-w-full break-words"
          />
        </p>
        <div className="staggered-reveal mb-3 sm:mb-4 md:mb-5 lg:mb-6">
          <Profiles />
        </div>
        <div
          className="staggered-reveal pt-2"
          style={{ position: 'relative', zIndex: 10, pointerEvents: 'auto' }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <Button
            href="#"
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
            classes="link"
            type="primary"
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
        className="absolute invisible md:visible md:right-8 lg:right-12 2xl:right-16 bottom-0 flex items-end justify-center z-0"
        style={{
          width: 'clamp(500px, 55vw, 800px)',
          maxHeight: '95vh',
          pointerEvents: 'none',
          backgroundColor: 'transparent',
        }}
      >
        {/* Fiverr & Upwork Badges - Center */}
        <div
          className="staggered-reveal absolute top-10 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex gap-3 items-center"
          style={{ pointerEvents: 'auto' }}
        >
          <FiverrBadge />
          {/* <UpworkBadge /> */}
        </div>
        <div className={styles.imageWrapper}>
          <Image
            src="/lottie/anas.svg"
            alt="Anas Pirzada - Developer illustration"
            width={800}
            height={800}
            className={`w-full h-auto object-contain ${styles.heroImage}`}
            style={{
              maxWidth: '100%',
              maxHeight: '95vh',
            }}
            priority
            quality={90}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
