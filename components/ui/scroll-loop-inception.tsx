"use client";

import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { cn } from "@/lib/utils";
import TeamShowcase, { TeamMember } from "@/components/ui/team-showcase";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Ember CTA button. A dark #2a2a2a base whose face holds a
// 3px-cell doom-fire canvas: when `lit`, molten fire fills the button from the
// bottom like a liquid gauge (exponential ease, churning waterline), hovering
// bends the flames toward the cursor, pressing fires a burst pulse. The label
// dims to 40% white while the fire is out.

const STEPS = 38;
const CELL = 3;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function buildPalette(alpha: number) {
  const p = new Uint8Array(STEPS * 4);
  for (let s = 0; s < STEPS; s++) {
    const t = s / (STEPS - 1);
    let r: number;
    let g: number;
    let b: number;
    if (t < 0.4) {
      const e = t / 0.4;
      r = lerp(120, 218, e);
      g = lerp(20, 58, e);
      b = 0;
    } else if (t < 0.75) {
      const e = (t - 0.4) / 0.35;
      r = lerp(218, 255, e);
      g = lerp(58, 138, e);
      b = lerp(0, 42, e);
    } else {
      const e = (t - 0.75) / 0.25;
      r = 255;
      g = lerp(138, 228, e);
      b = lerp(42, 157, e);
    }
    p[s * 4] = r;
    p[s * 4 + 1] = g;
    p[s * 4 + 2] = b;
    p[s * 4 + 3] = Math.round(t ** 1.2 * alpha);
  }
  return p;
}

