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
import PortfolioVersionLab, {
  DEFAULT_VARIANT,
  VersionKey,
} from "../src/components/PortfolioVersionLab";

const TAGS_BY_VARIANT: Record<VersionKey, { label: string; icon: string }[]> = {
  editorial: [
    { label: "SWE", icon: "⌘" },
    { label: "Full-Stack", icon: "⧉" },
    { label: "AI-augmented apps", icon: "✦" },
    { label: "Ann Arbor / Istanbul", icon: "⌂" },
    { label: "Available to work", icon: "●" },
  ],
  studio: [
    { label: "Creative Engineering", icon: "✶" },
    { label: "Interactive Demos", icon: "◉" },
    { label: "Product Thinking", icon: "△" },
    { label: "Rapid Prototyping", icon: "↻" },
    { label: "Team Collaborator", icon: "✚" },
  ],
  command: [
    { label: "System Design", icon: "#" },
    { label: "Backend APIs", icon: ">_" },
    { label: "Observability", icon: "⎈" },
    { label: "AI Tooling", icon: "λ" },
    { label: "Internship-ready", icon: "●" },
  ],
  hybrid: [
    { label: "Recruiter-friendly", icon: "✓" },
    { label: "Engineer depth", icon: "⚙" },
    { label: "Story + Metrics", icon: "↔" },
    { label: "Fast navigation", icon: "⌘K" },
    { label: "Open to internships", icon: "●" },
  ],
};

const BLURB_BY_VARIANT: Record<VersionKey, string> = {
  editorial:
    "I’m a sophomore studying Computer Science (BSE) at the University of Michigan, originally from Istanbul, Turkey. I build full-stack, AI-augmented projects and I’m currently looking for a software engineering internship.",
  studio:
    "I’m a sophomore CS student at the University of Michigan who loves building playful yet practical products. I explore HCI + AI through rapid experiments, then ship polished full-stack experiences.",
  command:
    "Computer Science (BSE), University of Michigan. Focus: robust backend systems, AI-assisted workflows, and measurable engineering outcomes. Seeking software engineering internship opportunities.",
  hybrid:
    "I combine clear storytelling for non-technical readers with deep technical signal for engineers: full-stack builds, AI-augmented product development, and a strong execution mindset.",
};

const SECTION_ORDER: Record<VersionKey, Array<"experience" | "projects" | "courses" | "skills">> = {
  editorial: ["experience", "projects", "courses", "skills"],
  studio: ["projects", "experience", "skills", "courses"],
  command: ["projects", "experience", "courses", "skills"],
  hybrid: ["experience", "projects", "skills", "courses"],
};

export default function Home() {
  const [mode, setMode] = useState<Mode>("concise");
  const [variant, setVariant] = useState<VersionKey>(DEFAULT_VARIANT);
  const [queuedQuestion, setQueuedQuestion] = useState<{ id: number; text: string } | null>(null);

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
    <main className={`paper-bg paper-grain min-h-screen mode-${variant}`}>
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-10">
        <div className="grid grid-cols-1 gap-10 lg:gap-12 lg:grid-cols-[minmax(240px,320px)_minmax(0,1fr)]">
          <StickyNote />

          <div
            className="w-full justify-self-start transition-all duration-300"
            style={{ maxWidth: variant === "command" ? "clamp(920px, 75vw, 1500px)" : "clamp(860px, 70vw, 1400px)" }}
          >
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h1 className="font-[var(--app-font-serif)] text-5xl tracking-tight text-zinc-900">Arda Edil</h1>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-700 transition-opacity duration-200">
                  {mode === "concise" ? BLURB_BY_VARIANT[variant] : (
                    <>
                      {BLURB_BY_VARIANT[variant]}
                      <br />
                      <br />
                      Outside of engineering, I’m usually watching or playing soccer — I support Galatasaray,
                      and I play for the Michigan futsal club Wolverine F.C.. I’m also involved in Innovation
                      for Impact, a student-led technology consulting organization.
                    </>
                  )}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  className="rounded-full border border-zinc-200 bg-white/70 p-2 shadow-sm backdrop-blur hover:bg-white"
                  aria-label="Audio"
                  title="Audio (optional feature)"
                >
                  <span className="text-zinc-600">🔊</span>
                </button>

                <ModeToggle mode={mode} setMode={setMode} />
              </div>
            </div>

            <div className="mt-5">
              <TagPills tags={TAGS_BY_VARIANT[variant]} />
            </div>

            <PortfolioVersionLab activeVariant={variant} onChange={setVariant} />

            <section className="mt-8">
              <div className="text-[11px] font-semibold tracking-wide text-zinc-500">ASK MY AI ABOUT ME</div>

              <div className="mt-3 flex flex-wrap gap-2">
                {[
                  "Summarize my experience for a SWE role",
                  "What are my strongest technical skills?",
                  "Which projects show backend skills?",
                  "How do I approach engineering problems?",
                  "What tech stack do I use most?",
                ].map((q) => (
                  <button
                    key={q}
                    className="rounded-full border border-zinc-200 bg-white/60 px-3 py-2 text-xs text-zinc-700 shadow-sm backdrop-blur hover:bg-white"
                    onClick={() => {
                      setQueuedQuestion({ id: Date.now(), text: q });
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>

              <div className="mt-4">
                <ChatPanel queuedQuestion={queuedQuestion} />
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
