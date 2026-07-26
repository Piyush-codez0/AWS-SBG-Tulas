import React from "react";
import type { ApplicationStageInfo } from "@/types/application";

export interface StepperProps {
  stage: number;
  stages: ApplicationStageInfo[];
}

export function Stepper({ stage, stages }: StepperProps) {
  return (
    <div className="stepper mono">
      {stages.map((s, i) => (
        <React.Fragment key={s.id}>
          <div className={`step ${stage === s.id ? "step-active" : ""} ${stage > s.id ? "step-done" : ""}`}>
            <span className="step-num">{stage > s.id ? "✓" : String(s.id).padStart(2, "0")}</span>
            <span className="step-label">{s.label}</span>
          </div>
          {i < stages.length - 1 && <div className={`step-line ${stage > s.id ? "step-line-done" : ""}`} />}
        </React.Fragment>
      ))}
    </div>
  );
}
