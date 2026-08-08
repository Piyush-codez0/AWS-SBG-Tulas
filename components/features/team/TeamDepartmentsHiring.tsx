"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Cloud,
  Palette,
  Calendar,
  Video,
  Megaphone,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Users,
  Layers,
  HeartHandshake,
} from "lucide-react";
import { PixelHeading } from "@/components/ui/pixel-heading-character";

export interface DepartmentCardInfo {
  id: string;
  name: string;
  tagline: string;
  icon: React.ElementType;
  color: string;
  borderColor: string;
  glowColor: string;
  accentBg: string;
  description: string;
  whatYouWillDo: string[];
  idealInterests: string[];
  status: string;
}

const DEPARTMENTS: DepartmentCardInfo[] = [
  {
    id: "tech-dept",
    name: "Technology Department",
    tagline: "Websites, bots & software development infrastructure.",
    icon: Code2,
    color: "text-purple-400",
    borderColor: "border-purple-500/30 hover:border-purple-500/60",
    glowColor: "rgba(168, 85, 247, 0.35)",
    accentBg: "from-purple-500/15 via-indigo-500/5 to-transparent",
    description: "Build official web platforms, open-source repos, Discord/Telegram bots, and student developer tools for the community.",
    whatYouWillDo: [
      "Develop responsive Next.js & React web applications.",
      "Build developer tools and automation scripts.",
      "Collaborate on open-source student GitHub projects.",
    ],
    idealInterests: ["Web Development", "Python/JS", "Git & GitHub", "Problem Solving"],
    status: "Applications Open",
  },
  {
    id: "cloud-dept",
    name: "Cloud Department",
    tagline: "AWS labs, serverless architectures & cloud roadmaps.",
    icon: Cloud,
    color: "text-amber-400",
    borderColor: "border-amber-500/30 hover:border-amber-500/60",
    glowColor: "rgba(245, 158, 11, 0.35)",
    accentBg: "from-amber-500/15 via-orange-500/5 to-transparent",
    description: "Explore hands-on AWS Jam labs, serverless infrastructure, IAM cloud security, and guide peers toward AWS certifications.",
    whatYouWillDo: [
      "Set up cloud lab environments using AWS EC2, S3, & Lambda.",
      "Learn & guide students on AWS certification roadmaps.",
      "Experiment with containerization and cloud security.",
    ],
    idealInterests: ["AWS Cloud", "Linux / CLI", "Serverless", "DevOps Basics"],
    status: "Applications Open",
  },
  {
    id: "design-dept",
    name: "Design Department",
    tagline: "UI/UX, brand identity & social media graphics.",
    icon: Palette,
    color: "text-pink-400",
    borderColor: "border-pink-500/30 hover:border-pink-500/60",
    glowColor: "rgba(236, 72, 153, 0.35)",
    accentBg: "from-pink-500/15 via-rose-500/5 to-transparent",
    description: "Craft UI design systems in Figma, hackathon branding, social media assets, event swag, and 3D visual graphics.",
    whatYouWillDo: [
      "Create high-fidelity Figma UI/UX layouts for web pages.",
      "Design posters, social media banners, and stickers.",
      "Craft hackathon visual themes and merchandise.",
    ],
    idealInterests: ["Figma / UI Design", "Canva / Photoshop", "Creativity", "3D Art"],
    status: "Applications Open",
  },
  {
    id: "events-dept",
    name: "Events & Operations Department",
    tagline: "48-hr hackathons, AWS Jams & tech meetups.",
    icon: Calendar,
    color: "text-blue-400",
    borderColor: "border-blue-500/30 hover:border-blue-500/60",
    glowColor: "rgba(59, 130, 246, 0.35)",
    accentBg: "from-blue-500/15 via-cyan-500/5 to-transparent",
    description: "Plan, organize, and manage 48-hour hackathons, speaker keynotes, venue logistics, and student volunteer teams.",
    whatYouWillDo: [
      "Coordinate event logistics, venues, and schedules.",
      "Manage student check-in desks, swags, and leaderboards.",
      "Liaise with AWS guest speakers, judges, and mentors.",
    ],
    idealInterests: ["Event Management", "Leadership", "Logistics", "Public Speaking"],
    status: "Applications Open",
  },
  {
    id: "media-dept",
    name: "Media & Content Department",
    tagline: "Event coverage, photography, aftermovies & blogs.",
    icon: Video,
    color: "text-emerald-400",
    borderColor: "border-emerald-500/30 hover:border-emerald-500/60",
    glowColor: "rgba(16, 185, 129, 0.35)",
    accentBg: "from-emerald-500/15 via-teal-500/5 to-transparent",
    description: "Capture event photography, produce high-energy video aftermovies, manage YouTube livestreams, reels, and blogs.",
    whatYouWillDo: [
      "Shoot & edit event aftermovies, teasers, and Instagram reels.",
      "Manage YouTube livestreams and photo galleries.",
      "Write engaging technical articles and event recaps.",
    ],
    idealInterests: ["Video Editing", "Photography", "Copywriting", "Social Media"],
    status: "Applications Open",
  },
  {
    id: "outreach-dept",
    name: "Community Outreach Department",
    tagline: "Sponsorships, inter-college partnerships & PR.",
    icon: Megaphone,
    color: "text-violet-400",
    borderColor: "border-violet-500/30 hover:border-violet-500/60",
    glowColor: "rgba(139, 92, 246, 0.35)",
    accentBg: "from-violet-500/15 via-purple-500/5 to-transparent",
    description: "Drive community growth through corporate event sponsorships, inter-college club networks, AWS User Group links, and PR.",
    whatYouWillDo: [
      "Pitch event sponsorship proposals to tech companies.",
      "Build relationships with student clubs across campuses.",
      "Promote community events across hostels & departments.",
    ],
    idealInterests: ["Public Relations", "Networking", "Sponsorship Pitching", "Publicity"],
    status: "Applications Open",
  },
];

