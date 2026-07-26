"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "@/components/animate-ui/icons/arrow-right";
import { CircularTestimonials } from "@/components/ui/circular-testimonials";

const PREVIEW_MEMBERS = [
  { name: "Piyush Lingwal", designation: "Builder Group Leader", quote: "", src: "/members/piyushlingwal.png" },
  { name: "Piyush Rawat", designation: "Co-Lead", quote: "", src: "/members/piyushrawat.png" },
  { name: "Gaurav Shukla", designation: "Tech Lead", quote: "", src: "/members/gauravshukla.png" },
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
          {/* Member images 3D circular slider */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex justify-center"
          >
            <CircularTestimonials
              testimonials={PREVIEW_MEMBERS}
              autoplay={true}
              hideText={true}
              colors={{
                arrowBackground: "rgba(124, 58, 237, 0.2)",
                arrowForeground: "#FAFAFA",
                arrowHoverBackground: "#7C3AED",
              }}
            />
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
