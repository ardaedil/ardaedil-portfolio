type Experience = {
  title: string;
  org?: string;
  dates: string;
  bullets: string[];
  featured?: boolean;
};

const EXPERIENCES: Experience[] = [
  {
    title: "Student Software Consultant & Product Manager",
    org: "Menlo Innovations",
    dates: "2025 September — Present",
    bullets: [
      "Building and leading development of Project Punch, a Java-based timesheet submission and validation system for Menlo Innovations.",
      "Automating email-based intake using JavaMail and SQL-backed workflows to validate, track, and persist submissions.",
      "Reducing weekly operational prep time from ~2 hours to ~15 minutes through end-to-end automation.",
      "Leading requirements and sprint planning for data ingestion features, coordinating engineers and stakeholders through delivery.",
    ],
    featured: true,
    },

  {
    title: "Supply Chain Analyst Intern",
    org: "Setas Masterbatch",
    dates: "Jun 2024 — Jul 2024",
    bullets: [
      "Built demand forecasting models under Dr. M. Emre Sener using Python and scikit-learn.",
      "Improved forecast accuracy by ~13% by replacing k-means with agglomerative clustering.",
      "Reduced stockouts by ~20% and increased on-time material availability by +8 percentage points.",
      "Enabled purchasing ~10 days earlier through improved planning and supplier coordination.",
    ],
  },
  {
    title: "Software Developer",
    org: "Lore",
    dates: "2025 January — 2025 April",
    bullets: [
      "Built full-stack product features using React and Node.js.",
      "Worked across frontend and backend to ship user-facing flows and integrations.",
      "Collaborated closely with designers and engineers to iterate quickly and deliver production features.",
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
    <section className="mt-10" id="experience">
      <h2 className="font-[var(--font-serif)] text-2xl text-zinc-900">Experience</h2>
      <div className="mt-4 space-y-4">
        {EXPERIENCES.map((exp) => (
          <Card key={`${exp.title}-${exp.org}`} exp={exp} />
        ))}
      </div>
    </section>
  );
}
