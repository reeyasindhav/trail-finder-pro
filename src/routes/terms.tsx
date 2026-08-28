import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Trailblaze" },
      {
        name: "description",
        content: "Read the terms and conditions for using Trailblaze.",
      },
    ],
  }),
  component: Terms,
});

function Terms() {
  const sections = [
    {
      title: "Acceptance of terms",
      body: "By using Trailblaze, you agree to these terms. If you do not agree, please do not use the app.",
    },
    {
      title: "Use of the service",
      body: "Trailblaze is provided for personal, non-commercial hiking planning and discovery. You are responsible for your own safety and decisions on the trail.",
    },
    {
      title: "User content",
      body: "Trip reports, comments, and other user content must be accurate, respectful, and lawful. Trailblaze may remove content that violates these standards.",
    },
    {
      title: "Intellectual property",
      body: "Trailblaze and its original content are the property of Trailblaze. Third-party images and trademarks remain the property of their respective owners.",
    },
    {
      title: "Limitation of liability",
      body: "Trailblaze is provided as-is. We do not guarantee trail accuracy, weather safety, or fitness outcomes. Use the app at your own risk.",
    },
    {
      title: "Changes to these terms",
      body: "We may update these terms from time to time. Continued use of Trailblaze after changes means you accept the updated terms.",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
      <Reveal>
        <span className="label-mono text-muted-foreground">LEGAL</span>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight lg:text-5xl">
          Terms of Service
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Please read these terms carefully before using Trailblaze.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {sections.map((item, idx) => (
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
