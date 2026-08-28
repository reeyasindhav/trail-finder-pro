import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/leave-no-trace")({
  head: () => ({
    meta: [
      { title: "Leave No Trace — Trailblaze" },
      {
        name: "description",
        content:
          "Learn the seven Leave No Trace principles for responsible hiking and outdoor recreation.",
      },
    ],
  }),
  component: LeaveNoTrace,
});

function LeaveNoTrace() {
  const principles = [
    "Plan ahead and prepare.",
    "Travel and camp on durable surfaces.",
    "Dispose of waste properly.",
    "Leave what you find.",
    "Minimize campfire impacts.",
    "Respect wildlife.",
    "Be considerate of other visitors.",
  ];

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
      <Reveal>
        <span className="label-mono text-muted-foreground">RESOURCES</span>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight lg:text-5xl">
          Leave No Trace
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Follow these seven principles to protect nature and keep trails enjoyable for everyone.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {principles.map((item, idx) => (
          <Reveal key={item} delay={idx * 80}>
            <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5">
              <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary font-mono text-xs font-semibold text-secondary-foreground">
                {idx + 1}
              </span>
              <p className="text-sm leading-relaxed text-foreground">{item}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
