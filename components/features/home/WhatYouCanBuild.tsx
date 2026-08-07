"use client";

import * as React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PixelHeading } from "@/components/ui/pixel-heading-character";
import { SpotlightCard } from "@/components/ui/spotlight-card";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const CARDS_DATA = {
  web: {
    number: "01",
    tag: "Scalable Web Systems",
    title: "Web Applications",
    desc: "Create fast, reliable websites with global accessibility and infinite scale.",
    spotlightColor: "rgba(124, 58, 237, 0.08)",
    accentBg: "bg-primary/10 border-primary/30 text-primary-light",
    hoverBorder: "group-hover:border-primary/50",
    hoverTitle: "group-hover:text-primary-light",
    hoverShadow: "hover:shadow-[0_10px_25px_-8px_rgba(124,58,237,0.12)]",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="m4.93 4.93 14.14 14.14" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <path d="M2 12h20" />
      </svg>
    ),
  },
  ai: {
    number: "02",
    tag: "Intelligent Systems",
    title: "AI Applications",
    desc: "Build intelligent solutions using modern cloud-powered AI and ML services.",
    spotlightColor: "rgba(6, 182, 212, 0.08)",
    accentBg: "bg-accent/10 border-accent/30 text-accent",
    hoverBorder: "group-hover:border-accent/50",
    hoverTitle: "group-hover:text-accent",
    hoverShadow: "hover:shadow-[0_10px_25px_-8px_rgba(6,182,212,0.12)]",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 8V4H8" />
        <rect width="16" height="12" x="4" y="8" rx="2" />
        <path d="M2 14h2M20 14h2M15 13v2M9 13v2" />
      </svg>
    ),
  },
  mobile: {
    number: "03",
    tag: "Cloud Backends",
    title: "Mobile Backends",
    desc: "Power authentication, storage, push notifications, and real-time databases.",
    spotlightColor: "rgba(34, 197, 94, 0.06)",
    accentBg: "bg-success/10 border-success/30 text-success",
    hoverBorder: "group-hover:border-success/50",
    hoverTitle: "group-hover:text-success",
    hoverShadow: "hover:shadow-[0_8px_20px_-6px_rgba(34,197,94,0.08)]",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect width="14" height="20" x="5" y="2" rx="2" />
        <path d="M12 18h.01" />
      </svg>
    ),
  },
  analytics: {
    number: "04",
    tag: "Data Insights",
    title: "Data Analytics",
    desc: "Transform raw data into meaningful insights that drive smarter decisions.",
    spotlightColor: "rgba(245, 158, 11, 0.06)",
    accentBg: "bg-warning/10 border-warning/30 text-warning",
    hoverBorder: "group-hover:border-warning/50",
    hoverTitle: "group-hover:text-warning",
    hoverShadow: "hover:shadow-[0_8px_20px_-6px_rgba(245,158,11,0.08)]",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <path d="m19 9-5 5-4-4-3 3" />
      </svg>
    ),
  },
  security: {
    number: "05",
    tag: "Infrastructure",
    title: "Cybersecurity",
    desc: "Learn secure cloud practices used by organizations around the world.",
    spotlightColor: "rgba(239, 68, 68, 0.06)",
    accentBg: "bg-error/10 border-error/30 text-error",
    hoverBorder: "group-hover:border-error/50",
    hoverTitle: "group-hover:text-error",
    hoverShadow: "hover:shadow-[0_8px_20px_-6px_rgba(239,68,68,0.08)]",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  startup: {
    number: "06",
    tag: "Venture Ready",
    title: "Startup Products",
    desc: "Launch scalable products without investing in expensive physical hardware.",
    spotlightColor: "rgba(14, 165, 233, 0.08)",
    accentBg: "bg-info/10 border-info/30 text-info",
    hoverBorder: "group-hover:border-info/50",
    hoverTitle: "group-hover:text-info",
    hoverShadow: "hover:shadow-[0_10px_25px_-8px_rgba(14,165,233,0.10)]",
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </svg>
    ),
  },
};

