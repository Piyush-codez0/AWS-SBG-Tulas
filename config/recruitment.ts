export type RecruitmentStatusMode = "auto" | "upcoming" | "open" | "closed";

export type RecruitmentStatus = "upcoming" | "open" | "closed";

export interface RecruitmentConfig {
  /**
   * Status mode:
   * - "auto": status is automatically computed based on start and end dates below
   * - "open": force website to OPEN mode (shows Register buttons & form)
   * - "closed": force website to CLOSED mode (shows Join Community buttons & closed page)
   * - "upcoming": force website to UPCOMING mode
   */
  statusMode: RecruitmentStatusMode;

  /** Date string for when registration opens (e.g. "YYYY-MM-DD" or "YYYY-MM-DDTHH:mm:ssZ") */
  registrationStartDate: string;

  /** Date string for when registration closes (e.g. "YYYY-MM-DD" or "YYYY-MM-DDTHH:mm:ssZ") */
  registrationEndDate: string;

  /** Primary fallback redirect URL when recruitment is closed */
  communityUrl: string;
}

/**
 * =========================================================================
 * SINGLE SOURCE OF TRUTH: RECRUITMENT CONFIGURATION
 * =========================================================================
 * To change dates or force the site state, edit the values below:
 */
export const RECRUITMENT_CONFIG: RecruitmentConfig = {
  // Option 1: Force status manually ("open" | "closed" | "upcoming" | "auto")
  statusMode: (process.env.NEXT_PUBLIC_RECRUITMENT_STATUS as RecruitmentStatusMode) || "auto",

  // Option 2: Edit start & end dates (in YYYY-MM-DD format or ISO format)
  registrationStartDate: "2026-07-26T00:00:00.000Z",
  registrationEndDate: "2026-08-21T23:59:59.000Z",

  communityUrl: "/community",
};
