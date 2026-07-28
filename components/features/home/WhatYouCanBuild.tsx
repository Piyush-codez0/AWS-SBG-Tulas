"use client";

import * as React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PixelHeading } from "@/components/ui/pixel-heading-character";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const BUILD_CARDS = [
  {
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="m4.93 4.93 14.14 14.14" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" />
      </svg>
    ),
    title: "Web Applications",
    desc: "Create fast, reliable websites with global accessibility and infinite scale.",
    accent: "text-primary-light bg-primary/10",
    border: "border-primary/30 hover:border-primary/60 hover:shadow-[0_10px_25px_-8px_rgba(124,58,237,0.18)]",
  },
  {
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" /><path d="M2 14h2M20 14h2M15 13v2M9 13v2" />
      </svg>
    ),
    title: "AI Applications",
    desc: "Build intelligent solutions using modern cloud-powered AI and ML services.",
    accent: "text-accent bg-accent/10",
    border: "border-accent/30 hover:border-accent/60 hover:shadow-[0_10px_25px_-8px_rgba(6,182,212,0.18)]",
  },
  {
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect width="14" height="20" x="5" y="2" rx="2" /><path d="M12 18h.01" />
      </svg>
    ),
    title: "Mobile Backends",
    desc: "Power authentication, storage, push notifications, and real-time databases.",
    accent: "text-success bg-success/10",
    border: "border-success/30 hover:border-success/60 hover:shadow-[0_10px_25px_-8px_rgba(34,197,94,0.18)]",
  },
  {
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" />
      </svg>
    ),
    title: "Data Analytics",
    desc: "Transform raw data into meaningful insights that drive smarter decisions.",
    accent: "text-warning bg-warning/10",
    border: "border-warning/30 hover:border-warning/60 hover:shadow-[0_10px_25px_-8px_rgba(245,158,11,0.18)]",
  },
  {
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    title: "Cybersecurity",
    desc: "Learn secure cloud practices used by organizations around the world.",
    accent: "text-error bg-error/10",
    border: "border-error/30 hover:border-error/60 hover:shadow-[0_10px_25px_-8px_rgba(239,68,68,0.18)]",
  },
  {
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </svg>
    ),
    title: "Startup Products",
    desc: "Launch scalable products without investing in expensive physical hardware.",
    accent: "text-info bg-info/10",
    border: "border-info/30 hover:border-info/60 hover:shadow-[0_10px_25px_-8px_rgba(14,165,233,0.18)]",
  },
];

export function WhatYouCanBuild() {
  const containerRef = React.useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".build-header-el", {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".build-header",
        start: "top 85%",
        toggleActions: "play reverse play reverse",
      },
    });

    gsap.set(".build-card", { opacity: 0, y: 30, scale: 0.97 });
    ScrollTrigger.batch(".build-card", {
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
      onLeave: (elements) => {
        gsap.to(elements, {
          opacity: 0,
          y: -20,
          scale: 0.97,
          duration: 0.3,
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
          y: 30,
          scale: 0.97,
          duration: 0.3,
          overwrite: true,
        });
      },
      start: "top 85%",
      end: "bottom 15%",
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="what-you-build" className="bg-grid bg-noise relative overflow-hidden bg-bg border-t border-border">
      {/* Subtle purple heading glow */}
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-8 h-[200px] w-[360px] -translate-x-1/2 rounded-full bg-gradient-to-r from-primary/10 via-purple-600/8 to-primary/10 blur-[90px]" />
      <div aria-hidden className="pointer-events-none absolute right-0 top-0 h-[450px] w-[450px] translate-x-1/3 -translate-y-1/4 rounded-full bg-accent/8 blur-[130px]" />

      <div className="relative mx-auto max-w-content px-4 sm:px-6 py-20 md:py-28">
        <div className="build-header text-center max-w-2xl mx-auto">
          <p className="build-header-el text-[11px] uppercase tracking-[0.16em] text-muted">
            Possibilities
          </p>
          <h2 className="build-header-el mt-4 font-display text-[28px] sm:text-[34px] md:text-[42px] font-semibold leading-[1.1] tracking-tight text-text-primary">
            Build Projects That{" "}
            <PixelHeading mode="uniform" className="text-gradient">Make an Impact</PixelHeading>
          </h2>
          <p className="build-header-el mt-4 text-[15px] sm:text-[16px] leading-relaxed text-text-secondary">
            Cloud isn&apos;t just about servers. It&apos;s about turning ideas into products that people can actually use.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BUILD_CARDS.map((card) => (
            <div
              key={card.title}
              className={`build-card group relative flex flex-col gap-4 rounded-2xl border bg-bg-card/60 p-6 cursor-default backdrop-blur-sm transition-all duration-300 hover:bg-bg-card hover:-translate-y-1.5 ${card.border}`}
            >
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${card.accent} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                {card.icon}
              </div>
              <div>
                <h3 className="font-display text-[16px] font-semibold tracking-tight text-text-primary group-hover:text-primary-light transition-colors duration-200">
                  {card.title}
                </h3>
                <p className="mt-1.5 text-[14px] leading-relaxed text-text-secondary">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
