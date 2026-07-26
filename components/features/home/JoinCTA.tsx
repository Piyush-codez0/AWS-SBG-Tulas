"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "@/components/animate-ui/icons/arrow-right";

export function JoinCTA() {
  const ref = React.useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <section ref={ref} id="join-cta" className="relative overflow-hidden bg-bg border-t border-border">
      {/* Dark background with radial gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg to-black/60" />
      {/* Purple glow orbs */}
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-primary/20 blur-[180px]" />
      <div aria-hidden className="pointer-events-none absolute left-1/4 bottom-0 h-[300px] w-[300px] translate-y-1/2 rounded-full bg-accent/15 blur-[120px]" />
      <div aria-hidden className="pointer-events-none absolute right-1/4 top-0 h-[300px] w-[300px] -translate-y-1/2 rounded-full bg-primary/15 blur-[120px]" />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(250,250,250,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(250,250,250,0.1) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative mx-auto max-w-content px-4 sm:px-6 py-28 md:py-36 lg:py-44 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-[11px] uppercase tracking-[0.16em] text-muted">Start Your Journey</p>

          <h2 className="mt-4 font-display text-[32px] sm:text-[42px] md:text-[56px] font-semibold leading-[1.05] tracking-tight text-text-primary max-w-3xl mx-auto">
            Ready to Start Your{" "}
            <span className="text-gradient">Cloud Journey?</span>
          </h2>

          <p className="mt-6 text-[15px] sm:text-[17px] leading-relaxed text-text-secondary max-w-2xl mx-auto">
            Join a community where curiosity turns into innovation. Learn modern cloud technologies, build meaningful projects, collaborate with like-minded students, and prepare for the future of technology — one step at a time.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/register"
              className="group inline-flex items-center gap-2.5 rounded-full bg-primary px-8 py-4 text-[14px] font-semibold text-white shadow-[0_0_40px_rgba(124,58,237,0.5)] transition-all duration-300 hover:bg-primary-hover hover:shadow-[0_0_60px_rgba(124,58,237,0.7)] hover:scale-105 cursor-pointer"
            >
              Join Community
              <ArrowRight size={16} animateOnHover />
            </Link>
            <Link
              href="/learning-hub"
              className="group inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-[14px] font-semibold text-text-primary backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:border-white/30 cursor-pointer"
            >
              Explore Learning Hub
              <ArrowRight size={16} animateOnHover />
            </Link>
          </motion.div>

          {/* Social proof subtle line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-8 text-[13px] text-muted"
          >
            500+ students have already joined the builder community
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
