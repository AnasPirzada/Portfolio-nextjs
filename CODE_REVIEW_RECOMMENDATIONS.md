# Code Review & Improvement Recommendations

## Executive Summary

Your portfolio is well-built with great animations, responsive design, and
modern tech stack. Below are strategic improvements organized by category.

---

## 🏗️ **ARCHITECTURE IMPROVEMENTS**

### 1. **Create a Context API for Global State Management**

**Current Issue:** No centralized state management. Device info is passed as
props through multiple components.

**Recommended Solution:**

```javascript
// contexts/DeviceContext.js
import { createContext, useContext, useEffect, useState } from 'react';

const DeviceContext = createContext();

export const DeviceProvider = ({ children }) => {
  const [device, setDevice] = useState({
    isDesktop: true,
    clientHeight: 0,
    clientWidth: 0,
    isMobile: false,
  });

  useEffect(() => {
    const updateDevice = () => {
      const isMob = window.innerWidth < 768;
      setDevice({
        isDesktop: !/Android|iPhone|iPad|iPod|IEMobile/.test(
          navigator.userAgent
        ),
        clientHeight: window.innerHeight,
        clientWidth: window.innerWidth,
        isMobile: isMob,
      });
    };

    updateDevice();
    window.addEventListener('resize', updateDevice);
    return () => window.removeEventListener('resize', updateDevice);
  }, []);

  return (
    <DeviceContext.Provider value={device}>{children}</DeviceContext.Provider>
  );
};

export const useDevice = () => {
  const context = useContext(DeviceContext);
  if (!context) throw new Error('useDevice must be used within DeviceProvider');
  return context;
};
```

**Benefits:**

- Eliminates prop drilling
- Centralized device detection logic
- Easier to maintain and test

---

### 2. **Extract Animation Logic into Custom Hooks**

**Current Issue:** Animation code scattered across components (About1.js,
Projects.js, Skills.js).

**Create custom hooks:**

```javascript
// hooks/useScrollReveal.js
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export const useScrollReveal = (config = {}) => {
  const ref = useRef(null);

  const defaultConfig = {
    duration: 0.8,
    stagger: 0.15,
    ease: 'power2.out',
    triggerStart: 'top 80%',
    ...config,
  };

  useLayoutEffect(() => {
    if (!ref.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(ref.current.querySelectorAll('.staggered-reveal'), {
        opacity: 0,
        y: 30,
        duration: defaultConfig.duration,
        stagger: defaultConfig.stagger,
        ease: defaultConfig.ease,
        scrollTrigger: {
          trigger: ref.current,
          start: defaultConfig.triggerStart,
          toggleActions: 'play none none none',
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return ref;
};

// hooks/useScrollPin.js
export const useScrollPin = (config = {}) => {
  const ref = useRef(null);

  useLayoutEffect(() => {
    // ScrollTrigger pin animation logic
  }, []);

  return ref;
};
```

**Usage in Components:**

```javascript
const Projects = () => {
  const sectionRef = useScrollReveal();

  return <section ref={sectionRef}>{/* content */}</section>;
};
```

---

### 3. **Implement Component-Level Error Boundaries**

**Current Issue:** ErrorBoundary exists but not implemented in critical
sections.

**Enhance ErrorBoundary.js:**

```javascript
import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('Error caught by boundary:', error, info);
    // Send to error tracking service (Sentry, LogRocket)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='min-h-screen flex items-center justify-center'>
          <div className='text-center'>
            <h2 className='text-2xl font-bold mb-4'>
              Oops! Something went wrong
            </h2>
            <button
              onClick={() => this.setState({ hasError: false })}
              className='btn btn-primary'
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

**Wrap key sections in \_app.js:**

```javascript
<ErrorBoundary>
  <Main />
</ErrorBoundary>
```

---

### 4. **Create a Hooks Folder for Reusable Logic**

```
hooks/
  ├── useScrollReveal.js
  ├── useScrollPin.js
  ├── useIntersectionObserver.js
  ├── useLocalStorage.js
  ├── useMediaQuery.js
  └── useAnimationFrame.js
```

---

### 5. **Extract Constants to Organized Structure**

**Current Issue:** Single 822-line constants.js file is hard to maintain.

**Restructure:**

```
constants/
  ├── index.js (exports all)
  ├── metadata.js (SEO, site info)
  ├── navigation.js (MENULINKS)
  ├── strings.js (TYPED_STRINGS, labels)
  ├── social.js (SOCIAL_LINKS)
  ├── projects.js (PROJECTS data)
  ├── skills.js (SKILLS data)
  ├── work.js (WORK_ACHIEVEMENTS)
  └── config.js (URLs, API keys)
```

---

## 🎨 **ANIMATION IMPROVEMENTS**

### 1. **Parallax Scroll Enhancement**

Add subtle parallax to Hero and About sections:

```javascript
// components/hooks/useParallax.js
import { useScroll, useTransform, motion } from 'framer-motion';

