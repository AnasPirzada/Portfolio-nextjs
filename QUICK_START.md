# 🚀 Quick Start Guide - New Architecture

## What Changed? (30 seconds)

✅ **Contexts:** Global state (DeviceContext, ThemeContext)  
✅ **Hooks:** Reusable animation & utility functions  
✅ **Constants:** Organized from 1 file into 8 focused files  
✅ **Components:** Enhanced with React.memo & new hooks  
✅ **Utils:** Logger, filtering, animations, validation

**Bottom Line:** Your code is now more organized, performant, and maintainable!

---

## How to Use Now? (2 minutes)

### 1. Import from Constants (NEW PATTERN)

```javascript
// Old way (still works)
import { PROJECTS } from '../../constants';

// New way (recommended)
import { PROJECTS } from '@/constants';
```

### 2. Use Device Context (No More Prop Drilling)

```javascript
import { useDevice } from '@/contexts/DeviceContext';

const MyComponent = () => {
  const { isDesktop, clientHeight } = useDevice();
  // No need to pass props down!
};
```

### 3. Use Custom Hooks (Animations)

```javascript
import { useScrollReveal } from '@/hooks';

const Section = () => {
  const ref = useScrollReveal(); // That's it!
  return <section ref={ref}>Content</section>;
};
```

### 4. Use Logger (Debugging)

```javascript
import { logger } from '@/utils';

logger.info('Component loaded');
logger.error('API failed', error);
```

---

## 5 Minute Integration

### Step 1: Update your imports

```javascript
// Before
import { SKILLS, PROJECTS } from '../../constants';

// After
import { SKILLS, PROJECTS } from '@/constants';
```

### Step 2: Remove prop drilling

```javascript
// Before
const Section = ({ isDesktop, clientHeight }) => {
  return <Content isDesktop={isDesktop} />;
};

// After
import { useDevice } from '@/contexts/DeviceContext';

const Section = () => {
  const { isDesktop } = useDevice();
  return <Content />;
};
```

### Step 3: Simplify animations

```javascript
// Before - 40 lines of gsap setup
useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.from(..., 0.8, stagger: 0.15, ...);
  });
}, []);

// After - 1 line
const ref = useScrollReveal();
```

---

## Common Use Cases

### Responsive Layout

```javascript
import { useDevice } from '@/contexts/DeviceContext';

const Layout = () => {
  const { isMobile, isTablet, isDesktop } = useDevice();

  return (
    <>
      {isMobile && <MobileMenu />}
      {isDesktop && <DesktopNav />}
    </>
  );
};
```

### Scroll Animations

```javascript
import { useScrollReveal } from '@/hooks';

const Projects = () => {
  const ref = useScrollReveal({
    duration: 1.0,
    stagger: 0.2,
    triggerStart: 'top 80%',
  });

  return (
    <section ref={ref}>
      <div className='staggered-reveal'>Project 1</div>
      <div className='staggered-reveal'>Project 2</div>
    </section>
  );
};
```

### Logging

```javascript
import { logger } from '@/utils/logger';

const handleClick = () => {
  logger.info('User clicked button', { timestamp: Date.now() });
  // Logs: [INFO] User clicked button { timestamp: ... }
};

try {
  await fetchData();
} catch (error) {
  logger.error('Failed to fetch', error);
  // Also sent to Sentry/error tracking if configured
}
```

### Project Filtering

```javascript
import { filterProjects, sortProjectsByDate } from '@/utils';
import { PROJECTS } from '@/constants';

const ProjectList = () => {
  const [search, setSearch] = useState('');

  const filtered = filterProjects(PROJECTS, search);
  const sorted = sortProjectsByDate(filtered, 'desc');

  return (
    <>
      <input onChange={e => setSearch(e.target.value)} />
      {sorted.map(p => (
        <ProjectCard key={p.name} project={p} />
      ))}
    </>
  );
};
```

---

## File Locations

| Feature   | Location               | Import                                    |
| --------- | ---------------------- | ----------------------------------------- |
| Constants | `constants/*/`         | `import { ... } from '@/constants'`       |
| Contexts  | `contexts/*.js`        | `import { useContext } from '@/contexts'` |
| Hooks     | `hooks/*.js`           | `import { useHook } from '@/hooks'`       |
| Utils     | `utils/*.js`           | `import { util } from '@/utils'`          |
| Config    | `config/app.config.js` | `import { APP_CONFIG } from '@/config'`   |

---

## Troubleshooting

### "Cannot find module @/constants"

→ Check `jsconfig.json` has `@/*` path alias (it should)

### "useDevice is not a hook"

→ Make sure you import from context:
`import { useDevice } from '@/contexts/DeviceContext'`

### "Scroll animation not working"

→ Add `className='staggered-reveal'` to elements you want to animate

### "Constants not found"

→ Use new structure: `import { PROJECTS } from '@/constants'` (not from each
file)

---

## Next Steps (Optional)

Want to go further? Consider:

1. **Dynamic Imports** - Lazy load big components

   ```javascript
   import dynamic from 'next/dynamic';
   const Reviews = dynamic(() => import('@/components/Reviews'), {
     loading: () => <Skeleton />,
   });
   ```

2. **Theme Toggle** - Dark/light mode

   ```javascript
   import { useTheme } from '@/contexts/ThemeContext';
   const { theme, toggleTheme } = useTheme();
   ```

3. **Reading Time** - For blog posts

   ```javascript
   import { getReadingTimeEstimate } from '@/utils';
   const time = getReadingTimeEstimate(blogContent);
   ```

4. **Page Transitions** - Smooth animations
   ```javascript
   import PageTransition from '@/components/PageTransition';
   <PageTransition>
     <YourPage />
   </PageTransition>;
   ```

---

## Performance Gains

Your refactored code gets:

- ⚡ **Fewer re-renders** - Components only update when needed
- ⚡ **Less duplicated code** - Shared hooks reduce bundle size
- ⚡ **Better organization** - Faster development & debugging
- ⚡ **Smooth animations** - Optimized GSAP & Framer Motion

---

## Need More Info?

| Document                         | Content                     | Read Time |
| -------------------------------- | --------------------------- | --------- |
| `IMPLEMENTATION_SUMMARY.md`      | Full overview of changes    | 5 min     |
| `ARCHITECTURE_IMPROVEMENTS.md`   | Detailed technical guide    | 10 min    |
| `IMPLEMENTATION_CHECKLIST.md`    | Todo list & migration guide | 3 min     |
| `CODE_REVIEW_RECOMMENDATIONS.md` | Original suggestions        | 15 min    |

---

## Summary

You now have:

- ✅ Clean, organized code
- ✅ Reusable hooks & contexts
- ✅ Better performance
- ✅ Professional architecture
- ✅ Full documentation

**Start using it today!** Your first update should just be changing import
paths. 🎉

---

**Questions? Check the detailed docs above or look at updated components as
examples!**
