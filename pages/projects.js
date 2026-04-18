import MainPage from '@/components/AllProjects/projects.js';
import Cursor from '@/components/Cursor/Cursor';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import Menu from '@/components/Header/Menu/Menu';
import Meta from '@/components/Meta/Meta';
import ProgressIndicator from '@/components/ProgressIndicator/ProgressIndicator';
import { METADATA, PROJECTS } from '@/constants';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import Head from 'next/head';
import { useEffect, useState } from 'react';

gsap.registerPlugin(ScrollTrigger);
gsap.config({ nullTargetWarn: false });

export default function ProjectsPage() {
  const [isDesktop, setIsDesktop] = useState(true);
  const [clientHeight, setClientHeight] = useState(0);
  const [clientWidth, setClientWidth] = useState(0);

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

  // SEO data
  const pageTitle = 'Projects Portfolio';
  const pageDescription = `Explore ${PROJECTS.length}+ web development projects by Anas Pirzada built with React.js, Next.js, and modern technologies. Including Agoua Travel, Akunuba, TeklabSpace, Investment Learning, Al-Quran Digital Institute, and more.`;
  const pageUrl = `${METADATA.siteUrl}/projects`;

  // Projects Collection Schema
  const projectsCollectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Portfolio Projects',
    description: pageDescription,
    url: pageUrl,
    author: {
      '@type': 'Person',
      name: 'Anas Pirzada',
      url: METADATA.siteUrl,
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: PROJECTS.map((project, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'CreativeWork',
          name: project.name,
          description: project.description,
          url: project.url,
          image: project.image,
          creator: {
            '@type': 'Person',
            name: 'Anas Pirzada',
          },
        },
      })),
    },
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
        name: 'Projects',
        item: pageUrl,
      },
    ],
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
            __html: JSON.stringify(projectsCollectionSchema),
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
      <ProgressIndicator />
      <Cursor isDesktop={isDesktop} />
      <main className="flex flex-col">
        <MainPage />
      </main>
      <Footer />
    </>
  );
}
