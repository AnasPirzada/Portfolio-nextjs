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
      let timeoutId;
      let handleResize;

      const getProjectsSt = () => {
        const timeline = gsap.timeline({ defaults: { ease: 'none' } });
        const innerContainer = sectionRef.current.querySelector('.inner-container');
        const projectWrapper = sectionRef.current.querySelector('.project-wrapper');
        
        if (!innerContainer || !projectWrapper) return [null, null];
        
        // Calculate scroll distance needed for project wrapper
        const sidePadding =
          document.body.clientWidth - innerContainer.clientWidth;
        const projectWrapperWidth = projectWrapper.clientWidth;
        const visibleWidth = window.innerWidth - sidePadding;
        const scrollDistance = Math.max(0, projectWrapperWidth - visibleWidth);
        
        // If no scroll distance needed, don't create scroll trigger
        if (scrollDistance <= 0) {
          return [null, null];
        }
        
        // Calculate end point to match scroll distance for smooth animation
        // The key is to make vertical scroll proportional to horizontal scroll distance
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;
        
        // Calculate end point: make it proportional to scroll distance
        // This ensures consistent animation speed - more content = more scroll time
        // Formula: base scroll + (scroll distance / viewport width) * additional scroll
        const scrollRatio = scrollDistance / viewportWidth;
        
        // Calculate end point based on scroll distance needed
        // Use scroll distance directly to ensure all cards are visible
        // Multiply by 1.5 for comfortable scroll pacing
        // Minimum 0.8x viewport height, max 2x to prevent excessive blank space
        const baseEndPoint = scrollDistance * 1.5;
        const minScroll = viewportHeight * 0.8;
        const maxScroll = viewportHeight * 2;
        const endPoint = Math.max(minScroll, Math.min(baseEndPoint, maxScroll));
        
        // Only animate the project wrapper, keep title/heading/button completely fixed
        // Use smooth ease for better control
        timeline.to(projectWrapper, { 
          x: -scrollDistance, 
          duration: 1, 
          ease: 'none' 
        });

        const scrollTrigger = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${endPoint}`,
          scrub: 0.5, // Smoother, more responsive animation
          pin: true,
          animation: timeline,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          // Don't reset on leave - keep cards at their final position
          onLeave: () => {
            // Keep cards at final position
            gsap.set(projectWrapper, { x: -scrollDistance });
          },
          onEnterBack: () => {
            // Reset to start position only when scrolling back into section
            gsap.set(projectWrapper, { x: 0 });
          },
        });

        return [timeline, scrollTrigger];
      };

      if (isDesktop) {
        // Small delay to ensure DOM is fully rendered
        timeoutId = setTimeout(() => {
          [projectsTimeline, projectsScrollTrigger] = getProjectsSt();
          // Refresh ScrollTrigger after setup to ensure proper calculations
          if (projectsScrollTrigger) {
            ScrollTrigger.refresh();
          }
        }, 100);

        // Handle window resize
        handleResize = () => {
          if (projectsScrollTrigger) {
            projectsScrollTrigger.kill();
            projectsTimeline && projectsTimeline.kill();
          }
          [projectsTimeline, projectsScrollTrigger] = getProjectsSt();
          ScrollTrigger.refresh();
        };

        window.addEventListener('resize', handleResize);
      } else {
        const projectWrapper =
          sectionRef.current.querySelector('.project-wrapper');
        if (projectWrapper) {
          projectWrapper.style.width = 'calc(100vw - 1rem)';
          projectWrapper.style.overflowX = 'scroll';
        }
      }

      // Setup reveal animation - simple one-time animation
      ctx = gsap.context(() => {
        const elements = sectionRef.current.querySelectorAll('.staggered-reveal');
        if (elements.length === 0) return;

        // Set initial state
        gsap.set(elements, { opacity: 0, y: 30 });

        // Simple one-time reveal animation
        gsap.to(elements, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true, // Only animate once
            toggleActions: 'play none none none',
          },
        });
      }, sectionRef);

      return () => {
        if (isDesktop) {
          if (timeoutId) clearTimeout(timeoutId);
          if (handleResize) window.removeEventListener('resize', handleResize);
        }
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
        <div className="flex flex-col py-8 md:py-20 justify-center h-full">
          <div
            className="flex flex-col inner-container transform-gpu items-start text-left"
            ref={sectionTitleRef}
          >
            <p className="uppercase tracking-widest text-gray-light-1 staggered-reveal text-xs sm:text-sm md:text-base lg:text-base">
              PROJECTS
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl 2xl:text-7xl mt-2 font-medium text-gradient w-fit staggered-reveal">
              My Projects
            </h1>
            <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium md:max-w-lg w-full max-w-sm sm:max-w-md mt-2 staggered-reveal text-left">
              Some things I&apos;ve built with love, expertise and a pinch of
              magical ingredients.{' '}
            </h2>

            <Button
              href="/projects"
              classes="link w-[200px] mt-5 text-nowrap"
              type="primary"
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
