import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';

import { AppShell } from '@/components/layout/AppShell';

import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Delivery & QA Command Center',
  description:
    'Portfolio health, QA readiness, blockers, and release tracking for multi-project delivery.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="font-sans">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
