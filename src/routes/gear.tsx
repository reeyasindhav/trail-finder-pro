import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/reveal";
import { gearChecklist } from "@/lib/trails";

export const Route = createFileRoute("/gear")({
  head: () => ({
    meta: [
      { title: "Gear checklist — Trailblaze" },
      {
        name: "description",
        content: "Essential gear for every hike. Browse categories, notes, and must-haves.",
      },
    ],
  }),
  component: Gear,
});

function Gear() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
      <Reveal>
        <span className="label-mono text-muted-foreground">PREPARE</span>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight lg:text-5xl">
          Gear checklist
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Use these lists as a starting point. Adjust for season, route length, and conditions.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {gearChecklist.map((cat, ci) => (
          <Reveal key={cat.id} delay={ci * 80}>
            <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6">
              <h2 className="font-display text-xl font-semibold">{cat.title}</h2>
              <ul className="mt-5 flex-1 space-y-3.5">
                {cat.items.map((item) => (
                  <li key={item.id} className="flex items-start gap-3.5">
                    <span className={cnCheck(item.essential)}>{item.essential ? "E" : "O"}</span>
                    <div>
                      <p className="text-sm font-medium">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.note}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={200}>
        <div className="mt-16 rounded-2xl border border-border bg-card p-8">
          <h3 className="font-display text-xl font-semibold">Pro tips</h3>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Check recent trip reports for route-specific conditions.",
              "Carry 10% more water than you think you need.",
              "Break in boots before a big day.",
              "Pack layers, not just a puffy.",
              "Tell someone your route and return time.",
              "Keep your headlamp accessible, not buried.",
            ].map((tip) => (
              <li
                key={tip}
                className="flex items-start gap-2.5 rounded-xl border border-border p-4"
              >
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                <span className="text-sm text-muted-foreground">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </div>
  );
}

function cnCheck(essential: boolean) {
  return [
    "grid h-6.5 w-6.5 shrink-0 place-items-center rounded-full text-[10px] font-mono font-bold",
    essential ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground",
  ].join(" ");
}
