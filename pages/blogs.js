import Header from '@/components/Header/Header';
import Menu from '@/components/Header/Menu/Menu';
import Footer from '@/components/Footer/Footer';
import Cursor from '@/components/Cursor/Cursor';
import { BLOGS } from '../constants';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function BlogsIndex() {
  const [isDesktop, setIsDesktop] = useState(true);
  useEffect(() => {
    const { orientation } = window;
    const result = typeof orientation === 'undefined' &&
      navigator.userAgent.indexOf('IEMobile') === -1;
    setIsDesktop(result);
  }, []);
  const sorted = [...BLOGS].sort((a, b) => new Date(b.date) - new Date(a.date));
  return (
    <>
      <Header>
        <Menu />
      </Header>
      <Cursor isDesktop={isDesktop} />
      <main className='section-container pt-24 pb-16'>
        <h1 className='text-4xl md:text-5xl font-semibold mb-6'>All Blogs</h1>
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {sorted.map(blog => (
            <Link key={blog.slug} href={`/blog/${blog.slug}`} className='block rounded-2xl border border-white/15 bg-gray-dark-2/40 backdrop-blur-md p-5 hover:border-[#eeba2c] transition-all'>
              <p className='text-xs text-gray-400'>{new Date(blog.date).toDateString()}</p>
              <h3 className='text-xl font-semibold mt-1'>{blog.title}</h3>
              <p className='mt-3 text-sm text-gray-300 line-clamp-3'>{blog.description}</p>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}


