# Delivery & QA Command Center

A production-style, portfolio-grade **multi-project delivery and QA dashboard** for Technical Program Managers, QA leads, and release managers. It surfaces portfolio health, QA readiness, blockers, risks, milestones, and deadlines in one place.

The application is built with **Next.js (static export)**, **React**, **TypeScript**, **Tailwind CSS**, and **Recharts**, and is **fully deployable to GitHub Pages** under a repository subpath (for example `https://<username>.github.io/project-pulse/`).

### Screenshots

Add portfolio images under `docs/screenshots/` (for example `overview.png`, `registry.png`) and embed them here:

```markdown
![Dashboard overview](./docs/screenshots/overview.png)
```

---

## Features

- **Executive overview**: KPI cards for active programs, posture (on track / at risk / delayed / completed / release ready), open blockers, and average QA coverage.
- **Analytics**: Recharts visualizations for status mix, risk concentration, team progress, QA coverage leaders, release readiness, upcoming deadlines, and blocker trends over time.
- **Project registry**: Search, multi-filter (team, owner, status, risk, QA status, priority), and sort (due date, progress, blockers, risk) with dense but readable rows.
- **Project deep dive**: Slide-over drawer with summary, updates, milestones, risks, dependencies, QA notes, release notes, action items, timeline highlights, and blockers.
- **Risks & blockers**: Dedicated section for high-risk programs, critical blockers, overdue work, and dependencies that can impact delivery.
- **Design**: Sidebar navigation, responsive layout, consistent cards, badges, and progress bars—calm, modern, and review-ready.

---

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 14 (App Router, **static HTML export**) |
| UI | React 18 + TypeScript |
| Styling | Tailwind CSS |
| Charts | Recharts |
| Data | Local TypeScript modules + pluggable `PortfolioDataSource` abstraction |

**Not used**: server-side rendering, API routes, or server actions—everything is static and client-safe for GitHub Pages.

---

## Project structure

All source and config live at the **repository root** (no nested app folder). After `git clone`, work from the clone directory (often named `project-pulse`).

```
.
├── app/                    # Routes, layout, global styles
│   ├── dashboard/          # Main dashboard route
│   ├── layout.tsx
│   ├── globals.css
│   ├── page.tsx            # Redirects to /dashboard/
│   └── not-found.tsx
├── components/
│   ├── charts/             # Recharts wrappers + chart theme
│   ├── dashboard/        # KPI row + dashboard shell
│   ├── layout/             # App shell, sidebar, header
│   ├── projects/         # Table, drawer, risks section, badges
│   └── ui/                 # Cards, badges, progress, empty states
├── data/                   # Mock portfolio data & trends
├── lib/
│   ├── data-service.ts     # Data access + chart aggregations
│   ├── paths.ts            # basePath helper for manual URLs
│   ├── labels.ts           # Human-readable labels
│   └── utils.ts            # className helper (cn)
├── types/                  # Shared TypeScript contracts
├── public/                 # Static assets (favicons, images)
├── .github/workflows/      # GitHub Pages deploy workflow
├── next.config.js          # Static export + basePath
└── README.md
```

---

## Prerequisites

- **Node.js 20+** (recommended for local dev and CI)
- **npm** 9+ (or compatible package manager)

---

## Local development

```bash
git clone https://github.com/<username>/project-pulse.git
cd project-pulse
npm install
npm run dev
```

Open the local URL printed in the terminal (typically `http://localhost:3000/project-pulse/` because of `basePath`).

---

## Build & static export

The static bundle is produced with:

```bash
npm run build
```

Artifacts are written to the `out/` directory. For GitHub Pages, deploy **the contents of `out/`** to the hosting branch or use the provided GitHub Actions workflow.

The `export` script is an alias of the build step:

```bash
npm run export
```

---

## GitHub Pages deployment

### Option A — GitHub Actions (recommended)

