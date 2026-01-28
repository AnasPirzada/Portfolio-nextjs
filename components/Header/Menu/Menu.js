import { useEffect, useRef } from 'react';
import { useMotionValue, motion, useSpring, useTransform } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { MENULINKS } from '../../../constants';

const Menu = () => {
  useEffect(() => {
    const anchorNodes = document.querySelectorAll('a[href^="#"]');

    anchorNodes.forEach(el => {
      el.addEventListener('click', e => {
        e.preventDefault();
        const href = el.getAttribute('href');
        const targetId = href.replace('#', '');
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }

        const checkbox = document.querySelector('.checkbox-toggle');
        if (checkbox) {
          checkbox.checked = false;
        }
      });
    });
  }, []);

  return (
    <div
      id="navigation-menu"
      className="menu fixed top-0 left-0 w-full h-full overflow-hidden invisible pointer-events-none flex items-center justify-start bg-black dark:bg-black"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex-none overflow-hidden flex items-center justify-start w-full h-full">
        <div className="text-left opacity-0 overflow-y-auto flex flex-none justify-start items-center w-full h-full bg-gradient-to-br from-gray-100 via-gray-50 to-white dark:from-black dark:via-gray-900 dark:to-black">
          <div className="absolute inset-0 bg-white/90 dark:bg-black/90"></div>
          <div className="relative z-10 w-full h-full flex flex-col items-center md:items-start justify-center p-4 sm:p-6 md:p-8 overflow-y-auto">
            {/* Menu Links */}
            <section className="w-full max-w-5xl mx-auto">
              {MENULINKS.filter(
                el => ['Home', 'Projects', 'Work', 'Blogs'].includes(el.name)
              ).map(el => (
                <MenuLink
                  key={el.name}
                  heading={el.name}
                  subheading={el.subheading || `Navigate to ${el.name} section`}
                  imgSrc={el.imgSrc}
                  href={`#${el.ref}`}
                />
              ))}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

const MenuLink = ({ heading, imgSrc, subheading, href }) => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const top = useTransform(mouseYSpring, [0.5, -0.5], ['40%', '60%']);
  const left = useTransform(mouseXSpring, [0.5, -0.5], ['60%', '70%']);

  const handleMouseMove = e => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  return (
    <motion.a
      href={href}
      ref={ref}
      onMouseMove={handleMouseMove}
      initial="initial"
      whileHover="whileHover"
      className="group relative flex items-center justify-between border-b-2 border-neutral-700 dark:border-neutral-700 py-4 transition-colors duration-500 hover:border-neutral-50 dark:hover:border-neutral-50 md:py-8"
    >
      <div>
        <motion.span
          variants={{
            initial: { x: 0 },
            whileHover: { x: -16 },
          }}
          transition={{
            type: 'spring',
            staggerChildren: 0.075,
            delayChildren: 0.25,
          }}
          className="relative z-10 block text-4xl font-bold text-neutral-500 dark:text-neutral-500 transition-colors duration-500 group-hover:text-neutral-50 dark:group-hover:text-neutral-50 md:text-6xl"
          style={{
            fontFamily:
              'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          }}
        >
          {heading.split('').map((l, i) => (
            <motion.span
              variants={{
                initial: { x: 0 },
                whileHover: { x: 16 },
              }}
              transition={{ type: 'spring' }}
              className="inline-block"
              key={i}
            >
              {l}
            </motion.span>
          ))}
        </motion.span>
        <span className="relative z-10 mt-2 block text-base text-neutral-500 dark:text-neutral-500 transition-colors duration-500 group-hover:text-neutral-50 dark:group-hover:text-neutral-50">
          {subheading}
        </span>
      </div>

      {imgSrc && (
        <motion.img
          style={{
            top,
            left,
            translateX: '-50%',
            translateY: '-50%',
          }}
          variants={{
            initial: { scale: 0, rotate: '-12.5deg' },
            whileHover: { scale: 1, rotate: '12.5deg' },
          }}
          transition={{ type: 'spring' }}
          src={imgSrc}
          className="absolute z-0 h-24 w-32 rounded-lg object-cover md:h-48 md:w-64 hidden md:block"
          alt={`Image representing a link for ${heading}`}
          onError={e => {
            e.target.style.display = 'none';
          }}
        />
      )}

      <motion.div
        variants={{
          initial: {
            x: '25%',
            opacity: 0,
          },
          whileHover: {
            x: '0%',
            opacity: 1,
          },
        }}
        transition={{ type: 'spring' }}
        className="relative z-10 p-2 md:p-4"
      >
        <FiArrowRight className="text-3xl md:text-5xl text-neutral-50 dark:text-neutral-50" />
      </motion.div>
    </motion.a>
  );
};

export default Menu;
