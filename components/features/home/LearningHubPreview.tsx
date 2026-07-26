"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "@/components/animate-ui/icons/arrow-right";

const HUB_TOPICS = [
  { label: "AWS Fundamentals", icon: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  ), accent: "text-primary-light bg-primary/10" },
  { label: "Cloud Roadmaps", icon: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 17h3.5a3.5 3.5 0 0 0 7 0H17a2 2 0 0 0 2-2v-4l-3-4H5a2 2 0 0 0-2 2v8z"/><circle cx="7.5" cy="17" r="1.5"/><circle cx="16.5" cy="17" r="1.5"/>
    </svg>
  ), accent: "text-accent bg-accent/10" },
  { label: "Hands-on Labs", icon: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
  ), accent: "text-success bg-success/10" },
  { label: "Certification Guides", icon: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
    </svg>
  ), accent: "text-warning bg-warning/10" },
  { label: "Project Tutorials", icon: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18M9 21V9"/>
    </svg>
  ), accent: "text-info bg-info/10" },
  { label: "Interview Prep", icon: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"/><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"/>
    </svg>
  ), accent: "text-error bg-error/10" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export function LearningHubPreview() {
  const ref = React.useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-8%" });

  return (
    <section ref={ref} id="learning-hub-preview" className="bg-grid bg-noise relative overflow-hidden bg-bg border-t border-border">
      <div aria-hidden className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 h-[400px] w-[400px] translate-x-1/3 rounded-full bg-primary/8 blur-[130px]" />

      <div className="relative mx-auto max-w-content px-4 sm:px-6 py-20 md:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Text */}
          <motion.div
            variants={container}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
          >
            <motion.p variants={item} className="text-[11px] uppercase tracking-[0.16em] text-muted">
              Learning Hub
            </motion.p>
            <motion.h2 variants={item} className="mt-4 font-display text-[28px] sm:text-[34px] md:text-[42px] font-semibold leading-[1.1] tracking-tight text-text-primary">
              Learn at{" "}
              <span className="text-gradient">Your Own Pace</span>
            </motion.h2>
            <motion.p variants={item} className="mt-5 text-[15px] sm:text-[16px] leading-relaxed text-text-secondary max-w-md">
              Whether you&apos;re taking your first step into cloud computing or preparing for AWS certifications, our Learning Hub brings together carefully curated resources to help you learn with confidence.
            </motion.p>
            <motion.div variants={item} className="mt-8">
              <Link
                href="/learning-hub"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-[13px] font-semibold text-white transition-all duration-200 hover:bg-primary-hover shadow-[0_0_24px_rgba(124,58,237,0.4)] hover:shadow-[0_0_32px_rgba(124,58,237,0.6)] cursor-pointer"
              >
                Open Learning Hub
                <ArrowRight size={14} animateOnHover />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right topics grid */}
          <motion.div
            variants={container}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="grid grid-cols-2 gap-3"
          >
            {HUB_TOPICS.map((t) => (
              <motion.div
                key={t.label}
                variants={item}
                className="group flex items-center gap-3 rounded-xl border border-border bg-bg-card/60 p-4 cursor-default transition-all duration-300 hover:border-primary/30 hover:bg-bg-card hover:shadow-[0_0_20px_rgba(124,58,237,0.1)]"
              >
                <div className={`flex-shrink-0 flex h-9 w-9 items-center justify-center rounded-lg ${t.accent} transition-transform duration-300 group-hover:scale-110`}>
                  {t.icon}
                </div>
                <span className="text-[13px] font-medium text-text-secondary group-hover:text-text-primary transition-colors">
                  {t.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
