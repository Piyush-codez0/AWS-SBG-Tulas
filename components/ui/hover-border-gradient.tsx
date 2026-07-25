"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Direction = "TOP" | "LEFT" | "BOTTOM" | "RIGHT";

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Tag = "button",
  duration = 1,
  clockwise = true,
  ...props
}: React.HTMLAttributes<HTMLElement> & {
  as?: React.ElementType;
  containerClassName?: string;
  className?: string;
  duration?: number;
  clockwise?: boolean;
}) {
  const [hovered, setHovered] = useState<boolean>(false);
  const [direction, setDirection] = useState<Direction>("TOP");

  const rotateDirection = (currentDirection: Direction): Direction => {
    const directions: Direction[] = ["TOP", "LEFT", "BOTTOM", "RIGHT"];
    const currentIndex = directions.indexOf(currentDirection);
    const nextIndex = clockwise
      ? (currentIndex - 1 + directions.length) % directions.length
      : (currentIndex + 1) % directions.length;
    return directions[nextIndex];
  };

  const movingGrad: Record<Direction, string> = {
    TOP: "radial-gradient(20.7% 50% at 50% 0%, #C084FC 0%, rgba(124, 58, 237, 0) 100%)",
    LEFT: "radial-gradient(16.6% 43.1% at 0% 50%, #C084FC 0%, rgba(124, 58, 237, 0) 100%)",
    BOTTOM: "radial-gradient(20.7% 50% at 50% 100%, #C084FC 0%, rgba(124, 58, 237, 0) 100%)",
    RIGHT: "radial-gradient(16.2% 41.19% at 100% 50%, #C084FC 0%, rgba(124, 58, 237, 0) 100%)",
  };

  const highlight =
    "radial-gradient(75% 181.159% at 50% 50%, #C084FC 0%, rgba(124, 58, 237, 0) 100%)";

  useEffect(() => {
    if (!hovered) {
      const interval = setInterval(() => {
        setDirection((prevState) => rotateDirection(prevState));
      }, duration * 1000);
      return () => clearInterval(interval);
    }
  }, [hovered, duration, clockwise]);

  return (
    <Tag
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative flex rounded-full border border-primary/30 content-center shadow-[0_0_20px_-3px_rgba(124,58,237,0.4)] hover:shadow-[0_0_30px_0px_rgba(192,132,252,0.6)] hover:border-primary/60 transition-all duration-500 items-center flex-col flex-nowrap gap-10 h-min justify-center overflow-visible p-px text-center w-fit",
        containerClassName
      )}
      {...props}
    >
      <div
        className={cn(
          "w-auto text-white z-10 bg-[#0f071a] hover:bg-[#1a0c2e] px-6 py-3 rounded-[inherit] transition-all duration-300 flex items-center justify-center gap-2 font-semibold",
          className
        )}
      >
        {children}
      </div>
      <motion.div
        className={cn(
          "flex-none inset-0 overflow-hidden absolute z-0 rounded-[inherit]"
        )}
        style={{
          filter: "blur(2px)",
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
        initial={{ background: movingGrad[direction] }}
        animate={{
          background: hovered
            ? [movingGrad[direction], highlight]
            : movingGrad[direction],
        }}
        transition={{ ease: "linear", duration: duration ?? 1 }}
      />
      <div className="bg-[#0f071a] absolute z-1 flex-none inset-[1px] rounded-[inherit]" />
    </Tag>
  );
}
