export const METADATA = {
  author: 'Anas Pirzada',
  title:
    'Hire Full Stack Developer | Fix Broken Web Apps & Build Startup Ideas | Anas Pirzada',
  description:
    'Trusted by 50+ clients worldwide. Anas Pirzada is a full stack developer who fixes broken React/Next.js apps and builds startup products from scratch. 5★ rated. Free 30-min consultation.',
  siteUrl: 'https://anaspirzada.vercel.app/',
  twitterHandle: '@Anas_Pirzada1',
  keywords: [
    'hire full stack developer',
    'fix broken web app',
    'build startup idea',
    'hire React developer',
    'Next.js developer for hire',
    'freelance React developer',
    'startup MVP development',
    'vibe coding fix',
    'web app debugging',
    'full stack development services',
    'hire web developer',
    'web app development company',
    'Anas Pirzada',
    'React.js developer',
    'Next.js specialist',
    'Node.js developer',
    'Python developer',
    'Laravel developer',
    'Django developer',
    'Firebase developer',
    'MongoDB developer',
    'AI integration developer',
    'fix my app developer',
    'build my app developer',
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
    name: 'Services',
    ref: 'services',
  },
  {
    name: 'Work',
    ref: 'projects',
  },
  {
    name: 'Reviews',
    ref: 'reviews',
  },
  {
    name: 'FAQ',
    ref: 'faq',
  },
  {
    name: 'Contact',
    ref: 'contact',
  },
];

export const TYPED_STRINGS = [
  'I fix broken web apps',
  'I build your startup idea',
  'Your vibe-coded app, cleaned up',
  'React & Next.js developer for hire',
  'From idea to live product',
  'No app too broken to fix',
];

export const SOCIAL_LINKS = [
  {
    name: 'mail',
    url: 'mailto: anaspirzadaiub@gmail.com',
  },
  {
    name: 'linkedin',
    url: 'https://www.linkedin.com/in/muhammadanaspirzada/',
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
    name: 'upwork',
    url: 'https://www.upwork.com/freelancers/~0199934b87d980c5f6?mp_source=share',
  },
  {
    name: 'fiverr',
    url: 'https://www.fiverr.com/anas_peerzada/',
  },
];

export const CALENDLY_URL = 'https://calendly.com/anaspirzada/30min';

export const SERVICES = [
  {
    id: 'fix',
    title: 'Fix My App',
    tagline: 'Your broken app, fixed fast',
    description:
      "Got a vibe-coded mess or a web app that's falling apart? I'll audit, debug, and deliver a clean, stable codebase — fast.",
    features: [
      'Bug diagnosis & root cause analysis',
      'Performance bottleneck removal',
      'Code cleanup & refactoring',
      'Security vulnerability fixes',
      'Deployment & hosting troubleshooting',
    ],
    price: 'From $149',
    badge: 'Most Popular',
    cta: 'Get a Free Quote',
    icon: 'wrench',
  },
  {
    id: 'build',
    title: 'Build My Idea',
    tagline: 'From napkin sketch to live product',
    description:
      "You have the idea — I'll handle everything from UI/UX design to backend, database, and deployment. Ship in weeks, not months.",
    features: [
      'Full stack web application development',
      'UI/UX design & prototyping',
      'REST API & database architecture',
      'Third-party integrations (Stripe, Auth, AI)',
      'Deployment, CI/CD & monitoring setup',
    ],
    price: 'From $499',
    badge: null,
    cta: 'Start Building',
    icon: 'rocket',
  },
  {
    id: 'scale',
    title: 'Scale My Platform',
    tagline: 'Add features without breaking things',
    description:
      "Your MVP is live and growing — now it needs new features, better architecture, and performance tuning to handle real traffic.",
    features: [
      'Feature development & product roadmap',
      'Architecture review & improvements',
      'AI & automation integrations',
      'Performance & load optimization',
      'Ongoing maintenance & support',
    ],
    price: 'Custom quote',
    badge: 'Enterprise',
    cta: 'Book a Call',
    icon: 'chart',
  },
];

