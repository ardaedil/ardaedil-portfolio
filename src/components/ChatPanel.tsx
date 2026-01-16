"use client";

import { useMemo, useState } from "react";

type Mode = "concise" | "detailed";

const SUGGESTED = [
  "Summarize my experience for a SWE role.",
  "What are my strongest technical skills?",
  "Which projects best show backend skills?",
  "What stack do I use most often?",
];

export default function ChatPanel() {
  const [mode, setMode] = useState<Mode>("concise");
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [msgs, setMsgs] = useState<{ role: "user" | "assistant"; content: string }[]>([]);

  const canSend = useMemo(() => input.trim().length > 0 && !busy, [input, busy]);

  async function send(question: string) {
    const q = question.trim();
    if (!q) return;

    setBusy(true);
    setMsgs((m) => [...m, { role: "user", content: q }]);
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q, mode }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Request failed");
      }

      setMsgs((m) => [...m, { role: "assistant", content: data.answer }]);
    } catch (e: any) {
      setMsgs((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "Sorry — I couldn’t reach the AI backend. Check your `.env.local` and server logs, then try again.",
        },
      ]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="mt-8 rounded-2xl border border-zinc-200 bg-white/60 p-5 shadow-sm backdrop-blur">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-xs font-semibold tracking-wide text-zinc-500">ASK MY AI</div>
          <h3 className="mt-1 text-sm font-semibold text-zinc-900">
            Ask questions about my experience & projects
          </h3>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/70 px-2 py-1 shadow-sm">
          <button
            onClick={() => setMode("concise")}
            className={`rounded-full px-3 py-1 text-xs font-medium transition ${
              mode === "concise" ? "bg-zinc-900 text-white" : "text-zinc-700 hover:bg-zinc-100"
            }`}
          >
            Concise
          </button>
          <button
            onClick={() => setMode("detailed")}
            className={`rounded-full px-3 py-1 text-xs font-medium transition ${
              mode === "detailed" ? "bg-zinc-900 text-white" : "text-zinc-700 hover:bg-zinc-100"
            }`}
          >
            Detailed
          </button>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {SUGGESTED.map((p) => (
          <button
            key={p}
            onClick={() => send(p)}
            className="rounded-full border border-zinc-200 bg-white/60 px-3 py-2 text-xs text-zinc-700 shadow-sm hover:bg-white"
            disabled={busy}
          >
            {p}
          </button>
        ))}
      </div>

      <div className="mt-4 max-h-[360px] space-y-3 overflow-auto pr-1">
        {msgs.map((m, i) => (
          <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
            <div
              className={`inline-block max-w-[92%] rounded-2xl border px-3 py-2 text-sm leading-6 whitespace-pre-wrap break-words ${
                m.role === "user"
                  ? "border-zinc-900 bg-zinc-900 text-white"
                  : "border-zinc-200 bg-white text-zinc-800"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        {busy && <div className="text-xs text-zinc-500">Thinking…</div>}
      </div>

      <form
        className="mt-4 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about my skills, projects, experience…"
          className="
            w-full rounded-xl border border-zinc-200
            bg-white/80 backdrop-blur
            px-4 py-3 text-sm
            text-zinc-900
            placeholder:text-zinc-400 
            focus:outline-none focus:ring-2 focus:ring-zinc-300
          "
        />
        <button
          type="submit"
          disabled={!canSend}
          className="rounded-xl border border-zinc-900 bg-zinc-900 px-4 py-2 text-sm text-white disabled:opacity-50"
        >
          Send
        </button>
      </form>

      <div className="mt-2 text-[11px] text-zinc-500">
        Answers are grounded in content from <span className="font-medium">/content</span>.
      </div>
    </section>
  );
}
