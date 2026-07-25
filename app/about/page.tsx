import type { Metadata } from "next";
import { About } from "@/components/sections/About";
import { AboutComparison } from "@/components/sections/AboutComparison";
import { AboutTimeline } from "@/components/sections/AboutTimeline";
import { AboutPillars } from "@/components/sections/AboutPillars";
import { AboutEcosystem } from "@/components/sections/AboutEcosystem";
import { AboutTechnologies } from "@/components/sections/AboutTechnologies";
import { AboutStats } from "@/components/sections/AboutStats";
import { AboutCTA } from "@/components/sections/AboutCTA";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn what the AWS Student Builders Group at Tula's University is about — cloud-first learning, peer-driven community, hackathons, AWS certifications, and building real-world projects on AWS.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <About />
      <AboutComparison />
      <AboutTimeline />
      <AboutPillars />
      <AboutEcosystem />
      <AboutTechnologies />
      {/* <AboutStats /> - Hidden for now */}
      <AboutCTA />
    </>
  );
}
