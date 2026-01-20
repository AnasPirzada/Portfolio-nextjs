import { motion } from 'framer-motion';
import { PROJECTS } from '../../constants.js';
import Card from './ProjectCard.js';

export default function ProjectsPage() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className="p-6 sm:p-8 md:p-10 mt-12 md:mt-20 section-container">
      <motion.div
        className="mb-8 md:mb-12"
        initial="hidden"
        animate="visible"
        variants={headerVariants}
      >
        <p className="uppercase tracking-widest text-gray-light-4 dark:text-gray-light-1 text-xs sm:text-sm md:text-base mb-2">
          PORTFOLIO
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-light-text-primary dark:text-white mb-3">
          All Projects
        </h1>
        <p className="text-base sm:text-lg text-gray-light-4 dark:text-gray-light-2 max-w-2xl">
          Here you can see all my projects. Each one represents a unique
          challenge and creative solution.
        </p>
      </motion.div>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {PROJECTS.map((project, index) => (
          <motion.div key={project.name} variants={itemVariants}>
            <Card project={project} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
