# PLAN: Shipwright Origins blog category

**Repo:** app-vitals/marketing-site
**Requested by:** Dan McAulay (2026-11-03)

## Problem
Dan's Shipwright origin series is filed under `Company Updates`. He wants it in its own bucket.

## Design
`category` is a single required enum in `src/content.config.ts`; it drives the badge color on `/blog` and `/blog/[id]` and the RSS `<category>`. There is no tag system and no filter UI on `/blog`. A new category is a one-value enum change plus a badge color; a tag field would need a new schema field and rendering with no consumer.

**Decision (Dan): category, not tag.** Dave's `accidental-devin-alternative` stays in Company Updates. No `/blog` filter UI.

Safe to deploy standalone: yes (additive enum value; posts retagged in the same PR so build stays green).

## Tasks
| ID | Title | Deps | Layer | Hours | Complexity | Model |
|----|-------|------|-------|-------|-----------|-------|
| SOC-1.1 | feat: add Shipwright Origins blog category | — | Frontend | 1 | 2 | haiku |

Scope: add enum value; add badge color in `blog/index.astro` and `blog/[id].astro`; retag `cloud-agent-review-origin`, `openclaw-todos-origin`, `vitals-os-merge-origin`, `task-store-origin`, `shipwright-loop-origin`, `shipwright-oss-origin`, `metrics-origin`, `hitl-origin`; update category list in `docs/content-writing/blog-post.md` and the Category convention line in `planning/shipwright-origin-series/PLAN.md`.

Tests: no new tests; `astro build` (CI) validates schema vs frontmatter.

HITL scan: no tasks require human steps.
