import OpenAI from "openai";
import fs from "node:fs";
import path from "node:path";

export const runtime = "nodejs";

type Mode = "concise" | "detailed";

function readAllMarkdown(): string {
  const base = path.join(process.cwd(), "content");
  if (!fs.existsSync(base)) return "";

  const files: string[] = [];
  const walk = (dir: string) => {
    for (const name of fs.readdirSync(dir)) {
      const p = path.join(dir, name);
      const st = fs.statSync(p);
      if (st.isDirectory()) walk(p);
      else if (name.endsWith(".md") || name.endsWith(".txt")) files.push(p);
    }
  };
  walk(base);

  // include filenames so citations can be more meaningful later
  return files
    .map((f) => `\n\n### FILE: ${path.relative(process.cwd(), f)}\n${fs.readFileSync(f, "utf8")}`)
    .join("\n\n---\n\n");
}

function chunkText(text: string, chunkSize = 900, overlap = 150) {
  const chunks: string[] = [];
  let i = 0;
  while (i < text.length) {
    const end = Math.min(i + chunkSize, text.length);
    chunks.push(text.slice(i, end));
    i += chunkSize - overlap;
  }
  return chunks;
}

function score(query: string, chunk: string) {
  const q = query.toLowerCase().split(/\W+/).filter(Boolean);
  const c = chunk.toLowerCase();
  let s = 0;
  for (const term of q) {
    if (term.length < 3) continue;
    if (c.includes(term)) s += 1;
  }
  return s;
}

function retrieveTop(query: string, chunks: string[], k = 5) {
  return chunks
    .map((text, idx) => ({ id: `source-${idx}`, text, s: score(query, text) }))
    .sort((a, b) => b.s - a.s)
    .slice(0, k)
    .filter((x) => x.s > 0);
}

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));

    // ✅ Accept either "message" or "question" (so your UI won't break)
    const message = String(body?.message ?? body?.question ?? "").trim();
    const mode = (body?.mode === "detailed" ? "detailed" : "concise") as Mode;

    if (!process.env.OPENAI_API_KEY) {
      return Response.json(
        { error: "Missing OPENAI_API_KEY. Add it to .env.local and restart dev server." },
        { status: 500 }
      );
    }

    if (!message) {
      return Response.json({ error: "Missing message" }, { status: 400 });
    }

    const all = readAllMarkdown();
    const chunks = chunkText(all);
    const top = retrieveTop(message, chunks, 6);

    const context =
      top.length > 0
        ? top.map((t) => `(${t.id})\n${t.text}`).join("\n\n-----\n\n")
        : "No sources matched.";

    const instructions = [
      "You are Arda Edil's portfolio assistant. Speak in FIRST PERSON as Arda.",
      "Answer questions using ONLY the provided SOURCES. If it isn't in SOURCES, say you don't know.",
      "Do NOT output markdown formatting (no **, no # headings). Use plain text only.",
      "Write in a professional, recruiter-friendly tone.",
      mode === "detailed"
        ? [
            "FORMAT (detailed):",
            "1) Start with 1–2 sentence summary.",
            "2) Then use short section headers as plain text (e.g., 'Menlo Innovations (Client):'),",
            "3) Under each header, give 2–4 bullet points starting with '- '.",
          ].join("\n")
        : [
            "FORMAT (concise):",
            "1) Start with 1 sentence summary.",
            "2) Then 3–6 bullet points starting with '- '.",
          ].join("\n"),
      "Keep bullets tight: start with an action verb and include concrete tech/impact when available.",
    ].join("\n");


    const input = [
      { role: "system" as const, content: instructions },
      {
        role: "user" as const,
        content: `QUESTION:\n${message}\n\nSOURCES:\n${context}`,
      },
    ];

    // ✅ Use a reliable model name for most accounts
    const resp = await client.responses.create({
      model: "gpt-4.1-mini",
      input,
    });

    const answer = resp.output_text?.trim() || "No output.";

    return Response.json({
      answer,
      sources: top.map((t) => t.id),
    });
  } catch (err: any) {
    console.error(err);
    return Response.json(
      { error: err?.message || "Unexpected server error" },
      { status: 500 }
    );
  }
}
