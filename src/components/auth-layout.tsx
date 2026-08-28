import { type ReactNode } from "react";
import { Compass } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function AuthLayout({
  children,
  title,
  subtitle,
  linkText,
  linkHref,
}: {
  children: ReactNode;
  title: string;
  subtitle: string;
  linkText: string;
  linkHref: string;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <img
          src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1400&q=70"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-br from-forest/90 via-forest-deep/80 to-forest-deep/90" />
        <div className="relative flex h-full flex-col justify-between p-12">
          <Link to="/" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-primary-foreground/10 text-primary-foreground">
              <Compass className="h-5 w-5" />
            </span>
            <span className="text-xl font-semibold tracking-tight text-primary-foreground">
              trailblaze
            </span>
          </Link>
          <div>
            <p className="max-w-md text-lg leading-relaxed text-primary-foreground/90">
              {subtitle}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center px-5 py-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden">
            <Link to="/" className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground">
                <Compass className="h-5 w-5" />
              </span>
              <span className="text-xl font-semibold tracking-tight">trailblaze</span>
            </Link>
          </div>
          <div className="mt-10 lg:mt-0">
            <h1 className="font-display text-3xl font-semibold tracking-tight">{title}</h1>
            <p className="mt-2 text-muted-foreground">{subtitle}</p>
          </div>
          {children}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            {linkText}{" "}
            <Link
              to={linkHref}
              className="font-semibold text-primary underline-offset-4 hover:underline"
            >
              {linkHref === "/login" ? "Log in" : "Join free"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
