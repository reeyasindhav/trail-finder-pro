import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type User = { name: string; email: string; initials: string };

type AuthState = {
  user: User | null;
  ready: boolean;
  signIn: (email: string, name?: string) => void;
  signOut: () => void;
  saved: string[];
  toggleSaved: (slug: string) => void;
};

const KEY = "trailblaze.session";
const SAVED_KEY = "trailblaze.saved";

const AuthContext = createContext<AuthState | null>(null);

const initialsOf = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]!.toUpperCase())
    .join("") || "TB";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [saved, setSaved] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) setUser(JSON.parse(raw) as User);
      const rawSaved = window.localStorage.getItem(SAVED_KEY);
      setSaved(
        rawSaved
          ? (JSON.parse(rawSaved) as string[])
          : ["raven-rock-loop", "larch-basin-circuit", "hemlock-lakes-loop"],
      );
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const signIn = useCallback((email: string, name?: string) => {
    const display = name?.trim() || email.split("@")[0]!.replace(/[._-]/g, " ");
    const next: User = { name: display, email, initials: initialsOf(display) };
    setUser(next);
    window.localStorage.setItem(KEY, JSON.stringify(next));
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
    window.localStorage.removeItem(KEY);
  }, []);

  const toggleSaved = useCallback((slug: string) => {
    setSaved((prev) => {
      const next = prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug];
      window.localStorage.setItem(SAVED_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ user, ready, signIn, signOut, saved, toggleSaved }),
    [user, ready, signIn, signOut, saved, toggleSaved],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
