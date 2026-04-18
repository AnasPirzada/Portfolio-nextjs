/* eslint-disable @next/next/no-img-element */
'use client';

import { RevealItem, RevealStagger } from '@/components/ui/Reveal';
import { defaultViewport } from '@/lib/motionVariants';
import { motion, m } from 'framer-motion';
import { Howl } from 'howler';
import { useState } from 'react';
import { CERTIFICATION_CONTENTS, EDUCATION_CONTENTS } from '../../constants';

const EducationSection = () => {
  const [activeTab, setActiveTab] = useState('education'); // 'education' | 'certifications'
  const tabClickSound = new Howl({
    src: ['/sounds/mouse-click.mp3'],
    volume: 0.3,
  });

  return (
    <section id="education" className="w-full relative select-none">
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
                <stop offset="0%" stopColor="var(--accent-light)" />
                <stop offset="50%" stopColor="var(--accent-dark)" />
                <stop offset="100%" stopColor="var(--accent-dark)" />
              </linearGradient>
            </defs>

            <g opacity="0.7">
              {/* Book spine */}
              <motion.path
                d="M20 25 L50 20 L50 80 L20 85 Z"
                fill="color-mix(in srgb, var(--accent-light) 15%, transparent)"
                stroke="url(#bookGradient)"
                strokeWidth="1.5"
                filter="url(#bookGlow)"
              />

              {/* Book back cover */}
              <motion.path
                d="M50 20 L80 25 L80 85 L50 80 Z"
                fill="color-mix(in srgb, var(--accent-dark) 10%, transparent)"
                stroke="url(#bookGradient)"
                strokeWidth="1.5"
              />

              {/* Animated pages */}
              <motion.path
                d="M50 22 L75 26 L75 82 L50 78 Z"
                fill="color-mix(in srgb, var(--accent-light) 5%, transparent)"
                stroke="var(--accent-light)"
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
                fill="color-mix(in srgb, var(--accent-dark) 8%, transparent)"
                stroke="var(--accent-dark)"
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
                fill="color-mix(in srgb, var(--accent-light) 10%, transparent)"
                stroke="var(--accent-dark)"
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
                  stroke="var(--accent-light)"
                  strokeWidth="0.8"
                  opacity="0.5"
                />
                <line
                  x1="25"
                  y1="42"
                  x2="43"
                  y2="40"
                  stroke="var(--accent-dark)"
                  strokeWidth="0.8"
                  opacity="0.4"
                />
                <line
                  x1="25"
                  y1="49"
                  x2="44"
                  y2="47"
                  stroke="var(--accent-dark)"
                  strokeWidth="0.8"
                  opacity="0.5"
                />
                <line
                  x1="25"
                  y1="56"
                  x2="42"
                  y2="54"
                  stroke="var(--accent-light)"
                  strokeWidth="0.8"
                  opacity="0.4"
                />
                <line
                  x1="25"
                  y1="63"
                  x2="45"
                  y2="61"
                  stroke="var(--accent-dark)"
                  strokeWidth="0.8"
                  opacity="0.5"
                />
                <line
                  x1="25"
                  y1="70"
                  x2="40"
                  y2="68"
                  stroke="var(--accent-dark)"
                  strokeWidth="0.8"
                  opacity="0.4"
                />
              </motion.g>

              {/* Sparkles */}
              <motion.circle
                cx="75"
                cy="30"
                r="1.5"
                fill="var(--accent-light)"
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
                fill="var(--accent-dark)"
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
                fill="var(--accent-dark)"
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
        <RevealStagger className="flex flex-col items-start text-left mb-10">
          <RevealItem
            as={m.p}
            className="uppercase tracking-widest text-gray-light-1 text-xs sm:text-sm md:text-base"
          >
            EDUCATION & CERTIFICATIONS
          </RevealItem>
          <RevealItem
            as={m.h2}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-2 font-medium text-gradient w-fit"
          >
            Learning Journey
          </RevealItem>
          <RevealItem
            as={m.p}
            className="text-base sm:text-lg md:text-xl font-medium md:max-w-lg w-full mt-3 text-gray-light-4 dark:text-gray-light-3"
          >
            My educational background and professional certifications.
          </RevealItem>
          {/* Clean minimal tabs */}
          <div className="mt-8 w-full flex justify-center">
            <div className="relative bg-gray-light-2/80 dark:bg-gray-dark-3/50 backdrop-blur-sm rounded-full p-1 flex max-w-md w-full border border-gray-light-2 dark:border-gray-dark-2/50">
              {/* Animated indicator */}
              <motion.div
                className="absolute top-1 bottom-1 rounded-full bg-gradient-to-r from-accent-light to-accent-dark"
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
        </RevealStagger>

        {/* Timeline list (single column, tabbed) */}
        <div className="relative max-w-4xl mx-auto">
          {/* Center Vertical line (desktop only) */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-accent-dark" />

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
                  className="hidden md:block absolute left-[49.4%]  -translate-x-1/2 -translate-y-1/2 top-6 h-3 w-3 rounded-full bg-accent-dark shadow-[0_0_0_4px_color-mix(in_srgb,var(--accent-dark)_20%,transparent)] "
                  animate={{
                    scale: [1, 1.3, 1],
                    boxShadow: [
                      '0 0 0 0 color-mix(in srgb, var(--accent-dark) 50%, transparent)',
                      '0 0 0 10px color-mix(in srgb, var(--accent-dark) 0%, transparent)',
                      '0 0 0 0 color-mix(in srgb, var(--accent-dark) 0%, transparent)',
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
                  className={`timeline-item rounded-xl p-5 bg-gradient-to-br from-accent-light/5 to-accent-dark/5 border border-accent-light/20 backdrop-blur-sm shadow-[0_10px_0_rgba(0,0,0,0.0)] transition-all w-full md:w-[48%] ${
                    index % 2 === 0
                      ? 'md:mr-auto md:pr-6'
                      : 'md:ml-auto md:pl-6'
                  }`}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={defaultViewport}
                  transition={{
                    duration: 0.45,
                    delay: Math.min(index * 0.08, 0.4),
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  whileHover={{
                    y: -4,
                    boxShadow:
                      '0 12px 24px color-mix(in srgb, var(--accent-dark) 12%, transparent)',
                    borderColor: 'var(--accent-dark)',
                  }}
                >
                  <p className="text-accent-dark text-sm font-semibold">
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
