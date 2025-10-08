import { useRouter } from 'next/router';
import { PROJECTS } from '../../constants.js';
import Cursor from '@/components/Cursor/Cursor';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import Menu from '@/components/Header/Menu/Menu';
import ProgressIndicator from '@/components/ProgressIndicator/ProgressIndicator';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);
gsap.config({ nullTargetWarn: false });

export default function ProjectDetailPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [isDesktop, setIsDesktop] = useState(true);
  const [clientHeight, setClientHeight] = useState(0);
  const [clientWidth, setClientWidth] = useState(0);

  // Find the project by slug
  const project = PROJECTS.find(p => 
    p.name.toLowerCase().replace(/\s+/g, '-') === slug
  );

  useEffect(() => {
    const { innerWidth, innerHeight, orientation, history } = window;

    const result =
      typeof orientation === 'undefined' &&
      navigator.userAgent.indexOf('IEMobile') === -1;
    history.scrollRestoration = 'manual';

    setIsDesktop(result);
    setClientHeight(innerHeight);
    setClientWidth(innerWidth);
  }, [isDesktop]);

  // If project not found, show 404
  if (!project) {
    return (
      <>
        <Header>
          <Menu />
        </Header>
        <ProgressIndicator />
        <Cursor isDesktop={isDesktop} />
        <main className='flex flex-col min-h-screen items-center justify-center'>
          <div className='text-center'>
            <h1 className='text-6xl font-bold text-gradient mb-4'>404</h1>
            <p className='text-xl text-gray-300 mb-8'>Project not found</p>
            <Link href='/projects'>
              <button className='px-6 py-3 bg-[#eeba2c] text-black font-semibold rounded-lg hover:bg-[#efc041] transition-colors'>
                Back to Projects
              </button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header>
        <Menu />
      </Header>
      <ProgressIndicator />
      <Cursor isDesktop={isDesktop} />
      <main className='flex flex-col min-h-screen'>
        {/* Breadcrumb Navigation */}
        <section className='py-6 px-4 bg-gray-900'>
          <div className='max-w-6xl mx-auto'>
            <nav className='flex items-center space-x-2 text-sm'>
              <Link href='/' className='text-gray-400 hover:text-[#eeba2c] transition-colors'>
                Home
              </Link>
              <span className='text-gray-500'>›</span>
              <Link href='/projects' className='text-gray-400 hover:text-[#eeba2c] transition-colors'>
                Portfolio
              </Link>
              <span className='text-gray-500'>›</span>
              <span className='text-white'>{project.name}</span>
            </nav>
          </div>
        </section>

        {/* Hero Section */}
        <section className='relative min-h-screen flex items-center justify-center overflow-hidden'>
          {/* Background with gradient overlay */}
          <div className='absolute inset-0 z-0'>
            <Image
              src={project.heroSection}
              alt={project.name}
              fill
              className='object-cover'
              priority
            />
            <div 
              className='absolute inset-0'
              style={{
                background: `linear-gradient(135deg, ${project.gradient[0]}80, ${project.gradient[1]}80)`
              }}
            />
          </div>

          {/* Content */}
          <div className='relative z-10 text-center px-4 max-w-4xl mx-auto'>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className='text-6xl md:text-8xl font-bold text-white mb-6 drop-shadow-2xl'>
                {project.name}
              </h1>
              <p className='text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed'>
                {project.description}
              </p>
              
              {/* Live Website Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href={project.url} 
                  target='_blank' 
                  rel='noopener noreferrer'
                  className='inline-block'
                >
                  <button className='px-8 py-4 bg-[#eeba2c] text-black font-bold text-lg rounded-lg hover:bg-[#efc041] transition-all duration-300 shadow-2xl hover:shadow-[0_20px_40px_rgba(238,186,44,0.3)]'>
                    Live Website
                  </button>
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className='absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10'
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <div className='w-6 h-10 border-2 border-white rounded-full flex justify-center'>
              <div className='w-1 h-3 bg-white rounded-full mt-2'></div>
            </div>
          </motion.div>
        </section>

        {/* Project Details Section */}
        <section className='py-20 px-4 bg-black'>
          <div className='max-w-6xl mx-auto'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
              {/* Project Image */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className='relative'
              >
                <div className='relative w-full h-96 rounded-2xl overflow-hidden shadow-2xl'>
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className='object-cover'
                  />
                </div>
              </motion.div>

              {/* Project Info */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className='space-y-8'
              >
                <div>
                  <h2 className='text-4xl font-bold text-white mb-4'>Project Overview</h2>
                  <p className='text-lg text-gray-300 leading-relaxed'>
                    {project.description}
                  </p>
                </div>

                {/* Tech Stack */}
                <div>
                  <h3 className='text-2xl font-semibold text-white mb-4'>Technologies Used</h3>
                  <div className='flex flex-wrap gap-4'>
                    {project.tech?.map((tech, index) => (
                      <motion.div
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className='flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg border border-white/20 hover:border-[#eeba2c] transition-colors'
                      >
                        <Image
                          src={`/projects/tech/${tech}.svg`}
                          alt={tech}
                          width={24}
                          height={24}
                        />
                        <span className='text-white font-medium capitalize'>
                          {tech.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Live Website Button */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    href={project.url} 
                    target='_blank' 
                    rel='noopener noreferrer'
                    className='inline-block'
                  >
                    <button className='w-full px-8 py-4 bg-gradient-to-r from-[#eeba2c] to-[#efc041] text-black font-bold text-lg rounded-lg hover:shadow-[0_20px_40px_rgba(238,186,44,0.3)] transition-all duration-300'>
                      Visit Live Website
                    </button>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Project Information Grid */}
        <section className='py-20 px-4 bg-gray-900'>
          <div className='max-w-6xl mx-auto'>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className='text-center mb-16'
            >
              <h2 className='text-4xl font-bold text-white mb-4'>Project Information</h2>
              <p className='text-lg text-gray-300 max-w-2xl mx-auto'>
                Detailed information about the project, technologies used, and development process.
              </p>
            </motion.div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              {/* Client */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className='bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-[#eeba2c] transition-colors'
              >
                <h3 className='text-xl font-semibold text-white mb-4'>Client</h3>
                <p className='text-gray-300'>{project.client || project.name}</p>
              </motion.div>

              {/* Services */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className='bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-[#eeba2c] transition-colors'
              >
                <h3 className='text-xl font-semibold text-white mb-4'>Services</h3>
                <ul className='text-gray-300 space-y-2'>
                  {project.services?.map((service, index) => (
                    <li key={index}>• {service}</li>
                  )) || (
                    <>
                      <li>• Web Development</li>
                      <li>• UI/UX Design</li>
                      <li>• Frontend Development</li>
                      <li>• Responsive Design</li>
                    </>
                  )}
                </ul>
              </motion.div>

              {/* Live Website */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className='bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-[#eeba2c] transition-colors'
              >
                <h3 className='text-xl font-semibold text-white mb-4'>Live Website</h3>
                <Link 
                  href={project.url} 
                  target='_blank' 
                  rel='noopener noreferrer'
                  className='text-[#eeba2c] hover:text-[#efc041] transition-colors font-medium'
                >
                  Visit Website →
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Work Experience Section */}
        <section className='py-20 px-4 bg-black'>
          <div className='max-w-6xl mx-auto'>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className='text-center mb-16'
            >
              <h2 className='text-4xl font-bold text-white mb-4'>Work Experience</h2>
              <p className='text-lg text-gray-300 max-w-3xl mx-auto'>
                This project showcases my expertise in modern web development, combining cutting-edge technologies with user-centered design principles.
              </p>
            </motion.div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className='space-y-6'
              >
                <div>
                  <h3 className='text-2xl font-semibold text-white mb-4'>Development Process</h3>
                  <p className='text-gray-300 leading-relaxed mb-4'>
                    The development of {project.name} involved a comprehensive approach to modern web development. 
                    Starting with careful planning and design, I implemented a robust architecture using the latest technologies.
                  </p>
                  <p className='text-gray-300 leading-relaxed'>
                    The project demonstrates my ability to create scalable, maintainable, and user-friendly web applications 
                    that meet modern standards and provide exceptional user experiences.
                  </p>
                </div>

                <div>
                  <h3 className='text-2xl font-semibold text-white mb-4'>Key Features</h3>
                  <ul className='text-gray-300 space-y-2'>
                    <li>• Responsive Design for all devices</li>
                    <li>• Modern UI/UX Implementation</li>
                    <li>• Optimized Performance</li>
                    <li>• Cross-browser Compatibility</li>
                    <li>• SEO Optimized</li>
                  </ul>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className='relative'
              >
                <div className='relative w-full h-80 rounded-2xl overflow-hidden shadow-2xl'>
                  <Image
                    src={project.heroSection}
                    alt={`${project.name} showcase`}
                    fill
                    className='object-cover'
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className='py-20 px-4 bg-gray-900'>
          <div className='max-w-6xl mx-auto'>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className='text-center mb-16'
            >
              <h2 className='text-4xl font-bold text-white mb-4'>Services</h2>
              <p className='text-lg text-gray-300 max-w-2xl mx-auto'>
                Comprehensive web development services delivered with expertise and attention to detail.
              </p>
            </motion.div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
              {(project.services || [
                'Web Development',
                'UI/UX Design', 
                'Frontend Development',
                'Responsive Design'
              ]).map((service, index) => (
                <motion.div
                  key={service}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className='bg-white/5 rounded-xl p-6 border border-white/10 hover:border-[#eeba2c] transition-colors text-center'
                >
                  <h3 className='text-lg font-semibold text-white'>{service}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Navigation Section */}
        <section className='py-20 px-4 bg-black'>
          <div className='max-w-6xl mx-auto text-center'>
            <h2 className='text-3xl font-bold text-white mb-8'>Explore More Projects</h2>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Link href='/projects'>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className='px-8 py-4 bg-transparent border-2 border-[#eeba2c] text-[#eeba2c] font-semibold rounded-lg hover:bg-[#eeba2c] hover:text-black transition-all duration-300'
                >
                  View All Projects
                </motion.button>
              </Link>
              <Link href='/'>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className='px-8 py-4 bg-[#eeba2c] text-black font-semibold rounded-lg hover:bg-[#efc041] transition-all duration-300'
                >
                  Back to Home
                </motion.button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
