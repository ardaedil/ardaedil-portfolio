type Project = {
  role: string;
  name: string;
  dates: string;
  bullets: string[];
  featured?: boolean;
  link?: string;
  badge?: string;
};


const PROJECTS: Project[] = [
  {
    role: "AI Engineer",
    name: "AI Stock Analyzer (RAG + Retrieval)",
    dates: "2024",
    badge: "AI / RAG",
    bullets: [
      "Built a Retrieval-Augmented Generation (RAG) pipeline using LangChain + FAISS for grounded financial Q&A.",
      "Used ReAct-style prompting and retrieval filtering to reduce hallucinations and improve response quality.",
      "Improved prediction accuracy by ~13% in offline evaluation and packaged results into a usable workflow.",
    ],
  },
  {
    role: "Research Engineer",
    name: "OxPal — Biofeedback Research (Published)",
    dates: "2023 — 2024",
    badge: "Publication",
    link: "https://link.springer.com/chapter/10.1007/978-3-031-78561-0_2",
    bullets: [
      "Worked on OxPal, a biofeedback system designed to help children regulate stress via guided breathing.",
      "Contributed to data processing, visualization, and system architecture across device + app workflows.",
      "Co-authored a peer-reviewed Springer publication (HCII 2024).",
    ],
  },
  {
    role: "Full-Stack Engineer",
    name: "AI-Powered Portfolio Website",
    dates: "2026",
    badge: "Full-Stack + AI",
    bullets: [
      "Built a Next.js portfolio with an AI chat panel powered by a custom API route.",
      "Implemented a retrieval system over markdown files to provide grounded, first-person AI answers.",
      "Designed a recruiter-friendly UI with prompt chips, expandable sections, and clean layout.",
    ],
    featured: true,
  },
];


function Card({ p }: { p: Project }) {
  return (
    <div
      className={`group rounded-2xl border ${
        p.featured ? "border-zinc-300" : "border-zinc-200"
      } bg-white/60 p-5 shadow-sm backdrop-blur transition hover:shadow-md`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-semibold text-zinc-900">
            {p.role}
            <span className="text-zinc-500"> — {p.name}</span>
        </div>


          <div className="mt-1 flex flex-wrap items-center gap-2">
            <span className="text-xs text-zinc-500">{p.dates}</span>
            {p.badge ? (
              <span className="rounded-full border border-zinc-200 bg-white/70 px-2 py-[2px] text-[11px] text-zinc-600">
                {p.badge}
              </span>
            ) : null}
            {p.link ? (
              <a
                href={p.link}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-zinc-600 underline decoration-zinc-300 underline-offset-2 hover:text-zinc-900"
              >
                paper / link
              </a>
            ) : null}
          </div>
        </div>
        <div className="rounded-full border border-zinc-200 bg-white/70 px-3 py-1 text-[11px] text-zinc-600 opacity-0 transition group-hover:opacity-100">
          click / hover
        </div>
      </div>

      <ul className="mt-3 space-y-2 text-sm leading-6 text-zinc-700">
        {p.bullets.map((b) => (
          <li key={b} className="flex gap-2">
            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ProjectsList() {
  return (
    <section className="mt-10" id="projects">
      <h2 className="font-[var(--font-serif)] text-2xl text-zinc-900">Projects</h2>
      <div className="mt-4 space-y-4">
        {PROJECTS.map((p) => (
            <Card key={`${p.role}-${p.name}`} p={p} />
        ))}

      </div>
    </section>
  );
}
