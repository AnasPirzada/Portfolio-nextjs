export const METADATA = {
  author: 'Anas Pirzada',
  title: 'Portfolio',
  description:
    'Anas Pirzada is an experienced Web Developer specializing in React.js, Next.js, and crafting elegant, user-focused digital solutions. With expertise in frontend and backend technologies, he transforms ideas into impactful web experiences.',
  siteUrl: 'https://www.AnasPirzada.me/',
  twitterHandle: '@Anas_Pirzada1',
  keywords: [
    'Anas Pirzada',
    'Frontend Engineer',
    'React Native Developer',
    'Software Engineer',
    'Portfolio',
    'Devfolio',
    'React.js Developer',
    'Next.js Specialist',
    'Full-Stack Developer',
    'Portfolio',
    'Frontend Engineer',
    'Modern Web Solutions',
    'Software Engineer',
    'Folio',
  ].join(', '),
  image:
    'https://res.cloudinary.com/di6tubsu9/image/upload/v1737926697/jb3dfhw9wxmozff6j56w.png',
  language: 'English',
  themeColor: '#000000',
};

export const MENULINKS = [
  {
    name: 'Home',
    ref: 'home',
  },
  {
    name: 'Skills',
    ref: 'skills',
  },
  {
    name: 'Projects',
    ref: 'projects',
  },
  {
    name: 'Education',
    ref: 'education',
  },
  {
    name: 'Work',
    ref: 'work',
  },
  {
    name: 'Blogs',
    ref: 'blogs',
  },
  {
    name: 'Contact',
    ref: 'contact',
  },
];

export const TYPED_STRINGS = [
  'A dedicated Next.js Developer',
  'I craft modern and responsive web solutions',
  'Turning ideas into impactful digital experiences',
  'Mastering the art of seamless UI/UX design',
];

export const SOCIAL_LINKS = [
  {
    name: 'mail',
    url: 'mailto: anaspirzadaiub@gmail.com',
  },
  {
    name: 'linkedin',
    url: 'https://www.linkedin.com/in/anas-pirzada/',
  },
  {
    name: 'github',
    url: 'https://github.com/AnasPirzada',
  },
  {
    name: 'instagram',
    url: 'https://www.instagram.com/anas_pirzada1/',
  },
  {
    name: 'twitter',
    url: 'https://x.com/Anas_Pirzada1',
  },
];

export const SKILLS = {
  languagesAndTools: [
    'html',
    'css',
    'javascript',
    'typescript',
    'sass',
    'nodejs',
    // 'webpack',
    'vite',
    'firebase',
    'figma',
    'emailjs',
    // 'tanstack-query',
  ],
  librariesAndFrameworks: [
    'react',
    'redux',
    'nextjs',
    'tailwindcss',
    'styledcomponents',
    'antdesign',
    'framer-motion',
    // 'chakra-ui',
    'gsap',
    'laravel',
    'django',
  ],
  databases: ['mysql', 'mongodb'],
  other: [
    'git',
    //  'sanity-io',
    'postman',
  ],
};

