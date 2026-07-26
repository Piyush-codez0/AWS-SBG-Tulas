"use client";

import * as React from "react";
import { motion, useInView, animate } from "framer-motion";
import { PixelHeading } from "@/components/ui/pixel-heading-character";

type Stat = { label: string; value: number; suffix?: string };

const STATS: Stat[] = [
  { label: "Members", value: 50, suffix: "+" },
  { label: "Workshops", value: 15, suffix: "+" },
  { label: "Projects Built", value: 10, suffix: "+" },
  { label: "Hackathons", value: 5, suffix: "+" },
  { label: "Hours of Learning", value: 100, suffix: "+" },
];

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });

  React.useEffect(() => {
    if (!inView || !ref.current) return;
    const node = ref.current;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(latest) {
        node.textContent = Math.round(latest).toString() + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, value, suffix]);

  return <span ref={ref}>{`0${suffix}`}</span>;
}

export function AboutStats() {
  return (
    <section className="bg-noise relative overflow-hidden bg-bg border-y border-border">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]"
      />

      <div className="relative mx-auto max-w-content px-4 sm:px-6 py-20 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <p className="text-[11px] uppercase tracking-[0.16em] text-muted">
            Community Impact
          </p>
          <h2 className="mt-4 font-display text-[28px] sm:text-[32px] md:text-[40px] font-semibold leading-[1.1] tracking-tight text-text-primary">
            Growing{" "}
            <PixelHeading mode="uniform" className="text-gradient">together.</PixelHeading>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px overflow-hidden rounded-xl border border-border bg-border"
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-2 bg-bg px-4 py-8 sm:py-10 transition-colors duration-200 hover:bg-white/[0.02]"
            >
              <span className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-gradient">
                <Counter value={stat.value} suffix={stat.suffix} />
              </span>
              <span className="text-[13px] sm:text-[14px] text-text-secondary text-center">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
