"use client";

import { useMemo, useState } from "react";

import ChatPanel from "../src/components/ChatPanel";
import StickyNote from "../src/components/StickyNote";
import { TagPills } from "../src/components/TagPills";
import ModeToggle, { Mode } from "../src/components/ModeToggle";
import ExperienceList from "../src/components/ExperienceList";
import ProjectsList from "../src/components/ProjectsList";
import SkillsSection from "../src/components/SkillsSection";
import TechnicalCourses from "../src/components/TechnicalCourses";
import Dock from "../src/components/Dock";
import PortfolioVersionLab, { DEFAULT_VARIANT, VersionKey } from "../src/components/PortfolioVersionLab";

const TAGS_BY_VARIANT: Record<VersionKey, { label: string; icon: string }[]> = {
  editorial: [
    { label: "SWE", icon: "⌘" },
    { label: "Founder, AgentSEO", icon: "✦" },
    { label: "Full-Stack", icon: "⧉" },
    { label: "AI-augmented apps", icon: "✦" },
    { label: "Ann Arbor / Istanbul", icon: "⌂" },
    { label: "TSA President", icon: "★" },
    { label: "Available to work", icon: "●" },
  ],
  studio: [
    { label: "Creative Engineering", icon: "✶" },
    { label: "AgentSEO Founder", icon: "✦" },
    { label: "Interactive Demos", icon: "◉" },
    { label: "Product Thinking", icon: "△" },
    { label: "Rapid Prototyping", icon: "↻" },
    { label: "Team Collaborator", icon: "✚" },
    { label: "TSA President", icon: "★" },
  ],
  command: [
    { label: "System Design", icon: "#" },
    { label: "Backend APIs", icon: ">_" },
    { label: "AgentSEO", icon: "✦" },
    { label: "Observability", icon: "⎈" },
    { label: "AI Tooling", icon: "λ" },
    { label: "TSA President", icon: "★" },
    { label: "BGTS SWE Intern", icon: "●" },
  ],
  hybrid: [
    { label: "Recruiter-friendly", icon: "✓" },
    { label: "Engineer depth", icon: "⚙" },
    { label: "Startup builder", icon: "✦" },
    { label: "Story + Metrics", icon: "↔" },
    { label: "Fast navigation", icon: "⌘K" },
    { label: "TSA President", icon: "★" },
    { label: "Open to internships", icon: "●" },
  ],
};

const BLURB_BY_VARIANT: Record<VersionKey, string> = {
  editorial:
    "I’m a Computer Science (BSE) student at the University of Michigan, originally from Istanbul, Turkey. I’m building AgentSEO, a startup focused on AI-agent reliability for APIs, alongside BGTS internship engineering on CaseForge and projects like MarioMind and VARLens AI.",
  studio:
    "I’m a University of Michigan CS student and AgentSEO founder who builds playful but practical systems across applied AI, backend engineering, and full-stack product development. Recent work includes CaseForge, MarioMind, and VARLens AI.",
  command:
    "Computer Science (BSE), University of Michigan. Focus: robust backend systems, AI-agent reliability, and measurable engineering outcomes across AgentSEO, BGTS, MarioMind, and VARLens AI. President of the Turkish Student Association (TSA).",
  hybrid:
    "I combine clear storytelling for non-technical readers with deep technical signal for engineers: startup ownership through AgentSEO, full-stack builds, AI-augmented product development, and leadership as President of the Turkish Student Association (TSA).",
};

const SECTION_ORDER: Record<VersionKey, Array<"experience" | "projects" | "courses" | "skills">> = {
  editorial: ["experience", "projects", "courses", "skills"],
  studio: ["projects", "experience", "skills", "courses"],
  command: ["projects", "experience", "courses", "skills"],
  hybrid: ["experience", "projects", "skills", "courses"],
};

const HIGHLIGHTS = [
  { label: "Startup", value: "Founder, AgentSEO", icon: "✦" },
  { label: "Leadership", value: "TSA President", icon: "★" },
  { label: "Focus", value: "Applied AI + Full-Stack", icon: "✦" },
];

