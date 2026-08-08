"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Shield, Sparkles, Trophy, Users } from "lucide-react";

const BENEFITS = [
  { icon: Trophy, label: "Official Badge & Certificate" },
  { icon: Shield, label: "AWS Lab Credits" },
  { icon: Sparkles, label: "Mentorship & Conferences" },
  { icon: Users, label: "Core Team Reveal Recognition" },
];

export function TeamCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <section ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 max-w-content mx-auto">
      <motion.div
        style={{ y, opacity }}
        className="relative rounded-3xl overflow-hidden border border-primary/20"
      >
        {/* Background layers */}
        <div className="absolute inset-0 bg-bg-card" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-bg-card to-bg-card" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(124,58,237,0.25)_0%,_transparent_65%)]" />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(167,139,250,1) 1px, transparent 1px), linear-gradient(to right, rgba(167,139,250,1) 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative z-10 p-10 sm:p-16 flex flex-col lg:flex-row items-center gap-14">
          {/* Left — Text content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 border border-primary/25 text-xs font-mono text-primary-light mb-6">
              <span className="animate-pulse">✦</span>
              Limited Slots — Cohort 2026
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold font-display text-text-primary tracking-tight leading-tight mb-4">
              Your name on the{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-primary-light via-accent to-purple-300 bg-clip-text text-transparent">
                  2026 Core Team
                </span>
                <svg
                  className="absolute -bottom-2 left-0 right-0 w-full"
                  height="8"
                  viewBox="0 0 300 8"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,5 Q75,0 150,5 Q225,10 300,5"
                    stroke="url(#underline-gradient)"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="underline-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#A78BFA" />
                      <stop offset="100%" stopColor="#C084FC" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>{" "}
              Reveal.
            </h2>

            <p className="text-text-secondary text-base leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
              Builder Wing slots are limited. Don't wait for the reveal to wish you had applied. Apply now and become part of history.
            </p>

            {/* Benefit pills */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-8">
              {BENEFITS.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-bg-surface border border-border text-xs font-mono text-text-secondary"
                >
                  <Icon className="w-3.5 h-3.5 text-primary-light" />
                  {label}
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <Link
                href="/register"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-primary hover:bg-primary-hover text-white font-bold text-sm shadow-[0_0_35px_-5px_rgba(124,58,237,0.7)] hover:shadow-[0_0_50px_-5px_rgba(124,58,237,0.9)] hover:scale-[1.03] transition-all duration-300"
              >
                Submit Your Application
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#wings"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-bg-surface border border-border hover:border-primary/40 text-text-secondary hover:text-text-primary font-bold text-sm transition-all duration-300 hover:scale-[1.02]"
              >
                View Builder Wings
              </a>
            </div>
          </div>

          {/* Right — Decorative "Member Card" */}
          <div className="shrink-0 w-full lg:w-72">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/15 via-bg-elevated to-bg-card p-6 shadow-[0_0_60px_-15px_rgba(124,58,237,0.4)]"
            >
              {/* Card glow */}
              <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_top_left,_rgba(124,58,237,0.2)_0%,_transparent_60%)] pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[9px] font-mono text-primary-light tracking-widest uppercase">AWS SBG · Tula's</span>
                  <span className="text-[9px] font-mono text-muted">2026</span>
                </div>

                {/* Avatar placeholder */}
                <div className="w-16 h-16 rounded-2xl bg-bg-surface border border-primary/20 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-primary-light/30 font-mono">?</span>
                </div>

                <div className="h-3 w-28 bg-bg-surface rounded-full mb-2" />
                <div className="h-2.5 w-20 bg-bg-surface/60 rounded-full mb-5" />

                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/15 border border-primary/25">
                  <span className="w-2 h-2 rounded-full bg-primary-light animate-pulse" />
                  <span className="text-[10px] font-mono text-primary-light">Core Member · 2026</span>
                </div>

                <p className="text-[10px] text-muted font-mono mt-4 text-center">
                  Your slot is waiting.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
