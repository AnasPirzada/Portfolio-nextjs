import { RevealFade, RevealItem, RevealStagger } from '@/components/ui/Reveal';
import { m, motion } from 'framer-motion';
import { useMemo } from 'react';
import { FaBullseye, FaChartBar, FaCheckCircle } from 'react-icons/fa';
import { MENULINKS, WORK_ACHIEVEMENTS } from '@/constants';
import Tabs from './Tabs/Tabs';

const Work = () => {
  const enhancedTabItems = useMemo(() => {
    return WORK_ACHIEVEMENTS.map(job => {
      const company = job.company;
      return {
        title: company,
        value: company,
        content: (
          <div className="w-full relative" style={{ opacity: 1 }}>
            {/* Company Details */}
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-accent-light/5 to-accent-dark/5 rounded-2xl p-8 border border-accent-light/20 mb-20"
              style={{ willChange: 'auto', opacity: 1 }}
            >
              <div className="mb-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl md:text-2xl lg:text-2xl font-bold text-gray-dark-1 dark:text-white">
                      {job.role}
                    </h3>
                    <div className="flex items-center gap-4 text-gray-light-4 dark:text-gray-light-2 text-sm mt-2">
                      <span className="flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        {job.period}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        {job.location}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Achievements */}
                <div>
                  <h4 className="text-lg sm:text-xl font-semibold text-gray-dark-1 dark:text-white mb-4 flex items-center gap-2">
                    <FaBullseye className="text-accent-light text-lg sm:text-xl" />{' '}
                    Key Achievements
                  </h4>
                  <ul className="space-y-3">
                    {job.achievements.map((achievement, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 1, x: 0 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-3 text-gray-light-4 dark:text-gray-light-2 text-base sm:text-lg md:text-base"
                      >
                        <FaCheckCircle
                          className="text-accent-light mt-1 flex-shrink-0"
                          size={16}
                        />
                        <span>{achievement}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Metrics and Skills */}
                <div>
                  <h4 className="text-lg sm:text-xl font-semibold text-gray-dark-1 dark:text-white mb-4 flex items-center gap-2">
                    <FaChartBar className="text-accent-light text-lg sm:text-xl" />{' '}
                    Impact Metrics
                  </h4>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {job.metrics.map((metric, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 1, scale: 1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-gradient-to-br from-gray-light-1 to-white dark:from-black/40 dark:to-black/20 rounded-lg p-4 text-center border border-accent-light/20 dark:border-accent-light/10"
                      >
                        <div className="text-xl font-bold text-accent-light mb-1">
                          {metric.value}
                        </div>
                        <div className="text-xs text-gray-light-4 dark:text-gray-light-2 uppercase tracking-wide">
                          {metric.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div>
                    <h5 className="text-sm font-semibold text-gray-light-4 dark:text-gray-light-2 mb-3 uppercase tracking-wide">
                      Technologies Used
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 1, scale: 1 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.05 }}
                          className="px-3 py-1 text-xs rounded-full bg-accent-light/10 border border-accent-light/30 text-gray-dark-1 dark:text-accent-light font-medium"
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

  return (
    <section id={MENULINKS[3].ref} className="w-full relative select-none z-10">
      <img
        src="/left-pattern.svg"
        className="absolute hidden left-0 -top-1/4 w-1/12 max-w-xs md:block -z-10"
        loading="lazy"
        height={700}
        width={320}
        alt=""
      />
      <div className="section-container pt-6 md:pt-10 pb-10 md:pb-20 flex flex-col justify-center">
        <div className="flex flex-col work-wrapper">
          <RevealStagger className="flex flex-col">
            <RevealItem
              as={m.p}
              className="uppercase tracking-widest text-gray-light-1 text-xs sm:text-sm md:text-base"
            >
              WORK
            </RevealItem>
            <RevealItem
              as={m.h2}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-2 font-medium text-gradient w-fit"
            >
              Experience
            </RevealItem>
            <RevealItem
              as={m.p}
              className="text-base sm:text-lg md:text-xl font-medium md:max-w-lg w-full mt-3 text-gray-light-4 dark:text-gray-light-3"
            >
              A detailed look at my professional journey.
            </RevealItem>
          </RevealStagger>
          <RevealFade className="mt-2">
            <Tabs tabItems={enhancedTabItems} />
          </RevealFade>
        </div>
      </div>
    </section>
  );
};

export default Work;
