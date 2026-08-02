import React from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Sparkles, UserPlus } from "lucide-react";
import { PixelHeading } from "@/components/ui/pixel-heading-character";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function TeamCTA() {
  const sectionRef = React.useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const items = gsap.utils.toArray<HTMLElement>(".gsap-reveal-cta");
    items.forEach((item, idx) => {
      gsap.fromTo(
        item,
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          delay: idx * 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 88%",
            end: "bottom 8%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative pt-4 pb-20 md:pt-6 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-content mx-auto text-center overflow-hidden">
      {/* Background Ambient Glow matching site theme */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[350px] w-[500px] rounded-full bg-primary/12 blur-[130px]" />

      <div className="relative z-10 max-w-3xl mx-auto space-y-8">
        {/* Eyebrow */}
        <p className="gsap-reveal-cta text-[11px] uppercase tracking-[0.16em] text-muted font-mono">
          Join The Community
        </p>

        {/* Four Kinetic Pillar Words */}
        <div className="gsap-reveal-cta relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-96 md:w-[480px] h-24 bg-[#7C3AED]/25 blur-3xl rounded-full pointer-events-none z-0" />
          <div className="relative z-10 text-2xl sm:text-4xl md:text-5xl font-semibold font-display tracking-tight">
            <PixelHeading mode="uniform" className="text-gradient">
              Think • Build • Lead • Inspire
            </PixelHeading>
          </div>
        </div>

        {/* Headline */}
        <div className="gsap-reveal-cta relative z-10 space-y-3">
          <h2 className="text-3xl sm:text-5xl font-semibold text-text-primary font-display tracking-tight leading-tight">
            The next card here could be yours.
          </h2>
          <p className="text-text-secondary text-[15px] sm:text-[18px] max-w-xl mx-auto font-normal leading-relaxed">
            Become part of AWS Student Builders Group and build real-world cloud applications alongside top developers.
          </p>
        </div>

        {/* Card Mock Preview */}
        <div className="gsap-reveal-cta mx-auto max-w-sm rounded-2xl bg-bg-card border border-dashed border-primary/40 p-6 backdrop-blur-xl shadow-xl space-y-3 hover:border-primary-light transition-colors">
          <div className="w-16 h-16 rounded-full mx-auto bg-primary/10 border border-primary/30 flex items-center justify-center text-primary-light">
            <UserPlus className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary font-display">Your Name Here</h3>
            <p className="text-xs font-mono text-primary-light mt-0.5">Future Cloud Builder</p>
          </div>
        </div>

        {/* Brand Primary CTA Button matching site style */}
        <div className="gsap-reveal-cta pt-2">
          <Link
            href="/register"
            className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold text-sm tracking-wide shadow-[0_0_30px_-5px_rgba(124,58,237,0.5)] hover:shadow-[0_0_40px_-5px_rgba(124,58,237,0.7)] hover:scale-[1.02] transition-all duration-300"
          >
            <Sparkles className="w-4 h-4 text-accent" />
            <span>Join AWS SBG Community</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