export function WhatYouCanBuild() {
  const containerRef = React.useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
      const batchStart = isMobile ? "top bottom" : "center bottom";
      const initialY = isMobile ? 20 : 30;

      gsap.from(".build-header-el", {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".build-header",
          start: isMobile ? "top 95%" : "top 85%",
          toggleActions: "play reverse play reverse",
        },
      });

      gsap.set(".build-card-el", { opacity: 0, y: initialY, scale: 0.98 });
      ScrollTrigger.batch(".build-card-el", {
        onEnter: (elements) => {
          gsap.to(elements, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "power3.out",
            overwrite: true,
          });
        },
        onEnterBack: (elements) => {
          gsap.to(elements, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "power3.out",
            overwrite: true,
          });
        },
        onLeaveBack: (elements) => {
          gsap.to(elements, {
            opacity: 0,
            y: initialY,
            scale: 0.98,
            duration: 0.3,
            overwrite: true,
          });
        },
        start: batchStart,
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="what-you-build"
      className="bg-grid bg-noise relative overflow-hidden bg-bg border-t border-border py-20 md:py-32"
    >
      {/* Ambient background glow accents */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-8 h-[240px] w-[420px] -translate-x-1/2 rounded-full bg-gradient-to-r from-primary/12 via-purple-600/10 to-accent/10 blur-[110px]"
      />

      <div className="relative mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="build-header text-center max-w-2xl mx-auto mb-14 md:mb-20">
          <p className="build-header-el text-[11px] uppercase tracking-[0.18em] text-muted font-mono">
            Possibilities
          </p>
          <h2 className="build-header-el mt-3.5 font-display text-3xl sm:text-4xl md:text-5xl font-semibold leading-[1.1] tracking-tight text-text-primary">
            Build Projects That{" "}
            <PixelHeading mode="uniform" className="text-gradient">
              Make an Impact
            </PixelHeading>
          </h2>
          <p className="build-header-el mt-4 text-base leading-relaxed text-text-secondary max-w-lg mx-auto">
            Cloud isn&apos;t just about servers. It&apos;s about turning ideas into products that people can actually use.
          </p>
        </div>

        {/* Editorial Asymmetrical Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6">
          {/* ROW 1: Hero Split (7 cols + 5 cols) */}
          {/* 01. Web Applications (Primary Showcase Card - 7 cols) */}
          <div className="lg:col-span-7 build-card-el">
            <SpotlightCard
              spotlightColor={CARDS_DATA.web.spotlightColor}
              className={`group relative flex flex-col justify-between h-full p-6 sm:p-7 md:p-9 border border-white/[0.08] bg-surface/60 backdrop-blur-md rounded-2xl transition-all duration-300 hover:bg-surface/80 ${CARDS_DATA.web.hoverBorder} ${CARDS_DATA.web.hoverShadow}`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl border ${CARDS_DATA.web.accentBg} transition-transform duration-300 group-hover:scale-105`}
                  >
                    {CARDS_DATA.web.icon}
                  </div>
                  <span className="text-[11px] font-mono tracking-widest text-muted/60 uppercase">
                    {CARDS_DATA.web.number} // {CARDS_DATA.web.tag}
                  </span>
                </div>

                <div className="mt-8">
                  <h3
                    className={`font-display text-[22px] sm:text-2xl md:text-3xl font-semibold tracking-tight text-text-primary transition-colors duration-200 ${CARDS_DATA.web.hoverTitle}`}
                  >
                    {CARDS_DATA.web.title}
                  </h3>
                  <p className="mt-2.5 sm:mt-3 text-sm sm:text-base leading-relaxed text-text-secondary max-w-xl font-normal">
                    {CARDS_DATA.web.desc}
                  </p>
                </div>
              </div>
            </SpotlightCard>
          </div>

          {/* 02. AI Applications (Secondary Hero Card - 5 cols) */}
          <div className="lg:col-span-5 build-card-el">
            <SpotlightCard
              spotlightColor={CARDS_DATA.ai.spotlightColor}
              className={`group relative flex flex-col justify-between h-full p-6 sm:p-7 md:p-9 border border-white/[0.08] bg-surface/60 backdrop-blur-md rounded-2xl transition-all duration-300 hover:bg-surface/80 ${CARDS_DATA.ai.hoverBorder} ${CARDS_DATA.ai.hoverShadow}`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl border ${CARDS_DATA.ai.accentBg} transition-transform duration-300 group-hover:scale-105`}
                  >
                    {CARDS_DATA.ai.icon}
                  </div>
                  <span className="text-[11px] font-mono tracking-widest text-muted/60 uppercase">
                    {CARDS_DATA.ai.number} // {CARDS_DATA.ai.tag}
                  </span>
                </div>

                <div className="mt-8">
                  <h3
                    className={`font-display text-[22px] sm:text-2xl font-semibold tracking-tight text-text-primary transition-colors duration-200 ${CARDS_DATA.ai.hoverTitle}`}
                  >
                    {CARDS_DATA.ai.title}
                  </h3>
                  <p className="mt-2.5 sm:mt-3 text-sm sm:text-base leading-relaxed text-text-secondary font-normal">
                    {CARDS_DATA.ai.desc}
                  </p>
                </div>
              </div>
            </SpotlightCard>
          </div>

          {/* ROW 2: Trio Grid (4 cols + 4 cols + 4 cols) */}
          {/* 03. Mobile Backends */}
          <div className="lg:col-span-4 build-card-el">
            <SpotlightCard
              spotlightColor={CARDS_DATA.mobile.spotlightColor}
              className={`group relative flex flex-col justify-between h-full p-6 sm:p-7 border border-white/[0.08] bg-surface/50 backdrop-blur-md rounded-2xl transition-all duration-300 hover:bg-surface/80 ${CARDS_DATA.mobile.hoverBorder} ${CARDS_DATA.mobile.hoverShadow}`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg border ${CARDS_DATA.mobile.accentBg} transition-transform duration-300 group-hover:scale-105`}
                  >
                    {CARDS_DATA.mobile.icon}
                  </div>
                  <span className="text-[10px] font-mono tracking-widest text-muted/50 uppercase">
                    {CARDS_DATA.mobile.number}
                  </span>
                </div>

                <div className="mt-6">
                  <h3
                    className={`font-display text-lg font-semibold tracking-tight text-text-primary transition-colors duration-200 ${CARDS_DATA.mobile.hoverTitle}`}
                  >
                    {CARDS_DATA.mobile.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary font-normal">
                    {CARDS_DATA.mobile.desc}
                  </p>
                </div>
              </div>
            </SpotlightCard>
          </div>

          {/* 04. Data Analytics */}
          <div className="lg:col-span-4 build-card-el">
            <SpotlightCard
              spotlightColor={CARDS_DATA.analytics.spotlightColor}
              className={`group relative flex flex-col justify-between h-full p-6 sm:p-7 border border-white/[0.08] bg-surface/50 backdrop-blur-md rounded-2xl transition-all duration-300 hover:bg-surface/80 ${CARDS_DATA.analytics.hoverBorder} ${CARDS_DATA.analytics.hoverShadow}`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg border ${CARDS_DATA.analytics.accentBg} transition-transform duration-300 group-hover:scale-105`}
                  >
                    {CARDS_DATA.analytics.icon}
                  </div>
                  <span className="text-[10px] font-mono tracking-widest text-muted/50 uppercase">
                    {CARDS_DATA.analytics.number}
                  </span>
                </div>

                <div className="mt-6">
                  <h3
                    className={`font-display text-lg font-semibold tracking-tight text-text-primary transition-colors duration-200 ${CARDS_DATA.analytics.hoverTitle}`}
                  >
                    {CARDS_DATA.analytics.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary font-normal">
                    {CARDS_DATA.analytics.desc}
                  </p>
                </div>
              </div>
            </SpotlightCard>
          </div>

          {/* 05. Cybersecurity */}
          <div className="lg:col-span-4 build-card-el">
            <SpotlightCard
              spotlightColor={CARDS_DATA.security.spotlightColor}
              className={`group relative flex flex-col justify-between h-full p-6 sm:p-7 border border-white/[0.08] bg-surface/50 backdrop-blur-md rounded-2xl transition-all duration-300 hover:bg-surface/80 ${CARDS_DATA.security.hoverBorder} ${CARDS_DATA.security.hoverShadow}`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg border ${CARDS_DATA.security.accentBg} transition-transform duration-300 group-hover:scale-105`}
                  >
                    {CARDS_DATA.security.icon}
                  </div>
                  <span className="text-[10px] font-mono tracking-widest text-muted/50 uppercase">
                    {CARDS_DATA.security.number}
                  </span>
                </div>

                <div className="mt-6">
                  <h3
                    className={`font-display text-lg font-semibold tracking-tight text-text-primary transition-colors duration-200 ${CARDS_DATA.security.hoverTitle}`}
                  >
                    {CARDS_DATA.security.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary font-normal">
                    {CARDS_DATA.security.desc}
                  </p>
                </div>
              </div>
            </SpotlightCard>
          </div>

          {/* ROW 3: Full-width Horizontal Showcase Banner (12 cols) */}
          {/* 06. Startup Products */}
          <div className="lg:col-span-12 build-card-el">
            <SpotlightCard
              spotlightColor={CARDS_DATA.startup.spotlightColor}
              className={`group relative p-6 sm:p-7 md:p-8 border border-white/[0.08] bg-surface/60 backdrop-blur-md rounded-2xl transition-all duration-300 hover:bg-surface/80 ${CARDS_DATA.startup.hoverBorder} ${CARDS_DATA.startup.hoverShadow}`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6">
                <div className="flex items-start sm:items-center space-x-4 sm:space-x-5">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${CARDS_DATA.startup.accentBg} transition-transform duration-300 group-hover:scale-105`}
                  >
                    {CARDS_DATA.startup.icon}
                  </div>

                  <div>
                    <div className="flex items-center space-x-3">
                      <span className="text-[10px] font-mono tracking-widest text-muted/60 uppercase">
                        {CARDS_DATA.startup.number} // {CARDS_DATA.startup.tag}
                      </span>
                    </div>
                    <h3
                      className={`mt-1 font-display text-xl sm:text-2xl font-semibold tracking-tight text-text-primary transition-colors duration-200 ${CARDS_DATA.startup.hoverTitle}`}
                    >
                      {CARDS_DATA.startup.title}
                    </h3>
                  </div>
                </div>

                <div className="md:max-w-md lg:max-w-lg">
                  <p className="text-sm sm:text-base leading-relaxed text-text-secondary font-normal">
                    {CARDS_DATA.startup.desc}
                  </p>
                </div>

                <div className="shrink-0 hidden lg:flex items-center space-x-2 text-xs font-mono text-info bg-info/10 px-3.5 py-1.5 rounded-full border border-info/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-info animate-pulse" />
                  <span>Zero Server Overhead</span>
                </div>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>
  );
}
