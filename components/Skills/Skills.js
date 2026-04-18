/* eslint-disable @next/next/no-img-element */
import { RevealItem, RevealStagger } from '@/components/ui/Reveal';
import { MENULINKS, SKILLS } from '@/constants';
import { useTheme } from '@/contexts/ThemeContext';
import { prefersReducedMotion } from '@/utils/scrollRevealSupport';
import { m, useReducedMotion } from 'framer-motion';
import gsap from 'gsap';
import Image from 'next/image';
import { memo, useEffect, useRef, useState } from 'react';

// Skill icon colors mapping
const SKILL_COLORS = {
  html: { bg: '#E34F26', text: '#FFFFFF' },
  css: { bg: '#1572B6', text: '#FFFFFF' },
  javascript: { bg: '#F7DF1E', text: '#000000' },
  typescript: { bg: '#3178C6', text: '#FFFFFF' },
  react: { bg: '#61DAFB', text: '#000000' },
  nextjs: { bg: '#1a1a1a', text: '#FFFFFF' },
  nestjs: { bg: '#E0234E', text: '#FFFFFF' },
  nodejs: { bg: '#339933', text: '#FFFFFF' },
  git: { bg: '#F05032', text: '#FFFFFF' },
  sass: { bg: '#CC6699', text: '#FFFFFF' },
  tailwindcss: { bg: '#06B6D4', text: '#FFFFFF' },
  mongodb: { bg: '#47A248', text: '#FFFFFF' },
  mysql: { bg: '#4479A1', text: '#FFFFFF' },
  firebase: { bg: '#FFCA28', text: '#000000' },
  figma: { bg: '#F24E1E', text: '#FFFFFF' },
  postman: { bg: '#FF6C37', text: '#FFFFFF' },
  redux: { bg: '#764ABC', text: '#FFFFFF' },
  gsap: { bg: '#88CE02', text: '#000000' },
  webpack: { bg: '#8DD6F9', text: '#000000' },
  vite: { bg: '#646CFF', text: '#FFFFFF' },
  'framer-motion': { bg: '#0055FF', text: '#FFFFFF' },
  django: { bg: '#0d4a2a', text: '#FFFFFF' },
  laravel: { bg: '#FF2D20', text: '#FFFFFF' },
  'chakra-ui': { bg: '#319795', text: '#FFFFFF' },
  antdesign: { bg: '#0170FE', text: '#FFFFFF' },
  'sanity-io': { bg: '#F03E2F', text: '#FFFFFF' },
  emailjs: { bg: '#EA4335', text: '#FFFFFF' },
  styledcomponents: { bg: '#DB7093', text: '#FFFFFF' },
  'tanstack-query': { bg: '#FF4154', text: '#FFFFFF' },
  Turborepo: { bg: '#EF4444', text: '#FFFFFF' },
  ShadcnUi: { bg: '#1a1a1a', text: '#FFFFFF' },
  default: { bg: '#c8860a', text: '#000000' },
};

const SKILL_DISPLAY_LABEL = {
  nestjs: 'Nest.js',
};

