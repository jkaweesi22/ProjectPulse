'use client';

import { useEffect } from 'react';

import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import {
  PriorityBadge,
  QaBadge,
  ReleaseBadge,
  RiskBadge,
  StatusBadge,
} from '@/components/projects/ProjectBadges';
import {
  priorityLabel,
  projectStatusLabel,
  qaStatusLabel,
  releaseReadinessLabel,
} from '@/lib/labels';
import { cn } from '@/lib/utils';
import type { Project } from '@/types';

export function ProjectDetailDrawer({
  project,
  open,
  onClose,
}: {
  project: Project | null;
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!project) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 transition',
        open ? 'pointer-events-auto' : 'pointer-events-none',
      )}
      aria-hidden={!open}
    >
      <button
        type="button"
        className={cn(
          'absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity',
          open ? 'opacity-100' : 'opacity-0',
        )}
        onClick={onClose}
        aria-label="Close project details"
      />
      <aside
        className={cn(
          'absolute right-0 top-0 flex h-full w-full max-w-xl flex-col border-l border-border-subtle bg-surface shadow-card-hover transition-transform duration-300 ease-out',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-detail-title"
      >
        <div className="flex items-start justify-between gap-4 border-b border-border-subtle px-5 py-4">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-foreground-muted">
              {project.team} · {project.sprint}
            </p>
            <h2 id="project-detail-title" className="mt-1 text-lg font-semibold tracking-tight">
              {project.name}
            </h2>
            <div className="mt-2 flex flex-wrap gap-2">
              <StatusBadge status={project.status} />
              <PriorityBadge priority={project.priority} />
              <RiskBadge risk={project.riskLevel} />
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-border-subtle bg-surface-muted px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-surface"
          >
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 scrollbar-thin">
          <section className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-foreground-muted">
              Summary
            </h3>
            <p className="text-sm leading-relaxed text-foreground">{project.description}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <Metric label="Owner" value={project.owner} />
              <Metric label="Due date" value={project.dueDate} />
              <Metric label="QA status" value={qaStatusLabel(project.qaStatus)} />
              <Metric label="Release readiness" value={releaseReadinessLabel(project.releaseReadiness)} />
              <Metric label="Priority" value={priorityLabel(project.priority)} />
              <Metric label="Last update" value={formatDate(project.lastUpdated)} />
            </div>
            <div>
              <p className="text-xs font-medium text-foreground-muted">Progress</p>
              <div className="mt-2 flex items-center gap-3">
                <ProgressBar value={project.progressPercent} aria-label="Delivery progress" />
                <span className="text-sm font-semibold tabular-nums text-foreground">
                  {project.progressPercent}%
                </span>
              </div>
            </div>
          </section>

          <Section title="Recent updates">
            <ul className="space-y-3">
              {project.updates.map((u) => (
                <li key={u.id} className="rounded-lg border border-border-subtle bg-surface-muted/50 p-3">
                  <p className="text-xs text-foreground-muted">
                    {u.date} · {u.author}
                  </p>
                  <p className="mt-1 text-sm text-foreground">{u.summary}</p>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Milestones">
            <ul className="space-y-2">
              {project.milestones.map((m) => (
                <li
                  key={m.id}
                  className="flex items-start justify-between gap-3 rounded-lg border border-border-subtle px-3 py-2"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground">{m.name}</p>
                    {m.notes ? (
                      <p className="mt-0.5 text-xs text-foreground-muted">{m.notes}</p>
                    ) : null}
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-xs text-foreground-muted">Due</p>
                    <p className="text-xs font-semibold text-foreground">{m.dueDate}</p>
                    <Badge tone={m.status === 'done' ? 'success' : m.status === 'at_risk' ? 'warning' : 'neutral'}>
                      {m.status.replace(/_/g, ' ')}
                    </Badge>
                  </div>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Risks">
            {project.risks.length === 0 ? (
              <p className="text-sm text-foreground-muted">No tracked risks.</p>
            ) : (
              <ul className="space-y-2">
                {project.risks.map((r) => (
                  <li key={r.id} className="rounded-lg border border-border-subtle p-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-medium text-foreground">{r.title}</p>
                      <RiskBadge risk={r.impact} />
                      <Badge tone="muted">{r.status}</Badge>
                    </div>
                    {r.mitigation ? (
                      <p className="mt-2 text-xs text-foreground-muted">{r.mitigation}</p>
                    ) : null}
                  </li>
                ))}
              </ul>
            )}
          </Section>

          <Section title="Dependencies">
            <ul className="space-y-2">
              {project.dependencies.map((d) => (
                <li key={d.id} className="rounded-lg border border-border-subtle px-3 py-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-medium text-foreground">{d.name}</p>
                    <Badge tone="info">{d.status.replace('_', ' ')}</Badge>
                  </div>
                  <p className="mt-1 text-xs text-foreground-muted">
                    {d.type}
                    {d.team ? ` · ${d.team}` : ''} · {d.impact}
                  </p>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="QA notes">
            <ul className="list-disc space-y-1 pl-5 text-sm text-foreground">
              {project.qaNotes.map((note, i) => (
                <li key={i}>{note}</li>
              ))}
            </ul>
          </Section>

          <Section title="Release notes">
            {project.releaseNotes.length === 0 ? (
              <p className="text-sm text-foreground-muted">No release notes yet.</p>
            ) : (
              <ul className="list-disc space-y-1 pl-5 text-sm text-foreground">
                {project.releaseNotes.map((note, i) => (
                  <li key={i}>{note}</li>
                ))}
              </ul>
            )}
          </Section>

          <Section title="Action items">
            <ul className="space-y-2">
              {project.actionItems.map((a) => (
                <li
                  key={a.id}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border-subtle px-3 py-2"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground">{a.title}</p>
                    <p className="text-xs text-foreground-muted">
                      {a.owner} · due {a.dueDate}
                    </p>
                  </div>
                  <Badge tone={a.status === 'done' ? 'success' : 'warning'}>{a.status}</Badge>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Timeline highlights">
            <ul className="space-y-3">
              {project.timeline.map((t) => (
                <li key={t.id} className="flex gap-3">
                  <div className="mt-0.5 h-full w-px bg-border-subtle" aria-hidden />
                  <div className="min-w-0 flex-1 rounded-lg border border-border-subtle bg-surface-muted/40 p-3">
                    <p className="text-xs font-semibold text-foreground-muted">{t.date}</p>
                    <p className="text-sm font-semibold text-foreground">{t.label}</p>
                    <p className="mt-1 text-sm text-foreground-muted">{t.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Blockers">
            {project.blockers.length === 0 ? (
              <p className="text-sm text-foreground-muted">No open blockers recorded.</p>
            ) : (
              <ul className="space-y-2">
                {project.blockers.map((b) => (
                  <li key={b.id} className="rounded-lg border border-border-subtle p-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-medium text-foreground">{b.title}</p>
                      <Badge tone={b.severity === 'critical' ? 'danger' : 'warning'}>
                        {b.severity}
                      </Badge>
                    </div>
                    <p className="mt-1 text-xs text-foreground-muted">
                      Opened {b.openedSince}
                      {b.owner ? ` · ${b.owner}` : ''}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </Section>
        </div>

        <div className="border-t border-border-subtle bg-surface-muted/50 px-5 py-3">
          <div className="flex flex-wrap gap-2 text-xs text-foreground-muted">
            <QaBadge qa={project.qaStatus} />
            <ReleaseBadge release={project.releaseReadiness} />
            <span className="rounded-full border border-border-subtle px-2 py-0.5">
              Status: {projectStatusLabel(project.status)}
            </span>
          </div>
        </div>
      </aside>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-foreground-muted">
        {title}
      </h3>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <Card padding="sm" className="bg-surface-muted/40">
      <p className="text-[11px] font-medium text-foreground-muted">{label}</p>
      <p className="mt-1 text-sm font-semibold text-foreground">{value}</p>
    </Card>
  );
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  } catch {
    return iso;
  }
}
