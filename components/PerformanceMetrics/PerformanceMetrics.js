import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { FaBox, FaStar, FaCodeCommit, FaChartLine } from 'react-icons/fa';
import { PERFORMANCE_METRICS, WORK_ACHIEVEMENTS } from '../../constants';
import styles from './PerformanceMetrics.module.scss';

const CountUp = ({ end, duration = 2 }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime = null;
          const endValue = typeof end === 'string' ? parseFloat(end.replace(/[^0-9.]/g, '')) : end;
          
          const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
            
            const currentCount = Math.floor(progress * endValue);
            setCount(currentCount);
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(endValue);
            }
          };
          
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [end, duration, hasAnimated]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
};

const GitHubStats = () => {
  const { github } = PERFORMANCE_METRICS;
  const sectionRef = useRef(null);

  const stats = [
    { 
      label: 'Repositories', 
      value: github.totalRepos, 
      color: '#a855f7', 
      gradient: 'from-purple-500/20 to-purple-600/10',
      icon: FaBox 
    },
    { 
      label: 'Stars', 
      value: github.totalStars, 
      color: '#efc041', 
      gradient: 'from-yellow-500/20 to-yellow-600/10',
      icon: FaStar 
    },
    { 
      label: 'Commits', 
      value: github.totalCommits, 
      color: '#22c55e', 
      gradient: 'from-green-500/20 to-green-600/10',
      icon: FaCodeCommit 
    },
    { 
      label: 'Contributions', 
      value: github.contributionsLastYear, 
      color: '#3b82f6', 
      gradient: 'from-blue-500/20 to-blue-600/10',
      icon: FaChartLine 
    },
  ];

  useLayoutEffect(() => {
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

  // Calculate max value for scaling
  const maxValue = Math.max(...stats.map(s => s.value));

  // Generate smooth curve path using cubic bezier
  const generateSmoothPath = (value, index) => {
    const width = 800;
    const height = 300;
    const segments = 12;
    const stepX = width / (segments - 1);
    
    const points = [];
    for (let i = 0; i < segments; i++) {
      const x = i * stepX;
      const variance = Math.sin((i + index * 3) * Math.PI / 6) * 0.3 + 0.7;
      const y = height - (value / maxValue) * height * variance;
      points.push({ x, y });
    }
    
    // Create smooth path with cubic bezier curves
    let path = `M ${points[0].x},${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const current = points[i];
      const next = points[i + 1];
      const cp1x = current.x + (next.x - current.x) / 3;
      const cp1y = current.y;
      const cp2x = current.x + (next.x - current.x) * 2 / 3;
      const cp2y = next.y;
      path += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${next.x},${next.y}`;
    }
    
    return path;
  };

  return (
    <section ref={sectionRef} className='w-full relative select-none py-20 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden'>
      {/* Background decorative elements */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-20 left-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl'></div>
        <div className='absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl'></div>
      </div>

      <div className='section-container relative z-10'>
        <div className='flex flex-col text-center mb-20'>
          <p className='uppercase tracking-widest text-gray-light-1 staggered-reveal text-sm mb-2'>STATISTICS</p>
          <h1 className='text-5xl md:text-6xl mt-2 font-semibold text-gradient w-fit mx-auto staggered-reveal'>
            GitHub Stats
          </h1>
          <h2 className='text-lg md:text-xl font-light md:max-w-2xl w-full mt-4 mx-auto staggered-reveal text-gray-400'>
            My contribution journey on GitHub over time.
          </h2>
        </div>

        {/* Enhanced Stats Cards */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12'>
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
                whileHover={{ y: -8, scale: 1.02 }}
                className='group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/40 via-gray-800/30 to-gray-900/40 backdrop-blur-xl border border-gray-700/30 p-6 hover:border-gray-600/50 transition-all duration-300'
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                
                {/* Glow effect */}
                <div 
                  className='absolute -inset-0.5 bg-gradient-to-r opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300'
                  style={{ background: `linear-gradient(90deg, ${stat.color}, transparent)` }}
                ></div>

                <div className='relative z-10'>
                  <div className='flex items-center justify-between mb-4'>
                    <div className='flex items-center gap-3'>
                      <div 
                        className='w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3'
                        style={{
                          backgroundColor: `${stat.color}15`,
                          border: `1px solid ${stat.color}40`,
                        }}
                      >
                        {IconComponent && <IconComponent className='text-xl' style={{ color: stat.color }} />}
                      </div>
                      <span className='text-gray-400 text-xs font-medium uppercase tracking-wider'>
                        {stat.label}
                      </span>
                    </div>
                  </div>
                  
                  <div className='flex items-baseline gap-3'>
                    <span className='text-4xl md:text-5xl font-bold text-white tabular-nums'>
                      <CountUp end={stat.value} />
                    </span>
                  </div>
                  
                  {/* Progress indicator */}
                  <div className='mt-4 h-1 bg-gray-800/50 rounded-full overflow-hidden'>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      viewport={{ once: false }}
                      transition={{ duration: 1.5, delay: index * 0.1 + 0.3, ease: 'easeOut' }}
                      className='h-full rounded-full'
                      style={{ 
                        backgroundColor: stat.color,
                        boxShadow: `0 0 10px ${stat.color}80`,
                      }}
                    ></motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Enhanced Graph Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className='relative rounded-3xl bg-gradient-to-br from-gray-900/60 via-gray-900/40 to-black/60 backdrop-blur-2xl p-8 md:p-12 border border-gray-700/30 shadow-2xl mb-12 overflow-hidden'
        >
          {/* Background pattern */}
          <div className='absolute inset-0 opacity-5'>
            <div className='absolute inset-0' style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}></div>
          </div>

          <div className='relative z-10'>
            <div className='mb-6'>
              <h3 className='text-xl font-semibold text-white mb-1'>Activity Overview</h3>
              <p className='text-sm text-gray-400'>12-month contribution timeline</p>
            </div>

            <div className='relative w-full' style={{ height: '350px' }}>
              <svg
                viewBox='0 0 800 300'
                className='w-full h-full'
                preserveAspectRatio='xMidYMid meet'
              >
                {/* Enhanced grid lines */}
                <defs>
                  <linearGradient id='gridGradient' x1='0%' y1='0%' x2='0%' y2='100%'>
                    <stop offset='0%' stopColor='#ffffff' stopOpacity='0.1' />
                    <stop offset='100%' stopColor='#ffffff' stopOpacity='0.02' />
                  </linearGradient>
                </defs>
                
                <g className='opacity-30'>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <line
                      key={`h-${i}`}
                      x1='0'
                      y1={i * 75}
                      x2='800'
                      y2={i * 75}
                      stroke='url(#gridGradient)'
                      strokeWidth='1'
                    />
                  ))}
                  {[...Array(12)].map((_, i) => (
                    <line
                      key={`v-${i}`}
                      x1={i * (800 / 11)}
                      y1='0'
                      x2={i * (800 / 11)}
                      y2='300'
                      stroke='url(#gridGradient)'
                      strokeWidth='1'
                    />
                  ))}
                </g>

                {/* Gradient fills under lines */}
                {stats.map((stat, index) => {
                  const path = generateSmoothPath(stat.value, index);
                  const fillPath = path + ` L 800,300 L 0,300 Z`;
                  return (
                    <motion.path
                      key={`fill-${stat.label}`}
                      d={fillPath}
                      fill={`url(#gradient-${index})`}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 0.15 }}
                      viewport={{ once: false }}
                      transition={{ duration: 1, delay: index * 0.2 + 1 }}
                    />
                  );
                })}

                {/* Gradient definitions */}
                <defs>
                  {stats.map((stat, index) => (
                    <linearGradient key={`gradient-${index}`} id={`gradient-${index}`} x1='0%' y1='0%' x2='0%' y2='100%'>
                      <stop offset='0%' stopColor={stat.color} stopOpacity='0.3' />
                      <stop offset='100%' stopColor={stat.color} stopOpacity='0' />
                    </linearGradient>
                  ))}
                </defs>

                {/* Smooth stat lines */}
                {stats.map((stat, index) => (
                  <motion.path
                    key={stat.label}
                    d={generateSmoothPath(stat.value, index)}
                    fill='none'
                    stroke={stat.color}
                    strokeWidth='3.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 2.5, delay: index * 0.3, ease: 'easeInOut' }}
                    style={{
                      filter: `drop-shadow(0 0 12px ${stat.color}60)`,
                    }}
                  />
                ))}

                {/* Enhanced data points */}
                {stats.map((stat, statIndex) => {
                  const width = 800;
                  const height = 300;
                  const segments = 12;
                  const stepX = width / (segments - 1);
                  
                  // Generate points for data visualization
                  const dataPoints = [];
                  for (let i = 0; i < segments; i++) {
                    if (i % 2 === 0) { // Show fewer points
                      const x = i * stepX;
                      const variance = Math.sin((i + statIndex * 3) * Math.PI / 6) * 0.3 + 0.7;
                      const y = height - (stat.value / maxValue) * height * variance;
                      dataPoints.push({ x, y });
                    }
                  }
                  
                  return dataPoints.map((point, i) => (
                    <motion.g key={`${statIndex}-${i}`}>
                      <motion.circle
                        cx={point.x}
                        cy={point.y}
                        r='5'
                        fill={stat.color}
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 0.4, delay: 2.5 + statIndex * 0.3 + i * 0.1 }}
                        style={{
                          filter: `drop-shadow(0 0 8px ${stat.color})`,
                        }}
                      />
                      <motion.circle
                        cx={point.x}
                        cy={point.y}
                        r='8'
                        fill={stat.color}
                        initial={{ scale: 0, opacity: 0.3 }}
                        whileInView={{ scale: 1, opacity: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 0.6, delay: 2.5 + statIndex * 0.3 + i * 0.1 }}
                      />
                    </motion.g>
                  ));
                })}
              </svg>

              {/* Month labels */}
              <div className='flex justify-between mt-6 px-2 text-xs text-gray-500 font-medium'>
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month) => (
                  <span key={month} className='uppercase tracking-wider'>{month}</span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced GitHub Profile Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className='flex justify-center'
        >
          <motion.a
            href='https://github.com/AnasPirzada'
            target='_blank'
            rel='noopener noreferrer'
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className='group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#efc041] via-[#eeba2c] to-[#efc041] text-black font-semibold text-base rounded-xl transition-all duration-500 shadow-lg hover:shadow-[0_20px_50px_rgba(239,192,65,0.4)] overflow-hidden'
            style={{
              backgroundSize: '200% 100%',
              backgroundPosition: '0% 0%',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundPosition = '100% 0%';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundPosition = '0% 0%';
            }}
          >
            <div className='absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
            <svg className='w-6 h-6 relative z-10 group-hover:rotate-12 transition-transform duration-300' fill='currentColor' viewBox='0 0 24 24'>
              <path fillRule='evenodd' d='M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z' clipRule='evenodd' />
            </svg>
            <span className='relative z-10'>View GitHub Profile</span>
            <svg className='w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2.5} d='M9 5l7 7-7 7' />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubStats;

