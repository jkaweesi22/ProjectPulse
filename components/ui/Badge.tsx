import { cn } from '@/lib/utils';

type Tone = 'neutral' | 'success' | 'warning' | 'danger' | 'info' | 'muted';

const toneClass: Record<Tone, string> = {
  neutral: 'bg-surface-muted text-foreground border-border-subtle',
  success: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20',
  warning: 'bg-amber-500/10 text-amber-800 dark:text-amber-200 border-amber-500/20',
  danger: 'bg-red-500/10 text-red-800 dark:text-red-200 border-red-500/20',
  info: 'bg-sky-500/10 text-sky-900 dark:text-sky-200 border-sky-500/20',
  muted: 'bg-transparent text-foreground-muted border-border-subtle',
};

export function Badge({
  children,
  tone = 'neutral',
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide',
        toneClass[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
