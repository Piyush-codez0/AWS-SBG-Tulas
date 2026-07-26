"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Linkedin, Instagram } from "lucide-react";
import { ArrowRight } from "@/components/animate-ui/icons/arrow-right";
import { Sparkles } from "@/components/animate-ui/icons/sparkles";
import { Send } from "@/components/animate-ui/icons/send";
import { Check } from "@/components/animate-ui/icons/check";
import { Button } from "@/components/ui/button";
import { subscribeToNewsletter } from "@/actions/newsletter";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const FOOTER_LINKS = [
  {
    heading: "Community",
    links: [
      { label: "About", href: "/about" },
      { label: "Events", href: "/events" },
      { label: "Team", href: "/team" },
      { label: "Gallery", href: "/gallery" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Learning Hub", href: "/learning-hub" },
      { label: "AWS Console", href: "https://console.aws.amazon.com/" },
      { label: "AWS Skill Builder", href: "https://skillbuilder.aws" },
      { label: "AWS Educate", href: "https://aws.amazon.com/education/awseducate/" },
    ],
  },
  {
    heading: "Connect",
    links: [
      { label: "Meetup", href: "https://www.meetup.com/aws-sbg-at-tulas-institute/" },
      { label: "WhatsApp Channel", href: "https://whatsapp.com/channel/0029VbDJ4jD6WaKnCQZRWF2Z" },
      { label: "LinkedIn", href: "#" },
      { label: "Instagram", href: "https://www.instagram.com/aws_sbg_tulas" },
      { label: "Email Us", href: "mailto:awssbg@tulas.edu.in" },
    ],
  },
];

const MeetupIcon = ({ size = 24, className = "", ...props }: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    {...props}
  >
    <path d="M21.16 11.23c-1.35-1.92-3.13-2.61-4.81-2.07-1 .31-1.74 1.07-2.18 1.96a4.29 4.29 0 0 0-4.04-1.96c-1.63.15-2.85 1.15-3.4 2.45-.19-.4-.44-.76-.78-1.07-1.12-1.07-2.6-1.11-3.6-.1-1.03 1.03-1.07 2.62.1 3.73.54.51 1.25.75 1.95.73-1.03 1.05-1 2.7.07 3.76 1.05 1.03 2.72 1.02 3.78-.05.57-.57.88-1.32.93-2.1.84.58 1.83.74 2.7.53 1.1-.28 2.05-1 2.62-1.94 1.16 1.54 3.03 1.95 4.67 1.06 1.7-.93 2.37-3.04 1.99-4.93z"/>
  </svg>
);

const WhatsAppIcon = ({ size = 24, className = "", ...props }: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    {...props}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.99c-.002 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c-.001 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662a11.87 11.87 0 005.705 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const SOCIALS = [
  { icon: MeetupIcon, href: "https://www.meetup.com/aws-sbg-at-tulas-institute/", label: "Meetup" },
  { icon: WhatsAppIcon, href: "https://whatsapp.com/channel/0029VbDJ4jD6WaKnCQZRWF2Z", label: "WhatsApp" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "https://www.instagram.com/aws_sbg_tulas", label: "Instagram" },
  { icon: Send, href: "mailto:awssbg@tulas.edu.in", label: "Email" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!footerRef.current) return;

    // Smooth parallax effect applied to the ENTIRE footer container element
    gsap.fromTo(
      footerRef.current,
      { y: -100 },
      {
        y: 0,
        ease: "none",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom",
          end: "bottom bottom",
          scrub: 0.5,
        },
      }
    );

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);
    return () => clearTimeout(refreshTimer);
  }, { scope: footerRef });

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus("loading");
    setErrorMessage("");
    
    const result = await subscribeToNewsletter(email);
    
    if (result.success) {
      setStatus("success");
      setEmail("");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 5000);
      try {
        toast.success("Subscribed to AWS SBG Newsletter! 🎉", {
          description: "You'll receive updates on upcoming workshops, hackathons, and cloud events.",
        });
      } catch (_) {}
    } else {
      setStatus("error");
      const err = result.error || "Something went wrong.";
      setErrorMessage(err);
      try {
        toast.error("Subscription failed", {
          description: err,
        });
      } catch (_) {}
    }
  };

  return (
    <footer ref={footerRef} className="relative z-10 border-t border-white/[0.05] bg-bg overflow-hidden">
      {/* Floating Toast Notification Banner */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-6 right-6 z-[999999] flex items-center gap-3.5 rounded-2xl border border-emerald-500/40 bg-[#0c0618]/95 p-4 pr-6 text-sm text-white shadow-[0_0_35px_rgba(16,185,129,0.35)] backdrop-blur-2xl"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
              ✓
            </div>
            <div>
              <div className="font-semibold text-white tracking-wide">Subscribed to AWS SBG Newsletter! 🎉</div>
              <div className="text-xs text-white/70 mt-0.5">You will receive updates on upcoming workshops & hackathons.</div>
            </div>
            <button
              onClick={() => setShowToast(false)}
              className="ml-2 text-white/50 hover:text-white transition-colors text-lg font-mono"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Decorative gradient blur */}
      <div
        aria-hidden
        className="footer-glow pointer-events-none absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]"
      />
      <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay pointer-events-none" />

      <div className="relative mx-auto max-w-content px-4 sm:px-6 pb-12 pt-16 md:pt-20">
        <div className="grid gap-12 lg:gap-16 lg:grid-cols-12">
          {/* Brand & Newsletter */}
          <div className="footer-brand-col flex flex-col gap-8 lg:col-span-5">
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                className="flex items-center gap-3 font-display text-lg font-semibold tracking-tight text-text-primary transition-opacity hover:opacity-80"
              >
                <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-white/[0.05] p-1.5 ring-1 ring-white/10">
                  <Image 
                    src="/logos/SBG_logo.png" 
                    alt="AWS SBG Logo" 
                    fill 
                    className="object-contain p-1"
                  />
                </div>
                AWS Student Builder Group
              </Link>
              <p className="max-w-[320px] text-[15px] leading-relaxed text-text-secondary">
                A student-led community at Tula&apos;s University, Dehradun dedicated to building, 
                learning, and deploying real-world applications on AWS.
              </p>
            </div>

            {/* Newsletter Subscription */}
            <div className="relative overflow-hidden flex flex-col gap-3 rounded-2xl border border-white/[0.05] bg-white/[0.02] p-5 backdrop-blur-sm mt-2 hover:border-primary/20 hover:bg-white/[0.04] transition-all duration-300 group/card">
              {/* Top accent glow line */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
              
              <h4 className="text-sm font-medium text-text-primary flex items-center gap-2">
                <Sparkles size={14} className="text-accent" animate loop />
                Join our newsletter
              </h4>
              <p className="text-[13px] text-text-secondary leading-relaxed max-w-[320px]">
                Get updates on upcoming workshops, cloud events, and hackathons straight to your inbox.
              </p>
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                    className="mt-2 flex items-center gap-2 rounded-xl bg-green-500/10 px-4 py-3 text-sm text-green-400 border border-green-500/20"
                  >
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-500/20">
                      <Check size={12} className="text-green-400" animate />
                    </div>
                    Thanks for subscribing!
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                    className="mt-2 relative flex flex-col max-w-[360px]"
                    onSubmit={handleSubscribe}
                  >
                  <div className="relative flex flex-col sm:flex-row sm:items-center">
                    <div className="relative w-full">
                      <Send size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={status === "loading"}
                        placeholder="Enter your email address"
                        className="w-full rounded-2xl sm:rounded-full border border-white/10 bg-white/[0.02] py-3 pl-10 pr-4 sm:pr-[115px] text-sm text-text-primary outline-none transition-all placeholder:text-muted focus:border-primary/50 focus:bg-white/[0.05] focus:ring-1 focus:ring-primary/50 disabled:opacity-50"
                        required
                      />
                    </div>
                    <Button
                      size="sm"
                      disabled={status === "loading"}
                      className="mt-3 sm:mt-0 sm:absolute sm:right-1 sm:top-1 sm:bottom-1 sm:h-auto rounded-2xl sm:rounded-full bg-gradient-to-r from-primary to-accent text-white hover:brightness-110 shadow-[0_0_15px_rgba(124,58,237,0.2)] hover:shadow-[0_0_20px_rgba(124,58,237,0.35)] transition-all duration-200 shrink-0 group px-5 py-3 sm:py-1.5 font-medium disabled:opacity-70 w-full sm:w-auto justify-center border-none"
                    >
                      {status === "loading" ? (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                      ) : (
                        <>
                          Subscribe
                          <ArrowRight size={14} className="ml-1.5" animateOnHover />
                        </>
                      )}
                    </Button>
                  </div>
                  {status === "error" && (
                    <p className="mt-2 text-xs text-red-400 pl-2">{errorMessage}</p>
                  )}
                </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
 
          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7 lg:pl-10">
            {FOOTER_LINKS.map((col) => (
              <div key={col.heading} className="footer-link-col">
                <h4 className="font-display text-[15px] font-semibold text-text-primary">
                  {col.heading}
                </h4>
                <ul className="mt-5 flex flex-col gap-3.5">
                  {col.links.map((link) => {
                    const isExternal = link.href.startsWith("http") || link.href.startsWith("mailto");
                    return (
                      <li key={link.label}>
                        {isExternal ? (
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex w-fit items-center gap-1.5 text-[14px] text-text-secondary transition-colors hover:text-primary-light"
                          >
                            {link.label}
                            <ArrowRight size={14} className="-translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" animateOnHover />
                          </a>
                        ) : (
                          <Link
                            href={link.href}
                            className="group flex w-fit items-center gap-1.5 text-[14px] text-text-secondary transition-colors hover:text-primary-light"
                          >
                            {link.label}
                            <ArrowRight size={14} className="-translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" animateOnHover />
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom-bar mt-20 flex flex-col items-center justify-between gap-6 border-t border-white/[0.05] pt-8 sm:flex-row">
          <div className="flex items-center gap-4">
            {SOCIALS.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.03] text-text-secondary transition-colors duration-200 hover:bg-primary/20 hover:text-primary-light"
                >
                  <Icon size={16} />
                </a>
              );
            })}
          </div>
          
          <div className="flex flex-col items-center gap-1.5 sm:items-end">
            <p className="text-[13px] text-muted">
              © {new Date().getFullYear()}&nbsp;&nbsp;AWS SBG, Tula&apos;s University. All rights reserved.
            </p>
            
          </div>
        </div>
      </div>
    </footer>
  );
}
