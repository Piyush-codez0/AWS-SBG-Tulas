"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LightRays from "@/components/ui/light-rays";
import CursorGrid from "@/components/ui/cursor-grid";
import { MultiStepLoader as Loader } from "@/components/ui/multi-step-loader";
import { Stepper } from "@/components/features/register/Stepper";
import { Stage, Row, Field } from "@/components/features/register/FormStage";
import { CustomSelect } from "@/components/features/register/CustomSelect";
import { SuccessScreen } from "@/components/features/register/SuccessScreen";
import { ThemeStyles } from "@/components/features/register/ThemeStyles";
import type { ApplicationFormData, ApplicationStageInfo } from "@/types/application";

const REGISTRATION_LOADING_STATES = [
  { text: "Validating applicant details & resume PDF..." },
  { text: "Uploading PDF resume to AWS S3 storage..." },
  { text: "Deployment complete. Generating receipt..." },
];

const COURSES = ["B.Tech", "B.Sc", "BCA", "MCA", "BBA", "MBA", "Other"];
const BRANCHES = ["CSE", "AI/ML", "Data Science", "Cyber Security", "Other"];
const YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

const AWS_SERVICES = [
  "EC2", "Lambda", "Elastic Beanstalk", "Lightsail", "Batch", "App Runner", "ECS", "EKS", "Fargate",
  "S3", "EBS", "EFS", "FSx", "Storage Gateway", "Backup",
  "RDS", "Aurora", "DynamoDB", "ElastiCache", "Redshift", "DocumentDB", "Neptune", "Keyspaces", "Timestream",
  "VPC", "Route 53", "CloudFront", "Global Accelerator", "API Gateway", "Direct Connect", "Transit Gateway", "Elastic Load Balancer (ELB)",
  "IAM", "Cognito", "KMS", "Secrets Manager", "Certificate Manager (ACM)", "WAF", "Shield", "GuardDuty", "Inspector", "Security Hub", "Macie",
  "CloudWatch", "CloudTrail", "Systems Manager", "AWS Config", "Trusted Advisor", "Organizations",
  "SQS", "SNS", "EventBridge", "MQ", "Step Functions",
  "CodeCommit", "CodeBuild", "CodeDeploy", "CodePipeline", "CloudFormation", "CDK",
  "Athena", "Glue", "EMR", "Kinesis", "QuickSight", "Lake Formation", "OpenSearch",
  "SageMaker", "Bedrock", "Rekognition", "Comprehend", "Textract", "Polly", "Transcribe", "Translate", "Lex",
  "Amplify", "AppSync", "IoT Core", "DataSync", "Migration Hub", "Database Migration Service (DMS)",
  "Cost Explorer", "Budgets", "SES", "Pinpoint",
];

const INTEREST_AREAS = [
  "AWS", "Web Dev", "AI/ML", "App Dev", "UI/UX",
  "DevOps", "Cyber Security", "Graphic Design", "Content", "Marketing",
];

