/* eslint-disable @next/next/no-img-element */
import {
  FOOTER_CINEMATIC_CSS,
  MagneticButton,
} from '@/components/ui/motion-footer';
import { CALENDLY_URL } from '@/constants';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Howl } from 'howler';
import { useEffect, useRef, useState } from 'react';
import { MENULINKS, SOCIAL_LINKS } from '../../constants';
import Icon from '../Icons/icon';

gsap.registerPlugin(ScrollTrigger);

const MAIL_HREF = 'mailto:anaspirzadaiub@gmail.com';

const scrollToTop = () => {
  if (typeof window === 'undefined') return;
  const lenis = window.lenis;
  if (lenis && typeof lenis.scrollTo === 'function') {
    lenis.scrollTo(0, { immediate: false });
    return;
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const MarqueeStrip = () => (
  <div className="flex w-max animate-footer-scroll-marquee text-[10px] md:text-xs font-bold tracking-[0.28em] uppercase text-gray-500 dark:text-gray-500">
    <div className="flex items-center gap-10 px-8 shrink-0">
      <span>Full Stack</span>
      <span className="text-accent-light/70">✦</span>
      <span>React & Next.js</span>
      <span className="text-accent-dark/70">✦</span>
      <span>AI Integration</span>
      <span className="text-accent-light/70">✦</span>
      <span>TypeScript</span>
      <span className="text-accent-dark/70">✦</span>
      <span>Open to collaborate</span>
      <span className="text-accent-light/70">✦</span>
      <span>Laravel & Django</span>
      <span className="text-accent-dark/70">✦</span>
    </div>
    <div className="flex items-center gap-10 px-8 shrink-0" aria-hidden="true">
      <span>Full Stack</span>
      <span className="text-accent-light/70">✦</span>
      <span>React & Next.js</span>
      <span className="text-accent-dark/70">✦</span>
      <span>AI Integration</span>
      <span className="text-accent-light/70">✦</span>
      <span>TypeScript</span>
      <span className="text-accent-dark/70">✦</span>
      <span>Open to collaborate</span>
      <span className="text-accent-light/70">✦</span>
      <span>Laravel & Django</span>
      <span className="text-accent-dark/70">✦</span>
    </div>
  </div>
);

const SocialCard = ({ title, subtitle, href, iconName, index }) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="w-full p-5 rounded-xl border border-gray-800/80 relative overflow-hidden group bg-gray-900/35 dark:bg-gray-900/40 backdrop-blur-sm hover:border-accent-light/45 hover:shadow-lg hover:shadow-accent-light/10 transition-all duration-300 link min-h-[130px]"
      aria-label={title}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-accent-light to-accent-dark translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300 opacity-10" />
      <div className="absolute z-0 -top-6 -right-6 opacity-10 group-hover:opacity-20 group-hover:rotate-12 transition-all duration-300">
        <div className="w-24 h-24 text-gray-800 group-hover:text-accent-light/20 [&>svg]:w-full [&>svg]:h-full">
          <Icon name={iconName} />
        </div>
      </div>
      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-3 text-accent-light group-hover:text-white transition-colors duration-300 w-6 h-6">
          <Icon name={iconName} />
        </div>
        <h3 className="font-semibold text-sm text-white group-hover:text-white transition-colors duration-300 mb-1">
          {title}
        </h3>
        <p className="text-xs text-gray-500 group-hover:text-accent-light/90 transition-colors duration-300 mt-auto">
          {subtitle}
        </p>
      </div>
    </motion.a>
  );
};

