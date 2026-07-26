import { ScrollReveal } from "@/components/lightswind/scroll-reveal";

export function ScrollRevealSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Ambient background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[150px]"
      />
      <ScrollReveal
        size="2xl"
        align="center"
        variant="primary"
        enableBlur
        baseOpacity={0.05}
        baseRotation={3}
        staggerDelay={0.07}
        duration={0.6}
        containerClassName="max-w-4xl mx-auto px-6 relative z-10"
      >
        Learn cloud, build projects, and grow together — powered by AWS.
      </ScrollReveal>
    </section>
  );
}
