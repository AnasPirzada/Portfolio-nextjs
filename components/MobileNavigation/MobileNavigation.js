import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { MENULINKS } from '../../constants';

const MobileNavigation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if mobile on client side only
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleScroll = () => {
      // Show navigation when scrolled down, hide when at top
      const scrolled = window.scrollY > 100;
      setIsVisible(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const handleNavigation = ref => {
    if (router.pathname !== '/') {
      router.push(`/#${ref}`);
    } else {
      const element = document.getElementById(ref);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Only show on mobile devices - use state to avoid hydration mismatch
  if (!isMobile) {
    return null;
  }

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-lg border-t border-white/10 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
      aria-label="Mobile navigation"
    >
      <div className="flex justify-around items-center h-16 px-4">
        {MENULINKS.slice(0, 5).map(link => (
          <button
            key={link.ref}
            onClick={() => handleNavigation(link.ref)}
            className="flex flex-col items-center justify-center gap-1 text-xs text-gray-400 hover:text-[#eeba2c] transition-colors active:scale-95"
            aria-label={`Navigate to ${link.name}`}
          >
            <span className="text-lg">{getIcon(link.name)}</span>
            <span>{link.name}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

const getIcon = name => {
  const icons = {
    Home: '🏠',
    Skills: '💻',
    Projects: '📁',
    Education: '🎓',
    Work: '💼',
    Blogs: '📝',
    Contact: '📧',
  };
  return icons[name] || '•';
};

export default MobileNavigation;
