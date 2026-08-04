# PRODUCT-SPEC — Striking-distance on-page SEO fixes

**Repo:** app-vitals/marketing-site
**Author:** Saul (marketing) · **Date:** 2026-08-04
**Source review (full rationale + evidence):** `drafts/striking-distance-seo-review-2026-08-04.md` (agent workspace)
**Deploy gate:** publishing to the live site is human-gated (Dave/Dan). This spec covers authoring + PR only.

## Problem Statement

App Vitals pages already rank in **striking distance (Google position 4–10)** for high-intent
Devin-evaluation queries — `devin open source alternative` (pos 10), `what is shipwright` (pos 4),
`shipwright ai` (pos 9–10, recurring), `devin harness` (pos 9). We earn **0 clicks** not because we
don't rank, but because we sit in the bottom-of-page-1 CTR dead zone. A small set of on-page fixes
on the two pages already surfacing for these queries is the shortest path to our first organic clicks.
Evidence: GSC MetricSnapshots, last 30d, pulled 2026-08-04.

## Users & Context

Engineers / engineering leaders searching evaluation queries for autonomous-coding / Devin-alternative
tools. Bottom-of-funnel intent (already comparing tools) — the most convertible search traffic.

## Scope — 5 on-page edits across 2 existing files

### Feature 1 — Product page H1 includes the product name
**File:** `src/pages/products/shipwright.astro`
Current H1: *"The open source alternative to Devin."* (omits "Shipwright"). Page ranks pos 4 for
`what is shipwright` and pos 9–10 for `shipwright ai` — the H1 matches neither.
**Change:** H1 → **"Shipwright: the open-source alternative to Devin"**. One line, satisfies all three
query clusters, no keyword stuffing.
- [ ] H1 text contains both "Shipwright" and "alternative to Devin"
- [ ] Only the H1 text changes; surrounding markup/classes/animation unchanged
- [ ] Page builds (`npm run build` / astro check passes)

### Feature 2 — "What is Shipwright?" answer block + FAQPage JSON-LD
**File:** `src/pages/products/shipwright.astro`
Page ranks **pos 4** for the definitional query `what is shipwright` — a featured-snippet-eligible query.
**Change:** (a) add a concise "What is Shipwright?" answer paragraph (~40–55 words, direct definition)
near the top of the page body; (b) add a `FAQPage` JSON-LD `<script type="application/ld+json">` block
with 3–4 Q&As: *What is Shipwright? / Is Shipwright a Devin alternative? / Is it really free and open
source? / Does it work with Claude Code?*
**Constraint:** every answer must be drawn **only from claims already on the page** — no new claims, no
new numbers (Voice §6). The "build your own" DIY flow must NOT be claimed as shipped (strategy §7 pillar 2).
- [ ] A visible "What is Shipwright?" answer paragraph exists near the top of the page
- [ ] A valid FAQPage JSON-LD block with 3–4 Q&A pairs is present and validates (Google Rich Results test structure)
- [ ] Every FAQ answer is supported by existing on-page copy; no fabricated claims/stats
- [ ] Page builds cleanly

### Feature 3 — Internal link from product page → vs-devin blog
**File:** `src/pages/products/shipwright.astro`
The page's only comparison link points cross-domain to `shipwrightharness.com/vs/devin` (which ranks
pos 73). The on-domain `/blog/shipwright-vs-devin/` (ranks **pos 9** for `devin harness`) isn't linked.
**Change:** add an in-body internal link to `/blog/shipwright-vs-devin/` with descriptive anchor text
(e.g. "see the full Shipwright vs. Devin comparison"). Existing harness link may stay.
- [ ] An internal `<a href="/blog/shipwright-vs-devin/">` with descriptive anchor exists in the page body
- [ ] Anchor text is descriptive (not "click here"), contains "Shipwright" and/or "Devin"

### Feature 4 — Reciprocal internal link from vs-devin blog → product page
**File:** `src/content/blog/shipwright-vs-devin.md`
The blog links to `/products/shipwright` **0 times**. The two strongest assets on this cluster don't
reinforce each other.
**Change:** add one contextual internal link to `/products/shipwright/` (natural fit: the "How to Choose"
section — e.g. "you can [try Shipwright yourself](/products/shipwright/)").
- [ ] Blog body contains at least one `[...](/products/shipwright/)` internal link with natural anchor text
- [ ] Link is contextual within existing prose, not appended as a bare list item

### Feature 5 — Surface the term "harness" in the vs-devin blog structure
**File:** `src/content/blog/shipwright-vs-devin.md`
Ranks pos 9 for `devin harness` on body mentions alone.
**Change:** surface "harness" in an H2 or the frontmatter `excerpt` (e.g. an H2 like "Shipwright is a
harness on Claude Code, not a black box"). Factual — it's literally what Shipwright is (§7). No fabrication.
- [ ] The word "harness" appears in at least one H2 heading or the frontmatter excerpt
- [ ] Change is editorial only; no claims altered

## Technical Constraints

- Astro site (`.astro` pages + markdown content collections). JSON-LD via inline `<script type="application/ld+json">`.
- Match existing markup conventions/classes in `shipwright.astro`; do not restructure layout or animation.
- No dependency changes, no new pages, no routing changes.

## Out of Scope

- Any **new** pages (the `/vs/claude-code-slack` page and other comparison drafts are separate specs).
- Any change to `shipwrightharness.com` (separate repo/domain).
- Any copy rewrite beyond the five edits above.
- **Deployment / going live** — human-gated (Dave/Dan). PR is prepared and left for approval.

## Priorities & Sequence

All five ship in a **single small PR**. No inter-dependencies; order within the PR is irrelevant.
Highest individual value: Features 1 + 2 (the pos-4 / pos-9–10 product page).

## Resolved Decisions

- **One PR, not five.** Changes are tiny and topically unified — a single review is faster and lower-overhead. (Saul, default.)
- **FAQ answers sourced only from existing copy.** No new claims/stats permitted (Voice §6; avoids re-verification burden). (Saul.)
- **Keep the existing cross-domain harness link.** Additive internal link, not a replacement — avoids touching unrelated CTA behavior. (Saul, default; Dave/Dan may override at review.)
- **Deploy remains gated.** PR is prepared but not merged/deployed until Dave or Dan approves. (Policy: externally-visible action.)

## Success Criteria

- **Technical:** all 5 acceptance criteria met; `marketing-site` builds cleanly; PR opened against `main`, CI green, awaiting human approval.
- **Outcome (post-deploy, tracked separately):** ≥1 of {`what is shipwright`, `shipwright ai`, `devin open source alternative`, `devin harness`} moves from pos 9–10 into pos ≤6 within 2–4 weeks; first non-zero `clicks:app-vitals.com` day. Leading indicator watched in GSC.

## Testing Strategy

| Feature | Layer | Rationale |
|---|---|---|
| 1–5 | build/smoke | Static-site content edits — the meaningful check is a clean Astro build + valid FAQPage JSON-LD structure. No unit/integration logic involved. |
