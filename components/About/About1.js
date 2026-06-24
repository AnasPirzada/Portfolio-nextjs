import { m, useReducedMotion } from 'framer-motion';

/**
 * About — an attractive, motion-led intro.
 *
 * The display heading rises out of a clipping mask line-by-line (premium reveal),
 * the kicker and bio stagger in beneath it. No legacy `.about-*` classes (those
 * carried a transparent text-fill that made copy invisible). Respects reduced motion.
 */
const EASE = [0.22, 1, 0.36, 1];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

// Heading lines rise from behind an overflow-hidden mask.
const rise = {
  hidden: { y: '115%' },
  visible: { y: 0, transition: { duration: 0.85, ease: EASE } },
};

const fade = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const About1 = () => {
  const reduce = useReducedMotion();
  const viewport = { once: true, margin: '-80px', amount: 0.3 };

  return (
    <section className="w-full relative select-none -mt-6 md:mt-0">
      <div className="pt-12 pb-10 md:pt-20 md:pb-16 lg:pt-24 lg:pb-20 section-container">
        <m.div
          initial={reduce ? false : 'hidden'}
          whileInView={reduce ? undefined : 'visible'}
          viewport={viewport}
          variants={container}
          className="max-w-[68rem] mx-auto"
        >
          {/* Kicker */}
          <m.div
            variants={fade}
            className="mb-7 flex items-center gap-3 md:mb-9"
          >
            <span className="h-px w-10 bg-accent-light/70" aria-hidden />
            <span className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase text-accent-light">
              About
            </span>
          </m.div>

          {/* Display heading — masked line reveal */}
          <h2 className="font-display font-semibold tracking-tight text-white text-balance leading-[1.05] text-[2rem] sm:text-5xl lg:text-[4rem] lg:leading-[1.04]">
            <span className="block overflow-hidden pb-[0.12em]">
              <m.span variants={rise} className="block">
                I build polished products
              </m.span>
            </span>
            <span className="block overflow-hidden pb-[0.12em]">
              <m.span variants={rise} className="block">
                that feel{' '}
                <span className="text-accent-light">effortless</span>.
              </m.span>
            </span>
          </h2>

          {/* Bio */}
          <div className="mt-8 grid gap-5 md:mt-11 md:max-w-3xl">
            <m.p
              variants={fade}
              className="text-lg leading-relaxed text-gray-light-3 sm:text-xl md:text-2xl md:leading-relaxed"
            >
              I&apos;m a{' '}
              <span className="font-medium text-accent-light">
                Full&nbsp;Stack Developer
              </span>{' '}
              and{' '}
              <span className="font-medium text-accent-light">AI&nbsp;Expert</span>{' '}
              focused on scalable, performant applications — with{' '}
              <span className="font-medium text-accent-light">5+ years</span>{' '}
              turning ideas into shipped products.
            </m.p>
            <m.p
              variants={fade}
              className="text-base leading-relaxed text-gray-light-4 dark:text-gray-light-3 sm:text-lg md:text-xl md:leading-relaxed"
            >
              I work across <span className="text-accent-light">React.js</span>{' '}
              and Next.js on the frontend, <span className="text-accent-light">API</span>{' '}
              and <span className="text-accent-light">Machine&nbsp;Learning</span>{' '}
              integration on the backend, with Django and Laravel — and I sweat
              the design details that make software feel right.
            </m.p>
          </div>
        </m.div>
      </div>
    </section>
  );
};

export default About1;
