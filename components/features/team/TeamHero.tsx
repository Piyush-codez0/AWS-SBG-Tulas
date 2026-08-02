"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Cloud, Terminal, Cpu } from "lucide-react";
import { PixelHeading } from "@/components/ui/pixel-heading-character";

export function TeamHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Canvas particle network with primary purple & accent glowing nodes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
    }

    const colors = ["#7C3AED", "#A78BFA", "#C084FC", "#38BDF8", "#8B5CF6"];
    const particles: Particle[] = Array.from({ length: 40 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      size: Math.random() * 2 + 1.2,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.5 + 0.3,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);

          if (dist < 130) {
            const lineAlpha = (1 - dist / 130) * 0.2;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(167, 139, 250, ${lineAlpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.globalAlpha = 1.0;
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-36 pb-24 md:pt-44 md:pb-28 px-4 sm:px-6">
      {/* Background canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Floating Gradient Ambient Glows matching site theme */}
      <div className="pointer-events-none absolute left-1/2 top-1/4 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[550px] rounded-full bg-primary/12 blur-[130px]" />
      <div className="pointer-events-none absolute right-1/4 top-1/3 h-[350px] w-[350px] rounded-full bg-accent/8 blur-[130px]" />

      {/* Floating AWS & Tech Badges with navbar clearance */}
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [0, 4, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-36 left-6 lg:left-20 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-bg-surface/80 backdrop-blur-md border border-border text-primary-light text-xs font-mono shadow-lg z-10"
      >
        <Image src="/logos/AWS_logo.svg" alt="AWS" width={22} height={14} className="h-3.5 w-auto brightness-200" />
        <span>AWS Cloud</span>
      </motion.div>

      <motion.div
        animate={{ y: [0, 12, 0], rotate: [0, -4, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-28 left-10 lg:left-24 hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-bg-surface/80 backdrop-blur-md border border-border text-text-secondary text-xs font-mono shadow-lg z-10"
      >
        <Terminal className="w-3.5 h-3.5 text-primary-light" />
        <span>Serverless</span>
      </motion.div>

      <motion.div
        animate={{ y: [0, -12, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-40 right-6 lg:right-20 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-bg-surface/80 backdrop-blur-md border border-border text-text-secondary text-xs font-mono shadow-lg z-10"
      >
        <Cpu className="w-3.5 h-3.5 text-accent" />
        <span>Cloud AI</span>
      </motion.div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Eyebrow Label */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[11px] uppercase tracking-[0.16em] text-muted font-mono"
        >
          AWS Student Builders Group
        </motion.p>

        {/* Main Title matching site font-display and pixel text gradient */}
        <div className="relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-96 md:w-[500px] h-24 bg-[#7C3AED]/25 blur-3xl rounded-full pointer-events-none z-0" />
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative z-10 mt-4 text-4xl sm:text-6xl md:text-7xl font-semibold leading-[1.08] tracking-tight text-text-primary font-display"
          >
            Meet the{" "}
            <PixelHeading mode="uniform" className="text-gradient">
              Builders.
            </PixelHeading>
          </motion.h1>
        </div>

        {/* Subtitle matching site text-text-secondary */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-6 sm:mt-8 text-[15px] sm:text-[18px] md:text-[20px] leading-relaxed text-text-secondary max-w-2xl mx-auto font-normal"
        >
          Behind every workshop, hackathon, and successful event is a passionate team dedicated to empowering the next generation of cloud innovators.
        </motion.p>

      </div>

      {/* Scroll Indicator - Anchored at bottom center of Hero */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 inline-flex flex-col items-center gap-2 cursor-pointer group"
        onClick={() => {
          document.getElementById("leadership")?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-muted group-hover:text-primary-light transition-colors">
          Scroll to explore
        </span>
        <div className="w-5 h-9 rounded-full border border-border flex justify-center p-1 group-hover:border-primary-light transition-colors bg-bg-surface/50 backdrop-blur-sm">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-primary-light"
          />
        </div>
      </motion.div>
    </div>
  );
}
