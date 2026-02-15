# Metadata Baseline Draft (NOT APPLIED)

Status: Draft proposal only. No production changes made.

## Canonical basics

- Canonical domain: `https://justinmeader.com`
- Preferred URL style: trailing slash for pages (`/about/`)
- Force one canonical host (no mixed www/non-www in rendered canonicals)

## Proposed site-level metadata

### Site title
- `Justin Meader`

### Site description (options)
Choose one:
1. `Personal writing on systems, AI, games, guitar, and astrophotography from Maine.`
2. `Notes on systems thinking, AI, games, guitar, and life in Maine.`
3. `A personal blog by Justin Meader about systems, AI, games, guitar, and astrophotography.`

### Language / locale
- `en-US`

## Open Graph baseline

- `og:site_name`: `Justin Meader`
- `og:type`: `website` (homepage), `article` (posts)
- `og:title`: page/post title
- `og:description`: page/post description fallback to site description
- `og:url`: canonical URL
- `og:image`: placeholder required (see below)

### OG image placeholder policy
Until final branding:
- Use one stable image at a permanent URL (e.g. `/assets/og/default-og.jpg`)
- Recommended dimensions: `1200x630`
- Avoid frequent URL churn

## Twitter/X card baseline

- `twitter:card`: `summary_large_image`
- `twitter:title`, `twitter:description`, `twitter:image` mirror OG values
- `twitter:site`: `@<HANDLE_PLACEHOLDER>`
- `twitter:creator`: `@<HANDLE_PLACEHOLDER>`

## Social profile placeholders (to confirm)

- GitHub: `https://github.com/<USERNAME_PLACEHOLDER>`
- LinkedIn: `https://www.linkedin.com/in/<HANDLE_PLACEHOLDER>/`
- X: `https://x.com/<HANDLE_PLACEHOLDER>`
- YouTube (optional): `https://www.youtube.com/@<HANDLE_PLACEHOLDER>`

## Favicon/logo baseline

- Favicon: provide at least `favicon.ico` + PNG variants
- Logo: optional at launch; can defer to text mark if absent
- Keep dark/light compatibility in mind if using image logo

## Canonical and indexing conventions

- One canonical per page, always self-referential
- `noindex` for intentional utility pages only (if any)
- Avoid indexable empty/tag archives until route/content plan is finalized

## Minimum launch metadata checklist

- [ ] Final site description selected
- [ ] OG default image committed and referenced
- [ ] Confirmed social links added (no placeholders)
- [ ] Favicon present and served
- [ ] Canonical URLs verified on homepage + about + one post
- [ ] Social share preview spot-checked
