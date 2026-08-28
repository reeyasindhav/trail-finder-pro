import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Bookmark, ChevronRight, ExternalLink, Heart, MapPin, Star, ThumbsUp } from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Reveal } from "@/components/reveal";
import { TrailMap } from "@/components/trail-map";
import { ElevationChart } from "@/components/elevation-chart";
import { DifficultyBadge } from "@/components/difficulty-badge";
import { TrailCard } from "@/components/trail-card";
import { communityPosts, getTrail, trails } from "@/lib/trails";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { LoginPromptDialog } from "@/components/login-prompt-dialog";

export const Route = createFileRoute("/trails/$slug")({
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.trail?.name ?? "Trail"} — Trailblaze` },
      { name: "description", content: loaderData?.trail?.summary ?? "" },
    ],
  }),
  loader: async ({ params }) => {
    const trail = getTrail(params.slug);
    if (!trail) throw new Error("Trail not found");
    return { trail };
  },
  component: TrailDetail,
});

function TrailDetail() {
  const { trail } = Route.useLoaderData();
  const { saved, toggleSaved, user } = useAuth();
  const [liked, setLiked] = useState<number[]>([]);
  const [loginOpen, setLoginOpen] = useState(false);
  const navigate = useNavigate();

  const isSaved = saved.includes(trail.slug);
  const reviews = communityPosts.filter((p) => p.trail === trail.name);
  const related = trails
    .filter((t) => t.slug !== trail.slug && t.region === trail.region)
    .slice(0, 2);

  const toggleLike = (id: number) => {
    setLiked((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const handleSaveClick = () => {
    if (!user) {
      setLoginOpen(true);
      return;
    }
    toggleSaved(trail.slug);
  };

  return (
    <>
      <LoginPromptDialog open={loginOpen} onOpenChange={setLoginOpen} />
      <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl">
          <img
            src={trail.image}
            alt={trail.name}
            className="h-[220px] w-full object-cover sm:h-[300px] md:h-[360px] lg:h-[420px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/70 via-forest-deep/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-deep/50 via-transparent to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <DifficultyBadge
                level={trail.difficulty}
                className="bg-background/90 backdrop-blur"
              />
              <span className="rounded-full bg-background/90 px-3 py-1 font-mono text-xs font-semibold text-foreground backdrop-blur">
                {trail.region}, {trail.state}
              </span>
            </div>
            <h1 className="mt-3 font-display text-3xl font-semibold text-white drop-shadow-md sm:text-4xl lg:text-5xl">
              {trail.name}
            </h1>
          </div>
        </div>

        <Reveal delay={60}>
          <nav className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/discover" className="transition-colors hover:text-foreground">
              Discover
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="truncate">{trail.name}</span>
          </nav>
        </Reveal>

        <Reveal delay={60}>
          <div className="mt-8 flex flex-wrap items-start justify-between gap-6">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <DifficultyBadge level={trail.difficulty} />
                <span className="label-mono flex items-center gap-1.5 text-muted-foreground">
                  <MapPin className="h-3 w-3" /> {trail.region}, {trail.state}
                </span>
              </div>
              <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight lg:text-5xl">
                {trail.name}
              </h1>
              <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
                {trail.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-3 font-mono text-xs text-muted-foreground">
                {[
                  { label: "Distance", value: `${trail.distanceMi} mi` },
                  { label: "Elevation", value: `${trail.elevationFt.toLocaleString()} ft` },
                  { label: "Duration", value: `${trail.durationHrs} hrs` },
                  { label: "Route", value: trail.routeType },
                  { label: "Season", value: trail.season },
                ].map((s) => (
                  <span key={s.label} className="rounded-full border border-border px-3.5 py-1.5">
                    {s.label}: <span className="text-foreground">{s.value}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleSaveClick}
                className={cn(
                  "grid h-12 w-12 place-items-center rounded-full border-2 transition-all",
                  isSaved
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border hover:border-primary",
                )}
                aria-label={isSaved ? "Remove from saved" : "Save trail"}
              >
                <Bookmark className={cn("h-5 w-5", isSaved && "fill-current")} />
              </button>
              <a
                href="#elevation"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg transition-transform hover:scale-[1.03]"
              >
                View details <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3 space-y-8">
            <Reveal>
              <TrailMap trail={trail} />
            </Reveal>

            <Reveal>
              <ElevationChart trail={trail} />
            </Reveal>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <Reveal>
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="font-display text-xl font-semibold">Gear checklist</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  Essentials for this route based on difficulty and exposure.
                </p>
                <div className="mt-5 space-y-3">
                  {trail.tags.slice(0, 3).map((tag) => (
                    <div
                      key={tag}
                      className="flex items-center gap-3 rounded-xl border border-border p-3"
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-xs font-mono text-secondary-foreground">
                        {tag
                          .split(" ")
                          .map((w) => w[0])
                          .join("")}
                      </span>
                      <span className="text-sm font-medium">{tag}</span>
                    </div>
                  ))}
                  <a
                    href="/gear"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 hover:underline"
                  >
                    Full gear list <ChevronRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="font-display text-xl font-semibold">Conditions & tips</h3>
                <div className="mt-5 space-y-3">
                  {trail.waypoints.map((w) => (
                    <div
                      key={w.name}
                      className="flex gap-3.5 rounded-xl border border-border p-3.5"
                    >
                      <MapPin className="mt-0.5 h-4.5 w-4.5 shrink-0 text-primary" />
                      <div>
                        <p className="text-sm font-semibold">{w.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Mile {w.mi} — {w.note}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {reviews.length > 0 && (
          <section className="mt-16">
            <Reveal>
              <h2 className="font-display text-3xl font-semibold tracking-tight">
                Recent trip reports
              </h2>
              <p className="mt-2 text-muted-foreground">What hikers are saying right now.</p>
            </Reveal>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {reviews.map((r, i) => (
                <Reveal key={r.id} delay={i * 100}>
                  <article className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-card p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="grid h-10 w-10 place-items-center rounded-full bg-secondary font-mono text-xs font-semibold text-secondary-foreground">
                          {r.initials}
                        </div>
                        <div>
                          <p className="text-sm font-semibold">{r.author}</p>
                          <p className="text-xs text-muted-foreground">{r.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <Star
                            key={idx}
                            className={cn(
                              "h-3.5 w-3.5",
                              idx < r.rating ? "fill-ember text-ember" : "text-border",
                            )}
                          />
                        ))}
                      </div>
                    </div>

                    <p className="flex-1 text-sm leading-relaxed text-muted-foreground">{r.body}</p>

                    <div className="flex items-center justify-between border-t border-border pt-4">
                      <span className="label-mono text-muted-foreground">{r.conditions}</span>
                      <button
                        onClick={() => toggleLike(r.id)}
                        className={cn(
                          "flex items-center gap-1.5 text-xs font-medium transition-colors",
                          liked.includes(r.id)
                            ? "text-primary"
                            : "text-muted-foreground hover:text-foreground",
                        )}
                      >
                        <ThumbsUp className="h-3.5 w-3.5" />{" "}
                        {r.likes + (liked.includes(r.id) ? 1 : 0)}
                      </button>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section className="mt-16">
            <Reveal>
              <h2 className="font-display text-3xl font-semibold tracking-tight">Related trails</h2>
              <p className="mt-2 text-muted-foreground">More routes in {trail.region}.</p>
            </Reveal>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {related.map((t, i) => (
                <Reveal key={t.slug} delay={i * 100}>
                  <TrailCard trail={t} view="grid" />
                </Reveal>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
