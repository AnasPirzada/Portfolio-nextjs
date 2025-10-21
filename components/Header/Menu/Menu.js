import React, { useEffect } from "react";
import { MENULINKS } from "../../../constants";

const Menu = () => {
  useEffect(() => {
    const anchorNodes = document.querySelectorAll('a[href^="#"]');

    anchorNodes.forEach((el) => {
      el.addEventListener("click", () => {
        const checkbox = document.querySelector(".checkbox-toggle");
        checkbox.checked = false;
      });
    });
  }, []);

  return (
    <div className="menu fixed top-0 left-0 w-full h-full overflow-hidden invisible pointer-events-none flex items-center justify-start bg-black">
      <div className="flex-none overflow-hidden flex items-center justify-start w-full h-full">
        <div className="text-left opacity-0 overflow-y-auto overflow-x-hidden flex flex-none justify-start items-center max-h-screen w-full h-full bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="absolute inset-0 bg-black opacity-90"></div>
          <div className="relative z-10 w-full h-full flex items-center justify-start p-8">
            <ul className="list-none py-1 px-0 m-0 block max-h-screen">
              {MENULINKS.map((el) => (
                <li key={el.name} className="p-0 m-1 text-4xl block">
                  <a
                    className="link relative inline font-bold text-6xl duration-300 hover:no-underline text-white hover:text-gray-300 transition-colors"
                    style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}
                    href={`#${el.ref}`}
                  >
                    {el.name.toUpperCase()}
                  </a>
                </li>
              ))}
            </ul>
            
            {/* Contact Us Button */}
            <div className="absolute bottom-8 right-8">
              <a
                href="#contact"
                className="bg-white text-black px-6 py-3 rounded-lg font-bold text-lg hover:bg-gray-200 transition-colors duration-300"
                style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}
              >
                CONTACT US
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
