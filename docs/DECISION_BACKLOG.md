# Decision Backlog (Discovery)

Purpose: separate decisions that need Justin input from defaults Pod can apply safely.

| Decision | Why it matters | Owner | Default recommendation | Blocked by |
|---|---|---|---|---|
| Primary site positioning (personal blog vs mixed portfolio/blog) | Drives homepage hierarchy and nav | Justin | Keep personal-blog-first for launch | Final launch scope |
| Launch IA/nav set | Prevents broken links and confusion | Justin | Keep minimal nav: Home, About (add more later) | Route/content readiness |
| What to do with `/writings` and `/tags` paths | Currently unresolved; impacts UX and SEO crawl | Pod (proposal), Justin (approve) | Either implement or remove from surfaced nav until live | Ghost nav + route plan |
| About page depth (short bio vs full profile) | Affects tone and trust | Justin | Start with short version, iterate | Personal preference |
| Newsletter strategy (active now vs later) | Subscription UI text/flows depend on this | Justin | Keep form visible but conservative copy until strategy set | Email/list intent |
| Social link set (X, GitHub, LinkedIn, etc.) | Header/footer trust and metadata completeness | Justin | Add only confirmed active links | Canonical social handles |
| Site description final copy | Used in metadata + snippets | Justin | Use current safe default until approved rewrite | Voice/copy pass |
| OG image style (photo, logo, text card) | Impacts share previews | Justin | Temporary clean text-card OG | Visual direction |
| Logo/favicon direction | Needed for polish and brand consistency | Justin | Temporary neutral favicon, defer full branding | Visual assets |
| Theme customization boundary | Controls risk and maintenance burden | Pod (proposal), Justin (approve) | Keep low-diff from upstream format | Risk appetite |
| Publish workflow cadence | Ensures repeatable safe operations | Pod | Follow SAFE_DEPLOY_RUNBOOK operator mode | None |
| Pre-launch acceptance criteria | Avoids endless tweaks and ambiguous “done” | Justin + Pod | Define minimum shippable checklist | Priority alignment |

## Suggested order

1. Resolve nav/route truth (`/about`, `/writings`, `/tags`)  
2. Confirm launch scope + positioning  
3. Approve metadata baseline draft  
4. Decide social links + favicon/logo placeholder  
5. Freeze launch checklist
