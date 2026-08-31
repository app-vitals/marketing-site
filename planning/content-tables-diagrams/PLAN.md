# Plan: Content Tables & Diagrams

Session: `content-tables-diagrams`
Repo: `marketing-site`

## Background

A UX/IA content audit of the marketing site (core pages + 13 representative
blog posts) found several places where dense prose would read better as a
table, comparison matrix, or consistently-formatted sequence. This plan scopes
the highest-priority findings into shippable tasks.

## Design

Four corrections/decisions made during technical scoping, ahead of task
breakdown:

1. **`services.astro` is a different offering from the Home/Design-Partners
   install engagement**, not a third description of the same timeline.
   `services.astro`'s four phases (Ladder Placement → Guardrail Installation →
   Embedded Operation → Ongoing Velocity) describe a longer, separate
   ladder-climbing consulting engagement. It gets its own table treatment,
   independent of the Home/Design-Partners timeline reconciliation.

2. **Home vs. Design Partners genuinely conflict on hand-off duration.**
   Homepage (`src/pages/index.astro`) says hand-off is "~2 weeks."
   `src/pages/shipwright/design-partners.astro` says hand-off is "Weeks
   7-10" (4 weeks). Canonicalizing on `design-partners.astro`'s numbers
   (Weeks 1-2 / 3-6 / 7-10) as the more detailed, paid-engagement page;
   homepage copy is updated to match via a new shared `EngagementTimeline`
   component.

3. **No MDX support in this repo** — `src/content.config.ts` loads
   `**/*.md` only and there's no `@astrojs/mdx` dependency in
   `package.json`, so Astro components cannot be embedded inside blog post
   bodies. The "reusable pipeline diagram across posts" audit finding is
   scoped down to: reformat the prose pipeline-stage sections into a
   consistent, scannable numbered format across posts (not a literal
   embedded graphic). A real embeddable diagram would require adding MDX
   support first — out of scope here.

4. **The two "AI maturity ladder" frameworks are not actually duplicative.**
   `ProblemSection.astro` / `the-ai-adoption-ladder.md`'s 5-rung ladder
   (Gated → Assisted → Parallel → Supervised Autonomy → AI-native) measures
   org AI-autonomy. `velocity-engineering-playbook.md`'s "Level 0-4" model
   measures pipeline-optimization maturity — a different axis. Scoped down
   to a one-sentence cross-reference rather than a merge.

No test suite exists in this repo (`package.json` has no test runner —
static Astro/Tailwind site). Verification for every task is `npm run build`
succeeding plus a manual visual check via `npm run dev`.

No renames, removals, or schema/constraint changes are involved — this is
presentational content work only. Every task is safe to deploy standalone.

## Tasks

| Task | Title | Depends on | Layer | Model | Hours |
|---|---|---|---|---|---|
| CTD-1.1 | Style blog `.prose table` (header row, borders, mobile-scroll check) | — | Frontend | haiku | 1 |
| CTD-1.2 | Add feature-comparison table to `shipwright-vs-devin.md` | CTD-1.1 | Frontend | sonnet | 2 |
| CTD-2.1 | Shared `EngagementTimeline` component; reconcile Home + Design-Partners numbers | — | Frontend | sonnet | 4 |
| CTD-2.2 | Add phase-summary table to `services.astro` | — | Frontend | sonnet | 2.5 |
| CTD-3.1 | Cross-reference note distinguishing the two maturity frameworks | — | Frontend | haiku | 0.5 |
| CTD-3.2 | Reformat "Four Stages of Delivery" in `velocity-engineering-playbook.md` into scannable pipeline format | — | Frontend | haiku | 1.5 |
| CTD-3.3 | Mirror that format in `85-prs-a-week.md`, `ci-pipeline-bottleneck.md`, `code-review-bottleneck.md` | CTD-3.2 | Frontend | haiku | 3 |
| CTD-4.1 | Convert `measure-ai-adoption-roi.md`'s "Four Metrics" section into a table | — | Frontend | haiku | 1.5 |
| CTD-4.2 | Same treatment for `dora-metrics-ai-era.md`'s per-metric sections | CTD-4.1 | Frontend | haiku | 1.5 |

### Dependency map

```
[START]
  ├─ CTD-1.1 (no deps)
  │     └─ CTD-1.2 (needs 1.1)
  ├─ CTD-2.1 (no deps)
  ├─ CTD-2.2 (no deps)
  ├─ CTD-3.1 (no deps)
  ├─ CTD-3.2 (no deps)
  │     └─ CTD-3.3 (needs 3.2)
  └─ CTD-4.1 (no deps)
        └─ CTD-4.2 (needs 4.1)
```

### HITL scan

No tasks require human steps — static content site, no infra/secrets/console
access involved.
