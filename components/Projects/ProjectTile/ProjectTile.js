import gsap from 'gsap';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import styles from './ProjectTile.module.scss';

const ProjectTile = ({ project, classes, isDesktop }) => {
  const { name, heroSection, description, gradient, tech } = project;

  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const techRef = useRef(null);
  const arrowRef = useRef(null);

  let additionalClasses = '';
  if (classes) {
    additionalClasses = classes;
  }

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // GSAP Hover Animation
    const handleMouseEnter = () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.to(card, {
        y: -16,
        scale: 1.03,
        duration: 0.5,
      })
        .to(
          card,
          {
            boxShadow: '0 25px 50px -12px rgba(239, 192, 65, 0.25)',
            duration: 0.5,
          },
          '<'
        )
        .to(
          imageRef.current,
          {
            scale: 1.15,
            duration: 0.8,
            ease: 'power2.out',
          },
          '<0.2'
        )
        .to(
          titleRef.current,
          {
            y: -6,
            color: '#efc041',
            duration: 0.5,
            ease: 'power2.out',
          },
          '<0.3'
        )
        .to(
          techRef.current?.children || [],
          {
            y: -3,
            scale: 1.05,
            opacity: 1,
            duration: 0.4,
            stagger: 0.04,
            ease: 'back.out(1.2)',
          },
          '<0.2'
        )
        .to(
          arrowRef.current,
          {
            x: 6,
            rotation: 0,
            duration: 0.4,
            ease: 'back.out(1.5)',
          },
          '<0.1'
        );
    };

    const handleMouseLeave = () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.to(card, {
        y: 0,
        scale: 1,
        boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
        duration: 0.5,
      })
        .to(
          imageRef.current,
          {
            scale: 1,
            duration: 0.7,
          },
          '<'
        )
        .to(
          titleRef.current,
          {
            y: 0,
            color: '#ffffff',
            duration: 0.5,
          },
          '<'
        )
        .to(
          techRef.current?.children || [],
          {
            y: 0,
            scale: 1,
            duration: 0.4,
            stagger: 0.02,
          },
          '<'
        )
        .to(
          arrowRef.current,
          {
            x: 0,
            rotation: 0,
            duration: 0.4,
          },
          '<'
        );
    };

    // Initial animation on mount with stagger
    const techIcons = techRef.current?.children || [];
    gsap.set([card, titleRef.current, ...techIcons], { opacity: 0, y: 20 });

    const initTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    initTl
      .to(card, {
        opacity: 1,
        y: 0,
        duration: 0.7,
      })
      .to(
        titleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
        },
        '<0.2'
      )
      .to(
        techIcons,
        {
          opacity: 0.7,
          y: 0,
          duration: 0.4,
          stagger: 0.05,
        },
        '<0.3'
      );

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <Link
      href={`/project/${name.toLowerCase().replace(/\s+/g, '-')}`}
      className={`${additionalClasses} block`}
      style={{
        maxWidth: isDesktop ? 'calc(100vw - 2rem)' : 'calc(100vw - 4rem)',
        flex: '1 0 auto',
      }}
    >
      <div
        ref={cardRef}
        className={`${styles.ProjectTile} group relative w-[560px] max-w-full rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900/50 to-black/80 backdrop-blur-2xl border border-white/[0.08] cursor-pointer`}
        style={{
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        }}
      >
        {/* Animated Gradient Glow on Hover */}
        <div
          className='absolute -inset-0.5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10 blur-xl'
          style={{
            background: `linear-gradient(135deg, ${gradient[0]}40, ${gradient[1]}40)`,
          }}
        />

        {/* Image Container */}
        <div className='relative h-48 overflow-hidden rounded-t-3xl'>
          <div
            ref={imageRef}
            className='absolute inset-0 bg-cover bg-center'
            style={{
              backgroundImage: `url(${heroSection})`,
            }}
          />
          <div className='absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/70' />

          {/* Floating Badge */}
          <div className='absolute top-6 right-6 z-10'>
            <div className='flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-black/60 backdrop-blur-xl border border-white/20 group-hover:border-[#efc041]/60 group-hover:bg-[#efc041]/10 transition-all duration-500 shadow-lg'>
              <span className='text-white text-xs font-semibold tracking-wide'>
                View Project
              </span>
              <FaArrowRight
                ref={arrowRef}
                className='w-3.5 h-3.5 text-[#efc041]'
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div ref={contentRef} className='p-5'>
          {/* Title */}
          <h3
            ref={titleRef}
            className='text-xl font-bold text-white mb-4 leading-tight'
          >
            {name}
          </h3>

          {/* Tech Stack */}
          <div ref={techRef} className='flex flex-wrap gap-2.5 items-center'>
            {tech.slice(0, 6).map((techName, index) => (
              <div
                key={techName}
                className='flex items-center justify-center w-11 h-11 rounded-xl bg-white/[0.06] border border-white/[0.12] backdrop-blur-sm group-hover:border-[#efc041]/40 group-hover:bg-[#efc041]/10 group-hover:shadow-[0_0_15px_rgba(239,192,65,0.2)] transition-all duration-500'
                style={{
                  opacity: 0.8,
                }}
                title={techName}
              >
                <img
                  src={`/projects/tech/${techName}.svg`}
                  alt={techName}
                  className='w-5 h-5'
                />
              </div>
            ))}
            {tech.length > 6 && (
              <div className='flex items-center justify-center px-4 h-11 rounded-xl bg-white/[0.06] border border-white/[0.12] text-gray-400 text-xs font-semibold'>
                +{tech.length - 6}
              </div>
            )}
          </div>
        </div>

        {/* Shine Effect */}
        <div className='absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none overflow-hidden rounded-2xl'>
          <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out' />
        </div>
      </div>
    </Link>
  );
};

export default ProjectTile;
