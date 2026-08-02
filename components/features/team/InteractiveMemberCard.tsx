"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Globe, Sparkles, Terminal } from "lucide-react";
import { TeamMember } from "./data";

export interface InteractiveMemberCardProps {
  member: TeamMember;
}

export function InteractiveMemberCard({ member }: InteractiveMemberCardProps) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    setRotateX(-y * 0.05);
    setRotateY(x * 0.05);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  return (
    <div className="perspective-1000 w-full max-w-[340px]">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: rotateX,
          rotateY: rotateY,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative rounded-3xl bg-slate-950/90 border border-slate-800 p-6 backdrop-blur-xl overflow-hidden cursor-pointer transition-colors duration-300 group hover:border-purple-500 shadow-xl hover:shadow-2xl hover:shadow-purple-950/50"
      >
        {/* Glow Aura on Hover */}
        <div
          className={`absolute inset-0 rounded-3xl bg-gradient-to-tr from-purple-600/20 via-fuchsia-500/10 to-amber-500/10 transition-opacity duration-500 pointer-events-none ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Ambient Top Light Beam */}
        <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-purple-400 to-transparent" />

        {/* Initial View: Avatar, Name, Role */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="relative group/avatar">
            {/* Glowing Ring */}
            <div
              className={`absolute -inset-2 rounded-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-amber-500 blur-md transition-opacity duration-300 ${
                isHovered ? "opacity-80 scale-105" : "opacity-0"
              }`}
            />
            <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-purple-500/40 bg-slate-900">
              <Image
                src={member.avatar || "/logos/SBG_logo.png"}
                alt={member.name}
                fill
                className="object-cover transition-transform duration-500 group-hover/avatar:scale-110"
              />
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white font-display group-hover:text-amber-400 transition-colors">
              {member.name}
            </h3>
            <p className="text-xs text-purple-300 font-mono mt-1 flex items-center justify-center gap-1">
              <Terminal className="w-3.5 h-3.5 text-purple-400" />
              {member.role}
            </p>
            {member.handle && (
              <span className="text-[11px] text-slate-500 font-mono">@{member.handle}</span>
            )}
          </div>
        </div>

        {/* Slide-Up Info Panel on Hover */}
        <motion.div
          animate={{
            y: isHovered ? 0 : 20,
            opacity: isHovered ? 1 : 0.8,
          }}
          transition={{ duration: 0.3 }}
          className="mt-6 pt-4 border-t border-slate-800/80 space-y-3"
        >
          <div className="space-y-1.5 text-left">
            <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              Specialization
            </span>
            <div className="flex flex-wrap gap-1.5">
              {member.specializations.map((spec) => (
                <span
                  key={spec}
                  className="px-2 py-0.5 rounded-md bg-purple-950/40 border border-purple-800/40 text-[10px] font-mono text-purple-300"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>

          {/* Social Buttons */}
          <div className="flex items-center justify-center gap-3 pt-3 border-t border-slate-900">
            {member.socials.github && (
              <a
                href={member.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-purple-500 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {member.socials.linkedin && (
              <a
                href={member.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-purple-400 hover:border-purple-500 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            {member.socials.portfolio && (
              <a
                href={member.socials.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-amber-400 hover:border-amber-500 transition-colors"
                aria-label="Portfolio"
              >
                <Globe className="w-4 h-4" />
              </a>
            )}
            {member.socials.email && (
              <a
                href={`mailto:${member.socials.email}`}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-amber-400 hover:border-amber-500 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
