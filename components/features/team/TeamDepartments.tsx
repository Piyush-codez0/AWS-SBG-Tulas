import React from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Palette, Cloud, Calendar, Video, Sparkles } from "lucide-react";
import { PixelHeading } from "@/components/ui/pixel-heading-character";
import TeamShowcase, { TeamMember as ShowcaseMember } from "@/components/ui/team-showcase";
import { ScrollInception, InceptionScreen } from "@/components/ui/scroll-loop-inception";
import { DEPARTMENTS, DepartmentInfo } from "./data";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function TeamDepartments() {
  const sectionRef = React.useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mobCards = gsap.utils.toArray<HTMLElement>(".dept-mob-card");
    mobCards.forEach((card) => {
      // 1. Animate outer card container
      gsap.fromTo(
        card,
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            end: "bottom 8%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      // 2. Stagger animate elements inside the card
      const innerElements = card.querySelectorAll(".dept-card-inner");
      if (innerElements.length > 0) {
        gsap.fromTo(
          innerElements,
          { y: 25, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "bottom 8%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }

      // 3. Stagger animate member photo avatars and names
      const memberItems = card.querySelectorAll(".dept-member-item");
      if (memberItems.length > 0) {
        gsap.fromTo(
          memberItems,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 82%",
              end: "bottom 8%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }
    });
  }, { scope: sectionRef });
  const renderDeptIcon = (icon: string) => {
    const iconClasses = "w-5 h-5";
    switch (icon) {
      case "Code2": return <Code2 className={`${iconClasses} text-purple-400`} />;
      case "Palette": return <Palette className={`${iconClasses} text-pink-400`} />;
      case "Cloud": return <Cloud className={`${iconClasses} text-amber-400`} />;
      case "Calendar": return <Calendar className={`${iconClasses} text-blue-400`} />;
      case "Video": return <Video className={`${iconClasses} text-emerald-400`} />;
      default: return <Sparkles className={`${iconClasses} text-primary-light`} />;
    }
  };

  const getDeptAccent = (id: string) => {
    switch (id) {
      case "dept-tech":
        return {
          glow: "from-purple-500/15 via-indigo-500/5 to-transparent",
          border: "border-purple-500/30",
          accentLine: "from-purple-500 via-indigo-500 to-transparent",
        };
      case "dept-design":
        return {
          glow: "from-pink-500/15 via-rose-500/5 to-transparent",
          border: "border-pink-500/30",
          accentLine: "from-pink-500 via-rose-500 to-transparent",
        };
      case "dept-cloud":
        return {
          glow: "from-amber-500/15 via-orange-500/5 to-transparent",
          border: "border-amber-500/30",
          accentLine: "from-amber-500 via-orange-500 to-transparent",
        };
      case "dept-events":
        return {
          glow: "from-blue-500/15 via-cyan-500/5 to-transparent",
          border: "border-blue-500/30",
          accentLine: "from-blue-500 via-cyan-500 to-transparent",
        };
      case "dept-media":
        return {
          glow: "from-emerald-500/15 via-teal-500/5 to-transparent",
          border: "border-emerald-500/30",
          accentLine: "from-emerald-500 via-teal-500 to-transparent",
        };
      default:
        return {
          glow: "from-primary/15 via-accent/5 to-transparent",
          border: "border-primary/30",
          accentLine: "from-primary via-accent to-transparent",
        };
    }
  };

  // Helper to map department members to TeamShowcase member structure
  const getShowcaseMembers = (members: DepartmentInfo["members"]): ShowcaseMember[] => {
    const defaultAvatars = [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80",
    ];

    return members.map((member, index) => {
      const isExternalAvatar = member.avatar.startsWith("http");
      const imageSrc = isExternalAvatar
        ? member.avatar
        : defaultAvatars[index % defaultAvatars.length];

      return {
        id: member.id,
        name: member.name,
        role: member.role,
        image: imageSrc,
        social: {
          github: member.socials.github || "#",
          linkedin: member.socials.linkedin || "#",
        },
      };
    });
  };

  // Build department screens array for the ScrollInception loop (including members)
  const departmentScreens: InceptionScreen[] = DEPARTMENTS.map((dept, index) => ({
    eyebrow: `wing 0${index + 1}`,
    heading: dept.name,
    sub: dept.description,
    members: getShowcaseMembers(dept.members),
  }));

  return (
    <section ref={sectionRef} className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-content mx-auto">
      {/* Desktop Grid Background Overlay */}
      <div className="hidden md:block absolute inset-0 bg-grid pointer-events-none z-0" />

      {/* Section Header matching site theme */}
      <div className="relative max-w-3xl mx-auto text-center mb-16">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-96 h-20 bg-[#7C3AED]/25 blur-3xl rounded-full pointer-events-none z-0" />
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          className="relative z-10 text-[11px] uppercase tracking-[0.16em] text-muted font-mono"
        >
          Builder Wings & Departments
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ delay: 0.1 }}
          className="relative z-10 mt-4 font-display text-[32px] sm:text-[42px] font-semibold tracking-tight text-text-primary"
        >
          Our{" "}
          <PixelHeading mode="uniform" className="text-gradient">
            Departments.
          </PixelHeading>
        </motion.h2>
        <p className="relative z-10 mt-4 text-[15px] text-text-secondary max-w-xl mx-auto leading-relaxed">
          Explore specialized wings driving engineering, cloud innovation, media, design, and community operations.
        </p>
      </div>

      {/* Unified Departments Scroll Inception Loop Feature - Hidden on Mobile, Desktop Only */}
      <div className="hidden md:block mb-0 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden border-y border-border/80 shadow-2xl">
        <ScrollInception
          screens={departmentScreens}
          url="aws-sbg.org/departments"
          buttonLabel="Join Our Builder Wings"
        />
      </div>

      {/* Separate Department Div Cards with Team Showcase - Mobile Only */}
      <div className="block md:hidden space-y-12">
        {DEPARTMENTS.map((dept: DepartmentInfo, idx: number) => {
          const accent = getDeptAccent(dept.id);

          return (
            <div
              key={dept.id}
              className={`dept-mob-card relative rounded-2xl bg-bg-card/90 border ${accent.border} backdrop-blur-2xl overflow-hidden shadow-xl`}
            >
              {/* Top Accent Gradient Line */}
              <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${accent.accentLine} z-20`} />

              {/* Background Ambient Glow */}
              <div className={`absolute inset-0 bg-gradient-to-r ${accent.glow} opacity-60 pointer-events-none`} />

              {/* Department Header Bar */}
              <div className="relative z-10 p-6 sm:p-7 flex items-center justify-between gap-5 border-b border-border/70">
                <div className="flex items-center gap-4 sm:gap-5">
                  {/* Icon Box */}
                  <div className="dept-card-inner p-3.5 rounded-2xl bg-bg-surface border border-border shadow-md flex-shrink-0">
                    {renderDeptIcon(dept.icon)}
                  </div>

                  <div className="dept-card-inner">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary font-display tracking-tight">
                      {dept.name}
                    </h3>
                    <p className="mt-0.5 text-xs sm:text-sm text-text-secondary font-mono">
                      {dept.tagline}
                    </p>
                  </div>
                </div>
              </div>

              {/* Department Body Content */}
              <div className="relative z-10 p-6 sm:p-8 space-y-6">
                {/* Team Showcase Frame */}
                <div className="dept-card-inner rounded-2xl bg-bg/60 border border-border/80 p-4 sm:p-6 shadow-inner">
                  <TeamShowcase members={getShowcaseMembers(dept.members)} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
