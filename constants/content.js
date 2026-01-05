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
