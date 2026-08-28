import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Trailblaze" },
      {
        name: "description",
        content: "Learn about Trailblaze and our mission to help hikers discover trails.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
      <Reveal>
        <span className="label-mono text-muted-foreground">OUR STORY</span>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight lg:text-5xl">
          Built for hikers, by hikers
        </h1>
        <p className="mt-5 max-w-3xl leading-relaxed text-muted-foreground">
          Trailblaze started from a simple frustration: planning a hike meant juggling multiple
          sites, guessing at conditions, and hoping the trailhead info was current. We believe route
          discovery, elevation data, gear planning, and community reports belong in one place.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[
          {
            title: "Verified routes",
            desc: "Curated trails with accurate distances, elevation, and difficulty ratings.",
          },
          {
            title: "Real-time reports",
            desc: "Community trip reports keep conditions fresh and trustworthy.",
          },
          {
            title: "Gear confidence",
            desc: "Checklists tied to each route so you pack the right kit.",
          },
          {
            title: "Privacy first",
            desc: "Your saved trails and session stay on your device by default.",
          },
          {
            title: "Offline-ready",
            desc: "Export routes and checklists for when cell service ends.",
          },
          { title: "Open feedback", desc: "We iterate fast based on what hikers actually need." },
        ].map((item, i) => (
          <Reveal key={item.title} delay={i * 80}>
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-display text-lg font-semibold">{item.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
