"use client";

import { ArrowDownRight, FileText, Sparkles } from "lucide-react";
import Image from "next/image";

import { TagPills } from "./TagPills";

const TAGS = [
  { label: "AI / ML", icon: "✦" },
  { label: "Full-Stack", icon: "⧉" },
  { label: "Founder @ AgentSEO", icon: "↗" },
  { label: "Michigan CSE", icon: "M" },
];

export default function Hero({ onAskAI }: { onAskAI: () => void }) {
  return (
    <section aria-labelledby="hero-heading" className="hero-enter pt-10 sm:pt-16 lg:pt-20">
      <div className="mb-7 flex items-center gap-4 xl:hidden">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-[#d2cbbd] shadow-sm sm:h-24 sm:w-24">
          <Image src="/headshot.jpg" alt="Arda Edil" fill priority sizes="96px" className="object-cover" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#667b89]">Student · Builder · Founder</p>
          <p className="mt-1 font-[var(--app-font-serif)] text-3xl text-[#101010]">Arda Edil</p>
        </div>
      </div>

      <p className="hidden text-sm font-semibold tracking-[0.02em] text-[#516775] xl:block xl:text-base">Arda Edil</p>
      <h1
        id="hero-heading"
        className="mt-4 max-w-4xl text-balance font-[var(--app-font-serif)] text-[clamp(2.8rem,6vw,5.8rem)] leading-[0.98] tracking-[-0.045em] text-[#11110f]"
      >
        I build software that makes AI systems more useful in the real world.
      </h1>
      <p className="mt-7 max-w-3xl text-base leading-7 text-[#4f4a42] sm:text-lg sm:leading-8">
        I&apos;m a Computer Science student at the University of Michigan working across AI, full-stack engineering,
        and applied ML. Right now, I&apos;m building AgentSEO and experimenting with everything from AI-agent
        reliability to reinforcement learning and computer vision.
      </p>

      <div className="mt-7">
        <TagPills tags={TAGS} />
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <a
          href="#projects"
          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#17232b] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#0f1a20] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#45677c] focus-visible:ring-offset-2 motion-reduce:transform-none"
        >
          Explore my work
          <ArrowDownRight className="h-4 w-4" aria-hidden />
        </a>
        <button
          type="button"
          onClick={onAskAI}
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#bfcbd2] bg-[#eef4f7] px-5 py-2.5 text-sm font-semibold text-[#253d4b] transition hover:-translate-y-0.5 hover:bg-[#e4eef3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#45677c] focus-visible:ring-offset-2 motion-reduce:transform-none"
        >
          <Sparkles className="h-4 w-4" aria-hidden />
          Ask my AI
        </button>
        <a
          href="/arda-edil-resume.pdf"
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-11 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-[#49443c] underline decoration-[#aaa294] underline-offset-4 transition hover:text-[#11110f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#45677c] focus-visible:ring-offset-2"
        >
          <FileText className="h-4 w-4" aria-hidden />
          Resume ↗
        </a>
      </div>
    </section>
  );
}
