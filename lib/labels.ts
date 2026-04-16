import type {
  Priority,
  ProjectStatus,
  QAStatus,
  ReleaseReadiness,
  RiskLevel,
} from '@/types';

export function projectStatusLabel(s: ProjectStatus): string {
  const map: Record<ProjectStatus, string> = {
    on_track: 'On track',
    at_risk: 'At risk',
    delayed: 'Delayed',
    completed: 'Completed',
    release_ready: 'Release ready',
  };
  return map[s];
}

export function riskLabel(r: RiskLevel): string {
  const map: Record<RiskLevel, string> = {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    critical: 'Critical',
  };
  return map[r];
}

export function qaStatusLabel(q: QAStatus): string {
  const map: Record<QAStatus, string> = {
    not_started: 'Not started',
    in_progress: 'In progress',
    blocked: 'Blocked',
    passed: 'Passed',
    sign_off_pending: 'Sign-off pending',
  };
  return map[q];
}

export function releaseReadinessLabel(r: ReleaseReadiness): string {
  const map: Record<ReleaseReadiness, string> = {
    not_ready: 'Not ready',
    staging: 'Staging',
    ready: 'Ready',
    released: 'Released',
  };
  return map[r];
}

export function priorityLabel(p: Priority): string {
  return p;
}

export function riskRank(r: RiskLevel): number {
  const order: RiskLevel[] = ['low', 'medium', 'high', 'critical'];
  return order.indexOf(r);
}
