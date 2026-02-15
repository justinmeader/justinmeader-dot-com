# justinmeader.com Production Baseline (2026-02-14)

## Infrastructure
- Host: DigitalOcean droplet `justinmeader.com-ghost`
- OS: Ubuntu 22.04 LTS
- Kernel: 5.15.0-170-generic
- Nginx: active
- MySQL: active

## Runtime Versions
- Ghost: 6.19.0
- Ghost-CLI: 1.27.0
- Node.js: v22.22.0
- npm: 10.9.4

## Theme
- Active theme: `format`
- Theme source snapshot: `ghost/themes/format/`
- Compatibility scan: `gscan --v6` passes (no warnings)

## Backup State
- Backups are stored off-repo (droplet + workbench)
- Do **not** commit DB dumps or sensitive exports to git

## Notes
- This repository is the canonical source for site/theme versioning going forward.
