import gsap from 'gsap';
import { useEffect, useRef } from 'react';

const Cursor = ({ isDesktop }) => {
  const cursor = useRef(null);
  const follower = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    try {
      if (
        isDesktop &&
        document.body.clientWidth > 767 &&
        cursor.current &&
        follower.current &&
        ring.current
      ) {
        // Mark cursor as loaded
        document.body.classList.add('cursor-loaded');

        // Show cursor elements
        follower.current.classList.remove('hidden');
        cursor.current.classList.remove('hidden');
        ring.current.classList.remove('hidden');

        const moveCircle = e => {
          try {
            if (cursor.current && ring.current && follower.current) {
              // Main cursor dot
              gsap.to(cursor.current, {
                x: e.clientX,
                y: e.clientY,
                duration: 0,
                ease: 'none',
              });

              // Outer ring
              gsap.to(ring.current, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.15,
                ease: 'power2.out',
              });

              // Follower circle
              gsap.to(follower.current, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.4,
                ease: 'power2.out',
              });
            }
          } catch (err) {
            console.warn('Cursor move error:', err);
          }
        };

        // Helpers to derive theme-aware cursor colors based on hovered element
        const getThemeAwareCursorColors = target => {
          try {
            const root = document.documentElement;
            const isDark = root.classList.contains('dark');
            const rootStyles = getComputedStyle(root);

            const accentLight =
              rootStyles.getPropertyValue('--accent-light') || '#c8860a';
            const accentDark =
              rootStyles.getPropertyValue('--accent-dark') || '#b5750a';
            const textPrimary =
              rootStyles.getPropertyValue('--text-primary') ||
              (isDark ? '#ffffff' : '#121212');

            const parseColorToRgb = colorStr => {
              if (!colorStr) return null;
              const str = colorStr.trim();

              // rgb/rgba format
              if (str.startsWith('rgb')) {
                const nums = str
                  .replace(/rgba?\(/, '')
                  .replace(')', '')
                  .split(',')
                  .map(v => parseFloat(v.trim()))
                  .slice(0, 3);
                if (nums.length === 3 && nums.every(n => !Number.isNaN(n))) {
                  return { r: nums[0], g: nums[1], b: nums[2] };
                }
                return null;
              }

              // hex format
              if (str.startsWith('#')) {
                let hex = str.slice(1);
                if (hex.length === 3) {
                  hex = hex
                    .split('')
                    .map(c => c + c)
                    .join('');
                }
                if (hex.length === 6) {
                  const r = parseInt(hex.slice(0, 2), 16);
                  const g = parseInt(hex.slice(2, 4), 16);
                  const b = parseInt(hex.slice(4, 6), 16);
                  if (
                    [r, g, b].every(
                      v => typeof v === 'number' && !Number.isNaN(v)
                    )
                  ) {
                    return { r, g, b };
                  }
                }
              }

              return null;
            };

            const getLuminance = ({ r, g, b }) => {
              const srgb = [r, g, b].map(v => {
                const c = v / 255;
                return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
              });
              return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
            };

            const styles = window.getComputedStyle(target);
            const bgColor =
              styles.backgroundColor &&
              styles.backgroundColor !== 'rgba(0, 0, 0, 0)'
                ? styles.backgroundColor
                : null;
            const textColor = styles.color;

            // Prefer background color; if none, use text color as reference
            const referenceColor =
              parseColorToRgb(bgColor) ||
              parseColorToRgb(textColor) ||
              parseColorToRgb(isDark ? '#000000' : '#ffffff');

            const luminance = referenceColor
              ? getLuminance(referenceColor)
              : isDark
                ? 0.1
                : 0.9;

            // Decide cursor accent based on element brightness + theme
            let primaryHex;
            if (luminance > 0.7) {
              // Very light surface → use darker text color/accent
              primaryHex = textPrimary || '#000000';
            } else if (luminance < 0.3) {
              // Very dark surface → use golden accent for contrast
              primaryHex = accentLight || '#c8860a';
            } else {
              // Mid-tone surface → use slightly deeper golden accent
              primaryHex = accentDark || accentLight || '#b5750a';
            }

            const primaryRgb = parseColorToRgb(primaryHex) || {
              r: 0,
              g: 0,
              b: 0,
            };

            return { primaryRgb };
          } catch (err) {
            console.warn('Cursor color calculation error:', err);
            return { primaryRgb: { r: 0, g: 0, b: 0 } };
          }
        };

        const hover = e => {
          try {
            if (cursor.current && ring.current && follower.current) {
              const target = e?.currentTarget || e?.target || document.body;
              const { primaryRgb } = getThemeAwareCursorColors(target);
              const { r, g, b } = primaryRgb || { r: 0, g: 0, b: 0 };

              gsap.to(cursor.current, {
                scale: 0,
                duration: 0.3,
                ease: 'back.in',
              });
              gsap.to(ring.current, {
                scale: 1.8,
                duration: 0.3,
                ease: 'back.out',
              });
              gsap.to(ring.current, {
                // Change outer ring color on hover based on hovered element + theme
                borderColor: `rgba(${r}, ${g}, ${b}, 0.9)`,
                background: `radial-gradient(circle, transparent 60%, rgba(${r}, ${g}, ${b}, 0.25) 100%)`,
                duration: 0.3,
                ease: 'power2.out',
              });
              gsap.to(follower.current, {
                scale: 0.8,
                duration: 0.3,
                ease: 'power2.out',
              });
              gsap.to(follower.current, {
                // Stronger glow on hover using same accent color
                background: `radial-gradient(circle, rgba(${r}, ${g}, ${b}, 0.25) 0%, transparent 70%)`,
                border: `1px solid rgba(${r}, ${g}, ${b}, 0.4)`,
                duration: 0.3,
                ease: 'power2.out',
              });
            }
          } catch (err) {
            console.warn('Cursor hover error:', err);
          }
        };

        const unHover = () => {
          try {
            if (cursor.current && ring.current && follower.current) {
              gsap.to(cursor.current, {
                scale: 1,
                duration: 0.3,
                ease: 'back.out',
              });
              gsap.to(ring.current, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out',
              });
              gsap.to(ring.current, {
                // Reset outer ring color to default golden theme accent
                borderColor: 'rgba(239, 192, 65, 0.8)',
                background:
                  'radial-gradient(circle, transparent 60%, rgba(239, 192, 65, 0.15) 100%)',
                duration: 0.3,
                ease: 'power2.out',
              });
              gsap.to(follower.current, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out',
              });
              gsap.to(follower.current, {
                // Reset follower glow to default subtle white
                background:
                  'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                duration: 0.3,
                ease: 'power2.out',
              });
            }
          } catch (err) {
            console.warn('Cursor unhover error:', err);
          }
        };

        const handleClick = () => {
          try {
            if (cursor.current && ring.current) {
              gsap.to(cursor.current, {
                scale: 0.8,
                duration: 0.1,
              });
              gsap.to(ring.current, {
                scale: 1.5,
                duration: 0.2,
                ease: 'power2.out',
              });
              setTimeout(() => {
                if (cursor.current && ring.current) {
                  gsap.to(cursor.current, {
                    scale: 1,
                    duration: 0.2,
                  });
                  gsap.to(ring.current, {
                    scale: 1,
                    duration: 0.3,
                  });
                }
              }, 200);
            }
          } catch (err) {
            console.warn('Cursor click error:', err);
          }
        };

        document.addEventListener('mousemove', moveCircle);
        document.addEventListener('mousedown', handleClick);

        // Add hover listeners with error handling
        const addHoverListeners = () => {
          try {
            document
              .querySelectorAll(
                [
                  '.link',
                  'a',
                  'button',
                  'img',
                  '.cursor-pointer',
                  '[role="button"]',
                  'p',
                  'span',
                  'h1',
                  'h2',
                  'h3',
                  'h4',
                  'h5',
                  'h6',
                  'li',
                  'label',
                ].join(', ')
              )
              .forEach(el => {
              try {
                el.addEventListener('mouseenter', hover);
                el.addEventListener('mouseleave', unHover);
              } catch (err) {
                console.warn('Error adding hover listener:', err);
              }
            });
          } catch (err) {
            console.warn('Error querying elements:', err);
          }
        };

        addHoverListeners();

        // Re-add listeners for dynamically added elements
        const observer = new MutationObserver(() => {
          addHoverListeners();
        });

        observer.observe(document.body, {
          childList: true,
          subtree: true,
        });

        return () => {
          try {
            document.removeEventListener('mousemove', moveCircle);
            document.removeEventListener('mousedown', handleClick);
            observer.disconnect();

            document
              .querySelectorAll(
                [
                  '.link',
                  'a',
                  'button',
                  'img',
                  '.cursor-pointer',
                  '[role="button"]',
                  'p',
                  'span',
                  'h1',
                  'h2',
                  'h3',
                  'h4',
                  'h5',
                  'h6',
                  'li',
                  'label',
                ].join(', ')
              )
              .forEach(el => {
              try {
                el.removeEventListener('mouseenter', hover);
                el.removeEventListener('mouseleave', unHover);
              } catch (err) {
                // Ignore cleanup errors
              }
            });
          } catch (err) {
            console.warn('Cursor cleanup error:', err);
          }
        };
      }
    } catch (err) {
      console.warn('Cursor initialization error:', err);
      // Fallback: show default cursor if custom cursor fails
      document.body.classList.remove('cursor-loaded');
      document.body.style.cursor = 'default';
    }

    // Cleanup on unmount
    return () => {
      try {
        document.body.classList.remove('cursor-loaded');
      } catch (err) {
        // Ignore cleanup errors
      }
    };
  }, [cursor, follower, ring, isDesktop]);

  return (
    <>
      {/* Main cursor dot - glowing center */}
      <div
        ref={cursor}
        className="fixed w-3 h-3 rounded-full select-none pointer-events-none z-[99999] hidden cursor-dot"
        style={{
          background:
            'radial-gradient(circle, var(--accent-light) 0%, var(--accent-dark) 100%)',
          boxShadow:
            '0 0 20px rgba(239, 192, 65, 0.8), 0 0 40px rgba(239, 192, 65, 0.4)',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Outer ring - animated border */}
      <div
        ref={ring}
        className="fixed w-8 h-8 rounded-full border-2 select-none pointer-events-none z-[99999] hidden cursor-ring"
        style={{
          borderColor: 'rgba(239, 192, 65, 0.8)',
          transform: 'translate(-50%, -50%)',
          background:
            'radial-gradient(circle, transparent 60%, rgba(239, 192, 65, 0.15) 100%)',
        }}
      />

      {/* Follower circle - large subtle glow */}
      <div
        ref={follower}
        className="fixed w-12 h-12 rounded-full select-none pointer-events-none z-[99999] hidden cursor-follower"
        style={{
          background:
            'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </>
  );
};

export default Cursor;
