import { useMotionTier } from '@/lib/motionTier';
import { pickFadeUpVariant, pickStaggerContainer } from '@/lib/motionVariants';
import { prefersReducedMotion } from '@/utils/scrollRevealSupport';
import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import Image from 'next/image';
import { useEffect, useLayoutEffect, useRef } from 'react';
import Typed from 'typed.js';
import { CALENDLY_URL, MENULINKS, TYPED_STRINGS } from '../../constants';
import { openCalendlyPopup } from '../../utils/calendly';
import Button from '../Button/Button';
import FiverrBadge from '../FiverrBadge/FiverrBadge';
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
  const reduceMotion = useReducedMotion();
  const tier = useMotionTier();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const imageParallax = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion === true
      ? [0, 0]
      : tier === 'full'
        ? [0, 72]
        : tier === 'lite'
          ? [0, 36]
          : [0, 0]
  );

  const textParallax = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion === true ? [0, 0] : tier === 'full' ? [0, -44] : [0, -20]
  );

  const blobParallax = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion === true || tier !== 'full' ? [0, 0] : [0, 96]
  );

  const particleDrift = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion === true ? [0, 0] : tier === 'full' ? [0, 28] : [0, 12]
  );

  const staggerParent = pickStaggerContainer(
    reduceMotion === true ? 'reduced' : tier
  );
  const itemVariant = pickFadeUpVariant(
    reduceMotion === true ? 'reduced' : tier
  );

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        return;
      }

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
    <m.section
      ref={sectionRef}
      id={MENULINKS[0].ref}
      className="relative mb-0 flex w-full max-w-[1400px] min-h-[70vh] flex-col justify-center overflow-hidden px-4 py-6 max-sm:justify-start max-sm:pt-24 max-sm:pb-10 sm:justify-center sm:px-6 sm:py-10 md:min-h-screen md:px-10 md:py-8 lg:min-h-[min(100vh,56rem)] lg:py-12 lg:pl-10 lg:pr-12 xl:px-16 2xl:px-20 md:mb-24 mx-auto"
    >
      {/* Large-screen ambient layers (dark mode only — avoids warm gold wash in light mode) */}
      <div className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:dark:block">
        <m.div
          aria-hidden
          style={{ y: blobParallax }}
          className="absolute -left-24 -top-40 h-[min(28rem,50vw)] w-[min(28rem,50vw)] rounded-full bg-accent-light/[0.14] blur-[100px]"
        />
        <m.div
          aria-hidden
          style={{ y: blobParallax }}
          className="absolute -right-20 top-1/4 h-[min(24rem,45vw)] w-[min(24rem,45vw)] rounded-full bg-accent-dark/[0.11] blur-[88px]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_72%_58%,rgba(239,192,65,0.07),transparent_65%)]" />
      </div>

      <m.div
        className="pointer-events-none absolute inset-0 hidden overflow-hidden dark:block"
        style={{ y: particleDrift }}
      >
        <div className="floating-particle absolute left-10 top-20 h-3 w-3 rounded-full bg-accent-light opacity-40" />
        <div className="floating-particle absolute right-20 top-40 h-2 w-2 rounded-full bg-accent-dark opacity-30" />
        <div className="floating-particle absolute bottom-32 left-1/4 h-4 w-4 rounded-full border-2 border-accent-light opacity-30" />
        <div className="floating-particle absolute left-1/3 top-1/3 h-2 w-2 rotate-45 bg-accent-light opacity-20" />
        <div className="floating-particle absolute bottom-1/4 right-1/3 h-3 w-3 rotate-45 border border-accent-dark opacity-25" />
      </m.div>

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

      <div className="relative z-10 flex w-full flex-col items-start gap-10 md:gap-12 lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-10 xl:gap-x-14">
        <m.div
          className="flex w-full flex-col justify-center text-left select-none md:max-w-[50%] lg:col-span-5 lg:max-w-none"
          style={{
            pointerEvents: 'auto',
            y: textParallax,
          }}
          variants={staggerParent}
          initial={reduceMotion ? false : 'hidden'}
          animate={reduceMotion ? false : 'visible'}
        >
          <m.h5
            variants={itemVariant}
            className={`${styles.intro} mb-3 font-mono font-medium text-GoldenGlow-light text-sm sm:mb-4 sm:text-base md:mb-6 md:text-base lg:mb-7 lg:text-lg`}
          >
            Hi, I&apos;m
          </m.h5>
          <m.h1
            variants={itemVariant}
            className={`${styles.heroName} mb-2 text-3xl font-semibold leading-tight text-white sm:mb-3 sm:text-4xl md:mb-4 md:text-5xl lg:mb-5 lg:text-6xl 2xl:text-7xl`}
          >
            <span className={`relative ${styles.emphasize}`}>Anas</span>
            <span> Pirzada</span>
          </m.h1>
          <m.p
            variants={itemVariant}
            className="mb-3 inline-block w-full max-w-full break-words sm:mb-4 md:mb-5 lg:mb-6"
          >
            <span
              ref={typedElementRef}
              className="inline-block min-h-[2rem] max-w-full break-words font-mono text-lg leading-relaxed text-gray-light-3 sm:min-h-[2.5rem] sm:text-xl md:min-h-[3rem] md:text-2xl lg:text-2xl"
            />
          </m.p>
          <m.div
            variants={itemVariant}
            className="mb-3 sm:mb-4 md:mb-5 lg:mb-6"
          >
            <Profiles />
          </m.div>
          <m.div
            variants={itemVariant}
            className="relative z-10 pt-2"
            style={{ pointerEvents: 'auto' }}
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
                  if (typeof window !== 'undefined' && window.Calendly) {
                    try {
                      await openCalendlyPopup(CALENDLY_URL);
                    } catch (error) {
                      console.error('Failed to open Calendly:', error);
                      window.open(
                        CALENDLY_URL,
                        '_blank',
                        'noopener,noreferrer,width=800,height=600'
                      );
                    }
                  } else {
                    console.warn('Calendly not loaded, opening in new tab');
                    window.open(
                      CALENDLY_URL,
                      '_blank',
                      'noopener,noreferrer,width=800,height=600'
                    );
                  }
                } else {
                  console.warn('Please update CALENDLY_URL in constants.js');
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
          </m.div>
        </m.div>

        <m.div
          className="relative z-0 flex w-full justify-center md:mt-0 md:flex md:max-w-none md:justify-end lg:col-span-7 lg:justify-end xl:translate-x-4 2xl:translate-x-6"
          style={{
            width: '100%',
            maxHeight: '95vh',
            pointerEvents: 'none',
            y: imageParallax,
          }}
        >
          <div
            className="flex w-full max-w-lg flex-col items-stretch justify-end gap-2 pt-2 sm:gap-3 sm:pt-0 md:max-w-none md:items-end"
            style={{
              width: 'clamp(320px, 88vw, 800px)',
            }}
          >
            {/* In document flow above the art — avoids covering the face */}
            <m.div
              className="z-20 flex w-full shrink-0 justify-center sm:justify-end md:pr-1 lg:pr-2"
              style={{ pointerEvents: 'auto' }}
              initial={
                reduceMotion ? false : { opacity: 0, y: 12, scale: 0.96 }
              }
              animate={
                reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }
              }
              transition={{
                delay: reduceMotion ? 0 : 0.5,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <FiverrBadge />
            </m.div>
            <div className={`${styles.imageWrapper} w-full`}>
              <Image
                src="/lottie/231902f6-ec2c-4ae1-b37a-0d9a0efa873c.png"
                alt="Anas Pirzada - Developer illustration"
                width={1152}
                height={768}
                className={`h-auto w-full max-h-[min(95vh,52rem)] object-contain ${styles.heroImage}`}
                style={{
                  maxWidth: '100%',
                }}
                priority
                quality={100}
              />
            </div>
          </div>
        </m.div>
      </div>
    </m.section>
  );
};

export default Hero;
