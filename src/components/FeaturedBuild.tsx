import { ArrowRight, Check, ExternalLink, GitBranch, ScanSearch } from "lucide-react";

const CAPABILITIES = [
  { label: "Model providers", value: "OpenAI · Anthropic · Gemini" },
  { label: "Interface input", value: "OpenAPI specifications" },
  { label: "Run validation", value: "Deterministic assertions" },
  { label: "Issue analysis", value: "Breaking + warning taxonomy" },
];

const PIPELINE = ["Spec", "Tools", "Tasks", "Agent runs", "Assertions"];

export default function FeaturedBuild() {
  return (
    <section id="featured-build" aria-labelledby="featured-build-heading" className="section-anchor mt-20 sm:mt-28">
      <div className="featured-build overflow-hidden rounded-[24px] border border-[#22333d] bg-[#17232b] text-white shadow-[0_32px_70px_-42px_rgba(10,24,32,0.9)] sm:rounded-[28px]">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-col justify-between p-6 sm:p-9 lg:p-10">
            <div>
              <div className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] text-[#abc3d0]">
                <ScanSearch className="h-4 w-4" aria-hidden />
                FEATURED BUILD
              </div>
              <h2 id="featured-build-heading" className="mt-5 font-[var(--app-font-serif)] text-5xl tracking-[-0.03em] sm:text-6xl">
                AgentSEO
              </h2>
              <p className="mt-5 max-w-lg text-xl font-medium leading-7 text-[#f4f1e9] sm:text-2xl sm:leading-8">
                Testing whether APIs are actually usable by AI agents.
              </p>
              <p className="mt-5 max-w-xl text-sm leading-6 text-[#bdc9cf] sm:text-base sm:leading-7">
                AgentSEO evaluates how reliably AI agents interact with API interfaces and helps uncover the
                patterns that lead to failures, warnings, or degraded agent behavior.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#project-agentseo"
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#f5f1e7] px-5 py-2.5 text-sm font-semibold text-[#17232b] transition hover:-translate-y-0.5 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#17232b] motion-reduce:transform-none"
              >
                View case study <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
              <a
                href="https://github.com/ardaedil/AgentSEO"
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white/50 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#17232b]"
              >
                GitHub <ExternalLink className="h-4 w-4" aria-hidden />
              </a>
            </div>
          </div>

          <div className="border-t border-white/10 bg-[#111b21] p-4 sm:p-7 lg:border-l lg:border-t-0 lg:p-8">
            <div className="h-full rounded-2xl border border-white/12 bg-[#18262e] p-4 shadow-inner sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div>
                  <p className="font-mono text-[10px] tracking-[0.18em] text-[#8fa8b5]">AGENTSEO / EVALUATION</p>
                  <p className="mt-1 text-sm font-semibold text-white">Interface reliability workflow</p>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-[11px] font-medium text-emerald-200">
                  <span className="status-pulse h-1.5 w-1.5 rounded-full bg-emerald-300" aria-hidden />
                  Research MVP active
                </span>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                {CAPABILITIES.map((item) => (
                  <div key={item.label} className="rounded-xl border border-white/10 bg-white/[0.035] p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#829ba8]">{item.label}</p>
                    <p className="mt-2 text-sm font-medium leading-5 text-[#edf2f4]">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-xl border border-white/10 bg-[#10191f] p-4">
                <div className="flex items-center gap-2 text-xs font-medium text-[#aec0c9]">
                  <GitBranch className="h-4 w-4" aria-hidden />
                  Evaluation path
                </div>
                <ol className="mt-4 grid grid-cols-5 gap-1" aria-label="AgentSEO evaluation pipeline">
                  {PIPELINE.map((step, index) => (
                    <li key={step} className="relative text-center">
                      <div className="flex items-center">
                        {index > 0 ? <span className="h-px flex-1 bg-[#426071]" aria-hidden /> : <span className="flex-1" />}
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#658394] bg-[#243944]">
                          <Check className="h-3 w-3 text-[#b8d4e2]" aria-hidden />
                        </span>
                        {index < PIPELINE.length - 1 ? <span className="h-px flex-1 bg-[#426071]" aria-hidden /> : <span className="flex-1" />}
                      </div>
                      <span className="mt-2 block text-[9px] leading-3 text-[#91a7b2] sm:text-[10px]">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-4 flex items-center justify-between rounded-xl border border-[#4f6977]/40 bg-[#253b46]/55 px-4 py-3 text-xs">
                <span className="text-[#a9bbc4]">Evaluation output</span>
                <span className="font-medium text-[#e6eef1]">Traces · outcomes · failure classes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
