# PLAN — Harness-page striking-distance SEO optimization

**Repo:** app-vitals/marketing-site · **Session:** seo-harness-page
**Spec:** `planning/seo-harness-page/PRODUCT-SPEC.md`
**Author:** Saul (marketing) · **Date:** 2026-08-26
**Change class:** identical to merged winning PR #84. On-page edits + minor blog-schema plumbing. Single PR.

## Technical Design

No test framework in this repo — `npm run build` (astro build) is the verification gate; it validates
the content-collection schema and fails on invalid frontmatter or broken JSON-LD generation.

### Rendering pipeline (grounded)
- Blog posts are a Markdown content collection (`src/content/blog/**/*.md`), loaded via `glob` in
  `src/content.config.ts`; schema is a strict `z.object` → a new `faq` frontmatter field must be added
  there (optional) or the build fails.
- Posts render through `src/pages/blog/[id].astro` → `BaseLayout`. `[id].astro` already builds a
  `blogPostingSchema` and passes it via `extraSchema`. `BaseLayout.extraSchema` is typed
  `Record<string,unknown> | Record<string,unknown>[]` and rendered as an array (line 83) — so a second
  `FAQPage` schema can be passed with zero layout changes.
- The closing CTA ("Want to accelerate your engineering team?" → `/contact/`) lives in `[id].astro` and
  is shared by ALL posts → Feature 3 must NOT touch it; the design-partners link is added inline in the
  harness post body only.
- FAQ implementation mirrors the merged PR #84 shape in `src/pages/products/shipwright.astro`
  (`faqSchema` object: `@type: FAQPage` → `mainEntity[]` of `Question` → `acceptedAnswer.text`).

### Layer: Frontend / Content (single bundle, one PR)
- **Answer block + FAQPage** — add H2 answer block to the harness `.md`; add optional `faq` array to the
  blog schema in `content.config.ts`; add `faq` frontmatter to the harness post; build `FAQPage` in
  `[id].astro` and pass `[blogPostingSchema, faqSchema]` through `extraSchema` when `post.data.faq` exists.
- **Reciprocal internal links** — one contextual link to `/blog/harness-is-all-you-need/` from each of the
  5 ranking/authority pages (2 `.astro` inline `<a>`, 3 `.md` markdown links).
- **Canonical CTA** — inline `/shipwright/design-partners/` link in the harness post body.
- **Phrase reinforcement** — exact "the right harness is all you need" once (satisfied by the answer-block H2).

### Complexity / risk
- 8 files, cross-layer (content + rendering pipeline + collection schema), introduces a small reusable
  optional `faq` frontmatter pattern. Complexity 4 → sonnet.
- Only genuine risk: the `faq` schema addition must remain **optional** so the ~dozen existing posts with no
  `faq` frontmatter still build and still emit only `BlogPosting` schema. Acceptance criteria cover this
  regression explicitly. Everything else is additive (new links, new answer block) — safe to deploy standalone.

### Testing strategy
| Feature | Layer | Rationale |
|---|---|---|
| all | build/smoke | Static-site content + schema plumbing. Gate = clean `npm run build`, valid FAQPage JSON-LD structure, and no schema regression on `faq`-less posts. No unit/integration logic exists to test. |

## Task Breakdown

Single self-contained task on one branch → one PR (mirrors PR #84).

| Task | Title | Layer | Deps | Cx | Model | HITL |
|---|---|---|---|---|---|---|
| HRN-1.1 | Harness-page striking-distance SEO: answer block + FAQPage, reciprocal links, canonical CTA | Frontend | — | 4 | sonnet | — |

**Safe to deploy standalone: yes** (all additions; the only schema change is an *optional* new field).

## Dependency Map

```
[START]
  └─ HRN-1.1: harness-page SEO (no deps)
```

| Task | Depends on | Blocks | HITL |
|---|---|---|---|
| HRN-1.1 | — | — | |

HITL scan: no tasks require human steps.
