import { createFileRoute } from "@tanstack/react-router";
import { type ReactNode } from "react";
import { Reveal } from "@/components/reveal";
import { useAuth } from "@/lib/auth";
import { Calendar, Flame, Footprints, Mountain, TrendingUp } from "lucide-react";
import { ElevationChart } from "@/components/elevation-chart";
import { plannedHikes, activityLog, trails } from "@/lib/trails";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Trailblaze" },
      {
        name: "description",
        content: "View your planned hikes, mileage stats, and trail activity.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const totalMiles = activityLog.reduce((sum, m) => sum + m.miles, 0);
  const totalPlanned = plannedHikes.length;

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
      <Reveal>
        <span className="label-mono text-muted-foreground">YOUR HUB</span>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight lg:text-5xl">
          Dashboard
        </h1>
        <p className="mt-2 text-muted-foreground">Track your hiking stats and upcoming trips.</p>
      </Reveal>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "This year", value: `${totalMiles} mi`, icon: TrendingUp },
          { label: "Planned hikes", value: String(totalPlanned), icon: CalendarIcon },
          { label: "Trails saved", value: "2", icon: BookmarkIcon },
          { label: "Active streak", value: "4 weeks", icon: Flame },
        ].map((stat, i) => (
          <Reveal key={stat.label} delay={i * 80}>
            <div className="rounded-2xl border border-border bg-card p-5">
              <stat.icon className="h-4 w-4 text-primary" />
              <p className="mt-3 font-display text-2xl font-semibold">{stat.value}</p>
              <p className="mt-1 label-mono text-muted-foreground">{stat.label}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <Reveal>
            <div className="rounded-2xl border border-border bg-card p-5">
              <h3 className="font-display text-xl font-semibold">Monthly mileage</h3>
              <div className="mt-4">
                <ElevationChart
                  trail={{
                    slug: "activity",
                    name: "Activity",
                    region: "",
                    state: "",
                    difficulty: "Easy",
                    distanceMi: 0,
                    elevationFt: 0,
                    rating: 0,
                    reviewCount: 0,
                    durationHrs: 0,
                    routeType: "Loop",
                    season: "",
                    summary: "",
                    description: "",
                    image: "",
                    tags: [],
                    elevation: activityLog.map((m) => ({ mi: 0, ft: m.miles * 528 })),
                    waypoints: [],
                  }}
                  height={220}
                />
              </div>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-2">
          <Reveal delay={80}>
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-display text-xl font-semibold">Upcoming hikes</h3>
              <div className="mt-5 space-y-3">
                {plannedHikes.map((hike) => {
                  const trail = trails.find((t) => t.slug === hike.slug);
                  if (!trail) return null;
                  return (
                    <a
                      key={hike.id}
                      href={`/trails/${hike.slug}`}
                      className="flex items-center justify-between rounded-xl border border-border p-3.5 transition-colors hover:bg-secondary"
                    >
                      <div>
                        <p className="text-sm font-semibold">{hike.trail}</p>
                        <p className="text-xs text-muted-foreground">
                          {hike.date} · Party of {hike.party}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-mono text-primary">{hike.gearReady}%</p>
                        <p className="text-[10px] text-muted-foreground">gear ready</p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

function BookmarkIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
    </svg>
  );
}

function CalendarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}
