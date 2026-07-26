export interface ApplicationFormData {
  fullName: string;
  universityEmail: string;
  personalEmail: string;
  phoneNumber: string;
  rollNumber: string;
  course: string;
  branch: string;
  branchOther: string;
  year: string;
  interestAreas: string[];
  githubUrl: string;
  linkedinUrl: string;
  portfolioUrl: string;
  whyJoin: string;
  leadershipExperience: string;
  usedAws: string;
  awsServices: string[];
}

export interface ApplicationSubmissionResult {
  id: string;
  submittedAt: string;
}

export interface ApplicationStageInfo {
  id: number;
  label: string;
}
