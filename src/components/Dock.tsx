export default function Dock() {
  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
      <div className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white/70 px-3 py-2 shadow-lg backdrop-blur">
        <a
          href="https://www.linkedin.com/"
          className="rounded-full px-3 py-2 text-xs text-zinc-700 hover:bg-zinc-100"
          target="_blank"
          rel="noreferrer"
        >
          in
        </a>
        <a
          href="mailto:ardaedil@gmail.com"
          className="rounded-full px-3 py-2 text-xs text-zinc-700 hover:bg-zinc-100"
        >
          email
        </a>
        <a
          href="https://github.com/ardaedil"
          className="rounded-full px-3 py-2 text-xs text-zinc-700 hover:bg-zinc-100"
          target="_blank"
          rel="noreferrer"
        >
          github
        </a>
        <span className="mx-1 h-5 w-px bg-zinc-200" />
        <button
          className="rounded-full px-3 py-2 text-xs text-zinc-700 hover:bg-zinc-100"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          top
        </button>
      </div>
    </div>
  );
}
