import { Globe } from "@/components/ui/globe";

export default function GlobeDemoPage() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center p-6">
      <div className="relative flex h-[500px] w-full max-w-2xl items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-bg-card/80 px-8 pb-40 pt-8 md:pb-60 shadow-2xl backdrop-blur-xl">
        <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-white to-white/20 bg-clip-text text-center text-7xl md:text-8xl font-bold leading-none text-transparent">
          Globe
        </span>
        <Globe className="top-28" />
        <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(124,58,237,0.35),rgba(255,255,255,0))]" />
      </div>
    </main>
  );
}
