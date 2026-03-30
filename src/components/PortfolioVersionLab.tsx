"use client";

import { useMemo, useState } from "react";

type VersionKey = "editorial" | "studio" | "command" | "hybrid";

type Version = {
  key: VersionKey;
  label: string;
  audience: string;
  vibe: string;
  blurb: string;
  interactions: string[];
  accentClass: string;
};

const VERSIONS: Version[] = [
  {
    key: "editorial",
    label: "Version A · Editorial",
    audience: "Best for recruiters scanning quickly",
    vibe: "clean · narrative · high readability",
    blurb:
      "A polished magazine-style flow that emphasizes outcomes, internships, and impact metrics first.",
    interactions: ["Sticky section progress", "Expandable project case studies", "Quick compare: skills by role"],
    accentClass: "from-amber-200/70 to-rose-200/70",
  },
  {
    key: "studio",
    label: "Version B · Studio",
    audience: "Best for classmates + engineers",
    vibe: "experimental · playful · visual",
    blurb:
      "A creative lab aesthetic with motion, timeline storytelling, and interactive project playground cards.",
    interactions: ["Cursor spotlight cards", "Project sandbox demos", "Animated skills constellation"],
    accentClass: "from-cyan-200/70 to-indigo-200/70",
  },
  {
    key: "command",
    label: "Version C · Command",
    audience: "Best for technical interviewers",
    vibe: "terminal-inspired · dense · evidence-based",
    blurb:
      "A keyboard-first profile with measurable engineering signals, architecture diagrams, and benchmark snippets.",
    interactions: ["Command palette navigation", "Live architecture toggles", "Role-fit score simulator"],
    accentClass: "from-emerald-200/70 to-lime-200/70",
  },
  {
    key: "hybrid",
    label: "Version D · Hybrid",
    audience: "Best for mixed audiences",
    vibe: "balanced · modern · conversion-focused",
    blurb:
      "A blend of clean recruiter-first structure and rich technical depth, with dynamic CTAs that adapt to visitor intent.",
    interactions: ["Intent-based content priority", "Adaptive CTA strip", "One-click resume + project deep links"],
    accentClass: "from-fuchsia-200/70 to-violet-200/70",
  },
];

export default function PortfolioVersionLab() {
  const [active, setActive] = useState<VersionKey>("editorial");
  const version = useMemo(() => VERSIONS.find((v) => v.key === active) ?? VERSIONS[0], [active]);

  return (
    <section className="mt-8 rounded-3xl border border-zinc-200/80 bg-white/75 p-5 shadow-sm backdrop-blur">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="text-[11px] font-semibold tracking-wide text-zinc-500">INTERACTIVE CONCEPT LAB</div>
          <h2 className="mt-1 text-lg font-semibold text-zinc-900">Try different portfolio versions</h2>
          <p className="mt-1 text-sm text-zinc-600">
            Pick a direction to preview the UX strategy and interaction patterns.
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {VERSIONS.map((item) => (
          <button
            key={item.key}
            onClick={() => setActive(item.key)}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
              active === item.key
                ? "border-zinc-900 bg-zinc-900 text-white"
                : "border-zinc-200 bg-white/80 text-zinc-700 hover:bg-white"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className={`mt-4 rounded-2xl border border-zinc-200 bg-gradient-to-br ${version.accentClass} p-[1px]`}>
        <div className="rounded-2xl bg-white/90 p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-semibold text-zinc-900">{version.label}</h3>
              <p className="text-xs text-zinc-500">{version.audience}</p>
            </div>
            <span className="rounded-full bg-zinc-900 px-2.5 py-1 text-[10px] tracking-wide text-white uppercase">
              {version.vibe}
            </span>
          </div>

          <p className="mt-3 text-sm leading-6 text-zinc-700">{version.blurb}</p>

          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            {version.interactions.map((interaction) => (
              <div
                key={interaction}
                className="rounded-xl border border-zinc-200 bg-white/80 p-3 text-xs text-zinc-700 shadow-sm transition hover:-translate-y-0.5"
              >
                {interaction}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
