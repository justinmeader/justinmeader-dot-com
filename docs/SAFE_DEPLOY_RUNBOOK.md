# Safe Deployment Runbook

**Purpose:** Operational guide for safe iteration and recoverability of justinmeader.com Ghost site.

**Last Updated:** 2026-02-15

---

## Quick Reference

| Change Type | Path | Risk Level |
|-------------|------|------------|
| Content (posts, pages, settings) | Ghost Admin UI | **LOW** — auto-versioned by Ghost |
| Theme code (templates, styles, scripts) | `ghost/themes/format/` → Deploy | **MEDIUM** — requires deployment |
| Ghost config (routes, redirects) | `ghost/config/` → Restart | **HIGH** — service restart required |

---

## Operator Mode

**Quick operational flows for common scenarios. For detailed procedures, see sections below.**

### Flow 1: Normal Change (Safe Path)

**For theme code or config changes. Content-only changes skip to verification.**

- [ ] **Preflight:** Verify production state (`curl -I https://justinmeader.com`)
- [ ] **Backup:** Create timestamped backup (`ghost backup --file "pre-deploy-$(date +%Y%m%d-%H%M%S).json"`)
- [ ] **Branch:** Create feature branch (`git checkout -b feature/change-name`)
- [ ] **Change:** Make code changes in `ghost/themes/format/`
- [ ] **Test:** Run local tests (`npm test`)
- [ ] **PR:** Open PR, wait for CI green (`gh pr create`, wait for Playwright tests)
- [ ] **Merge:** Squash merge to main (`gh pr merge --squash`)
- [ ] **Deploy:** Upload theme via Ghost Admin or SSH/SFTP
- [ ] **Restart:** If needed, restart Ghost (`sudo ghost restart`)
- [ ] **Verify:** Run smoke tests (`npm test`), check homepage/posts/console
- [ ] **Monitor:** Check Ghost logs for 5 minutes (`sudo ghost log`)

**Abort criteria:** CI fails, tests fail, backup missing → stop and fix before proceeding.

### Flow 2: Break-Glass Rollback

**For immediate production issues. Skip ceremony, restore stability.**

- [ ] **Assess:** Identify failure type (theme break / content loss / service down / SSL issue)
- [ ] **Theme break:** Restore theme backup
  ```bash
  ssh root@justinmeader.com-ghost
  cd /var/www/ghost/content/themes
  sudo tar -xzf format-backup-[latest].tar.gz
  sudo chown -R ghost:ghost format
  sudo ghost restart
  ```
- [ ] **Content loss:** Import latest backup via Ghost Admin → Settings → Labs → Import
- [ ] **Service down:** Restart Ghost (`sudo ghost restart`), check logs (`sudo ghost log`)
- [ ] **SSL issues:** Renew cert (`sudo certbot renew --force-renewal`), restart Nginx
- [ ] **Verify:** Check homepage loads (`curl -I https://justinmeader.com`)
- [ ] **Document:** Log incident details for postmortem
- [ ] **Fix forward:** Create issue, schedule proper fix after stability restored

**Success criteria:** Site responds 200, no console errors, Ghost service stable.

---

## Preflight Checks

### Before ANY deployment:

```bash
# 1. Verify current production state
curl -I https://justinmeader.com
curl -s https://justinmeader.com | grep -o '<title>[^<]*</title>'

# 2. Check Ghost service status (SSH to droplet)
ssh root@justinmeader.com-ghost
sudo systemctl status ghost_justinmeader-com
sudo ghost status

# 3. Verify database backup exists
sudo ls -lth /var/backups/ghost/ | head -5

# 4. Check disk space
df -h /

# 5. Verify CI passing
# → Check GitHub Actions on latest main commit
```

### Pre-deployment snapshot:

```bash
# Create timestamped backup
sudo ghost backup --file "pre-deploy-$(date +%Y%m%d-%H%M%S).json"

# Backup current theme
cd /var/www/ghost/content/themes
sudo tar -czf "format-backup-$(date +%Y%m%d-%H%M%S).tar.gz" format/
```

---

## Change Paths

### Path 1: Content Changes (Ghost Admin UI)

**Scope:** Posts, pages, design settings, navigation, integrations

**Risk:** LOW — Ghost auto-versions content

**Steps:**

1. Navigate to Ghost Admin: `https://justinmeader.com/ghost`
2. Make changes in editor/settings
3. Use "Preview" before publishing
4. Click "Publish" or "Update"

**Verification:**

