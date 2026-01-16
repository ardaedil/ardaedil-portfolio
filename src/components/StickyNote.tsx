import Image from "next/image";

export default function StickyNote() {
  return (
    <aside className="hidden xl:block">
      <div className="sticky top-10 flex flex-col items-center gap-5">
        {/* Headshot */}
        <div className="relative h-60 w-60 overflow-hidden rounded-full border border-zinc-200 shadow-lg">
          <Image
            src="/headshot.jpg"
            alt="Arda Edil"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Sticky Note */}
        <div className="relative w-full max-w-[300px] rounded-lg border border-yellow-300 bg-yellow-100 p-4 shadow-[0_12px_35px_rgba(0,0,0,0.12)]">
          {/* Header */}
          <div className="text-sm font-bold text-zinc-900 tracking-tight">
            👋 Welcome — this is my portfolio!
          </div>

          {/* Body */}
          <ul className="mt-3 space-y-2 text-xs leading-5 text-zinc-800">
            <li>• Ask the AI about my experience or projects</li>
            <li>• Switch between concise & detailed answers</li>
            <li>• Try suggested questions to get started</li>
            <li>• Ask questions of your own</li>
          </ul>

          {/* Footer hint */}
          <div className="mt-3 text-[11px] italic text-zinc-700">
            This guide stays here while you explore.
          </div>

          {/* Folded corner */}
          <div className="pointer-events-none absolute -bottom-[1px] -right-[1px] h-6 w-6 bg-yellow-200 [clip-path:polygon(0_0,100%_0,100%_100%)]" />
        </div>
      </div>
    </aside>
  );
}
