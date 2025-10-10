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
          defaults: { ease: 'none', duration: 0.1 },
        })
        .fromTo(
          quoteRef.current.querySelector('.about-1'),
          { opacity: 0.2 },
          { opacity: 1 }
        )
        .to(quoteRef.current.querySelector('.about-1'), {
          opacity: 0.2,
          delay: 0.5,
        })
        .fromTo(
          quoteRef.current.querySelector('.about-2'),
          { opacity: 0.2 },
          { opacity: 1 },
          '<'
        )
        .to(quoteRef.current.querySelector('.about-2'), {
          opacity: 0.2,
          delay: 0.5,
        })
        .fromTo(
          quoteRef.current.querySelector('.about-3'),
          { opacity: 0.2 },
          { opacity: 1 },
          '<'
        )
        .to(quoteRef.current.querySelector('.about-3'), {
          opacity: 0.2,
          delay: 0.5,
        });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'center 80%',
        end: 'center top',
        scrub: 0,
        animation: tl,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className='w-full relative select-none'>
      <div
        className={`${
          clientHeight > 650 ? 'pt-28 pb-16' : 'pt-80 pb-72'
        } section-container`}
      >
        <h1
          ref={quoteRef}
          className='font-medium text-[2.70rem] md:text-6xl lg:text-[4rem] text-center'
        >
          <span className='about-1 leading-tight'>
            I&apos;m a passionate Full Stack Developer and AI Expert who&apos;s focused on building
            scalable and performant applications. <br />
          </span>
          <span className='about-2 leading-tight'>
            I strive to deliver seamless user experiences by embracing modern
            frontend practices, AI integration, and thoughtful design principles. <br />
          </span>
          <span className='about-3 leading-tight'>
            With over 2 years of experience as a Full Stack Developer and AI Expert, I
            specialize in building React.js applications, integrating APIs, implementing
            Machine Learning solutions, and leveraging frameworks like Django, Laravel, 
            and Next.js for scalable backend and frontend solutions.{' '}
          </span>
        </h1>
      </div>
    </section>
  );
};

export default About1;
