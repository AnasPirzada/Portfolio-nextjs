import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useLayoutEffect, useRef } from 'react';

const Tag = ({ clientHeight }) => {
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
    <section ref={sectionRef} className='w-full relative select-none -mt-6 md:mt-0'>
      <div
        className='pt-0 pb-10 md:py-20 section-container'
      >
        <h1
          ref={quoteRef}
          className='font-medium text-4xl sm:text-5xl md:text-4xl lg:text-6xl xl:text-[4rem] text-center px-4 sm:px-6 leading-relaxed'
        >
          I turn
          <span
            className='about-3 font-bold'
            style={{
              background:
                'linear-gradient(90deg, #ffffff 0%, #ffffff 50%, #eeba2c 51%, #efc041 102%)',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
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
