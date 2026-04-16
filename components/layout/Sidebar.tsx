'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

const nav = [
  { href: '/dashboard/', label: 'Overview', icon: LayoutIcon },
  { href: '/dashboard/#projects', label: 'Projects', icon: TableIcon },
  { href: '/dashboard/#risks', label: 'Risks & blockers', icon: AlertIcon },
] as const;

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-screen w-60 shrink-0 border-r border-border-subtle bg-surface/80 backdrop-blur-md lg:flex lg:flex-col">
      <div className="flex h-16 items-center gap-2 border-b border-border-subtle px-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-sm font-semibold text-accent-foreground shadow-sm">
          DQ
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold tracking-tight">Delivery & QA</p>
          <p className="truncate text-xs text-foreground-muted">Command Center</p>
        </div>
      </div>
      <nav className="flex flex-1 flex-col gap-1 p-3">
        <p className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-wider text-foreground-muted">
          Navigate
        </p>
        {nav.map((item) => {
          const active = pathname?.startsWith('/dashboard') && item.href.startsWith('/dashboard');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                active
                  ? 'bg-surface-muted text-foreground shadow-sm'
                  : 'text-foreground-muted hover:bg-surface-muted hover:text-foreground',
              )}
            >
              <item.icon className="h-4 w-4 shrink-0 opacity-80" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-border-subtle p-4">
        <p className="text-xs text-foreground-muted">
          Portfolio snapshot · <span className="font-mono text-foreground/80">2026-Q2</span>
        </p>
      </div>
    </aside>
  );
}

function LayoutIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
      />
    </svg>
  );
}

function TableIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6h16M4 12h16M4 18h10M4 10h16M4 16h16"
      />
    </svg>
  );
}

function AlertIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v4m0 4h.01M10.3 3.2L2.8 17.2A1.5 1.5 0 004.2 19.5h15.6a1.5 1.5 0 001.4-2.3L13.7 3.2a1.5 1.5 0 00-2.6 0z"
      />
    </svg>
  );
}
