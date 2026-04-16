import { cn } from '@/lib/utils';

export function ProgressBar({
  value,
  className,
  'aria-label': ariaLabel,
}: {
  value: number;
  className?: string;
  'aria-label'?: string;
}) {
  const v = Math.min(100, Math.max(0, value));
  return (
    <div
      className={cn('h-2 w-full overflow-hidden rounded-full bg-surface-muted', className)}
      role="progressbar"
      aria-valuenow={v}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={ariaLabel}
    >
      <div
        className="h-full rounded-full bg-accent transition-[width] duration-500"
        style={{ width: `${v}%` }}
      />
    </div>
  );
}
