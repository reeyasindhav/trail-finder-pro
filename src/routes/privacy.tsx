import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Trailblaze" },
      {
        name: "description",
        content: "Read how Trailblaze handles your data, privacy, and account information.",
      },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  const sections = [
    {
      title: "Information we collect",
      body: "We collect information you provide directly, such as your name, email, and saved trail preferences. We also store limited usage data to improve site performance and experience.",
    },
    {
      title: "How we use your information",
      body: "Your data is used to personalize your experience, sync saved trails across sessions, and improve Trailblaze. We do not sell or share personal data with third parties.",
    },
    {
      title: "Cookies and local storage",
      body: "Trailblaze uses browser storage to keep you signed in and remember your saved trails. You can clear this data anytime through your browser settings.",
    },
    {
      title: "Data security",
      body: "We take reasonable measures to protect your account and usage data. No method of transmission over the internet is completely secure, so we encourage strong passwords and careful account use.",
    },
    {
      title: "Your choices",
      body: "You may update or delete your saved data at any time. You can also sign out to remove active session data from your device.",
    },
    {
      title: "Contact",
      body: "If you have questions about this privacy policy, reach out through the contact channels listed on our About page.",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
      <Reveal>
        <span className="label-mono text-muted-foreground">POLICY</span>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight lg:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          We value your privacy. Here’s how Trailblaze handles your data and protects your
          experience.
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