const SkillIcon = memo(({ skill, width = 50, height = 50, index = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const iconRef = useRef(null);
  const { isDark } = useTheme();
  const reduceMotion = useReducedMotion();
  const colors = SKILL_COLORS[skill] || SKILL_COLORS.default;

  // Wave animation on scroll - simple one-time reveal
  useEffect(() => {
    const icon = iconRef.current;
    if (!icon) return;

    const isCoarse =
      typeof window !== 'undefined' &&
      window.matchMedia('(max-width: 768px)').matches;
    if (prefersReducedMotion() || isCoarse) {
      gsap.set(icon, { y: 0, opacity: 1, scale: 1 });
      return;
    }

    gsap.set(icon, { y: 20, opacity: 0, scale: 0.95 });

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            gsap.to(icon, {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.55,
              delay: index * 0.06,
              ease: 'power3.out',
            });
            observer.unobserve(icon);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -8% 0px',
      }
    );

    observer.observe(icon);
    return () => {
      observer.disconnect();
    };
  }, [index]);

  return (
    <div
      ref={iconRef}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <m.div
        className="origin-center"
        whileHover={
          reduceMotion
            ? undefined
            : {
                y: -8,
                scale: 1.1,
                rotate: 6,
                transition: {
                  type: 'spring',
                  stiffness: 400,
                  damping: 26,
                },
              }
        }
        whileTap={
          reduceMotion
            ? undefined
            : { scale: 0.94, transition: { duration: 0.15 } }
        }
      >
        <Image
          src={`/skills/${skill}.svg`}
          alt={skill}
          width={width}
          height={height}
          unoptimized
          className={`filter transition-shadow duration-300 group-hover:drop-shadow-[0_8px_24px_color-mix(in_srgb,var(--accent-light)_25%,transparent)] ${
            skill === 'nextjs' ? 'nextjs-icon' : ''
          }`}
        />
      </m.div>

      {/* Animated Badge/Tooltip */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 rounded-lg font-medium text-xs whitespace-nowrap transition-all duration-300 pointer-events-none skill-tooltip ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
        }`}
        style={{
          backgroundColor: colors.bg,
          ...(isDark ? { color: colors.text } : {}),
          boxShadow: `0 4px 12px ${colors.bg}40`,
          top: '100%',
        }}
      >
        {SKILL_DISPLAY_LABEL[skill] ||
          skill
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')}

        {/* Arrow pointing up */}
        <div
          className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45"
          style={{ backgroundColor: colors.bg }}
        />
      </div>
    </div>
  );
});

SkillIcon.displayName = 'SkillIcon';

const Skills = memo(() => {
  return (
    <m.section
      id={MENULINKS[1].ref}
      className="relative w-full select-none overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0 hidden lg:dark:block"
        aria-hidden
      >
        <div className="absolute -right-10 top-10 h-80 w-80 rounded-full bg-accent-light/[0.07] blur-[90px]" />
        <div className="absolute bottom-20 left-[-4rem] h-64 w-64 rounded-full bg-accent-dark/[0.06] blur-[80px]" />
      </div>
      <div className="section-container relative z-10 py-10 md:py-20">
        <img
          src="/right-pattern.svg"
          alt=""
          className="absolute right-0 bottom-2/4 hidden w-2/12 max-w-xs opacity-80 md:block md:opacity-100"
          loading="lazy"
          height={700}
          width={320}
        />
        <RevealStagger className="flex flex-col items-start text-left">
          <RevealItem
            as={m.p}
            className="uppercase tracking-widest text-gray-light-1 text-xs sm:text-sm md:text-base"
          >
            SKILLS
          </RevealItem>
          <RevealItem
            as={m.h1}
            className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl 2xl:text-7xl mt-2 font-medium text-gradient w-fit"
          >
            My Skills
          </RevealItem>
          <RevealItem
            as={m.h2}
            className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium md:max-w-lg w-full mt-2"
          >
            I like to take responsibility to craft aesthetic user experience
            using modern frontend architecture.{' '}
          </RevealItem>
        </RevealStagger>
        <RevealStagger className="flex flex-col skills-wrapper">
          <div className="mt-8 sm:mt-10">
            <RevealItem
              as={m.h3}
              className="uppercase tracking-widest text-gray-light-2 font-medium text-base sm:text-lg mb-3 sm:mb-4"
            >
              LANGUAGES AND TOOLS
            </RevealItem>
            <RevealItem className="flex items-center flex-wrap gap-4 sm:gap-6">
              {SKILLS.languagesAndTools.map((skill, index) => (
                <SkillIcon
                  key={skill}
                  skill={skill}
                  width={40}
                  height={40}
                  index={index}
                />
              ))}
            </RevealItem>
          </div>
          <div className="mt-8 sm:mt-10">
            <RevealItem
              as={m.h3}
              className="uppercase tracking-widest text-gray-light-2 font-medium text-base sm:text-lg mb-3 sm:mb-4"
            >
              LIBRARIES AND FRAMEWORKS
            </RevealItem>
            <RevealItem className="flex flex-wrap gap-4 sm:gap-6 transform-gpu">
              {SKILLS.librariesAndFrameworks.map((skill, index) => (
                <SkillIcon
                  key={skill}
                  skill={skill}
                  width={40}
                  height={40}
                  index={index}
                />
              ))}
            </RevealItem>
          </div>
          <div className="flex flex-col sm:flex-row flex-wrap mt-8 sm:mt-10">
            <RevealItem className="mb-6 sm:mb-0 sm:mr-16 xs:sm:mr-20">
              <h3 className="uppercase tracking-widest text-gray-light-2 font-medium text-base sm:text-lg mb-3 sm:mb-4">
                DATABASES
              </h3>
              <div className="flex flex-wrap gap-4 sm:gap-6 transform-gpu">
                {SKILLS.databases.map((skill, index) => (
                  <SkillIcon
                    key={skill}
                    skill={skill}
                    width={40}
                    height={40}
                    index={index}
                  />
                ))}
              </div>
            </RevealItem>
            <RevealItem>
              <h3 className="uppercase tracking-widest text-gray-light-2 font-medium text-base sm:text-lg mb-3 sm:mb-4">
                Other
              </h3>
              <div className="flex flex-wrap gap-4 sm:gap-6 transform-gpu">
                {SKILLS.other.map((skill, index) => (
                  <SkillIcon
                    key={skill}
                    skill={skill}
                    width={40}
                    height={40}
                    index={index}
                  />
                ))}
              </div>
            </RevealItem>
          </div>
        </RevealStagger>
      </div>
    </m.section>
  );
});

Skills.displayName = 'Skills';
export default Skills;
