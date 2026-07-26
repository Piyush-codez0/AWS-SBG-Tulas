"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";

const VALUES = [
  {
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
        <path d="M9 18h6M10 22h4" />
      </svg>
    ),
    label: "Learn by Building",
    accent: "text-primary-light bg-primary/10 border-primary/30",
  },
  {
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    label: "Grow Together",
    accent: "text-accent bg-accent/10 border-accent/30",
  },
  {
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </svg>
    ),
    label: "Create Real Projects",
    accent: "text-success bg-success/10 border-success/30",
  },
  {
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="m4.93 4.93 14.14 14.14" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" />
      </svg>
    ),
    label: "Share Knowledge",
    accent: "text-info bg-info/10 border-info/30",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

export function OurMission() {
  const ref = React.useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-8%" });

  return (
    <section ref={ref} id="mission" className="bg-grid bg-noise relative overflow-hidden bg-bg border-t border-border">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[350px] w-[600px] -translate-x-1/2 rounded-full bg-primary/8 blur-[120px]" />

      <div className="relative mx-auto max-w-content px-4 sm:px-6 py-20 md:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left text */}
          <motion.div
            variants={container}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
          >
            <motion.p variants={item} className="text-[11px] uppercase tracking-[0.16em] text-muted">
              Who We Are
            </motion.p>
            <motion.h2 variants={item} className="mt-4 font-display text-[28px] sm:text-[34px] md:text-[42px] font-semibold leading-[1.1] tracking-tight text-text-primary">
              Empowering Students to{" "}
              <span className="text-gradient">Build with Cloud</span>
            </motion.h2>
            <motion.p variants={item} className="mt-5 text-[15px] sm:text-[16px] leading-relaxed text-text-secondary">
              AWS Student Builders Group at Tula&apos;s University is a student-led technical community focused on making cloud computing accessible, practical, and exciting for everyone.
            </motion.p>
            <motion.p variants={item} className="mt-3 text-[15px] sm:text-[16px] leading-relaxed text-text-secondary">
              We believe the best way to learn is by building. Through workshops, collaborative projects, technical sessions, and hackathons — we help students gain real-world skills while growing alongside an ambitious community.
            </motion.p>
          </motion.div>

          {/* Right values */}
          <motion.div
            variants={container}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="grid grid-cols-2 gap-4"
          >
            {VALUES.map((v) => (
              <motion.div
                key={v.label}
                variants={item}
                className={`flex flex-col gap-3 rounded-2xl border p-5 transition-all duration-300 hover:shadow-[0_0_20px_rgba(124,58,237,0.15)] cursor-default ${v.accent.split(" ").slice(1).join(" ")}`}
              >
                <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${v.accent.split(" ").slice(0, 2).join(" ")}`}>
                  {v.icon}
                </div>
                <span className="font-display text-[14px] sm:text-[15px] font-semibold text-text-primary">
                  {v.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
