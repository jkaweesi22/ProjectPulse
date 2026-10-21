'use client';

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { ChartCard } from '@/components/charts/ChartCard';
import { CHART_COLORS } from '@/components/charts/chart-theme';
import type { BlockerTrendPoint } from '@/types';

function formatWeek(w: string) {
  const d = new Date(w);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });
}

export function BlockerTrendsChart({ data }: { data: BlockerTrendPoint[] }) {
  const chartData = data.map((d) => ({
    ...d,
    label: formatWeek(d.week),
  }));

  return (
    <ChartCard
      title="Blocker trends"
      description="Open blockers and critical subset (portfolio aggregate)"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border-subtle))" />
          <XAxis
            dataKey="label"
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
            contentStyle={{
              borderRadius: 8,
              borderColor: 'hsl(var(--border))',
              background: 'hsl(var(--surface-elevated))',
            }}
          />
          <Legend verticalAlign="top" height={28} iconType="circle" />
          <Line
            type="monotone"
            dataKey="openBlockers"
            name="Open blockers"
            stroke={CHART_COLORS.primary}
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="criticalOpen"
            name="Critical open"
            stroke={CHART_COLORS.danger}
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
