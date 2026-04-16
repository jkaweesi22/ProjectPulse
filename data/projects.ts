import type { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'prj-auth-sso',
    name: 'Enterprise SSO & SCIM',
    description:
      'Unified identity for enterprise customers with SAML 2.0, OIDC, and automated user provisioning via SCIM. Gating several Q2 launches.',
    owner: 'Jordan Ellis',
    team: 'Platform',
    sprint: '2026.04.2',
    status: 'at_risk',
    priority: 'P0',
    progressPercent: 72,
    qaStatus: 'in_progress',
    releaseReadiness: 'staging',
    dueDate: '2026-04-05',
    riskLevel: 'high',
    qaCoveragePercent: 68,
    lastUpdated: '2026-04-14T16:20:00Z',
    blockers: [
      {
        id: 'b1',
        title: 'IdP metadata mismatch for two Fortune 500 pilots',
        severity: 'critical',
        openedSince: '2026-04-10',
        owner: 'Identity Guild',
      },
      {
        id: 'b2',
        title: 'SCIM rate limits need production tuning',
        severity: 'major',
        openedSince: '2026-04-12',
        owner: 'SRE',
      },
    ],
    dependencies: [
      {
        id: 'd1',
        name: 'Secrets rotation in prod KMS',
        type: 'upstream',
        team: 'Platform',
        impact: 'Blocks final security sign-off',
        status: 'in_flight',
      },
      {
        id: 'd2',
        name: 'Customer directory export API',
        type: 'external',
        team: 'Product',
        impact: 'Required for SCIM reconciliation tests',
        status: 'waiting',
      },
    ],
    qaNotes: [
      'Cross-tenant negative tests added; chasing two flaky SAML replay cases in staging.',
      'Load test on SCIM bulk sync scheduled for 2026-04-16 evening window.',
    ],
    releaseNotes: [
      'RC1 tagged for staging; known issue list tracked in REL-4412.',
      'Rollback playbook updated for session invalidation edge case.',
    ],
    milestones: [
      {
        id: 'm1',
        name: 'Pilot SSO cutover (cohort A)',
        dueDate: '2026-04-22',
        status: 'in_progress',
        notes: 'Two customers; daily war-room until green.',
      },
      {
        id: 'm2',
        name: 'Security & privacy sign-off',
        dueDate: '2026-04-26',
        status: 'at_risk',
      },
      { id: 'm3', name: 'GA readiness review', dueDate: '2026-04-30', status: 'planned' },
    ],
    risks: [
      {
        id: 'r1',
        title: 'Vendor certificate expirations during pilot window',
        impact: 'high',
        status: 'mitigating',
        mitigation: 'Automated renewal checks deployed to staging monitors.',
      },
      {
        id: 'r2',
        title: 'SCIM contract drift vs. Okta behavior',
        impact: 'medium',
        status: 'open',
      },
    ],
    updates: [
      {
        id: 'u1',
        date: '2026-04-14',
        author: 'Jordan Ellis',
        summary:
          'War-room agreed on narrowed SAML attribute mapping; fix targeted for 04/15 deploy.',
      },
      {
        id: 'u2',
        date: '2026-04-11',
        author: 'Priya Nandakumar',
        summary: 'QA unblocked staging data refresh; rerunning SCIM soak suite.',
      },
    ],
    actionItems: [
      {
        id: 'a1',
        title: 'Publish customer-facing SSO runbook v3',
        owner: 'Technical Writing',
        dueDate: '2026-04-18',
        status: 'open',
      },
      {
        id: 'a2',
        title: 'Finalize on-call rotation for pilot weekend',
        owner: 'SRE',
        dueDate: '2026-04-19',
        status: 'open',
      },
    ],
    timeline: [
      {
        id: 't1',
        date: '2026-04-08',
        label: 'Staging freeze begins',
        description: 'Feature-complete build promoted; focus on defects only.',
      },
      {
        id: 't2',
        date: '2026-04-15',
        label: 'Pilot rehearsal #2',
        description: 'Dry run with customer IT; capture rollback metrics.',
      },
    ],
  },
  {
    id: 'prj-billing-usage',
    name: 'Usage-Based Billing v2',
    description:
      'Metering pipeline hardening, invoice accuracy improvements, and new pricing dimensions for enterprise contracts.',
    owner: 'Morgan Lee',
    team: 'Product',
    sprint: '2026.04.2',
    status: 'on_track',
    priority: 'P0',
    progressPercent: 81,
    qaStatus: 'in_progress',
    releaseReadiness: 'ready',
    dueDate: '2026-05-05',
    riskLevel: 'medium',
    qaCoveragePercent: 84,
    lastUpdated: '2026-04-14T14:05:00Z',
    blockers: [
      {
        id: 'b1',
        title: 'Edge case: proration when mid-cycle tier change',
        severity: 'major',
        openedSince: '2026-04-09',
        owner: 'Billing Eng',
      },
    ],
    dependencies: [
      {
        id: 'd1',
        name: 'Finance approval on pricing matrix',
        type: 'external',
        impact: 'Final copy on invoices',
        status: 'resolved',
      },
    ],
    qaNotes: [
      'Regression suite for tax jurisdictions expanded; 2 flaky tests quarantined.',
      'Chaos test on metering lag completed — within SLO.',
    ],
    releaseNotes: [
      'Feature flag BILLING_V2_METERING default-off until GA.',
      'Customer comms drafted; legal review complete.',
    ],
    milestones: [
      { id: 'm1', name: 'Invoice accuracy audit', dueDate: '2026-04-20', status: 'done' },
      { id: 'm2', name: 'Shadow billing in prod', dueDate: '2026-04-25', status: 'in_progress' },
      { id: 'm3', name: 'GA', dueDate: '2026-05-06', status: 'planned' },
    ],
    risks: [
      {
        id: 'r1',
        title: 'Data backfill window overlaps with quarter close',
        impact: 'medium',
        status: 'mitigating',
        mitigation: 'Night-only jobs + Finance checkpoint.',
      },
    ],
    updates: [
      {
        id: 'u1',
        date: '2026-04-13',
        author: 'Morgan Lee',
        summary: 'Shadow mode metrics look stable; preparing GA checklist.',
      },
    ],
    actionItems: [
      {
        id: 'a1',
        title: 'Finalize support macros for billing disputes',
        owner: 'CX Ops',
        dueDate: '2026-04-22',
        status: 'open',
      },
    ],
    timeline: [
      {
        id: 't1',
        date: '2026-04-18',
        label: 'Go / no-go',
        description: 'Exec review with Finance + Legal.',
      },
    ],
  },
  {
    id: 'prj-mobile-offline',
    name: 'Mobile Offline Mode',
    description:
      'Offline-first task sync for field teams with conflict resolution and encrypted local cache.',
    owner: 'Samira Okonkwo',
    team: 'Product',
    sprint: '2026.04.1',
    status: 'delayed',
    priority: 'P1',
    progressPercent: 54,
    qaStatus: 'blocked',
    releaseReadiness: 'not_ready',
    dueDate: '2026-04-18',
    riskLevel: 'high',
    qaCoveragePercent: 52,
    lastUpdated: '2026-04-13T11:40:00Z',
    blockers: [
      {
        id: 'b1',
        title: 'iOS background sync killed under memory pressure',
        severity: 'critical',
        openedSince: '2026-04-06',
        owner: 'Mobile',
      },
      {
        id: 'b2',
        title: 'Android SQLite migration fails on 8% devices',
        severity: 'critical',
        openedSince: '2026-04-08',
        owner: 'Mobile',
      },
    ],
    dependencies: [
      {
        id: 'd1',
        name: 'Push notification reliability project',
        type: 'upstream',
        team: 'Platform',
        impact: 'Wake-up path for sync',
        status: 'in_flight',
      },
    ],
    qaNotes: [
      'Device lab matrix expanded; two OEMs still failing migration.',
      'Performance profiling blocked until migration fix lands.',
    ],
    releaseNotes: ['No RC candidate until blockers clear.'],
    milestones: [
      { id: 'm1', name: 'Beta to design partners', dueDate: '2026-04-12', status: 'at_risk' },
      { id: 'm2', name: 'App store submission', dueDate: '2026-04-25', status: 'planned' },
    ],
    risks: [
      {
        id: 'r1',
        title: 'Slip impacts Q2 field rollout commitments',
        impact: 'high',
        status: 'open',
      },
    ],
    updates: [
      {
        id: 'u1',
        date: '2026-04-12',
        author: 'Samira Okonkwo',
        summary: 'Prototyping alternate migration strategy; decision by 04/16.',
      },
    ],
    actionItems: [
      {
        id: 'a1',
        title: 'Customer comms on beta delay',
        owner: 'Product Marketing',
        dueDate: '2026-04-15',
        status: 'open',
      },
    ],
    timeline: [
      {
        id: 't1',
        date: '2026-04-16',
        label: 'Architecture review',
        description: 'Mobile + Platform alignment on sync model.',
      },
    ],
  },
  {
    id: 'prj-data-pipeline-slo',
    name: 'Analytics Pipeline SLO',
    description:
      'End-to-end latency and freshness SLOs for the product analytics warehouse with customer-facing status.',
    owner: 'Diego Alvarez',
    team: 'Platform',
    sprint: '2026.04.2',
    status: 'on_track',
    priority: 'P1',
    progressPercent: 88,
    qaStatus: 'passed',
    releaseReadiness: 'ready',
    dueDate: '2026-04-30',
    riskLevel: 'low',
    qaCoveragePercent: 91,
    lastUpdated: '2026-04-14T09:15:00Z',
    blockers: [],
    dependencies: [
      {
        id: 'd1',
        name: 'Kafka cluster upgrade',
        type: 'upstream',
        team: 'Platform',
        impact: 'Consumer lag during cutover',
        status: 'resolved',
      },
    ],
    qaNotes: [
      'Soak tests passed for 7-day window; alerting tuned to reduce noise.',
    ],
    releaseNotes: ['Status page component ready behind feature flag.'],
    milestones: [
      { id: 'm1', name: 'SLO dashboards in Grafana', dueDate: '2026-04-20', status: 'done' },
      { id: 'm2', name: 'Customer status page beta', dueDate: '2026-04-27', status: 'in_progress' },
    ],
    risks: [],
    updates: [
      {
        id: 'u1',
        date: '2026-04-13',
        author: 'Diego Alvarez',
        summary: 'Cutover rehearsal successful; on-call briefed.',
      },
    ],
    actionItems: [
      {
        id: 'a1',
        title: 'Write retro template for incident drills',
        owner: 'SRE',
        dueDate: '2026-04-29',
        status: 'open',
      },
    ],
    timeline: [
      {
        id: 't1',
        date: '2026-04-22',
        label: 'Freeze on pipeline config',
        description: 'No structural changes post this date without TPM approval.',
      },
    ],
  },
  {
    id: 'prj-growth-experiments',
    name: 'Growth Experimentation Platform',
    description:
      'Self-serve A/B infrastructure with guardrails, holdouts, and automated winner promotion workflows.',
    owner: 'Aisha Rahman',
    team: 'Growth',
    sprint: '2026.04.2',
    status: 'at_risk',
    priority: 'P1',
    progressPercent: 63,
    qaStatus: 'in_progress',
    releaseReadiness: 'staging',
    dueDate: '2026-05-12',
    riskLevel: 'medium',
    qaCoveragePercent: 61,
    lastUpdated: '2026-04-14T13:22:00Z',
    blockers: [
      {
        id: 'b1',
        title: 'Holdout overlap detection false positives',
        severity: 'major',
        openedSince: '2026-04-11',
        owner: 'Growth Eng',
      },
    ],
    dependencies: [
      {
        id: 'd1',
        name: 'Event taxonomy v4',
        type: 'upstream',
        team: 'Product',
        impact: 'Experiment metrics completeness',
        status: 'in_flight',
      },
    ],
    qaNotes: [
      'Statistical engine tests green; UI flows need accessibility sweep.',
    ],
    releaseNotes: ['Internal dogfood scheduled for Growth + PMM.'],
    milestones: [
      { id: 'm1', name: 'Design partner onboarding', dueDate: '2026-04-24', status: 'in_progress' },
      { id: 'm2', name: 'GA', dueDate: '2026-05-15', status: 'planned' },
    ],
    risks: [
      {
        id: 'r1',
        title: 'Potential conflict with pricing page experiments',
        impact: 'medium',
        status: 'open',
      },
    ],
    updates: [
      {
        id: 'u1',
        date: '2026-04-12',
        author: 'Aisha Rahman',
        summary: 'Aligning on holdout rules with Data Science; doc by Friday.',
      },
    ],
    actionItems: [
      {
        id: 'a1',
        title: 'Training deck for PMMs',
        owner: 'Growth',
        dueDate: '2026-04-26',
        status: 'open',
      },
    ],
    timeline: [
      {
        id: 't1',
        date: '2026-04-19',
        label: 'Experiment council review',
        description: 'Guardrails and ethical review checklist.',
      },
    ],
  },
  {
    id: 'prj-ops-dr-drill',
    name: 'Multi-Region DR Drill Program',
    description:
      'Quarterly disaster recovery exercises with RTO/RPO validation and automated failover runbooks.',
    owner: 'Helena Costa',
    team: 'Operations',
    sprint: '2026.04.2',
    status: 'on_track',
    priority: 'P1',
    progressPercent: 76,
    qaStatus: 'sign_off_pending',
    releaseReadiness: 'staging',
    dueDate: '2026-05-01',
    riskLevel: 'medium',
    qaCoveragePercent: 79,
    lastUpdated: '2026-04-13T17:00:00Z',
    blockers: [],
    dependencies: [
      {
        id: 'd1',
        name: 'Vendor maintenance window',
        type: 'external',
        impact: 'May compress rehearsal calendar',
        status: 'waiting',
      },
    ],
    qaNotes: [
      'Tabletop review completed; one runbook gap identified for DNS cutover.',
    ],
    releaseNotes: ['Post-drill report template refreshed.'],
    milestones: [
      { id: 'm1', name: 'Regional failover rehearsal', dueDate: '2026-04-23', status: 'planned' },
      { id: 'm2', name: 'Exec readout', dueDate: '2026-05-03', status: 'planned' },
    ],
    risks: [
      {
        id: 'r1',
        title: 'Staff PTO overlaps with rehearsal week',
        impact: 'low',
        status: 'mitigating',
        mitigation: 'Backup leads assigned per service.',
      },
    ],
    updates: [
      {
        id: 'u1',
        date: '2026-04-10',
        author: 'Helena Costa',
        summary: 'Scope locked; comms to customers drafted.',
      },
    ],
    actionItems: [
      {
        id: 'a1',
        title: 'Update status page templates',
        owner: 'Ops',
        dueDate: '2026-04-21',
        status: 'open',
      },
    ],
    timeline: [
      {
        id: 't1',
        date: '2026-04-23',
        label: 'Live failover rehearsal',
        description: 'Primary ↔ secondary with customer traffic shadowing.',
      },
    ],
  },
  {
    id: 'prj-qa-test-data',
    name: 'Synthetic Test Data Service',
    description:
      'Privacy-safe synthetic datasets for integration tests, with schema drift detection and fixture refresh automation.',
    owner: 'Priya Nandakumar',
    team: 'QA',
    sprint: '2026.04.2',
    status: 'on_track',
    priority: 'P2',
    progressPercent: 69,
    qaStatus: 'in_progress',
    releaseReadiness: 'staging',
    dueDate: '2026-05-20',
    riskLevel: 'low',
    qaCoveragePercent: 77,
    lastUpdated: '2026-04-14T10:08:00Z',
    blockers: [],
    dependencies: [
      {
        id: 'd1',
        name: 'PII classification service',
        type: 'upstream',
        team: 'Platform',
        impact: 'Generator constraints',
        status: 'in_flight',
      },
    ],
    qaNotes: [
      'Contract tests against 6 core services; nightly drift report to Slack.',
    ],
    releaseNotes: ['Library publish to internal artifact registry pending.'],
    milestones: [
      { id: 'm1', name: 'Pilot with Billing squad', dueDate: '2026-05-01', status: 'in_progress' },
    ],
    risks: [],
    updates: [
      {
        id: 'u1',
        date: '2026-04-12',
        author: 'Priya Nandakumar',
        summary: 'Fixture refresh job cut CI time by 18% in pilot repo.',
      },
    ],
    actionItems: [
      {
        id: 'a1',
        title: 'Document onboarding for service teams',
        owner: 'QA',
        dueDate: '2026-05-08',
        status: 'open',
      },
    ],
    timeline: [
      {
        id: 't1',
        date: '2026-05-02',
        label: 'Org-wide office hours',
        description: 'Adoption Q&A and roadmap.',
      },
    ],
  },
  {
    id: 'prj-platform-cost',
    name: 'Cloud Cost Attribution',
    description:
      'Per-team and per-feature cost visibility with anomaly alerts and savings recommendations.',
    owner: 'Noah Ibrahim',
    team: 'Platform',
    sprint: '2026.04.1',
    status: 'release_ready',
    priority: 'P2',
    progressPercent: 95,
    qaStatus: 'passed',
    releaseReadiness: 'ready',
    dueDate: '2026-04-16',
    riskLevel: 'low',
    qaCoveragePercent: 88,
    lastUpdated: '2026-04-14T08:45:00Z',
    blockers: [],
    dependencies: [],
    qaNotes: ['Final accessibility pass scheduled 04/15.'],
    releaseNotes: ['Launch email to engineering managers prepared.'],
    milestones: [
      { id: 'm1', name: 'FinOps review', dueDate: '2026-04-14', status: 'done' },
      { id: 'm2', name: 'GA', dueDate: '2026-04-17', status: 'planned' },
    ],
    risks: [],
    updates: [
      {
        id: 'u1',
        date: '2026-04-13',
        author: 'Noah Ibrahim',
        summary: 'All launch gates green; waiting on comms slot.',
      },
    ],
    actionItems: [
      {
        id: 'a1',
        title: 'Record Loom walkthrough for FinOps',
        owner: 'Platform',
        dueDate: '2026-04-16',
        status: 'open',
      },
    ],
    timeline: [
      {
        id: 't1',
        date: '2026-04-17',
        label: 'GA',
        description: 'Dashboard default-on for all engineering teams.',
      },
    ],
  },
  {
    id: 'prj-product-entitlements',
    name: 'Entitlements Service Revamp',
    description:
      'Centralized entitlements with real-time updates, audit trail, and admin tooling for enterprise overrides.',
    owner: 'Elena Petrov',
    team: 'Product',
    sprint: '2026.04.2',
    status: 'on_track',
    priority: 'P1',
    progressPercent: 74,
    qaStatus: 'in_progress',
    releaseReadiness: 'staging',
    dueDate: '2026-05-08',
    riskLevel: 'medium',
    qaCoveragePercent: 73,
    lastUpdated: '2026-04-13T15:30:00Z',
    blockers: [
      {
        id: 'b1',
        title: 'Race when entitlement changes during active session',
        severity: 'major',
        openedSince: '2026-04-07',
        owner: 'Product Eng',
      },
    ],
    dependencies: [
      {
        id: 'd1',
        name: 'Admin audit log retention policy',
        type: 'upstream',
        team: 'Operations',
        impact: 'Compliance sign-off',
        status: 'in_flight',
      },
    ],
    qaNotes: [
      'Concurrency tests expanded; one rare race still under investigation.',
    ],
    releaseNotes: ['Migration scripts dry-run complete on staging clone.'],
    milestones: [
      { id: 'm1', name: 'Shadow reads in prod', dueDate: '2026-04-26', status: 'in_progress' },
      { id: 'm2', name: 'Cutover', dueDate: '2026-05-10', status: 'planned' },
    ],
    risks: [
      {
        id: 'r1',
        title: 'Support queue spike if migration messaging unclear',
        impact: 'medium',
        status: 'mitigating',
        mitigation: 'Macros + in-app banner prepared.',
      },
    ],
    updates: [
      {
        id: 'u1',
        date: '2026-04-12',
        author: 'Elena Petrov',
        summary: 'Pairing with Support on top confusion scenarios.',
      },
    ],
    actionItems: [
      {
        id: 'a1',
        title: 'Update admin training videos',
        owner: 'CX Enablement',
        dueDate: '2026-05-02',
        status: 'open',
      },
    ],
    timeline: [
      {
        id: 't1',
        date: '2026-04-29',
        label: 'Cutover rehearsal',
        description: 'Full rollback drill with SRE.',
      },
    ],
  },
  {
    id: 'prj-growth-seo-core',
    name: 'Core Web Vitals & SEO Hardening',
    description:
      'Performance budget enforcement, structured data fixes, and crawl efficiency improvements for marketing surfaces.',
    owner: 'Marcus Chen',
    team: 'Growth',
    sprint: '2026.04.2',
    status: 'completed',
    priority: 'P2',
    progressPercent: 100,
    qaStatus: 'passed',
    releaseReadiness: 'released',
    dueDate: '2026-04-10',
    riskLevel: 'low',
    qaCoveragePercent: 86,
    lastUpdated: '2026-04-10T19:00:00Z',
    blockers: [],
    dependencies: [],
    qaNotes: ['Lighthouse CI gates added to main marketing repo.'],
    releaseNotes: ['Search console errors reduced 38% week over week.'],
    milestones: [
      { id: 'm1', name: 'Rollout complete', dueDate: '2026-04-10', status: 'done' },
    ],
    risks: [],
    updates: [
      {
        id: 'u1',
        date: '2026-04-10',
        author: 'Marcus Chen',
        summary: 'Retro scheduled; monitoring dashboards handed to Growth.',
      },
    ],
    actionItems: [
      {
        id: 'a1',
        title: 'Quarterly SEO audit',
        owner: 'Growth',
        dueDate: '2026-07-01',
        status: 'open',
      },
    ],
    timeline: [
      {
        id: 't1',
        date: '2026-04-10',
        label: 'Project closed',
        description: 'Success metrics baselined for Q3.',
      },
    ],
  },
  {
    id: 'prj-ops-vendor-review',
    name: 'Critical Vendor Review Cycle',
    description:
      'Annual review of subprocessors, SOC reports, and exit strategies for top 12 vendors.',
    owner: 'Riley Thompson',
    team: 'Operations',
    sprint: '2026.04.2',
    status: 'on_track',
    priority: 'P2',
    progressPercent: 58,
    qaStatus: 'not_started',
    releaseReadiness: 'not_ready',
    dueDate: '2026-06-15',
    riskLevel: 'low',
    qaCoveragePercent: 40,
    lastUpdated: '2026-04-11T12:00:00Z',
    blockers: [],
    dependencies: [
      {
        id: 'd1',
        name: 'Legal questionnaire backlog',
        type: 'external',
        impact: 'May delay two vendor sign-offs',
        status: 'waiting',
      },
    ],
    qaNotes: ['Security review artifacts collection in progress.'],
    releaseNotes: ['Final packet for leadership in June.'],
    milestones: [
      { id: 'm1', name: 'Vendor risk scoring', dueDate: '2026-05-10', status: 'in_progress' },
    ],
    risks: [
      {
        id: 'r1',
        title: 'Delayed responses from two vendors in EU',
        impact: 'medium',
        status: 'open',
      },
    ],
    updates: [
      {
        id: 'u1',
        date: '2026-04-09',
        author: 'Riley Thompson',
        summary: 'Kickoff deck circulated; RACI updated.',
      },
    ],
    actionItems: [
      {
        id: 'a1',
        title: 'Schedule exec readouts',
        owner: 'Operations',
        dueDate: '2026-05-20',
        status: 'open',
      },
    ],
    timeline: [
      {
        id: 't1',
        date: '2026-05-12',
        label: 'Mid-cycle checkpoint',
        description: 'Status vs. timeline; escalate gaps.',
      },
    ],
  },
  {
    id: 'prj-qa-flake-detector',
    name: 'CI Flake Detector & Quarantine',
    description:
      'ML-assisted flake scoring, automatic quarantine proposals, and owner notifications in CI.',
    owner: 'Daniel Frost',
    team: 'QA',
    sprint: '2026.04.2',
    status: 'at_risk',
    priority: 'P2',
    progressPercent: 47,
    qaStatus: 'in_progress',
    releaseReadiness: 'not_ready',
    dueDate: '2026-06-01',
    riskLevel: 'medium',
    qaCoveragePercent: 55,
    lastUpdated: '2026-04-12T09:20:00Z',
    blockers: [
      {
        id: 'b1',
        title: 'False positives on parallelized test shards',
        severity: 'major',
        openedSince: '2026-04-05',
        owner: 'QA Platform',
      },
    ],
    dependencies: [
      {
        id: 'd1',
        name: 'CI telemetry export to warehouse',
        type: 'upstream',
        team: 'Platform',
        impact: 'Training data completeness',
        status: 'in_flight',
      },
    ],
    qaNotes: [
      'Pilot on two repos; precision needs to reach 92% before wider rollout.',
    ],
    releaseNotes: [],
    milestones: [
      { id: 'm1', name: 'Pilot expansion', dueDate: '2026-05-15', status: 'planned' },
    ],
    risks: [
      {
        id: 'r1',
        title: 'Model retraining cadence vs. CI churn',
        impact: 'medium',
        status: 'open',
      },
    ],
    updates: [
      {
        id: 'u1',
        date: '2026-04-11',
        author: 'Daniel Frost',
        summary: 'Data team helping with feature engineering for shard IDs.',
      },
    ],
    actionItems: [
      {
        id: 'a1',
        title: 'Define rollback for auto-quarantine',
        owner: 'QA',
        dueDate: '2026-04-28',
        status: 'open',
      },
    ],
    timeline: [
      {
        id: 't1',
        date: '2026-05-01',
        label: 'Go / no-go for org rollout',
        description: 'Requires precision/recall targets met.',
      },
    ],
  },
  {
    id: 'prj-platform-edge',
    name: 'Edge Cache Strategy 2.0',
    description:
      'Tiered caching at the edge with smarter purge keys and regional failover for static and semi-dynamic assets.',
    owner: 'Fatima Haddad',
    team: 'Platform',
    sprint: '2026.04.2',
    status: 'on_track',
    priority: 'P1',
    progressPercent: 82,
    qaStatus: 'in_progress',
    releaseReadiness: 'staging',
    dueDate: '2026-05-18',
    riskLevel: 'medium',
    qaCoveragePercent: 80,
    lastUpdated: '2026-04-14T07:55:00Z',
    blockers: [],
    dependencies: [
      {
        id: 'd1',
        name: 'CDN contract renewal',
        type: 'external',
        impact: 'Purging API limits',
        status: 'in_flight',
      },
    ],
    qaNotes: [
      'Load tests show 22% p95 improvement on doc pages; blog mixed results.',
    ],
    releaseNotes: ['Phased rollout by geography after soak.'],
    milestones: [
      { id: 'm1', name: 'Canary region 1', dueDate: '2026-05-05', status: 'planned' },
    ],
    risks: [
      {
        id: 'r1',
        title: 'Stale content risk for pricing pages during rollout',
        impact: 'high',
        status: 'mitigating',
        mitigation: 'Short TTL + manual purge playbook.',
      },
    ],
    updates: [
      {
        id: 'u1',
        date: '2026-04-13',
        author: 'Fatima Haddad',
        summary: 'Growth signed off on cache rules for experiments.',
      },
    ],
    actionItems: [
      {
        id: 'a1',
        title: 'Update incident runbooks for purge storms',
        owner: 'SRE',
        dueDate: '2026-05-10',
        status: 'open',
      },
    ],
    timeline: [
      {
        id: 't1',
        date: '2026-05-06',
        label: 'Canary kickoff',
        description: 'EU-West first; monitor error budgets.',
      },
    ],
  },
  {
    id: 'prj-product-marketplace',
    name: 'Partner Marketplace MVP',
    description:
      'Discover, trial, and bill third-party integrations with unified contracts and support routing.',
    owner: 'Vikram Singh',
    team: 'Product',
    sprint: '2026.04.2',
    status: 'delayed',
    priority: 'P1',
    progressPercent: 41,
    qaStatus: 'in_progress',
    releaseReadiness: 'not_ready',
    dueDate: '2026-07-01',
    riskLevel: 'high',
    qaCoveragePercent: 48,
    lastUpdated: '2026-04-13T18:10:00Z',
    blockers: [
      {
        id: 'b1',
        title: 'Partner payout reconciliation discrepancies',
        severity: 'critical',
        openedSince: '2026-04-02',
        owner: 'Finance Eng',
      },
    ],
    dependencies: [
      {
        id: 'd1',
        name: 'Legal template for partner agreements',
        type: 'external',
        impact: 'Blocks two pilot partners',
        status: 'waiting',
      },
    ],
    qaNotes: [
      'Happy path covered; edge cases for refunds still thin.',
    ],
    releaseNotes: ['Private beta scope reduced to 3 partners.'],
    milestones: [
      { id: 'm1', name: 'Private beta', dueDate: '2026-05-30', status: 'at_risk' },
    ],
    risks: [
      {
        id: 'r1',
        title: 'Revenue recognition review may push GA',
        impact: 'high',
        status: 'open',
      },
    ],
    updates: [
      {
        id: 'u1',
        date: '2026-04-12',
        author: 'Vikram Singh',
        summary: 'Weekly exec sync established until payouts stable.',
      },
    ],
    actionItems: [
      {
        id: 'a1',
        title: 'Partner support playbook draft',
        owner: 'CX',
        dueDate: '2026-05-12',
        status: 'open',
      },
    ],
    timeline: [
      {
        id: 't1',
        date: '2026-05-05',
        label: 'Beta scope decision',
        description: 'Confirm partner list and success criteria.',
      },
    ],
  },
  {
    id: 'prj-growth-paywall',
    name: 'Self-Serve Paywall Experiment',
    description:
      'Test alternate paywall copy, plans, and upgrade paths for SMB self-serve funnel.',
    owner: 'Nina Kowalski',
    team: 'Growth',
    sprint: '2026.04.2',
    status: 'on_track',
    priority: 'P2',
    progressPercent: 91,
    qaStatus: 'passed',
    releaseReadiness: 'ready',
    dueDate: '2026-04-22',
    riskLevel: 'low',
    qaCoveragePercent: 83,
    lastUpdated: '2026-04-14T12:00:00Z',
    blockers: [],
    dependencies: [
      {
        id: 'd1',
        name: 'Localization for DE/FR strings',
        type: 'upstream',
        team: 'Growth',
        impact: 'EU launch variant',
        status: 'resolved',
      },
    ],
    qaNotes: [
      'Experiment QA complete; monitoring hooks verified.',
    ],
    releaseNotes: ['Rollout 10% → 50% → 100% with guardrails.'],
    milestones: [
      { id: 'm1', name: 'Launch', dueDate: '2026-04-23', status: 'planned' },
    ],
    risks: [],
    updates: [
      {
        id: 'u1',
        date: '2026-04-13',
        author: 'Nina Kowalski',
        summary: 'GTM alignment done; waiting on final analytics dashboard.',
      },
    ],
    actionItems: [
      {
        id: 'a1',
        title: 'Post-launch retrospective',
        owner: 'Growth',
        dueDate: '2026-04-30',
        status: 'open',
      },
    ],
    timeline: [
      {
        id: 't1',
        date: '2026-04-23',
        label: 'Experiment live',
        description: 'Primary metric: trial-to-paid conversion.',
      },
    ],
  },
];