const Footer = () => {
  const [playbackRate, setPlaybackRate] = useState(0.75);
  const [email, setEmail] = useState('');
  const footerRef = useRef(null);
  const giantTextRef = useRef(null);

  const heartClickSound = new Howl({
    src: ['/sounds/glug-a.mp3'],
    rate: playbackRate,
    volume: 0.5,
  });

  const handleHeartClick = () => {
    setPlaybackRate(rate => rate + 0.1);
    heartClickSound.play();
  };

  const handleSubscribe = e => {
    e.preventDefault();
    setEmail('');
  };

  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', ref: MENULINKS[0].ref },
    { name: 'Skills', ref: MENULINKS[1].ref },
    { name: 'Projects', ref: MENULINKS[2].ref },
    { name: 'Education', ref: MENULINKS[3].ref },
    { name: 'Work', ref: MENULINKS[4].ref },
    { name: 'Contact', ref: MENULINKS[6].ref },
  ];

  const services = [
    'Web Development',
    'UI/UX Design',
    'API Development',
    'Full Stack Solutions',
    'AI Integration',
  ];

  const socialCardsData = {
    mail: { title: 'Email', subtitle: 'Send a message' },
    linkedin: { title: 'LinkedIn', subtitle: 'Professional network' },
    github: { title: 'GitHub', subtitle: 'View my code' },
    instagram: { title: 'Instagram', subtitle: 'Follow my journey' },
    upwork: { title: 'Upwork', subtitle: 'Hire me' },
    fiverr: { title: 'Fiverr', subtitle: 'Hire me' },
  };

  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      !footerRef.current ||
      !giantTextRef.current
    )
      return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        giantTextRef.current,
        { y: '8vh', scale: 0.92, opacity: 0.35 },
        {
          y: '0vh',
          scale: 1,
          opacity: 1,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            end: 'bottom bottom',
            scrub: 1,
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="cinematic-footer-scope relative w-full select-none overflow-hidden bg-gradient-to-b from-neutral-50 via-white to-neutral-100 dark:from-black dark:via-gray-950 dark:to-black"
    >
      <style dangerouslySetInnerHTML={{ __html: FOOTER_CINEMATIC_CSS }} />

      <div className="footer-aurora pointer-events-none absolute left-1/2 top-[38%] z-0 h-[55vh] w-[min(90vw,56rem)] -translate-x-1/2 -translate-y-1/2 animate-footer-breathe rounded-[50%] blur-[90px] opacity-90" />
      <div className="footer-bg-grid pointer-events-none absolute inset-0 z-0" />

      <div
        ref={giantTextRef}
        className="footer-giant-bg-text pointer-events-none absolute -bottom-[4vh] left-1/2 z-0 w-full -translate-x-1/2 whitespace-nowrap text-center select-none"
        aria-hidden="true"
      >
        CREATE
      </div>

      <div className="relative z-10 w-full overflow-hidden border-y border-black/5 bg-white/70 py-3 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-black/50 -rotate-1 scale-[1.02] dark:shadow-black/40">
        <MarqueeStrip />
      </div>

      <div className="relative z-10 section-container pt-14 pb-10 md:pt-20 md:pb-14">
        <div className="mb-12 flex flex-col items-center text-center md:mb-16">
          <h2 className="footer-text-glow mb-3 text-4xl font-black tracking-tight md:text-5xl lg:text-6xl xl:text-6xl">
            Ready to build?
          </h2>
          <p className="mb-8 max-w-lg text-sm text-gray-600 dark:text-gray-400 md:text-base">
            Book a call or send a message — I&apos;ll get back as soon as I can.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <MagneticButton
              as="a"
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-glass-pill inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-bold text-gray-900 dark:text-white md:px-10 md:py-5 md:text-base"
            >
              <span className="text-accent-light">◆</span>
              Book a call
            </MagneticButton>
            <MagneticButton
              as="a"
              href={MAIL_HREF}
              className="footer-glass-pill inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-bold text-gray-900 dark:text-white md:px-10 md:py-5 md:text-base"
            >
              <span className="text-accent-light">✉</span>
              Email me
            </MagneticButton>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55 }}
          className="mb-14 grid grid-cols-2 gap-x-6 gap-y-12 md:gap-12 lg:grid-cols-4 lg:gap-14"
        >
          <div className="col-span-2 space-y-5 md:col-span-1">
            <h3 className="bg-gradient-to-r from-accent-light via-accent-dark to-accent-light bg-clip-text text-2xl font-bold text-transparent">
              Anas Pirzada
            </h3>
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              Full Stack Developer & AI Integration Specialist crafting
              innovative digital experiences with cutting-edge technologies.
            </p>
            <div className="flex items-center gap-2 pt-2 text-xs text-gray-500">
              <motion.span
                className="h-2 w-2 rounded-full bg-emerald-500"
                animate={{ opacity: [1, 0.35, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span>Available for freelance work</span>
            </div>
          </div>

          <div className="space-y-5">
            <h4 className="text-lg font-semibold tracking-wide text-gray-900 dark:text-white">
              Navigation
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.ref}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                >
                  <a
                    href={`#${link.ref}`}
                    className="group inline-flex items-center gap-2 text-sm text-gray-600 transition-all duration-300 hover:text-accent-light dark:text-gray-400"
                  >
                    <span className="h-0.5 w-0 bg-gradient-to-r from-accent-light to-accent-dark transition-all duration-300 group-hover:w-5" />
                    <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                      {link.name}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="space-y-5">
            <h4 className="text-lg font-semibold tracking-wide text-gray-900 dark:text-white">
              Services
            </h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <motion.li
                  key={service}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className="group flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                >
                  <span className="text-accent-light transition-transform duration-300 group-hover:scale-110">
                    ▹
                  </span>
                  <span className="transition-colors duration-300 group-hover:text-gray-800 dark:group-hover:text-gray-200">
                    {service}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 space-y-5 md:col-span-1">
            <h4 className="text-lg font-semibold tracking-wide text-gray-900 dark:text-white">
              Newsletter
            </h4>
            <p className="text-xs leading-relaxed text-gray-600 dark:text-gray-400">
              Get the latest updates on projects, articles, and tech insights
              delivered to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3 pt-1">
              <motion.div
                whileFocus={{ scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 320 }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="link w-full rounded-lg border border-gray-300 bg-white/80 px-4 py-3 text-sm text-gray-900 placeholder-gray-500 backdrop-blur-sm transition-all duration-300 focus:border-accent-light focus:outline-none focus:ring-2 focus:ring-accent-light/25 dark:border-gray-800 dark:bg-gray-900/50 dark:text-white dark:placeholder-gray-600"
                  required
                />
              </motion.div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="link w-full rounded-lg bg-gradient-to-r from-accent-light to-accent-dark px-4 py-3 text-sm font-semibold text-black shadow-md transition-all duration-300 hover:shadow-lg hover:shadow-accent-light/25"
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex flex-col items-center gap-8">
            <h5 className="text-lg font-semibold tracking-wide text-gray-900 dark:text-white">
              Connect With Me
            </h5>
            <div className="grid w-full max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6">
              {SOCIAL_LINKS.map((social, index) => {
                const cardData = socialCardsData[social.name] || {
                  title: social.name,
                  subtitle: 'Connect',
                };
                return (
                  <SocialCard
                    key={social.name}
                    title={cardData.title}
                    subtitle={cardData.subtitle}
                    href={
                      social.name === 'mail' ? MAIL_HREF : social.url.trim()
                    }
                    iconName={social.name}
                    index={index}
                  />
                );
              })}
            </div>
          </div>
        </motion.div>

        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-800" />

        <div className="relative mt-10 flex flex-col items-center justify-between gap-8 pb-4 md:flex-row md:pb-6">
          <p className="order-2 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500 md:order-1 md:text-left md:text-xs">
            © {currentYear}{' '}
            <span className="bg-gradient-to-r from-accent-light to-accent-dark bg-clip-text font-bold text-transparent">
              Anas Pirzada
            </span>
            . All rights reserved.
          </p>

          <button
            type="button"
            onClick={handleHeartClick}
            className="footer-glass-pill order-1 flex cursor-pointer items-center gap-2 rounded-full border border-black/5 px-5 py-2.5 md:order-2 dark:border-white/10"
            aria-label="Play heart sound"
          >
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
              Crafted with
            </span>
            <span className="animate-footer-heartbeat text-base text-accent-light">
              ❤
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
              in Next.js
            </span>
          </button>

          <MagneticButton
            as="button"
            type="button"
            onClick={scrollToTop}
            className="footer-glass-pill group order-3 flex h-12 w-12 items-center justify-center rounded-full text-gray-600 hover:text-accent-light dark:text-gray-400"
            aria-label="Back to top"
          >
            <svg
              className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </MagneticButton>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