export const FAQ = [
  {
    question: 'How much does it cost to fix a broken web app?',
    answer:
      'Fixing a broken web app starts from $149 depending on complexity. Simple bugs or UI issues take 1–3 days. Complex problems — broken auth, database errors, performance issues — usually take 3–7 days. I provide a free 30-minute consultation and a clear quote before starting any work.',
  },
  {
    question: 'How long does it take to build a web app from scratch?',
    answer:
      "A basic MVP can be delivered in 2–4 weeks. A full-featured web application with authentication, dashboards, and integrations takes 4–10 weeks. I'll give you a clear roadmap and weekly progress updates from day one.",
  },
  {
    question: 'What tech stack do you use?',
    answer:
      'I specialize in the modern JavaScript stack: React.js and Next.js for the frontend, Node.js with Express for the backend, and databases like MongoDB, PostgreSQL, and MySQL. I also work with Python (Django, FastAPI), Laravel (PHP), Firebase, and AI integrations (OpenAI, LangChain).',
  },
  {
    question: 'Do you work with existing codebases?',
    answer:
      "Yes — most clients come with existing projects that need fixing or extending. I'm experienced with inheriting messy, undocumented codebases. I'll audit your code, document what's there, then fix or rebuild the problem areas cleanly.",
  },
  {
    question: 'How do we start working together?',
    answer:
      "Book a free 30-minute consultation via the link below. I'll review your app or idea, ask the right questions, and give you an honest assessment with a clear scope and quote. No sales pitch — just practical advice on what your project needs.",
  },
  {
    question: 'Are you available for ongoing maintenance and support?',
    answer:
      'Yes. After delivering your project, I offer retainer packages for maintenance, feature additions, and technical support. Many clients keep me as their dedicated developer for months or years after the initial build.',
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
    'nestjs',
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
    category: 'Web Application',
    year: '2024',
    client: 'TeklabSpace',
    services: [
      'Web Development',
      'UI/UX Design',
      'Frontend Development',
      'Responsive Design',
    ],
    caseStudy: {
      problem:
        'Companies struggled to identify and fix security vulnerabilities efficiently, lacking a centralized platform to connect with skilled security researchers.',
      solution:
        'Developed a comprehensive bug bounty platform with real-time vulnerability tracking, researcher management, and automated reward distribution systems.',
      impact:
        'Enabled organizations to discover 300+ vulnerabilities in the first 6 months, reducing security risks by 65% and saving an average of $50K per company in potential breach costs.',
      metrics: [
        { label: 'Vulnerabilities Found', value: '300+' },
        { label: 'Security Improvement', value: '65%' },
        { label: 'Cost Savings', value: '$50K' },
        { label: 'Active Researchers', value: '150+' },
      ],
    },
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
    category: 'Educational Platform',
    year: '2024',
    client: 'Investment Learning Ltd',
    services: [
      'Web Development',
      'UI/UX Design',
      'Frontend Development',
      'Responsive Design',
    ],
    caseStudy: {
      problem:
        'Newcomers to investing lacked accessible, comprehensive educational resources, resulting in poor financial decisions and missed opportunities.',
      solution:
        'Built an interactive learning platform with real-time market data, personalized learning paths, video tutorials, and practical investment simulations.',
      impact:
        'Helped 5,000+ users improve their investment knowledge, with 78% reporting better investment decisions and a 45% increase in portfolio performance.',
      metrics: [
        { label: 'Active Learners', value: '5,000+' },
        { label: 'Better Decisions', value: '78%' },
        { label: 'Portfolio Growth', value: '45%' },
        { label: 'Course Completion', value: '82%' },
      ],
    },
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
    category: 'Educational Platform',
    year: '2024',
    client: 'Al-Quran Digital Institute',
    services: [
      'Web Development',
      'UI/UX Design',
      'Frontend Development',
      'Responsive Design',
    ],
    caseStudy: {
      problem:
        'Students worldwide needed quality Quranic education but struggled with access to qualified teachers and flexible scheduling.',
      solution:
        'Created a comprehensive online platform with one-on-one virtual classes, progress tracking, flexible scheduling, and qualified teacher matching.',
      impact:
        'Connected 2,000+ students with certified teachers, achieving 90% student satisfaction and 85% course completion rates.',
      metrics: [
        { label: 'Active Students', value: '2,000+' },
        { label: 'Satisfaction Rate', value: '90%' },
        { label: 'Completion Rate', value: '85%' },
        { label: 'Teachers Network', value: '50+' },
      ],
    },
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
    category: 'Assessment Platform',
    year: '2024',
    client: 'IQ Demie',
    services: [
      'Web Development',
      'UI/UX Design',
      'Frontend Development',
      'Responsive Design',
    ],
    caseStudy: {
      problem:
        'Traditional IQ testing was expensive, time-consuming, and inaccessible to most people seeking to understand their cognitive abilities.',
      solution:
        'Developed an AI-powered assessment platform with adaptive testing, instant results, detailed analytics, and personalized improvement recommendations.',
      impact:
        'Delivered 10,000+ assessments with 95% accuracy compared to traditional methods, reducing assessment time by 70% and cost by 80%.',
      metrics: [
        { label: 'Assessments Completed', value: '10,000+' },
        { label: 'Accuracy Rate', value: '95%' },
        { label: 'Time Saved', value: '70%' },
        { label: 'Cost Reduction', value: '80%' },
      ],
    },
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
    category: 'Real Estate Platform',
    year: '2024',
    client: 'Black Water Ventures',
    services: [
      'Web Development',
      'UI/UX Design',
      'Frontend Development',
      'Responsive Design',
    ],
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
    category: 'Community Platform',
    year: '2024',
    client: 'Support Healthier Community',
    services: [
      'Web Development',
      'UI/UX Design',
      'Frontend Development',
      'Responsive Design',
    ],
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
    category: 'Service Platform',
    year: '2024',
    client: 'Sleek Assured',
    services: [
      'Web Development',
      'UI/UX Design',
      'Frontend Development',
      'Responsive Design',
    ],
  },
];

