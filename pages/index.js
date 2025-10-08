import About1 from '@/components/About/About1';
import About2 from '@/components/About/About2';
import Blogs from '@/components/Blogs';
import Collaboration from '@/components/Collaboration/Collaboration';
import Contact from '@/components/Contact/Contact';
import Cursor from '@/components/Cursor/Cursor';
import EducationandCertification from '@/components/EducationandCertification/index';
import TagLine from '@/components/EducationandCertification/Tag';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import Menu from '@/components/Header/Menu/Menu';
import Hero from '@/components/Hero/Hero';
import Loader from '@/components/Loader/Loader';
import ProgressIndicator from '@/components/ProgressIndicator/ProgressIndicator';
import Projects from '@/components/Projects/Projects';
import Skills from '@/components/Skills/Skills';
import Work from '@/components/Work/Work';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { useEffect, useState } from 'react';
import { displayFancyLogs } from 'utils/log';

gsap.registerPlugin(ScrollTrigger);
gsap.config({ nullTargetWarn: false });

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDesktop, setIsDesktop] = useState(true);
  const [clientHeight, setClientHeight] = useState(0);
  const [clientWidth, setClientWidth] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2600);

    displayFancyLogs();
  }, []);

  useEffect(() => {
    const { innerWidth, innerHeight, orientation, history } = window;

    const result =
      typeof orientation === 'undefined' &&
      navigator.userAgent.indexOf('IEMobile') === -1;
    history.scrollRestoration = 'manual';

    setIsDesktop(result);
    setClientHeight(innerHeight);
    setClientWidth(innerWidth);
  }, [isDesktop]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header>
            <Menu />
          </Header>
          <ProgressIndicator />
          <Cursor isDesktop={isDesktop} />
          <main className='flex flex-col'>
            <div
              role='img'
              className='text-gray-light-1 opacity-10 sm:text-9xl xs:text-8xl inline-block -z-10 absolute rotate-90 right-0 md:top-52 xs:top-96'
            >
              DEV
            </div>
            <div className='fixed top-0 left-0 h-screen w-screen -z-1' />
            <Hero />
            <About1 clientHeight={clientHeight} />
            <Skills />
            <About2 clientHeight={clientHeight} />
            <Projects isDesktop={isDesktop} clientHeight={clientHeight} />
            <TagLine clientHeight={clientHeight} />
            <EducationandCertification isDesktop={isDesktop} />
            <Work isDesktop={isDesktop} />
            <Blogs clientHeight={clientHeight} />

            <Collaboration clientHeight={clientHeight} />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}