function FireCanvas({
  litRef,
  hoverRef,
  pressedRef,
}: {
  litRef: React.RefObject<boolean>;
  hoverRef: React.RefObject<boolean>;
  pressedRef: React.RefObject<boolean>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cols = Math.max(8, Math.ceil((canvas.offsetWidth || 160) / CELL));
    const rows = Math.max(8, Math.ceil((canvas.offsetHeight || 38) / CELL));
    canvas.width = cols;
    canvas.height = rows;

    const palette = buildPalette(180);
    const heat = new Uint8Array(cols * rows);
    const waterline = new Float32Array(cols);
    let maxHeat = 0;
    let pointerX = cols / 2;
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width > 0) pointerX = ((e.clientX - rect.left) / rect.width) * cols;
    };
    const parent = canvas.parentElement;
    parent?.addEventListener("pointermove", onMove);

    const img = ctx.createImageData(cols, rows);
    let level = litRef.current ? 1 : 0;

    // First paint synchronously: a lit button is molten from frame zero, even
    // if the rAF loop has not ticked yet (throttled tabs, mid-scroll mounts).
    if (level === 1) {
      const d = img.data;
      for (let o = 0; o < d.length; o += 4) {
        d[o] = 218;
        d[o + 1] = 58;
        d[o + 2] = 0;
        d[o + 3] = 255;
      }
      ctx.putImageData(img, 0, 0);
    }

    let raf = 0;
    let lastT = 0;
    let acc = 0;
    let burst = 0;
    let wasPressed = false;
    let alive = true;
    const TICK = 1000 / 30;

    const step = (t: number) => {
      if (!alive) return;
      raf = requestAnimationFrame(step);
      lastT ||= t;
      const dt = Math.min(64, t - lastT);
      lastT = t;

      // Fill level eases toward the lit state.
      if (litRef.current) level += (1 - level) * (1 - Math.exp(-dt / 240));
      else if (level > 0) {
        level += (0 - level) * (1 - Math.exp(-dt / 320));
        if (level < 0.02) level = 0;
      }

      acc += dt;
      if (acc >= TICK) {
        acc %= TICK;

        // Churning waterline: random walk per column, smoothed 1-2-1.
        for (let x = 0; x < cols; x++) {
          waterline[x] = Math.max(
            -4,
            Math.min(4, (waterline[x] ?? 0) + (Math.random() - 0.5) * 1.6),
          );
        }
        for (let x = 1; x < cols - 1; x++) {
          waterline[x] =
            ((waterline[x - 1] ?? 0) + (waterline[x] ?? 0) * 2 + (waterline[x + 1] ?? 0)) /
            4;
        }

        // Propagate upward; cooling is harsher while unlit.
        const cool = litRef.current ? 0 : 1;
        for (let y = 0; y < rows - 1; y++) {
          for (let x = 0; x < cols; x++) {
            const src = (y + 1) * cols + x;
            const dst =
              y * cols +
              Math.min(cols - 1, Math.max(0, x + ((Math.random() * 3) | 0) - 1));
            const v = (heat[src] ?? 0) - (1 + cool + ((Math.random() * 2.4) | 0));
            heat[dst] = v > 0 ? v : 0;
          }
        }

        const churn = level * (1 - level) * 4;
        const fill = level * (rows + 6);

        // Press pulse: spikes on press, sustains while held, decays after.
        if (pressedRef.current && !wasPressed) burst = 1;
        wasPressed = !!pressedRef.current;
        burst = pressedRef.current ? Math.max(burst * 0.86, 0.45) : burst * 0.8;

        if (litRef.current) {
          for (let x = 0; x < cols; x++) {
            const h = fill + (waterline[x] ?? 0) * (0.4 + churn);
            const surface = rows - 1 - Math.floor(h);
            // The molten surface line burns at max heat.
            if (level > 0.02 && surface >= 0 && surface < rows) {
              heat[surface * cols + x] = STEPS - 1;
              if (surface + 1 < rows) heat[(surface + 1) * cols + x] = STEPS - 1;
            }
            if (level > 0.97) {
              if (burst > 0.05) {
                heat[(rows - 1) * cols + x] = STEPS - 1;
                heat[(rows - 2) * cols + x] = STEPS - 1;
                if (rows > 2 && Math.random() < burst)
                  heat[(rows - 3) * cols + x] = STEPS - 1;
                if (Math.random() < burst * 0.3)
                  heat[((Math.random() * rows) | 0) * cols + x] = STEPS - 1;
              } else if (hoverRef.current) {
                heat[(rows - 1) * cols + x] = STEPS - 1;
                if (Math.random() < 0.7) heat[(rows - 2) * cols + x] = STEPS - 2;
                const d = x - pointerX;
                const near = Math.exp(-(d * d) / 18);
                if (near > 0.35 && rows > 2) heat[(rows - 3) * cols + x] = STEPS - 1;
                if (near > 0.7 && rows > 3) heat[(rows - 4) * cols + x] = STEPS - 3;
              } else if (Math.random() < 0.55) {
                heat[(rows - 1) * cols + x] =
                  Math.random() < 0.5 ? STEPS - 11 : STEPS - 17;
              }
            }
          }
        }
      }

      if (level === 0 && maxHeat === 0) {
        ctx.clearRect(0, 0, cols, rows);
        return;
      }

      // Render: solid molten body below the fill line (blended over #DA3A00),
      // translucent flames above it.
      maxHeat = 0;
      const d = img.data;
      const churn = level * (1 - level) * 4;
      const fill = level * (rows + 6);
      for (let x = 0; x < cols; x++) {
        const h = fill + (waterline[x] ?? 0) * (0.4 + churn);
        for (let y = 0; y < rows; y++) {
          const idx = y * cols + x;
          const o = idx * 4;
          const v = heat[idx] ?? 0;
          if (v > maxHeat) maxHeat = v;
          const pi = v * 4;
          const a = palette[pi + 3]!;
          if (rows - y <= h) {
            d[o] = 218 + (((palette[pi]! - 218) * a) >> 8);
            d[o + 1] = 58 + (((palette[pi + 1]! - 58) * a) >> 8);
            d[o + 2] = 0 + (((palette[pi + 2]! - 0) * a) >> 8);
            d[o + 3] = 255;
          } else {
            d[o] = palette[pi]!;
            d[o + 1] = palette[pi + 1]!;
            d[o + 2] = palette[pi + 2]!;
            d[o + 3] = a;
          }
        }
      }
      ctx.putImageData(img, 0, 0);
    };
    raf = requestAnimationFrame(step);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      parent?.removeEventListener("pointermove", onMove);
    };
  }, [litRef, hoverRef, pressedRef]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full [image-rendering:pixelated]"
    />
  );
}

