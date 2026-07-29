"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface TextShimmerProps {
  children: string;
  className?: string;
  shimmerWidth?: number;
  duration?: number;
}

export function TextShimmer({
  children,
  className,
  duration = 2.5,
}: TextShimmerProps) {
  return (
    <span
      className={cn(
        "inline-block bg-clip-text text-transparent bg-[linear-gradient(110deg,#a78bfa,45%,#ffffff,55%,#a78bfa)] bg-[length:250%_100%] animate-shimmer",
        className
      )}
      style={{
        animationDuration: `${duration}s`,
      }}
    >
      {children}
    </span>
  );
}
