/** Recharts-friendly palette aligned with dashboard semantics */
export const CHART_COLORS = {
  primary: '#2563eb',
  secondary: '#64748b',
  success: '#059669',
  warning: '#d97706',
  danger: '#dc2626',
  purple: '#7c3aed',
  teal: '#0d9488',
  pink: '#db2777',
  slate: '#475569',
};

export const STATUS_COLORS: Record<string, string> = {
  on_track: CHART_COLORS.success,
  at_risk: CHART_COLORS.warning,
  delayed: CHART_COLORS.danger,
  completed: CHART_COLORS.secondary,
  release_ready: CHART_COLORS.primary,
};

export const RISK_COLORS: Record<string, string> = {
  low: CHART_COLORS.teal,
  medium: CHART_COLORS.warning,
  high: '#ea580c',
  critical: CHART_COLORS.danger,
};