export function TeamDepartmentsHiring() {
  const [activeDeptId, setActiveDeptId] = useState<string>("all");

  const filteredDepts = activeDeptId === "all" 
    ? DEPARTMENTS 
    : DEPARTMENTS.filter((d) => d.id === activeDeptId);

  return (
    <section id="departments" className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-content mx-auto">
      {/* Background Ambient Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[600px] rounded-full bg-primary/10 blur-[130px] z-0" />

      {/* Header */}
      <div className="relative z-10 max-w-3xl mx-auto text-center mb-12 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary-light text-xs font-mono">
          <Layers className="w-3.5 h-3.5 text-accent" />
          <span>Choose Your Department of Interest</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-text-primary tracking-tight">
          Find Your Department.{" "}
          <PixelHeading mode="uniform" className="text-gradient block sm:inline">
            Apply to Join.
          </PixelHeading>
        </h2>

        <p className="text-text-secondary text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Select the department that aligns best with your passion. You don't need to apply for a specific title—simply choose your department and build with us!
        </p>
      </div>

      {/* Department Filter Tabs */}
      <div className="relative z-10 flex items-center justify-center flex-wrap gap-2.5 sm:gap-3 mb-12">
        <button
          onClick={() => setActiveDeptId("all")}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-mono font-medium transition-all duration-200 flex items-center gap-2 border ${
            activeDeptId === "all"
              ? "bg-primary text-white border-primary shadow-[0_0_15px_rgba(124,58,237,0.4)] scale-[1.03]"
              : "bg-bg-card text-text-secondary border-border hover:border-primary/40 hover:text-white"
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>All Departments</span>
        </button>

        {DEPARTMENTS.map((dept) => {
          const IconComp = dept.icon;
          const isSelected = activeDeptId === dept.id;

          return (
            <button
              key={dept.id}
              onClick={() => setActiveDeptId(dept.id)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-mono font-medium transition-all duration-200 flex items-center gap-2 border ${
                isSelected
                  ? `bg-bg-surface text-white ${dept.borderColor} shadow-lg scale-[1.03]`
                  : "bg-bg-card text-text-secondary border-border hover:border-primary/40 hover:text-white"
              }`}
            >
              <IconComp className={`w-4 h-4 ${dept.color}`} />
              <span>{dept.name.replace(" Department", "")}</span>
            </button>
          );
        })}
      </div>

      {/* Department Cards Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredDepts.map((dept, idx) => {
            const IconComponent = dept.icon;

            return (
              <motion.div
                key={dept.id}
                layout
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                whileHover={{ y: -6 }}
                className={`relative rounded-2xl bg-bg-card/90 border ${dept.borderColor} p-6 backdrop-blur-xl flex flex-col justify-between overflow-hidden shadow-xl group transition-all duration-300`}
              >
                {/* Top Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary-light/50 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />

                <div className="space-y-5">
                  {/* Department Icon & Badge */}
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-2xl bg-bg-surface border border-border shadow-md flex items-center justify-center">
                      <IconComponent className={`w-6 h-6 ${dept.color}`} />
                    </div>

                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono font-medium flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      {dept.status}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <h3 className="text-xl font-bold text-text-primary font-display tracking-tight group-hover:text-primary-light transition-colors">
                      {dept.name}
                    </h3>
                    <p className="mt-1 text-xs text-text-secondary leading-relaxed font-mono">
                      {dept.tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-sans">
                    {dept.description}
                  </p>

                  {/* What You'll Learn & Do */}
                  <div className="space-y-1.5 pt-2 border-t border-border/60">
                    <p className="text-[11px] font-mono uppercase tracking-wider text-muted font-semibold">
                      What You'll Do & Learn:
                    </p>
                    <ul className="space-y-1">
                      {dept.whatYouWillDo.map((item, itemIdx) => (
                        <li key={itemIdx} className="text-xs text-text-secondary flex items-start gap-1.5 leading-snug">
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary-light shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Ideal Interests / Recommended Skills */}
                  <div className="pt-2">
                    <p className="text-[11px] font-mono uppercase tracking-wider text-muted font-semibold mb-1.5">
                      Ideal For Students Interested In:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {dept.idealInterests.map((interest, iIdx) => (
                        <span
                          key={iIdx}
                          className="px-2.5 py-1 rounded-md bg-bg-surface border border-border text-[10px] font-mono text-text-secondary"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action Button */}
                <div className="pt-6 mt-6 border-t border-border/80 text-center">
                  <Link
                    href={`/register?department=${encodeURIComponent(dept.name)}`}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold text-xs sm:text-sm tracking-wide shadow-[0_0_20px_-5px_rgba(124,58,237,0.5)] hover:scale-[1.02] transition-all"
                  >
                    <span>Apply for {dept.name.replace(" Department", "")}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Bottom General Callout */}
      <div className="mt-14 max-w-2xl mx-auto text-center rounded-2xl bg-bg-card border border-border p-8 backdrop-blur-xl shadow-xl space-y-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 text-primary-light mx-auto flex items-center justify-center">
          <HeartHandshake className="w-5 h-5 text-accent" />
        </div>
        <h3 className="text-xl font-bold font-display text-text-primary">
          Unsure which department fits you best?
        </h3>
        <p className="text-xs sm:text-sm text-text-secondary max-w-md mx-auto leading-relaxed">
          No worries! Select your top preference in the registration form and our team will help match your skills during onboarding.
        </p>
        <div className="pt-2">
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-bg-surface hover:bg-white/10 border border-border text-text-primary font-semibold text-xs font-mono transition-all"
          >
            <span>Fill General Application Form</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
