import Head from 'next/head';
import { METADATA } from '../../constants';

const Meta = ({ title, description, image, url, type = 'website' }) => {
  const pageTitle = title ? `${title} | ${METADATA.author}` : METADATA.title;
  const pageDescription = description || METADATA.description;
  const pageImage = image || METADATA.image;
  const pageUrl = url || METADATA.siteUrl;

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${METADATA.siteUrl}#person`,
    name: 'Anas Pirzada',
    jobTitle: 'Full Stack Developer for Hire — Web App Fixes & Custom Builds',
    description:
      'Anas Pirzada is a full stack developer trusted by 50+ clients worldwide. He fixes broken React/Next.js web apps and builds startup products from scratch. 5★ rated on Fiverr and Upwork. Free 30-minute consultation.',
    url: METADATA.siteUrl,
    image: METADATA.image,
    sameAs: [
      'https://www.linkedin.com/in/anas-pirzada-8a88a23a2/',
      'https://github.com/AnasPirzada',
      'https://www.fiverr.com/users/anas_peerzada',
      'https://www.upwork.com/freelancers/~0199934b87d980c5f6',
      'https://www.instagram.com/anas_pirzada1/',
      'https://x.com/Anas_Pirzada1',
    ],
    knowsAbout: [
      'Web App Development',
      'Bug Fixing & Debugging',
      'Vibe Coding Cleanup',
      'Full Stack Development',
      'Startup MVP Development',
      'React.js',
      'Next.js',
      'Node.js',
      'Python',
      'Django',
      'Laravel',
      'Firebase',
      'MongoDB',
      'MySQL',
      'AI Integration',
      'OpenAI API',
      'REST API Design',
    ],
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'The Islamia University of Bahawalpur',
    },
    email: 'anaspirzadaiub@gmail.com',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'PK',
    },
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Full Stack Web Developer',
      description:
        'Fixes broken web apps and builds custom web applications for clients worldwide. Specializes in React, Next.js, Node.js, and AI integrations.',
      skills:
        'React.js, Next.js, Node.js, Python, Laravel, Django, Firebase, MongoDB, MySQL, OpenAI API',
      estimatedSalary: {
        '@type': 'MonetaryAmountDistribution',
        name: 'Freelance project rate',
        currency: 'USD',
        duration: 'P1H',
        percentile10: 25,
        percentile25: 40,
        median: 60,
        percentile75: 100,
        percentile90: 150,
      },
    },
    makesOffer: [
      {
        '@type': 'Offer',
        name: 'Fix My App',
        description:
          'Debug, audit, and fix broken React/Next.js web applications. Covers bug fixes, performance issues, code cleanup, and deployment problems.',
        price: '149',
        priceCurrency: 'USD',
        priceSpecification: {
          '@type': 'PriceSpecification',
          price: '149',
          priceCurrency: 'USD',
          valueAddedTaxIncluded: false,
          description: 'Starting price — final quote after free consultation',
        },
      },
      {
        '@type': 'Offer',
        name: 'Build My Idea',
        description:
          'Full stack web application development from scratch. UI/UX design, frontend, backend, database, and deployment included.',
        price: '499',
        priceCurrency: 'USD',
        priceSpecification: {
          '@type': 'PriceSpecification',
          price: '499',
          priceCurrency: 'USD',
          valueAddedTaxIncluded: false,
          description: 'Starting price — final quote after free consultation',
        },
      },
      {
        '@type': 'Offer',
        name: 'Scale My Platform',
        description:
          'Add features, improve architecture, integrate AI, and optimize performance for growing web platforms.',
        priceSpecification: {
          '@type': 'PriceSpecification',
          priceCurrency: 'USD',
          description: 'Custom quote based on project scope',
        },
      },
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${METADATA.siteUrl}#website`,
    name: 'Anas Pirzada — Hire Full Stack Developer',
    alternateName: 'Anas Pirzada Portfolio',
    url: METADATA.siteUrl,
    description: METADATA.description,
    author: { '@type': 'Person', name: 'Anas Pirzada' },
    publisher: { '@type': 'Person', name: 'Anas Pirzada' },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${METADATA.siteUrl}?s={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'h2', '.hero-tagline', '#services', '#faq'],
    },
  };

  const professionalServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${METADATA.siteUrl}#service`,
    name: 'Anas Pirzada — Full Stack Developer for Hire',
    url: METADATA.siteUrl,
    logo: METADATA.image,
    image: METADATA.image,
    description:
      'Full stack developer offering web app bug fixes, startup MVP development, and AI integrations worldwide. React, Next.js, Node.js, Python. Available for freelance projects.',
    founder: { '@type': 'Person', name: 'Anas Pirzada' },
    employee: { '@type': 'Person', name: 'Anas Pirzada' },
    areaServed: 'Worldwide',
    availableLanguage: [{ '@type': 'Language', name: 'English' }],
    priceRange: '$$',
    paymentAccepted: 'Credit Card, PayPal, Bank Transfer',
    currenciesAccepted: 'USD',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday', 'Tuesday', 'Wednesday', 'Thursday',
        'Friday', 'Saturday', 'Sunday',
      ],
      opens: '09:00',
      closes: '23:00',
    },
    sameAs: [
      'https://www.linkedin.com/in/anas-pirzada-8a88a23a2/',
      'https://github.com/AnasPirzada',
      'https://www.fiverr.com/users/anas_peerzada',
      'https://www.upwork.com/freelancers/~0199934b87d980c5f6',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'anaspirzadaiub@gmail.com',
      contactType: 'Customer Support',
      availableLanguage: 'English',
      contactOption: 'TollFree',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '50',
      bestRating: '5',
      worstRating: '1',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Web Development Services',
      itemListElement: [
        {
          '@type': 'OfferCatalog',
          name: 'Fix My App',
          description:
            'Bug fixes, performance optimization, and code cleanup for broken or vibe-coded web applications. Starting from $149.',
        },
        {
          '@type': 'OfferCatalog',
          name: 'Build My Idea',
          description:
            'Full stack web application development from scratch — UI/UX design, frontend, backend, database, and deployment. Starting from $499.',
        },
        {
          '@type': 'OfferCatalog',
          name: 'Scale My Platform',
          description:
            'Feature additions, architecture improvements, AI integrations, and performance optimization for existing web apps.',
        },
      ],
    },
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Hire Anas Pirzada as Your Full Stack Developer',
    description:
      'Simple 4-step process to get your web app fixed or built — from free consultation to delivered product.',
    totalTime: 'P1D',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: '149',
    },
    step: [
      {
        '@type': 'HowToStep',
        position: '1',
        name: 'Book a free 30-minute consultation',
        text: 'Use the Calendly link to schedule a free call. Describe your project or problem — no commitment required.',
        url: `${METADATA.siteUrl}#contact`,
      },
      {
        '@type': 'HowToStep',
        position: '2',
        name: 'Receive a clear scope and quote',
        text: 'After the call, you receive a written project scope, timeline, and fixed-price quote within 24 hours.',
        url: `${METADATA.siteUrl}#services`,
      },
      {
        '@type': 'HowToStep',
        position: '3',
        name: 'Development begins',
        text: 'Work starts within 1–2 business days. You receive weekly progress updates and access to a staging environment.',
        url: `${METADATA.siteUrl}#projects`,
      },
      {
        '@type': 'HowToStep',
        position: '4',
        name: 'Delivery, review, and handover',
        text: 'Final delivery includes full source code, deployment, documentation, and a 14-day post-launch support window.',
        url: `${METADATA.siteUrl}#contact`,
      },
    ],
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
      <meta name="application-name" content="Anas Pirzada — Hire Full Stack Developer" />
      <meta name="apple-mobile-web-app-title" content="Anas Pirzada" />
      <meta name="msapplication-TileTitle" content="Anas Pirzada" />
      <meta name="geo.region" content="PK" />
      <meta name="geo.placename" content="Pakistan" />
      <meta name="rating" content="General" />
      <meta name="revisit-after" content="7 days" />

      <link rel="canonical" href={pageUrl} />

      {/* Open Graph */}
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:image:secure_url" content={pageImage} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:site_name" content="Anas Pirzada — Hire Full Stack Developer" />
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
        content={`${METADATA.author} — Fix Broken Web Apps & Build Startup Ideas`}
      />

      {/* Favicons */}
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="icon" type="image/x-icon" href="/favicon.svg" />
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon.svg" />
      <meta name="msapplication-TileColor" content="#c8860a" />
      <link rel="manifest" href="/manifest.json" />

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
    </Head>
  );
};

export default Meta;
