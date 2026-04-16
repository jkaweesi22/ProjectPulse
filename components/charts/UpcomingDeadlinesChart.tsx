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

export function UpcomingDeadlinesChart({
  data,
}: {
  data: { name: string; days: number; due: string; id: string }[];
}) {
  return (
    <ChartCard
      title="Upcoming deadlines"
      description="Days until next major due date (selected programs)"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 32 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border-subtle))" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fill: 'hsl(var(--foreground-muted))', fontSize: 10 }}
            axisLine={{ stroke: 'hsl(var(--border-subtle))' }}
            tickLine={false}
            interval={0}
            angle={-18}
            textAnchor="end"
            height={48}
          />
          <YAxis
            tick={{ fill: 'hsl(var(--foreground-muted))', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            label={{
              value: 'Days',
              angle: -90,
              position: 'insideLeft',
              fill: 'hsl(var(--foreground-muted))',
              fontSize: 11,
            }}
          />
          <Tooltip
            formatter={(value, _name, item) => {
              const p = item?.payload as { due?: string } | undefined;
              return [`${value} days (due ${p?.due ?? '—'})`, 'Window'];
            }}
            contentStyle={{
              borderRadius: 8,
              borderColor: 'hsl(var(--border))',
              background: 'hsl(var(--surface-elevated))',
            }}
          />
          <Bar dataKey="days" fill={CHART_COLORS.warning} radius={[6, 6, 0, 0]} maxBarSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
