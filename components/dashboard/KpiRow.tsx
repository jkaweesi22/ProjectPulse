import { Card } from '@/components/ui/Card';
import type { PortfolioKpis } from '@/types';

const items: {
  key: keyof PortfolioKpis;
  label: string;
  hint?: string;
  format?: 'int' | 'percent' | 'decimal';
}[] = [
  { key: 'totalActiveProjects', label: 'Active projects', hint: 'Non-completed' },
  { key: 'onTrack', label: 'On track', format: 'int' },
  { key: 'atRisk', label: 'At risk', format: 'int' },
  { key: 'delayed', label: 'Delayed', format: 'int' },
  { key: 'completed', label: 'Completed', format: 'int' },
  { key: 'releaseReady', label: 'Release ready', format: 'int' },
  { key: 'openBlockers', label: 'Open blockers', hint: 'Across portfolio' },
  { key: 'averageQaCoverage', label: 'Avg QA coverage', format: 'percent' },
];

function formatValue(
  key: keyof PortfolioKpis,
  kpis: PortfolioKpis,
  format?: 'int' | 'percent' | 'decimal',
) {
  const v = kpis[key];
  if (format === 'percent') {
    return `${v}%`;
  }
  if (format === 'decimal') {
    return typeof v === 'number' ? v.toFixed(1) : String(v);
  }
  return String(v);
}

export function KpiRow({ kpis }: { kpis: PortfolioKpis }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8">
      {items.map((item) => (
        <Card key={item.key} padding="sm" className="shadow-card">
          <p className="text-[11px] font-medium uppercase tracking-wide text-foreground-muted">
            {item.label}
          </p>
          <p className="mt-2 text-2xl font-semibold tabular-nums tracking-tight text-foreground">
            {formatValue(item.key, kpis, item.format)}
          </p>
          {item.hint ? (
            <p className="mt-1 text-[11px] text-foreground-muted">{item.hint}</p>
          ) : (
            <p className="mt-1 text-[11px] text-transparent">.</p>
          )}
        </Card>
      ))}
    </div>
  );
}
