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
    <div className="inline-flex items-center gap-2 rounded-full border border-[#d8d2c5] bg-[#fbfaf7]/75 px-2 py-1 shadow-sm backdrop-blur">
      <button
        onClick={() => setMode("concise")}
        className={`rounded-full px-3 py-1 text-xs font-medium transition ${
          mode === "concise"
            ? "bg-[#111111] text-white"
            : "text-[#4f4a42] hover:bg-[#eee9df]"
        }`}
        aria-pressed={mode === "concise"}
      >
        Concise
      </button>
      <button
        onClick={() => setMode("detailed")}
        className={`rounded-full px-3 py-1 text-xs font-medium transition ${
          mode === "detailed"
            ? "bg-[#111111] text-white"
            : "text-[#4f4a42] hover:bg-[#eee9df]"
        }`}
        aria-pressed={mode === "detailed"}
      >
        Detailed
      </button>
    </div>
  );
}
