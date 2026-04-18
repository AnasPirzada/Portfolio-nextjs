import { isScrollRevealDesktop } from '@/utils/scrollRevealSupport';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useLayoutEffect, useRef, useState } from 'react';
import { CALENDLY_URL } from '../../constants';

const Collaboration = ({ clientHeight }) => {
  const sectionRef = useRef(null);
  const quoteRef = useRef(null);
  const statsRef = useRef(null);
  const leftColRef = useRef(null);
  const rightCardRef = useRef(null);
  const [counters, setCounters] = useState({
    projects: 0,
    clients: 0,
    experience: 0,
  });

  useLayoutEffect(() => {
    if (!sectionRef.current || !quoteRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    let counterObserver = null;

    const attachCounterObserver = () => {
      const obs = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
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

              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.3 }
      );
      if (statsRef.current) {
        obs.observe(statsRef.current);
      }
      return obs;
    };

    if (!isScrollRevealDesktop()) {
      gsap.set(quoteRef.current, { opacity: 1, y: 0, clearProps: 'transform' });
      const textStrong = quoteRef.current.querySelector('.text-strong');
      if (textStrong) {
        gsap.set(textStrong, {
          backgroundPositionX: '100%',
          WebkitTextFillColor: 'unset',
        });
      }
      if (leftColRef.current) {
        gsap.set(leftColRef.current, { opacity: 1, y: 0 });
      }
      if (rightCardRef.current) {
        gsap.set(rightCardRef.current, { opacity: 1, y: 0 });
      }

      counterObserver = attachCounterObserver();
      return () => {
        if (counterObserver) {
          counterObserver.disconnect();
        }
      };
    }

    let ctx;
    const rafId = requestAnimationFrame(() => {
      if (!sectionRef.current || !quoteRef.current) return;

      ctx = gsap.context(() => {
        const textStrong = quoteRef.current.querySelector('.text-strong');
        // Set initial states
        gsap.set(quoteRef.current, { opacity: 0, y: 20 });
        if (textStrong) {
          gsap.set(textStrong, {
            backgroundPositionX: '0%',
            WebkitTextFillColor: 'transparent',
          });
        }

        // Split layout content animation (left text + right card)
        if (leftColRef.current && rightCardRef.current) {
          gsap.set([leftColRef.current, rightCardRef.current], {
            opacity: 0,
            y: 40,
          });

          const contentTl = gsap.timeline({
            defaults: { ease: 'power3.out' },
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              end: 'top 40%',
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });

          contentTl
            .to(leftColRef.current, {
              opacity: 1,
              y: 0,
              duration: 1,
            })
            .to(
              rightCardRef.current,
              {
                opacity: 1,
                y: 0,
                duration: 0.9,
              },
              '-=0.6'
            );
        }

        // Heading fade-in (plays once when section enters)
        gsap.to(quoteRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
            invalidateOnRefresh: true,
          },
        });

        // Collaboration word fill tied to scroll progress
        if (textStrong) {
          gsap.to(textStrong, {
            backgroundPositionX: '100%',
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              end: 'top 20%',
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
        }

        counterObserver = attachCounterObserver();
      }, sectionRef);

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    });

    return () => {
      cancelAnimationFrame(rafId);
      ctx?.revert();
      if (counterObserver) {
        counterObserver.disconnect();
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full relative select-none overflow-x-hidden"
    >
      <div className="py-16 md:py-24 section-container flex flex-col gap-10 md:gap-14">
        {/* Split layout: left text, right stats card */}
        <div className="grid gap-10 md:gap-16 md:grid-cols-2 items-center">
          {/* Left column - text + CTA */}
          <div ref={leftColRef} className="space-y-6 md:space-y-8">
            <h1
              ref={quoteRef}
              className="font-medium text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-left md:text-left"
            >
              Interested in{' '}
              <span
                className="text-strong font-semibold"
                style={{
                  background:
                    'linear-gradient(90deg, var(--text-primary) 0%, var(--text-primary) 50%, var(--accent-dark) 51%, var(--accent-light) 102%)',
                  backgroundSize: '200% 100%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Collaboration
              </span>
              ?
            </h1>

            <p className="text-sm md:text-base text-gray-400 max-w-md">
              Let&apos;s build performant, beautiful products together — from
              full-stack apps to AI-powered experiences tailored to your vision.
            </p>

            <div className="pt-2">
              <button
                onClick={() =>
                  window.open(CALENDLY_URL, '_blank', 'noopener,noreferrer')
                }
                className="inline-block px-8 py-4 md:px-10 md:py-5 text-lg md:text-xl font-bold text-black bg-[color:var(--accent-light)] rounded-lg hover:bg-[color:var(--accent-dark)] transition-colors duration-300 shadow-lg shadow-[0_10px_25px_rgba(200,134,10,0.25)] hover:shadow-[0_14px_30px_rgba(181,117,10,0.35)] cursor-pointer border-none"
              >
                Let&apos;s Collaborate
              </button>
            </div>
          </div>

          {/* Right column - glassmorphism stats card */}
          <div
            ref={rightCardRef}
            className="relative rounded-3xl border border-[color:color-mix(in_srgb,var(--accent-light)_22%,transparent)] bg-light-surface/95 dark:bg-black/30 backdrop-blur-xl px-6 py-6 md:px-8 md:py-8 shadow-[0_18px_40px_rgba(90,60,20,0.1)] dark:shadow-[0_18px_60px_rgba(0,0,0,0.45)] overflow-hidden"
          >
            {/* Decorative gradient ring */}
            <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full border border-[color:color-mix(in_srgb,var(--accent-light)_35%,transparent)] dark:border-[color:color-mix(in_srgb,var(--accent-light)_40%,transparent)] blur-sm opacity-50 dark:opacity-60" />

            <div
              ref={statsRef}
              className="relative z-10 grid grid-cols-2 gap-2.5 max-sm:gap-3 sm:flex sm:flex-row sm:justify-between sm:gap-6 md:gap-8"
            >
              {/* Projects */}
              <div className="group flex min-w-0 flex-1 flex-col justify-center rounded-2xl border border-[color:color-mix(in_srgb,var(--accent-light)_22%,transparent)] bg-[color:color-mix(in_srgb,var(--accent-light)_7%,transparent)] px-3 py-4 text-center max-sm:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:rounded-none sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 sm:shadow-none dark:border-[color:color-mix(in_srgb,var(--accent-light)_28%,transparent)] dark:bg-[color:color-mix(in_srgb,var(--accent-light)_10%,transparent)] dark:sm:border-0 dark:sm:bg-transparent">
                <div className="mb-2 inline-flex items-center justify-center rounded-full bg-[color:color-mix(in_srgb,var(--accent-light)_8%,transparent)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-700 max-sm:w-full dark:bg-[color:color-mix(in_srgb,var(--accent-light)_14%,transparent)] dark:text-[color:var(--accent-light)] sm:mb-2 sm:w-auto sm:px-3 sm:text-[11px] sm:tracking-[0.15em]">
                  <span className="mr-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--accent-light)] shadow-[0_0_6px_rgba(200,134,10,0.45)] sm:mr-2" />
                  Projects
                </div>
                <div className="relative inline-block">
                  <div className="text-3xl font-extrabold bg-gradient-to-br from-[color:var(--accent-light)] via-[color:var(--accent-dark)] to-[color:var(--accent-light)] bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(200,134,10,0.2)] transition-transform duration-300 group-hover:scale-110 max-sm:tabular-nums sm:text-4xl md:text-5xl dark:drop-shadow-[0_0_18px_rgba(239,192,65,0.35)]">
                    {counters.projects}+
                  </div>
                  <div className="pointer-events-none absolute inset-0 blur-3xl bg-[color:color-mix(in_srgb,var(--accent-light)_20%,transparent)] opacity-40 transition-opacity group-hover:opacity-70 dark:bg-[color:color-mix(in_srgb,var(--accent-light)_30%,transparent)] dark:opacity-60 dark:group-hover:opacity-80" />
                </div>
              </div>

              {/* Divider (sm+ row layout) */}
              <div className="hidden w-px shrink-0 bg-gradient-to-b from-transparent via-[color:color-mix(in_srgb,var(--accent-light)_40%,transparent)] to-transparent opacity-70 sm:block" />

              {/* Clients */}
              <div className="group flex min-w-0 flex-1 flex-col justify-center rounded-2xl border border-[color:color-mix(in_srgb,var(--accent-light)_22%,transparent)] bg-[color:color-mix(in_srgb,var(--accent-light)_7%,transparent)] px-3 py-4 text-center max-sm:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:rounded-none sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 sm:shadow-none dark:border-[color:color-mix(in_srgb,var(--accent-light)_28%,transparent)] dark:bg-[color:color-mix(in_srgb,var(--accent-light)_10%,transparent)] dark:sm:border-0 dark:sm:bg-transparent">
                <div className="mb-2 inline-flex items-center justify-center rounded-full bg-[color:color-mix(in_srgb,var(--accent-light)_8%,transparent)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-700 max-sm:w-full dark:bg-[color:color-mix(in_srgb,var(--accent-light)_14%,transparent)] dark:text-[color:var(--accent-light)] sm:mb-2 sm:w-auto sm:px-3 sm:text-[11px] sm:tracking-[0.15em]">
                  <span className="mr-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--accent-light)] shadow-[0_0_6px_rgba(200,134,10,0.45)] sm:mr-2" />
                  Clients
                </div>
                <div className="relative inline-block">
                  <div className="text-3xl font-extrabold bg-gradient-to-br from-[color:var(--accent-light)] via-[color:var(--accent-dark)] to-[color:var(--accent-light)] bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(200,134,10,0.2)] transition-transform duration-300 group-hover:scale-110 max-sm:tabular-nums sm:text-4xl md:text-5xl dark:drop-shadow-[0_0_18px_rgba(239,192,65,0.35)]">
                    {counters.clients}+
                  </div>
                  <div className="pointer-events-none absolute inset-0 blur-3xl bg-[color:color-mix(in_srgb,var(--accent-light)_20%,transparent)] opacity-40 transition-opacity group-hover:opacity-70 dark:bg-[color:color-mix(in_srgb,var(--accent-light)_30%,transparent)] dark:opacity-60 dark:group-hover:opacity-80" />
                </div>
              </div>

              {/* Divider (sm+ row layout) */}
              <div className="hidden w-px shrink-0 bg-gradient-to-b from-transparent via-[color:color-mix(in_srgb,var(--accent-light)_40%,transparent)] to-transparent opacity-70 sm:block" />

              {/* Years Experience — full width row on mobile grid */}
              <div className="group col-span-2 flex min-w-0 flex-1 flex-col justify-center rounded-2xl border border-[color:color-mix(in_srgb,var(--accent-light)_22%,transparent)] bg-[color:color-mix(in_srgb,var(--accent-light)_7%,transparent)] px-3 py-4 text-center max-sm:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:col-span-1 sm:rounded-none sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 sm:shadow-none dark:border-[color:color-mix(in_srgb,var(--accent-light)_28%,transparent)] dark:bg-[color:color-mix(in_srgb,var(--accent-light)_10%,transparent)] dark:sm:border-0 dark:sm:bg-transparent">
                <div className="mb-2 inline-flex items-center justify-center rounded-full bg-[color:color-mix(in_srgb,var(--accent-light)_8%,transparent)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-700 max-sm:mx-auto max-sm:min-w-[10rem] dark:bg-[color:color-mix(in_srgb,var(--accent-light)_14%,transparent)] dark:text-[color:var(--accent-light)] sm:mb-2 sm:min-w-0 sm:px-3 sm:text-[11px] sm:tracking-[0.15em]">
                  <span className="mr-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--accent-light)] shadow-[0_0_6px_rgba(200,134,10,0.45)] sm:mr-2" />
                  Years Exp
                </div>
                <div className="relative inline-block">
                  <div className="text-3xl font-extrabold bg-gradient-to-br from-[color:var(--accent-light)] via-[color:var(--accent-dark)] to-[color:var(--accent-light)] bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(200,134,10,0.2)] transition-transform duration-300 group-hover:scale-110 max-sm:tabular-nums sm:text-4xl md:text-5xl dark:drop-shadow-[0_0_18px_rgba(239,192,65,0.35)]">
                    {counters.experience}+
                  </div>
                  <div className="pointer-events-none absolute inset-0 blur-3xl bg-[color:color-mix(in_srgb,var(--accent-light)_20%,transparent)] opacity-40 transition-opacity group-hover:opacity-70 dark:bg-[color:color-mix(in_srgb,var(--accent-light)_30%,transparent)] dark:opacity-60 dark:group-hover:opacity-80" />
                </div>
              </div>
            </div>

            {/* Soft inner glow */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-[color:color-mix(in_srgb,var(--accent-light)_12%,transparent)] via-transparent to-[color:color-mix(in_srgb,var(--accent-dark)_10%,transparent)] opacity-60 mix-blend-screen" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Collaboration;
