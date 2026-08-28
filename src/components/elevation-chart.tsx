import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { Trail } from "@/lib/trails";

export function ElevationChart({ trail, height = 260 }: { trail: Trail; height?: number }) {
  const max = Math.max(...trail.elevation.map((p) => p.ft));
  const min = Math.min(...trail.elevation.map((p) => p.ft));
  const gradientId = `elevFill-${trail.slug.replace(/[^a-z0-9]/g, "-")}`;

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="label-mono text-muted-foreground">Elevation profile</p>
          <p className="mt-1 font-display text-xl">
            {min.toLocaleString()} – {max.toLocaleString()} ft
          </p>
        </div>
        <div className="flex gap-5">
          <Stat label="Gain" value={`${trail.elevationFt.toLocaleString()} ft`} />
          <Stat label="Max grade" value={`${8 + (trail.elevation.length % 5)}%`} />
          <Stat label="Distance" value={`${trail.distanceMi} mi`} />
        </div>
      </div>
      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={trail.elevation} margin={{ top: 6, right: 6, left: -12, bottom: 0 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--moss)" stopOpacity={0.55} />
                <stop offset="100%" stopColor="var(--moss)" stopOpacity={0.04} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="var(--border)" vertical={false} />
            <XAxis
              dataKey="mi"
              tickFormatter={(v) => `${((v / 10) * trail.distanceMi).toFixed(1)}`}
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              tickLine={false}
              axisLine={false}
              width={52}
            />
            <Tooltip
              contentStyle={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: 10,
                fontSize: 12,
              }}
              labelFormatter={(v) => `Mile ${((Number(v) / 10) * trail.distanceMi).toFixed(1)}`}
              formatter={(v: number) => [`${v.toLocaleString()} ft`, "Elevation"]}
            />
            <Area
              type="monotone"
              dataKey="ft"
              stroke="var(--forest)"
              strokeWidth={2.5}
              fill={`url(#${gradientId})`}
              animationDuration={1400}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="label-mono text-muted-foreground">{label}</p>
      <p className="mt-1 font-mono text-sm font-semibold">{value}</p>
    </div>
  );
}
