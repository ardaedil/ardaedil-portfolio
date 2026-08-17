import Image from "next/image";

export default function StickyNote() {
  return (
    <aside className="hidden xl:block">
      <div className="sticky top-10 flex flex-col items-center gap-5">
        {/* Headshot */}
        <div className="relative h-60 w-60 overflow-hidden rounded-[22px] border border-[#d7d1c4] shadow-[0_24px_55px_-35px_rgba(0,0,0,0.55)]">
          <Image
            src="/headshot.jpg"
            alt="Arda Edil"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Sticky Note */}
        <div className="relative w-full max-w-[300px] rounded-[14px] border border-[#cfd8df] bg-[#edf5f9] p-4 shadow-[0_18px_40px_-28px_rgba(20,40,55,0.45)]">
          {/* Header */}
          <div className="text-sm font-bold tracking-tight text-[#171717]">
            👋 Welcome — this is my portfolio!
          </div>

          {/* Body */}
          <ul className="mt-3 space-y-2 text-xs leading-5 text-[#42403a]">
            <li>• Ask the AI about my experience or projects</li>
            <li>• Switch between concise & detailed answers</li>
            <li>• Try suggested questions to get started</li>
            <li>• Ask questions of your own</li>
          </ul>

          {/* Footer hint */}
          <div className="mt-3 text-[11px] italic text-[#5f6870]">
            This guide stays here while you explore.
          </div>

          {/* Folded corner */}
          <div className="pointer-events-none absolute -bottom-[1px] -right-[1px] h-6 w-6 bg-[#d6e6ef] [clip-path:polygon(0_0,100%_0,100%_100%)]" />
        </div>
      </div>
    </aside>
  );
}
