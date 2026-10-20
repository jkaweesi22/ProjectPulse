#!/usr/bin/env node
// Builds data/live-portfolio.json (and public/portfolio.json) from GitHub repos listed in
// portfolio.config.json. Read-only. Requires GITHUB_TOKEN (or PORTFOLIO_TOKEN for private repos).
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const config = JSON.parse(await readFile(resolve(root, 'portfolio.config.json'), 'utf8'));
const L = config.labels;
const token = process.env.PORTFOLIO_TOKEN || process.env.GITHUB_TOKEN;
const DAY = 86_400_000;

async function gh(path) {
  const res = await fetch(`https://api.github.com${path}`, {
    headers: {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GitHub ${res.status} for ${path}: ${await res.text()}`);
  return res.json();
}

const iso = (d) => new Date(d).toISOString().slice(0, 10);
const hasLabel = (issue, name) => issue.labels.some((l) => (l.name ?? l) === name);
const weekStart = (d) => {
  const x = new Date(d);
  x.setUTCDate(x.getUTCDate() - ((x.getUTCDay() + 6) % 7));
  return iso(x);
};

function milestoneStatus(m, now) {
  if (m.state === 'closed') return 'done';
  if (m.due_on && new Date(m.due_on) < now) return 'at_risk';
  return m.closed_issues > 0 ? 'in_progress' : 'planned';
}

async function qaStatusFor(repo) {
  if (!config.qaWorkflow) return 'not_started';
  const runs = await gh(
    `/repos/${repo}/actions/workflows/${config.qaWorkflow}/runs?per_page=1&status=completed`,
  );
  const run = runs?.workflow_runs?.[0];
  if (!run) return 'not_started';
  return run.conclusion === 'success' ? 'passed' : 'blocked';
}

async function buildProject(entry, now) {
  const { repo } = entry;
  const meta = await gh(`/repos/${repo}`);
  if (!meta) throw new Error(`Repo not found or no access: ${repo}`);

  const [milestones, openIssues, closedIssues, pulls, releases, qaStatus] = await Promise.all([
    gh(`/repos/${repo}/milestones?state=all&per_page=50&sort=due_on&direction=asc`),
    gh(`/repos/${repo}/issues?state=open&per_page=100`),
    gh(`/repos/${repo}/issues?state=closed&per_page=30&sort=updated`),
    gh(`/repos/${repo}/pulls?state=closed&per_page=15&sort=updated&direction=desc`),
    gh(`/repos/${repo}/releases?per_page=5`),
    qaStatusFor(repo),
  ]);

  const issues = (openIssues ?? []).filter((i) => !i.pull_request);
  const blockerIssues = issues.filter((i) => hasLabel(i, L.blocker) || hasLabel(i, L.blockerCritical));
  const riskIssues = issues.filter((i) => hasLabel(i, L.risk) || hasLabel(i, L.riskHigh) || hasLabel(i, L.riskCritical));

  const blockers = blockerIssues.map((i) => ({
    id: `${repo}#${i.number}`,
    title: i.title,
    severity: hasLabel(i, L.blockerCritical) ? 'critical' : hasLabel(i, L.blockerMinor) ? 'minor' : 'major',
    openedSince: iso(i.created_at),
    ...(i.assignee ? { owner: i.assignee.login } : {}),
  }));

  const risks = riskIssues.map((i) => ({
    id: `${repo}#${i.number}`,
    title: i.title,
    impact: hasLabel(i, L.riskCritical) ? 'critical' : hasLabel(i, L.riskHigh) ? 'high' : 'medium',
    status: 'open',
  }));

  const ms = milestones ?? [];
  const nextOpen = ms.find((m) => m.state === 'open' && m.due_on) ?? ms.find((m) => m.state === 'open');
  const total = nextOpen ? nextOpen.open_issues + nextOpen.closed_issues : 0;
  const progressPercent = nextOpen
    ? total === 0 ? 0 : Math.round((nextOpen.closed_issues / total) * 100)
    : ms.length > 0 ? 100 : 0;
  const dueDate = nextOpen?.due_on ? iso(nextOpen.due_on) : iso(meta.pushed_at);
  const overdue = nextOpen?.due_on && new Date(nextOpen.due_on) < now;

  const publishedRelease = (releases ?? []).find((r) => !r.draft && !r.prerelease);
  const draftRelease = (releases ?? []).find((r) => r.draft);
  const releaseReadiness = draftRelease ? 'ready' : publishedRelease && !nextOpen ? 'released' : nextOpen ? 'not_ready' : 'released';

  const riskLevel =
    risks.some((r) => r.impact === 'critical') || blockers.some((b) => b.severity === 'critical') ? 'critical'
    : risks.some((r) => r.impact === 'high') || blockers.length >= 3 ? 'high'
    : risks.length > 0 || blockers.length > 0 ? 'medium'
    : 'low';

  const status =
    !nextOpen && ms.length > 0 && issues.length === 0 ? 'completed'
    : overdue ? 'delayed'
    : riskLevel === 'critical' || riskLevel === 'high' ? 'at_risk'
    : draftRelease ? 'release_ready'
    : 'on_track';

  const mergedPrs = (pulls ?? []).filter((p) => p.merged_at);
  const updates = mergedPrs.slice(0, 8).map((p) => ({
    id: `${repo}!${p.number}`,
    date: iso(p.merged_at),
    author: p.user?.login ?? 'unknown',
    summary: p.title,
  }));
  const timeline = [
    ...(releases ?? []).filter((r) => !r.draft).map((r) => ({
      id: `${repo}@${r.tag_name}`,
      date: iso(r.published_at ?? r.created_at),
      label: r.name || r.tag_name,
      description: (r.body ?? '').split('\n')[0] || 'Release published',
    })),
  ];

  const actionItems = [
    ...issues.filter((i) => i.assignee && !blockerIssues.includes(i) && !riskIssues.includes(i)).slice(0, 10).map((i) => ({
      id: `${repo}#${i.number}`,
      title: i.title,
      owner: i.assignee.login,
      dueDate: i.milestone?.due_on ? iso(i.milestone.due_on) : dueDate,
      status: 'open',
    })),
    ...(closedIssues ?? []).filter((i) => !i.pull_request && i.assignee).slice(0, 5).map((i) => ({
      id: `${repo}#${i.number}`,
      title: i.title,
      owner: i.assignee.login,
      dueDate: i.milestone?.due_on ? iso(i.milestone.due_on) : iso(i.closed_at),
      status: 'done',
    })),
  ];

  return {
    id: repo.replace('/', '__'),
    name: meta.name,
    description: meta.description ?? '',
    owner: entry.owner ?? meta.owner.login,
    team: entry.team ?? 'Product',
    sprint: nextOpen?.title ?? 'Backlog',
    status,
    priority: entry.priority ?? 'P2',
    progressPercent,
    qaStatus,
    releaseReadiness,
    dueDate,
    riskLevel,
    blockers,
    dependencies: [],
    lastUpdated: iso(meta.pushed_at),
    qaCoveragePercent: entry.qaCoveragePercent ?? 0,
    qaNotes: issues.filter((i) => hasLabel(i, L.qaNote)).map((i) => i.title),
    releaseNotes: (releases ?? []).slice(0, 3).map((r) => `${r.tag_name}: ${(r.body ?? '').split('\n')[0] || r.name || ''}`.trim()),
    milestones: ms.map((m) => ({
      id: `${repo}/m${m.number}`,
      name: m.title,
      dueDate: m.due_on ? iso(m.due_on) : iso(m.created_at),
      status: milestoneStatus(m, now),
      ...(m.description ? { notes: m.description } : {}),
    })),
    risks,
    updates,
    actionItems,
    timeline,
  };
}

