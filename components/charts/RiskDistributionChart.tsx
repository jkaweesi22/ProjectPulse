'use client';

import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

import { ChartCard } from '@/components/charts/ChartCard';
import { RISK_COLORS } from '@/components/charts/chart-theme';
import { EmptyState } from '@/components/ui/EmptyState';
import type { RiskLevel } from '@/types';

export function RiskDistributionChart({
  data,
}: {
  data: { risk: RiskLevel; name: string; value: number }[];
}) {
  const filtered = data.filter((d) => d.value > 0);
  if (filtered.length === 0) {
    return (
      <ChartCard title="Risk distribution" description="Portfolio risk concentration">
        <EmptyState title="No data" />
      </ChartCard>
    );
  }

  return (
    <ChartCard title="Risk distribution" description="Where attention is concentrated">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={filtered}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={52}
            outerRadius={86}
            paddingAngle={2}
          >
            {filtered.map((entry) => (
              <Cell
                key={entry.risk}
                fill={RISK_COLORS[entry.risk] ?? '#64748b'}
                stroke="hsl(var(--surface))"
                strokeWidth={2}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, _name, item) => {
              const p = item?.payload as { name?: string } | undefined;
              return [`${value} projects`, p?.name ?? ''];
            }}
            contentStyle={{
              borderRadius: 8,
              borderColor: 'hsl(var(--border))',
              background: 'hsl(var(--surface-elevated))',
            }}
          />
          <Legend verticalAlign="bottom" height={28} iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
