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
import { STATUS_COLORS } from '@/components/charts/chart-theme';
import { EmptyState } from '@/components/ui/EmptyState';
import type { ProjectStatus } from '@/types';

const RADIAN = Math.PI / 180;

export function ProjectStatusChart({
  data,
}: {
  data: { status: ProjectStatus; name: string; value: number }[];
}) {
  const filtered = data.filter((d) => d.value > 0);
  if (filtered.length === 0) {
    return (
      <ChartCard title="Project status distribution" description="Active portfolio mix">
        <EmptyState title="No projects" description="Status breakdown will appear here." />
      </ChartCard>
    );
  }

  return (
    <ChartCard title="Project status distribution" description="Snapshot by delivery posture">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={filtered}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={56}
            outerRadius={88}
            paddingAngle={2}
            label={({
              cx,
              cy,
              midAngle,
              innerRadius,
              outerRadius,
              percent,
            }: {
              cx: number;
              cy: number;
              midAngle: number;
              innerRadius: number;
              outerRadius: number;
              percent: number;
            }) => {
              const radius = innerRadius + (outerRadius - innerRadius) * 0.55;
              const x = cx + radius * Math.cos(-midAngle * RADIAN);
              const y = cy + radius * Math.sin(-midAngle * RADIAN);
              if (percent < 0.06) return null;
              return (
                <text
                  x={x}
                  y={y}
                  fill="hsl(var(--foreground))"
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="text-[10px] font-semibold"
                >
                  {`${(percent * 100).toFixed(0)}%`}
                </text>
              );
            }}
          >
            {filtered.map((entry) => (
              <Cell
                key={entry.status}
                fill={STATUS_COLORS[entry.status] ?? '#64748b'}
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
