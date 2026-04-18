import * as React from "react";
import { GooeyText } from "@/components/ui/gooey-text-morphing";

function GooeyTextDemo() {
  return (
    <div className="flex h-[200px] items-center justify-center">
      <GooeyText
        texts={["Design", "Engineering", "Is", "Awesome"]}
        morphTime={1}
        cooldownTime={0.25}
        className="font-bold"
        textClassName="text-6xl md:text-[60pt] text-gray-dark-1 dark:text-white"
      />
    </div>
  );
}

export { GooeyTextDemo };
