type Experience = {
  title: string;
  org?: string;
  dates: string;
  bullets: string[];
  featured?: boolean;
  link?: string;
};

const EXPERIENCES: Experience[] = [
  {
    title: "Software Engineering Intern",
    org: "BGTS",
    dates: "Jun 2026 - Aug 2026",
    link: "https://github.com/emreakkoyunbgts/ForgeCase",
    bullets: [
      "Owned the CaseForge librarian module, which maps RFP requirements to the past engagements that best prove BGTS capabilities.",
      "Built ranked matching with rationale support so proposal teams could find relevant evidence under deadline pressure.",
      "Defined JSON contracts and implemented validation, error handling, and unit tests across team-owned pipeline components.",
    ],
    featured: true,
  },
  {
    title: "Project Manager & Software Developer",
    org: "Menlo Innovations",
    dates: "Sep 2025 - May 2026",
    bullets: [
      "Led development of a timesheet data system from stakeholder requirements through technical delivery.",
      "Translated requirements into SQLite and SQLAlchemy schemas for reliable operational data storage.",
      "Coordinated Python data-import work across the project team and kept implementation aligned with client needs.",
    ],
  },
  {
    title: "Supply Chain Analyst Intern",
    org: "Setas Masterbatch",
    dates: "Jun 2025 - Aug 2025",
    bullets: [
      "Replaced a k-means demand-segmentation baseline with agglomerative-clustering models in Python and R.",
      "Improved forecast accuracy by 13% and increased on-time material availability by 8 percentage points.",
      "Reduced stockouts by 20% and enabled purchasing decisions 10 days earlier.",
    ],
  },
];

function Card({ exp }: { exp: Experience }) {
  return (
    <div
      className={`group rounded-2xl border ${
        exp.featured ? "border-[#b8cfe0]" : "border-[#d8d2c5]"
      } bg-[#fbfaf7]/70 p-5 shadow-sm backdrop-blur transition hover:bg-[#fffefb] hover:shadow-md`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-semibold text-[#1d1b17]">
            {exp.title}
            {exp.org ? <span className="text-[#716b61]"> - {exp.org}</span> : null}
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <span className="text-xs text-[#756f65]">{exp.dates}</span>
            {exp.link ? (
              <a
                href={exp.link}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-[#4d7793] underline decoration-[#b8cfe0] underline-offset-2 hover:text-[#111111]"
              >
                view repo
              </a>
            ) : null}
          </div>
        </div>
      </div>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-[#49443d]">
        {exp.bullets.map((bullet) => (
          <li key={bullet} className="flex gap-2">
            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#88a9bd]" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ExperienceList() {
  return (
    <section className="mt-10" id="experience">
      <h2 className="font-[var(--font-serif)] text-3xl text-[#111111]">Experience</h2>
      <div className="mt-4 space-y-4">
        {EXPERIENCES.map((experience) => (
          <Card key={`${experience.title}-${experience.org}`} exp={experience} />
        ))}
      </div>
    </section>
  );
}
