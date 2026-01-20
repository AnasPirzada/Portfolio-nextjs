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
  const descriptionRef = useRef(null);
  const glowRef = useRef(null);
  const shimmerRef = useRef(null);

  let additionalClasses = '';
  if (classes) {
    additionalClasses = classes;
  }

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Check if device supports hover (desktop) or is touch device (mobile)
    const isTouchDevice =
      'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // Skip hover effects on mobile/touch devices or if user prefers reduced motion
    if (isTouchDevice || prefersReducedMotion) {
      // Still run initial animation
      const techIcons = techRef.current?.children || [];
      gsap.set([card, titleRef.current, descriptionRef.current, ...techIcons], {
        opacity: 0,
        y: 20,
      });
      gsap.set(glowRef.current, { opacity: 0, scale: 0.8 });
      gsap.set(shimmerRef.current, { x: '-100%' });
      if (descriptionRef.current) {
        gsap.set(descriptionRef.current, { opacity: 0.8, y: 4 });
      }

      const initTl = gsap.timeline({ defaults: { ease: 'power2.out' } });
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
          descriptionRef.current,
          {
            opacity: 0.8,
            y: 0,
            duration: 0.4,
          },
          '<0.2'
        )
        .to(
          techIcons,
          {
            opacity: 0.9,
            y: 0,
            duration: 0.35,
            stagger: 0.05,
            ease: 'back.out(1.2)',
          },
          '<0.2'
        );
      return;
    }

    // 3D Tilt Effect on Mouse Move (Desktop only)
    const handleMouseMove = e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * 6;
      const rotateY = ((centerX - x) / centerX) * 6;

      // Parallax effect for image
      const imageX = ((x - centerX) / centerX) * 20;
      const imageY = ((y - centerY) / centerY) * 20;

      gsap.to(card, {
        rotateX: -rotateX,
        rotateY: rotateY,
        transformPerspective: 1000,
        duration: 0.3,
        ease: 'power1.out',
      });

      gsap.to(imageRef.current, {
        x: imageX,
        y: imageY,
        duration: 0.6,
        ease: 'power2.out',
      });

      // Animated glow follows cursor
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          x: x - rect.width / 2,
          y: y - rect.height / 2,
          duration: 0.4,
          ease: 'power2.out',
        });
      }
    };

    // GSAP Hover Animation - Enhanced with more effects (Desktop only)
    const handleMouseEnter = () => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      tl.to(card, {
        y: -12,
        duration: 0.5,
      })
        .to(
          card,
          {
            boxShadow: '0 20px 60px rgba(239, 192, 65, 0.25)',
            duration: 0.5,
          },
          '<'
        )
        .to(
          glowRef.current,
          {
            opacity: 1,
            scale: 1.5,
            duration: 0.6,
          },
          '<0.2'
        )
        .to(
          imageRef.current,
          {
            scale: 1.12,
            duration: 0.7,
            ease: 'power2.out',
          },
          '<0.1'
        )
        .to(
          titleRef.current,
          {
            color: '#efc041',
            y: -2,
            duration: 0.4,
          },
          '<0.3'
        )
        .to(
          descriptionRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
          },
          '<0.2'
        )
        .to(
          arrowRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotation: 0,
            duration: 0.5,
            ease: 'back.out(1.7)',
          },
          '<0.2'
        )
        .to(
          techRef.current?.children || [],
          {
            scale: 1.1,
            y: -2,
            opacity: 1,
            duration: 0.4,
            stagger: 0.04,
            ease: 'back.out(1.4)',
          },
          '<0.1'
        )
        .to(
          shimmerRef.current,
          {
            x: '100%',
            duration: 0.8,
            ease: 'power2.inOut',
          },
          '<0.3'
        );
    };

    const handleMouseLeave = () => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      tl.to(card, {
        y: 0,
        rotateX: 0,
        rotateY: 0,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        duration: 0.5,
      })
        .to(
          glowRef.current,
          {
            opacity: 0,
            scale: 0.8,
            duration: 0.4,
          },
          '<'
        )
        .to(
          imageRef.current,
          {
            scale: 1,
            x: 0,
            y: 0,
            duration: 0.6,
          },
          '<'
        )
        .to(
          titleRef.current,
          {
            color: '#ffffff',
            y: 0,
            duration: 0.4,
          },
          '<'
        )
        .to(
          descriptionRef.current,
          {
            opacity: 0.8,
            y: 4,
            duration: 0.3,
          },
          '<'
        )
        .to(
          arrowRef.current,
          {
            opacity: 0,
            y: 8,
            scale: 0.8,
            duration: 0.3,
          },
          '<'
        )
        .to(
          techRef.current?.children || [],
          {
            scale: 1,
            y: 0,
            duration: 0.3,
            stagger: 0.02,
          },
          '<'
        )
        .to(
          shimmerRef.current,
          {
            x: '-100%',
            duration: 0,
          },
          '<'
        );
    };

    // Initial animation on mount with stagger
    const techIcons = techRef.current?.children || [];
    gsap.set([card, titleRef.current, descriptionRef.current, ...techIcons], {
      opacity: 0,
      y: 20,
    });
    gsap.set(glowRef.current, { opacity: 0, scale: 0.8 });
    gsap.set(shimmerRef.current, { x: '-100%' });
    if (descriptionRef.current) {
      gsap.set(descriptionRef.current, { opacity: 0.8, y: 4 });
    }

    const initTl = gsap.timeline({ defaults: { ease: 'power2.out' } });
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
        descriptionRef.current,
        {
          opacity: 0.8,
          y: 0,
          duration: 0.4,
        },
        '<0.2'
      )
      .to(
        techIcons,
        {
          opacity: 0.9,
          y: 0,
          duration: 0.35,
          stagger: 0.05,
          ease: 'back.out(1.2)',
        },
        '<0.2'
      );

    // Only add mouse events on desktop
    if (!isTouchDevice && !prefersReducedMotion) {
      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);
      card.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (!isTouchDevice && !prefersReducedMotion) {
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mouseleave', handleMouseLeave);
        card.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <Link
      href={`/project/${name.toLowerCase().replace(/\s+/g, '-')}`}
      className={`${additionalClasses} block ${
        !isDesktop
          ? 'w-[85vw] sm:w-[70vw] flex-shrink-0 snap-center'
          : 'sm:w-auto'
      }`}
      style={{
        maxWidth: isDesktop ? 'calc(100vw - 2rem)' : '85vw',
        flex: isDesktop ? '1 0 auto' : '0 0 auto',
      }}
    >
      <div
        ref={cardRef}
        className={`${styles.ProjectTile} group relative ${
          !isDesktop ? 'w-full' : 'w-full sm:w-[480px] md:w-[560px]'
        } max-w-full bg-gradient-to-br from-[#efc041]/5 to-[#eeba2c]/5 dark:from-[#efc041]/5 dark:to-[#eeba2c]/5 border border-[#efc041]/20 cursor-pointer overflow-hidden`}
        style={{
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Animated Glow Effect */}
        <div
          ref={glowRef}
          className="absolute w-64 h-64 rounded-full opacity-0 pointer-events-none blur-3xl -z-10"
          style={{
            background: `radial-gradient(circle, ${gradient[0]}40, ${gradient[1]}20, transparent 70%)`,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* Shimmer Effect */}
        <div
          ref={shimmerRef}
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background:
              'linear-gradient(110deg, transparent 40%, rgba(239, 192, 65, 0.3) 50%, transparent 60%)',
            transform: 'translateX(-100%)',
          }}
        />

        {/* Image Container - Full width, better aspect ratio */}
        <div className="relative w-full h-48 sm:h-56 md:h-64 overflow-hidden bg-[#000]">
          <div
            ref={imageRef}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${heroSection})`,
            }}
          />
          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Dynamic hover overlay effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#efc041]/0 to-[#efc041]/0 group-hover:from-[#efc041]/15 group-hover:to-transparent transition-all duration-700" />

          {/* Arrow indicator - bottom right with animation */}
          <div className="absolute bottom-4 right-4 z-10">
            <div
              ref={arrowRef}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-[#efc041] opacity-0 shadow-lg shadow-[#efc041]/30"
            >
              <FaArrowRight
                className="w-4 h-4 text-black"
                style={{ transform: 'rotate(-45deg)' }}
              />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div
          ref={contentRef}
          className="p-4 sm:p-5 md:p-6 bg-gradient-to-br from-[#efc041]/5 to-[#eeba2c]/5 text-left"
        >
          {/* Title */}
          <h3
            ref={titleRef}
            className="text-xl sm:text-2xl md:text-2xl font-semibold text-gray-dark-1 dark:text-white mb-2 sm:mb-3 leading-tight transition-colors duration-300 text-left"
          >
            {name}
          </h3>

          {/* Description if available */}
          {description && (
            <p
              ref={descriptionRef}
              className="text-xs sm:text-sm md:text-sm text-gray-light-4 dark:text-gray-light-2 mb-3 sm:mb-4 line-clamp-2 leading-relaxed text-left"
            >
              {description}
            </p>
          )}

          {/* Tech Stack */}
          <div
            ref={techRef}
            className="flex flex-wrap gap-1.5 sm:gap-2 items-center pt-2 border-t border-[#efc041]/20"
          >
            {tech.slice(0, 6).map((techName, index) => (
              <div
                key={techName}
                className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/50 dark:bg-black/20 border border-[#efc041]/20 group-hover:border-[#efc041]/40 transition-all duration-300"
                style={{
                  opacity: 0.9,
                }}
                title={techName}
              >
                <img
                  src={`/projects/tech/${techName}.svg`}
                  alt={techName}
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
            {tech.length > 6 && (
              <div className="flex items-center justify-center px-2 sm:px-3 h-8 sm:h-9 rounded-lg bg-white/50 dark:bg-black/20 border border-[#efc041]/20 text-gray-light-4 dark:text-gray-500 text-[10px] sm:text-xs font-medium">
                +{tech.length - 6}
              </div>
            )}
          </div>
        </div>

        {/* Animated border glow on hover */}
        <div className="absolute inset-0 border border-[#efc041]/20 group-hover:border-[#efc041]/40 transition-colors duration-500 pointer-events-none" />

        {/* Pulsing border animation */}
        <div className="absolute inset-0 border border-[#efc041]/0 group-hover:border-[#efc041]/20 transition-all duration-700 pointer-events-none animate-pulse" />
      </div>
    </Link>
  );
};

export default ProjectTile;
