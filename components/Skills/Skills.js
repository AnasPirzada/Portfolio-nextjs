/* eslint-disable @next/next/no-img-element */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Image from 'next/image';
import { useLayoutEffect, useRef, useState } from 'react';
import { MENULINKS, SKILLS } from '../../constants';

const SkillIcon = ({ skill }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Format skill name for display (remove hyphens, capitalize)
  const formatSkillName = (name) => {
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div 
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="link relative transition-transform duration-300 hover:scale-110 hover:-translate-y-2">
        <Image
          src={`/skills/${skill}.svg`}
          alt={skill}
          width={50}
          height={50}
          className="transition-all duration-300"
        />
      </div>
      
      {/* Animated Badge/Tooltip */}
      <div 
        className={`absolute left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 rounded-lg whitespace-nowrap transition-all duration-300 pointer-events-none ${
          isHovered 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-2'
        }`}
        style={{
          background: 'linear-gradient(135deg, #efc041 0%, #eeba2c 100%)',
          boxShadow: '0 4px 15px rgba(239, 192, 65, 0.4), 0 0 20px rgba(239, 192, 65, 0.2)',
        }}
      >
        <span className="text-sm font-semibold text-gray-900">
          {formatSkillName(skill)}
        </span>
        {/* Arrow pointing up */}
        <div 
          className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45"
          style={{
            background: 'linear-gradient(135deg, #efc041 0%, #eeba2c 100%)',
          }}
        />
      </div>
    </div>
  );
};

const Skills = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap
        .timeline({ defaults: { ease: 'none' } })
        .from(
          sectionRef.current.querySelectorAll('.staggered-reveal'),
          { opacity: 0, duration: 0.5, stagger: 0.5 },
          '<'
        );

      ScrollTrigger.create({
        trigger: sectionRef.current.querySelector('.skills-wrapper'),
        start: '100px bottom',
        end: 'center center',
        scrub: 0,
        animation: tl,
      });
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
