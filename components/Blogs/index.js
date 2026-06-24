/* eslint-disable @next/next/no-img-element */
'use client';

import { RevealFade, RevealItem, RevealStagger } from '@/components/ui/Reveal';
import { defaultViewport } from '@/lib/motionVariants';
import { m, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { BLOGS } from '../../constants';
import Button from '../Button/Button';

// Calculate reading time based on content length
const calculateReadingTime = content => {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return minutes;
};

const BlogCard = ({ blog, index }) => {
  const readingTime = calculateReadingTime(blog.content || blog.description);
  const reduce = useReducedMotion();

  return (
    <Link
      href={`/blog/${blog.slug}`}
      className="block rounded-2xl border-2 border-accent-light/20 bg-gradient-to-br from-accent-light/5 to-accent-dark/5 backdrop-blur-md p-6 hover:border-accent-light/40 hover:shadow-lg hover:shadow-accent-light/20 transition-all group md:transition-transform md:duration-300 md:hover:scale-[1.02]"
    >
      <m.div
        initial={reduce ? false : { opacity: 0, y: 22 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={defaultViewport}
        transition={{
          duration: reduce ? 0 : 0.42,
          delay: reduce ? 0 : index * 0.05,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-3 text-xs text-gray-light-4 dark:text-gray-light-2 mb-2">
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
                {new Date(blog.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
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
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {readingTime} min read
              </span>
            </div>
            <h3 className="text-xl font-semibold mt-1 text-gray-dark-1 dark:text-white group-hover:text-accent-dark transition-colors">
              {blog.title}
            </h3>
          </div>
        </div>
        <p className="mt-3 text-sm text-gray-dark-2 dark:text-white/90 line-clamp-3 leading-relaxed">
          {blog.description}
        </p>
        {blog.tags?.length ? (
          <div className="mt-4 flex gap-2 flex-wrap">
            {blog.tags.map(tag => (
              <span
                key={tag}
                className="px-2.5 py-1 text-xs rounded-md bg-accent-dark/10 border border-accent-dark/30 text-accent-dark font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        ) : null}
        <div className="mt-4 flex items-center gap-2 text-accent-dark text-sm font-medium group-hover:gap-3 transition-all">
          <span>Read more</span>
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
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </m.div>
    </Link>
  );
};

const Blogs = ({ clientHeight }) => {
  return (
    <section id="blogs" className="w-full relative select-none">
      <div className="section-container py-10 md:py-20 flex flex-col justify-center">
        <div className="flex flex-col">
          <RevealStagger className="text-left mb-6">
            <RevealItem as={m.div} className="mb-5 flex items-center gap-3 md:mb-6">
              <span className="h-px w-8 bg-accent-light/70" aria-hidden />
              <span className="font-mono text-xs sm:text-sm tracking-wide text-accent-light">
                Writing
              </span>
            </RevealItem>
            <RevealItem
              as={m.h2}
              className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl 2xl:text-6xl w-fit"
            >
              Latest writing
            </RevealItem>
          </RevealStagger>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BLOGS.slice(0, 3).map((blog, i) => (
              <BlogCard key={blog.title + i} blog={blog} index={i} />
            ))}
          </div>
          <div className="mt-6 text-center">
            <RevealFade className="pt-4 inline-block">
              <Button href="/blogs" classes="link" type="primary">
                View All Blogs
              </Button>
            </RevealFade>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blogs;
