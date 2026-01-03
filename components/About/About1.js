import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useLayoutEffect, useRef } from 'react';

const About1 = ({ clientHeight }) => {
  const sectionRef = useRef(null);
  const quoteRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap
        .timeline({
          defaults: { ease: 'power2.out', duration: 0.8 },
        })
        .fromTo(
          quoteRef.current.querySelector('.about-1'),
          { opacity: 0.3, y: 20 },
          { opacity: 1, y: 0 }
        )
        .to(quoteRef.current.querySelector('.about-1'), {
          opacity: 0.3,
          y: -10,
          duration: 0.6,
        })
        .fromTo(
          quoteRef.current.querySelector('.about-2'),
          { opacity: 0.3, y: 20 },
          { opacity: 1, y: 0 },
          '<0.2'
        )
        .to(quoteRef.current.querySelector('.about-2'), {
          opacity: 0.3,
          y: -10,
          duration: 0.6,
        })
        .fromTo(
          quoteRef.current.querySelector('.about-3'),
          { opacity: 0.3, y: 20 },
          { opacity: 1, y: 0 },
          '<0.2'
        )
        .to(quoteRef.current.querySelector('.about-3'), {
          opacity: 0.3,
          y: -10,
          duration: 0.6,
        });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        end: 'bottom 30%',
        scrub: 1,
        animation: tl,
        pin: false,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className='w-full relative select-none'>
      <div className='py-10 md:py-20 section-container'>
        <h1
          ref={quoteRef}
          className='font-medium text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl text-center leading-relaxed px-4 sm:px-6 md:px-0'
        >
          <span className='about-1 leading-tight'>
            I&apos;m a passionate Full Stack Developer and AI Expert who&apos;s
            focused on building scalable and performant applications. <br />
          </span>
          <span className='about-2 leading-tight'>
            I strive to deliver seamless user experiences by embracing modern
            frontend practices, AI integration, and thoughtful design
            principles. <br />
          </span>
          <span className='about-3 leading-tight'>
            With 5+ years of experience as a Full Stack Developer and AI Expert,
            I specialize in building React.js applications, integrating APIs,
            implementing Machine Learning solutions, and leveraging frameworks
            like Django, Laravel, and Next.js for scalable backend and frontend
            solutions.{' '}
          </span>
        </h1>
      </div>
    </section>
  );
};

export default About1;