const STAGES: ApplicationStageInfo[] = [
  { id: 1, label: "Personal Info" },
  { id: 2, label: "Academic Details" },
  { id: 3, label: "Technical Profile" },
  { id: 4, label: "Questions" },
  { id: 5, label: "Resume" },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+91 \d{10}$/;
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const initialForm: ApplicationFormData = {
  fullName: "",
  universityEmail: "",
  personalEmail: "",
  phoneNumber: "",
  rollNumber: "",
  course: "",
  branch: "",
  branchOther: "",
  year: "",
  interestAreas: [],
  githubUrl: "",
  linkedinUrl: "",
  portfolioUrl: "",
  whyJoin: "",
  leadershipExperience: "",
  usedAws: "",
  awsServices: [],
};

export default function RegisterPage() {
  const [stage, setStage] = useState(1);
  const [form, setForm] = useState<ApplicationFormData>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [resume, setResume] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [result, setResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const stepperRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);
  const [awsSearch, setAwsSearch] = useState("");
  const [showAwsDropdown, setShowAwsDropdown] = useState(false);

  const scrollToStepper = () => {
    if (stepperRef.current) {
      const yOffset = -110;
      const y = stepperRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    scrollToStepper();
  }, [stage]);

  const update = (key: keyof ApplicationFormData, value: any) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key as string]) {
      setErrors((e) => {
        const newErrors = { ...e };
        delete newErrors[key as string];
        return newErrors;
      });
    }
  };

  const toggleInterest = (area: string) => {
    setForm((f) => {
      const has = f.interestAreas.includes(area);
      return {
        ...f,
        interestAreas: has ? f.interestAreas.filter((a) => a !== area) : [...f.interestAreas, area],
      };
    });
    if (errors.interestAreas) {
      setErrors((e) => {
        const newErrors = { ...e };
        delete newErrors.interestAreas;
        return newErrors;
      });
    }
  };

  function validateStage(n: number) {
    const e: Record<string, string> = {};
    if (n === 1) {
      if (!form.fullName.trim()) e.fullName = "Required.";
      if (!EMAIL_RE.test(form.universityEmail)) e.universityEmail = "Enter a valid email.";
      if (!EMAIL_RE.test(form.personalEmail)) e.personalEmail = "Enter a valid email.";
      if (!PHONE_RE.test(form.phoneNumber)) e.phoneNumber = "Enter a valid phone number.";
    }
    if (n === 2) {
      if (!form.rollNumber.trim()) e.rollNumber = "Required.";
      if (!form.course) e.course = "Required.";
      if (form.course === "B.Tech" && !form.branch) e.branch = "Required.";
      if (form.course === "B.Tech" && form.branch === "Other" && !form.branchOther.trim()) e.branchOther = "Please specify your branch.";
      if (!form.year) e.year = "Required.";
    }
    if (n === 3) {
      if (form.interestAreas.length === 0) e.interestAreas = "Select at least one area.";
      if (form.githubUrl && !/^https?:\/\/.+/.test(form.githubUrl)) e.githubUrl = "Include https://";
      if (form.linkedinUrl && !/^https?:\/\/.+/.test(form.linkedinUrl)) e.linkedinUrl = "Include https://";
      if (form.portfolioUrl && !/^https?:\/\/.+/.test(form.portfolioUrl)) e.portfolioUrl = "Include https://";
    }
    if (n === 4) {
      if (!form.whyJoin.trim() || form.whyJoin.trim().length < 20) e.whyJoin = "A couple of sentences, please.";
      if (!form.usedAws) e.usedAws = "Required.";
      if (form.usedAws === "Yes" && form.awsServices.length === 0) e.awsServices = "Select at least one service.";
    }
    if (n === 5) {
      if (!resume) e.resume = "A resume PDF is required.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const match = hash.match(/^#step-(\d)$/);
      const targetStage = match ? parseInt(match[1], 10) : 1;

      if (targetStage >= 1 && targetStage <= STAGES.length) {
        setStage(targetStage);
      } else {
        setStage(1);
      }
    };

    if (window.location.hash && window.location.hash !== "#step-1") {
      window.location.hash = "";
    }

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const goNext = () => {
    if (validateStage(stage)) {
      const next = Math.min(stage + 1, STAGES.length);
      window.location.hash = `step-${next}`;
    }
  };

  const goBack = () => {
    const prev = Math.max(stage - 1, 1);
    if (prev === 1) {
      window.location.hash = "";
    } else {
      window.location.hash = `step-${prev}`;
    }
  };

  function handleFile(file: File | undefined | null) {
    if (!file) return;
    const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
    if (!isPdf) {
      setErrors((e) => ({ ...e, resume: "Only PDF files are accepted." }));
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setErrors((e) => ({ ...e, resume: "File must be under 5MB." }));
      return;
    }
    setErrors((e) => {
      const newErrors = { ...e };
      delete newErrors.resume;
      return newErrors;
    });
    setResume(file);
  }

  async function handleSubmit() {
    if (!validateStage(5)) return;
    setSubmitting(true);
    setSubmitError("");

    try {
      const fd = new FormData();
      fd.append("fullName", form.fullName.trim());
      fd.append("universityEmail", form.universityEmail.trim());
      fd.append("personalEmail", form.personalEmail.trim());
      fd.append("phoneNumber", form.phoneNumber.trim());
      fd.append("rollNumber", form.rollNumber.trim());
      fd.append("course", form.course);
      fd.append("branch", form.branch === "Other" ? form.branchOther.trim() : form.branch);
      fd.append("year", form.year);
      fd.append("interestAreas", JSON.stringify(form.interestAreas));
      fd.append("githubUrl", form.githubUrl.trim());
      fd.append("linkedinUrl", form.linkedinUrl.trim());
      fd.append("portfolioUrl", form.portfolioUrl.trim());
      fd.append("whyJoin", form.whyJoin.trim());
      fd.append("leadershipExperience", form.leadershipExperience.trim());
      fd.append("usedAws", form.usedAws);
      if (form.usedAws === "Yes") {
        fd.append("awsServices", JSON.stringify(form.awsServices));
      }
      if (resume) {
        fd.append("resume", resume);
      }

      const [res] = await Promise.all([
        fetch(`/api/register`, { method: "POST", body: fd }),
        new Promise((r) => setTimeout(r, 4800)),
      ]);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Submission failed. Please try again.");
      }
      setResult(data);
    } catch (err: any) {
      setSubmitError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (result) return <SuccessScreen result={result} />;

  return (
    <div className="register-page-theme relative min-h-screen bg-grid bg-noise bg-bg w-full overflow-x-hidden text-[#efecf5] font-sans">
      <Loader loadingStates={REGISTRATION_LOADING_STATES} loading={submitting} duration={1500} />
      
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

      <main className="w-full max-w-[820px] mx-auto px-6 sm:px-8 md:px-12 pt-[100px] md:pt-[140px] pb-[60px] md:pb-[100px] relative z-10 box-border">
        <div className="intro mb-8 md:mb-12">
          <div className="eyebrow">Application · 2026 Cohort</div>
          <h1>
            Deploy your<br />
            <em>application.</em>
          </h1>
          <p className="sub">Five stages, about 6 minutes. We'll reach out to shortlisted applicants for an interview.</p>
        </div>

        <div ref={stepperRef} className="scroll-mt-28">
          <Stepper stage={stage} stages={STAGES} />
        </div>

        <div className="form-card">
          <AnimatePresence mode="wait">
            <motion.div
              key={stage}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {stage === 1 && (
                <Stage title="Personal Information" note="stage 01 / 05">
                  <Field label="Full Name" error={errors.fullName} required>
                    <input value={form.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder="Your shubh name" />
                  </Field>
                  <Row>
                    <Field label="University Email" error={errors.universityEmail} required>
                      <input type="email" value={form.universityEmail} onChange={(e) => update("universityEmail", e.target.value)} placeholder="you@tulas.edu.in" />
                    </Field>
                    <Field label="Personal Email" error={errors.personalEmail} required>
                      <input type="email" value={form.personalEmail} onChange={(e) => update("personalEmail", e.target.value)} placeholder="you@gmail.com" />
                    </Field>
                  </Row>
                  <Row>
                    <Field label="Phone Number" error={errors.phoneNumber} required>
                      <input
                        type="tel"
                        value={form.phoneNumber}
                        onChange={(e) => {
                          let raw = e.target.value;
                          if (raw.startsWith("+91 ")) raw = raw.substring(4);
                          else if (raw.startsWith("+91")) raw = raw.substring(3);
                          let digits = raw.replace(/\D/g, "").substring(0, 10);
                          update("phoneNumber", digits.length > 0 ? "+91 " + digits : "");
                        }}
                        placeholder="+91 XXXXXXXXXX"
                      />
                    </Field>
                    <div />
                  </Row>
                </Stage>
              )}

              {stage === 2 && (
                <Stage title="Academic Details" note="stage 02 / 05">
                  <Row>
                    <Field label="Course" error={errors.course} required>
                      <CustomSelect
                        value={form.course}
                        onChange={(val) => {
                          update("course", val);
                          if (val !== "B.Tech") {
                            update("branch", "");
                            update("branchOther", "");
                          }
                        }}
                        options={COURSES}
                        placeholder="Select course"
                      />
                    </Field>
                    {form.course === "B.Tech" && (
                      <Field label="Branch" error={errors.branch} required>
                        <CustomSelect
                          value={form.branch}
                          onChange={(val) => {
                            update("branch", val);
                            if (val !== "Other") {
                              update("branchOther", "");
                            }
                          }}
                          options={BRANCHES}
                          placeholder="Select branch"
                        />
                      </Field>
                    )}
                  </Row>
                  {form.course === "B.Tech" && form.branch === "Other" && (
                    <Row>
                      <Field label="Specify Branch" error={errors.branchOther} required>
                        <input value={form.branchOther} onChange={(e) => update("branchOther", e.target.value)} placeholder="e.g. Biotechnology" />
                      </Field>
                      <div />
                    </Row>
                  )}
                  <Row>
                    <Field label="Roll Number" error={errors.rollNumber} required>
                      <input value={form.rollNumber} onChange={(e) => update("rollNumber", e.target.value.replace(/\D/g, ""))} placeholder="2201234567" />
                    </Field>
                    <Field label="Year" error={errors.year} required>
                      <CustomSelect
                        value={form.year}
                        onChange={(val) => update("year", val)}
                        options={YEARS}
                        placeholder="Select year"
                      />
                    </Field>
                  </Row>
                </Stage>
              )}

              {stage === 3 && (
                <Stage title="Technical Profile" note="stage 03 / 05">
                  <Field label="Areas of Interest" error={errors.interestAreas} hint="Select all that apply" required>
                    <div className="checkbox-grid">
                      {INTEREST_AREAS.map((area) => (
                        <label key={area} className={`chip ${form.interestAreas.includes(area) ? "chip-active" : ""}`}>
                          <input
                            type="checkbox"
                            checked={form.interestAreas.includes(area)}
                            onChange={() => toggleInterest(area)}
                          />
                          <span className="chip-dot" />
                          {area}
                        </label>
                      ))}
                    </div>
                  </Field>
                  <Row>
                    <Field label="GitHub" error={errors.githubUrl}>
                      <input value={form.githubUrl} onChange={(e) => update("githubUrl", e.target.value)} placeholder="https://github.com/username" />
                    </Field>
                    <Field label="LinkedIn" error={errors.linkedinUrl}>
                      <input value={form.linkedinUrl} onChange={(e) => update("linkedinUrl", e.target.value)} placeholder="https://linkedin.com/in/username" />
                    </Field>
                  </Row>
                  <Field label="Portfolio" hint="Optional" error={errors.portfolioUrl}>
                    <input value={form.portfolioUrl} onChange={(e) => update("portfolioUrl", e.target.value)} placeholder="https://yourportfolio.com" />
                  </Field>
                </Stage>
              )}

              {stage === 4 && (
                <Stage title="Application Questions" note="stage 04 / 05">
                  <Field label="Why do you want to join(in brief)?" error={errors.whyJoin} required>
                    <textarea rows={4} value={form.whyJoin} onChange={(e) => update("whyJoin", e.target.value)} placeholder="Tell us what draws you to the club..." />
                  </Field>

                  <Field label="Have you used any AWS services before?" error={errors.usedAws} required>
                    <CustomSelect
                      value={form.usedAws}
                      onChange={(val) => update("usedAws", val)}
                      options={["Yes", "No"]}
                      placeholder="Select option"
                    />
                  </Field>

                  {form.usedAws === "Yes" && (
                    <Field label="Which AWS services have you used?" error={errors.awsServices} required>
                      <div style={{ position: "relative" }}>
                        {form.awsServices.length > 0 && (
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "8px" }}>
                            {form.awsServices.map((svc) => (
                              <div key={svc} style={{ background: "var(--accent)", color: "#000", padding: "4px 8px", borderRadius: "4px", fontSize: "12px", display: "flex", alignItems: "center", gap: "6px" }}>
                                {svc}
                                <button type="button" onClick={() => update("awsServices", form.awsServices.filter((s) => s !== svc))} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>×</button>
                              </div>
                            ))}
                          </div>
                        )}
                        <input
                          value={awsSearch}
                          onChange={(e) => {
                            setAwsSearch(e.target.value);
                            setShowAwsDropdown(true);
                          }}
                          onFocus={() => setShowAwsDropdown(true)}
                          onBlur={() => setTimeout(() => setShowAwsDropdown(false), 200)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              const matches = AWS_SERVICES.filter((s) =>
                                s.toLowerCase().includes(awsSearch.toLowerCase()) &&
                                !form.awsServices.includes(s)
                              );
                              if (matches.length > 0) {
                                const firstMatch = matches[0];
                                update("awsServices", [...form.awsServices, firstMatch]);
                                setAwsSearch("");
                                setShowAwsDropdown(false);
                              }
                            }
                          }}
                          placeholder="Search AWS services..."
                        />
                        {showAwsDropdown && awsSearch && (
                          <div
                            data-lenis-prevent
                            onWheel={(e) => e.stopPropagation()}
                            style={{ position: "absolute", top: "100%", left: 0, right: 0, background: "var(--surface)", border: "1px solid var(--line)", zIndex: 10, maxHeight: "150px", overflowY: "auto", overscrollBehavior: "contain" }}
                          >
                            {AWS_SERVICES.filter((s) => s.toLowerCase().includes(awsSearch.toLowerCase()) && !form.awsServices.includes(s)).map((svc) => (
                              <div
                                key={svc}
                                onMouseDown={() => {
                                  update("awsServices", [...form.awsServices, svc]);
                                  setAwsSearch("");
                                  setShowAwsDropdown(false);
                                }}
                                style={{ padding: "8px 12px", cursor: "pointer", borderBottom: "1px solid var(--line)" }}
                              >
                                {svc}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </Field>
                  )}

                  <Field label="Previous leadership experience?" hint="Optional">
                    <textarea rows={3} value={form.leadershipExperience} onChange={(e) => update("leadershipExperience", e.target.value)} placeholder="Clubs, teams, projects you've led" />
                  </Field>
                </Stage>
              )}

              {stage === 5 && (
                <Stage title="Resume Upload" note="stage 05 / 05">
                  <Field label="Resume" error={errors.resume} hint="PDF only · Max 5MB" required>
                    <div
                      className={`dropzone ${dragActive ? "dropzone-active" : ""} ${resume ? "dropzone-filled" : ""}`}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setDragActive(true);
                      }}
                      onDragLeave={() => setDragActive(false)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setDragActive(false);
                        handleFile(e.dataTransfer.files?.[0]);
                      }}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="application/pdf"
                        hidden
                        onChange={(e) => handleFile(e.target.files?.[0])}
                      />
                      {resume ? (
                        <>
                          <span className="mono dz-file">{resume.name}</span>
                          <span className="mono dz-size">{(resume.size / 1024 / 1024).toFixed(2)} MB</span>
                          <button type="button" className="dz-remove" onClick={(e) => { e.stopPropagation(); setResume(null); }}>
                            Remove
                          </button>
                        </>
                      ) : (
                        <>
                          <span className="dz-title">Drop your resume here, or click to browse</span>
                          <span className="mono dz-hint">application/pdf · max 5MB</span>
                        </>
                      )}
                    </div>
                  </Field>
                </Stage>
              )}
            </motion.div>
          </AnimatePresence>

          {submitError && <div className="submit-error mono">✕ {submitError}</div>}

          <div className="stage-actions">
            {stage > 1 ? (
              <button className="btn-secondary" onClick={goBack} disabled={submitting}>
                ← Back
              </button>
            ) : (
              <span />
            )}
            {stage < STAGES.length ? (
              <button className="btn-primary" onClick={goNext}>
                Continue →
              </button>
            ) : (
              <button className="btn-primary" onClick={handleSubmit} disabled={submitting}>
                {submitting ? "Deploying…" : "Deploy Application →"}
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
