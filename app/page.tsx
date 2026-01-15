"use client";

import { useState } from "react";
import StickyNote from "../src/components/StickyNote";
import { TagPills } from "../src/components/TagPills";
import ModeToggle, { Mode } from "../src/components/ModeToggle";
import ExperienceList from "../src/components/ExperienceList";
import Dock from "../src/components/Dock";

export default function Home() {
  const [mode, setMode] = useState<Mode>("concise");

  return (
    <main className="paper-bg paper-grain min-h-screen">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[280px_1fr]">
          {/* Left sticky note */}
          <StickyNote />

          {/* Main content */}
          <div>
            {/* Top row: name + toggle */}
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h1 className="font-[var(--font-serif)] text-5xl tracking-tight text-zinc-900">
                  Arda Edil
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-700">
                  Software Engineer pursuing SWE roles. I build reliable, user-focused
                  systems end-to-end (frontend, backend, and deployment), and I’m adding
                  an AI layer to make my portfolio interactive.
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* little “speaker” placeholder like the screenshot */}
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
                  { label: "Ann Arbor / NYC", icon: "⌂" },
                  { label: "Available to work", icon: "●" },
                ]}
              />
            </div>

            {/* “Ask AI” prompt chips section (UI only for now) */}
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
                      // later: hook into ChatPanel. for now: scroll to experience.
                      document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>

              <div className="mt-3 text-xs text-zinc-500">
                Mode is <span className="font-medium text-zinc-700">{mode}</span>. (We’ll
                wire this into the AI chat next.)
              </div>
            </section>

            <div id="experience">
              <ExperienceList />
            </div>
          </div>
        </div>
      </div>

      <Dock />
      <div className="h-24" />
    </main>
  );
}
