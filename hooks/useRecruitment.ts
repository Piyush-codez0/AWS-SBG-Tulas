"use client";

import { useState, useEffect, useRef } from "react";
import {
  getRecruitmentConfig,
  getRecruitmentStatus,
  parseDateString,
  TimeRemaining,
} from "@/lib/recruitment";
import { RecruitmentStatus } from "@/config/recruitment";

export function useRecruitment() {
  const [mounted, setMounted] = useState(false);
  const [status, setStatus] = useState<RecruitmentStatus>(() => getRecruitmentStatus());
  const endDateRef = useRef<string>(getRecruitmentConfig().registrationEndDate);
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    totalMs: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: true,
  });

  const updateCountdown = () => {
    const end = parseDateString(endDateRef.current).getTime();
    const now = Date.now();
    const diff = end - now;

    if (diff <= 0) {
      setTimeRemaining({
        totalMs: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isExpired: true,
      });
      return;
    }

    const seconds = Math.floor((diff / 1000) % 60);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    setTimeRemaining({
      totalMs: diff,
      days,
      hours,
      minutes,
      seconds,
      isExpired: false,
    });
  };

  useEffect(() => {
    setMounted(true);

    // Fetch dynamic status from Supabase database endpoint
    fetch("/api/recruitment-status")
      .then((res) => res.json())
      .then((data) => {
        if (data?.status) {
          setStatus(data.status);
        }
        if (data?.registrationEndDate) {
          endDateRef.current = data.registrationEndDate;
        }
        updateCountdown();
      })
      .catch((err) => {
        console.warn("[useRecruitment] Could not fetch DB status, using fallback:", err);
      });

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
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

