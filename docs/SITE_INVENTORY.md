# Site Inventory (Discovery Snapshot)

Date: 2026-02-15
Status: Discovery-only (no production changes applied)

## Live route status snapshot

Observed with direct HTTP checks:

- `/` → `200`
- `/about/` → `200`
- `/coming-soon/` → `200`
- `/tags/` → `404`
- `/writings/` → `404`

Notes:
- `tags` and `writings` appear in theme conventions, but are currently unresolved on live.
- `/about/` is stable and already enforced in smoke tests.

## Navigation/link inventory (current state)

Known live-safe route:
- `/about/`

Known unresolved routes (currently 404):
- `/tags/`
- `/writings/`

Unknowns pending deeper mapping:
- Which links are rendered conditionally by Ghost settings/menu config
- Which links are coming from theme defaults vs explicit admin navigation

## Theme structure inventory (`ghost/themes/format`)

### Core templates
- `default.hbs`, `home.hbs`, `index.hbs`, `post.hbs`, `page.hbs`
- `tag.hbs`, `author.hbs`, `writings.hbs`
- Error handling: `error.hbs`, `error-404.hbs`
- Auth/member pages: `signin.hbs`, `signup.hbs`, `page-membership.hbs`

### Key partials
- `partials/navigation.hbs`
- `partials/get-posts.hbs`, `partials/get-tags.hbs`
- `partials/form-subscribe.hbs`
- `partials/pagination.hbs`

### Assets
- `assets/custom.css`, `assets/custom.js`
- Built/static assets under `assets/`

### Theme config surfaces
- `package.json` custom settings (includes header and subscription fields)
- `routes.yaml`

## Automation/guardrail inventory

### Playwright tests
- `tests/smoke.spec.ts`
  - Homepage title/hero checks
  - Flexible internal-link response checks
  - Explicit `/about` route stability check
- `tests/visual.spec.ts`
  - Desktop/mobile homepage capture tests

### CI workflow
- `.github/workflows/playwright.yml`
  - Triggers: `pull_request` to `main`, `workflow_dispatch`
  - Uploads: `playwright-results`, `playwright-report`, snapshots

### Branch protection
- `main` protected
- Required status check: `test` (Playwright)
- Strict mode enabled
