export function TagPills({ tags }: { tags: { label: string; icon?: string }[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((t) => (
        <span
          key={t.label}
          className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/65 px-3 py-1 text-xs text-zinc-700 shadow-sm backdrop-blur"
        >
          {t.icon ? <span className="text-zinc-500">{t.icon}</span> : null}
          <span>{t.label}</span>
        </span>
      ))}
    </div>
  );
}
