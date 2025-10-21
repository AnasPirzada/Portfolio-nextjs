import gsap from 'gsap';
import { useEffect, useRef } from 'react';

const Cursor = ({ isDesktop }) => {
  const cursor = useRef(null);
  const follower = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    if (isDesktop && document.body.clientWidth > 767) {
      follower.current.classList.remove('hidden');
      cursor.current.classList.remove('hidden');
      ring.current.classList.remove('hidden');

      const moveCircle = e => {
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
      };

      const hover = () => {
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
      };

      const unHover = () => {
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
      };

      const handleClick = () => {
        gsap.to(cursor.current, {
          scale: 0.5,
          duration: 0.1,
        });
        gsap.to(ring.current, {
          scale: 1.5,
          duration: 0.2,
          ease: 'power2.out',
        });
        setTimeout(() => {
          gsap.to(cursor.current, {
            scale: 1,
            duration: 0.2,
          });
          gsap.to(ring.current, {
            scale: 1,
            duration: 0.3,
          });
        }, 200);
      };

      document.addEventListener('mousemove', moveCircle);
      document.addEventListener('mousedown', handleClick);

      document.querySelectorAll('.link, a, button').forEach(el => {
        el.addEventListener('mouseenter', hover);
        el.addEventListener('mouseleave', unHover);
      });

      return () => {
        document.removeEventListener('mousemove', moveCircle);
        document.removeEventListener('mousedown', handleClick);

        document.querySelectorAll('.link, a, button').forEach(el => {
          el.removeEventListener('mouseenter', hover);
          el.removeEventListener('mouseleave', unHover);
        });
      };
    }
  }, [cursor, follower, ring, isDesktop]);

  return (
    <>
      {/* Main cursor dot - glowing center */}
      <div
        ref={cursor}
        className='fixed w-3 h-3 rounded-full select-none pointer-events-none z-[9999] hidden cursor-dot'
        style={{
          background: 'radial-gradient(circle, #efc041 0%, #eeba2c 100%)',
          boxShadow: '0 0 20px rgba(239, 192, 65, 0.8), 0 0 40px rgba(239, 192, 65, 0.4)',
          transform: 'translate(-50%, -50%)',
          mixBlendMode: 'difference',
        }}
      />
      
      {/* Outer ring - animated border */}
      <div
        ref={ring}
        className='fixed w-8 h-8 rounded-full border-2 select-none pointer-events-none z-[9999] hidden cursor-ring'
        style={{
          borderColor: 'rgba(239, 192, 65, 0.8)',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, transparent 60%, rgba(239, 192, 65, 0.15) 100%)',
          mixBlendMode: 'difference',
        }}
      />
      
      {/* Follower circle - large subtle glow */}
      <div
        ref={follower}
        className='fixed w-12 h-12 rounded-full select-none pointer-events-none z-[9999] hidden cursor-follower'
        style={{
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </>
  );
};

export default Cursor;
