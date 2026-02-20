# justinmeader.com

Personal website and blog powered by Ghost CMS.

## Infrastructure

- **Host**: DigitalOcean droplet `justinmeader.com-ghost`
- **OS**: Ubuntu 22.04 LTS
- **Stack**: Ghost 6.19.0 + Node.js v22 + Nginx + MySQL
- **Theme**: Format (custom modifications)

## Testing

This repository includes Playwright end-to-end tests for smoke testing and visual regression.

### Setup

```bash
# Install dependencies
npm install

# Install Playwright browsers (requires system dependencies)
npx playwright install --with-deps chromium

# Or in Docker/CI
npx playwright install chromium
```

### Running Tests

```bash
# Run all tests
npm test

# Run with headed browser
npm run test:headed

# Debug mode
npm run test:debug

# Update visual snapshots
npm run test:update-snapshots

# View test report
npm run test:report
```

### Test Coverage

**Smoke Tests** (`tests/smoke.spec.ts`):
- Homepage loads successfully
- Hero text and heading visibility
- Navigation links are functional and return valid responses

**Visual Regression** (`tests/visual.spec.ts`):
- Homepage desktop snapshot (1440x1000)
- Homepage mobile snapshot (iPhone 13)
- Baseline comparison with 2% diff tolerance

### GitHub Actions

Tests run automatically on:
- Pull requests to `main`
- Manual trigger via workflow_dispatch

Test results, HTML reports, and visual snapshots are uploaded as artifacts with 30-day retention.

## Development

### Theme Development

The active theme is located in `ghost/themes/format/`. Changes should be tested locally before deploying to production.

### Deployment

**⚠️ READ FIRST:** See [Safe Deployment Runbook](docs/SAFE_DEPLOY_RUNBOOK.md) for complete operational procedures.

**Quick Links:**
- [Operator Mode](docs/SAFE_DEPLOY_RUNBOOK.md#operator-mode) — checkbox flows for normal changes and break-glass rollbacks
- [Preflight checks](docs/SAFE_DEPLOY_RUNBOOK.md#preflight-checks) — verify before deploying
- [Change paths](docs/SAFE_DEPLOY_RUNBOOK.md#change-paths) — content vs theme vs config
- [Rollback procedures](docs/SAFE_DEPLOY_RUNBOOK.md#incident-quick-response) — emergency recovery
- [Verification checklist](docs/SAFE_DEPLOY_RUNBOOK.md#deployment-verification-checklist) — post-deploy validation

Theme changes are deployed manually via Ghost Admin UI or SSH/SFTP to the droplet.

## Discovery Docs

- `docs/SITE_INVENTORY.md` — current route/theme/automation snapshot
- `docs/DECISION_BACKLOG.md` — decisions needing Justin vs Pod defaults
- `docs/METADATA_BASELINE_DRAFT.md` — metadata proposal (NOT APPLIED)
- `docs/DECISION_RECOMMENDATIONS_V1.md` — Pod default recommendations + approve/edit checklist
- `docs/ICON_SELECTION_DRAFT.md` — Streamline Pro icon checklist (deadline: March 2nd)

## Notes

- **Never commit** database dumps, secrets, or `.env` files
- Backups are stored separately (droplet + local workbench)
- This repository is the canonical source for theme versioning

## Requirements

- **Node.js**: v20+
- **npm**: v10+
- **Playwright**: ^1.58

## License

MIT
