'use client';

import { useMemo, useState } from 'react';

import { BlockerTrendsChart } from '@/components/charts/BlockerTrendsChart';
import { ProgressByTeamChart } from '@/components/charts/ProgressByTeamChart';
import { ProjectStatusChart } from '@/components/charts/ProjectStatusChart';
import { QAHealthChart } from '@/components/charts/QAHealthChart';
import { ReleaseReadinessChart } from '@/components/charts/ReleaseReadinessChart';
import { RiskDistributionChart } from '@/components/charts/RiskDistributionChart';
import { UpcomingDeadlinesChart } from '@/components/charts/UpcomingDeadlinesChart';
import { KpiRow } from '@/components/dashboard/KpiRow';
import { ProjectDetailDrawer } from '@/components/projects/ProjectDetailDrawer';
import { ProjectTable } from '@/components/projects/ProjectTable';
import { RisksBlockersSection } from '@/components/projects/RisksBlockersSection';
import { Card, CardHeader } from '@/components/ui/Card';
import {
  computeProgressByTeam,
  computeQaHealthByProject,
  computeReleaseReadinessOverview,
  computeRiskDistribution,
  computeStatusDistribution,
  computeUpcomingDeadlines,
} from '@/lib/data-service';
import type { BlockerTrendPoint, PortfolioKpis, Project } from '@/types';

export function DashboardView({
  projects,
  kpis,
  trends,
}: {
  projects: Project[];
  kpis: PortfolioKpis;
  trends: BlockerTrendPoint[];
}) {
  const [selected, setSelected] = useState<Project | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const statusData = useMemo(() => computeStatusDistribution(projects), [projects]);
  const riskData = useMemo(() => computeRiskDistribution(projects), [projects]);
  const teamProgress = useMemo(() => computeProgressByTeam(projects), [projects]);
  const qaHealth = useMemo(() => computeQaHealthByProject(projects), [projects]);
  const releaseOverview = useMemo(() => computeReleaseReadinessOverview(projects), [projects]);
  const deadlines = useMemo(() => computeUpcomingDeadlines(projects), [projects]);

  function openProject(p: Project) {
    setSelected(p);
    setDrawerOpen(true);
  }

  function closeDrawer() {
    setDrawerOpen(false);
  }

  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Delivery & QA command center
        </h1>
        <p className="max-w-3xl text-sm text-foreground-muted">
          Portfolio-level visibility for program health, quality readiness, and release risk. Data is
          sourced from the local portfolio service layer and can be swapped for Jira, GitHub, or
          internal APIs without changing the UI.
        </p>
      </div>

      <KpiRow kpis={kpis} />

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-foreground">Analytics</h2>
          <p className="mt-1 text-sm text-foreground-muted">
            Distributions, team throughput signals, and upcoming delivery pressure.
          </p>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="h-[300px]">
            <ProjectStatusChart data={statusData} />
          </div>
          <div className="h-[300px]">
            <RiskDistributionChart data={riskData} />
          </div>
          <div className="h-[300px]">
            <ProgressByTeamChart data={teamProgress} />
          </div>
          <div className="h-[300px]">
            <QAHealthChart data={qaHealth} />
          </div>
          <div className="h-[300px]">
            <ReleaseReadinessChart data={releaseOverview} />
          </div>
          <div className="h-[300px]">
            <UpcomingDeadlinesChart data={deadlines} />
          </div>
          <div className="h-[300px] lg:col-span-2">
            <BlockerTrendsChart data={trends} />
          </div>
        </div>
      </section>

      <RisksBlockersSection projects={projects} onSelectProject={openProject} />

      <section id="projects" className="scroll-mt-28 space-y-4">
        <Card>
          <CardHeader
            title="Project registry"
            description="Search, filter, and sort the portfolio. Select a row for deep detail."
          />
          <ProjectTable projects={projects} onSelect={openProject} />
        </Card>
      </section>

      <Card className="border-dashed">
        <CardHeader
          title="Operational notes"
          description="How teams should use this view in weekly program reviews."
        />
        <ul className="list-disc space-y-2 pl-5 text-sm text-foreground-muted">
          <li>
            <span className="font-medium text-foreground">TPM:</span> validate milestone dates and
            dependency owners before exec readouts.
          </li>
          <li>
            <span className="font-medium text-foreground">QA:</span> treat coverage as a directional
            signal — pair with exploratory plans and defect trends.
          </li>
          <li>
            <span className="font-medium text-foreground">Release:</span> only mark “ready” when
            rollback, comms, and support readiness are jointly green.
          </li>
        </ul>
      </Card>

      <ProjectDetailDrawer project={selected} open={drawerOpen} onClose={closeDrawer} />
    </div>
  );
}
