import { Link } from "@tanstack/react-router";
import { Compass, Github, Heart, Instagram } from "lucide-react";

const socials = [
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Github, label: "GitHub", href: "#" },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link to="/" className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground">
                <Compass className="h-5 w-5" />
              </span>
              <span className="text-xl font-semibold tracking-tight">trailblaze</span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Plan better hikes. Discover trails, check elevation, and pack the right gear — all in
              one place.
            </p>
            <div className="mt-6 flex items-center gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-border transition-colors hover:bg-secondary hover:border-primary/50"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 lg:col-start-6">
            <p className="label-mono text-foreground">Resources</p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link
                  to="/about"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/safety-guide"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Safety guide
                </Link>
              </li>
              <li>
                <Link
                  to="/leave-no-trace"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Leave No Trace
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2 lg:col-start-8">
            <p className="label-mono text-foreground">Legal</p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link
                  to="/privacy"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Terms
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2 lg:col-start-10">
            <p className="label-mono text-foreground">Account</p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link
                  to="/login"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Log in
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Join free
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Trailblaze. Built with care for the outdoors.
          </p>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            Made with <Heart className="h-3 w-3 fill-ember text-ember" /> for hikers everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}
