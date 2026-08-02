"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Cloud, Palette, Calendar, Video, Megaphone, CheckCircle2, Github, Linkedin, Mail, Sparkles } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PixelHeading } from "@/components/ui/pixel-heading-character";
import { NETWORK_NODES, NetworkNode } from "./data";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function TeamNetworkConstellation() {
  const [selectedNode, setSelectedNode] = useState<NetworkNode>(NETWORK_NODES[0]);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const sectionRef = useRef<HTMLDivElement>(null);
  const pinnedBoxRef = useRef<HTMLDivElement>(null);
  const manualClickRef = useRef<boolean>(false);

  // GSAP ScrollTrigger pinning and step progress across viewports
  useGSAP(() => {
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      pin: pinnedBoxRef.current,
      start: "top 80px",
      end: "+=750",
      scrub: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        if (manualClickRef.current) return;

        const count = NETWORK_NODES.length;
        const index = Math.min(Math.floor(self.progress * count), count - 1);
        setActiveStepIndex(index);
        setSelectedNode(NETWORK_NODES[index]);
      },
    });

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(refreshTimer);
      trigger.kill();
    };
  }, { scope: sectionRef });

  const handleNodeClick = (node: NetworkNode, idx: number) => {
    manualClickRef.current = true;
    setActiveStepIndex(idx);
    setSelectedNode(node);

    setTimeout(() => {
      manualClickRef.current = false;
    }, 1500);
  };

  // Helper to render icon by name
  const renderIcon = (name: string) => {
    switch (name) {
      case "Code2": return <Code2 className="w-6 h-6 sm:w-7 sm:h-7" />;
      case "Cloud": return <Cloud className="w-6 h-6 sm:w-7 sm:h-7" />;
      case "Palette": return <Palette className="w-6 h-6 sm:w-7 sm:h-7" />;
      case "Calendar": return <Calendar className="w-6 h-6 sm:w-7 sm:h-7" />;
      case "Video": return <Video className="w-6 h-6 sm:w-7 sm:h-7" />;
      case "Megaphone": return <Megaphone className="w-6 h-6 sm:w-7 sm:h-7" />;
      default: return <Sparkles className="w-6 h-6 sm:w-7 sm:h-7" />;
    }
  };

  return (
    <div ref={sectionRef} id="network-section" className="relative w-full py-4 max-w-content mx-auto">
      {/* GSAP Pinned Container */}
      <div
        ref={pinnedBoxRef}
        className="w-full md:max-h-[calc(100vh-80px)] flex flex-col justify-center py-2 px-4 sm:px-6 lg:px-8 max-w-content mx-auto md:overflow-hidden"
      >
        {/* Section Header matching site theme */}
        <div className="relative text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-96 h-20 bg-[#7C3AED]/25 blur-3xl rounded-full pointer-events-none z-0" />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            className="relative z-10 text-[11px] uppercase tracking-[0.16em] text-muted font-mono mb-2 sm:mb-3"
          >
            Connected Builder Ecosystem
          </motion.p>
          <h2 className="relative z-10 mt-2 font-display text-[28px] sm:text-[36px] font-semibold tracking-tight text-text-primary">
            Explore the{" "}
            <PixelHeading mode="uniform" className="text-gradient">
              Builder Network.
            </PixelHeading>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Constellation Canvas Container - Hidden on Mobile, Shown on Desktop */}
          <div className="hidden md:flex lg:col-span-7 justify-center items-center">
            <div className="relative aspect-square w-full max-w-[480px] sm:max-w-[520px] lg:max-w-[540px] rounded-2xl bg-bg-card border border-border backdrop-blur-2xl p-4 overflow-hidden flex items-center justify-center shadow-xl">
              {/* Grid Pattern Overlay */}
              <div className="absolute inset-0 bg-grid pointer-events-none" />

              {/* SVG Connection Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                {NETWORK_NODES.map((node) => {
                  const isHovered = hoveredNodeId === node.id;
                  const isSelected = selectedNode?.id === node.id;
                  const active = isSelected || isHovered;

                  return (
                    <g key={`line-${node.id}`}>
                      <line
                        x1="50%"
                        y1="50%"
                        x2={`${node.position.x}%`}
                        y2={`${node.position.y}%`}
                        stroke={active ? node.color : "#334155"}
                        strokeWidth={active ? "3" : "1.5"}
                        strokeDasharray={active ? "6 4" : "4 4"}
                        opacity={active ? 0.95 : 0.3}
                        className="transition-all duration-300"
                      />
                      {active && (
                        <circle r="3.5" fill={node.color}>
                          <animateMotion
                            path={`M 50% 50% L ${node.position.x}% ${node.position.y}%`}
                            dur="1.8s"
                            repeatCount="indefinite"
                          />
                        </circle>
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Central Core SBG Emblem Node */}
              <motion.div
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-20 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-bg-surface border-4 border-primary/80 p-2 shadow-[0_0_40px_-5px_rgba(124,58,237,0.6)] flex flex-col items-center justify-center cursor-pointer group"
              >
                <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-black/40">
                  <Image
                    src="/logos/SBG_logo.png"
                    alt="AWS SBG Logo"
                    width={68}
                    height={68}
                    className="object-contain p-1"
                  />
                </div>
                <div className="absolute -bottom-5 px-3 py-0.5 rounded-full bg-bg border border-primary/60 text-[9px] font-mono font-extrabold text-primary-light uppercase tracking-widest shadow-lg">
                  SBG CORE
                </div>
              </motion.div>

              {/* Surrounding Radial Department Nodes */}
              {NETWORK_NODES.map((node, idx) => {
                const isSelected = selectedNode?.id === node.id;
                const isHovered = hoveredNodeId === node.id;
                const active = isSelected || isHovered;

                return (
                  <div
                    key={node.id}
                    style={{ left: `${node.position.x}%`, top: `${node.position.y}%` }}
                    className="absolute z-30 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-auto cursor-pointer"
                    onMouseEnter={() => setHoveredNodeId(node.id)}
                    onMouseLeave={() => setHoveredNodeId(null)}
                    onClick={() => handleNodeClick(node, idx)}
                  >
                    <motion.div
                      animate={{ scale: active ? 1.1 : 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="flex flex-col items-center group"
                    >
                      {/* Icon Box */}
                      <div
                        className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center border transition-all duration-300 ${
                          active
                            ? "bg-bg-surface shadow-xl border-primary scale-105"
                            : "bg-bg/95 border-border text-muted hover:text-text-primary hover:border-primary/40"
                        }`}
                        style={{
                          borderColor: active ? node.color : undefined,
                          boxShadow: active ? `0 0 25px ${node.color}70` : undefined,
                          color: active ? "#FFFFFF" : undefined,
                        }}
                      >
                        {renderIcon(node.iconName)}
                      </div>

                      {/* Label Pill */}
                      <div
                        className={`mt-1.5 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono font-semibold tracking-wider transition-all duration-300 border whitespace-nowrap ${
                          isSelected
                            ? "bg-primary text-white border-primary-light shadow-md shadow-primary/40 font-bold"
                            : active
                            ? "bg-bg-surface text-primary-light border-primary/40"
                            : "bg-bg/90 text-text-secondary border-border"
                        }`}
                      >
                        {node.label}
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selected Department Details Drawer */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              {selectedNode && (
                <motion.div
                  key={selectedNode.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="relative rounded-2xl bg-bg-card border border-border p-5 sm:p-6 backdrop-blur-2xl shadow-xl space-y-4"
                >
                  {/* Header Badge */}
                  <div className="flex items-center justify-between border-b border-border/80 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-white shadow-md"
                        style={{ backgroundColor: selectedNode.color }}
                      >
                        {renderIcon(selectedNode.iconName)}
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-semibold text-text-primary font-display">
                          {selectedNode.role}
                        </h3>
                        <p className="text-[11px] text-muted font-mono">
                          Domain // {selectedNode.department}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 2-Column Layout: Left (Big Photo & Name) | Right (Responsibilities & Socials) */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-5 items-center">
                    {/* Left Column: Big Photo & Name (No bio paragraph) */}
                    <div className="sm:col-span-5 flex flex-col items-center text-center space-y-2 bg-bg-surface/70 p-3 sm:p-3.5 rounded-2xl border border-border">
                      <div className="relative w-28 h-32 sm:w-32 sm:h-36 rounded-2xl overflow-hidden border-2 border-primary/40 shadow-lg flex-shrink-0">
                        <Image
                          src={selectedNode.leadAvatar}
                          alt={selectedNode.leadName}
                          fill
                          className="object-cover object-center"
                        />
                      </div>
                      <div className="pt-0.5">
                        <h4 className="text-base sm:text-lg font-bold text-text-primary font-display leading-tight">
                          {selectedNode.leadName}
                        </h4>
                      </div>
                    </div>

                    {/* Right Column: Responsibilities & Social Links */}
                    <div className="sm:col-span-7 space-y-3.5">
                      <div className="space-y-1.5">
                        <h4 className="text-[11px] font-mono uppercase tracking-widest text-primary-light font-semibold flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary-light" />
                          Responsible for
                        </h4>
                        <ul className="space-y-1.5">
                          {selectedNode.responsibilities.map((resp, i) => (
                            <li
                              key={i}
                              className="flex items-center gap-2 text-[11px] sm:text-xs text-text-secondary bg-bg-surface/60 px-2.5 py-1.5 rounded-xl border border-border/80"
                            >
                              <span className="text-primary-light font-bold text-xs">✔</span>
                              <span className="truncate">{resp.replace("✔ ", "")}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Social Action Buttons */}
                      <div className="flex items-center gap-2 pt-2 border-t border-border/80">
                        {selectedNode.socials.github && (
                          <a
                            href={selectedNode.socials.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-2 rounded-xl bg-bg-surface border border-border text-muted hover:text-text-primary hover:border-primary/40 flex items-center justify-center transition-all duration-200"
                            aria-label="GitHub"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                        {selectedNode.socials.linkedin && (
                          <a
                            href={selectedNode.socials.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-2 rounded-xl bg-bg-surface border border-border text-muted hover:text-[#0A66C2] hover:border-[#0A66C2]/40 flex items-center justify-center transition-all duration-200"
                            aria-label="LinkedIn"
                          >
                            <Linkedin className="w-4 h-4" />
                          </a>
                        )}
                        {selectedNode.socials.email && (
                          <a
                            href={`mailto:${selectedNode.socials.email}`}
                            className="flex-1 py-2 rounded-xl bg-bg-surface border border-border text-muted hover:text-accent hover:border-accent/40 flex items-center justify-center transition-all duration-200"
                            aria-label="Email"
                          >
                            <Mail className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
