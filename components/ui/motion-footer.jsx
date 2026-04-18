'use client';

import { cn } from '@/lib/utils';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';

/**
 * Magnetic hover button (GSAP). Matches portfolio theme — no shadcn required.
 */
export const MagneticButton = ({
  className,
  children,
  as: Component = 'button',
  ...props
}) => {
  const localRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const element = localRef.current;
    if (!element) return;

    gsap.set(element, { transformPerspective: 900 });

    const handleMouseMove = e => {
      const rect = element.getBoundingClientRect();
      const hx = rect.width / 2;
      const hy = rect.height / 2;
      const x = e.clientX - rect.left - hx;
      const y = e.clientY - rect.top - hy;

      gsap.to(element, {
        x: x * 0.35,
        y: y * 0.35,
        rotationX: -y * 0.12,
        rotationY: x * 0.12,
        scale: 1.04,
        ease: 'power2.out',
        duration: 0.35,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        rotationX: 0,
        rotationY: 0,
        scale: 1,
        ease: 'elastic.out(1, 0.35)',
        duration: 1,
      });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <Component
      ref={localRef}
      className={cn('cursor-pointer will-change-transform', className)}
      style={{ transformStyle: 'preserve-3d' }}
      {...props}
    >
      {children}
    </Component>
  );
};

/** Injected once in the footer — theme-aware via .dark / html:not(.dark) */
export const FOOTER_CINEMATIC_CSS = `
@keyframes footer-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.45; }
  100% { transform: translate(-50%, -50%) scale(1.08); opacity: 0.85; }
}
@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
@keyframes footer-heartbeat {
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 4px rgba(239, 192, 65, 0.35)); }
  25% { transform: scale(1.15); filter: drop-shadow(0 0 12px rgba(239, 192, 65, 0.55)); }
  50% { transform: scale(1); }
}
.animate-footer-breathe {
  animation: footer-breathe 10s ease-in-out infinite alternate;
}
.animate-footer-scroll-marquee {
  animation: footer-scroll-marquee 45s linear infinite;
}
.animate-footer-heartbeat {
  animation: footer-heartbeat 2.2s cubic-bezier(0.25, 1, 0.5, 1) infinite;
}
.cinematic-footer-scope .footer-bg-grid {
  background-size: 56px 56px;
  background-image:
    linear-gradient(to right, rgba(239, 192, 65, 0.06) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(239, 192, 65, 0.06) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 25%, black 75%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 25%, black 75%, transparent);
}
html:not(.dark) .cinematic-footer-scope .footer-bg-grid {
  background-image:
    linear-gradient(to right, rgba(0, 0, 0, 0.06) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0, 0, 0, 0.06) 1px, transparent 1px);
}
.cinematic-footer-scope .footer-aurora {
  background: radial-gradient(
    circle at 50% 45%,
    rgba(239, 192, 65, 0.14) 0%,
    rgba(238, 186, 44, 0.08) 42%,
    transparent 68%
  );
}
html:not(.dark) .cinematic-footer-scope .footer-aurora {
  background: radial-gradient(
    circle at 50% 45%,
    rgba(239, 192, 65, 0.22) 0%,
    rgba(238, 186, 44, 0.12) 45%,
    transparent 70%
  );
}
.cinematic-footer-scope .footer-glass-pill {
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.06) 0%,
    rgba(255, 255, 255, 0.02) 100%
  );
  box-shadow:
    0 10px 32px -12px rgba(0, 0, 0, 0.45),
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    inset 0 -1px 0 rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(239, 192, 65, 0.18);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.cinematic-footer-scope .footer-glass-pill:hover {
  border-color: rgba(239, 192, 65, 0.45);
  box-shadow:
    0 18px 40px -10px rgba(239, 192, 65, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.12);
}
html:not(.dark) .cinematic-footer-scope .footer-glass-pill {
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.85) 0%, rgba(250, 250, 250, 0.65) 100%);
  border-color: rgba(0, 0, 0, 0.08);
  box-shadow: 0 10px 28px -8px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.9);
}
html:not(.dark) .cinematic-footer-scope .footer-glass-pill:hover {
  border-color: rgba(239, 192, 65, 0.5);
}
.cinematic-footer-scope .footer-giant-bg-text {
  font-size: min(22vw, 18rem);
  line-height: 0.78;
  font-weight: 900;
  letter-spacing: -0.06em;
  color: transparent;
  -webkit-text-stroke: 1px rgba(239, 192, 65, 0.12);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.07) 0%, transparent 62%);
  -webkit-background-clip: text;
  background-clip: text;
}
html:not(.dark) .cinematic-footer-scope .footer-giant-bg-text {
  -webkit-text-stroke: 1px rgba(0, 0, 0, 0.08);
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.06) 0%, transparent 62%);
  -webkit-background-clip: text;
  background-clip: text;
}
.cinematic-footer-scope .footer-text-glow {
  background: linear-gradient(180deg, #fff 0%, rgba(255, 255, 255, 0.55) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 0 24px rgba(239, 192, 65, 0.12));
}
html:not(.dark) .cinematic-footer-scope .footer-text-glow {
  background: linear-gradient(180deg, #111 0%, rgba(17, 17, 17, 0.65) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
`;
