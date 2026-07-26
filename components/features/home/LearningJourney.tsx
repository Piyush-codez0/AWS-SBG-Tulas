"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";

const JOURNEY_STEPS = [
  {
    step: "01",
    title: "Join AWS SBG",
    desc: "Register and become part of our growing community of cloud builders.",
    accent: "bg-primary/20 border-primary/50 shadow-[0_0_20px_rgba(124,58,237,0.25)]",
    dot: "bg-primary",
  },
  {
    step: "02",
    title: "Learn Cloud Basics",
    desc: "Start with cloud fundamentals through curated resources and guided pathways.",
    accent: "bg-bg-card border-border",
    dot: "bg-accent",
  },
  {
    step: "03",
    title: "Attend Workshops",
    desc: "Join hands-on workshops led by peers and industry professionals.",
    accent: "bg-bg-card border-border",
    dot: "bg-success",
  },
  {
    step: "04",
    title: "Build Real Projects",
    desc: "Apply what you learn by building actual applications on AWS infrastructure.",
    accent: "bg-bg-card border-border",
    dot: "bg-warning",
  },
  {
    step: "05",
    title: "Participate in Hackathons",
    desc: "Compete, collaborate, and solve real-world problems in innovation challenges.",
    accent: "bg-bg-card border-border",
    dot: "bg-info",
  },
  {
    step: "06",
    title: "Earn Skill Badges",
    desc: "Collect AWS digital badges and certifications that validate your expertise.",
    accent: "bg-bg-card border-border",
    dot: "bg-accent",
  },
  {
    step: "07",
    title: "Become a Community Leader",
    desc: "Give back by mentoring others and leading sessions as a community champion.",
    accent: "bg-bg-card border-border",
    dot: "bg-primary",
  },
];

export function LearningJourney() {
  const ref = React.useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <section ref={ref} id="journey" className="bg-grid bg-noise relative overflow-hidden bg-bg border-t border-border">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-primary/6 blur-[150px]" />

      <div className="relative mx-auto max-w-content px-4 sm:px-6 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto"
        >
          <p className="text-[11px] uppercase tracking-[0.16em] text-muted">Your Path</p>
          <h2 className="mt-4 font-display text-[28px] sm:text-[34px] md:text-[42px] font-semibold leading-[1.1] tracking-tight text-text-primary">
            Your Journey{" "}
            <span className="text-gradient">Starts Here</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="mt-14 relative max-w-2xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-[18px] sm:left-[22px] top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-accent/40 to-transparent" />

          <div className="flex flex-col gap-0">
            {JOURNEY_STEPS.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.1 + 0.2, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex items-start gap-4 sm:gap-6 pb-8 last:pb-0"
              >
                {/* Step dot */}
                <div className="relative z-10 flex-shrink-0 flex items-center justify-center">
                  <div className={`h-9 w-9 sm:h-11 sm:w-11 rounded-full ${step.accent} flex items-center justify-center border`}>
                    <span className="text-[10px] sm:text-[12px] font-bold text-text-primary font-inter tabular-nums">
                      {step.step}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col pt-1.5 sm:pt-2.5 pb-2">
                  <h3 className="font-display text-[15px] sm:text-[17px] font-semibold text-text-primary">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-[13px] sm:text-[14px] leading-relaxed text-text-secondary max-w-md">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
