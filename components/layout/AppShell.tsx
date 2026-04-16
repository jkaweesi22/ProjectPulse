'use client';

import { usePathname } from 'next/navigation';

import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { cn } from '@/lib/utils';

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname?.includes('/dashboard');

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div
        className={cn(
          'flex min-h-screen flex-1 flex-col',
          isDashboard ? '' : '',
        )}
      >
        <Header />
        <main className="flex-1 overflow-x-hidden px-4 pb-10 pt-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1600px]">{children}</div>
        </main>
      </div>
    </div>
  );
}
