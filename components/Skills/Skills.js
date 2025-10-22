/* eslint-disable @next/next/no-img-element */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Image from 'next/image';
import { useLayoutEffect, useRef, useState } from 'react';
import { MENULINKS, SKILLS } from '../../constants';

// Skill icon colors mapping
const SKILL_COLORS = {
  html: { bg: '#E34F26', text: '#FFFFFF' },
  css: { bg: '#1572B6', text: '#FFFFFF' },
  javascript: { bg: '#F7DF1E', text: '#000000' },
  typescript: { bg: '#3178C6', text: '#FFFFFF' },
  react: { bg: '#61DAFB', text: '#000000' },
  nextjs: { bg: '#000000', text: '#FFFFFF' },
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
  django: { bg: '#092E20', text: '#FFFFFF' },
  laravel: { bg: '#FF2D20', text: '#FFFFFF' },
  'chakra-ui': { bg: '#319795', text: '#FFFFFF' },
  antdesign: { bg: '#0170FE', text: '#FFFFFF' },
  'sanity-io': { bg: '#F03E2F', text: '#FFFFFF' },
  emailjs: { bg: '#EA4335', text: '#FFFFFF' },
  styledcomponents: { bg: '#DB7093', text: '#FFFFFF' },
  'tanstack-query': { bg: '#FF4154', text: '#FFFFFF' },
  Turborepo: { bg: '#EF4444', text: '#FFFFFF' },
  ShadcnUi: { bg: '#000000', text: '#FFFFFF' },
  default: { bg: '#efc041', text: '#000000' },
};

const SkillIcon = ({ skill, width = 50, height = 50 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const colors = SKILL_COLORS[skill] || SKILL_COLORS.default;

  return (
    <div 
      className='relative group'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
          isHovered 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 -translate-y-2'
        }`}
        style={{
          backgroundColor: colors.bg,
          color: colors.text,
          boxShadow: `0 4px 12px ${colors.bg}40`,
          top: '100%',
        }}
      >
        {skill.split('-').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ')}
        
        {/* Arrow pointing up */}
        <div 
          className='absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45'
          style={{ backgroundColor: colors.bg }}
        />
      </div>
    </div>
  );
};

const Skills = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(
        sectionRef.current.querySelectorAll('.staggered-reveal'),
        {
          opacity: 0,
          y: 30,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current.querySelector('.skills-wrapper'),
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={MENULINKS[1].ref}
      className='w-full relative select-none mt-44'
    >
      <div className='section-container py-16 flex flex-col justify-center'>
        <img
          src='/right-pattern.svg'
          alt=''
          className='absolute hidden right-0 bottom-2/4 w-2/12 max-w-xs md:block'
          loading='lazy'
          height={700}
          width={320}
        />
        <div className='flex flex-col skills-wrapper'>
          <div className='flex flex-col'>
            <p className='uppercase tracking-widest text-gray-light-1 staggered-reveal'>
              SKILLS
            </p>
            <h1 className='text-6xl mt-2 font-medium text-gradient w-fit staggered-reveal'>
              My Skills
            </h1>
            <h2 className='text-[1.65rem] font-medium md:max-w-lg w-full mt-2 staggered-reveal'>
              I like to take responsibility to craft aesthetic user experience
              using modern frontend architecture.{' '}
            </h2>
          </div>
          <div className='mt-10'>
            <h3 className='uppercase tracking-widest text-gray-light-2 font-medium text-base mb-4 staggered-reveal'>
              LANGUAGES AND TOOLS
            </h3>
            <div className='flex items-center flex-wrap gap-6 staggered-reveal'>
              {SKILLS.languagesAndTools.map(skill => (
                <SkillIcon key={skill} skill={skill} />
              ))}
            </div>
          </div>
          <div className='mt-10'>
            <h3 className='uppercase tracking-widest text-gray-light-2 font-medium text-base mb-4 staggered-reveal'>
              LIBRARIES AND FRAMEWORKS
            </h3>
            <div className='flex flex-wrap gap-6 transform-gpu staggered-reveal'>
              {SKILLS.librariesAndFrameworks.map(skill => (
                <SkillIcon key={skill} skill={skill} />
              ))}
            </div>
          </div>
          <div className='flex flex-wrap mt-10'>
            <div className='mr-16 xs:mr-20 mb-6 staggered-reveal'>
              <h3 className='uppercase tracking-widest text-gray-light-2 font-medium text-base mb-4'>
                DATABASES
              </h3>
              <div className='flex flex-wrap gap-6 transform-gpu'>
                {SKILLS.databases.map(skill => (
                  <SkillIcon key={skill} skill={skill} />
                ))}
              </div>
            </div>
            <div className='staggered-reveal'>
              <h3 className='uppercase tracking-widest text-gray-light-2 font-medium text-base mb-4'>
                Other
              </h3>
              <div className='flex flex-wrap gap-6 transform-gpu'>
                {SKILLS.other.map(skill => (
                  <SkillIcon key={skill} skill={skill} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
