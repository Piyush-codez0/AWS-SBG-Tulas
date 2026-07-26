"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";

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
    border: "border-primary/20 hover:border-primary/50",
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
    border: "border-accent/20 hover:border-accent/50",
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
    border: "border-success/20 hover:border-success/50",
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
    border: "border-warning/20 hover:border-warning/50",
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
    border: "border-error/20 hover:border-error/50",
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
    border: "border-info/20 hover:border-info/50",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

export function WhatYouCanBuild() {
  const ref = React.useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-8%" });

  return (
    <section ref={ref} id="what-you-build" className="bg-grid bg-noise relative overflow-hidden bg-bg border-t border-border">
      <div aria-hidden className="pointer-events-none absolute right-0 top-0 h-[450px] w-[450px] translate-x-1/3 -translate-y-1/4 rounded-full bg-accent/8 blur-[130px]" />

      <div className="relative mx-auto max-w-content px-4 sm:px-6 py-20 md:py-28">
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="text-center max-w-2xl mx-auto"
        >
          <motion.p variants={item} className="text-[11px] uppercase tracking-[0.16em] text-muted">
            Possibilities
          </motion.p>
          <motion.h2 variants={item} className="mt-4 font-display text-[28px] sm:text-[34px] md:text-[42px] font-semibold leading-[1.1] tracking-tight text-text-primary">
            Build Projects That{" "}
            <span className="text-gradient">Make an Impact</span>
          </motion.h2>
          <motion.p variants={item} className="mt-4 text-[15px] sm:text-[16px] leading-relaxed text-text-secondary">
            Cloud isn&apos;t just about servers. It&apos;s about turning ideas into products that people can actually use.
          </motion.p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {BUILD_CARDS.map((card) => (
            <motion.div
              key={card.title}
              variants={item}
              className={`group relative flex flex-col gap-4 rounded-2xl border bg-bg-card/60 p-6 cursor-default backdrop-blur-sm transition-all duration-300 hover:bg-bg-card hover:shadow-[0_0_30px_rgba(124,58,237,0.12)] ${card.border}`}
            >
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${card.accent} transition-transform duration-300 group-hover:scale-110`}>
                {card.icon}
              </div>
              <div>
                <h3 className="font-display text-[16px] font-semibold tracking-tight text-text-primary">
                  {card.title}
                </h3>
                <p className="mt-1.5 text-[14px] leading-relaxed text-text-secondary">
                  {card.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
