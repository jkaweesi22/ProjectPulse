/**
 * Central place for GitHub Pages base path alignment.
 * Keep in sync with `repo` in `next.config.js`.
 */
export const BASE_PATH = '/project-pulse' as const;

/** Prefix for static assets or manual hrefs when not using next/link */
export function withBasePath(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (normalized === '/') {
    return `${BASE_PATH}/`;
  }
  return `${BASE_PATH}${normalized}`;
}
