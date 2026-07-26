"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "@/components/animate-ui/icons/arrow-right";
import { Users } from "@/components/animate-ui/icons/users";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { FlipWords } from "@/components/ui/flip-words";

export function Hero() {
  return (
    <section id="top" className="relative min-h-[100dvh] w-full overflow-hidden bg-black text-white flex flex-col justify-center select-none pt-16 pb-8 md:py-16">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover z-0 opacity-75"
        src="/assets/ninja-turtle-bg.mp4"
      />

      {/* Dark Overlay Gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-black via-black/40 to-black/60 pointer-events-none" />

      {/* Hero Main Content */}
      <div className="relative z-10 max-w-content w-full mx-auto px-4 sm:px-8 lg:px-16 my-auto flex flex-col justify-center">
        <div className="max-w-3xl">
          {/* 1. Tagline Pill Badge */}
          <div className="relative mb-5 sm:mb-6 lg:mb-8 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-black/60 backdrop-blur-xl px-3.5 py-1.5 text-[11px] sm:text-xs font-inter tracking-wider text-white shadow-[0_0_20px_-3px_rgba(124,58,237,0.4)]">
            <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5 items-center justify-center">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
            </span>
            <span className="uppercase tracking-[0.15em] sm:tracking-[0.2em] font-medium text-white/90">
              Applications open for 2026
            </span>
            <span className="ml-0.5 text-primary-light">
              ✦
            </span>
          </div>

          {/* 2. Main Heading */}
          <h1 className="-mt-2 animate-fade-up-delay-1 font-podium text-white uppercase leading-[1.08] sm:leading-[1.02] tracking-tight text-[clamp(1.85rem,7vw,4.2rem)]">
            <div>Student builders,</div>
            <div className="text-gradient min-h-[1.1em] flex items-center">
              <FlipWords
                words={["Learn. Build. Deploy.", "Ideate. Code. Ship.", "Design. Launch. Grow."]}
                duration={4000}
                className="text-gradient p-0 text-[0.85em]"
              />
            </div>
            <div>Together.</div>
          </h1>

          {/* 3. Subtext */}
          <p className="animate-fade-up-delay-2 mt-4 sm:mt-5 lg:mt-6 text-white/80 text-xs sm:text-base font-inter leading-relaxed max-w-xl w-[60%] sm:w-full text-left">
            A community for students who&apos;d rather build than just read about it —{" "}
            <span className="text-white font-semibold">workshops, hackathons, AWS credits,</span> and a peer group that ships real projects together.
          </p>

          {/* 4. CTA Buttons */}
          <div className="animate-fade-up-delay-3 mt-6 sm:mt-8 lg:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-6">
            <Link href="/register" className="w-full sm:w-auto">
              <HoverBorderGradient
                containerClassName="rounded-full w-full sm:w-auto"
                className="font-inter uppercase tracking-wider font-semibold text-white px-6 sm:px-7 py-3.5 flex items-center justify-center gap-2 text-xs sm:text-sm w-full"
              >
                <span>Register Now</span>
                <ArrowRight size={16} animateOnHover />
              </HoverBorderGradient>
            </Link>

            <Link
              href="/about"
              className={cn(buttonVariants({ size: "lg", variant: "secondary" }), "group font-inter uppercase tracking-wider backdrop-blur-md bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 sm:px-7 py-3.5 text-xs sm:text-sm flex items-center justify-center w-full sm:w-auto")}
            >
              <Users size={16} className="mr-2 group-hover:text-primary-light" animateOnHover />
              <span>About Us</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
