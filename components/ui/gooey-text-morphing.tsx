"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface GooeyTextProps {
  texts: string[];
  morphTime?: number;
  cooldownTime?: number;
  className?: string;
  textClassName?: string;
}

export function GooeyText({
  texts,
  morphTime = 1,
  cooldownTime = 0.25,
  className,
  textClassName,
}: GooeyTextProps) {
  const text1Ref = React.useRef<HTMLSpanElement>(null);
  const text2Ref = React.useRef<HTMLSpanElement>(null);
  const rawId = React.useId();
  const filterId = `gooey-threshold-${rawId.replace(/:/g, "")}`;
  const longest = React.useMemo(
    () => texts.reduce((a, b) => (a.length >= b.length ? a : b), ""),
    [texts]
  );

  React.useEffect(() => {
    let textIndex = texts.length - 1;
    let time = new Date();
    let morph = 0;
    let cooldown = cooldownTime;
    let rafId = 0;
    let stopped = false;

    const setMorph = (fraction: number) => {
      if (text1Ref.current && text2Ref.current) {
        text2Ref.current.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
        text2Ref.current.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

        fraction = 1 - fraction;
        text1Ref.current.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
        text1Ref.current.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
      }
    };

    const doCooldown = () => {
      morph = 0;
      if (text1Ref.current && text2Ref.current) {
        text2Ref.current.style.filter = "";
        text2Ref.current.style.opacity = "100%";
        text1Ref.current.style.filter = "";
        text1Ref.current.style.opacity = "0%";
      }
    };

    const doMorph = () => {
      morph -= cooldown;
      cooldown = 0;
      let fraction = morph / morphTime;

      if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
      }

      setMorph(fraction);
    };

    function animate() {
      if (stopped) return;
      rafId = requestAnimationFrame(animate);
      const newTime = new Date();
      const shouldIncrementIndex = cooldown > 0;
      const dt = (newTime.getTime() - time.getTime()) / 1000;
      time = newTime;

      cooldown -= dt;

      if (cooldown <= 0) {
        if (shouldIncrementIndex) {
          textIndex = (textIndex + 1) % texts.length;
          if (text1Ref.current && text2Ref.current) {
            text1Ref.current.textContent = texts[textIndex % texts.length];
            text2Ref.current.textContent =
              texts[(textIndex + 1) % texts.length];
          }
        }
        doMorph();
      } else {
        doCooldown();
      }
    }

    rafId = requestAnimationFrame(animate);

    return () => {
      stopped = true;
      cancelAnimationFrame(rafId);
    };
  }, [texts, morphTime, cooldownTime]);

  return (
    <div
      className={cn(
        "relative inline-grid place-items-center [grid-template-areas:'stack']",
        className
      )}
    >
      <svg className="absolute h-0 w-0" aria-hidden="true" focusable="false">
        <defs>
          <filter id={filterId}>
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>

      <span
        className={cn(
          "invisible col-start-1 row-start-1 whitespace-nowrap [grid-area:stack]",
          textClassName
        )}
        aria-hidden
      >
        {longest}
      </span>

      <div
        className="flex items-center justify-center [grid-area:stack]"
        style={{ filter: `url(#${filterId})` }}
      >
        <span
          ref={text1Ref}
          className={cn(
            "absolute inline-block select-none text-center",
            textClassName
          )}
        />
        <span
          ref={text2Ref}
          className={cn(
            "absolute inline-block select-none text-center",
            textClassName
          )}
        />
      </div>
    </div>
  );
}
