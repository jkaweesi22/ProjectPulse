import { blockerTrends } from './blocker-trends';
import livePortfolio from './live-portfolio.json';
import { projects } from './projects';
import type { PortfolioSnapshot } from '@/types';

const mockSnapshot: PortfolioSnapshot = {
  projects,
  blockerTrends,
};

const liveSnapshot = livePortfolio as unknown as PortfolioSnapshot;

/**
 * `live-portfolio.json` is written by `scripts/sync-github.mjs`. While it has no projects
 * (fresh clone, no token), the app falls back to the bundled mock data.
 */
export const portfolioSnapshot: PortfolioSnapshot =
  liveSnapshot.projects.length > 0 ? liveSnapshot : mockSnapshot;

export { projects, blockerTrends };
