import { blockerTrends } from './blocker-trends';
import { projects } from './projects';
import type { PortfolioSnapshot } from '@/types';

export const portfolioSnapshot: PortfolioSnapshot = {
  projects,
  blockerTrends,
};

export { projects, blockerTrends };
