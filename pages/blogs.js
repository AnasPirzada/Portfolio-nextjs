import Cursor from '@/components/Cursor/Cursor';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import Menu from '@/components/Header/Menu/Menu';
import Meta from '@/components/Meta/Meta';
import { useDevice } from '@/contexts/DeviceContext';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import { BLOGS, METADATA } from '../constants';

export default function BlogsIndex() {
  const device = useDevice();

  const sorted = [...BLOGS].sort((a, b) => new Date(b.date) - new Date(a.date));

  // SEO data
  const pageTitle = 'Blog Articles';
  const pageDescription = `Read ${BLOGS.length}+ technical articles about React.js, Next.js, GSAP animations, performance optimization, and modern web development by Anas Pirzada.`;
  const pageUrl = `${METADATA.siteUrl}/blogs`;

  // Blog Listing Schema
  const blogListSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Anas Pirzada Blog',
    description: pageDescription,
    url: pageUrl,
    author: {
      '@type': 'Person',
      name: 'Anas Pirzada',
      url: METADATA.siteUrl,
    },
    blogPost: sorted.map(blog => ({
      '@type': 'BlogPosting',
      headline: blog.title,
      description: blog.description,
      datePublished: blog.date,
      url: `${METADATA.siteUrl}/blog/${blog.slug}`,
      author: {
        '@type': 'Person',
        name: 'Anas Pirzada',
      },
    })),
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: METADATA.siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: pageUrl,
      },
    ],
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <>
      <Meta
        title={pageTitle}
        description={pageDescription}
        url={pageUrl}
        type="website"
      />

      {/* JSON-LD Schemas */}
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(blogListSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema),
          }}
        />
      </Head>

      <Header>
        <Menu />
      </Header>
      <Cursor isDesktop={device.isDesktop && device.isDesktopUa} />
      <main className="section-container pt-24 pb-16">
        {/* Page Header with animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="uppercase tracking-widest text-gray-light-4 dark:text-gray-light-1 text-xs sm:text-sm md:text-base mb-2">
            BLOG
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold mb-4 text-light-text-primary dark:text-white">
            All Blogs
          </h1>
          <p className="text-gray-light-4 dark:text-gray-light-3 mb-8 max-w-2xl">
            Technical articles about React.js, Next.js, animations, and modern
            web development.
          </p>
        </motion.div>

        {/* Blog Grid with stagger animation */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {sorted.map((blog, index) => (
            <motion.div key={blog.slug} variants={cardVariants}>
              <Link
                href={`/blog/${blog.slug}`}
                className="block rounded-2xl border border-gray-light-2 dark:border-white/15 bg-light-surface dark:bg-gray-dark-2/40 backdrop-blur-md p-5 hover:border-accent-dark transition-all duration-300 hover:shadow-lg hover:shadow-accent-dark/10 group h-full"
              >
                <p className="text-xs text-gray-light-4 dark:text-gray-400">
                  {new Date(blog.date).toDateString()}
                </p>
                <h3 className="text-xl font-semibold mt-1 text-light-text-primary dark:text-white group-hover:text-accent-dark transition-colors">
                  {blog.title}
                </h3>
                <p className="mt-3 text-sm text-gray-light-3 dark:text-white/90 line-clamp-3 leading-relaxed">
                  {blog.description}
                </p>
                {blog.tags && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {blog.tags.slice(0, 3).map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-light-1 dark:bg-white/10 rounded-full text-xs text-gray-light-4 dark:text-gray-300"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </main>
      <Footer />
    </>
  );
}
