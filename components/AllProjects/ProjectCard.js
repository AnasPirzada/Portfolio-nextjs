'use client';

import { motion } from 'framer-motion';
import gsap from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import allprojectarrow from '../../public/allprojectarrow.svg';

export default function ProjectCard({ project }) {
  const cardRef = useRef(null);

  // GSAP Hover 3D Animation
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * 8;
      const rotateY = ((x - centerX) / centerX) * 8;

      gsap.to(card, {
        rotateX: -rotateX,
        rotateY: rotateY,
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    const reset = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.6,
        ease: 'power3.out',
      });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', reset);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', reset);
    };
  }, []);

  const projectUrl = `/project/${project.name.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <Link href={projectUrl} className='block'>
      <motion.div
        ref={cardRef}
        className='
          relative z-10 flex flex-col p-6
          h-[500px] rounded-2xl 
          bg-black/40 backdrop-blur-lg 
          border border-white/15 shadow-2xl
          overflow-hidden transition-all duration-300 hover:border-[#eeba2c] hover:shadow-[0_20px_60px_rgba(238,186,44,0.18)]
        '
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* 🔹 Arrow is absolute on card, not inside image */}
        <div className='absolute top-4 right-4 z-20'>
          <motion.div
            whileHover={{ scale: 1.15, rotate: 12 }}
            whileTap={{ scale: 0.9 }}
            className='w-12 h-12 flex items-center justify-center rounded-full bg-[#efc041] text-white cursor-pointer'
          >
            <Image src={allprojectarrow} alt='arrow' width={22} height={22} />
          </motion.div>
        </div>

      {/* Image with shape + floating effect */}
      <motion.div
        className='relative w-full h-72 overflow-hidden rounded-2xl'
        initial={{ y: 0 }}
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
      >
        <motion.svg
          viewBox='0 0 960 540'
          xmlns='http://www.w3.org/2000/svg'
          className='absolute inset-0 w-full h-full'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* 🔹 Animated Gradient Background */}
          <defs>
            <linearGradient id='bgGradient' x1='0' y1='0' x2='1' y2='1'>
              <stop offset='0%' stopColor='rgba(239, 192, 65, 0.15)'>
                <animate
                  attributeName='offset'
                  values='0;1;0'
                  dur='6s'
                  repeatCount='indefinite'
                />
              </stop>
              <stop offset='100%' stopColor='rgba(239, 192, 65, 0.05)'>
                <animate
                  attributeName='offset'
                  values='1;0;1'
                  dur='6s'
                  repeatCount='indefinite'
                />
              </stop>
            </linearGradient>
          </defs>

          {/* Background with animated gradient */}
          <rect x='0' y='0' width='960' height='540' fill='url(#bgGradient)' />

          {/* Define mask from black areas */}
          <mask id={`heroMask`}>
            <rect x='0' y='0' width='960' height='540' fill='black' />
            <path
              d='M764 0L597 0L597 28L659 28L659 57L741 57L741 85L651 85L651 114L668 114L668 142L697 142L697 171L679 171L679 199L744 199L744 227L726 227L726 256L764 256L764 284L656 284L656 313L745 313L745 341L642 341L642 369L596 369L596 398L620 398L620 426L662 426L662 455L772 455L772 483L634 483L634 512L679 512L679 540L0 540L0 512L0 483L0 455L0 426L0 398L0 369L0 341L0 313L0 284L0 256L0 227L0 199L0 171L0 142L0 114L0 85L0 57L0 28L0 0L0 0Z'
              fill='white'
            />
          </mask>

          {/* Project image applied inside the mask */}
          <image
            href={project.heroSection}
            x='0'
            y='0'
            width='125%'
            height='540'
            preserveAspectRatio='xMidYMid slice'
            mask='url(#heroMask)'
          />
        </motion.svg>
      </motion.div>

      {/* Details */}
      <div className='mt-6 flex-1'>
        <h3 className='text-2xl font-bold text-white drop-shadow-md'>
          {project.name}
        </h3>
        <p className='mt-2 text-sm text-gray-200/90 line-clamp-3'>
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className='flex gap-3 mt-4 items-center flex-wrap'>
          {project?.tech?.map(el => (
            <motion.div key={el} whileHover={{ scale: 1.1 }} className='p-2 rounded-lg bg-white/5 border border-white/10'>
              <Image
                src={`/projects/tech/${el}.svg`}
                alt={el}
                width={32}
                height={32}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
    </Link>
  );
}
