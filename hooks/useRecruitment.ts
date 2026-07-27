"use client";

import { useState, useEffect } from "react";
import {
  getRecruitmentStatus,
  getRegistrationTimeRemaining,
  isRecruitmentOpen,
  TimeRemaining,
} from "@/lib/recruitment";
import { RecruitmentStatus } from "@/config/recruitment";

export function useRecruitment() {
  const [mounted, setMounted] = useState(false);
  const [status, setStatus] = useState<RecruitmentStatus>("closed");
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    totalMs: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: true,
  });

  useEffect(() => {
    setMounted(true);
    const update = () => {
      const currentStatus = getRecruitmentStatus();
      setStatus(currentStatus);
      setTimeRemaining(getRegistrationTimeRemaining());
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return {
    mounted,
    status,
    isOpen: status === "open",
    isClosed: status === "closed",
    isUpcoming: status === "upcoming",
    timeRemaining,
  };
}
