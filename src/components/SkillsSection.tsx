type Skill = {
  name: string;
  detail: string;
  badge: string;
  accent: string;
  logo?: string;
};

const SKILLS: Skill[] = [
  {
    name: "Python",
    detail: "Backend / Scripting",
    badge: "PY",
    accent: "bg-[#4f6f86]",
    logo: "https://cdn.simpleicons.org/python/ffffff",
  },
  {
    name: "TypeScript",
    detail: "Full-Stack Apps",
    badge: "TS",
    accent: "bg-[#4d7793]",
    logo: "https://cdn.simpleicons.org/typescript/ffffff",
  },
  {
    name: "JavaScript",
    detail: "Web Development",
    badge: "JS",
    accent: "bg-[#d8cfaa] text-zinc-950",
    logo: "https://cdn.simpleicons.org/javascript/111111",
  },
  {
    name: "React",
    detail: "Frontend UI",
    badge: "RE",
    accent: "bg-[#b8d3e2] text-zinc-950",
    logo: "https://cdn.simpleicons.org/react/111111",
  },
  {
    name: "Next.js",
    detail: "Portfolio / Apps",
    badge: "NX",
    accent: "bg-[#111111]",
    logo: "https://cdn.simpleicons.org/nextdotjs/ffffff",
  },
  {
    name: "Tailwind CSS",
    detail: "Interface Styling",
    badge: "TW",
    accent: "bg-[#6f9fb5]",
    logo: "https://cdn.simpleicons.org/tailwindcss/ffffff",
  },
  {
    name: "Node.js",
    detail: "Backend Services",
    badge: "NO",
    accent: "bg-[#6f8566]",
    logo: "https://cdn.simpleicons.org/nodedotjs/ffffff",
  },
  {
    name: "FastAPI",
    detail: "Python APIs",
    badge: "FA",
    accent: "bg-[#5b847e]",
    logo: "https://cdn.simpleicons.org/fastapi/ffffff",
  },
  {
    name: "SQLAlchemy",
    detail: "Data Modeling",
    badge: "SA",
    accent: "bg-[#9a5946]",
    logo: "https://cdn.simpleicons.org/sqlalchemy/ffffff",
  },
  {
    name: "SQLite",
    detail: "Databases",
    badge: "SQL",
    accent: "bg-[#324e5c]",
    logo: "https://cdn.simpleicons.org/sqlite/ffffff",
  },
  {
    name: "PyTorch",
    detail: "Machine Learning",
    badge: "PT",
    accent: "bg-[#b55f47]",
    logo: "https://cdn.simpleicons.org/pytorch/ffffff",
  },
  {
    name: "LangChain",
    detail: "AI Workflows",
    badge: "LC",
    accent: "bg-[#304c49]",
    logo: "https://cdn.simpleicons.org/langchain/ffffff",
  },
  {
    name: "FAISS",
    detail: "Vector Search",
    badge: "FS",
    accent: "bg-[#4d5874]",
  },
  {
    name: "Java",
    detail: "Programming",
    badge: "JV",
    accent: "bg-[#b76f39]",
    logo: "https://cdn.simpleicons.org/openjdk/ffffff",
  },
  {
    name: "C/C++",
    detail: "Systems Foundations",
    badge: "C++",
    accent: "bg-[#3f6685]",
    logo: "https://cdn.simpleicons.org/cplusplus/ffffff",
  },
  {
    name: "R",
    detail: "Data Analysis",
    badge: "R",
    accent: "bg-[#587aa5]",
    logo: "https://cdn.simpleicons.org/r/ffffff",
  },
  {
    name: "Git & GitHub",
    detail: "Version Control",
    badge: "GH",
    accent: "bg-[#111111]",
    logo: "https://cdn.simpleicons.org/github/ffffff",
  },
  {
    name: "Testing",
    detail: "Reliable Delivery",
    badge: "OK",
    accent: "bg-[#5c7d69]",
  },
];

function SkillCard({ skill }: { skill: Skill }) {
  return (
    <div className="group flex min-h-20 items-center gap-3 rounded-2xl border border-[#d8d2c5] bg-[#fbfaf7]/70 p-3 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-[#c8c0b1] hover:bg-[#fffefb] hover:shadow-md">
      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${skill.accent} shadow-sm`}>
        {skill.logo ? (
          <span
            aria-hidden
            className="h-6 w-6 bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${skill.logo})` }}
          />
        ) : (
          <span className="text-xs font-bold text-white">{skill.badge}</span>
        )}
      </div>

      <div className="min-w-0">
        <div className="truncate text-sm font-semibold text-[#1d1b17]">{skill.name}</div>
        <div className="mt-0.5 truncate text-xs font-medium text-[#756f65]">{skill.detail}</div>
      </div>
    </div>
  );
}

export default function SkillsSection() {
  return (
    <section className="section-anchor mt-16" id="skills">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wide text-[#756f65]">Technical Toolkit</div>
          <h2 className="font-[var(--font-serif)] text-4xl text-[#111111] sm:text-5xl">Skills</h2>
        </div>
        <div className="text-sm text-[#756f65]">Languages, frameworks, AI tools, and delivery practices</div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {SKILLS.map((skill) => (
          <SkillCard key={skill.name} skill={skill} />
        ))}
      </div>
    </section>
  );
}
