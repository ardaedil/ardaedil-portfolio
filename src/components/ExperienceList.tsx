type Experience = {
  title: string;
  org?: string;
  dates: string;
  bullets: string[];
  featured?: boolean;
};

const EXPERIENCES: Experience[] = [
  {
    title: "Building systems that help people ship software",
    dates: "2025 — Present",
    bullets: [
      "Replace this with your best SWE experience / project.",
      "Add measurable impact: latency ↓, users ↑, revenue ↑, etc.",
    ],
    featured: true,
  },
  {
    title: "Software Engineering Project — Full Stack",
    org: "Personal / School",
    dates: "2024 — 2025",
    bullets: [
      "Built X using Next.js / React / Node / PostgreSQL.",
      "Implemented auth, caching, and deployment pipeline.",
    ],
  },
  {
    title: "Systems / Data Structures Work",
    org: "Coursework",
    dates: "2023 — 2024",
    bullets: [
      "C++ projects focusing on performance + correctness.",
      "Testing, debugging, and edge-case handling.",
    ],
  },
];

function Card({ exp }: { exp: Experience }) {
  return (
    <div
      className={`group rounded-2xl border ${
        exp.featured ? "border-zinc-300" : "border-zinc-200"
      } bg-white/60 p-5 shadow-sm backdrop-blur transition hover:shadow-md`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-semibold text-zinc-900">
            {exp.title}
            {exp.org ? <span className="text-zinc-500"> — {exp.org}</span> : null}
          </div>
          <div className="mt-1 text-xs text-zinc-500">{exp.dates}</div>
        </div>
        <div className="rounded-full border border-zinc-200 bg-white/70 px-3 py-1 text-[11px] text-zinc-600 opacity-0 transition group-hover:opacity-100">
          click / hover
        </div>
      </div>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-zinc-700">
        {exp.bullets.map((b) => (
          <li key={b} className="flex gap-2">
            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ExperienceList() {
  return (
    <section className="mt-10">
      <h2 className="font-[var(--font-serif)] text-2xl text-zinc-900">Experience</h2>
      <div className="mt-4 space-y-4">
        {EXPERIENCES.map((exp) => (
          <Card key={exp.title} exp={exp} />
        ))}
      </div>
    </section>
  );
}
