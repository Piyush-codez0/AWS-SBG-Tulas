import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { ArrowRight } from "@/components/animate-ui/icons/arrow-right";
import { Users } from "@/components/animate-ui/icons/users";
import { Sparkles } from "@/components/animate-ui/icons/sparkles";

export const metadata: Metadata = {
  title: "Join Community | AWS Student Builder Group",
  description: "Connect with 50+ student builders at Tula's University, attend workshops, hackathons, and build real-world cloud projects.",
};

const COMMUNITY_CHANNELS = [
  {
    name: "Meetup Group",
    desc: "Join our official Meetup page to RSVP for upcoming in-person workshops, cloud bootcamps, and hackathons.",
    link: "https://www.meetup.com/aws-sbg-at-tulas-university/",
    icon: "📅",
    cta: "Join on Meetup",
  },
  {
    name: "WhatsApp Community",
    desc: "Get instant announcements, tech discussions, AWS credit updates, and peer networking in our WhatsApp group.",
    link: "https://whatsapp.com/channel/0029VbDJ4jD6WaKnCQZRWF2Z",
    icon: "💬",
    cta: "Join WhatsApp Channel",
  },
  {
    name: "Instagram",
    desc: "Follow us for event highlights, builder spotlights, project showcases, and live updates.",
    link: "https://www.instagram.com/aws.sbgtulas",
    icon: "📸",
    cta: "Follow on Instagram",
  },
  {
    name: "Email Newsletter",
    desc: "Receive monthly digests on upcoming cloud challenges, learning resources, and career opportunities.",
    link: "mailto:awssbg@tulas.edu.in",
    icon: "✉️",
    cta: "Contact Team",
  },
];

export default function CommunityPage() {
  return (
    <main className="relative min-h-screen bg-black text-white pt-28 pb-20 px-4 sm:px-6 overflow-hidden">
      {/* Background Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[700px] -translate-x-1/2 rounded-full bg-primary/10 blur-[150px]"
      />
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-content mx-auto flex flex-col items-center">
        {/* Header Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-mono uppercase tracking-widest text-primary-light mb-6">
          <Users size={14} className="text-accent" />
          <span>AWS SBG Builder Community</span>
        </div>

        {/* Page Title */}
        <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold text-center tracking-tight max-w-3xl leading-tight">
          Connect with <span className="text-gradient">Student Builders</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-base sm:text-lg text-text-secondary text-center max-w-2xl leading-relaxed">
          Whether registrations are currently open or closed, our community is always active. Join our channels to participate in open sessions, collaborate on projects, and level up your cloud skills.
        </p>

        {/* Community Channel Cards Grid */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-2 w-full max-w-4xl">
          {COMMUNITY_CHANNELS.map((channel) => (
            <div
              key={channel.name}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-xl transition-all duration-300 hover:border-primary/50 hover:bg-white/[0.05] hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="text-3xl mb-4">{channel.icon}</div>
                <h3 className="font-display text-xl font-bold text-white group-hover:text-primary-light transition-colors">
                  {channel.name}
                </h3>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                  {channel.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5">
                <a
                  href={channel.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary-light hover:text-white transition-colors"
                >
                  <span>{channel.cta}</span>
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Back to Home CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-text-primary hover:bg-white/10 transition-colors"
          >
            ← Back to Main Website
          </Link>
        </div>
      </div>
    </main>
  );
}
