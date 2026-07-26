"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "@/components/animate-ui/icons/arrow-right";

const PREVIEW_EVENTS = [
  { tag: "Workshop", title: "Cloud Bootcamp", desc: "Get hands-on with AWS core services in an intensive two-day bootcamp.", tagColor: "text-primary-light bg-primary/10 border-primary/30" },
  { tag: "Hands-on Session", title: "Build With AWS", desc: "Go from idea to deployed application in a single guided afternoon session.", tagColor: "text-success bg-success/10 border-success/30" },
  { tag: "Innovation Challenge", title: "Hackathon", desc: "Compete in teams to solve real-world problems using cloud technologies.", tagColor: "text-warning bg-warning/10 border-warning/30" },
  { tag: "Industry Insights", title: "Expert Talk", desc: "Hear from cloud practitioners and AWS experts on what it takes to build at scale.", tagColor: "text-info bg-info/10 border-info/30" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

export function FeaturedEvents() {
  const ref = React.useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-8%" });

  return (
    <section ref={ref} id="featured-events" className="bg-grid bg-noise relative overflow-hidden bg-bg border-t border-border">
      <div aria-hidden className="pointer-events-none absolute left-0 bottom-0 h-[350px] w-[400px] -translate-x-1/4 translate-y-1/4 rounded-full bg-accent/8 blur-[120px]" />

      <div className="relative mx-auto max-w-content px-4 sm:px-6 py-20 md:py-28">
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6"
        >
          <div>
            <motion.p variants={item} className="text-[11px] uppercase tracking-[0.16em] text-muted">Events</motion.p>
            <motion.h2 variants={item} className="mt-3 font-display text-[28px] sm:text-[34px] md:text-[42px] font-semibold leading-[1.1] tracking-tight text-text-primary">
              Learn Through{" "}
              <span className="text-gradient">Experiences</span>
            </motion.h2>
            <motion.p variants={item} className="mt-4 text-[15px] leading-relaxed text-text-secondary max-w-lg">
              Every event is designed to help students explore cloud technologies through practical learning, collaboration, and innovation.
            </motion.p>
          </div>
          <motion.div variants={item} className="flex-shrink-0">
            <Link
              href="/events"
              className="group inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-5 py-2.5 text-[13px] font-semibold text-primary-light transition-all duration-200 hover:bg-primary/20 hover:border-primary/60 cursor-pointer"
            >
              Explore All Events
              <ArrowRight size={14} animateOnHover />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {PREVIEW_EVENTS.map((ev) => (
            <motion.div
              key={ev.title}
              variants={item}
              className="group flex flex-col gap-3 rounded-2xl border border-border bg-bg-card/60 p-5 cursor-default transition-all duration-300 hover:border-primary/30 hover:bg-bg-card hover:shadow-[0_0_24px_rgba(124,58,237,0.12)]"
            >
              <span className={`inline-flex w-fit rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${ev.tagColor}`}>
                {ev.tag}
              </span>
              <h3 className="font-display text-[15px] font-semibold text-text-primary">{ev.title}</h3>
              <p className="text-[13px] leading-relaxed text-text-secondary">{ev.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
