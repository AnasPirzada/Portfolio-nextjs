import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useLayoutEffect, useEffect, useRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

const Tag = ({ clientHeight }) => {
  const sectionRef = useRef(null);
  const quoteRef = useRef(null);
  const { isDark } = useTheme();

  // Get the appropriate gradient based on theme
  const gradientColor = isDark ? '#ffffff' : '#121212';

  // Handle theme changes - update gradient when theme switches
  useEffect(() => {
    if (!quoteRef.current) return;
    
    const updateStyles = () => {
      const knowledgeSpan = quoteRef.current.querySelector('.about-3');
      if (!knowledgeSpan) return;

      // Update the background gradient when theme changes
      knowledgeSpan.style.background = `linear-gradient(90deg, ${gradientColor} 0%, ${gradientColor} 50%, #eeba2c 51%, #efc041 102%)`;
      
      // Ensure background-clip properties are always applied
      knowledgeSpan.style.display = 'inline-block';
      knowledgeSpan.style.WebkitBackgroundClip = 'text';
      knowledgeSpan.style.WebkitTextFillColor = 'transparent';
      knowledgeSpan.style.backgroundClip = 'text';
      knowledgeSpan.style.backgroundSize = '200% 100%';
      
      // Force a reflow to ensure styles are applied
      void knowledgeSpan.offsetHeight;
    };

    // Apply immediately
    updateStyles();
    
    // Also apply after theme transition completes (theme changes at 300ms, transition ends at 650ms)
    const timeoutId = setTimeout(() => {
      updateStyles();
    }, 700);

    return () => clearTimeout(timeoutId);
  }, [isDark, gradientColor]);

  useLayoutEffect(() => {
    if (!sectionRef.current || !quoteRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    // On mobile/tablet, skip scroll-based GSAP and keep static for smoother UX
    if (typeof window !== 'undefined') {
      const isMobile = window.innerWidth < 1024;
      if (isMobile) {
        gsap.set(quoteRef.current, { opacity: 1, y: 0 });
        const knowledgeSpan = quoteRef.current.querySelector('.about-3');
        if (knowledgeSpan) {
          gsap.set(knowledgeSpan, { backgroundPosition: '100% 0%' });
        }
        return;
      }
    }

    const ctx = gsap.context(() => {
      const knowledgeSpan = quoteRef.current.querySelector('.about-3');
      if (!knowledgeSpan) return;

      // Set initial state for animation - ensure it starts unfilled
      gsap.set(quoteRef.current, { opacity: 0, y: 30 });
      // Force initial background position to 0% (unfilled state)
      gsap.set(knowledgeSpan, {
        backgroundPosition: '0% 0%',
        backgroundPositionX: '0%',
      });
      // Also set inline style to ensure it's not filled initially
      knowledgeSpan.style.backgroundPosition = '0% 0%';
      knowledgeSpan.style.backgroundPositionX = '0%';

      const tl = gsap
        .timeline({
          defaults: { ease: 'power2.out' },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
            toggleActions: 'play none none none',
          },
          onComplete: () => {
            // Ensure text stays visible after animation
            gsap.set(quoteRef.current, { opacity: 1, y: 0 });
            // Ensure fill animation completes
            gsap.set(knowledgeSpan, {
              backgroundPosition: '100% 0%',
              backgroundPositionX: '100%',
            });
            knowledgeSpan.style.backgroundPosition = '100% 0%';
            knowledgeSpan.style.backgroundPositionX = '100%';
          },
        })
        .to(quoteRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
        })
        .to(
          knowledgeSpan,
          {
            backgroundPosition: '100% 0%',
            backgroundPositionX: '100%',
            duration: 1.2,
            ease: 'power1.inOut',
            force3D: false,
          },
          '-=0.2'
        );
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [gradientColor]);
  return (
    <section
      ref={sectionRef}
      className="w-full relative select-none -mt-6 md:mt-0 knowledge-section"
    >
      <div className="pt-0 pb-10 md:py-20 section-container">
        <h1
          ref={quoteRef}
          className="font-medium text-4xl sm:text-5xl md:text-4xl lg:text-6xl xl:text-[4rem] text-center px-4 sm:px-6 leading-relaxed text-gray-dark-1 dark:text-white"
          style={{ minHeight: '120px', display: 'block' }}
        >
          I turn
          <span
            className="about-3 font-bold"
            style={{
              display: 'inline-block',
              background: `linear-gradient(90deg, ${gradientColor} 0%, ${gradientColor} 50%, #eeba2c 51%, #efc041 102%)`,
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              backgroundPosition: '0% 0%',
              backgroundPositionX: '0%',
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