export const PROJECTS = [
  {
    name: 'TeklabSpace',
    heroSection: '/projects/HeroSections/teklabspace.webp',
    image: '/projects/teklabspace.webp',
    blurImage: '/projects//teklabspace.webp',
    description:
      'Teklabspace is the ultimate bridge between cutting-edge companies and the global hacker community—our bug bounty and vulnerability disclosure platform empowers organizations to proactively identify and resolve vulnerabilities before attackers do.',
    gradient: ['#B70AC1', '#292F43'],
    url: 'https://teklabspace-git-main-anaspirzadas-projects.vercel.app/',
    tech: ['nextjs', 'tailwindcss', 'emailjs', 'framer-motion', 'gsap'],
  },
  {
    name: ' Investment Learning',
    heroSection: '/projects/HeroSections/InvestmentLearning.webp',
    image: '/projects/investment-learning.webp',
    blurImage: '/projects/blur/investment-learning-blur.webp',
    description: 'Investment Learning using ReactJS + Tailwind CSS 🛏️',
    gradient: ['#7030a0', '#FFFFFF'],
    url: 'https://investlearningltd.com/',
    tech: ['react', 'tailwindcss', 'emailjs', 'nodejs'],
  },
  {
    name: 'Al-Quran Digital Institute',
    heroSection: '/projects/HeroSections/AlQuran.webp',
    image: '/projects/AlQuran.webp',
    blurImage: '/projects/AlQuran.webp',
    description:
      'One-on-one Quran classes with personalized instruction in Quran reading, memorization, and tafseer.',
    gradient: ['#1C8E5A', '#FFD050'],

    url: 'https://alqurandigitalinstitute.com/',
    tech: ['nextjs', 'tailwindcss', 'emailjs'],
  },
  {
    name: 'IQ Demie',
    heroSection: '/projects/HeroSections/IQDemie.webp',
    image: '/projects/iqdemie.webp',
    blurImage: '/projects/blur/iqdemie.webp',
    description: 'iQdemie - Intelligence and Learning Assessment',
    gradient: ['#1a9aff', '#FFFFFF'],
    url: 'https://iqdemie.com/',
    tech: ['react', 'nodejs', 'tailwindcss', 'emailjs'],
  },
  {
    name: 'Black Water Ventures',
    heroSection: '/projects/HeroSections/Blackwater.webp',
    image: '/projects/blackwatter.webp',
    blurImage: '/projects/blur/blackwatter.webp',
    description:
      'Real Estate sector Specialist Housing for Vulnerable Communities',
    gradient: ['#000000', '#696969'],
    url: 'https://blackwatter.netlify.app/',
    tech: ['react', 'nodejs', 'tailwindcss', 'emailjs'],
  },
  {
    name: 'Support Healthier Community',
    heroSection: '/projects/HeroSections/SupportHealthier.webp',
    image: '/projects/supporthealthier.webp',
    blurImage: '/projects/blur/supporthealthier.webp',
    description:
      'Empowers individuals to build a self-reliant, and united community.',
    gradient: ['#2aaa33', '#FFFFFF'],
    url: 'https://www.supporthealthier.org/',
    tech: ['react', 'tailwindcss'],
  },
  {
    name: 'Sleek Assured',
    heroSection: '/projects/HeroSections/SleekAssured.webp',
    image: '/projects/sleek-assured.webp',
    blurImage: '/projects/blur/sleek-assured.webp',
    description:
      'Affordable home removals, offering top-quality service and the best rates guaranteed',
    gradient: ['#010066', '#FFFFFF'],
    url: 'https://sleek-assured.netlify.app/',
    tech: ['react', 'tailwindcss', 'nodejs', 'emailjs'],
  },
];

