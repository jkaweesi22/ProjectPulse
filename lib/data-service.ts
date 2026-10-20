import { portfolioSnapshot } from '@/data';
import type {
  BlockerTrendPoint,
  PortfolioKpis,
  Project,
  ProjectStatus,
  RiskLevel,
  Team,
} from '@/types';

/**
 * Data access layer for portfolio and project entities.
 * Swap implementations here to integrate GitHub Issues, Jira, Sheets, or HTTP APIs
 * without changing UI components.
 */
export interface PortfolioDataSource {
  getProjects(): Promise<Project[]>;
  getProjectById(id: string): Promise<Project | undefined>;
  getBlockerTrends(): Promise<BlockerTrendPoint[]>;
  getKpis(): Promise<PortfolioKpis>;
}

class LocalPortfolioDataSource implements PortfolioDataSource {
  private snapshot = portfolioSnapshot;

  async getProjects(): Promise<Project[]> {
    return this.snapshot.projects;
  }

  async getProjectById(id: string): Promise<Project | undefined> {
    return this.snapshot.projects.find((p) => p.id === id);
  }

  async getBlockerTrends(): Promise<BlockerTrendPoint[]> {
    return this.snapshot.blockerTrends;
  }

  async getKpis(): Promise<PortfolioKpis> {
    return computeKpis(this.snapshot.projects);
  }
}

export function computeKpis(projects: Project[]): PortfolioKpis {
  const active = projects.filter((p) => p.status !== 'completed');

  const sumCoverage = active.reduce((acc, p) => acc + p.qaCoveragePercent, 0);
  const averageQaCoverage =
    active.length === 0 ? 0 : Math.round((sumCoverage / active.length) * 10) / 10;

  const openBlockers = projects.reduce((acc, p) => acc + p.blockers.length, 0);

  return {
    totalActiveProjects: active.length,
    onTrack: projects.filter((p) => p.status === 'on_track').length,
    atRisk: projects.filter((p) => p.status === 'at_risk').length,
    delayed: projects.filter((p) => p.status === 'delayed').length,
    completed: projects.filter((p) => p.status === 'completed').length,
    releaseReady: projects.filter((p) => p.status === 'release_ready').length,
    openBlockers,
    averageQaCoverage,
  };
}

let dataSource: PortfolioDataSource = new LocalPortfolioDataSource();

export function setPortfolioDataSource(source: PortfolioDataSource) {
  dataSource = source;
}

export async function fetchProjects(): Promise<Project[]> {
  return dataSource.getProjects();
}

export async function fetchProjectById(id: string): Promise<Project | undefined> {
  return dataSource.getProjectById(id);
}

export async function fetchBlockerTrends(): Promise<BlockerTrendPoint[]> {
  return dataSource.getBlockerTrends();
}

export async function fetchKpis(): Promise<PortfolioKpis> {
  return dataSource.getKpis();
}

/** Aggregates for charts — computed client-side from project list */
export function computeStatusDistribution(projects: Project[]) {
  const counts: Record<ProjectStatus, number> = {
    on_track: 0,
    at_risk: 0,
    delayed: 0,
    completed: 0,
    release_ready: 0,
  };
  for (const p of projects) {
    counts[p.status]++;
  }
  return Object.entries(counts).map(([status, value]) => ({
    status: status as ProjectStatus,
    name: formatStatusLabel(status as ProjectStatus),
    value,
  }));
}

export function computeRiskDistribution(projects: Project[]) {
  const order: RiskLevel[] = ['low', 'medium', 'high', 'critical'];
  const counts: Record<RiskLevel, number> = {
    low: 0,
    medium: 0,
    high: 0,
    critical: 0,
  };
  for (const p of projects) {
    counts[p.riskLevel]++;
  }
  return order.map((level) => ({
    risk: level,
    name: formatRiskLabel(level),
    value: counts[level],
  }));
}

export function computeProgressByTeam(projects: Project[]) {
  const teams: Team[] = ['QA', 'Platform', 'Product', 'Growth', 'Operations'];
  return teams.map((team) => {
    const subset = projects.filter((p) => p.team === team);
    const avg =
      subset.length === 0
        ? 0
        : Math.round(
            subset.reduce((acc, p) => acc + p.progressPercent, 0) / subset.length,
          );
    return { team, progress: avg, projects: subset.length };
  });
}

export function computeQaHealthByProject(projects: Project[]) {
  return [...projects]
    .sort((a, b) => b.qaCoveragePercent - a.qaCoveragePercent)
    .slice(0, 8)
    .map((p) => ({
      name: truncate(p.name, 22),
      coverage: p.qaCoveragePercent,
      id: p.id,
    }));
}

export function computeReleaseReadinessOverview(projects: Project[]) {
  const labels = ['not_ready', 'staging', 'ready', 'released'] as const;
  return labels.map((key) => ({
    name: formatReleaseReadiness(key),
    value: projects.filter((p) => p.releaseReadiness === key).length,
    key,
  }));
}

export function computeUpcomingDeadlines(projects: Project[], limit = 8) {
  const today = new Date();
  return [...projects]
    .filter((p) => p.status !== 'completed')
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, limit)
    .map((p) => ({
      name: truncate(p.name, 20),
      due: p.dueDate,
      days: Math.ceil(
        (new Date(p.dueDate).getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
      ),
      id: p.id,
    }));
}

export function getHighRiskProjects(projects: Project[]) {
  return projects.filter((p) => p.riskLevel === 'high' || p.riskLevel === 'critical');
}

export function getCriticalBlockers(projects: Project[]) {
  const rows: { project: Project; blocker: Project['blockers'][0] }[] = [];
  for (const p of projects) {
    for (const b of p.blockers) {
      if (b.severity === 'critical') {
        rows.push({ project: p, blocker: b });
      }
    }
  }
  return rows;
}

export function getOverdueProjects(projects: Project[], asOf: Date = new Date()) {
  const t = asOf.getTime();
  return projects.filter((p) => {
    if (p.status === 'completed') return false;
    return new Date(p.dueDate).getTime() < t;
  });
}

export function getDependencyImpediments(projects: Project[]) {
  return projects.flatMap((p) =>
    p.dependencies
      .filter((d) => d.status === 'waiting' || d.status === 'in_flight')
      .map((d) => ({ project: p, dependency: d })),
  );
}

function truncate(s: string, max: number) {
  return s.length <= max ? s : `${s.slice(0, max - 1)}…`;
}

function formatStatusLabel(s: ProjectStatus): string {
  const map: Record<ProjectStatus, string> = {
    on_track: 'On track',
    at_risk: 'At risk',
    delayed: 'Delayed',
    completed: 'Completed',
    release_ready: 'Release ready',
  };
  return map[s];
}

function formatRiskLabel(r: RiskLevel): string {
  const map: Record<RiskLevel, string> = {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    critical: 'Critical',
  };
  return map[r];
}

function formatReleaseReadiness(
  r: 'not_ready' | 'staging' | 'ready' | 'released',
): string {
  const map = {
    not_ready: 'Not ready',
    staging: 'Staging',
    ready: 'Ready',
    released: 'Released',
  } as const;
  return map[r];
}
