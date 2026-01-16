type Course = {
  code: string;
  title: string;
  description: string;
};

const COURSES: Course[] = [
   {
    code: "EECS 201",
    title: "Computer Science Pragmatics",
    description:
    "Unix, scripting, build systems, version control, debugging, and tooling used in real-world software development.",
  },
  {
    code: "EECS 203",
    title: "Discrete Mathematics",
    description:
      "Logic, proofs, sets, graphs, and combinatorics—foundations for algorithms, correctness, and complexity reasoning.",
  },
  {
    code: "EECS 280",
    title: "Programming & Data Structures",
    description:
      "Object-oriented programming in C++, data abstraction, memory management, and building medium-scale software systems.",
  },
  {
    code: "EECS 281",
    title: "Data Structures & Algorithms",
    description:
      "Algorithm design and analysis using trees, graphs, hash tables, and priority queues, with a focus on performance tradeoffs.",
  },
  {
    code: "EECS 370",
    title: "Computer Organization",
    description:
      "How software maps to hardware—assembly, memory hierarchy, processors, and performance-aware systems programming.",
  },
  {
    code: "EECS 376",
    title: "Foundations of Computer Science",
    description:
      "Theory of computation, automata, computability, and complexity—formal reasoning about what problems are solvable.",
  },
  {
    code: "EECS 492",
    title: "Introduction to Artificial Intelligence",
    description:
      "Search, planning, probabilistic reasoning, and machine learning foundations for building intelligent systems.",
  },
];

export default function TechnicalCourses() {
  return (
    <section className="mt-16">
      <h2 className="font-[var(--font-serif)] text-2xl text-zinc-900">
        Technical Coursework
      </h2>

      <div className="mt-4 space-y-4">
        {COURSES.map((c) => (
          <div
            key={c.code}
            className="rounded-2xl border border-zinc-200 bg-white/60 p-5 shadow-sm backdrop-blur"
          >
            <div className="text-sm font-semibold text-zinc-900">
              {c.code} <span className="text-zinc-500">— {c.title}</span>
            </div>
            <p className="mt-2 text-sm leading-6 text-zinc-700">
              {c.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
