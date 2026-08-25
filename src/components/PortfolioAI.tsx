import { Sparkles } from "lucide-react";

import ChatPanel from "./ChatPanel";

export default function PortfolioAI() {
  return (
    <section id="ask-ai" aria-labelledby="ask-ai-heading" className="section-anchor mt-20 sm:mt-28">
      <div className="ai-feature rounded-[24px] border border-[#cbd6dc] bg-[#edf4f7] p-5 shadow-[0_26px_60px_-45px_rgba(25,59,75,0.55)] sm:rounded-[28px] sm:p-8 lg:p-10">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] text-[#587385]">
            <Sparkles className="h-4 w-4" aria-hidden />
            PORTFOLIO AI
          </div>
          <h2 id="ask-ai-heading" className="mt-4 text-balance font-[var(--app-font-serif)] text-4xl tracking-[-0.03em] text-[#14222a] sm:text-6xl">
            Ask my portfolio anything.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-[#4f6571] sm:text-base sm:leading-7">
            Don&apos;t want to scroll through everything? Ask my AI about my experience, projects, research, or technical background.
          </p>
        </div>

        <ChatPanel />
      </div>
    </section>
  );
}
