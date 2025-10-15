import Head from 'next/head';
import { METADATA } from '../../constants';

const Meta = ({ title, description, image, url, type = 'website' }) => {
  const pageTitle = title ? `${title} | ${METADATA.author}` : METADATA.title;
  const pageDescription = description || METADATA.description;
  const pageImage = image || METADATA.image;
  const pageUrl = url || METADATA.siteUrl;

  // JSON-LD Structured Data for Person
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Anas Pirzada",
    "jobTitle": "Full Stack Developer & AI Expert",
    "description": "Full Stack Developer and AI Expert specializing in React.js, Next.js, and Machine Learning",
    "url": METADATA.siteUrl,
    "image": METADATA.image,
    "sameAs": [
      "https://www.linkedin.com/in/anas-pirzada/",
      "https://github.com/AnasPirzada",
      "https://www.instagram.com/anas_pirzada1/",
      "https://x.com/Anas_Pirzada1"
    ],
    "knowsAbout": [
      "Full Stack Development",
      "Frontend Development",
      "AI Development",
      "Machine Learning",
      "React.js",
      "Next.js",
      "JavaScript",
      "TypeScript",
      "Node.js",
      "Python",
      "Laravel",
      "Django",
      "Firebase",
      "MongoDB",
      "MySQL"
    ],
    "alumniOf": "The Islamia University of Bahawalpur",
    "email": "anaspirzadaiub@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "Pakistan"
    }
  };

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name='description' content={pageDescription} />
      <meta name='keywords' content={METADATA.keywords} />
      <meta name='robots' content='index,follow' />
      <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
      <meta name='language' content={METADATA.language} />
      <meta name='author' content={METADATA.author} />
      <meta name='theme-color' content={METADATA.themeColor} />
      <meta httpEquiv='content-language' content='en' />
      
      {/* Canonical URL */}
      <link rel='canonical' href={pageUrl} />

      {/* Open Graph / Facebook */}
      <meta property='og:locale' content='en_US' />
      <meta property='og:type' content={type} />
      <meta property='og:title' content={pageTitle} />
      <meta property='og:description' content={pageDescription} />
      <meta property='og:image' content={pageImage} />
      <meta property='og:url' content={pageUrl} />
      <meta property='og:site_name' content={`${METADATA.author} - Portfolio`} />
      <meta property='og:image:width' content='1200' />
      <meta property='og:image:height' content='630' />
      <meta property='og:image:alt' content={`${METADATA.author} - Full Stack Developer & AI Expert`} />

      {/* Twitter */}
      <meta property='twitter:card' content='summary_large_image' />
      <meta property='twitter:title' content={pageTitle} />
      <meta property='twitter:description' content={pageDescription} />
      <meta property='twitter:site' content={METADATA.twitterHandle} />
      <meta name='twitter:creator' content={METADATA.twitterHandle} />
      <meta property='twitter:url' content={pageUrl} />
      <meta property='twitter:image' content={pageImage} />
      <meta property='twitter:image:alt' content={`${METADATA.author} - Full Stack Developer & AI Expert`} />

      {/* Favicons */}
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="icon" type="image/x-icon" href="/favicons/favicon.ico" />
      <link
        rel='apple-touch-icon'
        sizes='180x180'
        href='/favicons/apple-touch-icon.png'
      />
      <meta name='msapplication-TileColor' content='#efc041' />
      <link rel='manifest' href='/manifest.json' />

      {/* JSON-LD Structured Data */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
    </Head>
  );
};

export default Meta;
