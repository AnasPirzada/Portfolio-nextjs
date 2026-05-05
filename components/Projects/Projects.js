import { RevealFade, RevealItem, RevealStagger } from '@/components/ui/Reveal';
import { MENULINKS, PROJECTS } from '@/constants';
import { m } from 'framer-motion';
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
      let timeoutId;
      let handleResize;

      const getProjectsSt = () => {
        const timeline = gsap.timeline({ defaults: { ease: 'none' } });
        const innerContainer =
          sectionRef.current.querySelector('.inner-container');
        const projectWrapper =
          sectionRef.current.querySelector('.project-wrapper');

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
          ease: 'none',
        });

        const updateCardDepth = () => {
          if (typeof window === 'undefined') return;
          if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
          }
          const cards = projectWrapper.querySelectorAll('[data-project-card]');
          if (!cards.length) return;
          const vw = window.innerWidth || 1;
          const focalX = vw * 0.36;
          const falloff = Math.max(vw * 0.32, 240);
          cards.forEach(el => {
            const rect = el.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const dist = Math.abs(cx - focalX);
            const n = gsap.utils.clamp(0, 1, 1 - dist / falloff);
            const scale = 0.9 + n * 0.12;
            const opacity = 0.4 + n * 0.6;
            const bright = 0.84 + n * 0.16;
            gsap.set(el, {
              scale,
              opacity,
              transformOrigin: '50% 50%',
              force3D: true,
              filter: `brightness(${bright})`,
            });
          });
        };

        const scrollTrigger = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${endPoint}`,
          // Lenis already smooths wheel input; extra scrub lag feels sticky / doubled.
          scrub: true,
          pin: true,
          animation: timeline,
          pinSpacing: true,
          anticipatePin: 0,
          invalidateOnRefresh: true,
          onUpdate: updateCardDepth,
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

        requestAnimationFrame(() => updateCardDepth());

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

      return () => {
        const root = sectionRef.current;
        if (isDesktop) {
          if (timeoutId) clearTimeout(timeoutId);
          if (handleResize) window.removeEventListener('resize', handleResize);
        }
        root
          ?.querySelectorAll('[data-project-card]')
          .forEach(el =>
            gsap.set(el, { clearProps: 'scale,opacity,filter,transform' })
          );
        projectsScrollTrigger && projectsScrollTrigger.kill();
        projectsTimeline && projectsTimeline.kill();
      };
    }, [isDesktop]);

    return (
      <section
        ref={sectionRef}
        id={MENULINKS[2].ref}
        className={`${
          isDesktop ? 'min-h-screen' : ''
        } relative w-full select-none overflow-hidden section-container`}
      >
        <div
          className="pointer-events-none absolute inset-0 hidden lg:block"
          aria-hidden
        >
          <div className="absolute -left-20 top-1/4 h-72 w-72 rounded-full bg-accent-light/[0.06] blur-[80px]" />
          <div className="absolute -right-16 bottom-1/3 h-64 w-64 rounded-full bg-accent-dark/[0.05] blur-[72px]" />
        </div>
        <div className="relative z-10 flex h-full flex-col justify-center py-8 md:py-12">
          <RevealStagger
            className="flex flex-col inner-container transform-gpu items-start text-left"
            ref={sectionTitleRef}
          >
            <RevealItem
              as={m.p}
              className="uppercase tracking-widest text-gray-light-1 text-xs sm:text-sm md:text-base lg:text-base"
            >
              PROJECTS
            </RevealItem>
            <RevealItem
              as={m.h1}
              className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl 2xl:text-6xl mt-2 font-medium text-gradient w-fit"
            >
              My Projects
            </RevealItem>
            <RevealItem
              as={m.h2}
              className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium md:max-w-lg w-full max-w-sm sm:max-w-md mt-2 text-left"
            >
              Some things I&apos;ve built with love, expertise and a pinch of
              magical ingredients.{' '}
            </RevealItem>

            <RevealItem>
              <Button
                href="/projects"
                classes="link w-[200px] mt-5 text-nowrap"
                type="primary"
              >
                View All Projects
              </Button>
            </RevealItem>
          </RevealStagger>
          <RevealFade
            premium={false}
            className={`${clientHeight > 650 ? 'mt-12' : 'mt-8'} ${
              isDesktop
                ? 'flex project-wrapper no-scrollbar w-fit'
                : 'flex flex-row gap-4 sm:gap-6 w-full overflow-x-auto overflow-y-hidden snap-x snap-mandatory pb-4 px-4 sm:px-0 mobile-projects-scroll touch-pan-x'
            } mb-4 md:mb-16`}
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
          </RevealFade>
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
