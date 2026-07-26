"use client";

import * as React from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PixelHeading } from "@/components/ui/pixel-heading-character";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ECOSYSTEM_NODES = [
  "AI",
  "Skill Builder",
  "AWS Educate",
  "Community Builders",
  "Student Builder Groups",
  "AWS Events",
  "Certification",
  "Cloud",
];

export function AboutEcosystem() {
  const containerRef = React.useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".ecosystem-header-el", {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".ecosystem-header",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });

    // Center node
    gsap.fromTo(".ecosystem-center",
      { opacity: 0, scale: 0.5 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.7,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".ecosystem-graph",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Outer nodes
    gsap.set(".ecosystem-node", { opacity: 0, scale: 0.5 });
    ScrollTrigger.batch(".ecosystem-node", {
      onEnter: (elements) => {
        gsap.to(elements, {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.06,
          ease: "back.out(1.7)",
          overwrite: true,
        });
      },
      onLeaveBack: (elements) => {
        gsap.to(elements, {
          opacity: 0,
          scale: 0.5,
          duration: 0.3,
          overwrite: true,
        });
      },
      start: "top 80%",
    });

    // SVG connecting lines
    gsap.fromTo(".ecosystem-line",
      { strokeDashoffset: 200 },
      {
        strokeDashoffset: 0,
        duration: 1.2,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".ecosystem-graph",
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      }
    );

    const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => clearTimeout(refreshTimer);
  }, { scope: containerRef });

  // Calculate positions for 8 nodes in a circle
  const getNodePosition = (index: number, total: number) => {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
    const radius = 42; // % from center
    const x = 50 + radius * Math.cos(angle);
    const y = 50 + radius * Math.sin(angle);
    return { x, y };
  };

  return (
    <section ref={containerRef} className="bg-grid bg-noise relative overflow-hidden bg-bg">
      <div
        aria-hidden
        className="pointer-events-none absolute right-1/4 top-0 h-[400px] w-[400px] translate-x-1/2 rounded-full bg-primary/10 blur-[120px]"
      />

      <div className="relative mx-auto max-w-content px-4 sm:px-6 py-20 md:py-28">
        <div className="ecosystem-header text-center max-w-2xl mx-auto">
          <p className="ecosystem-header-el text-[11px] uppercase tracking-[0.16em] text-muted">
            The Ecosystem
          </p>
          <h2 className="ecosystem-header-el mt-4 font-display text-[28px] sm:text-[32px] md:text-[40px] font-semibold leading-[1.1] tracking-tight text-text-primary">
            Part of the AWS{" "}
            <PixelHeading mode="uniform" className="text-gradient">ecosystem.</PixelHeading>
          </h2>
          <p className="ecosystem-header-el mt-4 text-[15px] sm:text-[16px] leading-relaxed text-text-secondary">
            We&apos;re connected to a vast network of AWS programs, resources, and communities.
          </p>
        </div>

        {/* Graph visualization */}
        <div className="ecosystem-graph relative mt-14 mx-auto w-full max-w-[320px] sm:max-w-[500px] lg:max-w-[600px] aspect-square">
          {/* SVG lines connecting center to nodes */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
            {ECOSYSTEM_NODES.map((_, i) => {
              const pos = getNodePosition(i, ECOSYSTEM_NODES.length);
              return (
                <line
                  key={`line-${i}`}
                  className="ecosystem-line"
                  x1="50"
                  y1="50"
                  x2={pos.x}
                  y2={pos.y}
                  stroke="url(#lineGrad)"
                  strokeWidth="0.3"
                  strokeDasharray="200"
                  strokeDashoffset="200"
                />
              );
            })}
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#C084FC" stopOpacity="0.3" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center node */}
          <div
            className="ecosystem-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex h-16 w-16 sm:h-24 sm:w-24 items-center justify-center rounded-full border-2 border-primary/50 bg-bg shadow-[0_0_40px_-8px_rgba(124,58,237,0.4)] p-3 overflow-hidden"
          >
            <Image
              src="/logos/AWS_logo.png"
              alt="AWS Logo"
              width={70}
              height={45}
              className="h-7 sm:h-11 w-auto object-contain"
            />
          </div>

          {/* Outer nodes */}
          {ECOSYSTEM_NODES.map((node, i) => {
            const pos = getNodePosition(i, ECOSYSTEM_NODES.length);
            return (
              <div
                key={node}
                className="ecosystem-node absolute z-10 -translate-x-1/2 -translate-y-1/2 group"
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                }}
              >
                <div className="flex items-center justify-center rounded-full border border-border bg-bg px-2 py-1 sm:px-4 sm:py-2.5 transition-all duration-300 group-hover:border-primary/40 group-hover:bg-white/[0.04] group-hover:shadow-[0_0_20px_-4px_rgba(124,58,237,0.3)] cursor-default">
                  <span className="text-[9.5px] sm:text-[12px] font-medium text-text-secondary group-hover:text-text-primary whitespace-nowrap transition-colors">
                    {node}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
