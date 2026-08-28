import { useEffect, useState } from "react";
import { MapPin, Layers, Maximize2 } from "lucide-react";
import type { Trail } from "@/lib/trails";
import { cn } from "@/lib/utils";

/** Stylised topographic route map rendered as SVG — no external map key needed. */
export function TrailMap({ trail, className }: { trail: Trail; className?: string }) {
  const [active, setActive] = useState<number | null>(null);
  const [draw, setDraw] = useState(false);
  const gradientId = `tmg-${trail.slug.replace(/[^a-z0-9]/g, "-")}`;

  useEffect(() => {
    const t = setTimeout(() => setDraw(true), 120);
    return () => clearTimeout(t);
  }, []);

  const path = "M 40 300 C 110 260, 130 190, 200 180 S 300 210, 340 150 S 430 90, 520 110";
  const marks = [
    { x: 40, y: 300 },
    { x: 200, y: 180 },
    { x: 340, y: 150 },
    { x: 520, y: 110 },
  ];

  return (
    <div
      className={cn("relative overflow-hidden rounded-2xl border border-border bg-sand", className)}
    >
      <svg
        viewBox="0 0 560 360"
        className="h-full w-full"
        role="img"
        aria-label={`Route map for ${trail.name}`}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--sand)" />
            <stop offset="100%" stopColor="var(--sand-deep)" />
          </linearGradient>
        </defs>
        <rect width="560" height="360" fill={`url(#${gradientId})`} />
        {Array.from({ length: 11 }).map((_, i) => (
          <ellipse
            key={i}
            cx={330}
            cy={150}
            rx={30 + i * 34}
            ry={20 + i * 24}
            fill="none"
            stroke="var(--clay)"
            strokeOpacity={0.22}
            strokeWidth={1}
          />
        ))}
        <path
          d="M 0 330 L 120 250 L 210 320 L 300 240 L 400 330 L 560 250 L 560 360 L 0 360 Z"
          fill="var(--moss)"
          opacity={0.16}
        />
        <path
          d={path}
          fill="none"
          stroke="var(--forest)"
          strokeWidth={4.5}
          strokeLinecap="round"
          strokeDasharray={900}
          strokeDashoffset={draw ? 0 : 900}
          style={{ transition: "stroke-dashoffset 2.4s cubic-bezier(0.22,1,0.36,1)" }}
        />
        <path
          d={path}
          fill="none"
          stroke="var(--ember)"
          strokeWidth={1.5}
          strokeDasharray="6 10"
          opacity={0.85}
        />
        {marks.map((m, i) => (
          <g
            key={i}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            className="cursor-pointer"
          >
            <circle
              cx={m.x}
              cy={m.y}
              r={active === i ? 12 : 8}
              fill="var(--background)"
              stroke="var(--forest)"
              strokeWidth={3}
              style={{ transition: "r .2s ease" }}
            />
            {active === i && trail.waypoints[i] && (
              <g>
                <rect
                  x={Math.min(m.x + 14, 320)}
                  y={m.y - 34}
                  width={220}
                  height={44}
                  rx={8}
                  fill="var(--forest)"
                />
                <text
                  x={Math.min(m.x + 26, 332)}
                  y={m.y - 16}
                  fill="var(--primary-foreground)"
                  fontSize={13}
                  fontWeight={600}
                >
                  {trail.waypoints[i]!.name}
                </text>
                <text
                  x={Math.min(m.x + 26, 332)}
                  y={m.y - 1}
                  fill="var(--primary-foreground)"
                  opacity={0.75}
                  fontSize={11}
                >
                  Mile {trail.waypoints[i]!.mi}
                </text>
              </g>
            )}
          </g>
        ))}
      </svg>

      <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-background/85 px-3 py-1.5 backdrop-blur">
        <MapPin className="h-3.5 w-3.5 text-primary" />
        <span className="label-mono">
          {trail.region}, {trail.state}
        </span>
      </div>
      <div className="absolute right-4 top-4 flex gap-2">
        <button className="rounded-lg border border-border bg-background/85 p-2 backdrop-blur transition-colors hover:bg-background">
          <Layers className="h-4 w-4" />
        </button>
        <button className="rounded-lg border border-border bg-background/85 p-2 backdrop-blur transition-colors hover:bg-background">
          <Maximize2 className="h-4 w-4" />
        </button>
      </div>
      <div className="absolute bottom-4 left-4 rounded-lg bg-background/85 px-3 py-2 backdrop-blur">
        <p className="label-mono text-muted-foreground">Hover markers for waypoints</p>
      </div>
    </div>
  );
}
