import OpenAI from "openai";
import fs from "node:fs";
import path from "node:path";

export const runtime = "nodejs";

type Mode = "concise" | "detailed";

type ContentDocument = {
  file: string;
  text: string;
};

type ContentChunk = ContentDocument & {
  id: string;
};

function readAllMarkdown(): ContentDocument[] {
  const base = path.join(process.cwd(), "content");
  if (!fs.existsSync(base)) return [];

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

  return files
    .map((file) => ({
      file: path.relative(process.cwd(), file).replaceAll("\\", "/"),
      text: fs.readFileSync(file, "utf8"),
    }));
}

function chunkDocuments(documents: ContentDocument[], chunkSize = 900, overlap = 150): ContentChunk[] {
  const chunks: ContentChunk[] = [];
  for (const document of documents) {
    let index = 0;
    let offset = 0;
    while (offset < document.text.length) {
      const end = Math.min(offset + chunkSize, document.text.length);
      chunks.push({
        id: `${document.file}-${index}`,
        file: document.file,
        text: document.text.slice(offset, end),
      });
      offset += chunkSize - overlap;
      index += 1;
    }
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

function retrieveTop(query: string, chunks: ContentChunk[], k = 5) {
  return chunks
    .map((chunk) => ({ ...chunk, s: score(query, chunk.text) }))
    .sort((a, b) => b.s - a.s)
    .slice(0, k)
    .filter((x) => x.s > 0);
}

function sourceMeta(file: string) {
  const filename = file.split("/").at(-1)?.replace(/\.(md|txt)$/i, "") ?? "portfolio";
  const projectSources: Record<string, { label: string; href: string }> = {
    agentseo: { label: "AgentSEO", href: "#project-agentseo" },
    mariomind: { label: "MarioMind", href: "#project-mariomind" },
    "varlens-ai": { label: "VARLens AI", href: "#project-varlens-ai" },
    "ai-stock-analyzer": { label: "AI Stock Analyzer", href: "#project-ai-stock-analyzer-rag-retrieval" },
    "oxpal-biofeedback": { label: "OxPal Research", href: "#project-oxpal-biofeedback-research" },
    lore: { label: "Lore", href: "#project-lore" },
    "ai-augmented-portfolio": { label: "AI Portfolio", href: "#project-ai-powered-portfolio-website" },
  };
  const experienceSources: Record<string, { label: string; href: string }> = {
    agentseo: { label: "AgentSEO Experience", href: "#experience-agentseo-founder" },
    bgts: { label: "BGTS", href: "#experience-bgts-software-engineering-intern" },
    "menlo-innovations": { label: "Menlo Innovations", href: "#experience-menlo-innovations-project-manager-software-developer" },
    "setas-masterbatch": { label: "Setas Masterbatch", href: "#experience-setas-masterbatch-supply-chain-analyst-intern" },
  };
  const label = filename
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
    .replace("Agentseo", "AgentSEO")
    .replace("Mariomind", "MarioMind")
    .replace("Varlens Ai", "VARLens AI")
    .replace("Bgts", "BGTS");

  if (file.startsWith("content/projects/")) return projectSources[filename] ?? { label, href: "#projects" };
  if (file.startsWith("content/experience/")) return experienceSources[filename] ?? { label, href: "#experience" };
  if (file === "content/resume.md") return { label: "Resume", href: "/arda-edil-resume.pdf" };
  return { label: "About Arda", href: "#top" };
}

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

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const documents = readAllMarkdown();
    const chunks = chunkDocuments(documents);
    const top = retrieveTop(message, chunks, 6);

    const context =
      top.length > 0
        ? top.map((source) => `(SOURCE: ${source.file})\n${source.text}`).join("\n\n-----\n\n")
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
      sources: Array.from(
        new Map(top.map((source) => {
          const meta = sourceMeta(source.file);
          return [meta.href, meta];
        })).values()
      ).slice(0, 4),
    });
  } catch (err: unknown) {
    console.error(err);
    const message = err instanceof Error ? err.message : "Unexpected server error";

    return Response.json(
      { error: message },
      { status: 500 }
    );
  }
}
