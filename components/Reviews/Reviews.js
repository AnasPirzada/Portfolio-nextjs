import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { TESTIMONIALS } from '../../constants';

const Reviews = () => {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Only animate stats cards, not text elements (handled by Framer Motion)
      gsap.from(sectionRef.current?.querySelectorAll('.stats-card') || [], {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    });

    return () => ctx.revert();
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % TESTIMONIALS.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextReview = () => {
    setActiveIndex(prev => (prev + 1) % TESTIMONIALS.length);
    setIsAutoPlaying(false);
  };

  const prevReview = () => {
    setActiveIndex(
      prev => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length
    );
    setIsAutoPlaying(false);
  };

  const goToReview = index => {
    setActiveIndex(index);
    setIsAutoPlaying(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 100,
      rotateX: -15,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        duration: 0.8,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: -100,
      rotateX: 15,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className='w-full relative select-none py-10 md:py-20 overflow-hidden bg-gradient-to-b from-black via-gray-950 to-black'
    >
      {/* Animated background elements */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <motion.div
          className='absolute top-20 left-10 w-96 h-96 bg-[#efc041]/5 rounded-full blur-3xl'
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 8,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className='absolute bottom-20 right-10 w-96 h-96 bg-[#eeba2c]/5 rounded-full blur-3xl'
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, -50, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 10,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
        {/* Grid pattern overlay */}
        <div className='absolute inset-0 bg-[linear-gradient(rgba(239,192,65,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(239,192,65,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]' />
      </div>

      <div className='section-container relative z-10'>
        {/* Header Section */}
        <motion.div
          className='flex flex-col items-start text-left mb-16 md:mb-20'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
        >
          <motion.p
            className='uppercase tracking-[0.3em] text-[#ffffff] text-xs sm:text-sm md:text-base mb-4 font-mono'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.2 }}
          >
            TESTIMONIALS
          </motion.p>
          <motion.h1
            className='text-4xl sm:text-5xl md:text-5xl lg:text-6xl 2xl:text-7xl mt-2 font-medium text-gradient w-fit'
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
          >
            Client Reviews
          </motion.h1>
          <motion.p
            className='text-base sm:text-lg md:text-xl lg:text-2xl font-medium md:max-w-lg w-full max-w-sm sm:max-w-md mt-2'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.4 }}
          >
            Trusted by industry leaders. See what clients say about working with
            me.
          </motion.p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          className='grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16 md:mb-20 max-w-5xl mx-auto w-full'
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: false }}
        >
          {[
            { label: 'Years Experience', value: '5+' },
            { label: 'Happy Clients', value: `${TESTIMONIALS.length}+` },
            { label: 'Average Rating', value: '5.0' },
            { label: 'Projects', value: '50+' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className='group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-950/50 backdrop-blur-xl border-2 border-[#efc041]/20 p-5 md:p-6 hover:border-[#efc041]/40 transition-all duration-300 w-full'
            >
              <motion.div className='absolute inset-0 bg-gradient-to-br from-[#efc041]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
              <div className='relative z-10 flex flex-col items-center justify-center text-center h-full'>
                <motion.div
                  className='text-3xl md:text-4xl font-bold text-gradient mb-2'
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.5 + index * 0.1,
                    type: 'spring',
                    stiffness: 200,
                  }}
                >
                  {stat.value}
                </motion.div>
                <div className='text-xs md:text-sm text-gray-400 uppercase tracking-wider text-center'>
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Review Card */}
        <div className='max-w-5xl mx-auto'>
          <div className='relative min-h-[600px] md:min-h-[700px]'>
            <AnimatePresence mode='wait'>
              <motion.div
                key={activeIndex}
                variants={cardVariants}
                initial='hidden'
                animate='visible'
                exit='exit'
                className='relative'
              >
                <motion.div
                  className='relative rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90 backdrop-blur-2xl p-8 md:p-12 shadow-2xl'
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  {/* Animated gradient overlays */}
                  <motion.div
                    className='absolute inset-0 bg-gradient-to-br from-[#efc041]/10 via-transparent to-[#eeba2c]/10'
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 4,
                      ease: 'easeInOut',
                    }}
                  />

                  {/* Floating orbs */}
                  <motion.div
                    className='absolute -top-20 -right-20 w-40 h-40 bg-[#efc041]/20 rounded-full blur-3xl'
                    animate={{
                      scale: [1, 1.3, 1],
                      x: [0, 30, 0],
                      y: [0, 20, 0],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 6,
                      ease: 'easeInOut',
                    }}
                  />
                  <motion.div
                    className='absolute -bottom-20 -left-20 w-32 h-32 bg-[#eeba2c]/20 rounded-full blur-2xl'
                    animate={{
                      scale: [1, 1.4, 1],
                      x: [0, -20, 0],
                      y: [0, -30, 0],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 7,
                      ease: 'easeInOut',
                      delay: 0.5,
                    }}
                  />

                  {/* Decorative corner elements */}
                  <div className='absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#efc041]/20 to-transparent rounded-bl-full' />
                  <div className='absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#eeba2c]/20 to-transparent rounded-tr-full' />

                  {/* Content */}
                  <div className='relative z-10'>
                    {/* Quote Icon */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{
                        delay: 0.3,
                        type: 'spring',
                        stiffness: 200,
                      }}
                      className='mb-6'
                    >
                      <svg
                        className='w-16 h-16 md:w-20 md:h-20 text-[#efc041]/30'
                        fill='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path d='M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z' />
                      </svg>
                    </motion.div>

                    {/* Review Text */}
                    <motion.p
                      className='text-lg md:text-xl lg:text-2xl leading-relaxed mb-8 font-light review-text-white'
                      style={{ color: '#ffffff' }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      {TESTIMONIALS[activeIndex].text}
                    </motion.p>

                    {/* Author Section */}
                    <motion.div
                      className='flex items-center gap-6 pt-8'
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <div className='relative'>
                        <motion.div
                          className='absolute inset-0 rounded-full bg-[#efc041]/30 blur-xl'
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 0.8, 0.5],
                          }}
                          transition={{
                            repeat: Infinity,
                            duration: 2,
                          }}
                        />
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: 'spring', stiffness: 400 }}
                        >
                          <Image
                            src={TESTIMONIALS[activeIndex].image}
                            alt={TESTIMONIALS[activeIndex].name}
                            width={80}
                            height={80}
                            className='rounded-full border-2 border-[#efc041]/50 shadow-lg shadow-[#efc041]/20 relative z-10'
                          />
                        </motion.div>
                      </div>
                      <div className='flex-1'>
                        <h4 className='text-xl md:text-2xl font-bold text-white mb-1'>
                          {TESTIMONIALS[activeIndex].name}
                        </h4>
                        <p className='text-[#efc041] text-sm md:text-base mb-3'>
                          {TESTIMONIALS[activeIndex].role} @{' '}
                          {TESTIMONIALS[activeIndex].company}
                        </p>
                        <div className='flex gap-1'>
                          {[...Array(5)].map((_, i) => (
                            <motion.span
                              key={i}
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{
                                delay: 0.6 + i * 0.1,
                                type: 'spring',
                                stiffness: 200,
                              }}
                              className='text-2xl text-[#efc041]'
                            >
                              ★
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <motion.button
              onClick={prevReview}
              className='absolute left-4 md:-left-16 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-gray-900/80 backdrop-blur-xl border border-[#efc041]/30 text-[#efc041] flex items-center justify-center hover:bg-[#efc041]/10 hover:border-[#efc041]/50 transition-all duration-300 group z-20'
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg
                className='w-6 h-6 group-hover:-translate-x-1 transition-transform'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M15 19l-7-7 7-7'
                />
              </svg>
            </motion.button>

            <motion.button
              onClick={nextReview}
              className='absolute right-4 md:-right-16 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-gray-900/80 backdrop-blur-xl border border-[#efc041]/30 text-[#efc041] flex items-center justify-center hover:bg-[#efc041]/10 hover:border-[#efc041]/50 transition-all duration-300 group z-20'
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg
                className='w-6 h-6 group-hover:translate-x-1 transition-transform'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 5l7 7-7 7'
                />
              </svg>
            </motion.button>
          </div>

          {/* Dots Indicator - Hidden */}
          <div className='hidden'>
            {TESTIMONIALS.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToReview(index)}
                className={`relative h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? 'w-12 bg-[#efc041]'
                    : 'w-2 bg-gray-600 hover:bg-gray-500'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                {index === activeIndex && (
                  <motion.div
                    className='absolute inset-0 bg-[#efc041] rounded-full'
                    layoutId='activeDot'
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
