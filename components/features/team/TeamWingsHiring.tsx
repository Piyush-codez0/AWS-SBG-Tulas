"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Code2, Cloud, Palette, Calendar, Video, Megaphone, ArrowUpRight,
} from "lucide-react";

const WINGS = [
  { id: "technology", num: "01", name: "Technology", suffix: "Wing", icon: Code2,     accent: "#A78BFA", accentRgb: "167,139,250", label: "Dev · Web · Bots" },
  { id: "cloud",      num: "02", name: "Cloud",      suffix: "Wing", icon: Cloud,     accent: "#FCD34D", accentRgb: "252,211,77",  label: "AWS · Labs · Serverless" },
  { id: "design",     num: "03", name: "Design",     suffix: "Wing", icon: Palette,   accent: "#F472B6", accentRgb: "244,114,182", label: "UI · Brand · Visuals" },
  { id: "events",     num: "04", name: "Events",     suffix: "& Ops Wing", icon: Calendar, accent: "#38BDF8", accentRgb: "56,189,248",  label: "Hackathons · Jams · Ops" },
  { id: "media",      num: "05", name: "Media",      suffix: "Wing", icon: Video,     accent: "#34D399", accentRgb: "52,211,153",  label: "Film · Photo · Content" },
  { id: "outreach",   num: "06", name: "Outreach",   suffix: "Wing", icon: Megaphone, accent: "#FB923C", accentRgb: "251,146,60",  label: "PR · Sponsorships · Network" },
];

/* ─── Single Wing Row ──────────────────────────────────── */
function WingRow({ wing, index }: { wing: typeof WINGS[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const Icon = wing.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/register?wing=${encodeURIComponent(wing.name + " " + wing.suffix)}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group relative flex items-center gap-6 sm:gap-10 py-7 border-b border-white/[0.06] overflow-hidden transition-colors duration-300"
      >
        {/* Background sweep on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ scaleX: hovered ? 1 : 0, originX: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: `linear-gradient(to right, rgba(${wing.accentRgb},0.07) 0%, rgba(${wing.accentRgb},0.03) 60%, transparent 100%)`,
          }}
        />

        {/* Left border accent */}
        <motion.div
          className="absolute left-0 top-4 bottom-4 w-[2px] rounded-full pointer-events-none"
          animate={{ opacity: hovered ? 1 : 0, scaleY: hovered ? 1 : 0.3 }}
          transition={{ duration: 0.3 }}
          style={{ background: wing.accent }}
        />

        {/* Number */}
        <motion.span
          animate={{ color: hovered ? wing.accent : "rgba(255,255,255,0.15)" }}
          transition={{ duration: 0.25 }}
          className="shrink-0 text-sm font-mono font-bold w-8 text-right select-none"
        >
          {wing.num}
        </motion.span>

        {/* Wing name */}
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-3 flex-wrap">
            <motion.span
              animate={{ color: hovered ? "#FAFAFA" : "rgba(255,255,255,0.75)" }}
              transition={{ duration: 0.25 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight leading-none"
            >
              {wing.name}
            </motion.span>
            <motion.span
              animate={{ color: hovered ? `rgba(${wing.accentRgb},0.85)` : "rgba(255,255,255,0.20)" }}
              transition={{ duration: 0.25 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight leading-none"
            >
              {wing.suffix}
            </motion.span>
          </div>
          <motion.p
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 4 }}
            transition={{ duration: 0.25 }}
            className="text-xs font-mono mt-1.5"
            style={{ color: `rgba(${wing.accentRgb},0.65)` }}
          >
            {wing.label}
          </motion.p>
        </div>

        {/* Right — Icon + Apply */}
        <div className="shrink-0 flex items-center gap-3">
          {/* Status dot — only on hover */}
          <motion.span
            animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 8 }}
            transition={{ duration: 0.25 }}
            className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 whitespace-nowrap"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Apply
          </motion.span>

          {/* Icon circle */}
          <motion.div
            animate={{
              background: hovered ? `rgba(${wing.accentRgb},0.15)` : "rgba(255,255,255,0.04)",
              borderColor: hovered ? `rgba(${wing.accentRgb},0.35)` : "rgba(255,255,255,0.08)",
            }}
            transition={{ duration: 0.3 }}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border flex items-center justify-center"
          >
            <motion.div
              animate={{ rotate: hovered ? 10 : 0, scale: hovered ? 1.1 : 1 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <Icon
                className="w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-300"
                style={{ color: hovered ? wing.accent : "rgba(255,255,255,0.35)" }}
              />
            </motion.div>
          </motion.div>

          {/* Arrow */}
          <motion.div
            animate={{
              x: hovered ? 0 : -6,
              y: hovered ? 0 : 6,
              opacity: hovered ? 1 : 0,
            }}
            transition={{ duration: 0.25 }}
          >
            <ArrowUpRight className="w-5 h-5" style={{ color: wing.accent }} />
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ─── Section ─────────────────────────────────────────── */
export function TeamWingsHiring() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const headerY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section ref={sectionRef} id="wings" className="py-20 px-4 sm:px-6 lg:px-8 max-w-content mx-auto">

      {/* ── Section header ──────────────────────────── */}
      <motion.div style={{ y: headerY }} className="mb-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8 bg-primary/60" />
              <span className="text-[10px] font-mono tracking-[0.25em] text-muted uppercase">
                Cohort 2026
              </span>
            </div>

            {/* Title */}
            <h2 className="text-4xl sm:text-6xl font-bold font-display text-text-primary tracking-tight leading-[1.0]">
              Choose Your
              <br />
              <span className="bg-gradient-to-r from-primary-light via-accent to-purple-300 bg-clip-text text-transparent">
                Builder Wing.
              </span>
            </h2>
          </div>

          {/* Right side info */}
          <div className="sm:text-right space-y-2 shrink-0">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Applications Open · 2026
            </div>
            <p className="text-xs text-muted font-mono block mt-2">
              6 wings · Limited slots · All years welcome
            </p>
          </div>
        </div>
      </motion.div>

      {/* ── Top border ──────────────────────────────── */}
      <div className="border-t border-white/[0.08]" />

      {/* ── Wing rows ──────────────────────────────── */}
      <div>
        {WINGS.map((wing, idx) => (
          <WingRow key={wing.id} wing={wing} index={idx} />
        ))}
      </div>

      {/* ── Footer ─────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <p className="text-xs text-muted font-mono">
          Hover a wing to apply → or{" "}
          <Link
            href="/register"
            className="text-text-secondary hover:text-text-primary underline underline-offset-4 transition-colors"
          >
            submit a general application
          </Link>
        </p>

        {/* Mini wing dots */}
        <div className="flex items-center gap-2">
          {WINGS.map(w => (
            <div
              key={w.id}
              className="w-2 h-2 rounded-full"
              style={{ background: w.accent, opacity: 0.5 }}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
