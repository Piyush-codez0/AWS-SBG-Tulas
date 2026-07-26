"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";

const CLOUD_SERVICES = [
  { label: "AI", top: "8%", left: "50%", delay: 0 },
  { label: "Web Apps", top: "20%", left: "78%", delay: 0.1 },
  { label: "Storage", top: "48%", left: "88%", delay: 0.2 },
  { label: "Databases", top: "76%", left: "72%", delay: 0.3 },
  { label: "Serverless", top: "88%", left: "44%", delay: 0.4 },
  { label: "Analytics", top: "76%", left: "18%", delay: 0.5 },
  { label: "Security", top: "48%", left: "10%", delay: 0.6 },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export function WhyCloudMatters() {
  const ref = React.useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      ref={ref}
      id="why-cloud"
      className="bg-grid bg-noise relative overflow-hidden bg-bg border-t border-border"
    >
      <div aria-hidden className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/8 blur-[140px]" />

      <div className="relative mx-auto max-w-content px-4 sm:px-6 py-20 md:py-28 lg:py-36">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — Text */}
          <motion.div
            variants={container}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
          >
            <motion.p variants={item} className="text-[11px] uppercase tracking-[0.16em] text-muted">
              Future of Technology
            </motion.p>
            <motion.h2
              variants={item}
              className="mt-4 font-display text-[28px] sm:text-[34px] md:text-[42px] font-semibold leading-[1.1] tracking-tight text-text-primary"
            >
              Every Great Idea Needs a{" "}
              <span className="text-gradient">Powerful Cloud</span>
            </motion.h2>
            <motion.p variants={item} className="mt-5 text-[15px] sm:text-[16px] leading-relaxed text-text-secondary max-w-md">
              Behind every modern app, AI assistant, streaming platform, and global business is cloud technology. AWS powers millions of applications worldwide — making it easier to build, deploy, and scale ideas of any size.
            </motion.p>
            <motion.p variants={item} className="mt-3 text-[15px] sm:text-[16px] leading-relaxed text-text-secondary max-w-md">
              Whether you&apos;re creating your first portfolio website or developing the next big startup, learning cloud opens doors to endless possibilities.
            </motion.p>
          </motion.div>

          {/* Right — Animated Orbit Illustration */}
          <div className="relative flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] mx-auto"
            >
              {/* Orbit ring */}
              <div className="absolute inset-0 rounded-full border border-primary/20 animate-spin-slow" />
              <div className="absolute inset-4 rounded-full border border-primary/10" />
              <div className="absolute inset-8 rounded-full border border-white/5" />

              {/* Centre cloud node */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-primary/20 border border-primary/40 shadow-[0_0_40px_rgba(124,58,237,0.5)] backdrop-blur-sm">
                <svg className="h-7 w-7 sm:h-9 sm:w-9 text-primary-light" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
                </svg>
              </div>

              {/* Service pills orbiting */}
              {CLOUD_SERVICES.map((svc) => (
                <motion.div
                  key={svc.label}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: svc.delay + 0.4, duration: 0.5, ease: "backOut" }}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ top: svc.top, left: svc.left }}
                >
                  <div className="rounded-full border border-primary/30 bg-bg-surface/80 backdrop-blur-sm px-2.5 py-1 sm:px-3 sm:py-1.5 shadow-[0_0_12px_rgba(124,58,237,0.2)]">
                    <span className="text-[9px] sm:text-[11px] font-semibold text-primary-light whitespace-nowrap">
                      {svc.label}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
