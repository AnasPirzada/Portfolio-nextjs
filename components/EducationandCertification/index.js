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
        {/* Header + Tabs */}
        <RevealStagger className="flex flex-col items-start text-left mb-10">
          <RevealItem as={m.div} className="mb-5 flex items-center gap-3 md:mb-6">
            <span className="h-px w-8 bg-accent-light/70" aria-hidden />
            <span className="font-mono text-xs sm:text-sm tracking-wide text-accent-light">
              Education &amp; Certifications
            </span>
          </RevealItem>
          <RevealItem
            as={m.h2}
            className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl w-fit"
          >
            Learning journey
          </RevealItem>
          <RevealItem
            as={m.p}
            className="text-base sm:text-lg md:text-xl font-medium md:max-w-lg w-full mt-3 text-gray-light-4 dark:text-gray-light-3"
          >
            My educational background and professional certifications.
          </RevealItem>
          {/* Clean minimal tabs */}
          <div className="mt-8 w-full flex justify-center">
            <div className="relative bg-gray-light-2/80 dark:bg-gray-dark-3/50 rounded-full p-1 flex max-w-md w-full border border-gray-light-2 dark:border-gray-dark-2/50">
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
                {/* Dot aligned to center line for each card (static — no infinite pulse) */}
                <span className="hidden md:block absolute left-[49.4%] -translate-x-1/2 -translate-y-1/2 top-6 h-3 w-3 rounded-full bg-accent-dark shadow-[0_0_0_4px_color-mix(in_srgb,var(--accent-dark)_20%,transparent)]" />

                {/* Card */}
                <motion.div
                  className={`timeline-item rounded-xl p-5 bg-gradient-to-br from-accent-light/5 to-accent-dark/5 border border-accent-light/20 shadow-[0_10px_0_rgba(0,0,0,0.0)] transition-all w-full md:w-[48%] ${
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
