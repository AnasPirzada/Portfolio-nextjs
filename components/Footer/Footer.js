/* eslint-disable @next/next/no-img-element */
import { Howl } from 'howler';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { MENULINKS } from '../../constants';

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

  const handleSubscribe = (e) => {
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
    { name: 'Experience', ref: MENULINKS[3].ref },
    { name: 'Contact', ref: MENULINKS[6].ref },
  ];

  const services = [
    'Web Development',
    'UI/UX Design',
    'API Development',
    'Full Stack Solutions',
    'AI Integration',
  ];

  const socialLinks = [
    { 
      name: 'GitHub', 
      url: 'https://github.com/AnasPirzada',
      icon: (
        <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
          <path fillRule='evenodd' d='M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z' clipRule='evenodd' />
        </svg>
      )
    },
    { 
      name: 'LinkedIn', 
      url: 'https://linkedin.com/in/anas-pirzada',
      icon: (
        <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
          <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'/>
        </svg>
      )
    },
    { 
      name: 'Twitter', 
      url: 'https://twitter.com/Anas_Pirzada1',
      icon: (
        <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
          <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z'/>
        </svg>
      )
    },
    { 
      name: 'Instagram', 
      url: 'https://instagram.com/anas.pirzada',
      icon: (
        <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
          <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z'/>
        </svg>
      )
    },
  ];

  return (
    <footer className='w-full relative select-none bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden'>
      {/* Decorative Background Elements */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        {/* Glowing Blobs */}
        <div className='absolute top-0 left-0 w-96 h-96 bg-[#efc041] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob'></div>
        <div className='absolute top-0 right-0 w-96 h-96 bg-[#eeba2c] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000'></div>
        <div className='absolute bottom-0 left-1/2 w-96 h-96 bg-[#efc041] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000'></div>
        
        {/* Yellow Geometric Shapes */}
        {/* Top Left Circle */}
        <div className='absolute top-20 left-10 w-32 h-32 border-4 border-[#efc041] rounded-full opacity-20 animate-spin-slow'></div>
        
        {/* Top Right Triangle */}
        <div className='absolute top-32 right-20 w-0 h-0 border-l-[50px] border-l-transparent border-r-[50px] border-r-transparent border-b-[80px] border-b-[#eeba2c] opacity-15 animate-float'></div>
        
        {/* Middle Left Square */}
        <div className='absolute top-1/2 left-20 w-24 h-24 border-4 border-[#efc041] rotate-45 opacity-20 animate-pulse-slow'></div>
        
        {/* Middle Right Hexagon */}
        <div className='absolute top-1/3 right-32'>
          <svg width='80' height='80' viewBox='0 0 100 100' className='opacity-15 animate-spin-slow'>
            <polygon points='50,10 90,30 90,70 50,90 10,70 10,30' fill='none' stroke='#efc041' strokeWidth='4'/>
          </svg>
        </div>
        
        {/* Bottom Left Small Circles */}
        <div className='absolute bottom-40 left-32 w-16 h-16 border-2 border-[#eeba2c] rounded-full opacity-25'></div>
        <div className='absolute bottom-52 left-16 w-12 h-12 border-2 border-[#efc041] rounded-full opacity-20'></div>
        
        {/* Bottom Right Dotted Circle */}
        <div className='absolute bottom-32 right-16 w-40 h-40 border-4 border-dashed border-[#efc041] rounded-full opacity-20 animate-spin-slow'></div>
        
        {/* Floating Stars */}
        <div className='absolute top-1/4 left-1/4'>
          <svg width='40' height='40' viewBox='0 0 51 48' className='opacity-30 animate-pulse-slow'>
            <path d='M25.5 0L31.5 17.5H50L35.25 28L41 48L25.5 37L10 48L15.75 28L1 17.5H19.5L25.5 0Z' fill='#efc041'/>
          </svg>
        </div>
        <div className='absolute top-2/3 right-1/4'>
          <svg width='30' height='30' viewBox='0 0 51 48' className='opacity-25 animate-pulse-slow animation-delay-2000'>
            <path d='M25.5 0L31.5 17.5H50L35.25 28L41 48L25.5 37L10 48L15.75 28L1 17.5H19.5L25.5 0Z' fill='#eeba2c'/>
          </svg>
        </div>
        
        {/* Plus Signs */}
        <div className='absolute top-1/2 right-1/3 text-[#efc041] text-4xl font-bold opacity-20 animate-spin-slow'>+</div>
        <div className='absolute bottom-1/4 left-1/3 text-[#eeba2c] text-3xl font-bold opacity-15 animate-spin-slow animation-delay-2000'>+</div>
      </div>

      <style jsx>{`
        @keyframes beat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.05); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>

      <div className='relative z-10'>
        {/* Top Wave */}
        <div className='absolute top-0 left-0 right-0'>
          <svg viewBox='0 0 1440 120' fill='none' xmlns='http://www.w3.org/2000/svg' className='w-full h-auto'>
            <path d='M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z' fill='url(#gradient)' />
            <defs>
              <linearGradient id='gradient' x1='0' y1='0' x2='1440' y2='0'>
                <stop offset='0%' stopColor='#efc041' stopOpacity='0.2' />
                <stop offset='50%' stopColor='#eeba2c' stopOpacity='0.3' />
                <stop offset='100%' stopColor='#efc041' stopOpacity='0.2' />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Main Footer Content */}
      <motion.div
          initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='section-container pt-32 pb-12'
        >
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16'>
            {/* Column 1 - About */}
            <div className='space-y-6'>
              <h3 className='text-2xl font-bold text-gradient'>Anas Pirzada</h3>
              <p className='text-gray-400 leading-relaxed'>
                Full Stack Developer & AI Integration Specialist crafting innovative web solutions with modern technologies.
              </p>
              <div className='flex items-center gap-2 text-sm text-gray-500'>
                <span className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></span>
                Available for freelance work
              </div>
            </div>

            {/* Column 2 - Quick Links */}
            <div className='space-y-6'>
              <h4 className='text-xl font-semibold text-white'>Quick Links</h4>
              <ul className='space-y-3'>
                {quickLinks.map((link) => (
                  <li key={link.ref}>
                    <a
                      href={`#${link.ref}`}
                      className='text-gray-400 hover:text-[#efc041] transition-colors duration-300 inline-flex items-center gap-2 group link'
                    >
                      <span className='w-0 group-hover:w-4 h-0.5 bg-[#efc041] transition-all duration-300'></span>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 - Services */}
            <div className='space-y-6'>
              <h4 className='text-xl font-semibold text-white'>Services</h4>
              <ul className='space-y-3'>
                {services.map((service) => (
                  <li key={service} className='text-gray-400 flex items-center gap-2'>
                    <span className='text-[#efc041]'>▹</span>
                    {service}
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4 - Newsletter */}
            <div className='space-y-6'>
              <h4 className='text-xl font-semibold text-white'>Stay Updated</h4>
              <p className='text-gray-400 text-sm'>
                Subscribe to get latest updates and articles.
              </p>
              <form onSubmit={handleSubscribe} className='space-y-3'>
                <input
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Enter your email'
                  className='w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#efc041] transition-colors link'
                  required
                />
                <button
                  type='submit'
                  className='w-full px-4 py-3 bg-gradient-to-r from-[#efc041] to-[#eeba2c] text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-[#efc041]/50 transition-all duration-300 link'
                >
                  Subscribe
                </button>
              </form>
            </div>
            </div>

          {/* Divider */}
          <div className='h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-8'></div>

          {/* Bottom Section */}
          <div className='flex flex-col md:flex-row justify-between items-center gap-6'>
            {/* Social Links */}
            <div className='flex items-center gap-4'>
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='w-12 h-12 rounded-full bg-gray-800/50 border border-gray-700 flex items-center justify-center hover:border-[#efc041] hover:bg-[#efc041]/10 transition-all duration-300 group link text-gray-400 hover:text-[#efc041]'
                  title={social.name}
                >
                  <span className='group-hover:scale-110 transition-transform'>
                    {social.icon}
                  </span>
                </a>
              ))}
            </div>

            {/* Copyright */}
            <div className='text-center md:text-right'>
              <p className='text-gray-400 text-sm flex items-center justify-center md:justify-end gap-2 flex-wrap'>
                <span>© {currentYear} Anas Pirzada. All rights reserved.</span>
                <span className='hidden md:inline'>•</span>
                <span className='flex items-center gap-1'>
                  Crafted with
                  <button onClick={handleHeartClick} className='link inline-flex'>
                <span
                  style={{
                    display: 'inline-block',
                    animation: 'beat 1s ease-in-out infinite',
                  }}
                >
                      ❤️
                    </span>
                  </button>
                </span>
            </p>
          </div>
        </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='mt-12 text-center'
          >
            <div className='inline-block p-8 rounded-2xl bg-gradient-to-r from-[#efc041]/10 to-[#eeba2c]/10 border border-[#efc041]/20'>
              <h3 className='text-2xl md:text-3xl font-bold text-white mb-4'>
                Let&apos;s Build Something Amazing Together
              </h3>
              <p className='text-gray-400 mb-6 max-w-2xl mx-auto'>
                Have a project in mind? Let&apos;s discuss how we can bring your ideas to life.
              </p>
              <a
                href='#contact'
                className='inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#efc041] to-[#eeba2c] text-black font-bold rounded-lg hover:shadow-lg hover:shadow-[#efc041]/50 transition-all duration-300 link'
              >
                <span>Get In Touch</span>
                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 8l4 4m0 0l-4 4m4-4H3' />
                </svg>
              </a>
            </div>
          </motion.div>
      </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
