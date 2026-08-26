# PRODUCT-SPEC — Harness-page striking-distance SEO optimization

**Repo:** app-vitals/marketing-site
**Author:** Saul (marketing) · **Date:** 2026-08-26
**Source review (full rationale + evidence):** `drafts/striking-distance-seo-review-2026-08-26.md` (agent workspace)
**Deploy gate:** CLEARED by Dave on 2026-08-26. Site auto-deploys on merge to `main` (verified: PRs #115/#116 live within minutes of merge). This spec covers authoring + PR; merge is the final human action.
**Change class:** identical to the merged winning PR #84 (`shipwright ai` pos 9→1). On-page edits only.

## Problem Statement

`/blog/harness-is-all-you-need/` is App Vitals' **single highest-impression AND highest-click asset**: a
harness-phrase query cluster lands on it earning ~49 impressions / 30d at position 3–7 — ~2.5× the
impressions of our confirmed #1-ranked query (`shipwright ai`, 19 imp) — yet it converts almost none of it
(2 clicks / 30d). It's the textbook striking-distance setup PR #84 exploited: a page ranking
bottom-of-page-1 for a real, question-shaped query, one on-page push from the click zone. Three concrete
gaps (all levers the winning PRs already proved) are fixable in a single small PR.
Evidence: GSC 30d aggregated `metadata.topQueries` off `clicks:app-vitals.com`, pulled 2026-08-26.

| Query | Imp (30d) | Clicks | Best pos |
|---|---|---|---|
| the right harness is all you need | 42 | 2 | 4.6 |
| the harness is all you need | 3 | 0 | 3 |
| harness is all you need | 2 | 0 | 7 |
| the harness is all you need (mostly) | 2 | 0 | 6 |
| **cluster total** | **~49** | **2** | **3–7** |

## Users & Context

Engineers / engineering leaders searching the "harness is all you need" argument (GitHub's Burke Holland
framing). High-intent, top-of-consideration readers evaluating whether a thin harness layer is enough —
exactly the audience for Shipwright's plan→queue→loop pitch. Bottom-of-page-1 CTR dead zone is the only
thing between us and their clicks.

## Scope — on-page edits across the harness post + 5 linking pages + blog schema plumbing

### Feature 1 — "Is the harness really all you need?" answer block + FAQPage JSON-LD
**Files:**
- `src/content/blog/harness-is-all-you-need.md` (answer block prose + `faq` frontmatter)
- `src/content.config.ts` (add optional `faq` field to the blog collection schema)
- `src/pages/blog/[id].astro` (build `FAQPage` schema from `post.data.faq`, pass through `extraSchema`)

The page ranks **pos 4.6** for the question-shaped query `the right harness is all you need` but has no
answer block and no `FAQPage` schema. PR #84's decisive move on `/products/shipwright` was exactly a
definitional answer block + `FAQPage` JSON-LD, which correlated with the pos 4→1 win. This is the
highest-confidence single fix and it is also **reusable** — wiring `faq` into the blog pipeline lets any
future post opt in.

**Change:**
- (a) Add a concise answer block near the top of the post body: an H2 phrased as the query (e.g.
  **"Is the harness really all you need?"**) followed by a direct 2–3 sentence plain-text answer.
- (b) Add an optional `faq` array to the blog collection schema in `src/content.config.ts`:
  `faq: z.array(z.object({ question: z.string(), answer: z.string() })).optional()`.
- (c) Add a `faq` frontmatter array (2–3 Q&As) to the harness post, drawn **verbatim** from the answer
  block copy.
- (d) In `src/pages/blog/[id].astro`, when `post.data.faq` is present, build a `FAQPage` JSON-LD object
  and pass it alongside `blogPostingSchema` via the already-array-capable `extraSchema` prop
  (`extraSchema={post.data.faq ? [blogPostingSchema, faqSchema] : blogPostingSchema}`). `BaseLayout`
  already renders `extraSchema` as an array (line 83) — no layout change needed.

**Constraint:** every FAQ answer must be drawn **only from claims already in the post** — no new claims,
no new numbers (Voice §6). Answers copied verbatim from the on-page answer block.
- [ ] A visible answer block (H2 + 2–3 sentence answer) exists near the top of the harness post
- [ ] `src/content.config.ts` blog schema accepts an optional `faq` array; existing posts without it still build
- [ ] A valid `FAQPage` JSON-LD block with 2–3 Q&A pairs renders on `/blog/harness-is-all-you-need/` and validates (Google Rich Results structure)
- [ ] Every FAQ answer is supported by existing on-page copy; no fabricated claims/stats
- [ ] Other blog posts (no `faq` frontmatter) still render with only `BlogPosting` schema — no regression
- [ ] Site builds cleanly (`npm run build` / astro check passes)

### Feature 2 — Reciprocal internal links from 5 ranking/authority pages → harness post
**Files:**
- `src/pages/products/shipwright.astro`
- `src/content/blog/shipwright-vs-devin.md`
- `src/content/blog/shipwright-vs-claude-code-slack.md`
- `src/content/blog/shipwright-vs-claude-code-orchestrators.md`
- `src/pages/shipwright/design-partners.astro`

Our single highest-impression asset is a near authority-orphan — **zero** of the five ranking/authority
pages link to it (the PR #87 failure mode, on our biggest-traffic page). Add one contextual inbound link
to `/blog/harness-is-all-you-need/` from each, funnelling existing page authority into the #1 impression
earner. Cheapest lever, shortest payback.

**Change:** add one contextual internal link to `/blog/harness-is-all-you-need/` in each page's body with
natural anchor text (e.g. "the harness-is-all-you-need argument"). Markdown link syntax in the `.md`
posts; inline `<a href>` matching existing markup in the `.astro` pages. Contextual within existing prose,
not appended as a bare list item.
- [ ] Each of the 5 files contains exactly one internal link to `/blog/harness-is-all-you-need/` with descriptive, contextual anchor text
- [ ] Anchor text is natural (not "click here") and sits inside existing prose
- [ ] No other content on those pages is altered; all 5 build cleanly

### Feature 3 — Canonical CTA to /shipwright/design-partners/ in the harness post
**File:** `src/content/blog/harness-is-all-you-need.md`
The post's warmest, highest-traffic traffic currently flows only to the shared template CTA (`/contact/`,
rendered by `src/pages/blog/[id].astro` for all posts) and an inline proof-dashboard link — never to
`/shipwright/design-partners/`, the canonical CTA every high-intent page is supposed to feed (H-CONV-1
invariant).

**Change:** add a `/shipwright/design-partners/` link **inline in the harness post body** (natural fit:
the closing paragraph, e.g. "try it as a low-risk trial → [become a design partner](/shipwright/design-partners/)").
Keep the existing shared template CTA and the proof-dashboard link untouched — this is additive and
post-scoped, so it does NOT modify the shared `[id].astro` CTA that every other post uses.
- [ ] The harness post body contains an internal link to `/shipwright/design-partners/` with natural anchor text
- [ ] The shared blog CTA in `[id].astro` and the existing proof-dashboard link are unchanged
- [ ] Post builds cleanly

### Feature 4 — Exact phrase-variant reinforcement (light)
**File:** `src/content/blog/harness-is-all-you-need.md`
The 42-impression variant is the exact string `the right harness is all you need`. Ensure the page carries
that exact phrasing once for a tighter exact-match signal — no stuffing.

**Change:** ensure the exact query "the right harness is all you need" appears **once** in either the new
answer-block H2 (Feature 1) or a single H2/sentence. If Feature 1's answer block already contains it
naturally, this feature is satisfied by that and requires no additional edit.
- [ ] The exact phrase "the right harness is all you need" appears exactly once on the page (in an H2 or the answer block), reading naturally
- [ ] No keyword stuffing; no other copy altered for this feature

## Technical Constraints

- Astro site: `.astro` pages + Markdown content collection (`src/content/blog/**/*.md`, loaded via `glob`).
- Blog posts render through `src/pages/blog/[id].astro` → `BaseLayout` (`extraSchema` prop already accepts `Record | Record[]`, rendered as array — line 83).
- The shared blog CTA lives in `[id].astro` and is common to ALL posts — Feature 3 must NOT edit it; the design-partners link is added inline in the harness post body only.
- The blog collection schema in `src/content.config.ts` is strict (`z.object`) — a new `faq` field must be added there (optional) or frontmatter validation fails the build.
- Match existing markup conventions/classes; no layout/animation restructure, no dependency changes, no new pages, no routing changes.

## Out of Scope

- Any **new** pages.
- Any change to `shipwrightharness.com` (separate repo/domain).
- Any copy rewrite beyond the edits above (the post's argument/body copy stays as-is apart from the added answer block, CTA link, and phrase check).
- Changing the shared blog-template CTA in `[id].astro` (Feature 3 is post-scoped and additive).
- North-star / experiment registration in growth — tracked separately by Saul.

## Priorities & Sequence

All features ship in a **single small PR**. Feature 1 (answer block + FAQPage) is the highest-value and
the only one touching the rendering pipeline; Feature 4 is likely satisfied *by* Feature 1's answer block.
Features 2 and 3 are independent content edits. No inter-dependencies beyond Feature 4 leaning on Feature 1.

## Resolved Decisions

- **One PR, not five.** Changes are small and topically unified (one striking-distance push) — single review, lower overhead. (Saul, mirrors PR #84.)
- **FAQ wired through frontmatter + `[id].astro`, not hardcoded HTML in markdown.** Reusable for future posts, keeps schema generation in one typed place, leverages the existing array-capable `extraSchema`. Alternative (raw `<script>` in markdown) is more fragile and non-reusable. (Saul, default — engineering may adjust the injection point at implementation if a cleaner Astro idiom exists.)
- **FAQ answers sourced only from existing post copy.** No new claims/stats (Voice §6; avoids re-verification). (Saul.)
- **Feature 3 CTA added inline in the post body, not via the shared template.** Post-scoped, avoids changing every other blog post's CTA. (Saul, default.)
- **Deploy is auto-on-merge; merge is the gated action.** Dave cleared the gate 2026-08-26. PR is prepared; a human (Dave/Dan) or the deploy path performs the merge that ships it. (Policy: externally-visible action → merge is the approval point.)

## Success Criteria

- **Technical:** all acceptance criteria met; `marketing-site` builds cleanly; FAQPage JSON-LD validates; other blog posts show no schema regression; PR opened against `main`, CI green.
- **Outcome (post-deploy, tracked separately — review ~2026-09-16):** within 2–4 weeks the harness-phrase cluster moves into pos ≤3 AND/OR logs its first multi-click week (≥3 clicks / 7d) off the ~2-clicks-per-30-days floor. Leading indicator: FAQ rich result appearing + position shift off 4.6. Watched in `clicks:app-vitals.com` topQueries metadata.

## Testing Strategy

| Feature | Layer | Rationale |
|---|---|---|
| 1 | build/smoke | Static-site content + schema plumbing — meaningful checks are a clean Astro build, valid FAQPage JSON-LD structure, and no schema regression on other posts. Optional: assert `faq`-less posts still render. |
| 2–4 | build/smoke | Pure content edits (internal links, CTA link, phrase check) — the check is a clean build and the presence of the specified links/phrases. No unit/integration logic involved. |
