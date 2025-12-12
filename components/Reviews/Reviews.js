import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { TESTIMONIALS } from '../../constants';
import Image from 'next/image';

const Reviews = () => {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragY, setDragY] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(
        sectionRef.current?.querySelectorAll('.staggered-reveal') || [],
        {
          opacity: 0,
          y: 30,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const handleDragEnd = (event, info) => {
    const threshold = 80;
    const velocity = info.velocity.y;
    
    // Use velocity for more natural feel
    if (velocity < -500 || info.offset.y < -threshold) {
      if (activeIndex > 0) {
        setActiveIndex(activeIndex - 1);
      }
    } else if (velocity > 500 || info.offset.y > threshold) {
      if (activeIndex < TESTIMONIALS.length - 1) {
        setActiveIndex(activeIndex + 1);
      }
    }
    setDragY(0);
  };

  const handleDrag = (event, info) => {
    setDragY(info.offset.y);
  };

  // Calculate card positions for stack effect with smoother transitions
  const getCardStyle = (index) => {
    const isActive = index === activeIndex;
    const isAbove = index < activeIndex;
    const isBelow = index > activeIndex;
    const distance = Math.abs(index - activeIndex);
    
    let y = 0;
    let scale = 1;
    let zIndex = TESTIMONIALS.length - distance;
    let opacity = 1;
    let rotate = 0;
    let blur = 0;

    if (isActive) {
      y = dragY;
      scale = 1;
      zIndex = TESTIMONIALS.length + 1;
      opacity = 1;
      rotate = dragY * 0.1; // Slight rotation based on drag
    } else if (isAbove) {
      y = -distance * 25 - 15;
      scale = 1 - distance * 0.08;
      opacity = Math.max(0.2, 1 - distance * 0.25);
      rotate = -3 + distance * 0.8;
      blur = distance * 2;
    } else if (isBelow) {
      y = distance * 25 + 15;
      scale = 1 - distance * 0.08;
      opacity = Math.max(0.2, 1 - distance * 0.25);
      rotate = 3 - distance * 0.8;
      blur = distance * 2;
    }

    return {
      y,
      scale: Math.max(0.65, scale),
      zIndex,
      opacity: Math.max(0.15, opacity),
      rotate,
      blur,
    };
  };

  return (
    <section
      ref={sectionRef}
      className='w-full relative select-none py-20 mt-32 bg-gradient-to-b from-gray-900 to-black z-20'
      style={{ marginTop: '8rem' }}
    >
      {/* Top separator line */}
      <div className='absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#efc041]/30 to-transparent'></div>
      
      <div className='section-container relative z-10'>
        <div className='flex flex-col text-center mb-16'>
          <p className='uppercase tracking-widest text-gray-light-1 staggered-reveal text-sm mb-2'>
            TESTIMONIALS
          </p>
          <h1 className='text-5xl md:text-6xl mt-2 font-semibold text-gradient w-fit mx-auto staggered-reveal'>
            Client Reviews
          </h1>
          <h2 className='text-lg md:text-xl font-light md:max-w-2xl w-full mt-4 mx-auto staggered-reveal text-gray-400'>
            What clients say about working with me.
          </h2>
        </div>

        {/* Main Content Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center'>
          {/* Left Side - Compelling Content */}
          <motion.div 
            className='staggered-reveal order-2 lg:order-1'
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className='space-y-8'>
              {/* Headline */}
              <div>
                <h2 className='text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6'>
                  Trusted by{' '}
                  <span className='text-gradient'>Industry Leaders</span>
                </h2>
                <p className='text-lg md:text-xl text-gray-300 leading-relaxed max-w-lg'>
                  I don't just build applications—I create solutions that transform businesses. 
                  Here's what clients who've worked with me have to say.
                </p>
              </div>

              {/* Stats */}
              <div className='grid grid-cols-2 gap-6 pt-6'>
                <div className='bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/30'>
                  <div className='text-4xl font-bold text-gradient mb-2'>
                    {TESTIMONIALS.length}+
                  </div>
                  <div className='text-sm text-gray-400 uppercase tracking-wider'>
                    Happy Clients
                  </div>
                </div>
                <div className='bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/30'>
                  <div className='text-4xl font-bold text-gradient mb-2'>
                    5.0
                  </div>
                  <div className='text-sm text-gray-400 uppercase tracking-wider'>
                    Average Rating
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <motion.a
                href='#contact'
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className='inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#efc041] to-[#eeba2c] text-black font-semibold text-base rounded-xl transition-all duration-300 shadow-lg hover:shadow-[0_20px_50px_rgba(239,192,65,0.4)] group'
              >
                <span>Work With Me</span>
                <svg className='w-5 h-5 group-hover:translate-x-1 transition-transform' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2.5} d='M9 5l7 7-7 7' />
                </svg>
              </motion.a>
            </div>
          </motion.div>

          {/* Right Side - Draggable Card Stack */}
          <div className='staggered-reveal order-1 lg:order-2 relative h-[600px] lg:h-[700px]'>
            <div className='relative w-full h-full flex items-center justify-center'>
              <div className='relative w-full max-w-md mx-auto' style={{ perspective: '1000px' }}>
                {TESTIMONIALS.map((testimonial, index) => {
                  const style = getCardStyle(index);
                  const isActive = index === activeIndex;
                  
                  return (
                    <motion.div
                      key={index}
                      drag={isActive ? 'y' : false}
                      dragConstraints={{ top: -300, bottom: 300 }}
                      dragElastic={0.4}
                      dragMomentum={false}
                      onDrag={handleDrag}
                      onDragEnd={handleDragEnd}
                      initial={false}
                      animate={{
                        y: style.y,
                        scale: style.scale,
                        rotate: style.rotate,
                        opacity: style.opacity,
                        zIndex: style.zIndex,
                        filter: `blur(${style.blur}px)`,
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 35,
                        mass: 0.8,
                      }}
                      className={`absolute w-full ${
                        isActive ? 'cursor-grab active:cursor-grabbing' : 'pointer-events-none'
                      }`}
                      style={{
                        transformOrigin: 'center center',
                      }}
                      onClick={() => !isActive && setActiveIndex(index)}
                    >
                      <motion.div 
                        className='relative rounded-3xl overflow-hidden'
                        whileHover={isActive ? { scale: 1.02 } : {}}
                        style={{
                          boxShadow: isActive 
                            ? '0 25px 50px -12px rgba(239, 192, 65, 0.25), 0 0 0 1px rgba(239, 192, 65, 0.1)' 
                            : '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
                        }}
                      >
                        {/* Enhanced gradient background */}
                        <div className={`relative bg-gradient-to-br ${
                          isActive 
                            ? 'from-gray-800/90 via-gray-800/80 to-gray-900/90' 
                            : 'from-gray-800/50 via-gray-800/40 to-gray-900/50'
                        } backdrop-blur-2xl p-8 border ${
                          isActive 
                            ? 'border-[#efc041]/40' 
                            : 'border-gray-700/30'
                        }`}>
                          {/* Animated gradient overlay for active card */}
                          {isActive && (
                            <>
                              <motion.div
                                className='absolute inset-0 bg-gradient-to-br from-[#efc041]/20 via-[#efc041]/5 to-[#eeba2c]/10'
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                              />
                              <motion.div
                                className='absolute -top-20 -right-20 w-40 h-40 bg-[#efc041]/20 rounded-full blur-3xl'
                                animate={{ 
                                  scale: [1, 1.2, 1],
                                  opacity: [0.3, 0.5, 0.3],
                                }}
                                transition={{ 
                                  repeat: Infinity, 
                                  duration: 4,
                                  ease: 'easeInOut'
                                }}
                              />
                              <motion.div
                                className='absolute -bottom-20 -left-20 w-32 h-32 bg-[#eeba2c]/20 rounded-full blur-2xl'
                                animate={{ 
                                  scale: [1, 1.3, 1],
                                  opacity: [0.2, 0.4, 0.2],
                                }}
                                transition={{ 
                                  repeat: Infinity, 
                                  duration: 5,
                                  ease: 'easeInOut',
                                  delay: 0.5
                                }}
                              />
                            </>
                          )}

                          {/* Decorative corner accent */}
                          <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${
                            isActive 
                              ? 'from-[#efc041]/30 to-transparent' 
                              : 'from-gray-700/20 to-transparent'
                          } rounded-bl-full`} />

                          {/* Content */}
                          <div className='relative z-10'>
                            {/* Enhanced Quote Icon */}
                            <div className='mb-6'>
                              <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ 
                                  delay: isActive ? 0.2 : 0,
                                  type: 'spring',
                                  stiffness: 200,
                                  damping: 15
                                }}
                              >
                                <svg className={`w-14 h-14 mb-4 ${
                                  isActive ? 'text-[#efc041]/40' : 'text-gray-600/30'
                                }`} fill='currentColor' viewBox='0 0 24 24'>
                                  <path d='M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z' />
                                </svg>
                              </motion.div>
                              <p className={`text-base md:text-lg leading-relaxed ${
                                isActive ? 'text-gray-100' : 'text-gray-300'
                              }`}>
                                {testimonial.text}
                              </p>
                            </div>

                            {/* Enhanced Author Section */}
                            <div className='flex items-center gap-4 pt-6 border-t border-gray-700/50'>
                              <div className='relative'>
                                <motion.div
                                  className='absolute inset-0 rounded-full'
                                  animate={isActive ? {
                                    boxShadow: [
                                      '0 0 0 0px rgba(239, 192, 65, 0.4)',
                                      '0 0 0 4px rgba(239, 192, 65, 0.2)',
                                      '0 0 0 0px rgba(239, 192, 65, 0)',
                                    ],
                                  } : {}}
                                  transition={isActive ? {
                                    repeat: Infinity,
                                    duration: 2,
                                  } : {}}
                                />
                                <Image
                                  src={testimonial.image}
                                  alt={testimonial.name}
                                  width={64}
                                  height={64}
                                  className={`rounded-full border-2 transition-all duration-300 ${
                                    isActive 
                                      ? 'border-[#efc041]/60 shadow-lg shadow-[#efc041]/20' 
                                      : 'border-gray-600/40'
                                  }`}
                                />
                                {isActive && (
                                  <motion.div
                                    className='absolute inset-0 rounded-full bg-gradient-to-br from-[#efc041]/30 to-[#eeba2c]/20'
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: [0, 0.5, 0] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                  />
                                )}
                              </div>
                              <div className='flex-1 min-w-0'>
                                <h4 className={`font-semibold text-sm md:text-base truncate mb-1 ${
                                  isActive ? 'text-white' : 'text-gray-300'
                                }`}>
                                  {testimonial.name}
                                </h4>
                                <p className={`text-xs md:text-sm truncate mb-2 ${
                                  isActive ? 'text-[#efc041]' : 'text-gray-500'
                                }`}>
                                  {testimonial.role} @ {testimonial.company}
                                </p>
                                <div className='flex gap-0.5'>
                                  {[...Array(5)].map((_, i) => (
                                    <motion.span
                                      key={i}
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      transition={{ delay: i * 0.1 }}
                                      className={`text-sm ${
                                        i < testimonial.rating 
                                          ? (isActive ? 'text-[#efc041]' : 'text-yellow-500/60') 
                                          : 'text-gray-600/40'
                                      }`}
                                    >
                                      ★
                                    </motion.span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Enhanced drag indicator for active card */}
                          {isActive && (
                            <motion.div
                              className='absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-2 text-[#efc041]/60 text-xs font-medium'
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ 
                                opacity: [0.5, 1, 0.5],
                                y: [0, -8, 0],
                              }}
                              transition={{ 
                                repeat: Infinity, 
                                duration: 2,
                                ease: 'easeInOut'
                              }}
                            >
                              <span>Drag to explore</span>
                              <motion.svg 
                                className='w-4 h-4' 
                                fill='none' 
                                stroke='currentColor' 
                                viewBox='0 0 24 24'
                                animate={{ y: [0, 4, 0] }}
                                transition={{ 
                                  repeat: Infinity, 
                                  duration: 1.5,
                                  ease: 'easeInOut'
                                }}
                              >
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                              </motion.svg>
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Card indicators */}
            <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 flex gap-2 mb-4'>
              {TESTIMONIALS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? 'w-8 bg-[#efc041]'
                      : 'w-2 bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;

