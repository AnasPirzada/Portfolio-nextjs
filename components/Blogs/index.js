/* eslint-disable @next/next/no-img-element */
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { BLOGS } from '../../constants';

const BlogCard = ({ blog, index }) => {
  return (
    <Link
      href={`/blog/${blog.slug}`}
      className='block rounded-2xl border border-white/15 bg-gray-dark-2/40 backdrop-blur-md p-5 hover:border-[#eeba2c] transition-all'
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
      >
        <div className='flex items-start justify-between gap-3'>
          <div>
            <p className='text-xs text-gray-400'>
              {new Date(blog.date).toDateString()}
            </p>
            <h3 className='text-xl font-semibold mt-1'>{blog.title}</h3>
          </div>
        </div>
        <p className='mt-3 text-sm text-gray-300'>{blog.description}</p>
        {blog.tags?.length ? (
          <div className='mt-4 flex gap-2 flex-wrap'>
            {blog.tags.map(tag => (
              <span
                key={tag}
                className='px-2 py-1 text-xs rounded-md bg-white/5 border border-white/10'
              >
                #{tag}
              </span>
            ))}
          </div>
        ) : null}
      </motion.div>
    </Link>
  );
};

const Blogs = () => {
  return (
    <section
      id='blogs'
      className={`w-full relative select-none${
        clientHeight > 650 ? 'py-80' : 'py-72'
      } section-container`}
    >
      <img
        src='/right-pattern.svg'
        className='absolute hidden right-0 -top-1/4 w-1/12 max-w-xs md:block -z-10'
        loading='lazy'
        height={700}
        width={320}
        alt=''
      />
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
            <Link
              href='/blogs'
              className='primary__button_active inline-flex items-center gap-2 px-5 py-2 rounded-md outline outline-2 outline-[#eeba2c] hover:shadow-[0_0_1rem_rgba(238,186,44,0.6)] transition-all'
            >
              View All Blogs
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blogs;
