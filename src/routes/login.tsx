import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Reveal } from "@/components/reveal";
import { useAuth } from "@/lib/auth";
import { AuthLayout } from "@/components/auth-layout";
import { useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log in — Trailblaze" },
      {
        name: "description",
        content: "Log in to save trails, plan hikes, and sync your gear checklists.",
      },
    ],
  }),
  component: Login,
});

function Login() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    signIn(email, name);
    navigate({ to: "/dashboard" });
  };

  return (
    <AuthLayout
      title="Log in"
      subtitle="Pick up where you left off on your next adventure."
      linkText="Don't have an account?"
      linkHref="/signup"
    >
      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <Reveal delay={80}>
          <div>
            <label className="label-mono text-muted-foreground">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="mt-2 h-11 w-full rounded-lg border border-border bg-background px-3.5 text-sm outline-none transition-colors focus:border-primary"
            />
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div>
            <label className="label-mono text-muted-foreground">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="mt-2 h-11 w-full rounded-lg border border-border bg-background px-3.5 text-sm outline-none transition-colors focus:border-primary"
            />
          </div>
        </Reveal>
        <Reveal delay={160}>
          <button
            type="submit"
            className="h-11 w-full rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.01]"
          >
            Continue
          </button>
        </Reveal>
      </form>
    </AuthLayout>
  );
}