export function PixelFireButton({
  children,
  lit = true,
  variant = "primary",
  className,
  style,
  overlay,
  tabIndex,
  type,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  /** Fire on or out. Out = dark base, dimmed label, embers dying. */
  lit?: boolean;
  variant?: "primary" | "ghost";
  className?: string;
  /** Merged into the button style, e.g. the width morph while submitting */
  style?: React.CSSProperties;
  /** Absolute layers over the fire, e.g. spinner and success check */
  overlay?: React.ReactNode;
  tabIndex?: number;
  type?: "button" | "submit";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}) {
  const litRef = useRef(lit);
  const hoverRef = useRef(false);
  const pressedRef = useRef(false);
  litRef.current = lit;

  if (variant === "ghost") {
    return (
      <button
        type={type ?? "button"}
        onClick={onClick}
        disabled={disabled}
        className={cn(
          "relative inline-flex h-[38px] items-center justify-center gap-2 rounded-md border border-[#f4f1ea]/15 bg-[#16140f] px-4 text-sm font-semibold tracking-[-0.015em] text-[#f4f1ea]",
          "transition-[scale,border-color,box-shadow,color] duration-150 active:scale-[0.985]",
          "hover:border-[#ff8a3d]/40 hover:text-[#ffd6bf]",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff8a3d]",
          disabled && "opacity-50 pointer-events-none",
          className,
        )}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      type={type ?? "button"}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => {
        hoverRef.current = true;
      }}
      onMouseLeave={() => {
        hoverRef.current = false;
        pressedRef.current = false;
      }}
      onPointerDown={() => {
        pressedRef.current = true;
      }}
      onPointerUp={() => {
        pressedRef.current = false;
      }}
      tabIndex={tabIndex}
      style={{
        color: lit ? "#ffffff" : "rgba(255, 255, 255, 0.4)",
        transition:
          "color 400ms ease, transform 120ms ease-out, width 380ms cubic-bezier(0.65, 0, 0.2, 1), padding 380ms cubic-bezier(0.65, 0, 0.2, 1)",
        ...style,
      }}
      className={cn(
        "relative inline-flex h-[38px] shrink-0 items-center justify-center overflow-hidden whitespace-nowrap rounded-md border-none bg-[#2a2a2a] px-4 text-sm font-semibold tracking-[-0.015em] active:scale-[0.985]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff8a3d]",
        disabled && "pointer-events-none",
        className,
      )}
    >
      <FireCanvas litRef={litRef} hoverRef={hoverRef} pressedRef={pressedRef} />
      <span className="relative">{children}</span>
      {overlay}
    </button>
  );
}

// Scroll inception, the looped edition: a site stuck inside its own browser
// window, Droste style. Scrolling dives INTO the window on the page; the
// moment it fills the screen the cycle wraps seamlessly and you are falling
// again. One camera transform, exponential zoom path, nested self-similar
// screens whose copy shifts by depth so the seam is invisible.

const W = 1200;
const H = 760;
const BAR = 48;
// Zoom factor between levels: the inner window is 1/K of the screen.
const K = 2.8;
// Inner window center offset from the screen center (px, screen space).
const D_Y = 180;
// How many dives one pass of the section performs.
const DIVES = 3;
// Nested copies to render; deeper ones are a few px tall.
const LEVELS = 4;

export type InceptionScreen = {
  eyebrow: string;
  heading: string;
  sub?: string;
  members?: TeamMember[];
};