export const WORK_ACHIEVEMENTS = [
  {
    company: 'Createex',
    role: 'Senior React.js Developer',
    period: 'Jun 2023 - Feb 2025',
    location: 'Onsite - Pakistan',
    achievements: [
      'Developed responsive user interfaces using modern JavaScript frameworks, including React.js, Next.js, and Redux Toolkit, to enhance user experience',
      'Integrated complex third-party APIs and backend services, ensuring seamless communication between frontend and backend systems',
      'Led projects utilizing Firebase for authentication, real-time data handling, and cloud storage to build scalable applications',
      'Developed interactive and animated UI components using Framer Motion, GSAP, TypeScript, SCSS, and Tailwind CSS, improving engagement and responsiveness',
      'Collaborated with designers and backend developers to conceptualize and implement innovative solutions',
      'Managed and resolved complex technical challenges, optimizing performance, scalability, and maintainability of applications',
    ],
    skills: [
      'React.js',
      'Next.js',
      'Redux Toolkit',
      'Firebase',
      'Framer Motion',
      'GSAP',
      'TypeScript',
      'SCSS',
      'Tailwind CSS',
    ],
    metrics: [
      { label: 'Projects Delivered', value: '15+' },
      { label: 'Performance Gain', value: '40%' },
      { label: 'User Engagement', value: '65%' },
      { label: 'Code Quality', value: 'A+' },
    ],
  },
  {
    company: 'MahamAI',
    role: 'Full Stack Developer & AI Integration Specialist',
    period: '2024 - Present',
    location: 'Onsite - Saudi Arabia',
    achievements: [
      'Integrated AI capabilities into 5+ web applications, enhancing functionality and user experience',
      'Built scalable backend systems handling 10K+ daily users with optimal performance',
      'Improved application performance by 55% through code optimization and best practices',
      'Developed ML-powered features increasing user retention by 70%',
      'Collaborated with cross-functional teams to deliver innovative AI-driven solutions',
      'Implemented robust authentication and security measures for sensitive data handling',
    ],
    skills: [
      'AI/ML Integration',
      'Python',
      'React.js',
      'Next.js',
      'Node.js',
      'Django',
      'TensorFlow',
    ],
    metrics: [
      { label: 'AI Projects', value: '5+' },
      { label: 'Daily Users', value: '10K+' },
      { label: 'Performance Gain', value: '55%' },
      { label: 'Retention Increase', value: '70%' },
    ],
  },
  {
    company: 'Takhleeq Soft',
    role: 'React.js Developer',
    period: 'Jun 2024 - Aug 2024',
    location: 'Onsite - Pakistan',
    achievements: [
      'Integrated APIs using Postman to boost the functionality and efficiency of software systems',
      'Harnessed the power of Google Maps APIs to optimize real-time data handling',
      'Consistently delivered effective solutions by seamlessly blending front-end and back-end technologies while optimizing state management to meet both technical and user needs',
      'Developed RESTful web services using the Laravel framework, efficiently managing JSON data formats to ensure smooth data communication',
    ],
    skills: [
      'React.js',
      'Laravel',
      'Postman',
      'Google Maps API',
      'RESTful APIs',
      'JSON',
      'State Management',
    ],
    metrics: [
      { label: 'API Integrations', value: '20+' },
      { label: 'System Efficiency', value: '45%' },
      { label: 'Data Accuracy', value: '99%' },
      { label: 'Response Time', value: '<200ms' },
    ],
  },
  {
    company: 'Freelancer',
    role: 'Full Stack Developer',
    period: '2022 - Present',
    location: 'Remote - Fiverr, Upwork & Local Clients',
    achievements: [
      'Successfully delivered 20+ projects to international clients across various industries',
      'Built custom web applications using Python, Laravel, React.js, and Next.js',
      'Maintained a 5-star rating on Fiverr and Upwork with 100% client satisfaction',
      'Provided end-to-end development services from planning to deployment',
      'Specialized in building scalable SaaS applications, e-commerce platforms, and business websites',
      'Collaborated with clients globally, ensuring timely delivery and quality outputs',
    ],
    skills: [
      'Python',
      'Laravel',
      'React.js',
      'Next.js',
      'Django',
      'Firebase',
      'MySQL',
      'API Development',
    ],
    metrics: [
      { label: 'Total Clients', value: '20+' },
      { label: 'Client Rating', value: '5.0⭐' },
      { label: 'Projects Completed', value: '20+' },
      { label: 'Satisfaction Rate', value: '100%' },
    ],
  },
];

