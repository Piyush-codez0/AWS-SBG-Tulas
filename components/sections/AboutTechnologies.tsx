"use client";

import * as React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import LogoLoop from "@/components/ui/LogoLoop";
import { PixelHeading } from "@/components/ui/pixel-heading-character";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const TECHNOLOGIES = [
  { src: "/assets/AWS services icons/Compute/EC2.png", name: "EC2", description: "Compute" },
  { src: "/assets/AWS services icons/Storage/Simple-Storage-Service.png", name: "S3", description: "Storage" },
  { src: "/assets/AWS services icons/Compute/Lambda.png", name: "Lambda", description: "Serverless" },
  { src: "/assets/AWS services icons/Networking-Content-Delivery/CloudFront.png", name: "CloudFront", description: "CDN" },
  { src: "/assets/AWS services icons/Security-Identity-Compliance/Identity-and-Access-Management.png", name: "IAM", description: "Security" },
  { src: "/assets/AWS services icons/Database/DynamoDB.png", name: "DynamoDB", description: "NoSQL" },
  { src: "/assets/AWS services icons/Containers/Elastic-Container-Service.png", name: "ECS", description: "Containers" },
  { src: "/assets/AWS services icons/Containers/Elastic-Kubernetes-Service.png", name: "EKS", description: "Kubernetes" },
  { src: "/assets/AWS services icons/Front-End-Web-Mobile/Amplify.png", name: "Amplify", description: "Full-Stack" },
  { src: "/assets/AWS services icons/Machine-Learning/SageMaker.png", name: "SageMaker", description: "AI/ML" },
  { src: "/assets/AWS services icons/Management-Governance/CloudWatch.png", name: "CloudWatch", description: "Monitoring" },
  { src: "/assets/AWS services icons/App-Integration/API-Gateway.png", name: "API Gateway", description: "APIs" },
];

const row1 = TECHNOLOGIES.slice(0, 6);
const row2 = TECHNOLOGIES.slice(6);

export function AboutTechnologies() {
  const containerRef = React.useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".tech-header-el", {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".tech-header",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });

    gsap.from(".tech-loop-container", {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".tech-loop-container",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });

    const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => clearTimeout(refreshTimer);
  }, { scope: containerRef });

  const renderTechCard = (item: any) => (
    <div
      className="flex flex-col items-center justify-center gap-2.5 rounded-xl border border-border bg-bg p-4 sm:p-5 cursor-default min-w-[140px] w-[140px] h-[120px]"
    >
      <div className="relative w-8 h-8 sm:w-10 sm:h-10">
        <Image src={item.src} alt={item.name} fill className="object-contain" />
      </div>
      <div className="flex flex-col items-center gap-1">
        <span className="font-display text-[13px] sm:text-[14px] font-semibold text-text-primary text-center">
          {item.name}
        </span>
        <span className="text-[11px] text-muted text-center">
          {item.description}
        </span>
      </div>
    </div>
  );

  return (
    <section ref={containerRef} className="bg-noise relative overflow-hidden bg-bg">
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 bottom-1/4 h-[380px] w-[380px] -translate-x-1/3 rounded-full bg-primary/8 blur-[120px]"
      />

      <div className="relative mx-auto max-w-content px-4 sm:px-6 py-20 md:py-28">
        <div className="tech-header text-center max-w-2xl mx-auto">
          <p className="tech-header-el text-[11px] uppercase tracking-[0.16em] text-muted">
            Tech Stack
          </p>
          <h2 className="tech-header-el mt-4 font-display text-[28px] sm:text-[32px] md:text-[40px] font-semibold leading-[1.1] tracking-tight text-text-primary">
            Technologies we{" "}
            <PixelHeading mode="uniform" className="text-gradient">explore.</PixelHeading>
          </h2>
        </div>

        <div className="tech-loop-container mt-14 flex flex-col gap-5">
          {/* Row 1 - Left */}
          <LogoLoop
            logos={row1 as any}
            speed={50}
            direction="left"
            logoHeight={120}
            gap={16}
            hoverSpeed={10}
            fadeOut
            fadeOutColor="#09090b"
            renderItem={renderTechCard}
          />

          {/* Row 2 - Right */}
          <LogoLoop
            logos={row2 as any}
            speed={50}
            direction="right"
            logoHeight={120}
            gap={16}
            hoverSpeed={10}
            fadeOut
            fadeOutColor="#09090b"
            renderItem={renderTechCard}
          />
        </div>
      </div>
    </section>
  );
}
