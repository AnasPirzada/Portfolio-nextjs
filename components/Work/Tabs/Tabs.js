import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "utils/cn";

const Tab = ({ index, tab, activeTab, handleOnClick }) => {
  return (
    <button
      onMouseDown={() => handleOnClick(index)}
      className="relative px-4 py-1 rounded-full cursor-none"
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      {activeTab.value === tab.value && (
        <motion.div
          layoutId="clickedbutton"
          transition={{ type: "spring", bounce: 0.3, duration: 0.7 }}
          className="absolute inset-0 bg-gray-dark-2 rounded-full"
        />
      )}

      <span
        className={cn(
          "relative text-white top-[3px] link",
          tab.value !== activeTab.value && "hover:text-gray-light-3"
        )}
      >
        {tab.title}
      </span>
    </button>
  );
};

const TabsContent = ({ tabs, activeTab }) => {
  return (
    <div className="relative w-full h-full">
      <motion.div
        key={activeTab.value}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="w-full mt-36 md:mt-32"
      >
        {activeTab.content}
      </motion.div>
    </div>
  );
};

const mouseClickSound = new Howl({
  src: ["/sounds/mouse-click.mp3"],
});

const Tabs = ({ tabItems }) => {
  const [tabs, setTabs] = useState(tabItems);
  const [activeTab, setActiveTab] = useState(tabItems[0]);

  const handleOnClick = (index) => {
    const updatedTabs = [...tabItems];
    const selectedTab = updatedTabs.splice(index, 1);
    updatedTabs.unshift(selectedTab[0]);
    setTabs(updatedTabs);
    setActiveTab(updatedTabs[0]);
    mouseClickSound.play();
  };

  return (
    <div className="staggered-reveal">
      <div className="pt-12 flex flex-row justify-center items-center [perspective:1000px] relative overflow-auto sm:overflow-visible no-visible-scrollbar max-w-full w-full">
        {tabItems.map((tab, index) => (
          <Tab
            key={tab.title}
            index={index}
            tab={tab}
            activeTab={activeTab}
            handleOnClick={handleOnClick}
          />
        ))}
      </div>
      <TabsContent
        tabs={tabs}
        activeTab={activeTab}
      />
    </div>
  );
};

export default Tabs;
