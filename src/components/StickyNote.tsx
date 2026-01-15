export default function StickyNote() {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-12">
        <div className="relative w-[260px] rounded-md border border-yellow-200 bg-yellow-100/80 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
          <div className="text-sm font-semibold">Welcome to my website!</div>
          <ul className="mt-3 space-y-2 text-xs leading-5 text-zinc-700">
            <li>• Hover over experience items to ask questions about them.</li>
            <li>• Use the toggle to switch between concise and detailed answers.</li>
            <li>• Try the suggested questions for quick insights.</li>
            <li>• Click any resume item to drill down.</li>
          </ul>
          <div className="mt-3 text-[11px] italic text-zinc-600">
            This note can disappear after your first question.
          </div>
          {/* little folded corner */}
          <div className="absolute -bottom-[1px] -right-[1px] h-6 w-6 bg-yellow-200/70 [clip-path:polygon(0_0,100%_0,100%_100%)]" />
        </div>
      </div>
    </aside>
  );
}
