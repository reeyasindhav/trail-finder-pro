import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Bookmark, Compass, Menu, X } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { ConfirmSignOutDialog } from "@/components/confirm-signout-dialog";

const nav = [
  { to: "/discover", label: "Discover" },
  { to: "/gear", label: "Gear" },
  { to: "/community", label: "Community" },
] as const;

export function SiteHeader() {
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const [confirmSignOutOpen, setConfirmSignOutOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = () => {
    setConfirmSignOutOpen(false);
    signOut();
    navigate({ to: "/" });
  };

  return (
    <>
      <ConfirmSignOutDialog
        open={confirmSignOutOpen}
        onOpenChange={setConfirmSignOutOpen}
        onConfirm={handleSignOut}
      />
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-5 py-3.5 lg:px-8">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-forest text-primary-foreground shadow-sm">
                <Compass className="h-5 w-5" />
              </span>
              <span className="text-lg font-semibold tracking-tight">trailblaze</span>
            </Link>

            <nav className="hidden items-center gap-10 lg:flex">
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

            <div className="flex items-center gap-2.5">
              <Link
                to="/saved"
                className="hidden h-9 w-9 place-items-center rounded-full border border-border transition-colors hover:bg-secondary sm:grid"
                aria-label="Saved trails"
              >
                <Bookmark className="h-4 w-4" />
              </Link>
              {user ? (
                <div className="flex items-center gap-3">
                  <Link
                    to="/dashboard"
                    className="grid h-9 w-9 place-items-center rounded-full bg-primary font-mono text-xs font-semibold text-primary-foreground"
                  >
                    {user.initials}
                  </Link>
                  <button
                    onClick={() => setConfirmSignOutOpen(true)}
                    className="hidden text-sm text-muted-foreground hover:text-foreground sm:block"
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <div className="hidden items-center gap-2.5 sm:flex">
                  <Link
                    to="/login"
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/signup"
                    className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-transform hover:scale-[1.03]"
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
              "overflow-hidden transition-all duration-300 lg:hidden",
              open ? "max-h-80 opacity-100" : "max-h-0 opacity-0",
            )}
          >
            <nav className="flex flex-col gap-1 py-3">
              {[
                ...nav,
                { to: "/dashboard", label: "Dashboard" },
                { to: "/login", label: "Log in" },
                { to: "/signup", label: "Join free" },
              ].map((n) => (
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
        </div>
      </header>
    </>
  );
}