export default function Home() {
  const [mode, setMode] = useState<Mode>("concise");
  const [variant, setVariant] = useState<VersionKey>(DEFAULT_VARIANT);

  const orderedSections = useMemo(() => {
    const lookup = {
      experience: <ExperienceList key="experience" />,
      projects: <ProjectsList key="projects" />,
      courses: <TechnicalCourses key="courses" />,
      skills: <SkillsSection key="skills" />,
    };

    return SECTION_ORDER[variant].map((sectionKey) => lookup[sectionKey]);
  }, [variant]);

  return (
    <main className={`paper-bg paper-grain mesh-bg relative min-h-screen overflow-x-clip mode-${variant}`}>
      <div className="ambient-orb ambient-orb-1" aria-hidden />
      <div className="ambient-orb ambient-orb-2" aria-hidden />

      <div className="relative z-10 mx-auto w-full max-w-[1480px] px-4 py-8 sm:px-6 lg:px-10 xl:px-12">
        <div className="institutional-shell grid grid-cols-1 gap-10 rounded-[30px] p-5 sm:p-7 lg:grid-cols-[minmax(240px,320px)_minmax(0,1fr)] lg:gap-12 xl:p-10">
          <StickyNote />

          <div
            className="w-full justify-self-start transition-all duration-300"
            style={{ maxWidth: variant === "command" ? "clamp(920px, 75vw, 1500px)" : "clamp(860px, 70vw, 1400px)" }}
          >
            <section className="gradient-border rounded-[18px] p-[1px]">
              <div className="soft-card rounded-[17px] p-6 sm:p-8">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h1 className="font-[var(--app-font-serif)] text-5xl tracking-tight text-[#101010] sm:text-6xl">Arda Edil</h1>
                    <p className="mt-4 max-w-3xl text-sm leading-6 text-[#45413a] transition-opacity duration-200">
                      {mode === "concise" ? BLURB_BY_VARIANT[variant] : (
                        <>
                          {BLURB_BY_VARIANT[variant]}
                          <br />
                          <br />
                          Outside of engineering, I’m usually watching or playing soccer — I support Galatasaray,
                          and I play for the Michigan futsal club Wolverine F.C.. I’m also involved in Innovation
                          for Impact, a student-led technology consulting organization, and I serve as President of the Turkish Student Association (TSA).
                        </>
                      )}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      className="rounded-full border border-[#d8d2c5] bg-[#fbfaf7] p-2 shadow-sm backdrop-blur hover:bg-white"
                      aria-label="Audio"
                      title="Audio (optional feature)"
                    >
                      <span className="text-[#4c6274]">🔊</span>
                    </button>

                    <ModeToggle mode={mode} setMode={setMode} />
                  </div>
                </div>

                <div className="mt-5">
                  <TagPills tags={TAGS_BY_VARIANT[variant]} />
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {HIGHLIGHTS.map((item) => (
                    <div key={item.label} className="rounded-xl border border-[#d9d4c8] bg-[#fbfaf7]/85 p-3 shadow-sm backdrop-blur">
                      <div className="text-xs font-semibold tracking-wide text-[#756f65]">{item.label}</div>
                      <div className="mt-1 flex items-center gap-2 text-sm font-medium text-[#24211d]">
                        <span>{item.icon}</span>
                        <span>{item.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <PortfolioVersionLab activeVariant={variant} onChange={setVariant} />

            <section className="mt-8 rounded-[18px] border border-[#d8d2c5] bg-[#fbfaf7]/70 p-5 shadow-sm backdrop-blur">
              <div className="text-[11px] font-semibold tracking-wide text-[#756f65]">ASK MY AI ABOUT ME</div>
              <div className="mt-4">
                <ChatPanel />
              </div>
            </section>

            {orderedSections}
          </div>
        </div>
      </div>

      <Dock />
      <div className="h-24" />
    </main>
  );
}
