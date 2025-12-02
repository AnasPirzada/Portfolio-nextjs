import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useEffect, useRef } from 'react';
import { MENULINKS, PROJECTS } from '../../constants';
import Button from '../Button/Button.js';
import ProjectTile from './ProjectTile/ProjectTile';

const Projects = ({ isDesktop, clientHeight }) => {
  const sectionRef = useRef(null);
  const sectionTitleRef = useRef(null);

  useEffect(() => {
    let projectsScrollTrigger;
    let projectsTimeline;
    let ctx;

    if (isDesktop) {
      [projectsTimeline, projectsScrollTrigger] = getProjectsSt();
    } else {
      const projectWrapper =
        sectionRef.current.querySelector('.project-wrapper');
      projectWrapper.style.width = 'calc(100vw - 1rem)';
      projectWrapper.style.overflowX = 'scroll';
    }

    // Setup reveal animation
    ctx = gsap.context(() => {
      gsap.from(
        sectionRef.current.querySelectorAll('.staggered-reveal'),
        {
          opacity: 0,
          y: 30,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current.querySelector('.inner-container'),
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => {
      projectsScrollTrigger && projectsScrollTrigger.kill();
      projectsTimeline && projectsTimeline.kill();
      ctx && ctx.revert();
    };
  }, [sectionRef, sectionTitleRef, isDesktop]);

  const getRevealSt = () => {
    // This function is no longer needed but kept for compatibility
    return [null, null];
  };

  const getProjectsSt = () => {
    const timeline = gsap.timeline({ defaults: { ease: 'none' } });
    const sidePadding =
      document.body.clientWidth -
      sectionRef.current.querySelector('.inner-container').clientWidth;
    const elementWidth =
      sidePadding +
      sectionRef.current.querySelector('.project-wrapper').clientWidth;
    sectionRef.current.style.width = `${elementWidth}px`;
    const width = window.innerWidth - elementWidth;
    const duration = `${(elementWidth / window.innerHeight) * 100}%`;
    timeline
      .to(sectionRef.current, { x: width })
      .to(sectionTitleRef.current, { x: -width }, '<');

    const scrollTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: duration,
      scrub: 0,
      pin: true,
      animation: timeline,
      pinSpacing: 'margin',
    });

    return [timeline, scrollTrigger];
  };

  return (
    <section
      ref={sectionRef}
      id={MENULINKS[2].ref}
      className={`${
        isDesktop ? 'min-h-screen' : 'min-h-[120vh]'
      } w-full relative select-none section-container `}
    >
      <div className='flex flex-col py- justify-center h-full pb-16'>
        <div
          className='flex flex-col inner-container transform-gpu'
          ref={sectionTitleRef}
        >
          <p className='uppercase tracking-widest text-gray-light-1 staggered-reveal'>
            PROJECTS
          </p>
          <h1 className='text-6xl mt-2 font-medium text-gradient w-fit staggered-reveal'>
            My Projects
          </h1>
          <h2 className='text-[1.65rem] font-medium md:max-w-lg max-w-sm mt-2 staggered-reveal'>
            Some things I&apos;ve built with love, expertise and a pinch of
            magical ingredients.{' '}
          </h2>

          <Button href='/projects' classes='link w-[200px] mt-5' type='primary'>
            View All Projects
          </Button>
        </div>
        <div
          className={`${
            clientHeight > 650 ? 'mt-12' : 'mt-8'
          } flex project-wrapper no-scrollbar w-fit staggered-reveal mb-16 pb-16`}
        >
          {PROJECTS.slice(0, 4).map((project, index) => (
            <ProjectTile
              classes={
                index === PROJECTS.length - 1 ? '' : 'mr-10 xs:mr-12 sm:mr-16'
              }
              project={project}
              key={project.name}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
