import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Custom404 = () => {
  const router = useRouter();

  useEffect(() => {
    // Auto redirect to home after 5 seconds
    const timer = setTimeout(() => {
      router.push('/');
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-[#efc041] mb-4">404</h1>
        <h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-xl text-gray-300 mb-8 max-w-md">
          The page you&apos;re looking for doesn&apos;t exist. Redirecting to home...
        </p>
        <Link 
          href="/"
          className="inline-block px-8 py-3 bg-[#efc041] text-black font-semibold rounded-lg hover:bg-[#eeba2c] transition-colors"
        >
          Go Home
        </Link>
        <div className="mt-4">
          <div className="animate-spin w-6 h-6 border-2 border-[#efc041] border-t-transparent rounded-full mx-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default Custom404;