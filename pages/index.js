import About1 from '@/components/About/About1';
import Blogs from '@/components/Blogs/index';
import Collaboration from '@/components/Collaboration/Collaboration';
import Contact from '@/components/Contact/Contact';
import Cursor from '@/components/Cursor/Cursor';
import EducationandCertification from '@/components/EducationandCertification/index';
import TagLine from '@/components/EducationandCertification/Tag';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import Menu from '@/components/Header/Menu/Menu';
import Hero from '@/components/Hero/Hero';
import ProgressIndicator from '@/components/ProgressIndicator/ProgressIndicator';
import Projects from '@/components/Projects/Projects';
import Resume from '@/components/Resume/Resume';
import Skills from '@/components/Skills/Skills';
import SkipToContent from '@/components/SkipToContent/SkipToContent';
import Work from '@/components/Work/Work';
import { useDevice } from '@/contexts/DeviceContext';
import { displayFancyLogs } from '@/utils/log';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger);
gsap.config({ nullTargetWarn: false });

function Home() {
  const device = useDevice();

  useEffect(() => {
    displayFancyLogs();
  }, []);

  return (
    <>
      <SkipToContent />
      <Header>
        <Menu />
      </Header>
      <ProgressIndicator />
      <Cursor isDesktop={device.isDesktop} />
      <main className="flex flex-col" id="home" tabIndex={-1}>
        <div
          role="img"
          className="text-gray-light-1 opacity-10 sm:text-9xl xs:text-8xl inline-block z-0 absolute rotate-90 right-0 md:top-52 xs:top-96"
          style={{ pointerEvents: 'none' }}
        >
          DEV
        </div>
        <div className="fixed top-0 left-0 h-screen w-screen -z-10" />
        <Hero />
        <About1 clientHeight={device.clientHeight} />
        <Skills />
        <Projects
          isDesktop={device.isDesktop}
          clientHeight={device.clientHeight}
        />
        <TagLine />
        <EducationandCertification isDesktop={device.isDesktop} />
        <Work />
        <Blogs clientHeight={device.clientHeight} />
        <Resume />
        <Collaboration clientHeight={device.clientHeight} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default Home;
