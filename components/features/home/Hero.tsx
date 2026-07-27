"use client";

import React from "react";
import Link from "next/link";
import { Users } from "@/components/animate-ui/icons/users";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FlipWords } from "@/components/ui/flip-words";
import { RecruitmentCTA } from "@/components/recruitment/RecruitmentCTA";
import { RecruitmentCountdown } from "@/components/recruitment/RecruitmentCountdown";
import { useRecruitment } from "@/hooks/useRecruitment";

export function Hero() {
  const { status } = useRecruitment();
  const isOpen = status === "open";
  const isUpcoming = status === "upcoming";

  let statusBadgeText = "Applications open for 2026";
  if (!isOpen) {
    statusBadgeText = isUpcoming ? "Applications Opening Soon" : "Community Cohort Active";
  }

  return (
    <section id="top" className="relative min-h-[100dvh] w-full overflow-hidden bg-black text-white flex flex-col justify-center select-none pt-24 pb-12 sm:py-20 md:py-28">
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
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-black via-black/50 to-black/70 pointer-events-none" />

      {/* Mobile Ambient Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-[280px] w-[280px] sm:h-[400px] sm:w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[90px] sm:blur-[130px] z-0"
      />

      {/* Hero Main Content */}
      <div className="relative z-10 max-w-content w-full mx-auto px-4 sm:px-8 lg:px-16 my-auto flex flex-col justify-center">
        <div className="max-w-3xl">
          {/* 1. Tagline Pill Badge */}
          <div className="relative mb-4 sm:mb-6 lg:mb-8 inline-flex max-w-full items-center gap-2 rounded-full border border-primary/40 bg-black/70 backdrop-blur-xl px-3.5 py-1.5 text-[10px] sm:text-xs font-inter tracking-wider text-white shadow-[0_0_20px_-3px_rgba(124,58,237,0.4)]">
            <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5 shrink-0 items-center justify-center">
              <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", isOpen ? "bg-emerald-400" : "bg-purple-400")} />
              <span className={cn("relative inline-flex h-2 w-2 rounded-full", isOpen ? "bg-emerald-400 shadow-[0_0_8px_#34d399]" : "bg-purple-400 shadow-[0_0_8px_#c084fc]")} />
            </span>
            <span className="uppercase tracking-[0.14em] sm:tracking-[0.2em] font-medium text-white/90 truncate">
              {statusBadgeText}
            </span>
            <span className="ml-0.5 text-primary-light shrink-0">
              ✦
            </span>
          </div>

          {/* 2. Main Heading */}
          <h1 className="-mt-1 sm:-mt-2 animate-fade-up-delay-1 font-podium text-white uppercase leading-[1.08] sm:leading-[1.02] tracking-tight text-[clamp(2.1rem,8vw,4.2rem)]">
            <div>Student builders,</div>
            <div className="min-h-[1.1em] flex items-center">
              <FlipWords
                words={["Learn. Build. Deploy.", "Ideate. Code. Ship.", "Design. Launch. Grow."]}
                duration={3500}
                className="p-0 text-[0.85em]"
              />
            </div>
            <div>Together.</div>
          </h1>

          {/* 3. Subtext */}
          <p className="animate-fade-up-delay-2 mt-4 sm:mt-5 lg:mt-6 text-white/85 text-xs sm:text-base font-inter leading-relaxed max-w-xl w-[60%] sm:w-full text-left">
            A community for students who&apos;d rather build than just read about it —{" "}
            <span className="text-white font-semibold">workshops, hackathons, AWS credits,</span> and a peer group that ships real projects together.
          </p>

          {/* 4. CTA Buttons & Countdown */}
          <div className="animate-fade-up-delay-3 mt-6 sm:mt-8 lg:mt-10 flex flex-col items-start gap-5 sm:gap-6 w-full">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-6 w-full sm:w-auto">
              <RecruitmentCTA
                variant="border-gradient"
                openText="Register Now"
                closedText="Join Community"
                className="w-full sm:w-auto text-center justify-center"
              />

              <Link
                href="/about"
                className={cn(buttonVariants({ size: "lg", variant: "secondary" }), "group font-inter uppercase tracking-wider backdrop-blur-md bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 sm:px-7 py-3.5 text-xs sm:text-sm flex items-center justify-center w-full sm:w-auto active:scale-[0.98] transition-transform")}
              >
                <Users size={16} className="mr-2 group-hover:text-primary-light" animateOnHover />
                <span>About SBG</span>
              </Link>
            </div>

            {/* Live Countdown Timer (Visible only when OPEN) */}
            <RecruitmentCountdown className="w-full sm:w-auto" />
          </div>
        </div>
      </div>
    </section>
  );
}
