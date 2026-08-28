import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Compass, MapPin, Star, TrendingUp } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { TrailCard } from "@/components/trail-card";
import { trails } from "@/lib/trails";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Trailblaze — Hiking & Trail Discovery" },
      {
        name: "description",
        content:
          "Discover trails, check elevation profiles, and pack the right gear with Trailblaze.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const featured = trails.slice(0, 4);
  const stats = [
    { label: "Trails", value: "3,200+" },
    { label: "States", value: "48" },
    { label: "Reviews", value: "24k" },
  ];

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={trails[0].image} alt="" className="h-full w-full object-cover" aria-hidden />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </div>

        <div className="mx-auto max-w-7xl px-5 pt-24 pb-28 lg:pt-36 lg:pb-40">
          <div className="max-w-3xl">
            <Reveal>
              <span className="label-mono text-primary">OUTDOOR NAVIGATION</span>
              <h1 className="mt-5 font-display text-5xl font-semibold tracking-tight lg:text-7xl">
                Find your next trail
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
                Explore elevation profiles, gear checklists, and real trip reports — all in one
                place.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a
                  href="/discover"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg transition-transform hover:scale-[1.03]"
                >
                  Discover trails <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="/about"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-7 py-3.5 text-sm font-semibold backdrop-blur transition-colors hover:bg-secondary"
                >
                  How it works
                </a>
              </div>
            </Reveal>

            <div className="mt-14 grid grid-cols-3 gap-6 max-w-xl">
              {stats.map((s) => (
                <Reveal key={s.label} delay={120}>
                  <div className="rounded-2xl border border-border/70 bg-card/70 p-4 text-center backdrop-blur">
                    <p className="font-display text-2xl font-semibold">{s.value}</p>
                    <p className="mt-1 label-mono text-muted-foreground">{s.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="label-mono text-muted-foreground">FEATURED</span>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight lg:text-4xl">
                Popular right now
              </h2>
            </div>
            <a
              href="/discover"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 hover:underline"
            >
              View all <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((trail, i) => (
            <Reveal key={trail.slug} delay={i * 100}>
              <TrailCard trail={trail} view="grid" />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-5 py-24">
          <Reveal>
            <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
              <div>
                <span className="label-mono text-muted-foreground">WHY TRAILBLAZE</span>
                <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight lg:text-4xl">
                  Plan smarter, hike safer
                </h2>
                <p className="mt-5 leading-relaxed text-muted-foreground">
                  Trail difficulty, elevation gain, required gear, and recent conditions — gathered
                  in one place so you can make confident decisions before you step foot on the
                  trail.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    icon: TrendingUp,
                    title: "Elevation charts",
                    desc: "See every climb before you start.",
                  },
                  {
                    icon: MapPin,
                    title: "Accurate routes",
                    desc: "Trailheads, waypoints, and turns.",
                  },
                  { icon: Star, title: "Real reviews", desc: "Recent conditions from hikers." },
                  {
                    icon: Compass,
                    title: "Gear checklists",
                    desc: "Pack the right kit every time.",
                  },
                ].map((f) => (
                  <div key={f.title} className="rounded-2xl border border-border bg-background p-6">
                    <f.icon className="h-5 w-5 text-primary" />
                    <p className="mt-3.5 font-display text-lg font-semibold">{f.title}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
