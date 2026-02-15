# Decision Recommendations v1

Purpose: give default-safe choices now, clearly mark what still needs Justin approval.

## 1) Primary site positioning
- **Recommendation:** Personal-blog-first for launch.
- **Confidence:** High
- **Why safe now:** Matches current hero copy and existing Ghost setup.
- **Justin decision required?** Yes
- **Choose one:**
  - A) Personal blog first (recommended)
  - B) Mixed personal + portfolio now

## 2) Launch IA / nav set
- **Recommendation:** Keep nav minimal: Home, About only.
- **Confidence:** High
- **Why safe now:** Reduces broken-route risk while content map is still evolving.
- **Justin decision required?** Yes
- **Choose one:**
  - A) Home + About only (recommended)
  - B) Add Writings now and implement route immediately

## 3) `/writings` and `/tags` unresolved routes
- **Recommendation:** Remove from surfaced nav until implemented and tested.
- **Confidence:** High
- **Why safe now:** Both currently return 404 in live checks.
- **Justin decision required?** Yes
- **Choose one:**
  - A) Hide now, implement later (recommended)
  - B) Implement this sprint, then expose

## 4) About page depth
- **Recommendation:** Short about v1, expand later.
- **Confidence:** High
- **Why safe now:** Faster launch; lower copy risk.
- **Justin decision required?** Yes
- **Choose one:**
  - A) Short about v1 (recommended)
  - B) Full long-form profile now

## 5) Newsletter strategy
- **Recommendation:** Keep form present, tone down promise-heavy copy.
- **Confidence:** Medium
- **Why safe now:** Preserves optional growth path without overcommitting.
- **Justin decision required?** Yes
- **Choose one:**
  - A) Keep visible with conservative copy (recommended)
  - B) Temporarily disable until strategy finalized

## 6) Social links
- **Recommendation:** Publish only confirmed active profiles.
- **Confidence:** High
- **Why safe now:** Avoids dead links and trust erosion.
- **Justin decision required?** Yes
- **Choose one:**
  - A) GitHub-only to start
  - B) GitHub + X
  - C) GitHub + X + LinkedIn

## 7) Site description final copy
- **Recommendation:** Keep current baseline until explicit approval.
- **Confidence:** High
- **Why safe now:** Already coherent and aligned with current site.
- **Justin decision required?** Yes
- **Choose one:**
  - A) Keep current for launch (recommended)
  - B) Replace with new draft now

## 8) OG image style
- **Recommendation:** Temporary clean text-card OG image.
- **Confidence:** Medium
- **Why safe now:** Fast, reusable, no brand lock-in.
- **Justin decision required?** Yes
- **Choose one:**
  - A) Text-card placeholder now (recommended)
  - B) Personal photo OG now
  - C) Wait for full visual system

## 9) Logo / favicon direction
- **Recommendation:** Neutral favicon now, full logo later.
- **Confidence:** High
- **Why safe now:** Meets baseline polish without forcing identity decisions.
- **Justin decision required?** Yes
- **Choose one:**
  - A) Neutral favicon now (recommended)
  - B) Immediate custom icon/logo pass

## 10) Theme customization boundary
- **Recommendation:** Keep low-diff from upstream Format.
- **Confidence:** High
- **Why safe now:** Lower maintenance burden and easier rollback.
- **Justin decision required?** Yes
- **Choose one:**
  - A) Low-diff policy (recommended)
  - B) Heavy customization now

## 11) Publish workflow cadence
- **Recommendation:** Use SAFE_DEPLOY_RUNBOOK Operator Mode as default.
- **Confidence:** High
- **Why safe now:** Already documented and proven against CI.
- **Justin decision required?** No

## 12) Pre-launch acceptance criteria
- **Recommendation:** Freeze a minimum shippable checklist and launch against that.
- **Confidence:** High
- **Why safe now:** Prevents endless polishing loop.
- **Justin decision required?** Yes
- **Choose one:**
  - A) Minimal launch checklist (recommended)
  - B) Delay launch until full design system

---

## Approve / Edit Checklist

- [ ] Approve site positioning choice
- [ ] Approve launch nav set
- [ ] Confirm handling of `/writings` and `/tags`
- [ ] Approve About page depth for v1
- [ ] Decide newsletter visibility strategy
- [ ] Confirm social links to publish
- [ ] Approve site description for launch
- [ ] Approve OG image placeholder approach
- [ ] Approve favicon now / logo later path
- [ ] Approve low-diff theme policy
- [ ] Approve pre-launch acceptance criteria
