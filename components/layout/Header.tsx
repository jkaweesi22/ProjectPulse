'use client';

import Link from 'next/link';

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-border-subtle bg-surface/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3 lg:hidden">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-accent text-xs font-bold text-accent-foreground">
            DQ
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">Delivery & QA</p>
            <p className="truncate text-xs text-foreground-muted">Portfolio dashboard</p>
          </div>
        </div>
        <div className="hidden min-w-0 flex-1 lg:block">
          <div>
            <h1 className="text-sm font-semibold tracking-tight text-foreground">
              Portfolio delivery health
            </h1>
            <p className="text-xs text-foreground-muted">
              TPM / QA / Release visibility across active programs
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden rounded-full border border-border-subtle bg-surface-muted px-2.5 py-1 text-[11px] font-medium text-foreground-muted sm:inline">
            Read-only snapshot
          </span>
          <Link
            href="/dashboard/"
            className="rounded-lg border border-border-subtle bg-surface px-3 py-1.5 text-xs font-medium text-foreground shadow-sm transition hover:bg-surface-muted"
          >
            Refresh view
          </Link>
        </div>
      </div>
    </header>
  );
}
