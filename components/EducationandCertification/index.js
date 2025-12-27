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
        <div
          className='hidden md:block absolute right-0 top-[-3rem] pointer-events-none'
          style={{ 
            width: '220px',
            opacity: 0.5,
            transform: 'rotate(12deg)',
          }}
        >
          <svg
            fill="rgba(238, 186, 44, 0.3)"
            stroke="#eeba2c"
            strokeWidth="1.5"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="220px"
            height="220px"
            viewBox="0 0 194.315 194.315"
            xmlSpace="preserve"
          >
            <g>
              <path
                d="M192.396,100.661c-4.841-11.266-12.321-21.448-17.95-32.376c-2.775-5.386-10.177-20.047-18.026-15.472
                c-3.848-4.696-8.917-7.23-16.276-5.441c-0.359-0.391-0.694-0.804-1.068-1.18c-0.17-0.171-0.371-0.309-0.589-0.417
                c0.173-1.202-0.7-2.449-2.188-2.625c-3.701-0.437-8.128,1.575-11.626,2.666c-4.995,1.559-9.849,3.587-14.422,6.131
                c-5.553,3.089-11.236,8.494-12.099,14.892c-6.104-8.394-12.26-15.365-21.301-20.629c-3.653-2.126-13.653-7.557-17.628-3.771
                c-1.476,1.405-2.786,2.928-4.018,4.506c-5.137-5.319-11.285-1.017-15.716,4.22c-0.921-0.719-1.539-0.926-3.335-1.649
                c-0.706-0.285-1.638,0.059-2.145,0.566C20.231,63.886,11.138,83.621,2.47,100.885c-1.687,3.359-4.366,10.028-0.436,12.923
                c4.625,3.406,11.804,3.972,17.229,5.37c10.848,2.797,21.509,9.128,31.735,13.687c11.262,5.021,22.665,9.818,33.707,15.312
                c5.627,2.799,11.684,6.831,18.084,4.099c11.864-5.062,23.065-10.43,35.434-14.343c14.35-4.539,29.016-9.052,42.885-14.914
                C191.977,118.425,197.501,112.542,192.396,100.661z M159.556,69.341c5.764,11.952,12.984,23.141,17.439,35.668
                c-7.02,0.881-13.666,1.111-20.484,3.699c-6.146,2.332-11.824,5.84-17.423,9.23c-9.466,5.736-19.201,10.913-28.799,16.362
                c6.471-4.815,12.725-10.011,18.69-15.055c5.247-4.437,10.328-8.798,16.436-12.026c3.851-2.035,8.444-2.957,12.68-3.804
                c0.834-0.167,3.784-1.045,5.698-1.274c0.532,0.455,1.236,0.668,1.974,0.37l0.842-0.339c1.419-0.572,2.601-2.303,1.547-3.802
                c-0.271-0.385-0.578-0.688-0.91-0.931c-3.077-8.428-8.387-16.634-12.252-24.757c-3.265-6.862-6.546-14.286-11.045-20.635
                C153.286,52.437,155.554,61.043,159.556,69.341z M100.918,70.783c2.559-7.688,7.539-12.109,14.925-15.866
                c3.736-1.899,7.768-3.219,11.765-4.446c2.385-0.733,5.2-1.073,7.625-1.992c0.054,0.186,0.127,0.361,0.224,0.506
                c5.669,8.47,10.349,17.312,14.757,26.494c3.216,6.695,6.035,15.43,10.663,21.741c-0.54,0.134-1.063,0.271-1.557,0.385
                c-8.737,2.022-16.001,3.75-23.529,8.897c-6.965,4.764-13.203,10.781-19.826,16.01c-5.557,4.387-11.297,8.831-16.496,13.75
                c0.144-0.469,0.3-0.937,0.472-1.414c0.377-1.047-0.112-1.909-0.885-2.369C101.487,117.667,104.29,81.42,100.918,70.783z
                 M18.117,104.6c3.101-13.131,10.062-24.815,16.722-36.453c2.15-3.758,4.051-7.648,6.279-11.363
                c3.352-5.588,6.227-7.397,11.69-6.503c-3.595,5.491-6.233,11.626-8.801,17.673c-2.168,5.104-4.372,10.059-7.338,14.755
                c-2.321,3.676-5.342,7.621-5.712,12.007c-3.099,0.489-2.256,4.445,0.086,4.404c-0.002,0.002-0.003,0.004-0.005,0.007
                c16.994,1.217,28.611,10.022,38.824,21.102C53.96,111.648,34.157,107.673,18.117,104.6z M35.487,94.392
                c8.572-12.254,12.84-26.872,20.164-39.821c0.827-1.462,4.857-8.893,7.249-8.438c4.064,0.771,7.892,2.28,11.498,4.272
                c8.718,4.814,13.954,11.706,20.046,19.32c0.572,0.714,1.369,0.851,2.109,0.646c0.089,0.266,0.218,0.526,0.439,0.768
                c-1.521-1.654-0.627,0.237-0.479,1.931c0.214,2.442,0.192,4.911,0.195,7.359c0.009,7.263-0.269,14.537-0.569,21.793
                c-0.462,11.188-0.425,22.707-1.628,33.866c-0.526,1.335-0.929,2.746-1.084,4.062C78.476,122.424,61.532,94.093,35.487,94.392z"
              />
            </g>
          </svg>
        </div>

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