export const useParallax = (multiplier = 0.5) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 1000 * multiplier]);
  return y;
};

// Usage in Hero
<motion.div style={{ y: useParallax(0.3) }}>
  {/* Background element */}
</motion.div>;
```

---

### 2. **Staggered Enter Animations for Cards**

```javascript
// components/Projects/ProjectTile/ProjectTile.js
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export const ProjectCard = ({ project }) => {
  return (
    <motion.div
      variants={containerVariants}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.h3 variants={itemVariants}>{project.name}</motion.h3>
      <motion.p variants={itemVariants}>{project.description}</motion.p>
    </motion.div>
  );
};
```

---

### 3. **Add Scroll Progress Indicator Enhancement**

```javascript
// components/ProgressIndicator/ProgressIndicator.js - Enhanced
import { useScroll, motion } from 'framer-motion';

const ProgressIndicator = () => {
  const { scrollYProgress } = useScroll();

  return (
    <>
      {/* Main progress bar */}
      <motion.div
        style={{
          scaleX: scrollYProgress,
          scaleOrigin: '0%',
          height: '3px',
          backgroundColor: '#efc041',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
        }}
      />

      {/* Glow effect */}
      <motion.div
        style={{
          scaleX: scrollYProgress,
          boxShadow: '0 0 10px #efc041',
        }}
        className='fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent'
      />
    </>
  );
};
```

---

### 4. **Add Hover State Animations to Skill Cards**

```javascript
// components/Skills/SkillCard.js
const SkillCard = ({ skill }) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.1,
        rotateZ: 5,
        boxShadow: '0 10px 30px rgba(239, 192, 65, 0.3)',
      }}
      whileTap={{ scale: 0.95 }}
      className='cursor-pointer'
    >
      {/* Skill content */}
    </motion.div>
  );
};
```

---

### 5. **Add Page Transition Animations**

```javascript
// components/PageTransition.js
import { motion } from 'framer-motion';

const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

// Wrap in _app.js
<motion.div key={router.pathname}>
  <Component {...pageProps} />
</motion.div>;
```

---

## 🚀 **PERFORMANCE IMPROVEMENTS**

### 1. **Implement React.memo for Heavy Components**

```javascript
import { memo } from 'react';

const ProjectTile = memo(
  ({ project, isDesktop }) => {
    // Component code
  },
  (prevProps, nextProps) => {
    return (
      prevProps.project.id === nextProps.project.id &&
      prevProps.isDesktop === nextProps.isDesktop
    );
  }
);

export default ProjectTile;
```

---

### 2. **Add Image Optimization**

```javascript
// Already good! But enhance with:
// 1. Lazy loading for below-fold images
<Image
  src={url}
  alt='description'
  loading='lazy'
  placeholder='blur'
  blurDataURL='...' // Add blurred placeholder
/>

// 2. Use next/image for all images (consistent sizing)
// 3. Add srcSet for responsive images
```

---

### 3. **Dynamic Imports for Large Components**

```javascript
// pages/index.js
import dynamic from 'next/dynamic';

const Reviews = dynamic(() => import('@/components/Reviews/Reviews'), {
  loading: () => <SkeletonLoader />,
});

const GitHubContributions = dynamic(
  () => import('@/components/GitHubContributions/GitHubContributions'),
  { loading: () => <SkeletonLoader /> }
);
```

---

### 4. **Add Intersection Observer for Lazy Animation Triggers**

```javascript
// hooks/useIntersectionObserver.js
import { useEffect, useRef } from 'react';

export const useIntersectionObserver = (callback, options = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          callback();
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, ...options }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [callback]);

  return ref;
};
```

---

## 🔧 **CODE QUALITY IMPROVEMENTS**

### 1. **Standardize Component Structure**

Create a template for consistency:

```javascript
// Template: components/ComponentName/ComponentName.js
import { useEffect, useRef } from 'react';
import { MENULINKS } from '../../constants';
import styles from './ComponentName.module.scss';

/**
 * ComponentName - Brief description
 * @param {Object} props - Component props
 * @param {boolean} props.isDesktop - Device type
 */
const ComponentName = ({ isDesktop = true }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    // Setup animations or listeners
    return () => {
      // Cleanup
    };
  }, []);

  return (
    <section ref={sectionRef} id={MENULINKS[0].ref} className='w-full relative'>
      {/* Content */}
    </section>
  );
};

export default ComponentName;
```

---

### 2. **Add TypeScript (Optional but Recommended)**

Start with JSDoc types or migrate to TypeScript for better IDE support and fewer
bugs:

```javascript
// jsconfig.json - already good, but enhance with:
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./"],
      "@components/*": ["./components/*"],
      "@hooks/*": ["./hooks/*"],
      "@utils/*": ["./utils/*"],
      "@constants/*": ["./constants/*"]
    }
  }
}
```

---

### 3. **Add Environment Variable Validation**

```javascript
// utils/validateEnv.js
export const validateEnv = () => {
  const required = ['NEXT_PUBLIC_GTAG'];
  const missing = required.filter(key => !process.env[key]);

  if (missing.length > 0) {
    console.warn(`Missing env vars: ${missing.join(', ')}`);
  }
};

