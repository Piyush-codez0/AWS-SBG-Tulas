"use client";

import React, { useEffect } from "react";
import LightRays from "@/components/ui/light-rays";
import CursorGrid from "@/components/ui/cursor-grid";
import { ThemeStyles } from "./ThemeStyles";

export interface SuccessScreenProps {
  result: {
    id?: string;
    submittedAt?: string;
  };
}

export function SuccessScreen({ result }: SuccessScreenProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  const shortId = result.id ? result.id.slice(0, 8) : "unknown";

  return (
    <div className="register-page-theme relative min-h-screen bg-grid bg-noise bg-bg w-full overflow-x-hidden text-[#efecf5] font-sans flex items-center">
      {/* Ambient Purple Glows */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px] opacity-60" />
      <div className="pointer-events-none absolute -left-[20%] top-[30%] h-[500px] w-[500px] rounded-full bg-primary/15 blur-[120px] opacity-50" />
      <div className="pointer-events-none absolute -right-[20%] bottom-[10%] h-[600px] w-[600px] rounded-full bg-primary/10 blur-[120px] opacity-50" />

      <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none" }}>
        <CursorGrid
          cellSize={64}
          color="#A855F7"
          radius={130}
          falloff="smooth"
          holdTime={350}
          fadeDuration={700}
          lineWidth={0.9}
          maxOpacity={0.35}
          fillOpacity={0.02}
          gridOpacity={0.02}
          cellRadius={4}
          clickPulse={true}
          pulseSpeed={500}
        />
      </div>

      <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden", opacity: 0.35, pointerEvents: "none" }}>
        <LightRays
          raysOrigin="top-center"
          raysColor="#A855F7"
          raysSpeed={0.8}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={false}
          mouseInfluence={0}
          noiseAmount={0.1}
          distortion={0.05}
          saturation={1.4}
        />
      </div>
      <ThemeStyles />
      <div className="w-full max-w-[820px] mx-auto px-6 sm:px-8 md:px-12 pt-[100px] md:pt-[140px] pb-[60px] md:pb-[100px] relative z-10 box-border">
        <div className="eyebrow">Deployment Successful</div>
        <h1 className="success-title">
          Application <em>received.</em>
        </h1>
        <div className="receipt mono">
          <div className="receipt-row">
            <span>status</span>
            <span className="ok">201 deployed</span>
          </div>
          <div className="receipt-row">
            <span>receipt_id</span>
            <span>{shortId}</span>
          </div>
          <div className="receipt-row">
            <span>submitted_at</span>
            <span>{result.submittedAt ? new Date(result.submittedAt).toLocaleString() : new Date().toLocaleString()}</span>
          </div>
        </div>
        <p className="success-sub">
          We'll review applications after the deadline and reach out by email to shortlisted candidates for an interview.
        </p>
        <a href="/" className="btn-primary">
          Back to homepage →
        </a>
      </div>
    </div>
  );
}
