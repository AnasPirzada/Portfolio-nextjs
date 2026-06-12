import { RevealItem, RevealStagger } from '@/components/ui/Reveal';
import { isScrollRevealDesktop } from '@/utils/scrollRevealSupport';
import { m } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useLayoutEffect, useRef } from 'react';

const DIM = { opacity: 0.2, y: 20 };

const About1 = () => {
  const sectionRef = useRef(null);
  const quoteRef = useRef(null);

  useLayoutEffect(() => {
    let ctx;

    const run = () => {
      if (!sectionRef.current || !quoteRef.current) return;

      gsap.registerPlugin(ScrollTrigger);

      if (!isScrollRevealDesktop()) {
        const about1 = quoteRef.current.querySelector('.about-1');
        const about2 = quoteRef.current.querySelector('.about-2');
        const about3 = quoteRef.current.querySelector('.about-3');
        if (about1 && about2 && about3) {
          gsap.set([about1, about2, about3], { opacity: 1, y: 0 });
        }
        return;
      }

      ctx = gsap.context(() => {
        const about1 = quoteRef.current.querySelector('.about-1');
        const about2 = quoteRef.current.querySelector('.about-2');
        const about3 = quoteRef.current.querySelector('.about-3');

        if (about1 && about2 && about3) {
          // Scrubbed timelines only apply tweens that have started at progress 0.
          // Without this, about-2 / about-3 stay at full opacity until scroll updates.
          gsap.set([about1, about2, about3], DIM);

          const tl = gsap
            .timeline({
              defaults: { ease: 'power2.out', duration: 0.8 },
            })
            .fromTo(about1, { opacity: 0.2, y: 20 }, { opacity: 1, y: 0 })
            .to(about1, {
              opacity: 0.2,
              y: -10,
              duration: 0.6,
            })
            .fromTo(
              about2,
              { opacity: 0.2, y: 20 },
              { opacity: 1, y: 0 },
              '<0.2'
            )
            .to(about2, {
              opacity: 0.2,
              y: -10,
              duration: 0.6,
            })
            .fromTo(
              about3,
              { opacity: 0.2, y: 20 },
              { opacity: 1, y: 0 },
              '<0.2'
            );

          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'bottom 30%',
            scrub: 1,
            animation: tl,
            pin: false,
            invalidateOnRefresh: true,
          });
        }
      }, sectionRef);

      ScrollTrigger.refresh();
    };

    const rafId = requestAnimationFrame(run);

    return () => {
      cancelAnimationFrame(rafId);
      ctx?.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full relative select-none -mt-6 md:mt-0"
    >
      <style jsx>{`
        .about-1-section .about-3 {
          -webkit-text-fill-color: unset !important;
          -webkit-background-clip: unset !important;
          background-clip: unset !important;
          background: none !important;
          color: inherit !important;
        }
      `}</style>
      <div className="pt-8 pb-5 md:max-lg:py-8 md:pt-10 md:pb-8 lg:py-12 section-container about-1-section">
        <RevealStagger className="flex flex-col items-center">
          <RevealItem
            as={m.p}
            className="uppercase tracking-widest text-gray-light-1 text-xs sm:text-sm md:text-base text-center mb-3"
          >
            ABOUT ME
          </RevealItem>
          <RevealItem
            as={m.h1}
            ref={quoteRef}
            className="font-medium text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-5xl text-center leading-relaxed px-2 sm:px-6 md:px-0 text-white dark:text-white"
          >
            <span className="about-1 leading-tight block mb-4">
              I&apos;m a passionate{' '}
              <span className="text-accent-light">Full Stack Developer</span>{' '}
              and <span className="text-accent-light">AI Expert</span>{' '}
              who&apos;s focused on building scalable and performant
              applications.
            </span>
            <span className="about-2 leading-tight block mb-3">
              I strive to deliver seamless user experiences by embracing modern
              frontend practices,{' '}
              <span className="text-accent-light">AI integration</span>, and
              thoughtful design principles.
            </span>
            <span className="about-3 leading-tight block">
              With <span className="text-accent-light">5+ years</span> of
              experience, I specialize in building{' '}
              <span className="text-accent-light">React.js</span> applications,
              integrating APIs, implementing{' '}
              <span className="text-accent-light">Machine Learning</span>{' '}
              solutions, and leveraging frameworks like Django, Laravel, and
              Next.js.
            </span>
          </RevealItem>
        </RevealStagger>
      </div>
    </section>
  );
};

export default About1;
