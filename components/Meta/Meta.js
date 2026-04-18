import Head from 'next/head';
import { METADATA } from '../../constants';

const Meta = ({ title, description, image, url, type = 'website' }) => {
  const pageTitle = title ? `${title} | ${METADATA.author}` : METADATA.title;
  const pageDescription = description || METADATA.description;
  const pageImage = image || METADATA.image;
  const pageUrl = url || METADATA.siteUrl;

  // JSON-LD Structured Data for Person
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Anas Pirzada',
    jobTitle: 'Full Stack Developer & AI Expert',
    description:
      'Full Stack Developer and AI Expert specializing in React.js, Next.js, and Machine Learning',
    url: METADATA.siteUrl,
    image: METADATA.image,
    sameAs: [
      'https://www.linkedin.com/in/muhammadanaspirzada/',
      'https://github.com/AnasPirzada',
      'https://www.instagram.com/anas_pirzada1/',
      'https://x.com/Anas_Pirzada1',
    ],
    knowsAbout: [
      'Full Stack Development',
      'Frontend Development',
      'AI Development',
      'Machine Learning',
      'React.js',
      'Next.js',
      'JavaScript',
      'TypeScript',
      'Node.js',
      'Python',
      'Laravel',
      'Django',
      'Firebase',
      'MongoDB',
      'MySQL',
    ],
    alumniOf: 'The Islamia University of Bahawalpur',
    email: 'anaspirzadaiub@gmail.com',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'Pakistan',
    },
  };

  // JSON-LD Structured Data for Website
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Portfolio',
    alternateName: 'Anas Pirzada Portfolio',
    url: METADATA.siteUrl,
    description: METADATA.description,
    author: {
      '@type': 'Person',
      name: 'Anas Pirzada',
    },
    publisher: {
      '@type': 'Person',
      name: 'Anas Pirzada',
    },
  };

  // JSON-LD Structured Data for Organization
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Anas Pirzada - Full Stack Developer & AI Expert',
    url: METADATA.siteUrl,
    logo: METADATA.image,
    description: METADATA.description,
    founder: {
      '@type': 'Person',
      name: 'Anas Pirzada',
    },
    sameAs: [
      'https://www.linkedin.com/in/muhammadanaspirzada/',
      'https://github.com/AnasPirzada',
      'https://www.instagram.com/anas_pirzada1/',
      'https://x.com/Anas_Pirzada1',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'anaspirzadaiub@gmail.com',
      contactType: 'Professional Services',
    },
  };

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={METADATA.keywords} />
      <meta name="robots" content="index,follow" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content={METADATA.language} />
      <meta name="author" content={METADATA.author} />
      <meta name="theme-color" content={METADATA.themeColor} />
      <meta httpEquiv="content-language" content="en" />

      {/* Additional site identification */}
      <meta name="application-name" content="Portfolio" />
      <meta name="apple-mobile-web-app-title" content="Portfolio" />
      <meta name="msapplication-TileTitle" content="Portfolio" />

      {/* Canonical URL */}
      <link rel="canonical" href={pageUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:image:secure_url" content={pageImage} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:site_name" content="Portfolio" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:alt" content={pageTitle} />
      {type === 'article' && (
        <>
          <meta property="article:author" content={METADATA.author} />
          <meta
            property="article:published_time"
            content={new Date().toISOString()}
          />
        </>
      )}

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={pageTitle} />
      <meta property="twitter:description" content={pageDescription} />
      <meta property="twitter:site" content={METADATA.twitterHandle} />
      <meta name="twitter:creator" content={METADATA.twitterHandle} />
      <meta property="twitter:url" content={pageUrl} />
      <meta property="twitter:image" content={pageImage} />
      <meta
        property="twitter:image:alt"
        content={`${METADATA.author} - Full Stack Developer & AI Expert`}
      />

      {/* Favicons */}
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="icon" type="image/x-icon" href="/favicon.svg" />
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon.svg" />
      <meta name="msapplication-TileColor" content="#c8860a" />
      <link rel="manifest" href="/manifest.json" />

      {/* RSS Feed */}
      <link
        rel="alternate"
        type="application/rss+xml"
        title={`${METADATA.author} - RSS Feed`}
        href={`${METADATA.siteUrl}/rss.xml`}
      />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </Head>
  );
};

export default Meta;
