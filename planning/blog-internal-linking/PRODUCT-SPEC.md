# PRODUCT-SPEC: Blog Internal-Linking SEO Remediation

**Repo:** app-vitals/marketing-site
**Toolchain:** Node.js / Astro (static site), npm. Content lives in `src/content/blog/*.md` (51 markdown posts with YAML frontmatter).
**Type:** Content editing only — adding contextual markdown links inside existing posts. No new pages, no component/layout/code changes.

---

## Problem Statement

app-vitals.com has near-zero organic search traffic. A technical SEO + GSC audit found the site is technically sound (sitemaps, robots.txt, canonicals all clean) but Google has indexed almost nothing beyond the homepage. Root cause is low crawl-priority and low domain authority. Internal links are the primary mechanism Google uses to discover and rank deep pages when authority is low. The blog has 51 posts averaging 3.9 internal links each, but a link-graph analysis surfaced three structural gaps that leave high-value pages undiscoverable and send zero authority to revenue pages.

## Users & Context

- **Primary beneficiary:** organic search visitors who currently never reach app-vitals.com's blog, services, or product pages because Google hasn't indexed them.
- **Business owner:** App Vitals (Dan/Dave) — consulting is the revenue engine; `/services/` is the money-page. Products (Shipwright) are strategic.
- The content already exists — this is not a content-creation task. It's making the existing 51-post library discoverable and routing its authority to the pages that matter.

## Technical Constraints

- **Markdown body edits only** to files under `src/content/blog/*.md`. No changes to layouts, components, Astro config, or new pages.
- **Trailing-slash URL form** for all internal links (e.g. `/blog/the-ai-adoption-ladder/`, `/services/`, `/products/shipwright/`) to match the site's existing canonical convention.
- **Editorially natural placement** — every link must sit in relevant body prose with descriptive anchor text. No "Related posts" footer blocks, no link dumps.
- **No over-linking** — max ~2–3 new links added per source post; each must be genuinely relevant to its surrounding paragraph.
- Conventional Commits; feature branch + squash-merge PR; never commit to main (per repo CLAUDE.md).
- Content rules (repo CLAUDE.md): no client names, no pricing/rates, no email-capture forms.

## Out of Scope

- The shipwrightharness.com site (separate repo; separate effort).
- Creating any new blog posts or pages.
- Component, layout, styling, or Astro config changes.
- Automated "related posts" widgets or any programmatic link injection — this is hand-placed editorial linking.
- External backlink acquisition (tracked separately).

---

## Feature 1 — Fix 18 orphan posts (add inbound internal links)

Each orphan post currently has zero inbound internal links, making it hard for Google to discover. Add contextually natural links **from** the identified related source posts **to** each orphan target. Each source→target link must be placed in a paragraph where the target is genuinely relevant, with descriptive anchor text.

**Source → target map** (target is the orphan needing inbound links):

| Orphan target (needs inbound) | Add links from these source posts |
|---|---|
| `85-prs-a-week` | autonomous-coding-pipeline, building-a-system-to-build-code, two-engineers-output-of-twenty |
| `accidental-devin-alternative` | shipwright-vs-devin, shipwright-autonomous-dev-pipeline, choosing-not-to-10x |
| `ai-coding-assistant-vs-agent` | ai-fancy-autocomplete, context-problem, code-next-abstraction-layer |
| `ai-tools-ci-pipeline-overload` | ci-pipeline-bottleneck, ai-pr-review-bottleneck, code-review-bottleneck |
| `anthropic-ended-ai-free-ride` | choosing-not-to-10x, licenses-without-lift, measure-ai-adoption-roi |
| `choosing-not-to-10x` | anthropic-ended-ai-free-ride, licenses-without-lift |
| `dora-metrics-ai-era` | measure-ai-adoption-roi, velocity-engineering-playbook, ai-velocity-assessment |
| `entrepreneurs-vs-engineers` | notepad-to-claude, engineering-ai-resistance, one-tool-for-everyone |
| `google-meet-epiphany` | this-week-in-claude-code-ep002, 85-prs-a-week, we-code-autonomously |
| `how-to-roll-out-claude-code` | why-tool-rollouts-fail, ai-champion-playbook, licenses-without-lift, pick-one-project-crush-it |
| `natural-language-data-queries` | one-tool-for-everyone |
| `no-one-is-paying-you-to-code-anymore` | your-engineering-career-was-never-safe, where-do-senior-engineers-come-from, code-next-abstraction-layer |
| `notepad-to-claude` | entrepreneurs-vs-engineers, one-tool-for-everyone |
| `one-tool-for-everyone` | notepad-to-claude, entrepreneurs-vs-engineers, natural-language-data-queries |
| `shipwright-vs-devin` (HIGH VALUE — commercial intent) | accidental-devin-alternative, shipwright-autonomous-dev-pipeline, choosing-not-to-10x, 85-prs-a-week |
| `the-ai-adoption-ladder` (HIGH VALUE — flagship) | ai-velocity-assessment, why-ai-adoption-fails, measure-ai-adoption-roi, enterprise-ai-adoption-mistakes |
| `this-week-in-claude-code-ep002` | google-meet-epiphany, one-tool-for-everyone |
| `who-leads-ai-transformation` | let-builders-build, what-boards-ask-about-ai, the-three-month-bet, engineering-ai-resistance |

