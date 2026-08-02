"use client";

import * as React from "react";
import LightRays from "@/components/ui/light-rays";

import { TeamHero } from "./TeamHero";
import { TeamLeadership } from "./TeamLeadership";
import { TeamNetworkConstellation } from "./TeamNetworkConstellation";
import { TeamDepartments } from "./TeamDepartments";
import { TeamCTA } from "./TeamCTA";

export function Team() {
  return (
    <section className="bg-grid bg-noise relative overflow-hidden bg-bg min-h-screen text-text-primary">

      {/* Dynamic WebGL Light Rays Layer */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden", opacity: 0.2 }}>
        <LightRays
          raysOrigin="top-center"
          raysColor="#A855F7"
          raysSpeed={0.6}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={false}
          mouseInfluence={0}
          noiseAmount={0.1}
          distortion={0.05}
          saturation={1.4}
        />
      </div>

      {/* Section 1: Hero Section */}
      <TeamHero />

      {/* Section 2: Leadership (2-Column Layout: Faculty Coordinator & SBG Leader) */}
      <TeamLeadership />

      {/* Section 3 (⭐ WOW Feature): Interactive Team Network Constellation */}
      <TeamNetworkConstellation />

      {/* Section 4: Our Departments & Collapsible Member Grids */}
      <TeamDepartments />

      {/* Section 5: Become One of Us CTA */}
      <TeamCTA />
    </section>
  );
}
