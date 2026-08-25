import { Binary, BookOpen, BrainCircuit, Code2 } from "lucide-react";

const NOW_ITEMS = [
  { label: "Building", title: "AgentSEO", detail: "AI-agent/API reliability tooling", icon: Binary },
  { label: "Engineering", title: "CaseForge @ BGTS", detail: "AI-powered software engineering", icon: Code2 },
  { label: "Exploring", title: "AI Agents, RL & Computer Vision", detail: "Applied AI experimentation", icon: BrainCircuit },
  { label: "Studying", title: "Computer Science @ Michigan", detail: "Engineering + Business Minor", icon: BookOpen },
];

export default function NowSection() {
  return (
    <section aria-labelledby="now-heading" className="mt-20 sm:mt-24">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <h2 id="now-heading" className="font-[var(--app-font-serif)] text-3xl tracking-[-0.02em] text-[#171613] sm:text-4xl">
          What I&apos;m doing right now
        </h2>
        <p className="text-[10px] font-semibold tracking-[0.18em] text-[#7a746a]">NOW / AUGUST 2026</p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {NOW_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <article
              key={item.label}
              className="group rounded-2xl border border-[#d8d2c5] bg-[#fbfaf7]/75 p-4 transition hover:-translate-y-1 hover:border-[#b9c6cd] hover:shadow-[0_16px_35px_-28px_rgba(22,39,48,0.6)] motion-reduce:transform-none"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#e4edf2] text-[#425f70] transition group-hover:bg-[#d8e7ee]">
                <Icon className="h-4 w-4" aria-hidden />
              </div>
              <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#7a746a]">{item.label}</p>
              <h3 className="mt-2 text-sm font-semibold leading-5 text-[#211f1b]">{item.title}</h3>
              <p className="mt-1 text-xs leading-5 text-[#676158]">{item.detail}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
