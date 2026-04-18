export const WORK_ACHIEVEMENTS = [
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
  {
    company: 'Agoua Travel',
    role: 'Full Stack Developer & Designer',
    period: 'Mar 2026 - Present',
    location: 'Full-time · Onsite · Riyadh, Saudi Arabia',
    achievements: [
      'Full-time: collaborating with Agoua Travel to build their public customer website and two internal products—a super-admin dashboard for operations and configuration, and a separate employee dashboard for day-to-day staff workflows.',
      'Shipped the marketing site end-to-end—destination packages, visa, Transfer and Tours CTAs, flight/hotel search flows and contact—aligned with their full-service travel positioning.',
      'Implemented Quoud-powered capabilities inside both dashboards for core travel-agency workflows, and built additional custom modules where requirements exceeded what Quoud covers out of the box.',
      'Designed clear separation between super-admin and employee roles, authentication flows, and scalable UI patterns so the team can manage bookings, content, and internal tasks without overlap.',
    ],
    skills: [
      'Next.js',
      'React',
      'TypeScript',
      'Nest.js',
      'Framer Motion',
      'GSAP',
      'SCSS',
      'Tailwind CSS',
      'Quoud integration',
      'REST APIs',
      'RBAC & multi-dashboard UX',
    ],
    metrics: [
      { label: 'Engagement', value: 'Full-Time' },
      { label: 'Tenure', value: '~1 mo' },
      { label: 'Product Surfaces', value: '3' },
      { label: 'Stack', value: 'Next.js + Nest.js' },
    ],
  },
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
];

export const WORK_CONTENTS = {
  AgouaTravel: [
    {
      title: 'Agoua Travel',
      description:
        'Agoua Travel is a Saudi-based travel agency offering flights, hotels, visa processing, holiday packages, transfers, and tours—positioned as an all-in-one partner for travelers. I work with them full-time (since Mar 2026) as a full-stack developer on their public web presence and internal tooling.',
      content: (
        <div className="h-full w-full flex items-center justify-center text-white px-4">
          Travel & tourism platform
        </div>
      ),
    },
    {
      title: 'Role & schedule',
      description:
        'Full-time, onsite in Riyadh—focused delivery on the marketing site, super-admin dashboard, and employee dashboard, working closely with the client team.',
      content: (
        <div className="h-full w-full flex items-center justify-center text-white px-4">
          Full-time · Riyadh
        </div>
      ),
    },
    {
      title: 'Public website',
      description:
        'Built the customer-facing Next.js site showcasing trending packages, destination routes, visa and service CTAs, AI-assisted search prompts, testimonials, and contact—reflecting their licensed, full-service travel brand.',
      content: (
        <div className="h-full w-full flex items-center justify-center text-white px-4">
          Marketing & booking journeys
        </div>
      ),
    },
    {
      title: 'Super-admin & employee dashboards',
      description:
        'Delivered two distinct apps: a super-admin dashboard for centralized operations and settings, and an employee dashboard for staff workflows—with role-appropriate access and shared design language.',
      content: (
        <div className="h-full w-full flex items-center justify-center text-white px-4">
          Dual internal consoles
        </div>
      ),
    },
    {
      title: 'Quoud plus custom build',
      description:
        'Integrated Quoud features for standard agency operations inside both dashboards, and implemented bespoke modules where business rules and UX needed more than the default Quoud surface—closing gaps with custom React/Next.js work.',
      content: (
        <div className="h-full w-full flex items-center justify-center text-white px-4">
          Platform + custom modules
        </div>
      ),
    },
    {
      title: 'Tech & delivery',
      description:
        'Next.js, TypeScript, Tailwind-style component work, REST integrations, and Vercel deployments across the marketing site and dashboard applications—iterating with stakeholders as requirements evolved.',
      content: (
        <div className="h-full w-full flex items-center justify-center text-white px-4">
          Ship fast, iterate safely
        </div>
      ),
    },
  ],

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
