"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const FlipWords = ({
  words,
  duration = 3000,
  className,
}: {
  words: string[];
  duration?: number;
  className?: string;
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, duration);
    return () => clearInterval(interval);
  }, [words.length, duration]);

  const currentWord = words[index];

  return (
    <div className="inline-block relative text-left py-0.5">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentWord}
          initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
          transition={{
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
          }}
          className={cn(
            "inline-block font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-purple-500 to-purple-900 drop-shadow-[0_0_20px_rgba(168,85,247,0.4)]",
            className
          )}
        >
          {currentWord}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

export const LayoutTextFlip = FlipWords;
