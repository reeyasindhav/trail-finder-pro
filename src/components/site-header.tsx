import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Bookmark, Compass, Menu, X } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/discover", label: "Discover" },
  { to: "/saved", label: "Saved trails" },
  { to: "/gear", label: "Gear" },
  { to: "/community", label: "Community" },
] as const;

export function SiteHeader() {
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 lg:grid-cols-[auto_1fr_auto]">
        <Link to="/" className="flex min-w-0 items-center gap-2.5">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
            <Compass className="h-4.5 w-4.5" />
          </span>
          <span className="truncate text-xl font-semibold tracking-tight">trailblaze</span>
        </Link>

        <nav className="hidden items-center justify-center gap-8 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground font-medium" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/saved"
            className="hidden h-9 w-9 place-items-center rounded-full border border-border transition-colors hover:bg-secondary sm:grid"
            aria-label="Saved trails"
          >
            <Bookmark className="h-4 w-4" />
          </Link>
          {user ? (
            <div className="flex items-center gap-2">
              <Link
                to="/dashboard"
                className="grid h-9 w-9 place-items-center rounded-full bg-primary font-mono text-xs font-semibold text-primary-foreground"
              >
                {user.initials}
              </Link>
              <button
                onClick={() => {
                  signOut();
                  navigate({ to: "/" });
                }}
                className="hidden text-sm text-muted-foreground hover:text-foreground sm:block"
              >
                Sign out
              </button>
            </div>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground">
                Log in
              </Link>
              <Link
                to="/signup"
                className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03]"
              >
                Join free
              </Link>
            </div>
          )}
          <button
            className="grid h-9 w-9 place-items-center rounded-full border border-border lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-border transition-[max-height] duration-300 lg:hidden",
          open ? "max-h-96" : "max-h-0 border-t-0",
        )}
      >
        <nav className="flex flex-col gap-1 px-5 py-3">
          {[...nav, { to: "/dashboard", label: "Dashboard" }, { to: "/login", label: "Log in" }].map((n) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-secondary"
            >
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
