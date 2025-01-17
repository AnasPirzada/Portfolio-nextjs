export const METADATA = {
  author: 'Anas Pirzada',
  title: 'Portfolio | Anas Pirzada',
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
    'https://res.cloudinary.com/dywdhyojt/image/upload/v1721378510/social-preview.png',
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
    name: 'Work',
    ref: 'work',
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
    // 'tanstack-query',
  ],
  librariesAndFrameworks: [
    'react',
    'redux',
    'nextjs',
    'tailwindcss',
    'styledcomponents',
    'antdesign',
    // 'chakra-ui',
    'Laravel',
    'django',
  ],
  databases: ['mysql', 'mongodb'],
  other: [
    'git',
    ,
    //  'sanity-io'
    'Postman',
  ],
};

export const PROJECTS = [
  {
    name: 'Airbnb',
    image: '/projects/airbnb.webp',
    blurImage: '/projects/blur/airbnb-blur.webp',
    description: 'Airbnb UI clone using NextJS + Tailwind CSS 🛏️',
    gradient: ['#F14658', '#DC2537'],
    url: 'https://shubh73-airbnb.vercel.app/',
    tech: ['react', 'nextjs', 'tailwindcss', 'mapbox'],
  },
  {
    name: 'Medium',
    image: '/projects/medium.webp',
    blurImage: '/projects/blur/medium-blur.webp',
    description: 'Medium UI clone using NextJS + Tailwind CSS ✍🏻',
    gradient: ['#FFA62E', '#EA4D2C'],
    url: 'https://shubh73-medium.vercel.app/',
    tech: ['typescript', 'react', 'nextjs', 'tailwindcss', 'sanity.io'],
  },
  {
    name: 'Inshorts',
    image: '/projects/inshorts.webp',
    blurImage: '/projects/blur/airbnb-blur.webp',
    description:
      'Conversational Voice Controlled React News Application using Alan AI 🎙',
    gradient: ['#000066', '#eeba2c'],
    url: 'https://shubh73-inshorts.netlify.app/',
    tech: ['react', 'chakra-ui', 'alan'],
  },
  {
    name: 'Tesla',
    image: '/projects/tesla.webp',
    blurImage: '/projects/blur/tesla-blur.webp',
    description: 'A Tesla React Native App 🏎️',
    gradient: ['#142D46', '#2E4964'],
    url: 'https://github.com/shubh73/tesla',
    tech: ['react'],
  },
];

// export const WORK = [
//   {
//     id: 1,
//     company: "Createex",
//     title: "Frontend Developer",
//     location: "Bangalore, Karnataka",
//     range: "December - Current",
//     responsibilities: [
//       "Led creation of a captivating cross-platform e-commerce solution.",
//       "Enhanced UX with gamification and personalized push notifications ensuring an ever-improving shopping journey.",
//       "The app boasts a DAU base of 32k and an extensive MAU count of 180k.",
//     ],
//     url: "https://myCreateex.io/",
//     video: "/work/Createex.mp4",
//   },
//   {
//     id: 2,
//     company: "TakhleeqSoft",
//     title: "Frontend Developer Intern",
//     location: "Goa",
//     range: "May - October 2022",
//     responsibilities: [
//       "Built their flagship product Q-Rate, a voice-based applicant screening platform.",
//       "Developed pixel-perfect responsive web applications achieving daily traffic of 1000-2000 users.",
//       "Successfully rolled out an error-logging and bug reporting system that cut user-reported bugs by 30%.",
//     ],
//     url: "https://www.TakhleeqSoft.jobs/",
//     video: "/work/TakhleeqSoft.mp4",
//   },
//   {
//     id: 3,
//     company: "Ride2Future",
//     title: "Web Developer Intern",
//     location: "Bangalore, Karnataka",
//     range: "September - December 2021",
//     responsibilities: [
//       "Led the Full Stack revamp on the Admin Portal.",
//       "Developed app integration with REST APIs, Google Maps, User Auth, Stripe and other libraries.",
//       "Implemented CRUD features for all the services and providers.",
//     ],
//     url: "https://Ride2Future.com/",
//     video: "/work/Ride2Future.mp4",
//   },
// ];

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
      title: 'The First Step: Learning React.js',
      description:
        'At Createex, my journey began with learning React.js, mastering the fundamentals of frontend development. I built engaging and interactive UIs, laying the foundation for a successful career in web development.',
      content: (
        <div className='h-full w-full flex items-center justify-center text-white px-4'>
          Aspiring React Developer
        </div>
      ),
    },
    {
      title: 'Leveling Up: Junior React.js Developer',
      description:
        'Transitioning to a Junior React.js Developer role, I honed my skills in crafting modern web applications using Next.js, React.js, and Firebase. I contributed to diverse projects, integrating APIs and ensuring robust, scalable solutions.',
      content: (
        <div className='h-full w-full flex items-center justify-center text-white px-4'>
          Junior React.js Developer
        </div>
      ),
    },
    {
      title: 'Leading the Way: Team Lead',
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
      title: 'Takhleeq Soft',
      description:
        'TakhleeqSoft is a forward-thinking startup led by a visionary and highly talented team. As a Senior React.js and Laravel Developer, I had the privilege of working closely with them to deliver impactful and innovative projects, driving success through collaboration and expertise.',
      content: (
        <div className='h-full w-full flex items-center justify-center text-white px-4'>
          Empowering Growth Through Collaboration and Innovation
        </div>
      ),
    },

    {
      title: 'Starting Strong: Senior Developer Role',
      description:
        'I joined TakhleeqSoft as a Senior Developer, taking charge of data integration APIs for a major project. My role involved seamlessly connecting multiple data sources, ensuring data accuracy, and optimizing API performance to drive project success.',
      content: (
        <div className='h-full w-full flex items-center justify-center text-white px-4'>
          Senior Developer
        </div>
      ),
    },
    {
      title: 'Innovation: Building Q-Rate',
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

export const GTAG = 'G-5HCTL2TJ5W';