const DEFAULT_SCREENS: InceptionScreen[] = [
  {
    eyebrow: "loop 00",
    heading: "This site contains itself.",
    sub: "The window below is this exact page.",
  },
  {
    eyebrow: "loop 01",
    heading: "You are inside the site now.",
    sub: "Same page, one level down.",
  },
  {
    eyebrow: "loop 02",
    heading: "Deeper. Still the same site.",
    sub: "Only the scale changed.",
  },
  {
    eyebrow: "loop 03",
    heading: "It loops forever.",
    sub: "Scroll back up to climb out.",
  },
];

function ScreenContent({ screen }: { screen: InceptionScreen }) {
  return (
    <div className="flex flex-col h-full overflow-hidden rounded-2xl bg-[#121215] border border-[#27272A] shadow-2xl [transform-style:preserve-3d] [backface-visibility:hidden] subpixel-antialiased [text-rendering:optimizeLegibility]">
      {/* Browser chrome */}
      <div
        style={{ height: BAR }}
        className="flex shrink-0 items-center gap-3 border-b border-[#27272A] bg-[#18181B] px-4"
      >
        <div className="flex items-center gap-1.5">
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#febc2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
        </div>
      </div>

      {/* Page */}
      <div className="relative min-h-0 flex-1">
        <div className="flex flex-col items-center px-4 sm:px-6 pt-3.5 sm:pt-4 text-center overflow-hidden max-h-full relative">
          {/* Soft Purple Glow Shade Behind Heading */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-80 sm:w-96 h-20 bg-[#7C3AED]/25 blur-3xl rounded-full pointer-events-none z-0" />

          <p className="relative z-10 font-mono text-[10px] uppercase tracking-[0.16em] text-[#A78BFA] font-semibold">
            {screen.eyebrow}
          </p>
          <h3 className="relative z-10 mt-1 max-w-xl text-balance font-display text-2xl sm:text-3xl md:text-4xl leading-tight text-[#FAFAFA] font-bold tracking-tight">
            {screen.heading}
          </h3>
          {screen.sub && (
            <p className="relative z-10 mt-0.5 max-w-lg text-pretty text-[11px] sm:text-xs leading-relaxed text-[#D4D4D8]/90 font-mono">
              {screen.sub}
            </p>
          )}

          {/* Department Members Showcase */}
          {screen.members && screen.members.length > 0 && (
            <div className="mt-1.5 w-full max-w-5xl scale-95 sm:scale-100 origin-top pointer-events-auto">
              <TeamShowcase members={screen.members} />
            </div>
          )}

          {/* Bottom spacing inside screen */}
          <div className="pb-3" />
        </div>
      </div>
    </div>
  );
}

function Screen({
  depth,
  screens,
}: {
  depth: number;
  screens: InceptionScreen[];
}) {
  const currentText = screens[depth] || screens[0];
  const nextText = screens[depth + 1];
  const innerW = W / K;
  const innerH = H / K;

  return (
    <div style={{ width: W, height: H }} className="relative">
      {/* Current Active Department Screen (gradually fades as camera zooms past) */}
      <div style={{ opacity: "var(--ek-prev-op, 1)" }} className="w-full h-full">
        <ScreenContent screen={currentText} />
      </div>

      {/* Next Department Screen starting small inside inner box with full content */}
      {nextText && (
        <div
          style={{
            position: "absolute",
            left: (W - innerW) / 2,
            top: (H - innerH) / 2 + D_Y,
            width: innerW,
            height: innerH,
            opacity: "var(--ek-nest-op, 0)",
            pointerEvents: "none",
          }}
          className="overflow-hidden rounded-xl border border-[#27272A] bg-[#121215] shadow-2xl"
        >
          <div
            style={{
              width: W,
              height: H,
              transform: `scale(${1 / K})`,
              transformOrigin: "top left",
            }}
          >
            <ScreenContent screen={nextText} />
          </div>
        </div>
      )}
    </div>
  );
}

export function ScrollInception({
  screens = DEFAULT_SCREENS,
  url = "yoursite.com",
  buttonLabel = "Get early access",
  revealChrome = true,
  className,
}: {
  /** Copy per dive level; cycles, so the wrap stays seamless */
  screens?: InceptionScreen[];
  url?: string;
  buttonLabel?: string;
  revealChrome?: boolean;
  className?: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const fitRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  const [depth, setDepth] = useState(0);
  const depthRef = useRef(0);

  useGSAP(() => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    const fitEl = fitRef.current;
    const camera = cameraRef.current;
    if (!section || !sticky || !fitEl || !camera) return;

    const totalDives = screens.length > 0 ? screens.length : DIVES;
    const maxZoomDives = Math.max(1, totalDives - 1);

    const updateFrame = (progress: number) => {
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const fit = Math.min(vw / W, (vh - 90) / H) * 0.94;
      fitEl.style.transform = `scale(${fit})`;

      const p = Math.max(0, Math.min(1, progress));
      const ft = p * maxZoomDives;
      const d = Math.min(Math.floor(ft), totalDives - 1);
      const f = d === totalDives - 1 ? 0 : ft - Math.floor(ft);

      const sigma = Math.pow(K, f);
      const cy = D_Y * ((sigma - 1) / (K - 1));
      camera.style.transform = `translateY(${-cy * sigma}px) scale(${sigma})`;

      section.style.setProperty(
        "--ek-bar",
        revealChrome ? Math.min(1, p / 0.08).toFixed(3) : "1"
      );

      if (d !== depthRef.current) {
        depthRef.current = d;
        flushSync(() => {
          setDepth(d);
        });
      }

      const nestOp = Math.min(1, Math.max(0, (f - 0.1) / 0.65));
      const prevOp = Math.max(0, Math.min(1, (0.85 - f) / 0.7));
      section.style.setProperty("--ek-nest-op", nestOp.toFixed(3));
      section.style.setProperty("--ek-prev-op", prevOp.toFixed(3));
      if (hintRef.current) {
        hintRef.current.style.opacity = String(Math.max(0, 1 - p * 14));
      }
      if (counterRef.current) {
        const currentStep = d + 1;
        counterRef.current.textContent = `${currentStep} / ${totalDives}`;
      }
    };

    const trigger = ScrollTrigger.create({
      trigger: section,
      pin: sticky,
      start: "top top",
      end: `+=${maxZoomDives * 500}`,
      scrub: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        updateFrame(self.progress);
      },
    });

    updateFrame(0);

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(refreshTimer);
      trigger.kill();
    };
  }, { scope: sectionRef });

  const totalDives = screens.length > 0 ? screens.length : DIVES;

  return (
    <section
      ref={sectionRef}
      style={{ "--ek-bar": revealChrome ? 0 : 1 } as React.CSSProperties}
      className={cn("hidden md:block relative w-full bg-bg z-10", className)}
    >
      <div
        ref={stickyRef}
        className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-bg z-10"
      >
        {/* Clean Single Grid Overlay */}
        <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none z-0" />
        <div
          ref={fitRef}
          className="shrink-0"
        >
          <div ref={cameraRef} className="[transform-style:preserve-3d] [backface-visibility:hidden] subpixel-antialiased">
            <Screen
              depth={depth}
              screens={screens}
            />
          </div>
        </div>

        {/* Dive meter */}
        <span
          ref={counterRef}
          className="pointer-events-none absolute bottom-6 right-6 font-mono text-[11px] tabular-nums text-[#A78BFA] bg-[#18181B]/90 px-3 py-1 rounded-full border border-[#27272A] shadow-lg z-20"
        >
          0:00 / {totalDives}
        </span>

        {/* Scroll hint */}
        <div
          ref={hintRef}
          className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[11px] tracking-[0.16em] text-[#71717A] uppercase font-semibold z-20"
        >
          scroll
        </div>
      </div>
    </section>
  );
}
