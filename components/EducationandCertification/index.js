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
    const ctx = gsap.context(() => {
      // Heading reveal animation
      gsap.from(sectionRef.current.querySelectorAll('.staggered-reveal'), {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      // Timeline items animation
      gsap.from('.timeline-item', {
        opacity: 0,
        y: 50,
        stagger: 0.3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom bottom',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={'education'}
      className='w-full relative select-none'
    >
      <div className='section-container py-10 md:py-20 relative'>
        {/* Animated floating book SVG on the right */}
        <motion.div
          className='hidden md:block absolute right-0 top-[-3rem] pointer-events-none'
          style={{
            width: '220px',
          }}
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
            width='220px'
            height='220px'
            viewBox='0 0 100 100'
            xmlns='http://www.w3.org/2000/svg'
          >
            {/* Glow filter */}
            <defs>
              <filter id='bookGlow' x='-50%' y='-50%' width='200%' height='200%'>
                <feGaussianBlur stdDeviation='2' result='coloredBlur' />
                <feMerge>
                  <feMergeNode in='coloredBlur' />
                  <feMergeNode in='SourceGraphic' />
                </feMerge>
              </filter>
              <linearGradient id='bookGradient' x1='0%' y1='0%' x2='100%' y2='100%'>
                <stop offset='0%' stopColor='#efc041' />
                <stop offset='100%' stopColor='#eeba2c' />
              </linearGradient>
            </defs>

            {/* Book base/spine */}
            <motion.path
              d='M20 25 L50 20 L50 80 L20 85 Z'
              fill='rgba(238, 186, 44, 0.2)'
              stroke='#eeba2c'
              strokeWidth='1.5'
              filter='url(#bookGlow)'
            />

            {/* Book back cover */}
            <motion.path
              d='M50 20 L80 25 L80 85 L50 80 Z'
              fill='rgba(238, 186, 44, 0.15)'
              stroke='#eeba2c'
              strokeWidth='1.5'
            />

            {/* Animated page 1 (back) */}
            <motion.path
              d='M50 22 L75 26 L75 82 L50 78 Z'
              fill='rgba(255, 255, 255, 0.05)'
              stroke='rgba(238, 186, 44, 0.4)'
              strokeWidth='0.5'
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

            {/* Animated page 2 (middle) */}
            <motion.path
              d='M50 23 L72 27 L72 81 L50 77 Z'
              fill='rgba(255, 255, 255, 0.08)'
              stroke='rgba(238, 186, 44, 0.5)'
              strokeWidth='0.5'
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

            {/* Animated page 3 (front - main turning page) */}
            <motion.path
              d='M50 24 L70 28 L70 80 L50 76 Z'
              fill='rgba(255, 255, 255, 0.1)'
              stroke='rgba(238, 186, 44, 0.6)'
              strokeWidth='0.8'
              initial={{ rotateY: 0 }}
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

            {/* Text lines on left page */}
            <motion.g
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <line x1='25' y1='35' x2='45' y2='33' stroke='#eeba2c' strokeWidth='0.8' opacity='0.5' />
              <line x1='25' y1='42' x2='43' y2='40' stroke='#eeba2c' strokeWidth='0.8' opacity='0.4' />
              <line x1='25' y1='49' x2='44' y2='47' stroke='#eeba2c' strokeWidth='0.8' opacity='0.5' />
              <line x1='25' y1='56' x2='42' y2='54' stroke='#eeba2c' strokeWidth='0.8' opacity='0.4' />
              <line x1='25' y1='63' x2='45' y2='61' stroke='#eeba2c' strokeWidth='0.8' opacity='0.5' />
              <line x1='25' y1='70' x2='40' y2='68' stroke='#eeba2c' strokeWidth='0.8' opacity='0.4' />
            </motion.g>

            {/* Sparkle effects */}
            <motion.circle
              cx='75'
              cy='30'
              r='1.5'
              fill='#efc041'
              animate={{
                opacity: [0, 1, 0],
                scale: [0.5, 1.2, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.circle
              cx='25'
              cy='75'
              r='1'
              fill='#efc041'
              animate={{
                opacity: [0, 1, 0],
                scale: [0.5, 1.2, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.7,
              }}
            />
            <motion.circle
              cx='65'
              cy='70'
              r='1.2'
              fill='#efc041'
              animate={{
                opacity: [0, 1, 0],
                scale: [0.5, 1.2, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1.4,
              }}
            />
          </svg>
        </motion.div>

        {/* Header + Tabs */}
        <div className='flex flex-col items-start text-left mb-10'>
          <p className='uppercase tracking-widest text-gray-light-1 staggered-reveal text-xs sm:text-sm md:text-base'>
            EDUCATION & CERTIFICATIONS
          </p>
          <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-2 font-medium text-gradient w-fit staggered-reveal'>
            Learning Journey
          </h2>
          {/* Responsive segmented tabs */}
          <div className='mt-8 w-full flex justify-center'>
            <div className='relative bg-gray-900 rounded-2xl overflow-hidden p-1.5 flex max-w-md w-full'>
              {/* Animated gradient indicator */}
              <motion.div
                className='absolute top-1.5 bottom-1.5 rounded-xl bg-gradient-to-r from-[#efc041] to-[#eeba2c] shadow-lg shadow-[#efc041]/30'
                initial={false}
                animate={{
                  left:
                    activeTab === 'education'
                      ? '0.375rem'
                      : 'calc(50% + 0.375rem)',
                  width: 'calc(50% - 0.75rem)',
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />

              {/* Glow effect for active tab */}
              <motion.div
                className='absolute top-1.5 bottom-1.5 rounded-xl bg-[#efc041]/20 blur-xl'
                initial={false}
                animate={{
                  left:
                    activeTab === 'education'
                      ? '0.375rem'
                      : 'calc(50% + 0.375rem)',
                  width: 'calc(50% - 0.75rem)',
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />

              <motion.button
                onClick={() => {
                  tabClickSound.play();
                  setActiveTab('education');
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative z-[1] flex-1 px-6 py-3.5 text-center text-sm sm:text-base font-bold transition-all duration-300 rounded-xl ${
                  activeTab === 'education'
                    ? 'text-black shadow-lg'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <span className='relative z-10'>Education</span>
              </motion.button>

              <motion.button
                onClick={() => {
                  tabClickSound.play();
                  setActiveTab('certifications');
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative z-[1] flex-1 px-6 py-3.5 text-center text-sm sm:text-base font-bold transition-all duration-300 rounded-xl ${
                  activeTab === 'certifications'
                    ? 'text-black shadow-lg'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <span className='relative z-10'>Certifications</span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Timeline list (single column, tabbed) */}
        <div className='relative max-w-4xl mx-auto'>
          {/* Center Vertical line (desktop only) */}
          <div className='hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-[#eeba2c]' />

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className='space-y-8'
          >
            {(activeTab === 'education'
              ? EDUCATION_CONTENTS
              : CERTIFICATION_CONTENTS
            ).map((item, index) => (
              <div key={`${activeTab}-${index}`} className='relative md:pl-0'>
                {/* Dot aligned to center line for each card */}
                <motion.span
                  className='hidden md:block absolute left-[49.4%]  -translate-x-1/2 -translate-y-1/2 top-6 h-3 w-3 rounded-full bg-[#eeba2c] shadow-[0_0_0_4px_rgba(238,186,44,0.2)] '
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
                  className={`timeline-item rounded-xl p-5 bg-gray-dark-2/40 border border-gray-dark-3/60 backdrop-blur-sm shadow-[0_10px_0_rgba(0,0,0,0.0)] transition-all w-full md:w-[48%] ${
                    index % 2 === 0
                      ? 'md:mr-auto md:pr-6'
                      : 'md:ml-auto md:pl-6'
                  }`}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{
                    y: -4,
                    boxShadow: '0 12px 24px rgba(238,186,44,0.12)',
                    borderColor: '#eeba2c',
                    backgroundColor: 'rgba(255,255,255,0.03)',
                  }}
                >
                  <p className='text-[#eeba2c] text-sm font-semibold'>
                    {item.year}
                  </p>
                  <h4 className='text-lg font-bold mt-1'>{item.title}</h4>
                  {item.institute && (
                    <p className='text-gray-400 text-sm'>{item.institute}</p>
                  )}
                  {item.description && (
                    <p className='mt-3 text-gray-300 text-sm'>
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
