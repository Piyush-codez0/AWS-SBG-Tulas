"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const FAQS = [
  {
    q: "Who can apply to a Builder Wing?",
    a: "Any student at Tula's University — any branch, any year (1st to 4th). We value curiosity and enthusiasm over prior experience. If you're excited about AWS and cloud, you belong here.",
  },
  {
    q: "Do I need AWS knowledge or certifications?",
    a: "No prior certification is required. We provide AWS lab credits, learning resources, and peer mentorship once you join. We build you up.",
  },
  {
    q: "Can I apply for multiple wings?",
    a: "Yes — list a primary and secondary preference in your application. We'll evaluate your best fit and discuss it during the orientation session.",
  },
  {
    q: "How much time does it require per week?",
    a: "Roughly 3–5 hours per week, mostly on weekends or around event sprints. We respect your academics — this is built to be manageable.",
  },
  {
    q: "What do I get as a Core Team Member?",
    a: "An official AWS SBG member badge, community merchandise, AWS lab credits, a leadership certificate, mentorship from senior members, and priority access to regional cloud conferences and hackathons.",
  },
  {
    q: "When will the Core Team be revealed?",
    a: "The official 2026 Core Team Reveal will happen once selections are complete — exact date to be announced. Apply before then to be part of the reveal.",
  },
];

export function TeamFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-content mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 items-start">

        {/* Left sticky header */}
        <div className="lg:sticky lg:top-28">
          <p className="text-[10px] uppercase tracking-[0.22em] text-muted font-mono mb-3">FAQ</p>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-text-primary tracking-tight leading-tight mb-4">
            Common <br />
            <span className="bg-gradient-to-r from-primary-light to-accent bg-clip-text text-transparent">
              Questions.
            </span>
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            Everything you need to know before applying to a Builder Wing.
          </p>

          {/* Decorative element */}
          <div className="mt-8 p-4 rounded-2xl bg-bg-card border border-border">
            <p className="text-xs text-muted font-mono mb-1">Still have questions?</p>
            <a
              href="mailto:awssbg@tulas.edu.in"
              className="text-sm font-semibold text-primary-light hover:text-accent transition-colors"
            >
              awssbg@tulas.edu.in →
            </a>
          </div>
        </div>

        {/* Right — FAQ accordion */}
        <div className="space-y-2">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.07 }}
                className={`rounded-2xl border overflow-hidden transition-all duration-300 ${
                  isOpen
                    ? "border-primary/30 bg-gradient-to-br from-primary/8 via-bg-card to-bg-card"
                    : "border-border bg-bg-card hover:border-border/80"
                }`}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left focus:outline-none"
                >
                  <span className={`text-sm font-semibold font-display transition-colors ${isOpen ? "text-text-primary" : "text-text-secondary hover:text-text-primary"}`}>
                    {faq.q}
                  </span>
                  <div className={`shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-300 ${isOpen ? "border-primary/40 bg-primary/15 text-primary-light" : "border-border text-muted"}`}>
                    {isOpen ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p className="px-5 pb-5 text-sm text-text-secondary leading-relaxed border-t border-primary/15 pt-3">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
