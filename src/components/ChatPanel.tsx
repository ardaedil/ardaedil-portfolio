"use client";

import { ArrowUp, Check, LoaderCircle } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Mode = "concise" | "detailed";

type QueuedQuestion = {
  id: number;
  text: string;
};

type Source = {
  label: string;
  href: string;
};

type Message = {
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
};

const SUGGESTED = [
  "What is the hardest project Arda has built?",
  "What experience does he have with AI agents?",
  "What has he built with machine learning?",
  "Tell me about AgentSEO.",
  "Why would Arda be a good SWE intern?",
];

export default function ChatPanel({ queuedQuestion }: { queuedQuestion?: QueuedQuestion | null }) {
  const [mode, setMode] = useState<Mode>("concise");
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [msgs, setMsgs] = useState<Message[]>([]);
  const lastQueuedId = useRef<number | null>(null);
  const conversationEndRef = useRef<HTMLDivElement>(null);

  const send = useCallback(
    async (question: string) => {
      const q = question.trim();
      if (!q || busy) return;

      setBusy(true);
      setMsgs((messages) => [...messages, { role: "user", content: q }]);
      setInput("");

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: q, mode }),
        });
        const data = await response.json();

        if (!response.ok) throw new Error(data?.error || "Request failed");

        const sources = Array.isArray(data.sources)
          ? data.sources.filter(
              (source: unknown): source is Source =>
                Boolean(
                  source &&
                    typeof source === "object" &&
                    "label" in source &&
                    "href" in source &&
                    typeof source.label === "string" &&
                    typeof source.href === "string"
                )
            )
          : [];

        setMsgs((messages) => [...messages, { role: "assistant", content: data.answer, sources }]);
      } catch {
        setMsgs((messages) => [
          ...messages,
          {
            role: "assistant",
            content: "Sorry — I couldn’t reach the portfolio AI right now. Please try again in a moment.",
          },
        ]);
      } finally {
        setBusy(false);
      }
    },
    [busy, mode]
  );

  useEffect(() => {
    if (!queuedQuestion || queuedQuestion.id === lastQueuedId.current) return;
    lastQueuedId.current = queuedQuestion.id;
    send(queuedQuestion.text);
  }, [queuedQuestion, send]);

  useEffect(() => {
    conversationEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [busy, msgs]);

  const canSend = useMemo(() => input.trim().length > 0 && !busy, [input, busy]);

  return (
    <div className="mt-8">
      <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-[#637985]">
          Grounded in Arda&apos;s portfolio content <span aria-hidden>·</span> not a general-purpose chatbot
        </p>
        <div className="inline-flex w-fit items-center rounded-full border border-[#cbd7dc] bg-white/60 p-1" aria-label="Answer length">
          {(["concise", "detailed"] as const).map((option) => (
            <button
              type="button"
              key={option}
              onClick={() => setMode(option)}
              aria-pressed={mode === option}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold capitalize transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7893a2] ${mode === option ? "bg-[#17303d] text-white" : "text-[#5b707b] hover:bg-white/70"}`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2" aria-label="Suggested questions">
        {SUGGESTED.map((question) => (
          <button
            type="button"
            key={question}
            onClick={() => send(question)}
            disabled={busy}
            className="rounded-full border border-[#c5d2d8] bg-white/65 px-3.5 py-2 text-left text-xs font-medium text-[#405966] shadow-sm transition hover:-translate-y-0.5 hover:border-[#9fb3bd] hover:bg-white disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7893a2] motion-reduce:transform-none"
          >
            {question}
          </button>
        ))}
      </div>

      {msgs.length > 0 || busy ? (
        <div className="mt-6 max-h-[420px] space-y-4 overflow-y-auto rounded-2xl border border-[#cad7dd] bg-white/45 p-4 sm:p-5" aria-live="polite">
          {msgs.map((message, index) => (
            <div key={`${message.role}-${index}`} className={message.role === "user" ? "text-right" : "text-left"}>
              <div
                className={`inline-block max-w-[94%] rounded-2xl px-4 py-3 text-left text-sm leading-6 whitespace-pre-wrap sm:max-w-[86%] ${message.role === "user" ? "bg-[#17303d] text-white" : "border border-[#d1dcdf] bg-white text-[#334851] shadow-sm"}`}
              >
                {message.content}
              </div>
              {message.role === "assistant" && message.sources?.length ? (
                <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[11px] text-[#687d87]">
                  <span className="inline-flex items-center gap-1 font-semibold"><Check className="h-3 w-3" aria-hidden /> Sources:</span>
                  {message.sources.map((source) => (
                    <a key={`${source.href}-${source.label}`} href={source.href} className="rounded-full border border-[#cbd6db] bg-white/55 px-2 py-0.5 underline decoration-[#a9bbc3] underline-offset-2 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7893a2]">
                      {source.label}
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
          {busy ? (
            <div className="flex items-center gap-2 text-xs text-[#637985]">
              <LoaderCircle className="h-4 w-4 animate-spin motion-reduce:animate-none" aria-hidden />
              Looking through Arda&apos;s portfolio…
            </div>
          ) : null}
          <div ref={conversationEndRef} />
        </div>
      ) : null}

      <form
        className="mt-6 flex items-center gap-2 rounded-2xl border border-[#aebfc8] bg-white p-2 shadow-[0_18px_45px_-35px_rgba(24,53,68,0.7)] focus-within:border-[#6f8d9c] focus-within:ring-2 focus-within:ring-[#b9cbd4]"
        onSubmit={(event) => {
          event.preventDefault();
          send(input);
        }}
      >
        <label htmlFor="portfolio-ai-input" className="sr-only">Ask something about Arda</label>
        <input
          id="portfolio-ai-input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask something about Arda…"
          autoComplete="off"
          className="min-h-12 w-full bg-transparent px-3 text-sm text-[#1c2c34] outline-none placeholder:text-[#8799a2] sm:text-base"
        />
        <button
          type="submit"
          disabled={!canSend}
          aria-label="Send question"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#17303d] text-white transition hover:bg-[#0f242e] disabled:cursor-not-allowed disabled:opacity-35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#45677c] focus-visible:ring-offset-2"
        >
          <ArrowUp className="h-4 w-4" aria-hidden />
        </button>
      </form>
    </div>
  );
}
