import { createFileRoute } from "@tanstack/react-router";
import { type ReactNode } from "react";
import { Reveal } from "@/components/reveal";
import { TrailCard } from "@/components/trail-card";
import { useAuth } from "@/lib/auth";
import { getTrail } from "@/lib/trails";
import { ArrowRight, Compass } from "lucide-react";

export const Route = createFileRoute("/saved")({
  head: () => ({
    meta: [
      { title: "Saved trails — Trailblaze" },
      { name: "description", content: "View your saved trails and plan your next hike." },
    ],
  }),
  component: Saved,
});

function Saved() {
  const { saved, user } = useAuth();
  const items = saved.map((slug) => getTrail(slug)).filter(Boolean);


  return (
    <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="label-mono text-muted-foreground">YOUR LIST</span>
            <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight lg:text-5xl">
              Saved trails
            </h1>
            <p className="mt-2 text-muted-foreground">
              {user ? `${user.name}'s saved trails` : "Sign in to save trails across devices"}
            </p>
          </div>
          <a
            href="/discover"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            Discover more <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((trail, i) =>
          trail ? (
            <Reveal key={trail.slug} delay={i * 100}>
              <TrailCard trail={trail} view="grid" />
            </Reveal>
          ) : null,
        )}
      </div>

      {items.length === 0 && (
        <div className="mt-20 text-center">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-secondary text-primary">
            <Compass className="h-8 w-8" />
          </span>
          <p className="mt-6 font-display text-2xl">No saved trails yet</p>
          <p className="mt-2 text-muted-foreground">
            Explore the discover page and bookmark your favorites.
          </p>
          <a
            href="/discover"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-transform hover:scale-[1.03]"
          >
            Browse trails <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      )}
    </div>
  );
}
