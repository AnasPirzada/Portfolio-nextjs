import Header from '@/components/Header/Header';
import Menu from '@/components/Header/Menu/Menu';
import Footer from '@/components/Footer/Footer';
import Cursor from '@/components/Cursor/Cursor';
import { BLOGS, MENULINKS } from '../../constants';
import Link from 'next/link';
import { useEffect, useState } from 'react';

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
    const result = typeof orientation === 'undefined' &&
      navigator.userAgent.indexOf('IEMobile') === -1;
    setIsDesktop(result);
  }, []);
  return (
    <>
      <Header>
        <Menu />
      </Header>
      <Cursor isDesktop={isDesktop} />
      <main className='section-container pt-24 pb-16'>
        <div className='mb-6'>
          <Link href={`/#${MENULINKS.find(m => m.ref === 'blogs') ? 'blogs' : ''}`} className='text-sm text-gray-400 hover:text-white'>
            ← Back to Blogs
          </Link>
        </div>
        <h1 className='text-4xl md:text-5xl font-semibold'>{blog.title}</h1>
        <p className='mt-2 text-gray-400 text-sm'>{new Date(blog.date).toDateString()}</p>
        <article className='prose prose-invert max-w-none mt-8'>
          {/* eslint-disable-next-line react/no-danger */}
          <div dangerouslySetInnerHTML={{ __html: blog.content?.replace(/\n/g, '<br/>') }} />
        </article>
      </main>
      <Footer />
    </>
  );
}