```bash
# Check post published successfully
curl -s https://justinmeader.com/[slug]/ | grep -o '<title>[^<]*</title>'

# Verify RSS feed updated
curl -s https://justinmeader.com/rss/ | grep -o '<title>[^<]*</title>' | head -5
```

**Rollback:**

- Ghost Admin → Posts → Click post → "Post History" → Restore previous version
- OR: Ghost Admin → Settings → Labs → Import Content (from backup JSON)

---

### Path 2: Theme Code Changes

**Scope:** Templates (`.hbs`), styles (`.css`), scripts (`.js`), assets

**Risk:** MEDIUM — requires deployment and Ghost restart

**Steps:**

#### 2A. Local Development

```bash
# 1. Create feature branch
git checkout -b feature/theme-update

# 2. Make changes in ghost/themes/format/

# 3. Test locally (if running local Ghost)
cd ghost/themes/format
npm install
npm run dev  # Watch mode for development

# 4. Run theme validation
npm test     # Runs gscan

# 5. Commit changes
git add ghost/themes/format/
git commit -m "feat(theme): describe changes"
git push origin feature/theme-update
```

#### 2B. CI Validation

```bash
# 6. Open PR to main
gh pr create --title "Theme: [description]" --body "Changes: ..."

# 7. Wait for CI checks
# → Playwright smoke tests
# → Visual regression tests
# → Review test artifacts

# 8. Merge PR when green
gh pr merge --squash
```

#### 2C. Production Deployment

**Option A: Ghost Admin Upload (Recommended)**

```bash
# 9. Build production theme package
cd ghost/themes/format
npm run build:prod  # Creates format.zip

# 10. Upload via Ghost Admin
# → Navigate to https://justinmeader.com/ghost/#/settings/design
# → Click "Change theme" → Upload format.zip
# → Click "Activate"
```

**Option B: SSH/SFTP (Advanced)**

```bash
# 9. SCP theme to droplet
scp -r ghost/themes/format root@justinmeader.com-ghost:/var/www/ghost/content/themes/

# 10. SSH and restart Ghost
ssh root@justinmeader.com-ghost
cd /var/www/ghost
sudo chown -R ghost:ghost content/themes/format
sudo ghost restart
```

#### 2D. Post-Deployment Verification

```bash
# 11. Run smoke tests against production
BASE_URL=https://justinmeader.com npm test

# 12. Visual checks
# → Homepage loads
# → Navigation functional
# → Post pages render correctly
# → Mobile responsive
# → Dark mode toggle works

# 13. Browser console checks
# → No JavaScript errors
# → No 404s for assets
```

**Rollback:**

```bash
# Revert to previous theme version
ssh root@justinmeader.com-ghost
cd /var/www/ghost/content/themes
sudo tar -xzf format-backup-[timestamp].tar.gz
sudo chown -R ghost:ghost format
sudo ghost restart
```

---

### Path 3: Ghost Config Changes

**Scope:** `routes.yaml`, redirects, config.production.json

**Risk:** HIGH — can break routing/access

**Steps:**

```bash
# 1. Backup current config
ssh root@justinmeader.com-ghost
sudo cp /var/www/ghost/content/settings/routes.yaml /var/backups/ghost/routes-$(date +%Y%m%d).yaml

# 2. Upload new routes.yaml via Ghost Admin
# → Settings → Labs → Routes → Upload routes.yaml

# 3. Restart Ghost
sudo ghost restart

# 4. Verify routes
curl -I https://justinmeader.com/[custom-route]/
```

**Rollback:**

```bash
# Re-upload previous routes.yaml via Ghost Admin
# OR via SSH:
ssh root@justinmeader.com-ghost
sudo cp /var/backups/ghost/routes-[timestamp].yaml /var/www/ghost/content/settings/routes.yaml
sudo ghost restart
```

---

## Test & CI Gates

### Automated (GitHub Actions)

Triggered on: PRs to `main`, manual dispatch

**Tests:**
- Playwright smoke tests (homepage, navigation, post rendering)
- Visual regression (desktop 1440x1000, mobile iPhone 13)
- Test artifacts retained 30 days

**Manual trigger:**

```bash
gh workflow run playwright.yml --ref main
```

### Manual Pre-Deploy Tests

```bash
# Run full test suite locally
npm test

# Run with headed browser for debugging
npm run test:headed

# Update visual baselines (when intentional UI changes)
npm run test:update-snapshots
```

---

## Backup Checkpoints

### Automated Backups (Droplet)

**Location:** `/var/backups/ghost/`

**Schedule:**
- Daily: 2:00 AM ET (cron)
- Pre-deploy: Manual (`ghost backup`)

**Retention:** 30 days

**Verify backups exist:**

