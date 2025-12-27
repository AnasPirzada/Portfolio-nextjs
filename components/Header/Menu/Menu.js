import { useEffect } from 'react';
import { MENULINKS } from '../../../constants';
import ScramblingText from './ScramblingText';

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
      id='navigation-menu'
      className='menu fixed top-0 left-0 w-full h-full overflow-hidden invisible pointer-events-none flex items-center justify-start bg-black'
      role='navigation'
      aria-label='Main navigation'
    >
      <div className='flex-none overflow-hidden flex items-center justify-start w-full h-full'>
        <div className='text-left opacity-0 overflow-hidden flex flex-none justify-start items-center w-full h-full bg-gradient-to-br from-black via-gray-900 to-black'>
          <div className='absolute inset-0 bg-black opacity-90'></div>
          <div className='relative z-10 w-full h-full flex flex-col items-center md:items-start justify-center p-4 sm:p-6 md:p-8'>
            <ul
              className='list-none py-1 px-0 m-0 block w-full text-center md:text-left'
              role='menubar'
            >
              {MENULINKS.filter(el => el.name !== 'Contact').map((el, index) => {
                const isBlogs = el.name === 'Blogs';

                if (isBlogs) {
                  return (
                    <li
                      key={el.name}
                      className='p-0 m-3 sm:m-3 md:m-4 text-3xl sm:text-3xl md:text-4xl flex items-center justify-center md:justify-between w-full flex-wrap gap-4'
                      role='none'
                    >
                      <a
                        className='link relative inline font-bold text-6xl sm:text-5xl md:text-4xl lg:text-6xl xl:text-7xl 2xl:text-8xl duration-300 hover:no-underline text-white hover:text-gray-300 transition-colors'
                        style={{
                          fontFamily:
                            'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                        }}
                        href={`#${el.ref}`}
                        role='menuitem'
                        aria-label={`Navigate to ${el.name} section`}
                      >
                        <ScramblingText 
                          text={el.name.toUpperCase()} 
                          delay={0}
                        />
                      </a>
                      {/* Contact Us Button - Same row as Blogs, on the right */}
                      <a
                        href='#contact'
                        className='link relative inline-block font-bold text-4xl sm:text-3xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl duration-300 px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 lg:px-8 lg:py-4 xl:px-10 xl:py-5 rounded-lg border-2 border-white text-white hover:bg-[#efc041] hover:text-black hover:border-[#efc041] transition-all whitespace-nowrap'
                        style={{
                          fontFamily:
                            'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                        }}
                        role='menuitem'
                        aria-label='Navigate to Contact section'
                      >
                        CONTACT US
                      </a>
                    </li>
                  );
                }

                return (
                  <li
                    key={el.name}
                    className='p-0 m-3 sm:m-3 md:m-4 text-3xl sm:text-3xl md:text-4xl block'
                    role='none'
                  >
                    <a
                      className='link relative inline font-bold text-6xl sm:text-5xl md:text-4xl lg:text-6xl xl:text-7xl 2xl:text-8xl duration-300 hover:no-underline text-white hover:text-gray-300 transition-colors'
                      style={{
                        fontFamily:
                          'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                      }}
                      href={`#${el.ref}`}
                      role='menuitem'
                      aria-label={`Navigate to ${el.name} section`}
                    >
                      <ScramblingText 
                        text={el.name.toUpperCase()} 
                        delay={0}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
