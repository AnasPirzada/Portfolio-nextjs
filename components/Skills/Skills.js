/* eslint-disable @next/next/no-img-element */
import { MENULINKS, SKILLS } from '@/constants';
import { useScrollReveal } from '@/hooks';
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
  default: { bg: '#efc041', text: '#000000' },
};

const SkillIcon = memo(({ skill, width = 50, height = 50, index = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const iconRef = useRef(null);
  const colors = SKILL_COLORS[skill] || SKILL_COLORS.default;

  // Wave animation on scroll
  useEffect(() => {
    const icon = iconRef.current;
    if (!icon) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              icon,
              { y: 30, opacity: 0, scale: 0.8 },
              {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.6,
                delay: index * 0.08,
                ease: 'back.out(1.7)',
              }
            );
            observer.unobserve(icon);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(icon);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={iconRef}
      className='relative group'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ opacity: 0 }}
    >
      <div className='transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-2'>
        <Image
          src={`/skills/${skill}.svg`}
          alt={skill}
          width={width}
          height={height}
          className='filter group-hover:drop-shadow-lg'
        />
      </div>

      {/* Animated Badge/Tooltip */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 rounded-lg font-medium text-xs whitespace-nowrap transition-all duration-300 pointer-events-none ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
        }`}
        style={{
          backgroundColor: colors.bg,
          color: colors.text,
          boxShadow: `0 4px 12px ${colors.bg}40`,
          top: '100%',
        }}
      >
        {skill
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')}

        {/* Arrow pointing up */}
        <div
          className='absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45'
          style={{ backgroundColor: colors.bg }}
        />
      </div>
    </div>
  );
});

SkillIcon.displayName = 'SkillIcon';

const Skills = memo(() => {
  const sectionRef = useScrollReveal();

  return (
    <section
      ref={sectionRef}
      id={MENULINKS[1].ref}
      className='w-full relative select-none'
    >
      <div className='py-10 md:py-20 section-container'>
        <img
          src='/right-pattern.svg'
          alt=''
          className='absolute hidden right-0 bottom-2/4 w-2/12 max-w-xs md:block'
          loading='lazy'
          height={700}
          width={320}
        />
        <div className='flex flex-col items-start text-left'>
          <p className='uppercase tracking-widest text-gray-light-1 staggered-reveal text-xs sm:text-sm md:text-base'>
            SKILLS
          </p>
          <h1 className='text-4xl sm:text-5xl md:text-5xl lg:text-6xl 2xl:text-7xl mt-2 font-medium text-gradient w-fit staggered-reveal'>
            My Skills
          </h1>
          <h2 className='text-base sm:text-lg md:text-xl lg:text-2xl font-medium md:max-w-lg w-full mt-2 staggered-reveal'>
            I like to take responsibility to craft aesthetic user experience
            using modern frontend architecture.{' '}
          </h2>
        </div>
        <div className='flex flex-col skills-wrapper'>
          <div className='mt-8 sm:mt-10'>
            <h3 className='uppercase tracking-widest text-gray-light-2 font-medium text-base sm:text-lg mb-3 sm:mb-4 staggered-reveal'>
              LANGUAGES AND TOOLS
            </h3>
            <div className='flex items-center flex-wrap gap-4 sm:gap-6 staggered-reveal'>
              {SKILLS.languagesAndTools.map((skill, index) => (
                <SkillIcon
                  key={skill}
                  skill={skill}
                  width={40}
                  height={40}
                  index={index}
                />
              ))}
            </div>
          </div>
          <div className='mt-8 sm:mt-10'>
            <h3 className='uppercase tracking-widest text-gray-light-2 font-medium text-base sm:text-lg mb-3 sm:mb-4 staggered-reveal'>
              LIBRARIES AND FRAMEWORKS
            </h3>
            <div className='flex flex-wrap gap-4 sm:gap-6 transform-gpu staggered-reveal'>
              {SKILLS.librariesAndFrameworks.map((skill, index) => (
                <SkillIcon
                  key={skill}
                  skill={skill}
                  width={40}
                  height={40}
                  index={index}
                />
              ))}
            </div>
          </div>
          <div className='flex flex-col sm:flex-row flex-wrap mt-8 sm:mt-10'>
            <div className='mb-6 sm:mb-0 sm:mr-16 xs:sm:mr-20 staggered-reveal'>
              <h3 className='uppercase tracking-widest text-gray-light-2 font-medium text-base sm:text-lg mb-3 sm:mb-4'>
                DATABASES
              </h3>
              <div className='flex flex-wrap gap-4 sm:gap-6 transform-gpu'>
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
            </div>
            <div className='staggered-reveal'>
              <h3 className='uppercase tracking-widest text-gray-light-2 font-medium text-base sm:text-lg mb-3 sm:mb-4'>
                Other
              </h3>
              <div className='flex flex-wrap gap-4 sm:gap-6 transform-gpu'>
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

Skills.displayName = 'Skills';
export default Skills;
