"use client";

import { Github, Linkedin, Instagram, ArrowUp } from "lucide-react";

export default function Dock() {
  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
      <div className="flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white/75 px-3 py-2 shadow-lg backdrop-blur">
        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/arda-edil-7908b5291/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-xl px-3 py-2 text-zinc-700 hover:bg-zinc-100"
          aria-label="LinkedIn"
          title="LinkedIn"
        >
          <Linkedin className="h-5 w-5" />
        </a>

        {/* Instagram (replacing email) */}
        <a
          href="https://www.instagram.com/arda_edil/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-xl px-3 py-2 text-zinc-700 hover:bg-zinc-100"
          aria-label="Instagram"
          title="Instagram"
        >
          <Instagram className="h-5 w-5" />
        </a>

        {/* GitHub */}
        <a
          href="https://github.com/ardaedil"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-xl px-3 py-2 text-zinc-700 hover:bg-zinc-100"
          aria-label="GitHub"
          title="GitHub"
        >
          <Github className="h-5 w-5" />
        </a>

        <div className="mx-1 h-6 w-px bg-zinc-200" />

        {/* Top */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-zinc-700 hover:bg-zinc-100"
          aria-label="Back to top"
          title="Back to top"
        >
          <ArrowUp className="h-4 w-4" />
          <span className="text-xs">top</span>
        </button>
      </div>
    </div>
  );
}
