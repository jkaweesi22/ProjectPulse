import type { BlockerTrendPoint } from '@/types';

/** Rolling 8-week aggregate used for the blocker trend chart */
export const blockerTrends: BlockerTrendPoint[] = [
  { week: '2026-02-17', openBlockers: 28, criticalOpen: 4 },
  { week: '2026-02-24', openBlockers: 31, criticalOpen: 5 },
  { week: '2026-03-03', openBlockers: 29, criticalOpen: 4 },
  { week: '2026-03-10', openBlockers: 33, criticalOpen: 6 },
  { week: '2026-03-17', openBlockers: 30, criticalOpen: 5 },
  { week: '2026-03-24', openBlockers: 27, criticalOpen: 4 },
  { week: '2026-03-31', openBlockers: 25, criticalOpen: 3 },
  { week: '2026-04-07', openBlockers: 23, criticalOpen: 3 },
];
