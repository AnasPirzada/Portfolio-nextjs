/* eslint-disable @next/next/no-img-element */
import { motion } from 'framer-motion';
import { Howl } from 'howler';
import { useState } from 'react';
import { MENULINKS, SOCIAL_LINKS } from '../../constants';
import Icon from '../Icons/icon';

// Social Card Component
const SocialCard = ({ title, subtitle, href, iconName, index }) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="w-full p-5 rounded-xl border border-gray-800 relative overflow-hidden group bg-gray-900/40 backdrop-blur-sm hover:border-[#efc041]/50 hover:shadow-lg hover:shadow-[#efc041]/10 transition-all duration-300 link min-h-[130px]"
      aria-label={title}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#efc041] to-[#eeba2c] translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300 opacity-10" />

      {/* Large background icon */}
      <div className="absolute z-0 -top-6 -right-6 opacity-10 group-hover:opacity-20 group-hover:rotate-12 transition-all duration-300">
        <div className="w-24 h-24 text-gray-800 group-hover:text-[#efc041]/20 [&>svg]:w-full [&>svg]:h-full">
          <Icon name={iconName} />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-3 text-[#efc041] group-hover:text-white transition-colors duration-300 w-6 h-6">
          <Icon name={iconName} />
        </div>
        <h3 className="font-semibold text-sm text-white group-hover:text-white transition-colors duration-300 mb-1">
          {title}
        </h3>
        <p className="text-xs text-gray-500 group-hover:text-[#efc041]/90 transition-colors duration-300 mt-auto">
          {subtitle}
        </p>
      </div>
    </motion.a>
  );
};

const Footer = () => {
  const [playbackRate, setPlaybackRate] = useState(0.75);
  const [email, setEmail] = useState('');

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
    // Add newsletter subscription logic here
    console.log('Subscribed:', email);
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

  // Social links with display information
  const socialCardsData = {
    mail: { title: 'Email', subtitle: 'Send a message' },
    linkedin: { title: 'LinkedIn', subtitle: 'Professional network' },
    github: { title: 'GitHub', subtitle: 'View my code' },
    instagram: { title: 'Instagram', subtitle: 'Follow my journey' },
    upwork: { title: 'Upwork', subtitle: 'Hire me' },
    fiverr: { title: 'Fiverr', subtitle: 'Hire me' },
  };

  return (
    <footer className="w-full relative select-none bg-gradient-to-b from-black via-gray-950 to-black overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated Gradient Orbs */}
        <motion.div
          className="absolute -top-40 -left-40 w-80 h-80 bg-[#efc041] rounded-full mix-blend-screen opacity-5 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#eeba2c] rounded-full mix-blend-screen opacity-5 blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, -60, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Grid Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(239, 192, 65, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(239, 192, 65, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <style jsx>{`
        @keyframes beat {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.15);
          }
        }
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
        .shimmer-effect {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(239, 192, 65, 0.1),
            transparent
          );
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
        }
      `}</style>

      <div className="relative z-10">
        {/* Elegant Top Border */}
        <div className="relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#efc041]/30 to-transparent"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-[#efc041]"></div>
        </div>

        {/* Main Footer Content */}
        <div className="section-container pt-20 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16"
          >
            {/* Column 1 - Brand & About */}
            <div className="space-y-5 lg:col-span-1">
              <motion.h3
                className="text-3xl font-bold bg-gradient-to-r from-[#efc041] via-[#eeba2c] to-[#efc041] bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                Anas Pirzada
              </motion.h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                Full Stack Developer & AI Integration Specialist crafting
                innovative digital experiences with cutting-edge technologies.
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-500 pt-2">
                <motion.span
                  className="w-2 h-2 bg-green-500 rounded-full"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span>Available for freelance work</span>
              </div>
            </div>

            {/* Column 2 - Quick Links */}
            <div className="space-y-5">
              <h4 className="text-lg font-semibold text-white tracking-wide">
                Navigation
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.li
                    key={link.ref}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <a
                      href={`#${link.ref}`}
                      className="text-gray-400 hover:text-[#efc041] transition-all duration-300 inline-flex items-center gap-2 group link text-sm"
                    >
                      <span className="w-0 h-0.5 bg-gradient-to-r from-[#efc041] to-[#eeba2c] group-hover:w-6 transition-all duration-300"></span>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {link.name}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Column 3 - Services */}
            <div className="space-y-5">
              <h4 className="text-lg font-semibold text-white tracking-wide">
                Services
              </h4>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <motion.li
                    key={service}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="text-gray-400 flex items-center gap-2 text-sm group"
                  >
                    <span className="text-[#efc041] group-hover:scale-125 transition-transform duration-300">
                      ▹
                    </span>
                    <span className="group-hover:text-gray-300 transition-colors duration-300">
                      {service}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Column 4 - Newsletter */}
            <div className="space-y-5">
              <h4 className="text-lg font-semibold text-white tracking-wide">
                Newsletter
              </h4>
              <p className="text-gray-400 text-xs leading-relaxed">
                Get the latest updates on projects, articles, and tech insights
                delivered to your inbox.
              </p>
              <form onSubmit={handleSubscribe} className="space-y-3 pt-2">
                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-3 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#efc041] focus:ring-2 focus:ring-[#efc041]/20 transition-all duration-300 link"
                    required
                  />
                </motion.div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-4 py-3 bg-gradient-to-r from-[#efc041] to-[#eeba2c] text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-[#efc041]/30 transition-all duration-300 link text-sm"
                >
                  Subscribe
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Social Links Section - Card Design */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12"
          >
            <div className="flex flex-col items-center gap-8">
              <h5 className="text-lg font-semibold text-white tracking-wide">
                Connect With Me
              </h5>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4 w-full max-w-5xl">
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
                      href={social.url}
                      iconName={social.name}
                      index={index}
                    />
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent mb-8"></div>

          {/* Bottom Section - Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative"
          >
            {/* Decorative Background Glow */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-px bg-gradient-to-r from-transparent via-[#efc041]/20 to-transparent"></div>
            </div>

            <div className="relative flex flex-col items-center justify-center gap-4 py-6">
              {/* Main Copyright Text with Staggered Animation */}
              <div className="flex items-center gap-2 flex-wrap justify-center">
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-gray-500 text-sm"
                >
                  ©
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-gray-400 text-sm font-medium"
                >
                  {currentYear}
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  whileHover={{ scale: 1.1 }}
                  className="text-[#efc041] text-sm font-bold bg-gradient-to-r from-[#efc041] to-[#eeba2c] bg-clip-text text-transparent"
                >
                  Anas Pirzada
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="text-gray-500 text-sm"
                >
                  •
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="text-gray-500 text-xs uppercase tracking-wider"
                >
                  All rights reserved
                </motion.span>
              </div>

              {/* Animated Underline */}
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.8, ease: 'easeOut' }}
                className="h-px bg-gradient-to-r from-transparent via-[#efc041]/30 to-transparent max-w-xs"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