```bash
ssh root@justinmeader.com-ghost
ls -lth /var/backups/ghost/ | head -10
```

### Manual Backup

```bash
# Full Ghost backup (content + settings)
ssh root@justinmeader.com-ghost
sudo ghost backup --file "manual-$(date +%Y%m%d-%H%M%S).json"

# Download backup locally
scp root@justinmeader.com-ghost:/var/www/ghost/content/data/manual-*.json ~/backups/
```

### Restoration

```bash
# Restore from backup
ssh root@justinmeader.com-ghost
sudo ghost import /path/to/backup.json

# OR via Ghost Admin:
# → Settings → Labs → Import content → Upload JSON
```

---

## Deployment Verification Checklist

After ANY deployment, verify:

- [ ] Homepage loads (200 status)
- [ ] Post pages render correctly
- [ ] Navigation links functional
- [ ] RSS feed valid
- [ ] Search works
- [ ] Mobile responsive
- [ ] Dark mode toggle
- [ ] No JavaScript console errors
- [ ] No 404s in Network tab
- [ ] Ghost Admin accessible

**Quick verification script:**

```bash
#!/bin/bash
BASE="https://justinmeader.com"

echo "Checking homepage..."
curl -f -s -o /dev/null -w "%{http_code}\n" $BASE

echo "Checking RSS..."
curl -f -s -o /dev/null -w "%{http_code}\n" $BASE/rss/

echo "Checking sitemap..."
curl -f -s -o /dev/null -w "%{http_code}\n" $BASE/sitemap.xml

echo "Running Playwright smoke tests..."
npm test
```

---

## Incident Quick-Response

### Site Down / 502 Bad Gateway

```bash
# 1. Check Ghost service
ssh root@justinmeader.com-ghost
sudo systemctl status ghost_justinmeader-com

# 2. Check Ghost logs
sudo ghost log

# 3. Restart Ghost
sudo ghost restart

# 4. If restart fails, check Node.js
sudo systemctl status node

# 5. Check Nginx
sudo systemctl status nginx
sudo nginx -t
sudo systemctl restart nginx
```

### Theme Breaks Rendering

```bash
# 1. Revert to previous theme backup
ssh root@justinmeader.com-ghost
cd /var/www/ghost/content/themes
sudo tar -xzf format-backup-[latest].tar.gz
sudo chown -R ghost:ghost format
sudo ghost restart
```

### Content Accidentally Deleted

```bash
# 1. Restore from latest backup
ssh root@justinmeader.com-ghost
cd /var/backups/ghost
ls -lt | head -5  # Find latest backup

# 2. Import via Ghost Admin
# → Settings → Labs → Import content → Upload JSON

# 3. OR restore via CLI
sudo ghost import backup-[timestamp].json
```

### Database Corruption

```bash
# 1. Stop Ghost
ssh root@justinmeader.com-ghost
sudo ghost stop

# 2. Restore database from backup
sudo mysql -u ghost -p
DROP DATABASE ghost_production;
CREATE DATABASE ghost_production;
exit

mysql -u ghost -p ghost_production < /var/backups/mysql/ghost_production-[timestamp].sql

# 3. Start Ghost
sudo ghost start
```

### SSL Certificate Issues

```bash
# 1. Check certificate expiry
ssh root@justinmeader.com-ghost
sudo certbot certificates

# 2. Renew certificate
sudo certbot renew --force-renewal

# 3. Restart Nginx
sudo systemctl restart nginx
```

### Emergency Rollback (Full)

```bash
# 1. Stop Ghost
sudo ghost stop

# 2. Restore theme from backup
cd /var/www/ghost/content/themes
sudo tar -xzf format-backup-[pre-deploy-timestamp].tar.gz

# 3. Restore content from backup
sudo ghost import /var/backups/ghost/pre-deploy-[timestamp].json

# 4. Start Ghost
sudo ghost start

# 5. Verify
curl -I https://justinmeader.com
```

---

## Emergency Contacts

- **Droplet Console:** DigitalOcean dashboard → justinmeader.com-ghost → Access → Console
- **DNS:** Cloudflare (if applicable) or DigitalOcean DNS
- **Ghost Docs:** https://ghost.org/docs/

---

## Notes

- **Never deploy during peak traffic** (evenings/weekends)
- **Always test in staging first** (if staging environment exists)
- **Keep this runbook updated** as workflows change
- **Document all incidents** for future reference

---

**Version:** 1.0.0  
**Maintained by:** Pod 014 (Workshop Agent)  
**Repository:** https://github.com/justinmeader/justinmeader-dot-com
