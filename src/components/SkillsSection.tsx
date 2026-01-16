type SkillGroup = {
  title: string;
  skills: string[];
};

const SKILLS: SkillGroup[] = [
  {
    title: "Languages",
    skills: ["Java", "Python", "TypeScript", "JavaScript", "C++", "SQL"],
  },
  {
    title: "Frontend",
    skills: ["React", "Next.js", "Tailwind CSS", "HTML/CSS"],
  },
  {
    title: "Backend",
    skills: ["Node.js", "REST APIs", "PostgreSQL", "Authentication", "Caching"],
  },
  {
    title: "AI / Data",
    skills: [
      "Retrieval-Augmented Generation (RAG)",
      "LangChain",
      "FAISS",
      "scikit-learn",
      "Clustering",
      "Forecasting",
    ],
  },
  {
    title: "Tools & Practices",
    skills: ["Git", "Agile / Scrum", "System Design", "Testing", "CI/CD"],
  },
];

function SkillPill({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-zinc-200 bg-white/70 px-3 py-1 text-xs text-zinc-700 shadow-sm">
      {label}
    </span>
  );
}

export default function SkillsSection() {
  return (
    <section className="mt-16" id="skills">
      <h2 className="font-[var(--font-serif)] text-2xl text-zinc-900">Skills</h2>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SKILLS.map((group) => (
          <div
            key={group.title}
            className="rounded-2xl border border-zinc-200 bg-white/60 p-5 shadow-sm backdrop-blur"
          >
            <div className="text-sm font-semibold text-zinc-900">
              {group.title}
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {group.skills.map((s) => (
                <SkillPill key={s} label={s} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
