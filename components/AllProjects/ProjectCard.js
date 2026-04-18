'use client';

import { motion } from 'framer-motion';
import gsap from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import allprojectarrow from '../../public/allprojectarrow.svg';

export default function ProjectCard({ project }) {
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const glowRef = useRef(null);
  const shimmerRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const techRef = useRef(null);

  // Enhanced GSAP Animations
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const root = document.documentElement;
    const readVar = (name, fallback) => {
      const v = getComputedStyle(root).getPropertyValue(name).trim();
      return v || fallback;
    };

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

      if (imageRef.current) {
        gsap.to(imageRef.current, {
          x: imageX,
          y: imageY,
          duration: 0.6,
          ease: 'power2.out',
        });
      }

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

    const handleMouseEnter = () => {
      const accentLight = readVar('--accent-light', '#c8860a');
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      tl.to(card, {
        y: -10,
        boxShadow: `0 20px 60px color-mix(in srgb, ${accentLight} 25%, transparent)`,
        duration: 0.5,
      })
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
            color: accentLight,
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
          techRef.current?.children || [],
          {
            scale: 1.1,
            y: -2,
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
      const textPrimary = readVar('--text-primary', '#1a1410');
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
            color: textPrimary,
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

    // Initial setup
    if (glowRef.current) {
      gsap.set(glowRef.current, { opacity: 0, scale: 0.8 });
    }
    if (shimmerRef.current) {
      gsap.set(shimmerRef.current, { x: '-100%' });
    }
    if (descriptionRef.current) {
      gsap.set(descriptionRef.current, { opacity: 0.8, y: 4 });
    }

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const projectUrl = `/project/${project.name
    .toLowerCase()
    .replace(/\s+/g, '-')}`;

  return (
    <Link href={projectUrl} className="block">
      <motion.div
        ref={cardRef}
        className="
          group relative z-10 flex flex-col
          bg-gradient-to-br from-accent-light/5 to-accent-dark/5 border border-accent-light/20
          overflow-hidden transition-all duration-300
          hover:border-accent-light/40
        "
        style={{
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          transformStyle: 'preserve-3d',
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {/* Animated Glow Effect */}
        <div
          ref={glowRef}
          className="absolute w-64 h-64 rounded-full opacity-0 pointer-events-none blur-3xl -z-10"
          style={{
            background: `radial-gradient(circle, color-mix(in srgb, var(--accent-light) 40%, transparent), color-mix(in srgb, var(--accent-light) 20%, transparent), transparent 70%)`,
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
              'linear-gradient(110deg, transparent 40%, color-mix(in srgb, var(--accent-light) 30%, transparent) 50%, transparent 60%)',
            transform: 'translateX(-100%)',
          }}
        />

        {/* Image Container - Clean, full width */}
        <div className="relative w-full h-48 sm:h-56 md:h-64 overflow-hidden bg-[#000]">
          <div
            ref={imageRef}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${project.heroSection})`,
            }}
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Dynamic hover overlay effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent-light/0 to-accent-light/0 group-hover:from-accent-light/15 group-hover:to-transparent transition-all duration-700" />

          {/* Arrow indicator - bottom right */}
          <div className="absolute bottom-4 right-4 z-10">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 12 }}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-accent-light opacity-0 shadow-lg shadow-accent-light/30"
            >
              <Image
                src={allprojectarrow}
                alt="arrow"
                width={18}
                height={18}
                unoptimized
              />
            </motion.div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4 sm:p-6 bg-gradient-to-br from-accent-light/5 to-accent-dark/5 flex-1 flex flex-col">
          <h3
            ref={titleRef}
            className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-dark-1 dark:text-white mb-3 leading-tight transition-colors duration-300"
          >
            {project.name}
          </h3>
          <p
            ref={descriptionRef}
            className="text-xs sm:text-sm md:text-sm text-gray-light-4 dark:text-gray-light-2 mb-4 line-clamp-3 leading-relaxed flex-1"
          >
            {project.description}
          </p>

          {/* Tech Stack */}
          <div
            ref={techRef}
            className="flex gap-2 items-center flex-wrap pt-3 border-t border-accent-light/20"
          >
            {project?.tech?.slice(0, 6).map(el => (
              <motion.div
                key={el}
                whileHover={{ scale: 1.15, rotate: 5 }}
                className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/50 dark:bg-black/20 border border-accent-light/20 group-hover:border-accent-light/40 transition-all duration-300"
              >
                <Image
                  src={`/projects/tech/${el}.svg`}
                  alt={el}
                  width={16}
                  height={16}
                  unoptimized
                  className="opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                />
              </motion.div>
            ))}
            {project?.tech?.length > 6 && (
              <div className="flex items-center justify-center px-3 h-9 rounded-lg bg-white/50 dark:bg-black/20 border border-accent-light/20 text-gray-light-4 dark:text-gray-500 text-xs font-medium">
                +{project.tech.length - 6}
              </div>
            )}
          </div>
        </div>

        {/* Animated border glow on hover */}
        <div className="absolute inset-0 border border-accent-light/20 group-hover:border-accent-light/40 transition-colors duration-500 pointer-events-none" />

        {/* Pulsing border animation */}
        <div className="absolute inset-0 border border-accent-light/0 group-hover:border-accent-light/20 transition-all duration-700 pointer-events-none animate-pulse" />
      </motion.div>
    </Link>
  );
}