**Prerequisites:** `package-lock.json` is committed (required for `npm ci` in CI).

**One-time GitHub setup**

1. Push this repository to GitHub (repo name should match `repo` in `next.config.js`, e.g. **`project-pulse`**, or update `basePath` — see below).
2. **Settings → Pages → Build and deployment**
3. Set **Source** to **GitHub Actions** (not “Deploy from a branch”).
4. **Settings → Actions → General**: ensure **Actions permissions** allow workflows to run (read and write is fine for Pages deploy).

**Deploy**

- Every push to **`main`** runs `.github/workflows/deploy-github-pages.yml`: `npm ci` → `npm run build` → upload **`out/`** → deploy to Pages.
- You can also run it manually: **Actions** → **Deploy to GitHub Pages** → **Run workflow**.

**After a successful run**

Site URL (for a repo named `project-pulse`):

`https://<username>.github.io/project-pulse/`

**If the workflow fails**

| Issue | What to check |
| --- | --- |
| `npm ci` error | Commit and push `package-lock.json` from your machine (`npm install` generates it). |
| Build error | Run `npm run build` locally and fix reported errors. |
| Pages not updating | Confirm **Pages → Source** is **GitHub Actions**, not a branch. Re-run the workflow from the Actions tab. |

### Option B — Manual deploy

1. Run `npm run build` locally.
2. Upload the contents of `out/` to the configured publishing source (for example the `gh-pages` branch or an external static host), preserving paths so `/_next` and HTML paths stay consistent.

---

## Understanding `basePath`

GitHub Pages project sites are served under `https://<user>.github.io/<repo>/`. Next.js must know that prefix so:

- Client-side routing resolves correctly.
- JavaScript and CSS load from `/project-pulse/_next/...` instead of `/_next/...`.

This repo sets:

```js
// next.config.js
const repo = 'project-pulse';

module.exports = {
  output: 'export',
  basePath: `/${repo}`,
  trailingSlash: true,
  images: { unoptimized: true },
};
```

Keep **`repo` in `next.config.js`** aligned with the **GitHub repository name** (case-sensitive for the URL path).

Also update the constant in:

- `lib/paths.ts` → `BASE_PATH` (used if you build manual links or non-`Link` URLs).

---

## Renaming the repository

If the GitHub repo is not `project-pulse`:

1. Change **`repo`** in `next.config.js` to your repo slug.
2. Change **`BASE_PATH`** in `lib/paths.ts` to `/<same-slug>`.
3. Re-run `npm run build` and redeploy.

---

## Data & integrations

- **Today**: Data lives in `data/projects.ts` and `data/blocker-trends.ts`, loaded through `lib/data-service.ts`.
- **Tomorrow**: Implement another `PortfolioDataSource` (Jira, GitHub Issues, Google Sheets, REST) and call `setPortfolioDataSource()` from a client bootstrap module when you add async fetching—types in `types/` are the contract boundary.

---

## Automation roadmap

| Phase | Idea |
| --- | --- |
| Near term | Wire `PortfolioDataSource` to GitHub Issues / Projects with read-only tokens |
| Next | Jira JQL-backed milestones and blockers; cache in edge-friendly JSON |
| Later | Scheduled ETL into a warehouse + read-only API for the same UI |

---

## Future improvements

- Role-based views (TPM vs QA vs Release) with saved filter presets.
- Drill-down from charts into the filtered project table.
- CSV / PDF export for exec readouts.
- Real auth when moving off static hosting.

---

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Local development server |
| `npm run build` | Production build + static export to `out/` |
| `npm run export` | Same as `build` |
| `npm run lint` | ESLint (Next core-web-vitals) |
| `npm run typecheck` | TypeScript `--noEmit` |

---

## License

MIT — use freely in portfolios and internal tooling.

---

## Credits

Built as a **portfolio-ready internal reporting tool**—feel free to fork and adapt naming, branding, and data sources to your organization.
