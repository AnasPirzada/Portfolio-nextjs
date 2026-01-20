import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';
import { CALENDLY_URL } from '../../constants';

const Collaboration = ({ clientHeight }) => {
  const sectionRef = useRef(null);
  const quoteRef = useRef(null);
  const statsRef = useRef(null);
  const [counters, setCounters] = useState({
    projects: 0,
    clients: 0,
    experience: 0,
  });

  useEffect(() => {
    const smallScreen = document.body.clientWidth < 767;

    const timeline = gsap.timeline({
      defaults: { ease: 'none' },
    });

    timeline
      .from(quoteRef.current, { opacity: 0, duration: 2 })
      .to(quoteRef.current.querySelector('.text-strong'), {
        backgroundPositionX: '100%',
        duration: 1,
      });

    const slidingTl = gsap.timeline({ defaults: { ease: 'none' } });

    slidingTl
      .to(sectionRef.current.querySelector('.ui-left'), {
        xPercent: smallScreen ? -500 : -150,
      })
      .from(
        sectionRef.current.querySelector('.ui-right'),
        { xPercent: smallScreen ? -500 : -150 },
        '<'
      );

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'center bottom',
      end: 'center center',
      scrub: 1,
      animation: timeline,
    });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
      animation: slidingTl,
    });

    // Counter animation
    const counterObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Animate counters
            const duration = 2;
            const targets = { projects: 0, clients: 0, experience: 0 };

            gsap.to(targets, {
              projects: 20,
              clients: 15,
              experience: 5,
              duration,
              ease: 'power2.out',
              onUpdate: () => {
                setCounters({
                  projects: Math.round(targets.projects),
                  clients: Math.round(targets.clients),
                  experience: Math.round(targets.experience),
                });
              },
            });

            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      counterObserver.observe(statsRef.current);
    }

    return () => {
      timeline.kill();
      slidingTl.kill();
      counterObserver.disconnect();
    };
  }, [quoteRef, sectionRef]);

  return (
    <section ref={sectionRef} className="w-full relative select-none">
      <div className="py-10 md:py-20 section-container flex flex-col">
        <p className="opacity-40 text-6xl sm:text-7xl font-semibold whitespace-nowrap ui-left transform-gpu">
          {Array(5)
            .fill(
              ' Full Stack Development React.js Next.js Three.js TypeScript Node.js '
            )
            .reduce((str, el) => str.concat(el), '')}{' '}
        </p>

        <h1
          ref={quoteRef}
          className="mt-6 md:mt-8 font-medium text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center"
        >
          Interested in{' '}
          <span
            className="text-strong font-semibold"
            style={{
              background:
                'linear-gradient(90deg, #ffffff 0%, #ffffff 50%, #eeba2c 51%, #efc041 102%)',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Collaboration
          </span>
          ?
        </h1>

        {/* Animated Stats */}
        <div
          ref={statsRef}
          className="mt-8 md:mt-12 flex justify-center gap-8 md:gap-16"
        >
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-[#efc041]">
              {counters.projects}+
            </div>
            <div className="text-sm md:text-base text-gray-400 mt-1">
              Projects
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-[#efc041]">
              {counters.clients}+
            </div>
            <div className="text-sm md:text-base text-gray-400 mt-1">
              Clients
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-[#efc041]">
              {counters.experience}+
            </div>
            <div className="text-sm md:text-base text-gray-400 mt-1">
              Years Exp
            </div>
          </div>
        </div>

        <p className="mt-6 md:mt-8 opacity-40 text-6xl sm:text-7xl font-semibold whitespace-nowrap ui-right transform-gpu">
          {Array(5)
            .fill(' AI Integration Laravel Django MongoDB Firebase ')
            .reduce((str, el) => str.concat(el), '')}{' '}
        </p>

        <div className="mt-12 md:mt-16 flex justify-center">
          <button
            onClick={() =>
              window.open(CALENDLY_URL, '_blank', 'noopener,noreferrer')
            }
            className="inline-block px-8 py-4 md:px-10 md:py-5 text-lg md:text-xl font-bold text-black bg-[#efc041] rounded-lg hover:bg-[#eeba2c] transition-colors duration-300 shadow-lg shadow-[#efc041]/30 hover:shadow-[#eeba2c]/40 cursor-pointer border-none"
          >
            Let&apos;s Collaborate
          </button>
        </div>
      </div>
    </section>
  );
};

export default Collaboration;
