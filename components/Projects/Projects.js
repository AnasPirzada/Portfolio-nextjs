import { MENULINKS, PROJECTS } from '@/constants';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { memo, useEffect, useRef } from 'react';
import Button from '../Button/Button.js';
import ProjectTile from './ProjectTile/ProjectTile';

const Projects = memo(
  ({ isDesktop, clientHeight }) => {
    const sectionRef = useRef(null);
    const sectionTitleRef = useRef(null);

    useEffect(() => {
      gsap.registerPlugin(ScrollTrigger);

      let projectsScrollTrigger;
      let projectsTimeline;
      let ctx;

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

      if (isDesktop) {
        [projectsTimeline, projectsScrollTrigger] = getProjectsSt();
      } else {
        const projectWrapper =
          sectionRef.current.querySelector('.project-wrapper');
        if (projectWrapper) {
          projectWrapper.style.width = 'calc(100vw - 1rem)';
          projectWrapper.style.overflowX = 'scroll';
        }
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
    }, [isDesktop]);

    return (
      <section
        ref={sectionRef}
        id={MENULINKS[2].ref}
        className={`${
          isDesktop ? 'min-h-screen' : ''
        } w-full relative select-none section-container`}
      >
        <div className='flex flex-col py-8 md:py-20 justify-center h-full'>
          <div
            className='flex flex-col inner-container transform-gpu items-start text-left'
            ref={sectionTitleRef}
          >
            <p className='uppercase tracking-widest text-gray-light-1 staggered-reveal text-xs sm:text-sm md:text-base lg:text-base'>
              PROJECTS
            </p>
            <h1 className='text-4xl sm:text-5xl md:text-5xl lg:text-6xl 2xl:text-7xl mt-2 font-medium text-gradient w-fit staggered-reveal'>
              My Projects
            </h1>
            <h2 className='text-base sm:text-lg md:text-xl lg:text-2xl font-medium md:max-w-lg w-full max-w-sm sm:max-w-md mt-2 staggered-reveal text-left'>
              Some things I&apos;ve built with love, expertise and a pinch of
              magical ingredients.{' '}
            </h2>

            <Button
              href='/projects'
              classes='link w-[200px] mt-5 text-nowrap'
              type='primary'
            >
              View All Projects
            </Button>
          </div>
          <div
            className={`${clientHeight > 650 ? 'mt-12' : 'mt-8'} ${
              isDesktop
                ? 'flex project-wrapper no-scrollbar w-fit'
                : 'flex flex-row gap-4 sm:gap-6 w-full overflow-x-auto overflow-y-hidden snap-x snap-mandatory pb-4 -mx-4 px-4 mobile-projects-scroll touch-pan-x'
            } staggered-reveal mb-4 md:mb-16`}
            style={
              !isDesktop
                ? {
                    marginLeft: 0,
                    marginRight: 'auto',
                    WebkitOverflowScrolling: 'touch',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    overscrollBehaviorX: 'contain',
                  }
                : {}
            }
          >
            {PROJECTS.slice(0, 4).map((project, index) => (
              <ProjectTile
                classes={
                  isDesktop
                    ? index === PROJECTS.length - 1
                      ? ''
                      : 'mr-10 xs:mr-12 sm:mr-16'
                    : ''
                }
                project={project}
                key={project.name}
                isDesktop={isDesktop}
              />
            ))}
          </div>
        </div>
      </section>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.isDesktop === nextProps.isDesktop &&
      prevProps.clientHeight === nextProps.clientHeight
    );
  }
);

Projects.displayName = 'Projects';
export default Projects;
