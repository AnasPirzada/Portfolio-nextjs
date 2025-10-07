import Meta from '@/components/Meta/Meta';
import { GoogleAnalytics } from '@next/third-parties/google';
import { GTAG } from 'constants';
import { calibre, jetbrains_mono } from 'public/fonts';
import '../styles/globals.css';
import '../styles/globals.scss';

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Meta />
      <main
        className={`${calibre.variable} font-sans ${jetbrains_mono.variable} font-mono`}
      >
        <Component {...pageProps} />
        <GoogleAnalytics gaId={GTAG} />
      </main>
    </>
  );
};

export default App;
