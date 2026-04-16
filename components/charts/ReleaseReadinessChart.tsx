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

export function ReleaseReadinessChart({
  data,
}: {
  data: { name: string; value: number; key: string }[];
}) {
  return (
    <ChartCard title="Release readiness overview" description="Programs by readiness stage">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border-subtle))" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fill: 'hsl(var(--foreground-muted))', fontSize: 11 }}
            axisLine={{ stroke: 'hsl(var(--border-subtle))' }}
            tickLine={false}
          />
          <YAxis
            allowDecimals={false}
            tick={{ fill: 'hsl(var(--foreground-muted))', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            formatter={(value: number) => [`${value} projects`, 'Count']}
            contentStyle={{
              borderRadius: 8,
              borderColor: 'hsl(var(--border))',
              background: 'hsl(var(--surface-elevated))',
            }}
          />
          <Bar dataKey="value" fill={CHART_COLORS.purple} radius={[6, 6, 0, 0]} maxBarSize={44} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
