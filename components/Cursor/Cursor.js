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

        const hover = () => {
          try {
            if (cursor.current && ring.current && follower.current) {
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
              gsap.to(follower.current, {
                scale: 0.8,
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
              gsap.to(follower.current, {
                scale: 1,
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
            document.querySelectorAll('.link, a, button').forEach(el => {
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

            document.querySelectorAll('.link, a, button').forEach(el => {
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
          background: 'radial-gradient(circle, #efc041 0%, #eeba2c 100%)',
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
