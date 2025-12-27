import gsap from 'gsap';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Typed from 'typed.js';
import { CALENDLY_URL, MENULINKS, TYPED_STRINGS } from '../../constants';
import { openCalendlyPopup } from '../../utils/calendly';
import Button from '../Button/Button';
import Profiles from '../Profiles/Profiles';
import styles from './Hero.module.scss';

const options = {
  strings: TYPED_STRINGS,
  typeSpeed: 50,
  startDelay: 1500,
  backSpeed: 50,
  backDelay: 8000,
  loop: true,
};

const Hero = () => {
  const sectionRef = useRef(null);
  const typedElementRef = useRef(null);
  const svgContainerRef = useRef(null);
  const [svgContent, setSvgContent] = useState(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'none' } })
        .to(sectionRef.current, { opacity: 1, duration: 2 })
        .from(
          sectionRef.current.querySelectorAll('.staggered-reveal'),
          { opacity: 0, duration: 0.5, stagger: 0.5 },
          '<'
        );
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const typed = new Typed(typedElementRef.current, options);

    return () => typed.destroy();
  }, [typedElementRef]);

  // Load and animate SVG (with performance optimization)
  useEffect(() => {
    // Only load SVG on desktop to save bandwidth on mobile
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return;
    }

    const loadAndAnimateSVG = async () => {
      try {
        const response = await fetch('/lottie/anas.svg');
        if (!response.ok) throw new Error('Failed to fetch SVG');
        const svgText = await response.text();
        setSvgContent(svgText);
      } catch (error) {
        console.error('Failed to load SVG:', error);
        // Fallback to regular image if SVG loading fails
      }
    };

    // Delay loading to prioritize critical content
    const timer = setTimeout(() => {
      loadAndAnimateSVG();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Animate SVG paths - specifically code (right) and output (left) screens
  useEffect(() => {
    if (!svgContent || !svgContainerRef.current) return;

    const container = svgContainerRef.current;
    const svg = container.querySelector('svg');
    if (!svg) return;

    const viewBox = svg.getAttribute('viewBox');
    if (!viewBox) return;
    
    const [minX, minY, width, height] = viewBox.split(' ').map(Number);
    const midX = minX + width / 2;

    // Use requestAnimationFrame for smooth animations
    const animatePaths = () => {
      // Get all paths
      const allPaths = svg.querySelectorAll('path');
      
      // Separate paths into left (output) and right (code) based on their position
      const leftPaths = []; // Output screen (left side)
      const rightPaths = []; // Code screen (right side)
      
      allPaths.forEach((path) => {
        try {
          const pathData = path.getAttribute('d');
          if (!pathData) return;
          
          // Get bounding box to determine position
          const bbox = path.getBBox();
          const centerX = bbox.x + bbox.width / 2;
          
          // Categorize based on position (left or right of center)
          if (centerX < midX) {
            leftPaths.push(path);
          } else {
            rightPaths.push(path);
          }
        } catch (error) {
          // Skip paths that can't be measured
        }
      });

      // Animate code paths (right screen) with typing effect - top to bottom
      rightPaths.forEach((path, index) => {
        try {
          const pathLength = path.getTotalLength();
          if (pathLength === 0) return;

          // Get vertical position for staggering
          const bbox = path.getBBox();
          const yPos = bbox.y;
          const delay = (yPos / height) * 3; // Stagger based on vertical position

          // Set initial state
          path.style.strokeDasharray = `${pathLength} ${pathLength}`;
          path.style.strokeDashoffset = pathLength;
          path.style.opacity = '0';

          // Animate with typing effect
          path.style.willChange = 'stroke-dashoffset, opacity';
          gsap.to(path, {
            strokeDashoffset: 0,
            opacity: 1,
            duration: 1.2,
            delay: delay,
            ease: 'power2.out',
            onComplete: () => {
              path.style.willChange = 'auto';
            },
          });
        } catch (error) {
          console.debug('Skipped code path animation:', error);
        }
      });

      // Animate output paths (left screen) - appear left to right
      leftPaths.forEach((path, index) => {
        try {
          const pathLength = path.getTotalLength();
          if (pathLength === 0) return;

          // Get horizontal position for left-to-right animation
          const bbox = path.getBBox();
          const xPos = bbox.x;
          const delay = ((xPos - minX) / width) * 2; // Stagger based on horizontal position

          // Set initial state
          path.style.strokeDasharray = `${pathLength} ${pathLength}`;
          path.style.strokeDashoffset = pathLength;
          path.style.opacity = '0';

          // Animate left to right
          path.style.willChange = 'stroke-dashoffset, opacity';
          gsap.to(path, {
            strokeDashoffset: 0,
            opacity: 1,
            duration: 1,
            delay: delay,
            ease: 'power2.out',
            onComplete: () => {
              path.style.willChange = 'auto';
            },
          });
        } catch (error) {
          console.debug('Skipped output path animation:', error);
        }
      });

      // Animate filled paths (for code blocks/output blocks) with fade-in
      const filledPaths = svg.querySelectorAll('path[fill]:not([fill="transparent"])');
      filledPaths.forEach((path) => {
        try {
          const bbox = path.getBBox();
          const centerX = bbox.x + bbox.width / 2;
          const isRight = centerX >= midX;
          const delay = isRight ? 1.5 : 1; // Code appears after, output appears first
          
          path.style.willChange = 'opacity';
          gsap.fromTo(
            path,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.6,
              delay: delay,
              ease: 'power2.out',
              onComplete: () => {
                path.style.willChange = 'auto';
              },
            }
          );
        } catch (error) {
          console.debug('Skipped filled path animation:', error);
        }
      });

      // Add continuous animation for graph/chart lines (if they exist)
      // Look for paths that might be graphs (horizontal/vertical lines, curves)
      const potentialGraphPaths = Array.from(allPaths).filter((path) => {
        try {
          const bbox = path.getBBox();
          // Graph lines are typically longer and more horizontal/vertical
          const aspectRatio = bbox.width / bbox.height;
          return (aspectRatio > 2 || aspectRatio < 0.5) && (bbox.width > 50 || bbox.height > 50);
        } catch {
          return false;
        }
      });

      // Add pulsing/glowing effect to graph lines
      potentialGraphPaths.slice(0, 10).forEach((path) => {
        try {
          const bbox = path.getBBox();
          const centerX = bbox.x + bbox.width / 2;
          const isRight = centerX >= midX;
          
          // Only animate graph-like paths on the left (output) side
          if (!isRight) {
            gsap.to(path, {
              opacity: 0.6,
              duration: 2,
              delay: 3,
              repeat: -1,
              yoyo: true,
              ease: 'power1.inOut',
            });
          }
        } catch (error) {
          console.debug('Skipped graph animation:', error);
        }
      });
    };

    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(animatePaths);
  }, [svgContent]);

  return (
    <section
      ref={sectionRef}
      id={MENULINKS[0].ref}
      className='w-full flex items-center md:items-center py-8 sm:py-12 md:py-8 2xl:container mx-auto xl:px-20 md:px-12 px-4 sm:px-6 min-h-screen relative mb-4 md:mb-24'
      style={{ opacity: 0 }}
    >
      <style global jsx>
        {`
          .typed-cursor {
            font-size: 2.25rem;
            display: inline-block;
            vertical-align: baseline;
            line-height: inherit;
            margin-left: 2px;
          }
          @media (min-width: 640px) {
            .typed-cursor {
              font-size: 2.75rem;
            }
          }
          @media (min-width: 768px) {
            .typed-cursor {
              font-size: 2rem;
            }
          }
        `}
      </style>
      <div
        className='flex flex-col justify-center items-start md:items-start text-left md:text-left pt-0 md:pt-0 select-none w-full md:max-w-[50%] lg:max-w-[45%] relative z-10'
        style={{ pointerEvents: 'auto' }}
      >
        <h5
          className={`${styles.intro} font-mono font-medium text-GoldenGlow-light staggered-reveal text-5xl sm:text-6xl md:text-base mb-6 sm:mb-7`}
        >
          Hi, My Name is
        </h5>
        <h1
          className={`${styles.heroName} text-white text-5xl sm:text-6xl md:text-6xl font-semibold mb-6 sm:mb-7 leading-tight`}
        >
          <span className={`relative ${styles.emphasize} staggered-reveal`}>
            Anas
          </span>
          <span className='staggered-reveal'> Pirzada</span>
        </h1>
        <p className='mb-6 sm:mb-7 inline-block w-full md:max-w-full'>
          <span
            ref={typedElementRef}
            className='staggered-reveal text-5xl sm:text-6xl md:text-2xl text-gray-light-3 font-mono leading-relaxed inline-block min-h-[3rem] sm:min-h-[3.5rem] break-words'
          />
        </p>
        <div className='staggered-reveal mb-6'>
          <Profiles />
        </div>
        <div
          className='staggered-reveal pt-2'
          style={{ position: 'relative', zIndex: 10, pointerEvents: 'auto' }}
        >
          <Button
            href='#'
            onClick={async e => {
              e.preventDefault();
              e.stopPropagation();
              console.log('Button clicked!', CALENDLY_URL);

              if (
                CALENDLY_URL &&
                CALENDLY_URL !== 'https://calendly.com/your-username'
              ) {
                // Check if Calendly is available
                if (typeof window !== 'undefined' && window.Calendly) {
                  try {
                    await openCalendlyPopup(CALENDLY_URL);
                    // Note: If popup fails due to X-Frame-Options,
                    // the function will automatically fallback to new window
                  } catch (error) {
                    console.error('Failed to open Calendly:', error);
                    // Final fallback: open in new window
                    window.open(
                      CALENDLY_URL,
                      '_blank',
                      'noopener,noreferrer,width=800,height=600'
                    );
                  }
                } else {
                  // If Calendly isn't loaded, open in new tab
                  console.warn('Calendly not loaded, opening in new tab');
                  window.open(
                    CALENDLY_URL,
                    '_blank',
                    'noopener,noreferrer,width=800,height=600'
                  );
                }
              } else {
                console.warn('Please update CALENDLY_URL in constants.js');
                // Fallback to contact section
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }
            }}
            classes='link'
            type='primary'
            style={{
              pointerEvents: 'auto',
              position: 'relative',
              zIndex: 10,
              cursor: 'pointer',
            }}
          >
            Let&apos;s Talk
          </Button>
        </div>
      </div>
      <div
        className='absolute invisible md:visible md:right-8 lg:right-12 2xl:right-16 bottom-0 flex items-end justify-center z-0'
        style={{
          width: 'clamp(500px, 55vw, 800px)',
          maxHeight: '95vh',
          pointerEvents: 'none',
          backgroundColor: 'transparent',
        }}
      >
        <div className={styles.imageWrapper} ref={svgContainerRef}>
          {svgContent ? (
            <div
              className={`${styles.heroImage} ${styles.animatedSvg}`}
              dangerouslySetInnerHTML={{ __html: svgContent }}
              style={{
                maxWidth: '100%',
                maxHeight: '95vh',
              }}
              role="img"
              aria-label="Anas Pirzada - Animated illustration with code typing and data visualization effects"
            />
          ) : (
            <img
              src='/lottie/anas.svg'
              alt='Anas Pirzada - Developer illustration'
              className={`w-full h-auto object-contain ${styles.heroImage}`}
              style={{
                maxWidth: '100%',
                maxHeight: '95vh',
              }}
              loading="lazy"
              decoding="async"
            />
          )}
          
        </div>
      </div>
    </section>
  );
};

export default Hero;
