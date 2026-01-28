/* eslint-disable @next/next/no-img-element */
'use client';

import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Howl } from 'howler';
import { useLayoutEffect, useRef, useState } from 'react';
import { CERTIFICATION_CONTENTS, EDUCATION_CONTENTS } from '../../constants';

gsap.registerPlugin(ScrollTrigger);

const EducationSection = () => {
  const sectionRef = useRef(null);
  const [activeTab, setActiveTab] = useState('education'); // 'education' | 'certifications'
  const tabClickSound = new Howl({
    src: ['/sounds/mouse-click.mp3'],
    volume: 0.3,
  });

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // On mobile/tablet, skip scroll-based GSAP and keep content static
      if (typeof window !== 'undefined') {
        const isMobile = window.innerWidth < 1024;
        if (isMobile) {
          const staggeredElements =
            sectionRef.current.querySelectorAll('.staggered-reveal');
          const timelineItems =
            sectionRef.current.querySelectorAll('.timeline-item');

          gsap.set(staggeredElements, { opacity: 1, y: 0 });
          gsap.set(timelineItems, { opacity: 1, y: 0 });
          return;
        }
      }

      const staggeredElements =
        sectionRef.current.querySelectorAll('.staggered-reveal');
      const timelineItems =
        sectionRef.current.querySelectorAll('.timeline-item');

      if (staggeredElements.length > 0) {
        // Set initial state
        gsap.set(staggeredElements, { opacity: 0, y: 30 });
        
        // Heading reveal animation - one time only
        gsap.to(staggeredElements, {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
            toggleActions: 'play none none none',
          },
        });
      }

      if (timelineItems.length > 0) {
        // Set initial state
        gsap.set(timelineItems, { opacity: 0, y: 40 });
        
        // Timeline items animation - one time only
        gsap.to(timelineItems, {
          opacity: 1,
          y: 0,
          stagger: 0.3,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
            toggleActions: 'play none none none',
          },
        });
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [activeTab]); // Re-run when tab changes

  return (
    <section
      ref={sectionRef}
      id={'education'}
      className="w-full relative select-none"
    >
      <div className="section-container pt-10 md:pt-20 pb-6 md:pb-10 relative">
        {/* Animated floating book SVG on the right - matching gold color scheme */}
        <motion.div
          className="hidden md:block absolute right-0 top-[-3rem] pointer-events-none"
          style={{ width: '220px' }}
          animate={{
            y: [0, -15, 0],
            rotate: [12, 8, 12],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <svg
            width="220px"
            height="220px"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter
                id="bookGlow"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient
                id="bookGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#efc041" />
                <stop offset="50%" stopColor="#eeba2c" />
                <stop offset="100%" stopColor="#d4a429" />
              </linearGradient>
            </defs>

            <g opacity="0.7">
              {/* Book spine */}
              <motion.path
                d="M20 25 L50 20 L50 80 L20 85 Z"
                fill="rgba(239, 192, 65, 0.15)"
                stroke="url(#bookGradient)"
                strokeWidth="1.5"
                filter="url(#bookGlow)"
              />

              {/* Book back cover */}
              <motion.path
                d="M50 20 L80 25 L80 85 L50 80 Z"
                fill="rgba(238, 186, 44, 0.1)"
                stroke="url(#bookGradient)"
                strokeWidth="1.5"
              />

              {/* Animated pages */}
              <motion.path
                d="M50 22 L75 26 L75 82 L50 78 Z"
                fill="rgba(239, 192, 65, 0.05)"
                stroke="#efc041"
                strokeWidth="0.5"
                strokeOpacity="0.4"
                animate={{
                  d: [
                    'M50 22 L75 26 L75 82 L50 78 Z',
                    'M50 22 L70 24 L70 80 L50 78 Z',
                    'M50 22 L75 26 L75 82 L50 78 Z',
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.5,
                }}
              />

              <motion.path
                d="M50 23 L72 27 L72 81 L50 77 Z"
                fill="rgba(238, 186, 44, 0.08)"
                stroke="#eeba2c"
                strokeWidth="0.5"
                strokeOpacity="0.5"
                animate={{
                  d: [
                    'M50 23 L72 27 L72 81 L50 77 Z',
                    'M50 23 L60 25 L60 79 L50 77 Z',
                    'M50 23 L72 27 L72 81 L50 77 Z',
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.3,
                }}
              />

              <motion.path
                d="M50 24 L70 28 L70 80 L50 76 Z"
                fill="rgba(212, 164, 41, 0.1)"
                stroke="#d4a429"
                strokeWidth="0.8"
                strokeOpacity="0.6"
                animate={{
                  d: [
                    'M50 24 L70 28 L70 80 L50 76 Z',
                    'M50 24 L50 24 L50 76 L50 76 Z',
                    'M50 24 L30 28 L30 80 L50 76 Z',
                    'M50 24 L50 24 L50 76 L50 76 Z',
                    'M50 24 L70 28 L70 80 L50 76 Z',
                  ],
                  opacity: [1, 0.8, 1, 0.8, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              {/* Text lines */}
              <motion.g
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <line
                  x1="25"
                  y1="35"
                  x2="45"
                  y2="33"
                  stroke="#efc041"
                  strokeWidth="0.8"
                  opacity="0.5"
                />
                <line
                  x1="25"
                  y1="42"
                  x2="43"
                  y2="40"
                  stroke="#eeba2c"
                  strokeWidth="0.8"
                  opacity="0.4"
                />
                <line
                  x1="25"
                  y1="49"
                  x2="44"
                  y2="47"
                  stroke="#d4a429"
                  strokeWidth="0.8"
                  opacity="0.5"
                />
                <line
                  x1="25"
                  y1="56"
                  x2="42"
                  y2="54"
                  stroke="#efc041"
                  strokeWidth="0.8"
                  opacity="0.4"
                />
                <line
                  x1="25"
                  y1="63"
                  x2="45"
                  y2="61"
                  stroke="#eeba2c"
                  strokeWidth="0.8"
                  opacity="0.5"
                />
                <line
                  x1="25"
                  y1="70"
                  x2="40"
                  y2="68"
                  stroke="#d4a429"
                  strokeWidth="0.8"
                  opacity="0.4"
                />
              </motion.g>

              {/* Sparkles */}
              <motion.circle
                cx="75"
                cy="30"
                r="1.5"
                fill="#efc041"
                animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <motion.circle
                cx="25"
                cy="75"
                r="1"
                fill="#eeba2c"
                animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.7,
                }}
              />
              <motion.circle
                cx="65"
                cy="70"
                r="1.2"
                fill="#d4a429"
                animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1.4,
                }}
              />
            </g>
          </svg>
        </motion.div>

        {/* Header + Tabs */}
        <div className="flex flex-col items-start text-left mb-10">
          <p className="uppercase tracking-widest text-gray-light-1 staggered-reveal text-xs sm:text-sm md:text-base">
            EDUCATION & CERTIFICATIONS
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-2 font-medium text-gradient w-fit staggered-reveal">
            Learning Journey
          </h2>
          <p className="text-base sm:text-lg md:text-xl font-medium md:max-w-lg w-full mt-3 text-gray-light-4 dark:text-gray-light-3 staggered-reveal">
            My educational background and professional certifications.
          </p>
          {/* Clean minimal tabs */}
          <div className="mt-8 w-full flex justify-center">
            <div className="relative bg-gray-light-2/80 dark:bg-gray-dark-3/50 backdrop-blur-sm rounded-full p-1 flex max-w-md w-full border border-gray-light-2 dark:border-gray-dark-2/50">
              {/* Animated indicator */}
              <motion.div
                className="absolute top-1 bottom-1 rounded-full bg-gradient-to-r from-[#efc041] to-[#eeba2c]"
                initial={false}
                animate={{
                  left:
                    activeTab === 'education'
                      ? '0.25rem'
                      : 'calc(50% + 0.25rem)',
                  width: 'calc(50% - 0.5rem)',
                }}
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
              />

              <motion.button
                onClick={() => {
                  tabClickSound.play();
                  setActiveTab('education');
                }}
                whileTap={{ scale: 0.97 }}
                className={`relative z-[1] flex-1 px-6 py-2.5 text-center text-sm font-semibold transition-colors duration-200 rounded-full ${
                  activeTab === 'education'
                    ? 'text-black'
                    : 'text-gray-light-4 dark:text-gray-light-3 hover:text-gray-dark-3 dark:hover:text-white'
                }`}
              >
                Education
              </motion.button>

              <motion.button
                onClick={() => {
                  tabClickSound.play();
                  setActiveTab('certifications');
                }}
                whileTap={{ scale: 0.97 }}
                className={`relative z-[1] flex-1 px-6 py-2.5 text-center text-sm font-semibold transition-colors duration-200 rounded-full ${
                  activeTab === 'certifications'
                    ? 'text-black'
                    : 'text-gray-light-4 dark:text-gray-light-3 hover:text-gray-dark-3 dark:hover:text-white'
                }`}
              >
                Certifications
              </motion.button>
            </div>
          </div>
        </div>

        {/* Timeline list (single column, tabbed) */}
        <div className="relative max-w-4xl mx-auto">
          {/* Center Vertical line (desktop only) */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-[#eeba2c]" />

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {(activeTab === 'education'
              ? EDUCATION_CONTENTS
              : CERTIFICATION_CONTENTS
            ).map((item, index) => (
              <div key={`${activeTab}-${index}`} className="relative md:pl-0">
                {/* Dot aligned to center line for each card */}
                <motion.span
                  className="hidden md:block absolute left-[49.4%]  -translate-x-1/2 -translate-y-1/2 top-6 h-3 w-3 rounded-full bg-[#eeba2c] shadow-[0_0_0_4px_rgba(238,186,44,0.2)] "
                  animate={{
                    scale: [1, 1.3, 1],
                    boxShadow: [
                      '0 0 0 0 rgba(238,186,44,0.5)',
                      '0 0 0 10px rgba(238,186,44,0)',
                      '0 0 0 0 rgba(238,186,44,0)',
                    ],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />

                {/* Card */}
                <motion.div
                  className={`timeline-item rounded-xl p-5 bg-gradient-to-br from-[#efc041]/5 to-[#eeba2c]/5 border border-[#efc041]/20 backdrop-blur-sm shadow-[0_10px_0_rgba(0,0,0,0.0)] transition-all w-full md:w-[48%] ${
                    index % 2 === 0
                      ? 'md:mr-auto md:pr-6'
                      : 'md:ml-auto md:pl-6'
                  }`}
                  initial={{ opacity: 1, y: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: '0px' }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{
                    y: -4,
                    boxShadow: '0 12px 24px rgba(238,186,44,0.12)',
                    borderColor: '#eeba2c',
                  }}
                >
                  <p className="text-[#eeba2c] text-sm font-semibold">
                    {item.year}
                  </p>
                  <h4 className="text-lg font-bold mt-1 text-gray-dark-1 dark:text-white">
                    {item.title}
                  </h4>
                  {item.institute && (
                    <p className="text-gray-light-4 dark:text-gray-light-2 text-sm">
                      {item.institute}
                    </p>
                  )}
                  {item.description && (
                    <p className="mt-3 text-gray-light-4 dark:text-gray-light-2 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </motion.div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
