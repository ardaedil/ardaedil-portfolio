"use client";

export type Mode = "concise" | "detailed";

export default function ModeToggle({
  mode,
  setMode,
}: {
  mode: Mode;
  setMode: (m: Mode) => void;
}) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/70 px-2 py-1 shadow-sm backdrop-blur">
      <button
        onClick={() => setMode("concise")}
        className={`rounded-full px-3 py-1 text-xs font-medium transition ${
          mode === "concise"
            ? "bg-zinc-900 text-white"
            : "text-zinc-700 hover:bg-zinc-100"
        }`}
        aria-pressed={mode === "concise"}
      >
        Concise
      </button>
      <button
        onClick={() => setMode("detailed")}
        className={`rounded-full px-3 py-1 text-xs font-medium transition ${
          mode === "detailed"
            ? "bg-zinc-900 text-white"
            : "text-zinc-700 hover:bg-zinc-100"
        }`}
        aria-pressed={mode === "detailed"}
      >
        Detailed
      </button>
    </div>
  );
}
