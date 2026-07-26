"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "@/components/animate-ui/icons/arrow-right";

const PREVIEW_MEMBERS = [
  { name: "Piyush Lingwal", role: "Builder Group Leader", avatar: "/members/piyushlingwal.png" },
  { name: "Piyush Rawat", role: "Co-Lead", avatar: "/members/piyushrawat.png" },
  { name: "Gaurav Shukla", role: "Tech Lead", avatar: "/members/gauravshukla.png" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export function MeetTheBuilders() {
  const ref = React.useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-8%" });

  return (
    <section ref={ref} id="meet-builders" className="bg-grid bg-noise relative overflow-hidden bg-bg border-t border-border">
      <div aria-hidden className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 h-[400px] w-[400px] -translate-x-1/3 rounded-full bg-primary/8 blur-[130px]" />

      <div className="relative mx-auto max-w-content px-4 sm:px-6 py-20 md:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Member cards */}
          <motion.div
            variants={container}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="flex flex-col sm:flex-row gap-4"
          >
            {PREVIEW_MEMBERS.map((m, i) => (
              <motion.div
                key={m.name}
                variants={item}
                className="relative flex-1 flex flex-col items-center gap-3 rounded-2xl border border-border bg-bg-card/80 p-5 text-center backdrop-blur-sm"
                style={{ marginTop: i === 1 ? "1.5rem" : 0 }}
              >
                {/* Glow ring for first card */}
                {i === 0 && (
                  <div className="absolute inset-0 rounded-2xl border border-primary/30 shadow-[0_0_30px_rgba(124,58,237,0.15)]" />
                )}
                <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-primary/30 bg-bg-elevated">
                  <Image
                    src={m.avatar}
                    alt={m.name}
                    fill
                    className="object-cover"
                    onError={() => {}} // graceful fallback
                  />
                  {/* Fallback initial if image missing */}
                  <div className="absolute inset-0 flex items-center justify-center text-primary-light font-bold text-xl opacity-0">
                    {m.name[0]}
                  </div>
                </div>
                <div>
                  <p className="font-display text-[14px] font-semibold text-text-primary">{m.name}</p>
                  <p className="mt-0.5 text-[12px] text-muted">{m.role}</p>
                </div>
                {i === 0 && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-0.5 text-[10px] font-semibold text-success">
                    <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                    Building
                  </span>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Right text */}
          <motion.div
            variants={container}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
          >
            <motion.p variants={item} className="text-[11px] uppercase tracking-[0.16em] text-muted">
              Our Team
            </motion.p>
            <motion.h2 variants={item} className="mt-4 font-display text-[28px] sm:text-[34px] md:text-[42px] font-semibold leading-[1.1] tracking-tight text-text-primary">
              Powered by{" "}
              <span className="text-gradient">Passionate Students</span>
            </motion.h2>
            <motion.p variants={item} className="mt-5 text-[15px] sm:text-[16px] leading-relaxed text-text-secondary max-w-md">
              Behind every workshop, event, and initiative is a team of students committed to creating opportunities for others to learn, build, and grow.
            </motion.p>
            <motion.div variants={item} className="mt-8">
              <Link
                href="/team"
                className="group inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-6 py-3 text-[13px] font-semibold text-primary-light transition-all duration-200 hover:bg-primary/20 hover:border-primary/60 cursor-pointer"
              >
                Meet Our Team
                <ArrowRight size={14} animateOnHover />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
