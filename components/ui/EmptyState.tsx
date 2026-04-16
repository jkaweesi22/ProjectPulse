import { cn } from '@/lib/utils';

export function EmptyState({
  title,
  description,
  className,
}: {
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-lg border border-dashed border-border-subtle bg-surface-muted/40 px-6 py-10 text-center',
        className,
      )}
    >
      <p className="text-sm font-medium text-foreground">{title}</p>
      {description ? (
        <p className="mt-1 max-w-sm text-xs text-foreground-muted">{description}</p>
      ) : null}
    </div>
  );
}
