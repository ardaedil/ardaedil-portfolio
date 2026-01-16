"use client";

import { useState } from "react";

import ChatPanel from "../src/components/ChatPanel";
import StickyNote from "../src/components/StickyNote";
import { TagPills } from "../src/components/TagPills";
import ModeToggle, { Mode } from "../src/components/ModeToggle";
import ExperienceList from "../src/components/ExperienceList";
import ProjectsList from "../src/components/ProjectsList";
import SkillsSection from "../src/components/SkillsSection";
import TechnicalCourses from "../src/components/TechnicalCourses";
import Dock from "../src/components/Dock";

export default function Home() {
  const [mode, setMode] = useState<Mode>("concise");

  return (
    <main className="paper-bg paper-grain min-h-screen">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-10">
        <div className="grid grid-cols-1 gap-10 lg:gap-12 lg:grid-cols-[minmax(240px,320px)_minmax(0,1fr)]">
          {/* Left sticky note */}
          <StickyNote />

          {/* Main content */}
          <div
            className="w-full justify-self-start"
            style={{ maxWidth: "clamp(860px, 70vw, 1400px)" }}
          >
            {/* Top row: name + toggle */}
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h1 className="font-[var(--font-serif)] text-5xl tracking-tight text-zinc-900">
                  Arda Edil
                </h1>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-700 transition-opacity duration-200">
                  {mode === "concise" ? (
                    <>
                      I’m a sophomore studying Computer Science (BSE) at the University of Michigan, originally
                      from Istanbul, Turkey. I build full-stack, AI-augmented projects and I’m currently
                      looking for a software engineering internship.
                    </>
                  ) : (
                    <>
                      I’m a sophomore studying Computer Science (BSE) at the University of Michigan, based in
                      Ann Arbor, MI, and originally from Istanbul, Turkey. I’m interested in research at the
                      intersection of Human–Computer Interaction (HCI) and applied AI, and I enjoy building
                      full-stack, AI-augmented systems end-to-end.

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

            {/* Tags row */}
            <div className="mt-5">
              <TagPills
                tags={[
                  { label: "SWE", icon: "⌘" },
                  { label: "Full-Stack", icon: "⧉" },
                  { label: "AI-augmented apps", icon: "✦" },
                  { label: "Ann Arbor / Istanbul", icon: "⌂" },
                  { label: "Available to work", icon: "●" },
                ]}
              />
            </div>

            {/* Ask AI section */}
            <section className="mt-8">
              <div className="text-[11px] font-semibold tracking-wide text-zinc-500">
                ASK MY AI ABOUT ME
              </div>

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
                      // Next step: auto-send this chip into ChatPanel.
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>

              <div className="mt-4">
                <ChatPanel />
              </div>
            </section>

            <ExperienceList />
            <ProjectsList />
            <TechnicalCourses />
            <SkillsSection />
          </div>
        </div>
      </div>

      <Dock />
      <div className="h-24" />
    </main>
  );
}
