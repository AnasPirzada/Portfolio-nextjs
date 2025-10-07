import MainPage from '@/components/AllProjects/projects.js';
import Cursor from '@/components/Cursor/Cursor';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import Menu from '@/components/Header/Menu/Menu';
import ProgressIndicator from '@/components/ProgressIndicator/ProgressIndicator';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { useEffect, useState } from 'react';
// import { displayFancyLogs } from 'utils/log';

gsap.registerPlugin(ScrollTrigger);
gsap.config({ nullTargetWarn: false });
export default function ProjectsPage() {
  // const [isLoading, setIsLoading] = useState(true);
  const [isDesktop, setIsDesktop] = useState(true);
  const [clientHeight, setClientHeight] = useState(0);
  const [clientWidth, setClientWidth] = useState(0);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 2600);

  //   displayFancyLogs();
  // }, []);

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
      {/* {isLoading ? (
        <Loader />
      ) : ( */}
      <>
        <Header>
          <Menu />
        </Header>
        <ProgressIndicator />
        <Cursor isDesktop={isDesktop} />
        <main className='flex flex-col'>
          <MainPage />{' '}
        </main>
        <Footer />
      </>
      {/* )} */}
    </>
  );
}
