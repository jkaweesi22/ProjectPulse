import { DashboardView } from '@/components/dashboard/DashboardView';
import { fetchBlockerTrends, fetchKpis, fetchProjects } from '@/lib/data-service';

export default async function DashboardPage() {
  const [projects, kpis, trends] = await Promise.all([
    fetchProjects(),
    fetchKpis(),
    fetchBlockerTrends(),
  ]);

  return <DashboardView projects={projects} kpis={kpis} trends={trends} />;
}
