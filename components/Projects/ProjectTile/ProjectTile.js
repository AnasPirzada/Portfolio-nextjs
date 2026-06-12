import gsap from 'gsap';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import styles from './ProjectTile.module.scss';

const ProjectTile = ({ project, classes, isDesktop }) => {
  const { name, heroSection, description, gradient, tech, category, year } =
    project;

  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const glowRef = useRef(null);
  const descOverlayRef = useRef(null);
  const ctaRef = useRef(null);

  const additionalClasses = classes || '';

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const isTouchDevice =
      'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    gsap.set(card, { opacity: 0, y: 24 });
    gsap.set(ctaRef.current, { opacity: 0, y: 8 });
    gsap.set(glowRef.current, { opacity: 0 });

    gsap.to(card, { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' });

    if (isTouchDevice || prefersReducedMotion) return;

    const handleMouseMove = e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;

      gsap.to(card, {
        rotateX: -((y - cy) / cy) * 5,
        rotateY: ((cx - x) / cx) * 5,
        transformPerspective: 1200,
        duration: 0.25,
        ease: 'power1.out',
      });

      gsap.to(glowRef.current, {
        x: (x - cx) * 0.35,
        y: (y - cy) * 0.35,
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    const handleMouseEnter = () => {
      const tl = gsap.timeline();
      tl.to(card, { y: -10, duration: 0.38, ease: 'power3.out' }, 0)
        .to(imageRef.current, { scale: 1.06, duration: 0.5, ease: 'power2.out' }, 0)
        .to(glowRef.current, { opacity: 0.55, scale: 1.4, duration: 0.45, ease: 'power2.out' }, 0.05)
        .to(descOverlayRef.current, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, 0.05)
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.32, ease: 'back.out(1.7)' }, 0.12);
    };

    const handleMouseLeave = () => {
      const tl = gsap.timeline();
      tl.to(card, { y: 0, rotateX: 0, rotateY: 0, duration: 0.5, ease: 'power3.out' }, 0)
        .to(imageRef.current, { scale: 1, duration: 0.45, ease: 'power2.out' }, 0)
        .to(glowRef.current, { opacity: 0, scale: 1, x: 0, y: 0, duration: 0.4, ease: 'power2.out' }, 0)
        .to(descOverlayRef.current, { opacity: 0, y: 6, duration: 0.3, ease: 'power2.in' }, 0)
        .to(ctaRef.current, { opacity: 0, y: 8, duration: 0.22, ease: 'power2.in' }, 0);
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);
    card.addEventListener('mousemove', handleMouseMove);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
      card.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <Link
      href={`/project/${name.toLowerCase().replace(/\s+/g, '-')}`}
      className={`${additionalClasses} block ${
        !isDesktop
          ? 'w-[85vw] sm:w-[72vw] flex-shrink-0 snap-center'
          : 'sm:w-auto'
      }`}
      style={{
        maxWidth: isDesktop ? 'calc(100vw - 2rem)' : '85vw',
        flex: isDesktop ? '1 0 auto' : '0 0 auto',
      }}
    >
      <div data-project-card className="h-full w-full will-change-transform">
        <div
          ref={cardRef}
          className={`${styles.ProjectTile} group relative ${
            !isDesktop ? 'w-full' : 'w-full sm:w-[440px] md:w-[500px]'
          } cursor-pointer`}
          style={{ transformStyle: 'preserve-3d', perspective: '1200px' }}
        >
          {/* Ambient glow */}
          <div
            ref={glowRef}
            className="pointer-events-none absolute -z-10 h-72 w-72 rounded-full blur-3xl"
            style={{
              background: `radial-gradient(circle, ${gradient[0]}50, ${gradient[1]}20, transparent 70%)`,
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />

          {/* Card shell */}
          <div className="overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-md transition-shadow duration-500 group-hover:shadow-xl dark:border-white/[0.07] dark:bg-[#141414]">

            {/* ── Image zone ─────────────────────────── */}
            <div className="relative h-[200px] overflow-hidden sm:h-[210px]">
              <div
                ref={imageRef}
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${heroSection})` }}
              />

              {/* Base scrim */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40" />

              {/* Category badge — top left */}
              {category && (
                <div className="absolute left-4 top-4 z-10">
                  <span
                    className="inline-block rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest backdrop-blur-md"
                    style={{
                      background: `${gradient[0]}28`,
                      border: `1px solid ${gradient[0]}55`,
                      color: gradient[0],
                    }}
                  >
                    {category}
                  </span>
                </div>
              )}

              {/* Year — top right */}
              {year && (
                <div className="absolute right-4 top-4 z-10 font-mono text-[11px] tracking-wider text-white/55">
                  {year}
                </div>
              )}

              {/* Description overlay — slides in on hover */}
              <div
                ref={descOverlayRef}
                className="pointer-events-none absolute inset-x-0 bottom-0 z-20 px-5 pb-5 pt-12 opacity-0"
                style={{
                  background:
                    'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.5) 60%, transparent 100%)',
                  transform: 'translateY(6px)',
                }}
              >
                <p className="line-clamp-2 text-[12px] leading-relaxed text-white/80">
                  {description}
                </p>
              </div>

              {/* View Project CTA */}
              <div
                ref={ctaRef}
                className="pointer-events-none absolute bottom-4 right-4 z-30"
              >
                <span
                  className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold text-white"
                  style={{
                    background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`,
                    boxShadow: `0 4px 16px ${gradient[0]}45`,
                  }}
                >
                  View Project
                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden>
                    <path
                      d="M1.5 7.5L7.5 1.5M7.5 1.5H2.5M7.5 1.5V6.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>

              {/* Gradient separator */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[2px]"
                style={{
                  background: `linear-gradient(90deg, ${gradient[0]}, ${gradient[1]} 60%, transparent)`,
                }}
              />
            </div>

            {/* ── Content zone ───────────────────────── */}
            <div className="flex items-center justify-between gap-3 px-5 py-3.5">
              {/* Left: project name */}
              <h3 className="min-w-0 flex-1 truncate text-[17px] font-bold leading-snug tracking-tight text-[#0a0a0a] dark:text-white sm:text-lg">
                {name}
              </h3>

              {/* Right: tech icons */}
              <div className="flex flex-shrink-0 items-center gap-1.5">
                {tech.slice(0, 5).map(techName => (
                  <div
                    key={techName}
                    className="flex h-7 w-7 items-center justify-center rounded-lg border border-black/[0.08] bg-black/[0.04] transition-transform duration-200 group-hover:scale-105 dark:border-white/[0.08] dark:bg-white/[0.06]"
                    title={techName}
                  >
                    <img
                      src={`/projects/tech/${techName}.svg`}
                      alt={techName}
                      className="h-4 w-4 object-contain opacity-75 dark:opacity-80"
                    />
                  </div>
                ))}
                {tech.length > 5 && (
                  <span className="font-mono text-[11px] text-[#aaa] dark:text-white/30">
                    +{tech.length - 5}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectTile;