export const WORK_CONTENTS = {
  Createex: [
    {
      title: 'Createex',
      description:
        'A Journey of Growth - From Learning to Leading in Modern Web Development',
      content: (
        <div className="h-full w-full flex items-center justify-center text-white px-4">
          Empowering Ideas, Shaping the Future of Digital Innovation
        </div>
      ),
    },
    {
      title: 'The First Step',
      description:
        'At Createex, my journey began with learning React.js, mastering the fundamentals of frontend development. I built engaging and interactive UIs, laying the foundation for a successful career in web development.',
      content: (
        <div className="h-full w-full flex items-center justify-center text-white px-4">
          Aspiring React Developer
        </div>
      ),
    },
    {
      title: 'Leveling Up',
      description:
        'Transitioning to a Junior React.js Developer role, I honed my skills in crafting modern web applications using Next.js, React.js, and Firebase. I contributed to diverse projects, integrating APIs and ensuring robust, scalable solutions.',
      content: (
        <div className="h-full w-full flex items-center justify-center text-white px-4">
          Junior React.js Developer
        </div>
      ),
    },
    {
      title: 'Leading the Way',
      description:
        'As a Team Lead, I guided a team of talented developers, steering projects involving 3D web applications, Next.js, Laravel, and Firebase. My leadership ensured timely deliveries and high-quality outputs, setting a benchmark for excellence.',
      content: (
        <div className="h-full w-full flex items-center justify-center text-white px-4">
          Team Lead
        </div>
      ),
    },
    {
      title: 'Pioneering Innovation in 3D Web',
      description:
        'I ventured into the realm of 3D web development, creating immersive digital experiences that captivated users. Leveraging modern libraries and frameworks, I pushed the boundaries of what web applications can achieve.',
      content: (
        <div className="h-full w-full flex items-center justify-center text-white px-4">
          Innovator in 3D Web Development
        </div>
      ),
    },
    {
      title: 'Mastering the Stack',
      description:
        'Over the years, I built a versatile portfolio of projects, utilizing technologies like React.js, Next.js, Laravel, and Firebase. From interactive dashboards to scalable backends, my work exemplifies innovation and technical expertise.',
      content: (
        <div className="h-full w-full flex items-center justify-center text-white px-4">
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
        <div className="h-full w-full flex items-center justify-center text-white px-4">
          Empowering Growth Through Collaboration and Innovation
        </div>
      ),
    },

    {
      title: 'Starting Strong',
      description:
        'I joined TakhleeqSoft as a Senior Developer, taking charge of data integration APIs for a major project. My role involved seamlessly connecting multiple data sources, ensuring data accuracy, and optimizing API performance to drive project success.',
      content: (
        <div className="h-full w-full flex items-center justify-center text-white px-4">
          Senior Developer
        </div>
      ),
    },
    {
      title: 'Innovation',
      description:
        "I spearheaded the development of Q-Rate, their flagship product, a voice-based applicant screening platform. This project combined advanced technical solutions with user-focused design, enhancing engagement and increasing daily traffic. Additionally, I introduced an error-logging and bug reporting system, significantly reducing user-reported bugs and improving the platform's reliability.",
      content: (
        <div className="h-full w-full flex items-center justify-center text-white px-4">
          Innovator & Problem Solver
        </div>
      ),
    },
    {
      title: 'Driving Results with Data Integration',
      description:
        'Leveraging my expertise in API development and data management, I optimized data workflows, improved application performance, and contributed to achieving key project milestones. My efforts ensured the platform could handle scale and complexity, creating a seamless user experience.',
      content: (
        <div className="h-full w-full flex items-center justify-center text-white px-4">
          Data Integration Expert
        </div>
      ),
    },
  ],

  MahamAI: [
    {
      title: 'MahamAI',
      description:
        'MahamAI is an emerging Saudi-based technology company specializing in AI-powered platforms and modern web solutions. The team focuses on building scalable, intelligent systems using the latest advancements in React, Next.js, and monorepo architecture to enhance business automation and performance.',
      content: (
        <div className="h-full w-full flex items-center justify-center text-white px-4">
          About the Company
        </div>
      ),
    },
    {
      title: 'Role',
      description: 'Full-Stack Developer (AI & Monorepo Architecture)',
      content: (
        <div className="h-full w-full flex items-center justify-center text-white px-4">
          Role
        </div>
      ),
    },
    {
      title: 'Duration',
      description: 'September - Present',
      content: (
        <div className="h-full w-full flex items-center justify-center text-white px-4">
          Duration
        </div>
      ),
    },
    {
      title: 'Responsibilities & Achievements',
      description: `Developed and maintained multi-app projects in a monorepo architecture using Turborepo and npm Workspaces, ensuring efficient builds and shared codebases.\n
Built reusable UI components and themes via @maham/ui-components, using Shadcn/UI, Tailwind CSS, and CSS variable-based theming.\n
Integrated Next.js 15 (App Router) and React 18 for server-client hybrid rendering, optimizing performance and SEO.\n
Implemented advanced styling tools like class-variance-authority (CVA), clsx, and tailwind-merge for modular and consistent component design.\n
Configured build environment using TypeScript (strict mode), PostCSS, and Autoprefixer for production-grade performance.\n
Managed hybrid module setups (ESM / CJS) across configurations for better compatibility and cleaner builds.\n
Collaborated in an agile environment, utilizing Node.js 20.x, .env.local, and Turbo CLI for environment management and parallel app execution.`,
      content: (
        <div className="h-full w-full flex items-center justify-center text-white px-4">
          Responsibilities & Achievements
        </div>
      ),
    },
    {
      title: 'Tech Stack',
      description: `Core Frameworks: Next.js 15 (App Router), React 18\n
Architecture & Tooling: Turborepo, npm Workspaces\n
Styling: Tailwind CSS, tailwindcss-animate, clsx, tailwind-merge, class-variance-authority (CVA)\n
UI Library: @maham/ui-components (Shadcn/UI, CSS variable theming)\n
Build Tools: TypeScript (strict), PostCSS, Autoprefixer\n
Environment: Node.js ≥ 18.17, Turbo CLI, .env.local`,
      content: (
        <div className="h-full w-full flex items-center justify-center text-white px-4">
          Tech Stack
        </div>
      ),
    },
  ],

  Freelancer: [
    {
      title: 'Freelance Work',
      description:
        "As a freelance Full Stack Developer, I have worked with 20+ clients from around the world through Fiverr, Upwork, and local connections. Specializing in Python, Laravel, React.js, and Next.js, I deliver custom web solutions tailored to each client's unique needs.",
      content: (
        <div className="h-full w-full flex items-center justify-center text-white px-4">
          Global Freelance Experience
        </div>
      ),
    },
    {
      title: 'Client Success Stories',
      description:
        'Successfully delivered 20+ projects across various industries including e-commerce, SaaS platforms, educational websites, and business applications. Maintained a perfect 5-star rating on both Fiverr and Upwork with 100% client satisfaction.',
      content: (
        <div className="h-full w-full flex items-center justify-center text-white px-4">
          20+ Happy Clients
        </div>
      ),
    },
    {
      title: 'Technical Expertise',
      description:
        'Built robust web applications using Python and Django for backend services, Laravel for enterprise solutions, and React.js/Next.js for modern, responsive frontends. Specialized in API development, database design, and cloud deployment.',
      content: (
        <div className="h-full w-full flex items-center justify-center text-white px-4">
          Full Stack Solutions
        </div>
      ),
    },
    {
      title: 'Services Offered',
      description:
        'End-to-end web development from planning and design to deployment and maintenance. Custom SaaS applications, e-commerce platforms, business websites, API development, database design, and third-party integrations.',
      content: (
        <div className="h-full w-full flex items-center justify-center text-white px-4">
          Comprehensive Development Services
        </div>
      ),
    },
  ],
};