export const WORK_CONTENTS = {
  Createex: [
    {
      title: 'Createex',
      description:
        'A Journey of Growth - From Learning to Leading in Modern Web Development',
      content: (
        <div className='h-full w-full flex items-center justify-center text-white px-4'>
          Empowering Ideas, Shaping the Future of Digital Innovation
        </div>
      ),
    },
    {
      title: 'The First Step',
      description:
        'At Createex, my journey began with learning React.js, mastering the fundamentals of frontend development. I built engaging and interactive UIs, laying the foundation for a successful career in web development.',
      content: (
        <div className='h-full w-full flex items-center justify-center text-white px-4'>
          Aspiring React Developer
        </div>
      ),
    },
    {
      title: 'Leveling Up',
      description:
        'Transitioning to a Junior React.js Developer role, I honed my skills in crafting modern web applications using Next.js, React.js, and Firebase. I contributed to diverse projects, integrating APIs and ensuring robust, scalable solutions.',
      content: (
        <div className='h-full w-full flex items-center justify-center text-white px-4'>
          Junior React.js Developer
        </div>
      ),
    },
    {
      title: 'Leading the Way',
      description:
        'As a Team Lead, I guided a team of talented developers, steering projects involving 3D web applications, Next.js, Laravel, and Firebase. My leadership ensured timely deliveries and high-quality outputs, setting a benchmark for excellence.',
      content: (
        <div className='h-full w-full flex items-center justify-center text-white px-4'>
          Team Lead
        </div>
      ),
    },
    {
      title: 'Pioneering Innovation in 3D Web',
      description:
        'I ventured into the realm of 3D web development, creating immersive digital experiences that captivated users. Leveraging modern libraries and frameworks, I pushed the boundaries of what web applications can achieve.',
      content: (
        <div className='h-full w-full flex items-center justify-center text-white px-4'>
          Innovator in 3D Web Development
        </div>
      ),
    },
    {
      title: 'Mastering the Stack',
      description:
        'Over the years, I built a versatile portfolio of projects, utilizing technologies like React.js, Next.js, Laravel, and Firebase. From interactive dashboards to scalable backends, my work exemplifies innovation and technical expertise.',
      content: (
        <div className='h-full w-full flex items-center justify-center text-white px-4'>
          Full-Stack Innovator
        </div>
      ),
    },
  ],

  TakhleeqSoft: [
    {
      title: 'TakhleeqSoft',
      description:
        'TakhleeqSoft is a forward-thinking startup led by a visionary and highly talented team. As a Senior React.js and Laravel Developer, I had the privilege of working closely with them to deliver impactful and innovative projects, driving success through collaboration and expertise.',
      content: (
        <div className='h-full w-full flex items-center justify-center text-white px-4'>
          Empowering Growth Through Collaboration and Innovation
        </div>
      ),
    },

    {
      title: 'Starting Strong',
      description:
        'I joined TakhleeqSoft as a Senior Developer, taking charge of data integration APIs for a major project. My role involved seamlessly connecting multiple data sources, ensuring data accuracy, and optimizing API performance to drive project success.',
      content: (
        <div className='h-full w-full flex items-center justify-center text-white px-4'>
          Senior Developer
        </div>
      ),
    },
    {
      title: 'Innovation',
      description:
        'I spearheaded the development of Q-Rate, their flagship product, a voice-based applicant screening platform. This project combined advanced technical solutions with user-focused design, enhancing engagement and increasing daily traffic. Additionally, I introduced an error-logging and bug reporting system, significantly reducing user-reported bugs and improving the platform’s reliability.',
      content: (
        <div className='h-full w-full flex items-center justify-center text-white px-4'>
          Innovator & Problem Solver
        </div>
      ),
    },
    {
      title: 'Driving Results with Data Integration',
      description:
        'Leveraging my expertise in API development and data management, I optimized data workflows, improved application performance, and contributed to achieving key project milestones. My efforts ensured the platform could handle scale and complexity, creating a seamless user experience.',
      content: (
        <div className='h-full w-full flex items-center justify-center text-white px-4'>
          Data Integration Expert
        </div>
      ),
    },
  ],
};

export const EDUCATION_CONTENTS = [
  {
    title: 'Bachelor of Computer Science',
    institute: 'University of Technology',
    year: '2018 – 2022',
    description:
      'Completed a four-year degree focused on algorithms, data structures, and full‑stack development.',
    content: (
      <div className='h-full w-full flex items-center justify-center text-white px-4'>
        2018 - 2022
      </div>
    ),
  },
  {
    title: 'Intermediate in Pre-Engineering',
    institute: 'Government College',
    year: '2016 – 2018',
    description:
      'Studied core subjects of mathematics and physics, laying the foundation for my technical journey.',
    content: (
      <div className='h-full w-full flex items-center justify-center text-white px-4'>
        2016 - 2018
      </div>
    ),
  },
];