**Source Map:** all files listed above under `src/content/blog/{slug}.md`.

**Acceptance criteria:**
- [ ] All 18 orphan posts have ≥1 inbound internal link from another blog post after the change.
- [ ] Each added link uses descriptive anchor text in relevant prose (not "click here", not a link list).
- [ ] Each source post gains at most ~2–3 new links total across all features.
- [ ] All link targets use trailing-slash `/blog/{slug}/` form and resolve to real post slugs.

## Feature 2 — Route authority to `/services/` (consulting money-page)

Zero of 51 posts currently link to `/services/`. Add one contextual `/services/` link from each of the following consulting-oriented posts — a natural in-body mention or soft CTA where the reader would plausibly want to know App Vitals offers hands-on help. Not a hard sell, not a repeated footer CTA.

**Posts to add a `/services/` link from:** how-to-roll-out-claude-code, the-ai-adoption-ladder, ai-velocity-assessment, why-tool-rollouts-fail, enterprise-ai-adoption-mistakes, why-ai-adoption-fails, who-leads-ai-transformation, what-boards-ask-about-ai, pick-one-project-crush-it, measure-ai-adoption-roi, ai-champion-playbook (11 posts).

**Source Map:** `src/content/blog/{slug}.md` for each of the 11 slugs above.

**Acceptance criteria:**
- [ ] ≥11 posts contain a contextual link to `/services/`.
- [ ] Each `/services/` link reads as a natural mention/CTA in relevant prose, not a boilerplate footer.
- [ ] Link uses `/services/` trailing-slash form.

## Feature 3 — Route authority to `/products/shipwright/`

Zero of 51 posts currently link to any `/products/` page. Add one contextual `/products/shipwright/` link from each of the following Shipwright-oriented posts, placed where Shipwright is already being discussed.

**Posts to add a `/products/shipwright/` link from:** shipwright-vs-devin, accidental-devin-alternative, shipwright-autonomous-dev-pipeline, choosing-not-to-10x, 85-prs-a-week, autonomous-coding-pipeline, building-a-system-to-build-code, we-code-autonomously (8 posts).

**Source Map:** `src/content/blog/{slug}.md` for each of the 8 slugs above.

**Acceptance criteria:**
- [ ] ≥8 posts contain a contextual link to `/products/shipwright/`.
- [ ] Each link is placed where Shipwright is already the subject of the surrounding prose.
- [ ] Link uses `/products/shipwright/` trailing-slash form.

## Feature 4 — Resolve the 4 dead-end posts (verification)

Four posts currently have zero outbound internal links: `natural-language-data-queries`, `no-one-is-paying-you-to-code-anymore`, `shipwright-vs-devin`, `the-ai-adoption-ladder`. These are resolved as a side effect of Features 1–3 (each receives outbound links via the source→target map and/or the /services and /products additions). This feature is a verification gate, not separate edits.

**Acceptance criteria:**
- [ ] All 4 dead-end posts have ≥1 outbound internal link after Features 1–3 are applied.

---

## Priorities & Sequence

1. **Feature 1** (orphans) — highest SEO impact; unblocks discovery of 18 pages. Prioritize the two HIGH VALUE targets (`the-ai-adoption-ladder`, `shipwright-vs-devin`) within it.
2. **Feature 2** (`/services/`) — highest business impact; routes authority to the revenue page.
3. **Feature 3** (`/products/shipwright/`) — strategic product authority.
4. **Feature 4** — verification only; runs after 1–3.

All four can ship in a single PR since they edit an overlapping set of markdown files; sequencing above is for author focus, not separate deliveries.

## Resolved Decisions

- **Link count per source post:** capped at ~2–3 new links total per post (default chosen to avoid over-optimization / spammy internal linking; can be revisited). A handful of hub posts (e.g. one-tool-for-everyone, choosing-not-to-10x) appear as sources for multiple targets — that's acceptable as long as each individual post stays within the cap and every link is contextually justified.
- **Anchor text:** descriptive and varied (no exact-match keyword stuffing), matching the site's existing editorial link style.
- **Placement style:** inline prose links only. Decision: no "Related reading" widget/footer — keeps it editorial and within scope (no component changes).
- **Single PR:** all four features land in one PR given the overlapping file set.

## Testing Strategy

| Feature | Layer | Rationale |
|---|---|---|
| 1–4 | Content verification (build + link-graph check) | No runtime logic. Verify via `npm run build` (Astro build succeeds, no broken internal refs) plus a link-graph re-run confirming 0 orphans / 0 dead-ends and the /services + /products counts. |

- [ ] `npm run build` passes (no broken links, site builds clean).
- [ ] A link-graph check confirms: 0 orphan posts, 0 dead-end posts, ≥11 posts → `/services/`, ≥8 posts → `/products/shipwright/`.
- [ ] Spot-check a random sample of ~6 edited posts to confirm links read naturally in context.

## Success Criteria

- Every one of the 51 posts is reachable via at least one internal link (no orphans).
- The consulting money-page (`/services/`) and the Shipwright product page receive internal authority from the content library where none existed before.
- Downstream (post-deploy, measured over weeks in GSC): improved index coverage of blog URLs and non-homepage pages. This is the leading indicator the change is working; it is not gate-able in the PR itself.
