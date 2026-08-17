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
          ? "border-[#abcce2] bg-[#d7ebf7]/75 text-[#24475d]"
          : "border-[#d8d2c5] bg-[#fbfaf7]/65 text-[#474038]";

        return (
          <span
            key={t.label}
            className={`${base} ${hover} ${style}`}
          >
            {t.icon ? (
              <span
                className={
                  isAvailable ? "text-[#4f88aa]" : "text-[#756f65]"
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
