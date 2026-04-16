'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { ChartCard } from '@/components/charts/ChartCard';
import { CHART_COLORS } from '@/components/charts/chart-theme';

export function ProgressByTeamChart({
  data,
}: {
  data: { team: string; progress: number; projects: number }[];
}) {
  return (
    <ChartCard title="Progress by team" description="Average delivery progress across teams">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border-subtle))" vertical={false} />
          <XAxis
            dataKey="team"
            tick={{ fill: 'hsl(var(--foreground-muted))', fontSize: 11 }}
            axisLine={{ stroke: 'hsl(var(--border-subtle))' }}
            tickLine={false}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fill: 'hsl(var(--foreground-muted))', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}%`}
          />
          <Tooltip
            formatter={(value, _name, item) => {
              const p = item?.payload as { projects?: number } | undefined;
              return [`${value}% avg (${p?.projects ?? 0} projects)`, 'Progress'];
            }}
            contentStyle={{
              borderRadius: 8,
              borderColor: 'hsl(var(--border))',
              background: 'hsl(var(--surface-elevated))',
            }}
          />
          <Bar dataKey="progress" fill={CHART_COLORS.primary} radius={[6, 6, 0, 0]} maxBarSize={48} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
