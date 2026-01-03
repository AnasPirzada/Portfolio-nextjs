import Cursor from '@/components/Cursor/Cursor';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import Menu from '@/components/Header/Menu/Menu';
import Meta from '@/components/Meta/Meta';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BLOGS, MENULINKS, METADATA } from '../../constants';

export async function getStaticPaths() {
  const paths = BLOGS.map(b => ({ params: { slug: b.slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const blog = BLOGS.find(b => b.slug === params.slug) || null;
  return { props: { blog } };
}

export default function BlogDetail({ blog }) {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const { orientation } = window;
    const result =
      typeof orientation === 'undefined' &&
      navigator.userAgent.indexOf('IEMobile') === -1;
    setIsDesktop(result);
  }, []);

  // Calculate reading time (rough estimate: 200 words per minute)
  const wordCount = blog.content?.split(/\s+/).length || 0;
  const readingTime = Math.ceil(wordCount / 200);

  // SEO meta data for this blog post
  const blogTitle = blog.title;
  const blogDescription =
    blog.description ||
    `${blog.title} - A technical article by Anas Pirzada, Full Stack Developer & AI Expert.`;
  const blogUrl = `${METADATA.siteUrl}/blog/${blog.slug}`;
  const blogImage = blog.image || METADATA.image;

  // Article Schema for structured data
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: blogTitle,
    description: blogDescription,
    image: blogImage,
    author: {
      '@type': 'Person',
      name: 'Anas Pirzada',
      url: METADATA.siteUrl,
      sameAs: [
        'https://www.linkedin.com/in/muhammadanaspirzada/',
        'https://github.com/AnasPirzada',
        'https://x.com/Anas_Pirzada1',
      ],
    },
    publisher: {
      '@type': 'Person',
      name: 'Anas Pirzada',
      url: METADATA.siteUrl,
    },
    datePublished: blog.date,
    dateModified: blog.date,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': blogUrl,
    },
    url: blogUrl,
    wordCount: wordCount,
    timeRequired: `PT${readingTime}M`,
    articleSection: 'Technology',
    keywords:
      blog.tags?.join(', ') || 'web development, programming, technology',
  };

  return (
    <>
      <Meta
        title={blogTitle}
        description={blogDescription}
        image={blogImage}
        url={blogUrl}
        type='article'
      />

      {/* Article Schema */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <Header>
        <Menu />
      </Header>
      <Cursor isDesktop={isDesktop} />
      <main className='section-container pt-24 pb-16'>
        {/* Breadcrumb Navigation */}
        <nav className='mb-6' aria-label='Breadcrumb'>
          <ol className='flex items-center space-x-2 text-sm'>
            <li>
              <Link
                href='/'
                className='text-gray-400 hover:text-white transition-colors'
              >
                Home
              </Link>
            </li>
            <li className='text-gray-500'>›</li>
            <li>
              <Link
                href={`/#${
                  MENULINKS.find(m => m.ref === 'blogs') ? 'blogs' : ''
                }`}
                className='text-gray-400 hover:text-white transition-colors'
              >
                Blogs
              </Link>
            </li>
            <li className='text-gray-500'>›</li>
            <li className='text-white' aria-current='page'>
              {blogTitle}
            </li>
          </ol>
        </nav>

        <article itemScope itemType='https://schema.org/Article'>
          <header className='mb-8'>
            <h1
              className='text-4xl md:text-5xl font-semibold mb-4'
              itemProp='headline'
            >
              {blogTitle}
            </h1>
            <div className='flex flex-wrap items-center gap-4 text-gray-400 text-sm'>
              <time dateTime={blog.date} itemProp='datePublished'>
                {new Date(blog.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <span>•</span>
              <span>{readingTime} min read</span>
              <span>•</span>
              <span
                itemProp='author'
                itemScope
                itemType='https://schema.org/Person'
              >
                <span itemProp='name'>Anas Pirzada</span>
              </span>
            </div>

            {/* Tags */}
            {blog.tags && (
              <div className='mt-4 flex flex-wrap gap-2'>
                {blog.tags.map(tag => (
                  <span
                    key={tag}
                    className='px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300 border border-white/20'
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          <div
            className='prose prose-invert max-w-none mt-8'
            itemProp='articleBody'
            dangerouslySetInnerHTML={{
              __html: blog.content?.replace(/\n/g, '<br/>'),
            }}
          />
        </article>

        {/* Author Bio Section */}
        <section className='mt-12 p-6 bg-white/5 rounded-2xl border border-white/10'>
          <div className='flex items-start gap-4'>
            <div className='w-16 h-16 bg-gradient-to-br from-[#eeba2c] to-[#efc041] rounded-full flex items-center justify-center text-black font-bold text-xl'>
              AP
            </div>
            <div>
              <h3 className='text-xl font-semibold text-white mb-2'>
                About the Author
              </h3>
              <p className='text-gray-300 leading-relaxed'>
                Anas Pirzada is a Full Stack Developer and AI Expert with 2+
                years of experience in building scalable web applications and
                AI-powered solutions. He specializes in React.js, Next.js, and
                Machine Learning integration.
              </p>
              <div className='mt-4 flex gap-4'>
                <Link
                  href='https://www.linkedin.com/in/muhammadanaspirzada/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-[#eeba2c] hover:text-[#efc041] transition-colors'
                >
                  LinkedIn
                </Link>
                <Link
                  href='https://github.com/AnasPirzada'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-[#eeba2c] hover:text-[#efc041] transition-colors'
                >
                  GitHub
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
