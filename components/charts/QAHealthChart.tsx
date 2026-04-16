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

export function QAHealthChart({
  data,
}: {
  data: { name: string; coverage: number; id: string }[];
}) {
  return (
    <ChartCard
      title="QA health by project"
      description="Top programs by automated coverage signal"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 8, right: 8, left: 8, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border-subtle))" horizontal={false} />
          <XAxis
            type="number"
            domain={[0, 100]}
            tick={{ fill: 'hsl(var(--foreground-muted))', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}%`}
          />
          <YAxis
            type="category"
            dataKey="name"
            width={120}
            tick={{ fill: 'hsl(var(--foreground-muted))', fontSize: 10 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            formatter={(value: number) => [`${value}%`, 'QA coverage']}
            contentStyle={{
              borderRadius: 8,
              borderColor: 'hsl(var(--border))',
              background: 'hsl(var(--surface-elevated))',
            }}
          />
          <Bar dataKey="coverage" fill={CHART_COLORS.teal} radius={[0, 6, 6, 0]} maxBarSize={18} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
