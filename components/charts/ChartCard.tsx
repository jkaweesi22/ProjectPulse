import { Card, CardHeader } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

export function ChartCard({
  title,
  description,
  children,
  className,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Card className={cn('flex h-full flex-col', className)} padding="sm">
      <CardHeader title={title} description={description} />
      <div className="min-h-0 w-full flex-1">{children}</div>
    </Card>
  );
}
