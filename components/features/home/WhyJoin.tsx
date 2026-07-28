"use client";

import * as React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PixelHeading } from "@/components/ui/pixel-heading-character";
import { SpotlightCard } from "@/components/ui/spotlight-card";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const WHY_JOIN_CARDS = [
  {
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: "Hands-on Learning",
    desc: "Gain practical experience through interactive sessions and real-world projects on AWS.",
    accent: "text-primary-light bg-primary/10",
    border: "border-primary/30 hover:border-primary/60 hover:shadow-[0_10px_25px_-8px_rgba(124,58,237,0.18)]",
    spotlightColor: "rgba(124, 58, 237, 0.12)",
  },
  {
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" />
      </svg>
    ),
    title: "Career Growth",
    desc: "Develop skills that strengthen your portfolio, internship applications, and campus placements.",
    accent: "text-success bg-success/10",
    border: "border-success/30 hover:border-success/60 hover:shadow-[0_10px_25px_-8px_rgba(34,197,94,0.18)]",
    spotlightColor: "rgba(34, 197, 94, 0.12)",
  },
  {
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
      </svg>
    ),
    title: "Hackathons & Challenges",
    desc: "Collaborate, compete, and solve real-world problems in exciting innovation challenges.",
    accent: "text-warning bg-warning/10",
    border: "border-warning/30 hover:border-warning/60 hover:shadow-[0_10px_25px_-8px_rgba(245,158,11,0.18)]",
    spotlightColor: "rgba(245, 158, 11, 0.12)",
  },
  {
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="m4.93 4.93 14.14 14.14" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" />
      </svg>
    ),
    title: "Industry Exposure",
    desc: "Connect with mentors, industry professionals, and builders across the AWS community.",
    accent: "text-info bg-info/10",
    border: "border-info/30 hover:border-info/60 hover:shadow-[0_10px_25px_-8px_rgba(14,165,233,0.18)]",
    spotlightColor: "rgba(14, 165, 233, 0.12)",
  },
  {
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    ),
    title: "Cloud Certifications",
    desc: "Get guidance on AWS learning paths, digital badges, and certification preparation.",
    accent: "text-accent bg-accent/10",
    border: "border-accent/30 hover:border-accent/60 hover:shadow-[0_10px_25px_-8px_rgba(6,182,212,0.18)]",
    spotlightColor: "rgba(6, 182, 212, 0.12)",
  },
  {
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    ),
    title: "Supportive Community",
    desc: "Learn alongside students who share the same passion for technology and innovation.",
    accent: "text-error bg-error/10",
    border: "border-error/30 hover:border-error/60 hover:shadow-[0_10px_25px_-8px_rgba(239,68,68,0.18)]",
    spotlightColor: "rgba(239, 68, 68, 0.12)",
  },
];

export function WhyJoin() {
  const containerRef = React.useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".whyjoin-header-el", {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".whyjoin-header",
        start: "top 85%",
        toggleActions: "play reverse play reverse",
      },
    });

    gsap.set(".whyjoin-card", { opacity: 0, y: 30, scale: 0.97 });
    ScrollTrigger.batch(".whyjoin-card", {
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
    <section ref={containerRef} id="why-join" className="bg-grid bg-noise relative overflow-hidden bg-bg border-t border-border">
      {/* Subtle purple heading glow */}
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-8 h-[200px] w-[360px] -translate-x-1/2 rounded-full bg-gradient-to-r from-primary/10 via-purple-600/8 to-primary/10 blur-[90px]" />
      <div aria-hidden className="pointer-events-none absolute right-1/4 top-0 h-[400px] w-[400px] translate-x-1/2 rounded-full bg-primary/8 blur-[130px]" />

      <div className="relative mx-auto max-w-content px-4 sm:px-6 py-20 md:py-28">
        <div className="whyjoin-header text-center max-w-2xl mx-auto">
          <p className="whyjoin-header-el text-[11px] uppercase tracking-[0.16em] text-muted">Why Join Us</p>
          <h2 className="whyjoin-header-el mt-4 font-display text-[28px] sm:text-[34px] md:text-[42px] font-semibold leading-[1.1] tracking-tight text-text-primary">
            More Than{" "}
            <PixelHeading mode="uniform" className="text-gradient">Just Workshops</PixelHeading>
          </h2>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_JOIN_CARDS.map((card) => (
            <SpotlightCard
              key={card.title}
              spotlightColor={card.spotlightColor}
              className={`whyjoin-card group flex flex-col gap-4 p-6 ${card.border}`}
            >
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${card.accent} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                {card.icon}
              </div>
              <div>
                <h3 className="font-display text-[15px] font-semibold tracking-tight text-text-primary group-hover:text-primary-light transition-colors duration-200">
                  {card.title}
                </h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-text-secondary">
                  {card.desc}
                </p>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