export const CERTIFICATION_CONTENTS = [
  {
    title: 'Frontend Development Certification',
    institute: 'Coursera',
    year: '2023',
    description:
      'Mastered advanced frontend concepts including React.js, Next.js, and Tailwind CSS.',
    content: (
      <div className='h-full w-full flex items-center justify-center text-white px-4'>
        2023
      </div>
    ),
  },
  {
    title: 'React & Next.js Advanced Training',
    institute: 'Udemy',
    year: '2024',
    description:
      'Hands‑on training in React Hooks, Redux, and server‑side rendering with Next.js.',
    content: (
      <div className='h-full w-full flex items-center justify-center text-white px-4'>
        2024
      </div>
    ),
  },
];

export const GTAG = 'G-5HCTL2TJ5W';

export const BLOGS = [
  {
    slug: 'animating-react-uis-with-gsap-and-framer-motion',
    title: 'Animating React UIs with GSAP and Framer Motion',
    description:
      'A practical guide to combining GSAP timelines with Framer Motion for delightful micro-interactions.',
    date: '2025-01-12',
    content: `\n<p><strong>Why combine GSAP and Framer Motion?</strong></p>\n<p>GSAP excels at complex timeline choreography and precise control; Framer Motion brings a declarative model that feels at home in React. Use GSAP for sequences and physics-like motion, use Framer Motion for layout-aware transitions and gestures.</p>\n<p>Example timeline:</p>\n<pre><code>const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });\ntl.from('.hero', { y: 40, opacity: 0, duration: 0.6 })\n  .from('.cta', { scale: 0.8, opacity: 0 }, '-=0.3');</code></pre>\n<p>Then wrap interactive bits with <code>motion.div</code>:</p>\n<pre><code>&lt;motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}&gt;Click&lt;/motion.button&gt;</code></pre>\n<p><img src='/projects/HeroSections/teklabspace.webp' alt='example' /></p>`,
    tags: ['react', 'gsap', 'framer-motion'],
  },
  {
    slug: 'nextjs-performance-checklist-2025',
    title: 'Next.js Performance Checklist for 2025',
    description:
      'Actionable steps to keep your Next.js apps fast: images, code-splitting, RSC tips and more.',
    date: '2025-02-05',
    content: `\n<p><strong>Key tips</strong></p>\n<ul>\n<li>Optimize images with next/image or static WebP</li>\n<li>Code split and lazy load non-critical UI</li>\n<li>Cache aggressively at the edge</li>\n<li>Leverage RSC for heavy data UI</li>\n</ul>\n<p><img src='/projects/HeroSections/AlQuran.webp' alt='perf' /></p>`,
    tags: ['nextjs', 'performance'],
  },
  {
    slug: 'designing-a-consistent-design-system-with-tailwind',
    title: 'Designing a Consistent Design System with Tailwind',
    description:
      'How to leverage tokens and utilities to ship consistent, themeable UI components.',
    date: '2025-03-01',
    content: `\n<p><strong>Tokens first</strong></p>\n<p>Define colors, radii, and spacing in Tailwind config and compose utilities into primitives. Keep variants minimal and consistent.</p>\n<p><img src='/projects/HeroSections/SleekAssured.webp' alt='design-system' /></p>`,
    tags: ['tailwindcss', 'design-system'],
  },
  {
    slug: 'writing-accessible-animations',
    title: 'Writing Accessible Animations',
    description:
      'Reduce motion for users that need it and keep interactions inclusive without losing delight.',
    date: '2025-03-20',
    content: `\n<p><strong>Respect prefers-reduced-motion</strong></p>\n<p>Provide fallbacks and skip long parallax effects. Keep focus states visible and avoid motion that obscures context.</p>\n<p><img src='/projects/HeroSections/IQDemie.webp' alt='a11y' /></p>\n<pre><code>@media (prefers-reduced-motion: reduce) {\n  .parallax {\n    transform: none !important;\n    animation: none !important;\n  }\n}</code></pre>`,
    tags: ['a11y', 'animation'],
  },
];
