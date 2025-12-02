import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
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

  const stats = [
    { label: 'Repositories', value: github.totalRepos, color: '#a855f7', icon: FaBox },
    { label: 'Stars', value: github.totalStars, color: '#efc041', icon: FaStar },
    { label: 'Commits', value: github.totalCommits, color: '#22c55e', icon: FaCodeCommit },
    { label: 'Contributions', value: github.contributionsLastYear, color: '#3b82f6', icon: FaChartLine },
  ];

  // Calculate max value for scaling
  const maxValue = Math.max(...stats.map(s => s.value));

  // Generate line points for each stat
  const generateLinePath = (value, index, total) => {
    const width = 800;
    const height = 300;
    const segments = 12; // 12 months
    const stepX = width / (segments - 1);
    
    // Create a smooth curve that peaks at different points
    const points = [];
    for (let i = 0; i < segments; i++) {
      const x = i * stepX;
      // Create variation in the line with peaks at different months
      const variance = Math.sin((i + index * 3) * Math.PI / 6) * 0.3 + 0.7;
      const y = height - (value / maxValue) * height * variance;
      points.push(`${x},${y}`);
    }
    
    return `M ${points.join(' L ')}`;
  };

  return (
    <section className='w-full relative select-none py-20 bg-gradient-to-b from-black to-gray-900'>
      <div className='section-container'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className='flex flex-col text-center mb-16'
        >
          <p className='uppercase tracking-widest text-gray-light-1'>STATISTICS</p>
          <h1 className='text-6xl mt-2 font-medium text-gradient w-fit mx-auto'>
            GitHub Stats
          </h1>
          <h2 className='text-[1.65rem] font-medium md:max-w-2xl w-full mt-2 mx-auto'>
            My contribution journey on GitHub over time.
          </h2>
        </motion.div>

        {/* Graph Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className='bg-gradient-to-br from-gray-900/50 to-black/50 rounded-3xl p-8 border border-gray-700/50 backdrop-blur-sm mb-8'
        >
          <div className='relative w-full' style={{ height: '400px' }}>
            <svg
              viewBox='0 0 800 300'
              className='w-full h-full'
              preserveAspectRatio='xMidYMid meet'
            >
              {/* Grid lines */}
              <g className='opacity-20'>
                {[0, 1, 2, 3, 4].map((i) => (
                  <line
                    key={`h-${i}`}
                    x1='0'
                    y1={i * 75}
                    x2='800'
                    y2={i * 75}
                    stroke='#fff'
                    strokeWidth='0.5'
                  />
                ))}
                {[...Array(12)].map((_, i) => (
                  <line
                    key={`v-${i}`}
                    x1={i * (800 / 11)}
                    y1='0'
                    x2={i * (800 / 11)}
                    y2='300'
                    stroke='#fff'
                    strokeWidth='0.5'
                  />
                ))}
              </g>

              {/* Stat lines */}
              {stats.map((stat, index) => (
                <motion.path
                  key={stat.label}
                  d={generateLinePath(stat.value, index, stats.length)}
                  fill='none'
                  stroke={stat.color}
                  strokeWidth='3'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 2, delay: index * 0.2, ease: 'easeInOut' }}
                  style={{
                    filter: `drop-shadow(0 0 8px ${stat.color}80)`,
                  }}
                />
              ))}

              {/* Data points */}
              {stats.map((stat, statIndex) => {
                const path = generateLinePath(stat.value, statIndex, stats.length);
                const points = path.match(/[\d.]+,[\d.]+/g) || [];
                
                return points.map((point, i) => {
                  if (i % 3 !== 0) return null; // Show fewer points
                  const [x, y] = point.split(',').map(Number);
                  return (
                    <motion.circle
                      key={`${statIndex}-${i}`}
                      cx={x}
                      cy={y}
                      r='4'
                      fill={stat.color}
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: false, amount: 0.3 }}
                      transition={{ duration: 0.3, delay: 2 + statIndex * 0.2 + i * 0.05 }}
                      style={{
                        filter: `drop-shadow(0 0 6px ${stat.color})`,
                      }}
                    />
                  );
                });
              })}
            </svg>

            {/* Month labels */}
            <div className='flex justify-between mt-4 px-2 text-xs text-gray-400'>
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month) => (
                <span key={month}>{month}</span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Stats Cards with Legend */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-6 mb-8'>
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className='bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm'
            >
              <div className='flex items-center gap-3 mb-3'>
                <div
                  className='w-4 h-4 rounded-full'
                  style={{
                    backgroundColor: stat.color,
                    boxShadow: `0 0 12px ${stat.color}80`,
                  }}
                />
                <span className='text-gray-400 text-sm font-medium uppercase tracking-wide'>
                  {stat.label}
                </span>
              </div>
              <div className='flex items-baseline gap-2'>
                <span className='text-4xl font-bold text-white'>
                  <CountUp end={stat.value} />
                </span>
                {(() => {
                  const IconComponent = stat.icon;
                  return IconComponent ? <IconComponent className='text-2xl' style={{ color: stat.color }} /> : null;
                })()}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Color Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className='flex flex-wrap justify-center gap-6 mb-12'
        >
          {stats.map((stat) => (
            <div key={stat.label} className='flex items-center gap-2'>
              <div className='flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-full border border-gray-700/50'>
                <div
                  className='w-3 h-3 rounded-full'
                  style={{
                    backgroundColor: stat.color,
                    boxShadow: `0 0 8px ${stat.color}80`,
                  }}
                />
                <span className='text-sm text-gray-300 font-medium'>{stat.label}</span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* GitHub Profile Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className='flex justify-center'
        >
          <a
            href='https://github.com/AnasPirzada'
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#efc041] to-[#eeba2c] text-black font-bold text-lg rounded-lg hover:shadow-[0_20px_40px_rgba(239,192,65,0.4)] transition-all duration-300 group'
          >
            <svg className='w-6 h-6 group-hover:rotate-12 transition-transform' fill='currentColor' viewBox='0 0 24 24'>
              <path fillRule='evenodd' d='M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z' clipRule='evenodd' />
            </svg>
            <span>View GitHub Profile</span>
            <svg className='w-5 h-5 group-hover:translate-x-1 transition-transform' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubStats;

