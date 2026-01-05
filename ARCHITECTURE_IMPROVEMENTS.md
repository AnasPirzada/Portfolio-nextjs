# Architecture & Improvements Documentation

## Overview

This document outlines the architectural improvements and enhancements made to
the devfolio project.

---

## 📂 Project Structure Changes

### New Folders Created

#### `contexts/`

Global state management using React Context API.

```
contexts/
├── DeviceContext.js      # Device type & dimensions state
└── ThemeContext.js       # Dark/Light theme management
```

**Usage:**

```javascript
import { useDevice } from '@/contexts/DeviceContext';
import { useTheme } from '@/contexts/ThemeContext';

const MyComponent = () => {
  const device = useDevice(); // { isDesktop, isMobile, clientHeight, clientWidth }
  const { theme, toggleTheme } = useTheme();
};
```

#### `hooks/`

Custom React hooks for reusable logic.

```
hooks/
├── useScrollReveal.js            # Scroll-triggered animations
├── useIntersectionObserver.js    # Intersection observer wrapper
├── useParallax.js                # Parallax scroll effect
├── usePerformanceMonitoring.js   # Performance tracking
└── index.js                      # Central export
```

**Usage:**

```javascript
import { useScrollReveal } from '@/hooks';

const MySection = () => {
  const ref = useScrollReveal({ duration: 0.8, stagger: 0.15 });
  return <section ref={ref}>{/* content */}</section>;
};
```

#### `constants/`

Organized constants split by category.

```
constants/
├── index.js         # Central re-export
├── metadata.js      # SEO & site metadata
├── navigation.js    # Menu & social links
├── skills.js        # Skills & technologies
├── config.js        # URLs & API keys
├── projects.js      # Project data
├── work.js          # Work experience & achievements
├── education.js     # Education & certification
└── content.js       # Blogs, testimonials, metrics
```

**Usage:**

```javascript
import { METADATA, PROJECTS, SKILLS } from '@/constants';
```

#### `config/`

Application-wide configuration.

```
config/
└── app.config.js    # App settings, feature flags, API endpoints
```

#### `utils/`

Enhanced utility functions.

```
utils/
├── logger.js                 # Logging utility
├── validateEnv.js            # Environment validation
├── readingTime.js            # Blog reading time calculator
├── projectFilters.js         # Project filtering utilities
├── animationVariants.js      # Framer Motion variants
├── index.js                  # Central export
├── cn.js                     # (existing)
├── calendly.js               # (existing)
└── share.js                  # (existing)
```

#### `components/`

New & enhanced components.

```
components/
├── ErrorBoundary/
│   └── ErrorBoundary.js      # Enhanced error handling
├── PageTransition/
│   └── PageTransition.js     # Page transition animations
└── (existing components)
```

---

## 🎯 Key Improvements Implemented

### 1. **DeviceContext - Eliminates Prop Drilling**

**Before:**

```javascript
// pages/index.js - Had to pass isDesktop, clientHeight through multiple levels
<Projects isDesktop={isDesktop} clientHeight={clientHeight} />
<About1 clientHeight={clientHeight} />
```

**After:**

```javascript
// components/Projects/Projects.js
import { useDevice } from '@/contexts/DeviceContext';

const Projects = () => {
  const { isDesktop, clientHeight } = useDevice();
  // No more props needed!
};
```

### 2. **Custom Hooks - Reusable Animation Logic**

**Before:**

```javascript
// Duplicated in About1.js, Projects.js, Skills.js
useLayoutEffect(() => {
  gsap.registerPlugin(ScrollTrigger);
  const ctx = gsap.context(() => {
    gsap.from(ref.current.querySelectorAll('.staggered-reveal'), {
      opacity: 0, y: 30, duration: 0.8, stagger: 0.15, ...
    });
  });
  return () => ctx.revert();
}, []);
```

**After:**

```javascript
// Single hook, used everywhere
const ref = useScrollReveal({ duration: 0.8, stagger: 0.15 });
```

### 3. **Organized Constants**

**Before:**

```javascript
// 822 lines in constants.js!
export const METADATA = { ... };
export const MENULINKS = [ ... ];
export const PROJECTS = [ ... ];
// ... 800 more lines
```

**After:**

```javascript
// constants/index.js - Clean exports
export { METADATA } from './metadata';
export { MENULINKS } from './navigation';
export { PROJECTS } from './projects';
```

### 4. **React.memo for Performance**

```javascript
import { memo } from 'react';

const Projects = memo(
  ({ isDesktop }) => {
    // Only re-renders if isDesktop actually changes
    return <section>...</section>;
  },
  (prevProps, nextProps) => {
    return prevProps.isDesktop === nextProps.isDesktop;
  }
);
```

### 5. **Enhanced Error Boundaries**

```javascript
// components/ErrorBoundary/ErrorBoundary.js
<ErrorBoundary>
  <App />
</ErrorBoundary>

// Catches errors + shows fallback UI + logs to services
```

### 6. **Updated \_app.js**

