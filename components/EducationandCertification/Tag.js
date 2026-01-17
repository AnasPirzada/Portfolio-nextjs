import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useLayoutEffect, useRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

const Tag = ({ clientHeight }) => {
  const sectionRef = useRef(null);
  const quoteRef = useRef(null);
  const { isDark } = useTheme();
  
  // Get the appropriate gradient based on theme
  const gradientColor = isDark ? '#ffffff' : '#121212';

  useLayoutEffect(() => {
    if (!sectionRef.current || !quoteRef.current) return;
    
    let timeoutId;
    let ctx;
    
    // Small delay to ensure DOM is ready
    timeoutId = setTimeout(() => {
      ctx = gsap.context(() => {
        const knowledgeSpan = quoteRef.current.querySelector('.about-3');
        if (!knowledgeSpan) return;
        
        // Set initial state for animation
        gsap.set(quoteRef.current, { opacity: 0, y: 30 });
        // Set initial background position for fill animation - ensure it's set inline
        knowledgeSpan.style.backgroundPosition = '0% 0%';
        gsap.set(knowledgeSpan, { 
          backgroundPosition: '0% 0%',
        });
        
        // Check if section is already in viewport
        const rect = sectionRef.current.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
        
        const tl = gsap
          .timeline({
            defaults: { ease: 'power2.out' },
            onComplete: () => {
              // Ensure text stays visible after animation
              gsap.set(quoteRef.current, { opacity: 1, y: 0 });
              // Ensure fill animation completes
              gsap.set(knowledgeSpan, { 
                backgroundPosition: '100% 0%',
                backgroundPositionX: '100%',
              });
            }
          })
          .to(quoteRef.current, { 
            opacity: 1, 
            y: 0, 
            duration: 0.8 
          })
          .to(knowledgeSpan, {
            backgroundPosition: '100% 0%',
            duration: 1.2,
            ease: 'power1.inOut',
            force3D: false,
            onStart: () => {
              // Ensure gradient is visible before animation
              knowledgeSpan.style.backgroundPosition = '0% 0%';
            },
            onComplete: () => {
              // Ensure final state
              knowledgeSpan.style.backgroundPosition = '100% 0%';
            }
          }, '-=0.2');

        if (isInViewport) {
          // If already visible, play animation immediately
          tl.play();
        } else {
          // Otherwise, wait for scroll trigger
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play reverse play reverse',
            animation: tl,
            onEnter: () => {
              // Ensure visibility when entering
              gsap.set(quoteRef.current, { opacity: 1, y: 0 });
              tl.play();
            },
            onEnterBack: () => {
              // Ensure visibility when scrolling back into view
              gsap.set(quoteRef.current, { opacity: 1, y: 0 });
              tl.play();
            },
            onLeaveBack: () => {
              // Reset when scrolling back up past the section
              gsap.set(quoteRef.current, { opacity: 0, y: 30 });
              knowledgeSpan.style.backgroundPosition = '0% 0%';
              gsap.set(knowledgeSpan, { 
                backgroundPosition: '0% 0%',
              });
            },
          });
        }
      }, sectionRef);
    }, 100);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (ctx) ctx.revert();
    };
  }, []);
  return (
    <section ref={sectionRef} className='w-full relative select-none -mt-6 md:mt-0 knowledge-section'>
      <div
        className='pt-0 pb-10 md:py-20 section-container'
      >
        <h1
          ref={quoteRef}
          className='font-medium text-4xl sm:text-5xl md:text-4xl lg:text-6xl xl:text-[4rem] text-center px-4 sm:px-6 leading-relaxed text-gray-dark-1 dark:text-white'
          style={{ minHeight: '120px', display: 'block' }}
        >
          I turn
          <span
            className='about-3 font-bold'
            style={{
              background: `linear-gradient(90deg, ${gradientColor} 0%, ${gradientColor} 50%, #eeba2c 51%, #efc041 102%)`,
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              backgroundPosition: '0% 0%',
            }}
          >
            {' '}
            &nbsp; knowledge &nbsp;
          </span>{' '}
          into meaningful creations, one project at a time
        </h1>
      </div>
    </section>
  );
};

export default Tag;
