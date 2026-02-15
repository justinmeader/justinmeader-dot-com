# Safe Deploy Runbook (Ghost-First)

This runbook is for **safe iteration + recoverability** on `justinmeader.com`.

Scope:
- Content/config edits in Ghost Admin
- Theme code edits versioned in this repo
- CI-gated validation before production-facing theme changes

---

## 0) Known-good references

- Repo: `https://github.com/justinmeader/justinmeader-dot-com`
- Theme path in repo: `ghost/themes/format/`
- CI workflow: `.github/workflows/playwright.yml`
- Required branch check on `main`: `test` (Playwright)

---

## 1) Preflight checklist (always)

Run from repo root:

```bash
cd /root/.openclaw/workspace-workshop/sites/justinmeader-dot-com

git status
git pull --ff-only
npm ci
npm test
```

Go / no-go:
- ✅ Working tree clean (or intentional changes only)
- ✅ Local tests pass
- ✅ You can reach production site (`https://justinmeader.com`)

Quick production smoke:

```bash
curl -I https://justinmeader.com
curl -s -o /dev/null -w "%{http_code}\n" https://justinmeader.com/about/
```

---

## 2) Choose change path

## A) Ghost Admin content/config change (no theme code)

Use for:
- Posts/pages text updates
- Navigation/menu tweaks
- Theme setting values in Ghost Admin

Workflow:
1. Make edit in Ghost Admin.
2. Verify on live site immediately.
3. If change should be documented in git, snapshot related theme/config changes into repo (if applicable).

Notes:
- No forced code deploy required.
- Still run quick verification checklist (Section 6).

## B) Theme code change (repo-driven)

Use for:
- Handlebars/CSS/JS theme edits
- Layout/visual/system behavior updates
- Files under `ghost/themes/format/**`

Workflow summary:
1. Edit code in repo.
2. Run local tests.
3. Push to branch / `main` (required status check enforces CI).
4. Trigger/confirm Playwright workflow success.
5. Promote theme to production host.
6. Verify production.

---

## 3) CI gates (required)

Run local first:

```bash
npm test
```

Trigger/inspect GitHub Actions manually when needed:

```bash
gh workflow run playwright.yml --ref main
gh run list --workflow=playwright.yml --limit 5
gh run view <run-id>
```

Hard rule:
- Do not promote theme changes to production if Playwright `test` is failing.

---

## 4) Deployment steps (theme code path)

## 4.1 Package/sync theme

Use your standard Ghost theme deployment method (Admin upload or server-side sync).

If using Ghost Admin upload, upload a fresh `format.zip` built from current repo snapshot.

## 4.2 Activate theme safely

In Ghost Admin:
1. Upload new theme package.
2. Preview if available.
3. Activate.

## 4.3 Immediate post-activate checks

```bash
curl -s -o /dev/null -w "%{http_code}\n" https://justinmeader.com/
curl -s -o /dev/null -w "%{http_code}\n" https://justinmeader.com/about/
```

Then run Playwright against prod URL (optional but recommended):

```bash
BASE_URL=https://justinmeader.com npm test
```

---

## 5) Backup and rollback checkpoints

Create checkpoint **before** risky changes.

Suggested checkpoint moments:
- Before Ghost upgrade/theme major edits
- Before activating new theme package
- Before editing DB-backed theme settings directly

Rollback options (fastest first):
1. Re-activate previously known-good theme package/version.
2. Revert to known-good git commit and redeploy that theme build.
3. Restore from host backup checkpoint (last resort).

Git rollback pattern:

```bash
git log --oneline -n 20
git checkout <known-good-commit>
# rebuild/repackage/redeploy known-good snapshot
```

---

## 6) Verification checklist (post-change)

Functional:
- Homepage loads
- Hero title/description render correctly
- `/about/` returns 2xx/3xx
- At least one primary nav path resolves correctly

CI:
- Latest Playwright run = success
- Artifacts uploaded (`playwright-results`, `playwright-report`)

Operational:
- No obvious console/runtime breakage
- No unexpected 404s on critical routes

---

## 7) Incident quick response

If production breaks:

1. **Stop further changes**.
2. Capture evidence quickly:

```bash
gh run list --workflow=playwright.yml --limit 3
gh run view <run-id> --log-failed
```

3. Roll back to last known-good theme package/commit.
4. Re-run verification checklist (Section 6).
5. Open follow-up fix in git with root cause notes.

---

## 8) Minimal command cheat sheet

```bash
# local validation
npm ci && npm test

# trigger CI
gh workflow run playwright.yml --ref main

# inspect recent runs
gh run list --workflow=playwright.yml --limit 5

# inspect one run
gh run view <run-id>

# failed logs only
gh run view <run-id> --log-failed
```
