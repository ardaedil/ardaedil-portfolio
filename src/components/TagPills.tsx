type Tag = {
  label: string;
  icon?: string;
};

export function TagPills({ tags }: { tags: Tag[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((t) => {
        const isAvailable =
          t.label.toLowerCase().includes("available");

        const base =
          "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs shadow-sm backdrop-blur transition-all duration-200 motion-reduce:transition-none";

        const hover =
          "hover:-translate-y-0.5 hover:rotate-[-1deg] hover:shadow-md active:translate-y-0";

        const style = isAvailable
          ? "border-emerald-200 bg-emerald-50/80 text-emerald-800"
          : "border-zinc-200 bg-white/65 text-zinc-700";

        return (
          <span
            key={t.label}
            className={`${base} ${hover} ${style}`}
          >
            {t.icon ? (
              <span
                className={
                  isAvailable ? "text-emerald-600" : "text-zinc-500"
                }
              >
                {t.icon}
              </span>
            ) : null}
            <span className="font-medium">{t.label}</span>
          </span>
        );
      })}
    </div>
  );
}