export const EDUCATION_CONTENTS = [
  {
    title: 'Bachelor of Computer Science',
    institute: 'The Islamia University of Bahawalpur',
    year: '2019 – 2023',
    description:
      'Graduated with a 3.02 GPA. Built a strong foundation in programming (Java, C++, Python), database management, and software engineering. Applied academic knowledge to real-world projects and participated actively in student societies to enhance leadership and teamwork skills.',
    content: (
      <div className="h-full w-full flex items-center justify-center text-white px-4">
        2019 - 2023
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
      <div className="h-full w-full flex items-center justify-center text-white px-4">
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
      <div className="h-full w-full flex items-center justify-center text-white px-4">
        2024
      </div>
    ),
  },
];

export const GTAG = 'G-MLJ3G4JNXM';

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

export const TESTIMONIALS = [
  {
    name: 'Sarah Johnson',
    role: 'CEO',
    company: 'TeklabSpace',
    image: 'https://i.pravatar.cc/150?img=5',
    rating: 5,
    text: 'Anas delivered an exceptional bug bounty platform that exceeded our expectations. His attention to detail and technical expertise were instrumental in creating a secure and user-friendly solution. The platform has significantly improved our security testing workflow and client engagement.',
  },
  {
    name: 'Dr. Ahmed Hassan',
    role: 'Director',
    company: 'Al-Quran Digital Institute',
    image: 'https://i.pravatar.cc/150?img=33',
    rating: 5,
    text: 'Working with Anas was a transformative experience for our institute. He built a beautiful and functional Quran learning platform with seamless booking system, teacher management, and student tracking features. The integration of Framer Motion animations and Email.js made our platform stand out. Highly recommended!',
  },
  {
    name: 'Michael Chen',
    role: 'Founder & CTO',
    company: 'Investment Learning Ltd',
    image: 'https://i.pravatar.cc/150?img=12',
    rating: 5,
    text: 'Anas is a true professional who goes above and beyond. He not only built our educational platform with robust features but also provided valuable insights that improved our user experience significantly. His expertise in React, Next.js, and modern web technologies is impressive. The project was delivered on time with clean, maintainable code.',
  },
  {
    name: 'David Thompson',
    role: 'Project Manager',
    company: 'Black Water Ventures',
    image: 'https://i.pravatar.cc/150?img=15',
    rating: 5,
    text: 'Outstanding work ethic and technical skills! Anas developed our real estate platform with pixel-perfect design implementation and smooth animations. He was responsive to feedback, met all deadlines, and delivered a product that our clients absolutely love. His knowledge of modern frontend frameworks and UI/UX principles is exceptional.',
  },
];

export const PERFORMANCE_METRICS = {
  github: {
    totalRepos: 17,
    totalStars: 6,
    totalCommits: 1850,
    contributionsLastYear: 620,
  },
  projects: {
    totalProjects: 50,
    clientProjects: 35,
    personalProjects: 15,
    linesOfCode: '500K+',
  },
  skills: {
    technologiesMastered: 30,
    yearsOfExperience: 5,
    certifications: 5,
  },
  impact: {
    usersServed: '50K+',
    performanceImprovement: '65%',
    clientSatisfaction: '98%',
  },
};

export const RESUME_DATA = {
  pdfUrl: '/resume/Anas_Pirzada_Resume.pdf',
  docxUrl: '/resume/Anas_Pirzada_Resume.docx',
};
