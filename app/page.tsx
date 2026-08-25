"use client";

import { useState } from "react";

import CommandPalette from "../src/components/CommandPalette";
import Dock from "../src/components/Dock";
import ExperienceList from "../src/components/ExperienceList";
import FeaturedBuild from "../src/components/FeaturedBuild";
import Hero from "../src/components/Hero";
import NowSection from "../src/components/NowSection";
import PortfolioAI from "../src/components/PortfolioAI";
import ProjectsList from "../src/components/ProjectsList";
import SiteNav from "../src/components/SiteNav";
import SkillsSection from "../src/components/SkillsSection";
import StickyNote from "../src/components/StickyNote";
import TechnicalCourses from "../src/components/TechnicalCourses";

function scrollToSection(id: string, focusSelector?: string) {
  const section = document.getElementById(id);
  section?.scrollIntoView({ behavior: "smooth", block: "start" });

  if (focusSelector) {
    window.setTimeout(() => {
      document.querySelector<HTMLElement>(focusSelector)?.focus({ preventScroll: true });
    }, 550);
  }
}

export default function Home() {
  const [paletteOpen, setPaletteOpen] = useState(false);

  const askMyAI = () => scrollToSection("ask-ai", "#portfolio-ai-input");

  return (
    <main id="top" className="paper-bg paper-grain mesh-bg relative min-h-screen overflow-x-clip">
      <div className="ambient-orb ambient-orb-1" aria-hidden />
      <div className="ambient-orb ambient-orb-2" aria-hidden />

      <div className="relative z-10 mx-auto w-full max-w-[1480px] px-3 py-3 sm:px-6 sm:py-6 lg:px-10 lg:py-8 xl:px-12">
        <div className="institutional-shell grid grid-cols-1 gap-8 rounded-[24px] p-4 sm:rounded-[30px] sm:p-7 xl:grid-cols-[minmax(240px,300px)_minmax(0,1fr)] xl:gap-12 xl:p-10">
          <StickyNote />

          <div className="min-w-0 w-full max-w-[1040px] justify-self-start">
            <SiteNav commandOpen={paletteOpen} onOpenCommand={() => setPaletteOpen(true)} />
            <Hero onAskAI={askMyAI} />
            <FeaturedBuild />
            <NowSection />
            <PortfolioAI />

            <div className="mt-20 border-t border-[#d8d2c5] pt-4 sm:mt-24">
              <ExperienceList />
              <ProjectsList />
              <TechnicalCourses />
              <SkillsSection />
            </div>
          </div>
        </div>
      </div>

      <CommandPalette
        open={paletteOpen}
        onOpenChange={setPaletteOpen}
        onAskAI={askMyAI}
      />
      <Dock />
      <div className="h-24" />
    </main>
  );
}
