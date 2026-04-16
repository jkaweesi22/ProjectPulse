'use client';

import Link from 'next/link';

import { Badge } from '@/components/ui/Badge';
import { Card, CardHeader } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import {
  getCriticalBlockers,
  getDependencyImpediments,
  getHighRiskProjects,
  getOverdueProjects,
} from '@/lib/data-service';
import type { Project } from '@/types';

export function RisksBlockersSection({
  projects,
  onSelectProject,
}: {
  projects: Project[];
  onSelectProject: (p: Project) => void;
}) {
  const highRisk = getHighRiskProjects(projects);
  const critical = getCriticalBlockers(projects);
  const overdue = getOverdueProjects(projects);
  const deps = getDependencyImpediments(projects);

  return (
    <section id="risks" className="scroll-mt-28 space-y-4">
      <div>
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Risks & blockers
        </h2>
        <p className="mt-1 text-sm text-foreground-muted">
          Executive highlights: concentration risk, critical impediments, schedule pressure, and
          cross-team dependencies.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader
            title="High-risk programs"
            description="Projects tagged high or critical risk"
          />
          {highRisk.length === 0 ? (
            <EmptyState title="No high-risk projects" description="Portfolio risk is within tolerance." />
          ) : (
            <ul className="space-y-2">
              {highRisk.map((p) => (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => onSelectProject(p)}
                    className="flex w-full items-start justify-between gap-3 rounded-lg border border-border-subtle bg-surface-muted/40 px-3 py-2 text-left transition hover:bg-surface-muted"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground">{p.name}</p>
                      <p className="mt-0.5 text-xs text-foreground-muted">
                        {p.team} · due {p.dueDate}
                      </p>
                    </div>
                    <Badge tone="warning">{p.riskLevel}</Badge>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card>
          <CardHeader title="Critical blockers" description="Open blockers marked critical" />
          {critical.length === 0 ? (
            <EmptyState title="No critical blockers" description="Nice work — keep monitoring." />
          ) : (
            <ul className="space-y-2">
              {critical.map(({ project, blocker }) => (
                <li key={`${project.id}-${blocker.id}`}>
                  <button
                    type="button"
                    onClick={() => onSelectProject(project)}
                    className="w-full rounded-lg border border-border-subtle bg-surface-muted/40 px-3 py-2 text-left transition hover:bg-surface-muted"
                  >
                    <p className="text-sm font-semibold text-foreground">{blocker.title}</p>
                    <p className="mt-1 text-xs text-foreground-muted">
                      {project.name} · since {blocker.openedSince}
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card>
          <CardHeader
            title="Overdue items"
            description="Active programs past committed due date"
          />
          {overdue.length === 0 ? (
            <EmptyState title="Nothing overdue" description="Dates reflect latest portfolio data." />
          ) : (
            <ul className="space-y-2">
              {overdue.map((p) => (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => onSelectProject(p)}
                    className="flex w-full items-center justify-between gap-3 rounded-lg border border-border-subtle bg-surface-muted/40 px-3 py-2 text-left transition hover:bg-surface-muted"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground">{p.name}</p>
                      <p className="text-xs text-foreground-muted">Was due {p.dueDate}</p>
                    </div>
                    <Badge tone="danger">Overdue</Badge>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card>
          <CardHeader
            title="Dependencies impacting delivery"
            description="Waiting or in-flight cross-team / external dependencies"
          />
          {deps.length === 0 ? (
            <EmptyState title="No dependency friction" description="No tracked waiting work." />
          ) : (
            <ul className="space-y-2">
              {deps.map(({ project, dependency }) => (
                <li key={`${project.id}-${dependency.id}`}>
                  <button
                    type="button"
                    onClick={() => onSelectProject(project)}
                    className="w-full rounded-lg border border-border-subtle bg-surface-muted/40 px-3 py-2 text-left transition hover:bg-surface-muted"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold text-foreground">{dependency.name}</p>
                      <Badge tone="info">{dependency.status.replace('_', ' ')}</Badge>
                    </div>
                    <p className="mt-1 text-xs text-foreground-muted">
                      {project.name}
                      {dependency.team ? ` · ${dependency.team}` : ''} · {dependency.impact}
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      <p className="text-xs text-foreground-muted">
        Tip: use the{' '}
        <Link href="/dashboard/#projects" className="font-medium text-accent underline-offset-2 hover:underline">
          project registry
        </Link>{' '}
        below for full sort/filter workflows.
      </p>
    </section>
  );
}
