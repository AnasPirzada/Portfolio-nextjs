'use client';

import { motion, useReducedMotion } from 'framer-motion';
import gsap from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import allprojectarrow from '../../public/allprojectarrow.svg';
import styles from './ProjectCard.module.scss';

const LAYOUT_KEYS = ['variantDefault', 'variantBar', 'variantSoft', 'variantDiagonal'];

export default function ProjectCard({ project, index = 0 }) {
  const tiltRef = useRef(null);
  const imageParallaxRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const g1 = project.gradient?.[0] ?? '#c8860a';
  const g2 = project.gradient?.[1] ?? '#8b5a00';
  const layoutClass = styles[LAYOUT_KEYS[index % LAYOUT_KEYS.length]];

  const projectUrl = `/project/${project.name
    .toLowerCase()
    .replace(/\s+/g, '-')}`;

  const label = `${project.name} — ${project.category ?? 'Project'}. View case study.`;

  useEffect(() => {
    const card = tiltRef.current;
    if (!card || prefersReducedMotion) return;

    const root = document.documentElement;
    const readVar = (name, fallback) => {
      const v = getComputedStyle(root).getPropertyValue(name).trim();
      return v || fallback;
    };

    const handleMouseMove = e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotateX = ((y - cy) / cy) * 5;
      const rotateY = ((cx - x) / cx) * 5;
      const imageX = ((x - cx) / cx) * 14;
      const imageY = ((y - cy) / cy) * 14;

      gsap.to(card, {
        rotateX: -rotateX,
        rotateY,
        transformPerspective: 1200,
        duration: 0.35,
        ease: 'power2.out',
      });

      if (imageParallaxRef.current) {
        gsap.to(imageParallaxRef.current, {
          x: imageX,
          y: imageY,
          duration: 0.55,
          ease: 'power3.out',
        });
      }
    };

    const handleMouseEnter = () => {
      const accent = readVar('--accent-light', g1);
      gsap.to(card, {
        y: -8,
        boxShadow: `0 28px 56px -8px color-mix(in srgb, ${accent} 22%, transparent), 0 12px 24px -12px rgba(0,0,0,0.45)`,
        duration: 0.55,
        ease: 'power3.out',
      });
      if (imageParallaxRef.current) {
        gsap.to(imageParallaxRef.current, {
          scale: 1.06,
          duration: 0.65,
          ease: 'power2.out',
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        y: 0,
        rotateX: 0,
        rotateY: 0,
        boxShadow: 'none',
        duration: 0.6,
        ease: 'power3.out',
      });
      if (imageParallaxRef.current) {
        gsap.to(imageParallaxRef.current, {
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.65,
          ease: 'power3.out',
        });
      }
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [g1, prefersReducedMotion]);

  const cssVars = {
    '--g1': g1,
    '--g2': g2,
  };

  return (
    <Link href={projectUrl} className={styles.cardLink} aria-label={label}>
      <article
        className={`${styles.card} ${layoutClass ?? ''}`}
        style={cssVars}
      >
        <div ref={tiltRef} className={styles.tiltLayer}>
          <div className={styles.borderRing} aria-hidden />
          <div className={styles.inner}>
            <div className={styles.noise} aria-hidden />
            <span className={styles.indexWatermark} aria-hidden>
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className={styles.cornerAccent} aria-hidden />

            <div className={styles.imageShell}>
              <div className={styles.imageGlow} aria-hidden />
              <div ref={imageParallaxRef} className={styles.imageParallax}>
                <Image
                  src={project.heroSection}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                  priority={index < 3}
                />
              </div>
              <div className={styles.imageOverlay} />
              <div className={styles.vignette} aria-hidden />
              <div className={styles.scanlines} aria-hidden />

              <div className={styles.metaRow}>
                {project.category ? (
                  <span className={styles.pill}>{project.category}</span>
                ) : null}
              </div>
            </div>

            <div className={styles.body}>
              <h3 className={styles.title}>{project.name}</h3>
              <p className={styles.desc}>{project.description}</p>

              <div className={styles.techRow}>
                {project?.tech?.slice(0, 6).map((el, i) => (
                  <motion.span
                    key={el}
                    className={styles.techIcon}
                    whileHover={
                      prefersReducedMotion
                        ? undefined
                        : { y: -3, transition: { type: 'spring', stiffness: 400, damping: 18 } }
                    }
                    style={{ transitionDelay: `${i * 25}ms` }}
                  >
                    <Image
                      src={`/projects/tech/${el}.svg`}
                      alt={el}
                      width={18}
                      height={18}
                      unoptimized
                    />
                  </motion.span>
                ))}
                {project?.tech?.length > 6 ? (
                  <span className={styles.morePill}>
                    +{project.tech.length - 6}
                  </span>
                ) : null}
              </div>

              <div className={styles.cta}>
                <span className={styles.ctaLabel}>Case study</span>
                <span className={styles.ctaArrow}>
                  <Image
                    src={allprojectarrow}
                    alt=""
                    width={16}
                    height={16}
                    unoptimized
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