```javascript
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import { DeviceProvider } from '@/contexts/DeviceContext';
import { usePerformanceMonitoring } from '@/hooks/usePerformanceMonitoring';
import { validateEnv } from '@/utils/validateEnv';

const App = ({ Component, pageProps }) => {
  usePerformanceMonitoring();

  useEffect(() => {
    validateEnv();
    logger.info('App initialized');
  }, []);

  return (
    <ErrorBoundary>
      <DeviceProvider>
        <Component {...pageProps} />
      </DeviceProvider>
    </ErrorBoundary>
  );
};
```

---

## 🎨 New Animation Features

### Animation Variants (utils/animationVariants.js)

```javascript
import { containerVariants, itemVariants, cardHoverVariants } from '@/utils';
import { motion } from 'framer-motion';

// Staggered animations
<motion.div variants={containerVariants}>
  <motion.div variants={itemVariants}>Item 1</motion.div>
  <motion.div variants={itemVariants}>Item 2</motion.div>
</motion.div>

// Card hover effects
<motion.div initial="rest" whileHover="hover" variants={cardHoverVariants}>
  Project Card
</motion.div>
```

### Page Transitions

```javascript
import PageTransition from '@/components/PageTransition/PageTransition';

// Wrap pages for smooth transitions
<PageTransition>
  <YourPage />
</PageTransition>;
```

---

## 🔧 New Utilities

### Logger (utils/logger.js)

```javascript
import { logger } from '@/utils';

logger.info('User logged in', userData);
logger.warn('Low memory', { mb: 512 });
logger.error('API error', error);
logger.debug('Debug info', devData);
```

### Reading Time Calculator (utils/readingTime.js)

```javascript
import { getReadingTimeEstimate } from '@/utils';

const estimate = getReadingTimeEstimate(blogContent);
// Output: "5 min read"
```

### Project Filters (utils/projectFilters.js)

```javascript
import { filterProjects, getUniqueTags, sortProjectsByDate } from '@/utils';

const filtered = filterProjects(projects, 'react', ['nextjs']);
const tags = getUniqueTags(projects);
const sorted = sortProjectsByDate(projects, 'desc');
```

---

## 🚀 Performance Improvements

1. **React.memo** - Prevents unnecessary component re-renders
2. **Custom Hooks** - Shared animation logic without duplication
3. **Dynamic Imports** - Code splitting for large components
4. **Intersection Observer** - Lazy animation triggers
5. **Performance Monitoring** - Tracks Core Web Vitals

---

## 📋 Migration Guide

### If you have custom components using old patterns:

**Before (old way):**

```javascript
import { SKILLS } from '../../constants';

const Skills = ({ isDesktop, clientHeight }) => {
  useEffect(() => {
    // Animation setup
  }, [isDesktop, clientHeight]);
};
```

**After (new way):**

```javascript
import { SKILLS } from '@/constants';
import { useScrollReveal } from '@/hooks';
import { useDevice } from '@/contexts/DeviceContext';

const Skills = memo(() => {
  const ref = useScrollReveal();
  const { isDesktop, clientHeight } = useDevice();
  // Done!
});
```

---

## 🔍 Configuration

### App Configuration (config/app.config.js)

```javascript
import { APP_CONFIG, isFeatureEnabled } from '@/config/app.config';

// Check feature flags
if (isFeatureEnabled('enableBlog')) {
  // Show blog section
}

// Access settings
const maxSubmissions = APP_CONFIG.contactForm.maxSubmissionsPerMinute;
```

---

## 📚 Additional Features Added

### 1. Theme Context (contexts/ThemeContext.js)

- Dark/Light theme support
- System preference detection
- LocalStorage persistence

### 2. Environment Validation (utils/validateEnv.js)

- Checks required environment variables on startup
- Warns about missing configs

### 3. Error Handling

- Enhanced ErrorBoundary with fallback UI
- Error logging integration ready
- Development vs production error display

---

## 🎯 Next Steps (Medium Priority)

1. **Implement Dynamic Imports** for heavy components like Reviews,
   GitHubContributions
2. **Add Theme Toggle UI** using ThemeContext
3. **Create Command Palette** (Cmd+K navigation)
4. **Advanced Scroll Animations** using useParallax hook
5. **Blog Search & Filter** using projectFilters utilities

---

## ⚙️ Best Practices Applied

✅ Single Responsibility Principle - Each file has one purpose  
✅ DRY (Don't Repeat Yourself) - Shared hooks instead of duplicated code  
✅ Proper Error Handling - Error boundaries + logging  
✅ Performance Optimization - React.memo + lazy loading  
✅ Type Safety Ready - JSDoc comments throughout  
✅ Scalability - Organized folder structure for growth  
✅ Maintainability - Clear imports and exports  
✅ Accessibility - ARIA attributes + reduced motion support

---

## 📝 Summary

The refactored architecture provides:

- **Better Code Organization** - Clear separation of concerns
- **Improved Reusability** - Custom hooks reduce duplication
- **Enhanced Performance** - Memoization and lazy loading
- **Easier Maintenance** - Centralized configurations
- **Scalability** - Ready for feature expansion
- **Developer Experience** - Clear patterns and conventions

For questions or improvements, refer to the CODE_REVIEW_RECOMMENDATIONS.md file.
