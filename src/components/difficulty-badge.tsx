import { difficultyMeta, type Difficulty } from "@/lib/trails";
import { cn } from "@/lib/utils";

export function DifficultyBadge({
  level,
  className,
  showBars = true,
}: {
  level: Difficulty;
  className?: string;
  showBars?: boolean;
}) {
  const meta = difficultyMeta[level];
  return (
    <span
      className={cn(
        "label-mono inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-medium",
        className,
      )}
      style={{
        backgroundColor: `color-mix(in oklab, ${meta.color} 18%, transparent)`,
        color: `color-mix(in oklab, ${meta.color} 78%, black)`,
        border: `1px solid color-mix(in oklab, ${meta.color} 35%, transparent)`,
      }}
    >
      {showBars && (
        <span className="flex items-end gap-[2px]" aria-hidden>
          {[1, 2, 3].map((i) => (
            <span
              key={i}
              className="w-[3px] rounded-full transition-all"
              style={{
                height: `${4 + i * 3}px`,
                backgroundColor: i <= meta.level ? meta.color : "currentColor",
                opacity: i <= meta.level ? 1 : 0.25,
              }}
            />
          ))}
        </span>
      )}
      {level}
    </span>
  );
}
