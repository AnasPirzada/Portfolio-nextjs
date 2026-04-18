import gsap from 'gsap';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import styles from './ProjectTile.module.scss';

const ProjectTile = ({ project, classes, isDesktop }) => {
  const { name, heroSection, description, gradient, tech } = project;

  const cardRef = useRef(null);
  const cardInnerRef = useRef(null);
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const techRef = useRef(null);
  const arrowRef = useRef(null);
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
      gsap.set([card, ...techIcons], {
        opacity: 0,
        y: 20,
      });
      gsap.set(titleRef.current, { opacity: 0, y: 10 });
      gsap.set(glowRef.current, { opacity: 0, scale: 0.8 });
      gsap.set(shimmerRef.current, { x: '-100%' });

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
          techIcons,
          {
            opacity: 0.95,
            y: 0,
            duration: 0.35,
            stagger: 0.05,
            ease: 'back.out(1.2)',
          },
          '<0.2'
        );
      return;
    }

    // Subtle 3D Tilt Effect - Clean and elegant
    const handleMouseMove = e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Subtle rotation for elegant 3D effect
      const rotateX = ((y - centerY) / centerY) * 8;
      const rotateY = ((centerX - x) / centerX) * 8;

      // Gentle parallax effect for image
      const imageX = ((x - centerX) / centerX) * 15;
      const imageY = ((y - centerY) / centerY) * 15;

      // Apply 3D transform with perspective
      gsap.to(card, {
        rotateX: -rotateX,
        rotateY: rotateY,
        transformPerspective: 1000,
        duration: 0.2,
        ease: 'power1.out',
      });

      // Subtle image parallax
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          x: imageX,
          y: imageY,
          scale: 1.05,
          duration: 0.4,
          ease: 'power2.out',
        });
      }

      // Glow follows cursor
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          x: x - rect.width / 2,
          y: y - rect.height / 2,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    };

    // Clean hover animation with gradient border effect
    const handleMouseEnter = () => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Lift card elegantly
      tl.to(card, {
        y: -8,
        duration: 0.4,
      })
        .to(
          cardInnerRef.current,
          {
            boxShadow: `0 25px 70px rgba(0, 0, 0, 0.2), 0 0 0 1px ${gradient[0]}30`,
            borderColor: `${gradient[0]}40`,
            duration: 0.4,
          },
          '<'
        )
        .to(
          glowRef.current,
          {
            opacity: 0.6,
            scale: 1.3,
            duration: 0.5,
          },
          '<0.1'
        )
        .to(
          imageRef.current,
          {
            scale: 1.08,
            duration: 0.5,
            ease: 'power2.out',
          },
          '<0.1'
        )
        .to(
          titleRef.current,
          {
            y: -2,
            duration: 0.3,
          },
          '<0.2'
        )
        .to(
          titleRef.current,
          {
            backgroundImage: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            color: 'transparent',
            duration: 0.4,
          },
          '<0.1'
        )
        .to(
          arrowRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotation: 0,
            duration: 0.4,
            ease: 'back.out(1.5)',
          },
          '<0.1'
        )
        .to(
          techRef.current?.children || [],
          {
            scale: 1.08,
            y: -2,
            opacity: 1,
            duration: 0.3,
            stagger: 0.03,
            ease: 'back.out(1.2)',
          },
          '<0.1'
        )
        .to(
          shimmerRef.current,
          {
            x: '100%',
            duration: 0.6,
            ease: 'power2.inOut',
          },
          '<0.2'
        );
    };

    const handleMouseLeave = () => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Reset 3D transform smoothly
      tl.to(card, {
        y: 0,
        z: 0,
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
      })
        .to(
          cardInnerRef.current,
          {
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
            borderColor: '',
            duration: 0.4,
          },
          '<'
        )
        .to(
          glowRef.current,
          {
            opacity: 0,
            scale: 0.8,
            x: 0,
            y: 0,
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
            duration: 0.5,
          },
          '<'
        )
        .to(
          titleRef.current,
          {
            y: 0,
            duration: 0.4,
          },
          '<'
        )
        .to(
          titleRef.current,
          {
            clearProps: 'backgroundImage,WebkitBackgroundClip,WebkitTextFillColor,backgroundClip,color',
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
    gsap.set([card, ...techIcons], {
      opacity: 0,
      y: 20,
    });
    gsap.set(titleRef.current, { opacity: 0, y: 10 });
    gsap.set(glowRef.current, { opacity: 0, scale: 0.8 });
    gsap.set(shimmerRef.current, { x: '-100%' });

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
        techIcons,
        {
          opacity: 0.95,
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
      <div data-project-card className="h-full w-full will-change-transform">
        <div
          ref={cardRef}
          className={`${styles.ProjectTile} group relative ${
            !isDesktop ? 'w-full' : 'w-full sm:w-[480px] md:w-[560px]'
          } max-w-full cursor-pointer overflow-visible bg-transparent`}
          style={{
            transformStyle: 'preserve-3d',
            perspective: '1000px',
            transform: 'translateZ(0)',
          }}
        >
        {/* Animated Glow Effect - Uses project's gradient colors */}
        <div
          ref={glowRef}
          className="absolute w-96 h-96 rounded-full opacity-0 pointer-events-none blur-3xl -z-10"
          style={{
            background: `radial-gradient(circle, ${gradient[0]}50, ${gradient[1]}30, transparent 70%)`,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* Main Card Container */}
        <div 
          ref={cardInnerRef}
          className="relative bg-white dark:bg-gray-dark-2 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-gray-dark-3"
        >
          {/* Image Container */}
          <div className="relative w-full h-48 sm:h-56 md:h-64 overflow-hidden">
            <div
              ref={imageRef}
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
              style={{
                backgroundImage: `url(${heroSection})`,
              }}
            />
            
            {/* Gradient overlay - stronger at bottom for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
            
            {/* Hover overlay with project gradient */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: `linear-gradient(135deg, ${gradient[0]}30, ${gradient[1]}15, transparent)`,
              }}
            />


            {/* Arrow indicator - top right */}
            <div className="absolute top-4 right-4 z-10">
              <div
                ref={arrowRef}
                className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full opacity-0 shadow-xl backdrop-blur-md transition-all duration-300 group-hover:opacity-100 group-hover:scale-110"
                style={{
                  background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`,
                  boxShadow: `0 4px 20px ${gradient[0]}50`,
                }}
              >
                <FaArrowRight
                  className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                  style={{ transform: 'rotate(-45deg)' }}
                />
              </div>
            </div>

            {/* Title and Tech Stack Overlay on Image */}
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 md:p-7 z-10">
              {/* Title */}
              <h3
                ref={titleRef}
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 leading-tight transition-all duration-500 drop-shadow-lg"
                style={{
                  textShadow: '0 2px 12px rgba(0, 0, 0, 0.6)',
                }}
              >
                {name}
              </h3>
              
              {/* Tech Stack - All icons in one glass container */}
              <div
                ref={techRef}
                className="inline-flex flex-wrap gap-2 sm:gap-2.5 items-center px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl backdrop-blur-2xl relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0.08))',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 -1px 0 rgba(255, 255, 255, 0.1)',
                }}
              >
                {/* Animated gradient overlay on hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"
                  style={{
                    background: `linear-gradient(135deg, ${gradient[0]}25, ${gradient[1]}12, transparent)`,
                  }}
                />
                {/* Inner glow effect */}
                <div 
                  className="absolute inset-0 rounded-xl pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.15) 0%, transparent 60%)',
                  }}
                />
                {tech.slice(0, 8).map((techName, index) => (
                  <div
                    key={techName}
                    className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 transition-all duration-300 group-hover:scale-110 relative z-10"
                    title={techName}
                  >
                    <img
                      src={`/projects/tech/${techName}.svg`}
                      alt={techName}
                      className="w-4 h-4 sm:w-5 sm:h-5 opacity-90 group-hover:opacity-100 transition-opacity duration-300 filter drop-shadow-md"
                    />
                  </div>
                ))}
                {tech.length > 8 && (
                  <div 
                    className="flex items-center justify-center px-2.5 sm:px-3 h-9 sm:h-10 text-white text-xs sm:text-sm font-semibold group-hover:scale-110 transition-all duration-300 relative z-10 drop-shadow-md"
                  >
                    +{tech.length - 8}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Shimmer Effect */}
          <div
            ref={shimmerRef}
            className="absolute inset-0 opacity-0 group-hover:opacity-20 pointer-events-none"
            style={{
              background:
                'linear-gradient(110deg, transparent 40%, rgba(255, 255, 255, 0.3) 50%, transparent 60%)',
              transform: 'translateX(-100%)',
            }}
          />
        </div>
      </div>
      </div>
    </Link>
  );
};

export default ProjectTile;
