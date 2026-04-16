export type Team =
  | 'QA'
  | 'Platform'
  | 'Product'
  | 'Growth'
  | 'Operations';

export type ProjectStatus =
  | 'on_track'
  | 'at_risk'
  | 'delayed'
  | 'completed'
  | 'release_ready';

export type Priority = 'P0' | 'P1' | 'P2' | 'P3';

export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

export type QAStatus =
  | 'not_started'
  | 'in_progress'
  | 'blocked'
  | 'passed'
  | 'sign_off_pending';

export type ReleaseReadiness =
  | 'not_ready'
  | 'staging'
  | 'ready'
  | 'released';

export type MilestoneStatus = 'planned' | 'in_progress' | 'done' | 'at_risk';

export type RiskItemStatus = 'open' | 'mitigating' | 'closed';

export type DependencyType = 'upstream' | 'downstream' | 'external';

export interface TimelineEntry {
  id: string;
  date: string;
  /** ISO date */
  label: string;
  description: string;
}

export interface Milestone {
  id: string;
  name: string;
  dueDate: string;
  status: MilestoneStatus;
  notes?: string;
}

export interface ProjectUpdate {
  id: string;
  date: string;
  author: string;
  summary: string;
}

export interface ProjectRisk {
  id: string;
  title: string;
  impact: RiskLevel;
  status: RiskItemStatus;
  mitigation?: string;
}

export interface Blocker {
  id: string;
  title: string;
  severity: 'critical' | 'major' | 'minor';
  openedSince: string;
  owner?: string;
}

export interface Dependency {
  id: string;
  name: string;
  type: DependencyType;
  team?: string;
  impact: string;
  status: 'waiting' | 'in_flight' | 'resolved';
}

export interface ActionItem {
  id: string;
  title: string;
  owner: string;
  dueDate: string;
  status: 'open' | 'done';
}

export interface Project {
  id: string;
  name: string;
  description: string;
  owner: string;
  team: Team;
  sprint: string;
  status: ProjectStatus;
  priority: Priority;
  progressPercent: number;
  qaStatus: QAStatus;
  releaseReadiness: ReleaseReadiness;
  dueDate: string;
  riskLevel: RiskLevel;
  blockers: Blocker[];
  dependencies: Dependency[];
  lastUpdated: string;
  /** 0–100 approximate coverage */
  qaCoveragePercent: number;
  qaNotes: string[];
  releaseNotes: string[];
  milestones: Milestone[];
  risks: ProjectRisk[];
  updates: ProjectUpdate[];
  actionItems: ActionItem[];
  timeline: TimelineEntry[];
}

export interface BlockerTrendPoint {
  week: string;
  openBlockers: number;
  criticalOpen: number;
}

export interface PortfolioKpis {
  totalActiveProjects: number;
  onTrack: number;
  atRisk: number;
  delayed: number;
  completed: number;
  releaseReady: number;
  openBlockers: number;
  averageQaCoverage: number;
}

export interface PortfolioSnapshot {
  projects: Project[];
  blockerTrends: BlockerTrendPoint[];
}
