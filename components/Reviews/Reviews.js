import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { TESTIMONIALS } from '../../constants';
import Image from 'next/image';

const Reviews = () => {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-rotate testimonials
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused]);


  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(
        sectionRef.current.querySelectorAll('.staggered-reveal'),
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
          <p className='uppercase tracking-widest text-gray-light-1 staggered-reveal'>
            TESTIMONIALS
          </p>
          <h1 className='text-6xl mt-2 font-medium text-gradient w-fit mx-auto staggered-reveal'>
            Client Reviews
          </h1>
          <h2 className='text-[1.65rem] font-medium md:max-w-2xl w-full mt-2 mx-auto staggered-reveal'>
            What clients say about working with me.
          </h2>
          
        </div>

        {/* Carousel Container */}
        <div 
          className='staggered-reveal'
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            {/* Left Side - Active Review Display */}
            <div className='relative order-2 lg:order-1'>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`testimonial-${activeIndex}`}
                  initial={{ opacity: 0, scale: 0.9, x: -50 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9, x: 50 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className='relative bg-gradient-to-br from-gray-900/90 to-black/90 rounded-3xl p-12 border-2 border-[#efc041]/30 backdrop-blur-xl overflow-hidden'
                >
                  {/* Animated Background Elements */}
                  <div className='absolute inset-0 overflow-hidden'>
                    <div className='absolute -top-20 -right-20 w-40 h-40 bg-[#efc041]/10 rounded-full blur-3xl animate-pulse'></div>
                    <div className='absolute -bottom-20 -left-20 w-32 h-32 bg-[#eeba2c]/10 rounded-full blur-2xl animate-pulse animation-delay-1000'></div>
                    <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-[#efc041]/5 to-[#eeba2c]/5 rounded-full blur-3xl animate-spin-slow'></div>
                  </div>

                  {/* Decorative Quote Marks */}
                  <div className='absolute top-8 left-8 text-8xl text-[#efc041]/20 font-serif leading-none'>"</div>
                  <div className='absolute bottom-8 right-8 text-8xl text-[#efc041]/20 font-serif leading-none transform rotate-180'>"</div>

                  {/* Content */}
                  <div className='relative z-10'>
                    {/* Quote Icon */}
                    <div className='text-7xl text-[#efc041] font-serif leading-none mb-8 text-center opacity-80'>
                      <motion.span
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.2, duration: 0.5, ease: "backOut" }}
                      >
                        "
                      </motion.span>
                    </div>
                    
                    {/* Review Text */}
                    <motion.p 
                      className='text-gray-200 leading-relaxed mb-10 text-center text-xl font-light italic max-w-4xl mx-auto'
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                    >
                      {TESTIMONIALS[activeIndex].text}
                    </motion.p>
                    
                    {/* Author Info */}
                    <motion.div 
                      className='flex flex-col items-center gap-6'
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                    >
                      <div className='relative group/avatar'>
                        <div className='absolute inset-0 bg-gradient-to-r from-[#efc041] to-[#eeba2c] rounded-full blur-lg opacity-0 group-hover/avatar:opacity-50 transition-opacity duration-500'></div>
                        <Image
                          src={TESTIMONIALS[activeIndex].image}
                          alt={TESTIMONIALS[activeIndex].name}
                          width={100}
                          height={100}
                          className='relative rounded-full border-4 border-[#efc041]/40 group-hover/avatar:border-[#efc041] transition-all duration-500 shadow-2xl'
                        />
                        <div className='absolute inset-0 rounded-full bg-gradient-to-r from-[#efc041]/20 to-[#eeba2c]/20 opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-500'></div>
                      </div>
                      
                      <div className='text-center space-y-2'>
                        <h4 className='text-white font-bold text-2xl mb-2'>{TESTIMONIALS[activeIndex].name}</h4>
                        <p className='text-gray-300 text-lg mb-1'>{TESTIMONIALS[activeIndex].role}</p>
                        <p className='text-[#efc041] text-lg font-semibold'>{TESTIMONIALS[activeIndex].company}</p>
                      </div>
                    </motion.div>
                    
                    {/* Star Rating */}
                    <motion.div
                      className='flex justify-center gap-2 mt-6'
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    >
                      {[...Array(5)].map((_, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.6 + i * 0.1, duration: 0.3 }}
                          className={`text-2xl ${
                            i < TESTIMONIALS[activeIndex].rating ? 'text-[#efc041]' : 'text-gray-600'
                          }`}
                        >
                          ★
                        </motion.span>
                      ))}
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Side - Review Thumbnails */}
            <div className='space-y-4 order-1 lg:order-2'>
              {TESTIMONIALS.map((testimonial, index) => (
                <motion.div
                  key={`thumbnail-${index}`}
                  onClick={() => setActiveIndex(index)}
                  className={`relative cursor-pointer p-6 rounded-2xl border-2 transition-all duration-500 group ${
                    index === activeIndex 
                      ? 'border-[#efc041] bg-gradient-to-br from-[#efc041]/10 to-[#eeba2c]/10 shadow-lg shadow-[#efc041]/20' 
                      : 'border-gray-700/50 bg-gradient-to-br from-gray-800/30 to-gray-900/30 hover:border-[#efc041]/50'
                  }`}
                  whileHover={{ scale: 1.02, x: -10 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Active indicator */}
                  {index === activeIndex && (
                    <motion.div
                      className='absolute -right-2 top-1/2 transform -translate-y-1/2 w-1 h-16 bg-gradient-to-b from-[#efc041] to-[#eeba2c] rounded-full'
                      layoutId="activeIndicator"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  
                  <div className='flex items-center gap-4'>
                    <div className='relative'>
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={50}
                        height={50}
                        className={`rounded-full border-2 transition-all duration-300 ${
                          index === activeIndex 
                            ? 'border-[#efc041] shadow-lg shadow-[#efc041]/30' 
                            : 'border-gray-600 group-hover:border-[#efc041]/50'
                        }`}
                      />
                      {index === activeIndex && (
                        <div className='absolute inset-0 rounded-full bg-[#efc041]/20 blur-md animate-pulse'></div>
                      )}
                    </div>
                    
                    <div className='flex-1 min-w-0'>
                      <h4 className={`font-semibold truncate transition-colors duration-300 ${
                        index === activeIndex ? 'text-white' : 'text-gray-300 group-hover:text-white'
                      }`}>
                        {testimonial.name}
                      </h4>
                      <p className={`text-sm truncate transition-colors duration-300 ${
                        index === activeIndex ? 'text-[#efc041]' : 'text-gray-400 group-hover:text-gray-300'
                      }`}>
                        {testimonial.role} at {testimonial.company}
                      </p>
                      <div className='flex gap-1 mt-1'>
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-sm ${
                              i < testimonial.rating 
                                ? (index === activeIndex ? 'text-[#efc041]' : 'text-yellow-500') 
                                : 'text-gray-600'
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(239, 192, 65, 0.3); }
          50% { box-shadow: 0 0 40px rgba(239, 192, 65, 0.6); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </section>
  );
};

export default Reviews;