// pages/_app.js
useEffect(() => {
  validateEnv();
}, []);
```

---

### 4. **Improve Error Handling in Contact Form**

```javascript
// components/Contact/Contact.js - Enhancement
const handleSubmit = async e => {
  e.preventDefault();

  try {
    setIsSending(true);
    const response = await mail(formData);

    if (!response.ok) throw new Error('Send failed');

    success();
    emptyForm();
  } catch (error) {
    console.error('Contact form error:', error);
    error();
  } finally {
    setIsSending(false);
  }
};
```

---

### 5. **Add Logging Service**

```javascript
// utils/logger.js
export const logger = {
  info: (message, data) => {
    console.info(`[INFO] ${message}`, data);
    // Send to service (LogRocket, Sentry)
  },
  error: (message, error) => {
    console.error(`[ERROR] ${message}`, error);
    // Send to error tracking
  },
  warn: (message, data) => {
    console.warn(`[WARN] ${message}`, data);
  },
};
```

---

## 🎯 **FEATURE ADDITIONS**

### 1. **Add Dark/Light Theme Toggle**

The theme toggle component exists but consider enhancing:

```javascript
// contexts/ThemeContext.js
import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'dark';
    setTheme(saved);
    document.documentElement.setAttribute('data-theme', saved);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

---

### 2. **Add Reading Time Estimate to Blog Posts**

```javascript
const calculateReadingTime = text => {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

// Usage in Blog component
<span>{calculateReadingTime(post.content)} min read</span>;
```

---

### 3. **Add Search/Filter for Projects**

```javascript
// components/ProjectFilter/ProjectFilter.js - Enhanced
const [searchTerm, setSearchTerm] = useState('');
const [selectedTags, setSelectedTags] = useState([]);

const filteredProjects = PROJECTS.filter(project => {
  const matchesSearch = project.name
    .toLowerCase()
    .includes(searchTerm.toLowerCase());

  const matchesTags =
    selectedTags.length === 0 ||
    selectedTags.some(tag => project.tags.includes(tag));

  return matchesSearch && matchesTags;
});
```

---

### 4. **Add Testimonials/Reviews Carousel with Auto-Play**

```javascript
// components/Reviews/ReviewsCarousel.js
const ReviewsCarousel = ({ reviews }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % reviews.length);
    }, 5000); // Auto-rotate every 5 seconds

    return () => clearInterval(timer);
  }, [reviews.length]);

  return (
    <motion.div
      key={current}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {reviews[current]}
    </motion.div>
  );
};
```

---

### 5. **Add Command Palette (Cmd+K)**

```javascript
// components/CommandPalette/CommandPalette.js
import { useEffect, useState } from 'react';

const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const handleKeyDown = e => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return isOpen && <CommandModal search={search} setSearch={setSearch} />;
};
```

---

## 📊 **MONITORING & ANALYTICS**

### 1. **Add Web Vitals Monitoring**

```javascript
// pages/_app.js
import { useEffect } from 'react';
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

useEffect(() => {
  getCLS(console.log);
  getFID(console.log);
  getFCP(console.log);
  getLCP(console.log);
  getTTFB(console.log);
}, []);
```

---

### 2. **Add Performance Monitoring**

```javascript
// hooks/usePerformanceMonitoring.js
import { useEffect } from 'react';

export const usePerformanceMonitoring = () => {
  useEffect(() => {
    if (!window.performance) return;

    window.addEventListener('load', () => {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      console.log(`Page Load Time: ${pageLoadTime}ms`);
    });
  }, []);
};
```

---

## 📋 **PRIORITY ROADMAP**

**High Priority (Implement First):**

1. ✅ Create Device/Global Context (eliminates prop drilling)
2. ✅ Extract animation hooks (code reuse)
3. ✅ Enhance error boundaries (stability)
4. ✅ Implement dynamic imports (performance)
5. ✅ Add React.memo (performance)

**Medium Priority:**

1. ⚠️ Restructure constants (maintainability)
2. ⚠️ Add advanced scroll animations (UX)
3. ⚠️ Create hooks folder (organization)
4. ⚠️ Add error tracking (monitoring)

**Low Priority (Nice to Have):**

1. 📌 TypeScript migration
2. 📌 Theme toggle enhancement
3. 📌 Command palette
4. 📌 Web Vitals monitoring

---

## 📝 **SUMMARY**

Your portfolio is **solid and visually impressive**. These recommendations focus
on:

- **Scalability**: Better organization and reusability
- **Performance**: Optimization and lazy loading
- **Maintainability**: Cleaner code structure and documentation
- **UX**: Enhanced animations and interactions
- **Reliability**: Error handling and monitoring

Start with the high-priority items for immediate improvements!
