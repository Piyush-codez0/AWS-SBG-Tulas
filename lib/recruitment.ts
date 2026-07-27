import { RECRUITMENT_CONFIG, RecruitmentConfig, RecruitmentStatus } from "@/config/recruitment";

/**
 * Get current recruitment configuration.
 */
export function getRecruitmentConfig(): RecruitmentConfig {
  return RECRUITMENT_CONFIG;
}

/**
 * Determine the effective recruitment status ("upcoming", "open", or "closed").
 * Supports manual override from statusMode, or automatically evaluates dates.
 */
export function getRecruitmentStatus(nowDate: Date = new Date()): RecruitmentStatus {
  const config = getRecruitmentConfig();

  // If manual override is specified (and not "auto"), respect it immediately
  if (config.statusMode && config.statusMode !== "auto") {
    return config.statusMode;
  }

  const now = nowDate.getTime();
  const start = new Date(config.registrationStartDate).getTime();
  const end = new Date(config.registrationEndDate).getTime();

  if (now < start) {
    return "upcoming";
  }

  if (now >= start && now <= end) {
    return "open";
  }

  return "closed";
}

/**
 * Convenience helper to check if recruitment is currently open.
 */
export function isRecruitmentOpen(nowDate: Date = new Date()): boolean {
  return getRecruitmentStatus(nowDate) === "open";
}

export interface TimeRemaining {
  totalMs: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

/**
 * Calculate time remaining until registration closes.
 */
export function getRegistrationTimeRemaining(nowDate: Date = new Date()): TimeRemaining {
  const config = getRecruitmentConfig();
  const end = new Date(config.registrationEndDate).getTime();
  const now = nowDate.getTime();
  const diff = end - now;

  if (diff <= 0) {
    return {
      totalMs: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isExpired: true,
    };
  }

  const seconds = Math.floor((diff / 1000) % 60);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  return {
    totalMs: diff,
    days,
    hours,
    minutes,
    seconds,
    isExpired: false,
  };
}
