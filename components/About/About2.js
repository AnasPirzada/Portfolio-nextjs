import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useLayoutEffect, useRef } from 'react';

const About2 = ({ clientHeight }) => {
  const sectionRef = useRef(null);
  const quoteRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap
        .timeline({
          defaults: { ease: 'power2.out' },
        })
        .from(quoteRef.current, { opacity: 0, y: 30, duration: 0.8 })
        .to(quoteRef.current.querySelector('.about-3'), {
          backgroundPositionX: '100%',
          duration: 1.2,
          ease: 'power1.inOut',
        });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
        animation: tl,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full relative select-none">
      <div
        className={`${
          clientHeight > 650 ? 'py-10 md:py-20' : 'py-10 md:py-20'
        } section-container`}
      >
        <h1
          ref={quoteRef}
          className="font-medium text-5xl sm:text-6xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl text-center px-4 sm:px-6"
        >
          As a Full Stack Developer and AI Expert, I have a{' '}
          <span
            className="about-3 font-bold"
            style={{
              background:
                'linear-gradient(90deg, var(--text-primary) 0%, var(--text-primary) 50%, var(--accent-dark) 51%, var(--accent-light) 102%)',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            strong
          </span>{' '}
          obsession for attention to detail in every line of code and AI
          solution.
        </h1>
      </div>
    </section>
  );
};

export default About2;
