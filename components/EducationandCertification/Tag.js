import { GooeyText } from '@/components/ui/gooey-text-morphing';
import { isScrollRevealDesktop } from '@/utils/scrollRevealSupport';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useEffect, useRef } from 'react';

const morphWords = ['knowledge', 'ideas', 'skills', 'experience'];

const Tag = () => {
  const sectionRef = useRef(null);
  const quoteRef = useRef(null);

  useEffect(() => {
    let ctx;
    const rafId = requestAnimationFrame(() => {
      if (!sectionRef.current || !quoteRef.current) return;

      gsap.registerPlugin(ScrollTrigger);

      if (!isScrollRevealDesktop()) {
        gsap.set(quoteRef.current, { opacity: 1, y: 0 });
        return;
      }

      ctx = gsap.context(() => {
        gsap.set(quoteRef.current, { opacity: 0, y: 30 });

        gsap
          .timeline({
            defaults: { ease: 'power2.out' },
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              once: true,
              toggleActions: 'play none none none',
              invalidateOnRefresh: true,
            },
            onComplete: () => {
              gsap.set(quoteRef.current, { opacity: 1, y: 0 });
            },
          })
          .to(quoteRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
          });
      }, sectionRef);

      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(rafId);
      ctx?.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full relative select-none -mt-6 md:mt-0 knowledge-section"
    >
      <div className="pt-0 pb-10 md:py-20 section-container">
        <h1
          ref={quoteRef}
          className="font-medium text-4xl sm:text-5xl md:text-4xl lg:text-6xl xl:text-6xl text-center px-4 sm:px-6 leading-relaxed text-gray-dark-1 dark:text-white"
          style={{ minHeight: '120px', display: 'block' }}
        >
          I turn{' '}
          <GooeyText
            texts={morphWords}
            morphTime={1}
            cooldownTime={0.25}
            className="mx-1 align-baseline sm:mx-2"
            textClassName="font-bold text-4xl sm:text-5xl md:text-4xl lg:text-6xl xl:text-6xl leading-relaxed text-accent-light dark:text-GoldenGlow-light"
          />{' '}
          into meaningful creations, one project at a time
        </h1>
      </div>
    </section>
  );
};

export default Tag;
