import { Badge } from '@/components/ui/Badge';
import {
  priorityLabel,
  projectStatusLabel,
  qaStatusLabel,
  releaseReadinessLabel,
  riskLabel,
} from '@/lib/labels';
import type { Priority, ProjectStatus, QAStatus, ReleaseReadiness, RiskLevel } from '@/types';

function statusTone(s: ProjectStatus): React.ComponentProps<typeof Badge>['tone'] {
  if (s === 'on_track' || s === 'release_ready') return 'success';
  if (s === 'at_risk') return 'warning';
  if (s === 'delayed') return 'danger';
  if (s === 'completed') return 'info';
  return 'neutral';
}

function riskTone(r: RiskLevel): React.ComponentProps<typeof Badge>['tone'] {
  if (r === 'low') return 'success';
  if (r === 'medium') return 'warning';
  if (r === 'high') return 'warning';
  return 'danger';
}

function qaTone(q: QAStatus): React.ComponentProps<typeof Badge>['tone'] {
  if (q === 'passed') return 'success';
  if (q === 'blocked') return 'danger';
  if (q === 'in_progress' || q === 'sign_off_pending') return 'warning';
  return 'neutral';
}

function releaseTone(r: ReleaseReadiness): React.ComponentProps<typeof Badge>['tone'] {
  if (r === 'released' || r === 'ready') return 'success';
  if (r === 'staging') return 'warning';
  return 'muted';
}

export function StatusBadge({ status }: { status: ProjectStatus }) {
  return <Badge tone={statusTone(status)}>{projectStatusLabel(status)}</Badge>;
}

export function RiskBadge({ risk }: { risk: RiskLevel }) {
  return <Badge tone={riskTone(risk)}>{riskLabel(risk)}</Badge>;
}

export function QaBadge({ qa }: { qa: QAStatus }) {
  return <Badge tone={qaTone(qa)}>{qaStatusLabel(qa)}</Badge>;
}

export function ReleaseBadge({ release }: { release: ReleaseReadiness }) {
  return <Badge tone={releaseTone(release)}>{releaseReadinessLabel(release)}</Badge>;
}

export function PriorityBadge({ priority }: { priority: Priority }) {
  const tone: React.ComponentProps<typeof Badge>['tone'] =
    priority === 'P0' ? 'danger' : priority === 'P1' ? 'warning' : 'neutral';
  return <Badge tone={tone}>{priorityLabel(priority)}</Badge>;
}
