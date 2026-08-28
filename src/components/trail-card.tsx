import { Link } from "@tanstack/react-router";
import { Bookmark, MapPin, Star, ArrowRight, Mountain, Clock } from "lucide-react";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { useAuth } from "@/lib/auth";
import type { Trail } from "@/lib/trails";
import { cn } from "@/lib/utils";
import { LoginPromptDialog } from "@/components/login-prompt-dialog";

export function TrailCard({ trail, view = "grid" }: { trail: Trail; view?: "grid" | "list" }) {
  const { saved, toggleSaved, user } = useAuth();
  const isSaved = saved.includes(trail.slug);

  const handleSaveClick = () => {
    if (!user) return;
    toggleSaved(trail.slug);
  };

  if (view === "list") {
    return (
      <>
        <LoginPromptDialog />
        <div className="lift group grid grid-cols-[minmax(0,1fr)] gap-5 overflow-hidden rounded-2xl border border-border bg-card p-4 sm:grid-cols-[220px_minmax(0,1fr)_auto]">
          <div className="relative h-36 overflow-hidden rounded-xl sm:h-full">
            <img
              src={trail.image}
              alt={trail.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <DifficultyBadge level={trail.difficulty} />
              <span className="label-mono flex items-center gap-1 text-muted-foreground">
                <MapPin className="h-3 w-3" /> {trail.region}, {trail.state}
              </span>
            </div>
            <h3 className="mt-2 truncate font-display text-2xl">{trail.name}</h3>
            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{trail.summary}</p>
            <div className="mt-3 flex flex-wrap gap-4 font-mono text-xs text-muted-foreground">
              <span>{trail.distanceMi} mi</span>
              <span>{trail.elevationFt.toLocaleString()} ft</span>
              <span>{trail.durationHrs} hrs</span>
              <span className="flex items-center gap-1 text-foreground">
                <Star className="h-3 w-3 fill-ember text-ember" /> {trail.rating}
              </span>
            </div>
          </div>
          <div className="flex items-end justify-between sm:flex-col sm:items-end">
            <SaveButton saved={isSaved} onClick={handleSaveClick} />
            <Link
              to="/trails/$slug"
              params={{ slug: trail.slug }}
              className="inline-flex items-center gap-1 text-sm font-semibold text-primary underline-offset-4 hover:underline"
            >
              View trail{" "}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <LoginPromptDialog />
      <article className="lift group flex flex-col overflow-hidden rounded-2xl border border-border bg-card">
        <div className="relative h-52 overflow-hidden">
          <img
            src={trail.image}
            alt={trail.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/60 via-transparent to-transparent" />
          <div className="absolute left-4 top-4">
            <DifficultyBadge level={trail.difficulty} className="bg-background/90 backdrop-blur" />
          </div>
          <div className="absolute right-4 top-4">
            <SaveButton saved={isSaved} onClick={handleSaveClick} />
          </div>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <span className="label-mono flex items-center gap-1 text-muted-foreground">
            <MapPin className="h-3 w-3" /> {trail.region}, {trail.state}
          </span>
          <h3 className="mt-2 font-display text-2xl">{trail.name}</h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
            {trail.summary}
          </p>
          <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
            <div className="flex gap-4 font-mono text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Mountain className="h-3 w-3" /> {trail.distanceMi} mi
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" /> {trail.durationHrs}h
              </span>
              <span className="flex items-center gap-1 text-foreground">
                <Star className="h-3 w-3 fill-ember text-ember" /> {trail.rating}
              </span>
            </div>
            <Link
              to="/trails/$slug"
              params={{ slug: trail.slug }}
              className="inline-flex items-center gap-1 text-sm font-semibold text-primary"
            >
              View <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}

export function SaveButton({
  saved,
  onClick,
  className,
}: {
  saved: boolean;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-label={saved ? "Remove from saved" : "Save trail"}
      onClick={onClick}
      className={cn(
        "grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border bg-background/90 backdrop-blur transition-all hover:scale-110",
        saved && "border-primary bg-primary text-primary-foreground",
        className,
      )}
    >
      <Bookmark className={cn("h-4 w-4", saved && "fill-current")} />
    </button>
  );
}
