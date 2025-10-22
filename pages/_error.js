import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Error = ({ statusCode }) => {
  const router = useRouter();

  useEffect(() => {
    // Auto refresh after 3 seconds
    const timer = setTimeout(() => {
      router.reload();
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[#efc041] mb-4">
          {statusCode ? `Error ${statusCode}` : 'An Error Occurred'}
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Something went wrong. The page will refresh automatically...
        </p>
        <div className="animate-spin w-8 h-8 border-4 border-[#efc041] border-t-transparent rounded-full mx-auto"></div>
      </div>
    </div>
  );
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
