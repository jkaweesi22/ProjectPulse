import { cn } from '@/lib/utils';

export function Card({
  className,
  children,
  padding = 'md',
}: {
  className?: string;
  children: React.ReactNode;
  padding?: 'none' | 'sm' | 'md';
}) {
  const paddingClass =
    padding === 'none' ? '' : padding === 'sm' ? 'p-4' : 'p-5 sm:p-6';
  return (
    <div
      className={cn(
        'rounded-xl border border-border-subtle bg-surface shadow-card',
        paddingClass,
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
      <div className="min-w-0">
        <h2 className="text-sm font-semibold tracking-tight text-foreground">{title}</h2>
        {description ? (
          <p className="mt-1 text-xs text-foreground-muted">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