async function loadHistory() {
  let prev = [];
  if (config.historyUrl) {
    try {
      const res = await fetch(config.historyUrl);
      if (res.ok) prev = (await res.json()).blockerTrends ?? [];
    } catch {
      /* first run or site not deployed yet */
    }
  }
  return prev;
}

const now = new Date();
const results = await Promise.allSettled(config.repos.map((r) => buildProject(r, now)));
const projects = [];
results.forEach((r, i) => {
  if (r.status === 'fulfilled') projects.push(r.value);
  else console.error(`✗ ${config.repos[i].repo}: ${r.reason.message}`);
});
if (projects.length === 0) {
  console.error('No projects could be synced; leaving existing data untouched.');
  process.exit(1);
}

const week = weekStart(now);
const point = {
  week,
  openBlockers: projects.reduce((n, p) => n + p.blockers.length, 0),
  criticalOpen: projects.reduce((n, p) => n + p.blockers.filter((b) => b.severity === 'critical').length, 0),
};
const blockerTrends = [...(await loadHistory()).filter((t) => t.week !== week), point]
  .sort((a, b) => a.week.localeCompare(b.week))
  .slice(-12);

const out = JSON.stringify({ generatedAt: now.toISOString(), projects, blockerTrends }, null, 2) + '\n';
await writeFile(resolve(root, 'data/live-portfolio.json'), out);
await mkdir(resolve(root, 'public'), { recursive: true });
await writeFile(resolve(root, 'public/portfolio.json'), out);
console.log(`✓ Synced ${projects.length}/${config.repos.length} repos → data/live-portfolio.json`);
