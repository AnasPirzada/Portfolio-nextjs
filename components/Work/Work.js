import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useEffect, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaBullseye, FaChartBar, FaCheckCircle } from 'react-icons/fa';
import { MENULINKS, WORK_ACHIEVEMENTS } from '../../constants';
import Tabs from './Tabs/Tabs';

const Work = ({ isDesktop }) => {
  const sectionRef = useRef(null);

  const enhancedTabItems = useMemo(() => {
    return WORK_ACHIEVEMENTS.map((job) => {
      const company = job.company;
      return {
        title: company,
        value: company,
        content: (
          <div className='w-full relative'>
            {/* Company Details */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='bg-gradient-to-br from-[#efc041]/5 to-[#eeba2c]/5 rounded-2xl p-8 border border-[#efc041]/20 mb-20'
            >
              <div className='mb-6'>
                <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-4'>
                  <div>
                    <h3 className='text-2xl font-bold text-white'>{job.role}</h3>
                    <div className='flex items-center gap-4 text-gray-400 text-sm mt-2'>
                      <span className='flex items-center gap-1'>
                        <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
                        </svg>
                        {job.period}
                      </span>
                      <span>•</span>
                      <span className='flex items-center gap-1'>
                        <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                        </svg>
                        {job.location}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className='grid md:grid-cols-2 gap-8'>
                {/* Achievements */}
                <div>
                  <h4 className='text-lg font-semibold text-white mb-4 flex items-center gap-2'>
                    <FaBullseye className='text-[#efc041] text-xl' /> Key Achievements
                  </h4>
                  <ul className='space-y-3'>
                    {job.achievements.map((achievement, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className='flex items-start gap-3 text-gray-300'
                      >
                        <FaCheckCircle className='text-[#efc041] mt-1 flex-shrink-0' size={16} />
                        <span>{achievement}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Metrics and Skills */}
                <div>
                  <h4 className='text-lg font-semibold text-white mb-4 flex items-center gap-2'>
                    <FaChartBar className='text-[#efc041] text-xl' /> Impact Metrics
                  </h4>
                  <div className='grid grid-cols-2 gap-3 mb-6'>
                    {job.metrics.map((metric, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className='bg-gradient-to-br from-black/40 to-black/20 rounded-lg p-4 text-center border border-[#efc041]/10'
                      >
                        <div className='text-xl font-bold text-[#efc041] mb-1'>
                          {metric.value}
                        </div>
                        <div className='text-xs text-gray-400 uppercase tracking-wide'>
                          {metric.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div>
                    <h5 className='text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wide'>
                      Technologies Used
                    </h5>
                    <div className='flex flex-wrap gap-2'>
                      {job.skills.map((skill, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.05 }}
                          className='px-3 py-1 text-xs rounded-full bg-[#efc041]/10 border border-[#efc041]/30 text-[#efc041] font-medium'
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        ),
      };
    });
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(
        sectionRef.current.querySelectorAll('.staggered-reveal'),
        {
          opacity: 0,
          y: 30,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current.querySelector('.work-wrapper'),
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
      id={MENULINKS[3].ref}
      className='w-full relative select-none xs:mt-40 sm:mt-72 mb-20 pb-16 z-10'
    >
      <img
        src='/left-pattern.svg'
        className='absolute hidden left-0 -top-1/4 w-1/12 max-w-xs md:block -z-10'
        loading='lazy'
        height={700}
        width={320}
        alt=''
      />
      <div className='section-container py-16 flex flex-col justify-center'>
        <div className='flex flex-col work-wrapper'>
          <div className='flex flex-col'>
            <p className='uppercase tracking-widest text-gray-light-1 staggered-reveal'>
              WORK
            </p>
            <h1 className='text-6xl mt-2 font-medium text-gradient w-fit staggered-reveal'>
              Experience
            </h1>
            <h2 className='text-[1.65rem] font-medium md:max-w-lg w-full mt-2 staggered-reveal'>
              A detailed look at my professional journey.{' '}
            </h2>
          </div>
          <div className='staggered-reveal'>
            <Tabs tabItems={enhancedTabItems} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Work;
