'use client';

import { useMemo, useState } from 'react';

import {
  PriorityBadge,
  QaBadge,
  ReleaseBadge,
  RiskBadge,
  StatusBadge,
} from '@/components/projects/ProjectBadges';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { riskRank } from '@/lib/labels';
import { cn } from '@/lib/utils';
import type { Priority, Project, ProjectStatus, QAStatus, RiskLevel, Team } from '@/types';

type SortKey = 'dueDate' | 'progress' | 'blockers' | 'risk';

const teams: Team[] = ['QA', 'Platform', 'Product', 'Growth', 'Operations'];
const statuses: ProjectStatus[] = [
  'on_track',
  'at_risk',
  'delayed',
  'completed',
  'release_ready',
];
const risks: RiskLevel[] = ['low', 'medium', 'high', 'critical'];
const qaStatuses: QAStatus[] = [
  'not_started',
  'in_progress',
  'blocked',
  'passed',
  'sign_off_pending',
];

const priorities: Priority[] = ['P0', 'P1', 'P2', 'P3'];

export function ProjectTable({
  projects,
  onSelect,
}: {
  projects: Project[];
  onSelect: (p: Project) => void;
}) {
  const [query, setQuery] = useState('');
  const [team, setTeam] = useState<Team | ''>('');
  const [owner, setOwner] = useState<string>('');
  const [status, setStatus] = useState<ProjectStatus | ''>('');
  const [risk, setRisk] = useState<RiskLevel | ''>('');
  const [qa, setQa] = useState<QAStatus | ''>('');
  const [priority, setPriority] = useState<Priority | ''>('');
  const [sortKey, setSortKey] = useState<SortKey>('dueDate');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const owners = useMemo(() => {
    const s = new Set(projects.map((p) => p.owner));
    return [...s].sort((a, b) => a.localeCompare(b));
  }, [projects]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      if (q && !p.name.toLowerCase().includes(q)) return false;
      if (team && p.team !== team) return false;
      if (owner && p.owner !== owner) return false;
      if (status && p.status !== status) return false;
      if (risk && p.riskLevel !== risk) return false;
      if (qa && p.qaStatus !== qa) return false;
      if (priority && p.priority !== priority) return false;
      return true;
    });
  }, [projects, query, team, owner, status, risk, qa, priority]);

  const sorted = useMemo(() => {
    const list = [...filtered];
    list.sort((a, b) => {
      let cmp = 0;
      if (sortKey === 'dueDate') {
        cmp = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      } else if (sortKey === 'progress') {
        cmp = a.progressPercent - b.progressPercent;
      } else if (sortKey === 'blockers') {
        cmp = a.blockers.length - b.blockers.length;
      } else {
        cmp = riskRank(a.riskLevel) - riskRank(b.riskLevel);
      }
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return list;
  }, [filtered, sortKey, sortDir]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir(key === 'dueDate' || key === 'progress' || key === 'blockers' ? 'asc' : 'desc');
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0 flex-1">
          <label className="text-xs font-medium text-foreground-muted" htmlFor="project-search">
            Search
          </label>
          <input
            id="project-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by project name…"
            className="mt-1 w-full rounded-lg border border-border-subtle bg-surface px-3 py-2 text-sm text-foreground shadow-sm outline-none ring-accent/30 placeholder:text-foreground-muted focus:ring-2"
          />
        </div>
        <div className="grid flex-1 grid-cols-2 gap-2 sm:grid-cols-3 lg:max-w-3xl lg:flex-1">
          <FilterSelect label="Team" value={team} onChange={(v) => setTeam(v as Team | '')}>
            <option value="">All teams</option>
            {teams.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </FilterSelect>
          <FilterSelect label="Owner" value={owner} onChange={setOwner}>
            <option value="">All owners</option>
            {owners.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </FilterSelect>
          <FilterSelect label="Status" value={status} onChange={(v) => setStatus(v as ProjectStatus | '')}>
            <option value="">All statuses</option>
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s.replace(/_/g, ' ')}
              </option>
            ))}
          </FilterSelect>
          <FilterSelect label="Risk" value={risk} onChange={(v) => setRisk(v as RiskLevel | '')}>
            <option value="">All risks</option>
            {risks.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </FilterSelect>
          <FilterSelect label="QA status" value={qa} onChange={(v) => setQa(v as QAStatus | '')}>
            <option value="">All QA</option>
            {qaStatuses.map((q) => (
              <option key={q} value={q}>
                {q.replace(/_/g, ' ')}
              </option>
            ))}
          </FilterSelect>
          <FilterSelect
            label="Priority"
            value={priority}
            onChange={(v) => setPriority(v as Priority | '')}
          >
            <option value="">All priorities</option>
            {priorities.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </FilterSelect>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-xs text-foreground-muted">
        <span className="font-medium text-foreground">Sort:</span>
        <SortButton
          active={sortKey === 'dueDate'}
          label="Due date"
          dir={sortKey === 'dueDate' ? sortDir : undefined}
          onClick={() => toggleSort('dueDate')}
        />
        <SortButton
          active={sortKey === 'progress'}
          label="Progress"
          dir={sortKey === 'progress' ? sortDir : undefined}
          onClick={() => toggleSort('progress')}
        />
        <SortButton
          active={sortKey === 'blockers'}
          label="Blockers"
          dir={sortKey === 'blockers' ? sortDir : undefined}
          onClick={() => toggleSort('blockers')}
        />
        <SortButton
          active={sortKey === 'risk'}
          label="Risk"
          dir={sortKey === 'risk' ? sortDir : undefined}
          onClick={() => toggleSort('risk')}
        />
        <span className="ml-auto tabular-nums">
          {sorted.length} of {projects.length} projects
        </span>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border-subtle bg-surface shadow-card">
        <table className="min-w-[1100px] w-full border-collapse text-left text-sm">
          <thead className="sticky top-0 z-10 bg-surface-muted/90 backdrop-blur">
            <tr className="border-b border-border-subtle text-[11px] uppercase tracking-wide text-foreground-muted">
              <th className="px-4 py-3 font-semibold">Project</th>
              <th className="px-4 py-3 font-semibold">Owner</th>
              <th className="px-4 py-3 font-semibold">Team</th>
              <th className="px-4 py-3 font-semibold">Sprint</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Priority</th>
              <th className="px-4 py-3 font-semibold">Progress</th>
              <th className="px-4 py-3 font-semibold">QA</th>
              <th className="px-4 py-3 font-semibold">Release</th>
              <th className="px-4 py-3 font-semibold">Due</th>
              <th className="px-4 py-3 font-semibold">Risk</th>
              <th className="px-4 py-3 font-semibold">Blockers</th>
              <th className="px-4 py-3 font-semibold">Deps</th>
              <th className="px-4 py-3 font-semibold">Updated</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((p) => (
              <tr
                key={p.id}
                className="cursor-pointer border-b border-border-subtle/80 transition hover:bg-surface-muted/60"
                onClick={() => onSelect(p)}
              >
                <td className="px-4 py-3">
                  <p className="font-semibold text-foreground">{p.name}</p>
                  <p className="mt-0.5 line-clamp-1 text-xs text-foreground-muted">{p.id}</p>
                </td>
                <td className="px-4 py-3 text-foreground">{p.owner}</td>
                <td className="px-4 py-3 text-foreground">{p.team}</td>
                <td className="px-4 py-3 font-mono text-xs text-foreground-muted">{p.sprint}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={p.status} />
                </td>
                <td className="px-4 py-3">
                  <PriorityBadge priority={p.priority} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <ProgressBar
                      className="w-24"
                      value={p.progressPercent}
                      aria-label={`${p.name} progress`}
                    />
                    <span className="text-xs font-semibold tabular-nums text-foreground">
                      {p.progressPercent}%
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <QaBadge qa={p.qaStatus} />
                </td>
                <td className="px-4 py-3">
                  <ReleaseBadge release={p.releaseReadiness} />
                </td>
                <td className="px-4 py-3 font-mono text-xs text-foreground">{p.dueDate}</td>
                <td className="px-4 py-3">
                  <RiskBadge risk={p.riskLevel} />
                </td>
                <td className="px-4 py-3 text-center font-semibold tabular-nums text-foreground">
                  {p.blockers.length}
                </td>
                <td className="px-4 py-3 text-center font-semibold tabular-nums text-foreground">
                  {p.dependencies.length}
                </td>
                <td className="px-4 py-3 text-xs text-foreground-muted">
                  {formatShortDate(p.lastUpdated)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {sorted.length === 0 ? (
          <div className="px-4 py-10 text-center text-sm text-foreground-muted">
            No projects match your filters.
          </div>
        ) : null}
      </div>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-[11px] font-medium text-foreground-muted">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          'mt-1 w-full rounded-lg border border-border-subtle bg-surface px-2 py-2 text-xs text-foreground shadow-sm outline-none ring-accent/30 focus:ring-2',
        )}
      >
        {children}
      </select>
    </div>
  );
}

function SortButton({
  label,
  active,
  dir,
  onClick,
}: {
  label: string;
  active: boolean;
  dir?: 'asc' | 'desc';
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-full border px-2.5 py-1 text-xs font-medium transition',
        active
          ? 'border-accent/40 bg-accent/10 text-foreground'
          : 'border-border-subtle bg-surface text-foreground-muted hover:bg-surface-muted',
      )}
    >
      {label}
      {active && dir ? (dir === 'asc' ? ' ↑' : ' ↓') : ''}
    </button>
  );
}

function formatShortDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      timeZone: 'UTC',
    });
  } catch {
    return iso;
  }
}
