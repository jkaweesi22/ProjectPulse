import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center">
      <p className="text-sm font-semibold text-foreground-muted">404</p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight">Page not found</h1>
      <p className="mt-2 text-sm text-foreground-muted">
        The route you requested is not part of this static export.
      </p>
      <Link
        href="/dashboard/"
        className="mt-6 inline-flex rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground"
      >
        Back to dashboard
      </Link>
    </div>
  );
}
