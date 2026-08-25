"use client";

import { Command, FileText } from "lucide-react";

const NAV_ITEMS = [
  { label: "Build", href: "#featured-build" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Ask AI", href: "#ask-ai" },
];

export default function SiteNav({ commandOpen, onOpenCommand }: { commandOpen: boolean; onOpenCommand: () => void }) {
  return (
    <nav aria-label="Primary navigation" className="sticky top-3 z-40 -mx-1 rounded-2xl border border-[#d8d2c5]/90 bg-[#f7f5ef]/90 px-3 py-2 shadow-sm backdrop-blur-xl sm:top-5 sm:px-4">
      <div className="flex items-center justify-between gap-3">
        <a
          href="#top"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#17232b] text-xs font-bold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#45677c] focus-visible:ring-offset-2"
          aria-label="Arda Edil, back to top"
        >
          AE
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-lg px-2.5 py-2 text-xs font-medium text-[#5a554d] transition hover:bg-[#ebe7de] hover:text-[#181713] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7893a2]"
            >
              {item.label}
            </a>
          ))}
          <a
            href="/arda-edil-resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="rounded-lg p-2 text-[#5a554d] transition hover:bg-[#ebe7de] hover:text-[#181713] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7893a2]"
            aria-label="Open resume"
            title="Resume"
          >
            <FileText className="h-4 w-4" aria-hidden />
          </a>
        </div>

        <button
          type="button"
          onClick={onOpenCommand}
          className="inline-flex min-h-9 items-center gap-2 rounded-xl border border-[#d3cdc1] bg-[#fbfaf7] px-3 py-2 text-xs font-semibold text-[#514c44] shadow-sm transition hover:border-[#b9c5cc] hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7893a2]"
          aria-haspopup="dialog"
          aria-expanded={commandOpen}
          aria-label="Open search and navigation"
        >
          <Command className="h-3.5 w-3.5" aria-hidden />
          <span className="hidden sm:inline">Search / Navigate</span>
          <kbd className="rounded border border-[#d7d1c5] bg-[#f1eee7] px-1.5 py-0.5 font-sans text-[10px] text-[#6a645b]">⌘/Ctrl K</kbd>
        </button>
      </div>
    </nav>
  );
}
