"use client";

import {
  ArrowUp,
  BriefcaseBusiness,
  Code2,
  FileText,
  Github,
  GraduationCap,
  Instagram,
  Linkedin,
  Search,
  Sparkles,
  Wrench,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { EXPERIENCES } from "./ExperienceList";
import { PROJECTS } from "./ProjectsList";

type CommandItem = {
  id: string;
  label: string;
  description: string;
  href?: string;
  action?: "ask-ai";
  external?: boolean;
  icon: LucideIcon;
  keywords: string;
};

const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function editDistance(left: string, right: string) {
  const previous = Array.from({ length: right.length + 1 }, (_, index) => index);
  for (let leftIndex = 1; leftIndex <= left.length; leftIndex += 1) {
    const current = [leftIndex];
    for (let rightIndex = 1; rightIndex <= right.length; rightIndex += 1) {
      current[rightIndex] = Math.min(
        current[rightIndex - 1] + 1,
        previous[rightIndex] + 1,
        previous[rightIndex - 1] + (left[leftIndex - 1] === right[rightIndex - 1] ? 0 : 1)
      );
    }
    previous.splice(0, previous.length, ...current);
  }
  return previous[right.length];
}

function matchesFuzzy(query: string, text: string) {
  const normalizedQuery = query.toLowerCase().trim();
  const normalizedText = text.toLowerCase();
  if (!normalizedQuery) return true;
  if (normalizedText.includes(normalizedQuery)) return true;

  const textWords = normalizedText.split(/[^a-z0-9+#.]+/).filter(Boolean);
  return normalizedQuery.split(/\s+/).every((queryWord) => textWords.some((textWord) => {
    if (textWord.includes(queryWord) || (textWord.length >= 3 && queryWord.includes(textWord))) return true;
    if (Math.abs(textWord.length - queryWord.length) > 1) return false;
    return editDistance(queryWord, textWord) <= (queryWord.length >= 7 ? 2 : 1);
  }));
}

function isEditableTarget(target: EventTarget | null) {
  const element = target as HTMLElement | null;
  return Boolean(element?.closest("input, textarea, select, [contenteditable='true']"));
}

export default function CommandPalette({
  open,
  onOpenChange,
  onAskAI,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAskAI: () => void;
}) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  const commands = useMemo<CommandItem[]>(() => {
    const primary: CommandItem[] = [
      { id: "ask-ai", label: "Ask Arda's AI", description: "Ask about projects, experience, or skills", action: "ask-ai", icon: Sparkles, keywords: "agent ai chat question portfolio" },
      { id: "featured-agentseo", label: "View AgentSEO", description: "Featured build and AI-agent reliability work", href: "#featured-build", icon: Wrench, keywords: "agent api reliability startup machine learning founder" },
      { id: "projects", label: "View Projects", description: "Selected software and applied AI builds", href: "#projects", icon: Code2, keywords: "work software machine learning rag computer vision reinforcement learning" },
      { id: "experience", label: "Experience", description: "Startup, internship, and consulting experience", href: "#experience", icon: BriefcaseBusiness, keywords: "work bgts menlo setas caseforge internship" },
      { id: "research", label: "Research & Applied ML", description: "Agent reliability, RL, RAG, and computer vision", href: "#projects", icon: GraduationCap, keywords: "research machine learning ai agent mario mind rag varlens computer vision" },
      { id: "skills", label: "Skills", description: "Languages, frameworks, and technical tools", href: "#skills", icon: Wrench, keywords: "python typescript react fastapi pytorch ai ml technical" },
      { id: "resume", label: "Resume", description: "Open Arda's résumé", href: "/arda-edil-resume.pdf", external: true, icon: FileText, keywords: "cv education resume" },
      { id: "github", label: "GitHub", description: "github.com/ardaedil", href: "https://github.com/ardaedil", external: true, icon: Github, keywords: "source code repositories repos" },
      { id: "linkedin", label: "LinkedIn", description: "Connect with Arda", href: "https://www.linkedin.com/in/arda-edil-7908b5291/", external: true, icon: Linkedin, keywords: "social contact professional" },
      { id: "instagram", label: "Instagram", description: "Follow Arda", href: "https://www.instagram.com/arda_edil/", external: true, icon: Instagram, keywords: "social contact" },
      { id: "top", label: "Back to Top", description: "Return to the opening", href: "#top", icon: ArrowUp, keywords: "about home hero arda" },
    ];

    const projectCommands: CommandItem[] = PROJECTS.map((project) => ({
      id: `project-${slugify(project.name)}`,
      label: project.name,
      description: project.role,
      href: `#project-${slugify(project.name)}`,
      icon: Code2,
      keywords: `${project.badge ?? ""} ${project.bullets.join(" ")} ${/\bML\b|machine learning|\bAI\b/i.test(`${project.role} ${project.badge ?? ""}`) ? "machine learning applied ai" : ""}`,
    }));

    const experienceCommands: CommandItem[] = EXPERIENCES.map((experience) => ({
      id: `experience-${slugify(`${experience.org ?? ""}-${experience.title}`)}`,
      label: experience.org ? `${experience.org} — ${experience.title}` : experience.title,
      description: experience.dates,
      href: `#experience-${slugify(`${experience.org ?? ""}-${experience.title}`)}`,
      icon: BriefcaseBusiness,
      keywords: experience.bullets.join(" "),
    }));

    return [...primary, ...projectCommands, ...experienceCommands];
  }, []);

  const filtered = useMemo(
    () => commands.filter((command) => matchesFuzzy(query, `${command.label} ${command.description} ${command.keywords}`)),
    [commands, query]
  );

  const close = useCallback(() => {
    setQuery("");
    setActiveIndex(0);
    onOpenChange(false);
  }, [onOpenChange]);

  const runCommand = useCallback(
    (command: CommandItem) => {
      close();
      if (command.action === "ask-ai") {
        window.setTimeout(onAskAI, 80);
        return;
      }
      if (!command.href) return;
      if (command.external || command.href.startsWith("http")) {
        window.open(command.href, "_blank", "noopener,noreferrer");
        return;
      }

      const target = document.querySelector<HTMLElement>(command.href);
      window.setTimeout(() => target?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
    },
    [close, onAskAI]
  );

  useEffect(() => {
    const onShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        if (!open && isEditableTarget(event.target)) return;
        event.preventDefault();
        if (open) close();
        else onOpenChange(true);
      }
    };

    document.addEventListener("keydown", onShortcut);
    return () => document.removeEventListener("keydown", onShortcut);
  }, [close, onOpenChange, open]);

  useEffect(() => {
    if (!open) return;
    previousFocus.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    window.requestAnimationFrame(() => inputRef.current?.focus());

    return () => {
      document.body.style.overflow = "";
      previousFocus.current?.focus();
    };
  }, [open]);

  if (!open) return null;

  const handleDialogKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => (filtered.length ? (index + 1) % filtered.length : 0));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => (filtered.length ? (index - 1 + filtered.length) % filtered.length : 0));
    } else if (event.key === "Enter" && document.activeElement === inputRef.current && filtered[activeIndex]) {
      event.preventDefault();
      runCommand(filtered[activeIndex]);
    } else if (event.key === "Tab") {
      const focusable = Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]), input, a[href], [tabindex]:not([tabindex="-1"])') ?? []
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center bg-[#0a0d0f]/55 px-3 pt-[10vh] backdrop-blur-sm sm:pt-[14vh]" onMouseDown={close}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="command-title"
        onKeyDown={handleDialogKeyDown}
        className="command-dialog w-full max-w-2xl overflow-hidden rounded-[22px] border border-[#cad1d4] bg-[#f8f7f3] shadow-[0_35px_100px_-35px_rgba(0,0,0,0.85)]"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-[#d8d2c5] px-4 sm:px-5">
          <Search className="h-5 w-5 shrink-0 text-[#637580]" aria-hidden />
          <label htmlFor="command-search" id="command-title" className="sr-only">Search and navigate</label>
          <input
            ref={inputRef}
            id="command-search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActiveIndex(0);
            }}
            placeholder="Search projects, skills, or navigate…"
            autoComplete="off"
            aria-controls="command-results"
            aria-activedescendant={filtered[activeIndex] ? `command-option-${filtered[activeIndex].id}` : undefined}
            className="h-16 w-full bg-transparent text-base text-[#1b1a17] outline-none placeholder:text-[#989188]"
          />
          <button type="button" onClick={close} aria-label="Close command palette" className="rounded-lg p-2 text-[#6b655c] hover:bg-[#ebe7de] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7893a2]">
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>

        <div id="command-results" className="max-h-[min(58vh,480px)] overflow-y-auto p-2" role="listbox" aria-label="Commands">
          {filtered.length ? filtered.map((command, index) => {
            const Icon = command.icon;
            const active = index === activeIndex;
            return (
              <button
                type="button"
                key={command.id}
                id={`command-option-${command.id}`}
                role="option"
                aria-selected={active}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => runCommand(command)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7893a2] ${active ? "bg-[#e6edf0]" : "hover:bg-[#efede7]"}`}
              >
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${active ? "bg-[#17303d] text-white" : "border border-[#d8d2c5] bg-white text-[#5c6e78]"}`}>
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-[#1f1d19]">{command.label}</span>
                  <span className="mt-0.5 block truncate text-xs text-[#746e65]">{command.description}</span>
                </span>
                <span className="text-xs text-[#90897f]" aria-hidden>↵</span>
              </button>
            );
          }) : (
            <div className="px-4 py-12 text-center text-sm text-[#746e65]">No matches. Try “agent”, “machine learning”, or “research”.</div>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-[#d8d2c5] px-4 py-2 text-[10px] text-[#837c72] sm:px-5">
          <span>↑↓ Navigate · Enter Select</span>
          <span>Esc Close</span>
        </div>
      </div>
    </div>
  );
}
