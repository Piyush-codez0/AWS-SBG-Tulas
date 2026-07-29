"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Sparkle {
  id: string;
  x: string;
  y: string;
  color: string;
  size: number;
  delay: number;
  scale: number;
  lifespan: number;
}

interface SparklesTextProps {
  text: string;
  className?: string;
  sparkleCount?: number;
  colors?: {
    first: string;
    second: string;
  };
  as?: React.ElementType;
}

const SparkleIcon = ({ color, size }: { color: string; size: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 160 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="pointer-events-none"
  >
    <path
      d="M80 0C80 0 84.2846 41.2925 101.496 58.504C118.707 75.7154 160 80 160 80C160 80 118.707 84.2846 101.496 101.496C84.2846 118.707 80 160 80 160C80 160 75.7154 118.707 58.504 101.496C41.2925 84.2846 0 80 0 80C0 80 41.2925 75.7154 58.504 58.504C75.7154 41.2925 80 0 80 0Z"
      fill={color}
    />
  </svg>
);

export function SparklesText({
  text,
  className,
  sparkleCount = 10,
  colors = { first: "#A78BFA", second: "#F472B6" },
  as: Component = "span",
}: SparklesTextProps) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    const generateSparkles = () => {
      const newSparkles: Sparkle[] = Array.from({ length: sparkleCount }).map(
        (_, i) => ({
          id: `sparkle-${i}-${Math.random()}`,
          x: `${Math.random() * 110 - 5}%`,
          y: `${Math.random() * 110 - 5}%`,
          color: Math.random() > 0.5 ? colors.first : colors.second,
          size: Math.floor(Math.random() * 12) + 10,
          delay: Math.random() * 2,
          scale: Math.random() * 0.6 + 0.6,
          lifespan: Math.random() * 1.5 + 1.5,
        })
      );
      setSparkles(newSparkles);
    };

    generateSparkles();
    const interval = setInterval(generateSparkles, 3000);
    return () => clearInterval(interval);
  }, [sparkleCount, colors.first, colors.second]);

  return (
    <Component className={cn("relative inline-block font-bold", className)}>
      <span className="relative z-10">{text}</span>
      {sparkles.map((sparkle) => (
        <motion.span
          key={sparkle.id}
          className="absolute z-20 pointer-events-none"
          style={{
            left: sparkle.x,
            top: sparkle.y,
          }}
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, sparkle.scale, 0],
            rotate: [0, 180],
          }}
          transition={{
            duration: sparkle.lifespan,
            repeat: Infinity,
            delay: sparkle.delay,
            ease: "easeInOut",
          }}
        >
          <SparkleIcon color={sparkle.color} size={sparkle.size} />
        </motion.span>
      ))}
    </Component>
  );
}
