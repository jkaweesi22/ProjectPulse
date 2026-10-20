/** @type {import('next').NextConfig} */
// Must match the GitHub repository name (and `BASE_PATH` in `lib/paths.ts`).
const repo = 'ProjectPulse';

const nextConfig = {
  output: 'export',
  basePath: `/${repo}`,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
