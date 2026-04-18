import Cursor from '@/components/Cursor/Cursor';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import Menu from '@/components/Header/Menu/Menu';
import Meta from '@/components/Meta/Meta';
import ProgressIndicator from '@/components/ProgressIndicator/ProgressIndicator';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { METADATA, PROJECTS } from '@/constants';
import styles from './ProjectDetail.module.scss';

gsap.registerPlugin(ScrollTrigger);
gsap.config({ nullTargetWarn: false });

function formatTechLabel(tech) {
  if (tech === 'nestjs') return 'Nest.js';
  return tech.replace(/([A-Z])/g, ' $1').trim();
}

export default function ProjectDetailPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [isDesktop, setIsDesktop] = useState(true);
  const [clientHeight, setClientHeight] = useState(0);
  const [clientWidth, setClientWidth] = useState(0);

  // Refs for GSAP animations
  const heroTitleRef = useRef(null);
  const heroDescRef = useRef(null);
  const heroButtonRef = useRef(null);
  const caseStudyTitleRef = useRef(null);
  const caseStudyCardsRef = useRef(null);
  const metricsRef = useRef(null);
  const projectDetailsRef = useRef(null);
  const projectInfoRef = useRef(null);
  const projectInfoGridRef = useRef(null);
  const workExpRef = useRef(null);
  const servicesRef = useRef(null);
  const navigationRef = useRef(null);

  // Find the project by slug
  const project = PROJECTS.find(
    p => p.name.toLowerCase().replace(/\s+/g, '-') === slug
  );

  useEffect(() => {
    const { innerWidth, innerHeight, orientation, history } = window;

    const result =
      typeof orientation === 'undefined' &&
      navigator.userAgent.indexOf('IEMobile') === -1;
    history.scrollRestoration = 'manual';

    setIsDesktop(result);
    setClientHeight(innerHeight);
    setClientWidth(innerWidth);
  }, [isDesktop]);

  // GSAP Reveal Animations
  useEffect(() => {
    if (!project) return;

    // Hero Section Animations - Play immediately on mount
    const heroTitle = heroTitleRef.current;
    const heroDesc = heroDescRef.current;
    const heroButton = heroButtonRef.current;

    if (heroTitle) {
      gsap.fromTo(
        heroTitle,
        { opacity: 0, y: 80, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
        }
      );
    }

    if (heroDesc) {
      gsap.fromTo(
        heroDesc,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.3,
          ease: 'power2.out',
        }
      );
    }

    if (heroButton) {
      gsap.fromTo(
        heroButton,
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: 0.6,
          ease: 'back.out(1.7)',
        }
      );
    }

    // Case Study Section
    if (caseStudyTitleRef.current) {
      gsap.fromTo(
        caseStudyTitleRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: caseStudyTitleRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    // Case Study Cards
    if (caseStudyCardsRef.current) {
      const cards = caseStudyCardsRef.current.children;
      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 60,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: caseStudyCardsRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    // Metrics
    if (metricsRef.current) {
      const metricItems = metricsRef.current.querySelectorAll('.metric-item');
      gsap.fromTo(
        metricItems,
        {
          opacity: 0,
          scale: 0.8,
          y: 40,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: metricsRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    // Project Details Section
    if (projectDetailsRef.current) {
      const children = projectDetailsRef.current.children;
      gsap.fromTo(
        children,
        {
          opacity: 0,
          x: index => (index === 0 ? -80 : 80),
        },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: projectDetailsRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    // Project Info Grid
    if (projectInfoGridRef.current) {
      const gridItems = projectInfoGridRef.current.children;
      gsap.fromTo(
        gridItems,
        {
          opacity: 0,
          y: 50,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: projectInfoGridRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    // Work Experience Section
    if (workExpRef.current) {
      const children = workExpRef.current.children;
      gsap.fromTo(
        children,
        {
          opacity: 0,
          y: 60,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: workExpRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    // Services Section
    if (servicesRef.current) {
      const serviceItems = servicesRef.current.children;
      gsap.fromTo(
        serviceItems,
        {
          opacity: 0,
          y: 40,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: servicesRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    // Navigation Section
    if (navigationRef.current) {
      gsap.fromTo(
        navigationRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: navigationRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [project]);

  // If project not found, show 404
  if (!project) {
    return (
      <>
        <Meta
          title="Project Not Found"
          description="The requested project could not be found. Explore other projects by Anas Pirzada, Full Stack Developer & AI Expert."
        />
        <Header>
          <Menu />
        </Header>
        <ProgressIndicator />
        <Cursor isDesktop={isDesktop} />
        <main className="flex flex-col min-h-screen items-center justify-center">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-gradient mb-4">404</h1>
            <p className="text-xl text-gray-300 mb-8">Project not found</p>
            <Link href="/projects">
              <button className="px-6 py-3 bg-accent-dark text-black font-semibold rounded-lg hover:bg-accent-light transition-colors">
                Back to Projects
              </button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // SEO meta data for this project
  const projectTitle = project.name;
  const projectDescription = `${project.description} - A ${
    project.category
  } project by Anas Pirzada, Full Stack Developer & AI Expert. Built with ${project.tech?.join(
    ', '
  )}.`;
  const projectUrl = `${METADATA.siteUrl}/project/${slug}`;
  const projectImage = project.heroSection || project.image;

  // Project Schema for structured data (more specific than CreativeWork)
  const projectSchema = {
    '@context': 'https://schema.org',
    '@type': 'Project',
    name: project.name,
    description: project.description,
    image: projectImage,
    url: project.url,
    creator: {
      '@type': 'Person',
      name: 'Anas Pirzada',
      url: METADATA.siteUrl,
      sameAs: [
        'https://www.linkedin.com/in/muhammadanaspirzada/',
        'https://github.com/AnasPirzada',
        'https://x.com/Anas_Pirzada1',
      ],
    },
    dateCreated: project.year,
    keywords: project.tech?.join(', ') || 'web development, programming',
    about: {
      '@type': 'Thing',
      name: project.category,
    },
    programmingLanguage: project.tech || [],
    applicationCategory: project.category,
    operatingSystem: 'Web Browser',
  };

  // Breadcrumb Schema for better search appearance
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: METADATA.siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Projects',
        item: `${METADATA.siteUrl}/projects`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: project.name,
        item: projectUrl,
      },
    ],
  };

  const accentG1 = project.gradient?.[0] ?? '#c8860a';
  const accentG2 = project.gradient?.[1] ?? '#5c3d00';
  const pageAccentStyle = { '--p-g1': accentG1, '--p-g2': accentG2 };

  return (
    <>
      <Meta
        title={projectTitle}
        description={projectDescription}
        image={projectImage}
        url={projectUrl}
        type="website"
      />

      {/* Project Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Header>
        <Menu />
      </Header>
      <ProgressIndicator />
      <Cursor isDesktop={isDesktop} />
      <main className={styles.page} style={pageAccentStyle}>
        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.heroBg}>
            {/* eslint-disable-next-line @next/next/no-img-element -- static /public hero; native img avoids fill/layout issues */}
            <img
              src={project.heroSection}
              alt=""
              className={styles.heroImg}
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
            <div className={styles.heroTint} />
            <div className={styles.heroVignette} />
            <div className={styles.heroNoise} aria-hidden />
            <div className={styles.heroGrid} aria-hidden />
          </div>

          <div className={styles.heroContent}>
            {project.category ? (
              <p className={styles.categoryPill}>{project.category}</p>
            ) : null}
            <h1 ref={heroTitleRef} className={styles.heroTitle}>
              {project.name}
            </h1>
            <p ref={heroDescRef} className={styles.heroDesc}>
              {project.description}
            </p>
            <div ref={heroButtonRef} className={styles.heroActions}>
              <motion.a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnPrimary}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Visit live site
              </motion.a>
              {project.caseStudy ? (
                <a href="#case-study" className={styles.btnGhost}>
                  Read case study
                </a>
              ) : null}
            </div>
          </div>
        </section>

        {/* Case study */}
        {project.caseStudy && (
          <section
            id="case-study"
            className={`${styles.section} ${styles.sectionMuted} ${styles.caseStudySection}`}
          >
            <div className={styles.sectionInner}>
              <div ref={caseStudyTitleRef} className={styles.sectionHeadCenter}>
                <p className={styles.overline}>Case study</p>
                <h2 className={styles.headline}>Problem, solution, impact</h2>
                <p className={styles.subheadCenter}>
                  A concise narrative of the challenge, what shipped, and the
                  outcome.
                </p>
              </div>

              <div ref={caseStudyCardsRef} className={styles.caseGrid}>
                <article className={styles.caseCard}>
                  <p className={styles.caseStep}>01 — Problem</p>
                  <h3 className={styles.caseCardTitle}>The challenge</h3>
                  <p className={styles.caseCardBody}>
                    {project.caseStudy.problem}
                  </p>
                </article>
                <article className={styles.caseCard}>
                  <p className={styles.caseStep}>02 — Solution</p>
                  <h3 className={styles.caseCardTitle}>What we built</h3>
                  <p className={styles.caseCardBody}>
                    {project.caseStudy.solution}
                  </p>
                </article>
                <article className={styles.caseCard}>
                  <p className={styles.caseStep}>03 — Impact</p>
                  <h3 className={styles.caseCardTitle}>Results</h3>
                  <p className={styles.caseCardBody}>
                    {project.caseStudy.impact}
                  </p>
                </article>
              </div>

              {project.caseStudy.metrics &&
                project.caseStudy.metrics.length > 0 && (
                  <div ref={metricsRef}>
                    <h3 className={styles.metricsTitle}>At a glance</h3>
                    <div className={styles.metricsGrid}>
                      {project.caseStudy.metrics.map((metric, idx) => (
                        <div
                          key={`${metric.label}-${idx}`}
                          className={`${styles.metricCell} metric-item`}
                        >
                          <div className={styles.metricValue}>
                            {metric.value}
                          </div>
                          <div className={styles.metricLabel}>{metric.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          </section>
        )}

        {/* Overview + tech */}
        <section className={`${styles.section} ${styles.sectionDark}`}>
          <div className={styles.sectionInner}>
            <div ref={projectDetailsRef} className={styles.overviewGrid}>
              <div className={styles.imageFrame}>
                <div className={styles.imageFrameInner}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.image}
                    alt={project.name}
                    className={styles.coverImg}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>

              <div>
                <p className={styles.overline}>Overview</p>
                <h2 className={styles.headline}>Project snapshot</h2>
                <p className={`${styles.bodyProse} mb-8`}>{project.description}</p>

                <h3 className="text-base font-semibold tracking-tight text-white mb-3">
                  Stack
                </h3>
                <div className={`${styles.techGrid} mb-8`}>
                  {project.tech?.map((tech, idx) => (
                    <motion.span
                      key={tech}
                      className={styles.techChip}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: idx * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <Image
                        src={`/projects/tech/${tech}.svg`}
                        alt=""
                        width={20}
                        height={20}
                        unoptimized
                      />
                      <span className="capitalize">{formatTechLabel(tech)}</span>
                    </motion.span>
                  ))}
                </div>

                <motion.a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.btnPrimary} ${styles.btnBlock}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Open live website
                </motion.a>
              </div>
            </div>
          </div>
        </section>

        {/* Meta grid */}
        <section className={`${styles.section} ${styles.sectionMuted}`}>
          <div className={styles.sectionInner}>
            <div className={styles.sectionHeadCenter}>
              <p className={styles.overline}>Details</p>
              <h2 className={styles.headline}>Engagement</h2>
              <p className={styles.subheadCenter}>
                Client context, scope, and where to see it live.
              </p>
            </div>

            <div ref={projectInfoGridRef} className={styles.infoGrid}>
              <div className={styles.infoCard}>
                <h3 className={styles.infoCardTitle}>Client</h3>
                <p className={styles.infoCardBody}>
                  {project.client || project.name}
                </p>
              </div>
              <div className={styles.infoCard}>
                <h3 className={styles.infoCardTitle}>Services</h3>
                <ul className={styles.infoList}>
                  {(project.services || [
                    'Web Development',
                    'UI/UX Design',
                    'Frontend Development',
                    'Responsive Design',
                  ]).map((service, idx) => (
                    <li key={idx}>{service}</li>
                  ))}
                </ul>
              </div>
              <div className={styles.infoCard}>
                <h3 className={styles.infoCardTitle}>Live URL</h3>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.infoLink}
                >
                  {project.url.replace(/^https?:\/\//, '')}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Delivery narrative */}
        <section className={`${styles.section} ${styles.sectionDark}`}>
          <div className={styles.sectionInner}>
            <div className={styles.sectionHeadCenter}>
              <p className={styles.overline}>Delivery</p>
              <h2 className={styles.headline}>How it came together</h2>
              <p className={styles.subheadCenter}>
                Process, quality bar, and what this build demonstrates.
              </p>
            </div>

            <div ref={workExpRef} className={styles.splitSection}>
              <div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Development approach
                </h3>
                <p className={`${styles.bodyProse} mb-4`}>
                  Building {project.name} meant aligning product goals with a
                  maintainable architecture—clear information hierarchy,
                  performant delivery, and interfaces that stay coherent across
                  devices.
                </p>
                <p className={`${styles.bodyProse} mb-8`}>
                  The result is a production-ready experience that reflects
                  modern standards for accessibility, performance, and long-term
                  maintainability.
                </p>
                <h3 className="text-xl font-bold text-white mb-4">
                  Quality checklist
                </h3>
                <ul className={styles.featureList}>
                  {[
                    'Responsive layouts across breakpoints',
                    'UI aligned with brand and content goals',
                    'Performance-conscious implementation',
                    'Cross-browser compatible experience',
                    'SEO-aware structure where applicable',
                  ].map(line => (
                    <li key={line}>
                      <span className={styles.checkIcon} aria-hidden />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.imageFrame}>
                <div className={styles.imageFrameInner}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.heroSection}
                    alt=""
                    className={styles.coverImg}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className={`${styles.section} ${styles.sectionMuted}`}>
          <div className={styles.sectionInner}>
            <div className={styles.sectionHeadCenter}>
              <p className={styles.overline}>Scope</p>
              <h2 className={styles.headline}>Services in this project</h2>
            </div>
            <div ref={servicesRef} className={styles.servicesGrid}>
              {(
                project.services || [
                  'Web Development',
                  'UI/UX Design',
                  'Frontend Development',
                  'Responsive Design',
                ]
              ).map(service => (
                <div key={service} className={styles.serviceCell}>
                  {service}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Nav footer */}
        <section className={styles.navFooter}>
          <div ref={navigationRef} className={styles.navFooterInner}>
            <h2 className={styles.navTitle}>Continue exploring</h2>
            <div className={styles.navButtons}>
              <Link href="/" className={styles.btnPrimary}>
                Back home
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
