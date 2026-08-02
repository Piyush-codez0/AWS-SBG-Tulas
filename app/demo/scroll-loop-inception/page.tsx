"use client";

import { ScrollInception } from "@/components/ui/scroll-loop-inception";

export default function ScrollLoopDemoPage() {
  return (
    <div className="w-full bg-[#121215] text-[#FAFAFA]">
      <ScrollInception />
      <div className="flex h-[40vh] items-center justify-center bg-[#121215] border-t border-[#27272A] font-mono text-[11px] tracking-[0.16em] text-[#71717A] uppercase font-semibold">
        out of the loop
      </div>
    </div>
  );
}
