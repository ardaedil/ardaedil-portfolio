"use client";

export type VersionKey = "editorial" | "studio" | "command" | "hybrid";

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
    accentClass: "from-[#e8e2d5] to-[#cfe0ea]",
  },
  {
    key: "studio",
    label: "Version B · Studio",
    audience: "Best for classmates + engineers",
    vibe: "experimental · playful · visual",
    blurb:
      "A creative lab aesthetic with motion, timeline storytelling, and interactive project playground cards.",
    interactions: ["Cursor spotlight cards", "Project sandbox demos", "Animated skills constellation"],
    accentClass: "from-[#d7e8ef] to-[#dad6cc]",
  },
  {
    key: "command",
    label: "Version C · Command",
    audience: "Best for technical interviewers",
    vibe: "terminal-inspired · dense · evidence-based",
    blurb:
      "A keyboard-first profile with measurable engineering signals, architecture diagrams, and benchmark snippets.",
    interactions: ["Command palette navigation", "Live architecture toggles", "Role-fit score simulator"],
    accentClass: "from-[#dbe6df] to-[#cbd8d1]",
  },
  {
    key: "hybrid",
    label: "Version D · Hybrid",
    audience: "Best for mixed audiences",
    vibe: "balanced · modern · conversion-focused",
    blurb:
      "A blend of clean recruiter-first structure and rich technical depth, with dynamic CTAs that adapt to visitor intent.",
    interactions: ["Intent-based content priority", "Adaptive CTA strip", "One-click resume + project deep links"],
    accentClass: "from-[#e6ddd4] to-[#cbd9e2]",
  },
];

export const DEFAULT_VARIANT: VersionKey = "editorial";

export default function PortfolioVersionLab({
  activeVariant,
  onChange,
}: {
  activeVariant: VersionKey;
  onChange: (variant: VersionKey) => void;
}) {
  const version = VERSIONS.find((v) => v.key === activeVariant) ?? VERSIONS[0];

  return (
    <section className="mt-8 rounded-[18px] border border-[#d8d2c5] bg-[#fbfaf7]/75 p-5 shadow-sm backdrop-blur">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="text-[11px] font-semibold tracking-wide text-[#756f65]">GLOBAL EXPERIENCE CONTROLLER</div>
          <h2 className="mt-1 text-lg font-semibold text-[#1d1b17]">Switch the entire page mode</h2>
          <p className="mt-1 text-sm text-[#5d574e]">
            Each mode changes section priority, visual tone, and how your profile story is presented.
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {VERSIONS.map((item) => (
          <button
            key={item.key}
            onClick={() => onChange(item.key)}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
              activeVariant === item.key
                ? "border-[#111111] bg-[#111111] text-white"
                : "border-[#d8d2c5] bg-[#fbfaf7]/80 text-[#4f4a42] hover:bg-[#fffefb]"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className={`mt-4 rounded-[16px] border border-[#d8d2c5] bg-gradient-to-br ${version.accentClass} p-[1px]`}>
        <div className="rounded-[15px] bg-[#fffefb]/92 p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-semibold text-[#1d1b17]">{version.label}</h3>
              <p className="text-xs text-[#756f65]">{version.audience}</p>
            </div>
            <span className="rounded-full bg-[#111111] px-2.5 py-1 text-[10px] tracking-wide text-white uppercase">
              {version.vibe}
            </span>
          </div>

          <p className="mt-3 text-sm leading-6 text-[#49443d]">{version.blurb}</p>

          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            {version.interactions.map((interaction) => (
              <div
                key={interaction}
                className="rounded-xl border border-[#d8d2c5] bg-[#fbfaf7]/80 p-3 text-xs text-[#4f4a42] shadow-sm transition hover:-translate-y-0.5"
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
