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
          { opacity: 0.2, y: 20 },
          { opacity: 1, y: 0 }
        )
        .to(quoteRef.current.querySelector('.about-1'), {
          opacity: 0.2,
          y: -10,
          duration: 0.6,
        })
        .fromTo(
          quoteRef.current.querySelector('.about-2'),
          { opacity: 0.2, y: 20 },
          { opacity: 1, y: 0 },
          '<0.2'
        )
        .to(quoteRef.current.querySelector('.about-2'), {
          opacity: 0.2,
          y: -10,
          duration: 0.6,
        })
        .fromTo(
          quoteRef.current.querySelector('.about-3'),
          { opacity: 0.2, y: 20 },
          { opacity: 1, y: 0 },
          '<0.2'
        )
        .to(quoteRef.current.querySelector('.about-3'), {
          opacity: 0.2,
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
          <span className='about-1 leading-tight block mb-4'>
            I&apos;m a passionate{' '}
            <span className='text-[#efc041]'>Full Stack Developer</span> and{' '}
            <span className='text-[#efc041]'>AI Expert</span> who&apos;s focused
            on building scalable and performant applications.
          </span>
          <span className='about-2 leading-tight block mb-4'>
            I strive to deliver seamless user experiences by embracing modern
            frontend practices,{' '}
            <span className='text-[#efc041]'>AI integration</span>, and
            thoughtful design principles.
          </span>
          <span className='about-3 leading-tight block'>
            With <span className='text-[#efc041]'>5+ years</span> of experience,
            I specialize in building{' '}
            <span className='text-[#efc041]'>React.js</span> applications,
            integrating APIs, implementing{' '}
            <span className='text-[#efc041]'>Machine Learning</span> solutions,
            and leveraging frameworks like Django, Laravel, and Next.js.
          </span>
        </h1>
      </div>
    </section>
  );
};

export default About1;
