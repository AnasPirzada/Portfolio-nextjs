/* eslint-disable @next/next/no-img-element */
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { BLOGS } from '../../constants';
import Button from '../Button/Button';

// Calculate reading time based on content length
const calculateReadingTime = (content) => {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return minutes;
};

const BlogCard = ({ blog, index }) => {
  const readingTime = calculateReadingTime(blog.content || blog.description);
  
  return (
    <Link
      href={`/blog/${blog.slug}`}
      className='block rounded-2xl border border-white/15 bg-gray-dark-2/40 backdrop-blur-md p-6 hover:border-[#eeba2c] hover:shadow-lg hover:shadow-[#eeba2c]/20 transition-all group'
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
      >
        <div className='flex items-start justify-between gap-3 mb-3'>
          <div className='flex-1'>
            <div className='flex items-center gap-3 text-xs text-gray-400 mb-2'>
              <span className='flex items-center gap-1'>
                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
                </svg>
                {new Date(blog.date).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </span>
              <span>•</span>
              <span className='flex items-center gap-1'>
                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
                </svg>
                {readingTime} min read
              </span>
            </div>
            <h3 className='text-xl font-semibold mt-1 group-hover:text-[#eeba2c] transition-colors'>
              {blog.title}
            </h3>
          </div>
        </div>
        <p className='mt-3 text-sm text-gray-300 line-clamp-3 leading-relaxed'>
          {blog.description}
        </p>
        {blog.tags?.length ? (
          <div className='mt-4 flex gap-2 flex-wrap'>
            {blog.tags.map(tag => (
              <span
                key={tag}
                className='px-2.5 py-1 text-xs rounded-md bg-[#eeba2c]/10 border border-[#eeba2c]/30 text-[#eeba2c] font-medium'
              >
                #{tag}
              </span>
            ))}
          </div>
        ) : null}
        <div className='mt-4 flex items-center gap-2 text-[#eeba2c] text-sm font-medium group-hover:gap-3 transition-all'>
          <span>Read more</span>
          <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
          </svg>
        </div>
      </motion.div>
    </Link>
  );
};

const Blogs = ({ clientHeight }) => {
  return (
    <section id='blogs' className='w-full relative mt-96 select-none'>
      <div className='section-container py-16 flex flex-col justify-center'>
        <div className='flex flex-col'>
          <div className='text-center mb-6'>
            <p className='uppercase tracking-widest text-gray-light-1'>BLOGS</p>
            <h2 className='text-5xl mt-2 font-medium text-gradient w-fit mx-auto'>
              Latest Writing
            </h2>
          </div>
          <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {BLOGS.slice(0, 3).map((blog, i) => (
              <BlogCard key={blog.title + i} blog={blog} index={i} />
            ))}
          </div>
          <div className='mt-6 text-center'>
            <div className='staggered-reveal pt-4'>
              {/* <Link href='/blogs'> */}
              <Button href='/blogs' classes='link' type='primary'>
                View All Blogs
              </Button>
              {/* </Link> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blogs;
