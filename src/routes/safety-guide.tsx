import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/safety-guide")({
  head: () => ({
    meta: [
      { title: "Safety guide — Trailblaze" },
      {
        name: "description",
        content: "Essential hiking safety tips, gear checks, and preparation advice.",
      },
    ],
  }),
  component: SafetyGuide,
});

function SafetyGuide() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
      <Reveal>
        <span className="label-mono text-muted-foreground">RESOURCES</span>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight lg:text-5xl">
          Safety guide
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Stay safe on the trail with these essential preparation tips and gear checks.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {[
          {
            title: "Check the weather",
            body: "Review forecasts, wind, and precipitation before heading out. Conditions can change quickly in mountains and canyons.",
          },
          {
            title: "Tell someone your plan",
            body: "Share your route, expected return time, and check-in points with a friend or family member.",
          },
          {
            title: "Pack the essentials",
            body: "Carry navigation, hydration, first aid, insulation, light, fire starter, repair kit, extra food, and emergency shelter.",
          },
          {
            title: "Know your limits",
            body: "Choose trails that match your fitness and experience. It’s okay to turn back if conditions feel unsafe.",
          },
          {
            title: "Stay on marked paths",
            body: "Stick to official trails to avoid getting lost and to protect fragile ecosystems.",
          },
          {
            title: "Bring enough water",
            body: "Carry more water than you think you need, and bring a way to treat or filter extra water when possible.",
          },
        ].map((item, idx) => (
          <Reveal key={item.title} delay={idx * 80}>
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-display text-xl font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
