import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { FaCalendarAlt, FaUsers, FaStar, FaBriefcase } from 'react-icons/fa';
import { TESTIMONIALS } from '../../constants';

const Reviews = () => {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayTimeoutRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    
    const ctx = gsap.context(() => {
      const staggeredElements = sectionRef.current.querySelectorAll('.staggered-reveal') || [];
      const statsCards = sectionRef.current.querySelectorAll('.stats-card') || [];
      
      // Set initial state for animations
      gsap.set(staggeredElements, { opacity: 0, y: 30 });
      gsap.set(statsCards, { opacity: 0, y: 50 });
      
      // Check if section is already in viewport
      const rect = sectionRef.current.getBoundingClientRect();
      const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
      
      // Animate staggered elements - works both forward and backward
      if (isInViewport) {
        gsap.to(staggeredElements, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
        });
      } else {
        gsap.to(staggeredElements, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play reverse play reverse',
            onEnter: () => {
              gsap.set(staggeredElements, { opacity: 1, y: 0 });
            },
            onLeaveBack: () => {
              gsap.set(staggeredElements, { opacity: 0, y: 30 });
            },
          },
        });
      }
      
      // Animate stats cards - works both forward and backward
      if (isInViewport) {
        gsap.to(statsCards, {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
        });
      } else {
        gsap.to(statsCards, {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play reverse play reverse',
            onEnter: () => {
              gsap.set(statsCards, { opacity: 1, y: 0 });
            },
            onLeaveBack: () => {
              gsap.set(statsCards, { opacity: 0, y: 50 });
            },
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % TESTIMONIALS.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Resume auto-play after 10 seconds if no arrow is pressed
  useEffect(() => {
    if (isAutoPlaying) {
      // Clear any existing timeout if auto-play is already active
      if (autoPlayTimeoutRef.current) {
        clearTimeout(autoPlayTimeoutRef.current);
        autoPlayTimeoutRef.current = null;
      }
      return;
    }

    // Set timeout to resume auto-play after 10 seconds
    autoPlayTimeoutRef.current = setTimeout(() => {
      setIsAutoPlaying(true);
      autoPlayTimeoutRef.current = null;
    }, 10000);

    return () => {
      if (autoPlayTimeoutRef.current) {
        clearTimeout(autoPlayTimeoutRef.current);
        autoPlayTimeoutRef.current = null;
      }
    };
  }, [isAutoPlaying]);

  const nextReview = () => {
    // Clear existing timeout
    if (autoPlayTimeoutRef.current) {
      clearTimeout(autoPlayTimeoutRef.current);
      autoPlayTimeoutRef.current = null;
    }
    
    setActiveIndex(prev => (prev + 1) % TESTIMONIALS.length);
    setIsAutoPlaying(false);
    
    // Set new timeout to resume auto-play after 10 seconds
    autoPlayTimeoutRef.current = setTimeout(() => {
      setIsAutoPlaying(true);
      autoPlayTimeoutRef.current = null;
    }, 10000);
  };

  const prevReview = () => {
    // Clear existing timeout
    if (autoPlayTimeoutRef.current) {
      clearTimeout(autoPlayTimeoutRef.current);
      autoPlayTimeoutRef.current = null;
    }
    
    setActiveIndex(
      prev => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length
    );
    setIsAutoPlaying(false);
    
    // Set new timeout to resume auto-play after 10 seconds
    autoPlayTimeoutRef.current = setTimeout(() => {
      setIsAutoPlaying(true);
      autoPlayTimeoutRef.current = null;
    }, 10000);
  };

  const goToReview = index => {
    // Clear existing timeout
    if (autoPlayTimeoutRef.current) {
      clearTimeout(autoPlayTimeoutRef.current);
      autoPlayTimeoutRef.current = null;
    }
    
    setActiveIndex(index);
    setIsAutoPlaying(false);
    
    // Set new timeout to resume auto-play after 10 seconds
    autoPlayTimeoutRef.current = setTimeout(() => {
      setIsAutoPlaying(true);
      autoPlayTimeoutRef.current = null;
    }, 10000);
  };

  return (
    <section
      ref={sectionRef}
      className='w-full relative select-none overflow-hidden'
    >
      {/* Subtle background pattern */}
      <div className='absolute inset-0 opacity-30'>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(239,192,65,0.08)_0%,transparent_50%)]' />
      </div>

      <div className='section-container pt-10 md:pt-20 pb-10 md:pb-20 relative z-10'>
        {/* Header Section */}
        <motion.div
          className='flex flex-col items-start text-left mb-10 staggered-reveal'
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
        >
          <p className='uppercase tracking-widest text-gray-light-1 text-xs sm:text-sm md:text-base'>
            TESTIMONIALS
          </p>
          <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-2 font-medium text-gradient w-fit'>
            Client Reviews
          </h2>
          <p className='text-base sm:text-lg md:text-xl font-medium md:max-w-lg w-full mt-3 text-gray-light-4 dark:text-gray-light-3'>
            Trusted by industry leaders worldwide.
          </p>
        </motion.div>

        {/* Mobile Layout: Stats on top, Carousel below */}
        <div className='lg:hidden flex flex-col gap-6'>
          {/* Stats Grid - Mobile Top */}
          <div className='grid grid-cols-2 gap-4'>
            {[
              { label: 'Years Experience', value: '5+', icon: FaCalendarAlt },
              { label: 'Happy Clients', value: `${TESTIMONIALS.length}+`, icon: FaUsers },
              { label: 'Average Rating', value: '5.0', icon: FaStar },
              { label: 'Projects Done', value: '50+', icon: FaBriefcase },
            ].map((stat, index) => {
              const IconComponent = stat.icon;
              return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className='stats-card group relative overflow-hidden rounded-2xl bg-light-surface dark:bg-gray-dark-3/50 border border-gray-light-2 dark:border-white/10 p-5 hover:border-[#efc041]/50 transition-all duration-300'
              >
                <div className='absolute inset-0 bg-gradient-to-br from-[#efc041]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                <div className='relative z-10'>
                  <IconComponent className='text-2xl mb-2 text-[#efc041]' />
                  <div className='text-3xl font-bold text-gradient mb-1'>
                    {stat.value}
                  </div>
                  <div className='text-xs text-gray-light-4 dark:text-gray-light-2 uppercase tracking-wider'>
                    {stat.label}
                  </div>
                </div>
              </motion.div>
              );
            })}
          </div>

          {/* Main Review Card - Mobile */}
          <motion.div 
            className='relative'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
          >
            <div className='relative h-full min-h-[400px] rounded-3xl overflow-hidden bg-gradient-to-br from-[#efc041]/10 via-transparent to-[#eeba2c]/5 border border-gray-light-2 dark:border-white/10 p-6'>
              <div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#efc041]/20 to-transparent rounded-bl-full' />
              
              <AnimatePresence mode='wait'>
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className='relative z-10 h-full flex flex-col'
                >
                  <svg
                    className='w-10 h-10 text-[#efc041]/40 mb-4'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path d='M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z' />
                  </svg>

                  <p className='text-lg leading-relaxed mb-auto text-light-text-primary dark:text-white font-light'>
                    "{TESTIMONIALS[activeIndex].text}"
                  </p>

                  <div className='flex items-center gap-4 mt-6 pt-6 border-t border-gray-light-2 dark:border-white/10'>
                    <div className='relative'>
                      <Image
                        src={TESTIMONIALS[activeIndex].image}
                        alt={TESTIMONIALS[activeIndex].name}
                        width={56}
                        height={56}
                        className='rounded-full border-2 border-[#efc041]/30'
                      />
                    </div>
                    <div>
                      <h4 className='text-lg font-semibold text-light-text-primary dark:text-white'>
                        {TESTIMONIALS[activeIndex].name}
                      </h4>
                      <p className='text-[#efc041] text-sm'>
                        {TESTIMONIALS[activeIndex].role} @ {TESTIMONIALS[activeIndex].company}
                      </p>
                    </div>
                    <div className='ml-auto flex gap-0.5'>
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className='text-lg text-[#efc041]'>★</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Navigation Arrows + Auto-play - Mobile Below Carousel */}
          <div className='flex items-center justify-between'>
            {/* Arrows on left side */}
            <div className='flex items-center gap-3'>
              <motion.button
                onClick={prevReview}
                className='relative w-14 h-14 rounded-full bg-gradient-to-br from-[#efc041]/20 to-[#eeba2c]/10 dark:from-[#efc041]/30 dark:to-[#eeba2c]/20 border-2 border-[#efc041]/40 dark:border-[#efc041]/50 text-[#efc041] flex items-center justify-center overflow-hidden group shadow-lg shadow-[#efc041]/20'
                whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(239, 192, 65, 0.4)' }}
                whileTap={{ scale: 0.95 }}
                aria-label='Previous review'
              >
                {/* Animated background glow */}
                <motion.div
                  className='absolute inset-0 bg-gradient-to-br from-[#efc041]/30 to-[#eeba2c]/20'
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
                <svg className='relative z-10 w-6 h-6' fill='none' stroke='currentColor' strokeWidth={2.5} viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15 19l-7-7 7-7' />
                </svg>
              </motion.button>
              
              <motion.button
                onClick={nextReview}
                className='relative w-14 h-14 rounded-full bg-gradient-to-br from-[#efc041]/20 to-[#eeba2c]/10 dark:from-[#efc041]/30 dark:to-[#eeba2c]/20 border-2 border-[#efc041]/40 dark:border-[#efc041]/50 text-[#efc041] flex items-center justify-center overflow-hidden group shadow-lg shadow-[#efc041]/20'
                whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(239, 192, 65, 0.4)' }}
                whileTap={{ scale: 0.95 }}
                aria-label='Next review'
              >
                {/* Animated background glow */}
                <motion.div
                  className='absolute inset-0 bg-gradient-to-br from-[#efc041]/30 to-[#eeba2c]/20'
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
                <svg className='relative z-10 w-6 h-6' fill='none' stroke='currentColor' strokeWidth={2.5} viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M9 5l7 7-7 7' />
                </svg>
              </motion.button>
            </div>
            
            {/* Auto/Paused text in center with attractive styling */}
            <div className='flex-1 flex justify-center'>
              <motion.div
                className='relative inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#efc041]/10 to-[#eeba2c]/10 dark:from-[#efc041]/20 dark:to-[#eeba2c]/20 border border-[#efc041]/30 dark:border-[#efc041]/40 backdrop-blur-sm'
                animate={{
                  boxShadow: isAutoPlaying 
                    ? ['0 0 10px rgba(239, 192, 65, 0.3)', '0 0 20px rgba(239, 192, 65, 0.5)', '0 0 10px rgba(239, 192, 65, 0.3)']
                    : '0 0 0px rgba(239, 192, 65, 0)',
                }}
                transition={{
                  duration: 2,
                  repeat: isAutoPlaying ? Infinity : 0,
                  ease: 'easeInOut',
                }}
              >
                {/* Pulsing dot indicator */}
                {isAutoPlaying && (
                  <motion.span
                    className='w-2 h-2 rounded-full bg-[#efc041]'
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [1, 0.7, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                )}
                <span className={`text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${
                  isAutoPlaying 
                    ? 'text-[#efc041] drop-shadow-[0_0_8px_rgba(239,192,65,0.5)]' 
                    : 'text-gray-light-4 dark:text-gray-light-2'
                }`}>
                  {isAutoPlaying ? 'Auto' : 'Paused'}
                </span>
              </motion.div>
            </div>
            
            {/* Spacer to balance layout */}
            <div className='w-[104px]'></div>
          </div>
        </div>

        {/* Desktop Layout: Bento Grid */}
        <div className='hidden lg:grid grid-cols-12 gap-6'>
          {/* Main Review Card - Large */}
          <motion.div 
            className='col-span-7 relative'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
          >
            <div className='relative h-full min-h-[450px] rounded-3xl overflow-hidden bg-gradient-to-br from-[#efc041]/10 via-transparent to-[#eeba2c]/5 border border-gray-light-2 dark:border-white/10 p-8'>
              <div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#efc041]/20 to-transparent rounded-bl-full' />
              
              <AnimatePresence mode='wait'>
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className='relative z-10 h-full flex flex-col'
                >
                  <svg
                    className='w-12 h-12 text-[#efc041]/40 mb-4'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path d='M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z' />
                  </svg>

                  <p className='text-xl lg:text-2xl leading-relaxed mb-auto text-light-text-primary dark:text-white font-light'>
                    "{TESTIMONIALS[activeIndex].text}"
                  </p>

                  <div className='flex items-center gap-4 mt-6 pt-6 border-t border-gray-light-2 dark:border-white/10'>
                    <div className='relative'>
                      <Image
                        src={TESTIMONIALS[activeIndex].image}
                        alt={TESTIMONIALS[activeIndex].name}
                        width={56}
                        height={56}
                        className='rounded-full border-2 border-[#efc041]/30'
                      />
                    </div>
                    <div>
                      <h4 className='text-lg font-semibold text-light-text-primary dark:text-white'>
                        {TESTIMONIALS[activeIndex].name}
                      </h4>
                      <p className='text-[#efc041] text-sm'>
                        {TESTIMONIALS[activeIndex].role} @ {TESTIMONIALS[activeIndex].company}
                      </p>
                    </div>
                    <div className='ml-auto flex gap-0.5'>
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className='text-lg text-[#efc041]'>★</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Dots - Desktop Only */}
              <div className='absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2'>
                {TESTIMONIALS.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToReview(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === activeIndex
                        ? 'w-6 bg-[#efc041]'
                        : 'bg-gray-light-3 dark:bg-gray-dark-2 hover:bg-gray-light-4 dark:hover:bg-gray-dark-1'
                    }`}
                    aria-label={`Go to review ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Stats Grid */}
          <div className='col-span-5 grid grid-cols-2 gap-6'>
            {[
              { label: 'Years Experience', value: '5+', icon: FaCalendarAlt },
              { label: 'Happy Clients', value: `${TESTIMONIALS.length}+`, icon: FaUsers },
              { label: 'Average Rating', value: '5.0', icon: FaStar },
              { label: 'Projects Done', value: '50+', icon: FaBriefcase },
            ].map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className='stats-card group relative overflow-hidden rounded-2xl bg-light-surface dark:bg-gray-dark-3/50 border border-gray-light-2 dark:border-white/10 p-6 hover:border-[#efc041]/50 transition-all duration-300'
                >
                  <div className='absolute inset-0 bg-gradient-to-br from-[#efc041]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                  <div className='relative z-10'>
                    <IconComponent className='text-2xl mb-2 text-[#efc041]' />
                    <div className='text-4xl font-bold text-gradient mb-1'>
                      {stat.value}
                    </div>
                    <div className='text-sm text-gray-light-4 dark:text-gray-light-2 uppercase tracking-wider'>
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Navigation Arrows - Desktop */}
        <div className='hidden lg:flex justify-center gap-4 mt-8'>
          <motion.button
            onClick={prevReview}
            className='w-12 h-12 rounded-full bg-light-surface dark:bg-gray-dark-3 border border-gray-light-2 dark:border-white/10 text-light-text-primary dark:text-white flex items-center justify-center hover:border-[#efc041]/50 hover:text-[#efc041] transition-all duration-300'
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label='Previous review'
          >
            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
            </svg>
          </motion.button>
          
          <motion.button
            onClick={nextReview}
            className='w-12 h-12 rounded-full bg-light-surface dark:bg-gray-dark-3 border border-gray-light-2 dark:border-white/10 text-light-text-primary dark:text-white flex items-center justify-center hover:border-[#efc041]/50 hover:text-[#efc041] transition-all duration-300'
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label='Next review'
          >
            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
            </svg>
          </motion.button>
        </div>

        {/* Auto-play indicator - Desktop */}
        <div className='hidden lg:flex justify-center mt-4'>
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`text-xs uppercase tracking-wider transition-colors ${
              isAutoPlaying ? 'text-[#efc041]' : 'text-gray-light-4 dark:text-gray-light-2'
            }`}
          >
            {isAutoPlaying ? '● Auto-playing' : '○ Paused'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
