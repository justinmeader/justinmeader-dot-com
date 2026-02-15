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

Theme changes are deployed manually via Ghost Admin UI or SSH/SFTP to the droplet.

### Safe Deployment Runbook

For the operational deployment workflow (preflight, CI gates, rollback, incident response), use:

- `docs/SAFE_DEPLOY_RUNBOOK.md`

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
