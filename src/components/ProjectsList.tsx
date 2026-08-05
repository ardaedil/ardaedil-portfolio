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
    role: "Machine Learning Engineer",
    name: "MarioMind",
    dates: "2026",
    badge: "Deep RL",
    link: "https://github.com/ardaedil/Mario-Mind",
    bullets: [
      "Built a reproducible reinforcement-learning lab for controlled World 1-1 experiments with DQN and Double DQN agents.",
      "Implemented configurable reward shaping, frame stacking, exploration schedules, replay buffers, and action spaces.",
      "Added random, always-right, and reflex baselines plus experiment plots and failure summaries for meaningful comparisons.",
    ],
  },
  {
    role: "Full-Stack ML Engineer",
    name: "VARLens AI",
    dates: "2026",
    badge: "Video AI",
    link: "https://github.com/ardaedil/varlens-ai",
    bullets: [
      "Built an educational soccer clip analysis MVP that estimates foul sanctions and action types with uncertainty-aware explanations.",
      "Connected a Next.js interface to a FastAPI service with shared JSON and TypeScript/Python contracts.",
      "Added VideoMAE checkpoint serving, transient upload handling, automated tests, and deterministic fallbacks for reliable development.",
    ],
  },
  {
    role: "AI Engineer",
    name: "AI Stock Analyzer (RAG + Retrieval)",
    dates: "2024",
    badge: "AI / RAG",
    bullets: [
      "Built a retrieval-augmented generation pipeline using LangChain and FAISS for grounded financial Q&A.",
      "Used ReAct-style prompting and retrieval filtering to reduce hallucinations and improve response quality.",
      "Improved answer quality by 18% in evaluation and packaged the results into a usable workflow.",
    ],
  },
  {
    role: "Research Assistant",
    name: "OxPal - Biofeedback Research",
    dates: "2024",
    badge: "Published Research",
    link: "https://link.springer.com/chapter/10.1007/978-3-031-78561-0_2",
    bullets: [
      "Designed a child-friendly biofeedback system using PPG-based HRV sensing, Bluetooth communication, and guided breathing.",
      "Contributed to the system architecture and interactive interface with a multidisciplinary research team.",
      "Presented the work at HCI International 2024 and contributed to a Springer CCIS publication.",
    ],
  },
  {
    role: "Software Engineer",
    name: "Lore",
    dates: "2025",
    badge: "Mobile + Backend",
    link: "https://github.com/Innovation-for-Impact/Lore",
    bullets: [
      "Worked on an Innovation for Impact mobile app for University of Michigan student community building.",
      "Built React Native and Expo user-facing flows, navigation patterns, onboarding, and reusable UI components.",
      "Integrated frontend features with Django REST Framework backend APIs and typed OpenAPI-generated contracts.",
    ],
  },
  {
    role: "Full-Stack Engineer",
    name: "AI-Powered Portfolio Website",
    dates: "2026",
    badge: "Full-Stack + AI",
    bullets: [
      "Built a Next.js portfolio with an AI chat panel powered by a custom API route.",
      "Implemented retrieval over portfolio content to provide grounded, first-person answers.",
      "Designed a recruiter-friendly interface with multiple viewing modes and responsive project cards.",
    ],
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
            <span className="text-zinc-500"> - {p.name}</span>
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
                view project
              </a>
            ) : null}
          </div>
        </div>
      </div>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-zinc-700">
        {p.bullets.map((bullet) => (
          <li key={bullet} className="flex gap-2">
            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400" />
            <span>{bullet}</span>
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
        {PROJECTS.map((project) => (
          <Card key={`${project.role}-${project.name}`} p={project} />
        ))}
      </div>
    </section>
  );
}
