# Plan Session: roi-positioning-refresh

Repo: app-vitals/marketing-site

## Context

Sept 2026 market research (see conversation thread, not a committed doc) found a real shift
in the buyer landscape: engineering orgs have moved from "we need to adopt AI now, we're
behind" urgency (early 2026) to "we adopted AI, we're paying more, but throughput didn't
move" skepticism (now). Backed by named 2026 sources: Gartner's Hype Cycle for Agentic AI
(coding agents near Peak of Inflated Expectations, 40% of agentic AI projects predicted
canceled by 2027 over cost/ROI), DORA's AI Productivity Paradox (individual output up,
org-level delivery flat — review time up 91-441% at high-adoption teams), DX research across
400+ orgs (median throughput gain ~7.8% vs. vendor claims of 2-3x).

An audit of the current site found the homepage and `/services` already reflect this shift
("Everyone's adopting AI. Almost nobody's getting faster.") — they are NOT in scope for this
session. Two gaps were identified instead:

1. `src/content/blog/shipwright-vs-devin.md` is a pure feature/price comparison with no
   ROI-gap framing, and is missing Shipwright's sharpest differentiator vs. Devin: Shipwright
   is an AI *adoption strategy*, not just an autonomous agent. It's built to take a team from
   Claude Code with human-in-the-loop review to queuing tasks for Claude Code to run in the
   background — a graduated autonomy path, documented at
   https://shipwrightharness.com/docs/configuring-autonomy/. Devin has no equivalent.
2. No post narrates the market shift itself for readers who haven't been tracking it —
   an opportunity to publish App Vitals' own read on "what changed since February," tied back
   to why the adoption-ladder approach (already on `/services`) is the right fix for this
   specific phase.

Explicitly out of scope: homepage, `/services`, and older "adopt now" urgency posts
(`adopt-autonomous-coding-now.md`, `no-one-is-paying-you-to-code-anymore.md`,
`enterprise-ai-adoption-mistakes.md`) — left as dated historical posts, not rewritten.

## Design

Both tasks are content-only changes to this static Astro site (no DB/API/business-logic
layers). No renames or removals — one edit to an existing file, one new file. No breaking
change risk.

**Assumptions confirmed with Dan (2026-09-16):**
- `shipwright-vs-devin.md` keeps its original `date: "2026-07-16"` frontmatter — this is an
  edit to an existing published post, not a new post.
- The new post is authored by Dave O'Dell (strategy/build-in-public register, matching
  `velocity-trap.md` / `the-model-doesnt-matter-anymore.md`), category `AI Adoption`.

Both tasks must follow `docs/content-writing/blog-post.md`: match voice per author, pass
`brand/brand-lint.py`, and clear the AI-tell checklist before shipping. Neither requires new
Playwright coverage — no new interactive elements or booking/UTM behavior is introduced, and
the existing smoke suite already covers page build/render for `src/content/blog/*`.

## Tasks

### RP-1.1 — Add adoption-strategy differentiator to the Devin comparison post

**Description:** Update `src/content/blog/shipwright-vs-devin.md` to add Shipwright's
adoption-strategy differentiator: Shipwright takes a team from Claude Code with
human-in-the-loop review to queuing tasks for background-autonomous execution, via a
documented, configurable autonomy path (link to
https://shipwrightharness.com/docs/configuring-autonomy/). Devin ships as a fixed autonomous
agent with no equivalent graduated path — make this a core differentiating section (e.g. a
new `##` section, or fold into "The Fundamental Difference" / "How to Choose"), not a single
bullet in the comparison table.

**Acceptance Criteria:**
- New section (or substantially expanded existing section) frames Shipwright as an AI
  adoption *strategy*, contrasting the HITL-to-background-autonomy path against Devin's fixed
  autonomous model, with an inline link to the `configuring-autonomy` docs page
- Frontmatter (`author: "Dave O'Dell"`, `category: "Engineering Velocity"`,
  `date: "2026-07-16"`) unchanged; `excerpt` and `readTime` updated only if the new section
  materially changes either
- Passes `python3 brand/brand-lint.py --brand-dir brand src/content/blog/shipwright-vs-devin.md`
  with no HIGH findings; AI-tell checklist run by hand before shipping
- No client names, no specific pricing beyond what's already published in the post
- **Test decision:** no test changes. This is a prose-only edit to an existing page with no
  new interactive elements, forms, or booking/UTM links — the existing Playwright smoke suite
  already covers page build/render for this route and is unaffected. Run `npm run build` and
  `npm run check` to confirm the frontmatter still validates and the site builds.

**Dependencies:** none
**Branch:** `content/devin-adoption-strategy-angle`
**Layer:** Frontend
**Hours:** 2
**HITL:** no
**Complexity:** 2
**Model:** sonnet
**Safe to deploy standalone:** yes

---

### RP-1.2 — New post: "What's Changed Since February"

**Description:** Write a new blog post narrating the market shift: early 2026 adoption-anxiety
("we're behind, need AI now") vs. now (adopted-but-no-ROI skepticism — rising AI tool spend,
flat throughput). Cite the same class of stats already used on `/services`
(`ProblemSection.astro`: Faros AI review-time data, CloudBees governance gap) and may
additionally cite Gartner's Hype Cycle for Agentic AI and DORA's AI Productivity Paradox
findings if it strengthens the piece. Close by tying the shift back to why Shipwright's
adoption-ladder approach (already live on `/services`) is the right fix for this specific
phase, not the earlier "just adopt a tool" phase.

**Acceptance Criteria:**
- New file at `src/content/blog/<slug>.md` (slug chosen to fit existing conventions, e.g.
  `whats-changed-since-february`), frontmatter: `author: "Dave O'Dell"`,
  `category: "AI Adoption"`, valid `date`, honest `readTime`, 1-2 sentence `excerpt`
- Body written in Dave O'Dell's register (see `velocity-trap.md`,
  `the-model-doesnt-matter-anymore.md` for voice reference), follows the frontmatter schema in
  `src/content.config.ts`
- Does not modify the homepage, `/services`, or any older "adopt now" post
  (`adopt-autonomous-coding-now.md`, `no-one-is-paying-you-to-code-anymore.md`,
  `enterprise-ai-adoption-mistakes.md`)
- Passes `python3 brand/brand-lint.py --brand-dir brand src/content/blog/<slug>.md` with no
  HIGH findings; AI-tell checklist run by hand before shipping; no client names, no specific
  pricing
- **Test decision:** no test changes. New static content page, no new interactive elements or
  booking/UTM behavior — existing Playwright smoke suite is unaffected. Run `npm run build`
  and `npm run check` to confirm the new post's frontmatter validates and the route generates.

**Dependencies:** none
**Branch:** `content/whats-changed-since-february`
**Layer:** Frontend
**Hours:** 3
**HITL:** no
**Complexity:** 2
**Model:** sonnet
**Safe to deploy standalone:** yes

## Dependency Map

```
[START]
  ├─ RP-1.1: Devin comparison adoption-strategy angle (no deps)
  └─ RP-1.2: "What's Changed Since February" post (no deps)
```

| Task | Depends on | Blocks | HITL |
|---|---|---|---|
| RP-1.1 | — | — | |
| RP-1.2 | — | — | |

## HITL Scan

No tasks require human steps — both are plain content edits on a static site with no
infra/secrets/deploy-config surface, and neither touches `.claude/**`.
