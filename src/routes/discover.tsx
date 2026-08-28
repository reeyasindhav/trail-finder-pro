import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Reveal } from "@/components/reveal";
import { TrailCard } from "@/components/trail-card";
import { trails, difficultyMeta } from "@/lib/trails";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { Grid3x3, List, SlidersHorizontal, X } from "lucide-react";

export const Route = createFileRoute("/discover")({
  head: () => ({
    meta: [
      { title: "Discover trails — Trailblaze" },
      {
        name: "description",
        content: "Browse trails filtered by difficulty, distance, and region.",
      },
    ],
  }),
  component: Discover,
});

type Filter = "All" | "Easy" | "Moderate" | "Hard";
type RouteType = "All" | "Loop" | "Out & back" | "Point to point";
type Season = "All" | "Year round" | "Spring" | "Summer" | "Fall" | "Winter";
type Sort = "name" | "distance-asc" | "distance-desc" | "rating" | "elevation";

function Discover() {
  const [difficulty, setDifficulty] = useState<Filter>("All");
  const [routeType, setRouteType] = useState<RouteType>("All");
  const [season, setSeason] = useState<Season>("All");
  const [maxDistance, setMaxDistance] = useState(15);
  const [minRating, setMinRating] = useState(0);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<Sort>("name");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = trails.filter((t) => {
      if (difficulty !== "All" && t.difficulty !== difficulty) return false;
      if (routeType !== "All" && t.routeType !== routeType) return false;
      if (season !== "All") {
        const s = t.season.toLowerCase();
        if (season === "Year round" && !s.includes("year")) return false;
        if (season === "Spring" && !s.includes("mar") && !s.includes("apr") && !s.includes("may"))
          return false;
        if (season === "Summer" && !s.includes("jun") && !s.includes("jul") && !s.includes("aug"))
          return false;
        if (season === "Fall" && !s.includes("sep") && !s.includes("oct") && !s.includes("nov"))
          return false;
        if (season === "Winter" && !s.includes("dec") && !s.includes("jan") && !s.includes("feb"))
          return false;
      }
      if (t.distanceMi > maxDistance) return false;
      if (t.rating < minRating) return false;
      if (
        search &&
        !t.name.toLowerCase().includes(search.toLowerCase()) &&
        !t.region.toLowerCase().includes(search.toLowerCase())
      )
        return false;
      return true;
    });

    result = [...result].sort((a, b) => {
      switch (sort) {
        case "name":
          return a.name.localeCompare(b.name);
        case "distance-asc":
          return a.distanceMi - b.distanceMi;
        case "distance-desc":
          return b.distanceMi - a.distanceMi;
        case "rating":
          return b.rating - a.rating;
        case "elevation":
          return b.elevationFt - a.elevationFt;
        default:
          return 0;
      }
    });

    return result;
  }, [difficulty, routeType, season, maxDistance, minRating, search, sort]);

  const activeFilters = [
    difficulty !== "All" && {
      label: `Difficulty: ${difficulty}`,
      clear: () => setDifficulty("All"),
    },
    routeType !== "All" && { label: `Route: ${routeType}`, clear: () => setRouteType("All") },
    season !== "All" && { label: `Season: ${season}`, clear: () => setSeason("All") },
    maxDistance < 15 && { label: `Max ${maxDistance} mi`, clear: () => setMaxDistance(15) },
    minRating > 0 && { label: `${minRating}+ stars`, clear: () => setMinRating(0) },
    search && { label: `"${search}"`, clear: () => setSearch("") },
  ].filter(Boolean) as { label: string; clear: () => void }[];

  const clearAll = () => {
    setDifficulty("All");
    setRouteType("All");
    setSeason("All");
    setMaxDistance(15);
    setMinRating(0);
    setSearch("");
  };

  const hasActiveFilters = activeFilters.length > 0;

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="label-mono text-muted-foreground">BROWSE</span>
            <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight lg:text-5xl">
              Discover trails
            </h1>
            <p className="mt-2 text-muted-foreground">
              {filtered.length} {filtered.length === 1 ? "trail" : "trails"} found
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {hasActiveFilters && (
                <span className="grid h-5 w-5 place-items-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                  {activeFilters.length}
                </span>
              )}
            </button>
            <div className="flex items-center rounded-lg border border-border">
              <button
                onClick={() => setView("grid")}
                className={`grid h-9 w-9 place-items-center transition-colors ${
                  view === "grid"
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                aria-label="Grid view"
              >
                <Grid3x3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setView("list")}
                className={`grid h-9 w-9 place-items-center transition-colors ${
                  view === "list"
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                aria-label="List view"
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </Reveal>

      {hasActiveFilters && (
        <Reveal delay={60}>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            {activeFilters.map((f) => (
              <span
                key={f.label}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium"
              >
                {f.label}
                <button
                  onClick={f.clear}
                  className="grid h-4 w-4 place-items-center rounded-full transition-colors hover:bg-secondary"
                  aria-label={`Remove ${f.label} filter`}
                >
                  <X className="h-2.5 w-2.5" />
                </button>
              </span>
            ))}
            <button
              onClick={clearAll}
              className="text-xs font-medium text-primary underline-offset-4 hover:underline"
            >
              Clear all
            </button>
          </div>
        </Reveal>
      )}

      <Reveal delay={80}>
        <div className="mt-6 grid gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or region…"
                className="h-11 w-full rounded-lg border border-border bg-background px-3.5 text-sm outline-none transition-colors focus:border-primary"
              />
            </div>
            <div className="flex items-center gap-2">
              {(
                Object.values(difficultyMeta) as Array<{
                  level: number;
                  color: string;
                  blurb: string;
                }>
              ).map((d) => (
                <button
                  key={d.level}
                  onClick={() =>
                    setDifficulty(d.level === 1 ? "Easy" : d.level === 2 ? "Moderate" : "Hard")
                  }
                  className={cnBtn(
                    (difficulty === "Easy" && d.level === 1) ||
                      (difficulty === "Moderate" && d.level === 2) ||
                      (difficulty === "Hard" && d.level === 3),
                  )}
                >
                  <DifficultyBadge
                    level={d.level === 1 ? "Easy" : d.level === 2 ? "Moderate" : "Hard"}
                    showBars={false}
                  />
                </button>
              ))}
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="h-11 rounded-lg border border-border bg-background px-3 text-sm outline-none transition-colors focus:border-primary"
            >
              <option value="name">Sort: Name</option>
              <option value="distance-asc">Distance: Low to High</option>
              <option value="distance-desc">Distance: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="elevation">Most Elevation</option>
            </select>
          </div>

          {showFilters && (
            <div className="grid gap-4 rounded-2xl border border-border bg-card p-5 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="label-mono text-muted-foreground">Route type</label>
                <select
                  value={routeType}
                  onChange={(e) => setRouteType(e.target.value as RouteType)}
                  className="mt-2 h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none transition-colors focus:border-primary"
                >
                  <option value="All">All types</option>
                  <option value="Loop">Loop</option>
                  <option value="Out & back">Out & back</option>
                  <option value="Point to point">Point to point</option>
                </select>
              </div>
              <div>
                <label className="label-mono text-muted-foreground">Season</label>
                <select
                  value={season}
                  onChange={(e) => setSeason(e.target.value as Season)}
                  className="mt-2 h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none transition-colors focus:border-primary"
                >
                  <option value="All">All seasons</option>
                  <option value="Year round">Year round</option>
                  <option value="Spring">Spring</option>
                  <option value="Summer">Summer</option>
                  <option value="Fall">Fall</option>
                  <option value="Winter">Winter</option>
                </select>
              </div>
              <div>
                <label className="label-mono text-muted-foreground">
                  Max distance: {maxDistance} mi
                </label>
                <input
                  type="range"
                  min={1}
                  max={15}
                  value={maxDistance}
                  onChange={(e) => setMaxDistance(Number(e.target.value))}
                  className="mt-2 h-2 w-full cursor-pointer accent-primary"
                />
              </div>
              <div>
                <label className="label-mono text-muted-foreground">
                  Min rating: {minRating > 0 ? `${minRating}+` : "Any"}
                </label>
                <input
                  type="range"
                  min={0}
                  max={5}
                  step={0.5}
                  value={minRating}
                  onChange={(e) => setMinRating(Number(e.target.value))}
                  className="mt-2 h-2 w-full cursor-pointer accent-primary"
                />
              </div>
            </div>
          )}
        </div>
      </Reveal>

      {filtered.length > 0 && (
        <Reveal delay={100}>
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {filtered.length} {filtered.length === 1 ? "trail" : "trails"}
              {hasActiveFilters && " with filters applied"}
            </p>
          </div>
        </Reveal>
      )}

      {view === "grid" ? (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((trail, i) => (
            <Reveal key={trail.slug} delay={i * 60}>
              <TrailCard trail={trail} view="grid" />
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {filtered.map((trail, i) => (
            <Reveal key={trail.slug} delay={i * 60}>
              <TrailCard trail={trail} view="list" />
            </Reveal>
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <div className="mt-20 text-center">
          <p className="font-display text-2xl">No trails match your filters</p>
          <p className="mt-2 text-muted-foreground">
            Try widening your distance, lowering the rating, or clearing the search.
          </p>
          {hasActiveFilters && (
            <button
              onClick={clearAll}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function cnBtn(active: boolean) {
  return [
    "h-10 rounded-lg px-4 text-sm font-medium transition-all",
    active
      ? "bg-primary text-primary-foreground shadow-sm"
      : "border border-border hover:bg-secondary",
  ].join(" ");
}
