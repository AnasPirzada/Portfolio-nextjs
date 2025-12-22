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
      gsap.from(
        sectionRef.current.querySelectorAll('.staggered-reveal'),
        {
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
        }
      );

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
        {/* Floating themed SVG on the right */}
        <img
          src='/right-book.svg'
          alt='decorative book'
          className='hidden md:block absolute right-0 top-[-3rem] rotate-12 pointer-events-none'
          style={{ width: '220px', opacity: 1 }}
        />

        {/* Header + Tabs */}
        <div className='flex flex-col items-start text-left mb-10'>
          <p className='uppercase tracking-widest text-gray-light-1 staggered-reveal'>
            EDUCATION & CERTIFICATIONS
          </p>
          <h2 className='text-5xl mt-2 font-medium text-gradient w-fit staggered-reveal'>
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
