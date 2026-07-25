"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

export type PixelHeadingMode = "uniform" | "multi" | "wave" | "random";

export interface PixelHeadingProps {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: string;
  mode?: PixelHeadingMode;
  autoPlay?: boolean;
  cycleInterval?: number;
  staggerDelay?: number;
  defaultFontIndex?: number;
  showLabel?: boolean;
  prefix?: string;
  prefixFont?: "square" | "grid" | "circle" | "triangle" | "line" | "none";
  isolate?: Record<string, string>;
  onFontIndexChange?: (index: number) => void;
  className?: string;
}

const FONTS = [
  "font-pixel-square",
  "font-pixel-grid",
  "font-pixel-circle",
  "font-pixel-triangle",
  "font-pixel-line",
] as const;

const FONT_NAMES = ["square", "grid", "circle", "triangle", "line"] as const;

// Golden ratio algorithm for even distribution across adjacent characters
function getGoldenFontIndex(index: number): number {
  const phi = 0.618033988749895;
  return Math.floor(((index * phi) % 1) * FONTS.length);
}

export function PixelHeading({
  as: Component = "h2",
  children,
  mode = "uniform",
  autoPlay = false,
  cycleInterval = 150,
  staggerDelay = 50,
  defaultFontIndex = 0,
  showLabel = false,
  prefix,
  prefixFont = "none",
  isolate,
  onFontIndexChange,
  className,
}: PixelHeadingProps) {
  const chars = typeof children === "string" ? children.split("") : [];
  const [isAnimating, setIsAnimating] = useState(autoPlay);
  const [uniformIndex, setUniformIndex] = useState(defaultFontIndex);
  const [tick, setTick] = useState(0);

  // Interval timer ref
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startAnim = useCallback(() => setIsAnimating(true), []);
  const stopAnim = useCallback(() => {
    if (!autoPlay) setIsAnimating(false);
  }, [autoPlay]);

  useEffect(() => {
    if (!isAnimating) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setTick((t) => t + 1);
      if (mode === "uniform") {
        setUniformIndex((prev) => {
          const next = (prev + 1) % FONTS.length;
          onFontIndexChange?.(next);
          return next;
        });
      }
    }, cycleInterval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isAnimating, cycleInterval, mode, onFontIndexChange]);

  const getCharFontClass = (charIndex: number, char: string) => {
    if (isolate && isolate[char]) {
      const font = isolate[char];
      return font === "sans" ? "font-sans" : font === "mono" ? "font-mono" : `font-pixel-${font}`;
    }

    if (mode === "uniform") {
      return FONTS[uniformIndex % FONTS.length];
    }

    if (mode === "wave") {
      const offset = isAnimating ? Math.floor(tick + (charIndex * staggerDelay) / 50) : charIndex;
      return FONTS[Math.abs(offset) % FONTS.length];
    }

    if (mode === "random") {
      if (isAnimating) {
        const randSeed = Math.floor(Math.sin(tick * 9999 + charIndex * 777) * 10000);
        return FONTS[Math.abs(randSeed) % FONTS.length];
      }
      return FONTS[getGoldenFontIndex(charIndex)];
    }

    // "multi" mode (default)
    if (isAnimating) {
      const charTick = Math.max(0, tick - Math.floor((charIndex * staggerDelay) / cycleInterval));
      const fontIdx = (getGoldenFontIndex(charIndex) + charTick) % FONTS.length;
      return FONTS[fontIdx];
    }

    return FONTS[getGoldenFontIndex(charIndex)];
  };

  const prefixFontClass =
    prefixFont !== "none" ? `font-pixel-${prefixFont}` : "";

  return (
    <div className="inline-flex flex-col items-center">
      <Component
        tabIndex={0}
        onMouseEnter={startAnim}
        onMouseLeave={stopAnim}
        onFocus={startAnim}
        onBlur={stopAnim}
        className={cn(
          "inline-flex flex-wrap items-center justify-center cursor-default select-none outline-none transition-colors",
          className
        )}
        aria-label={`${prefix ? `${prefix} ` : ""}${children}`}
      >
        {prefix && (
          <span className={cn("mr-[0.25em] inline-block", prefixFontClass)}>
            {prefix}
          </span>
        )}
        {chars.map((char, i) => {
          if (char === " ") {
            return <span key={i} className="inline-block w-[0.3em]" aria-hidden="true" />;
          }
          const fontClass = getCharFontClass(i, char);
          return (
            <span
              key={i}
              className={cn("inline-block transition-all duration-75", fontClass)}
              aria-hidden="true"
            >
              {char}
            </span>
          );
        })}
      </Component>
      {showLabel && (
        <span className="mt-2 text-[10px] uppercase tracking-widest text-muted/70 font-mono">
          {mode === "uniform" ? FONT_NAMES[uniformIndex % FONTS.length] : mode}
        </span>
      )}
    </div>
  );
}
