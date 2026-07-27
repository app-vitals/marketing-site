# PLAN: Blog Internal-Linking SEO Remediation

**Session:** blog-internal-linking
**Repo:** app-vitals/marketing-site
**Spec:** [planning/blog-internal-linking/PRODUCT-SPEC.md](./PRODUCT-SPEC.md)

---

## Technical Design

This is a content-only change — no business logic, API, or DB layers are touched.

**Business logic:** N/A — no code changes.

**Views/UX:** No component/layout changes. Astro already renders each post's markdown
body as-is via `src/pages/blog/[id].astro`. All edits are standard markdown links
added inline to existing paragraphs: `[descriptive anchor text](/blog/{slug}/)`,
`/services/`, `/products/shipwright/` — following the trailing-slash convention
already used throughout the site's existing body links.

**APIs / DB:** N/A.

**Files affected:** 40 of the 51 posts under `src/content/blog/*.md` (union of
Feature 1's 37 source posts, Feature 2's 11 posts, Feature 3's 8 posts — with
heavy overlap: 8 of Feature 3's 8 files and 8 of Feature 2's 11 files are also
edited by Feature 1).

**Testing:** adopts the spec's own Testing Strategy directly —
`npm run build` (Astro build succeeds, no broken internal refs) plus a
link-graph check confirming 0 orphan posts, 0 dead-end posts, ≥11 posts linking
to `/services/`, ≥8 posts linking to `/products/shipwright/`, and the link-cap
exception below. No unit/integration/smoke/e2e layers apply — there is no
runtime logic to isolate.

**Complexity risks:** none — this is additive-only markdown editing with no
renames, removals, or constraint changes to any interface. Safe to deploy
standalone at every task boundary once merged.

### Resolved ambiguity: link-cap exception (confirmed with engineer)

The spec's own AC caps posts at "~2–3 new links total across all features," but
the literal source→target map (Feature 1) plus the Feature 2/3 lists require
**4 links** from three specific posts:

| Post | Total required links | Why |
|---|---|---|
| `one-tool-for-everyone` | 4 | source for 4 different Feature 1 orphan targets |
| `choosing-not-to-10x` | 4 | source for 3 Feature 1 targets + 1 Feature 3 (`/products/shipwright/`) link |
| `measure-ai-adoption-roi` | 4 | source for 3 Feature 1 targets + 1 Feature 2 (`/services/`) link |

Every way to bring these down to 3 breaks a harder AC elsewhere: dropping the
Feature 2/3 item undershoots those features' exact "≥11"/"≥8" counts (both
lists have zero redundancy), and for `one-tool-for-everyone`, one of its four
targets (`natural-language-data-queries`) has only one prescribed source in the
whole spec — dropping that link would leave the orphan uncovered.

**Decision (confirmed):** these 3 named posts land at 4 links each. This is
folded into BIL-1.1's acceptance criteria as an explicit named exception
rather than silently violating the ~2–3 cap.

### Sequencing note

Feature 1's 37 source files overlap heavily with Feature 2 (8/11) and Feature 3
(8/8). Per the spec, all four features ship in a single PR. Tasks are chained
via `dependencies` (1.1 → 1.2 → 1.3 → 1.4) rather than left independent, so
the execution pipeline edits shared files sequentially instead of two agents
racing to edit the same markdown file concurrently.

---

## Task Breakdown

| Task | Title | Files touched | Layer | Hours | Complexity | Model | Depends on |
|---|---|---|---|---|---|---|---|
| BIL-1.1 | Fix 18 orphan posts (add inbound links) | 37 | Frontend | 6h | 3 | sonnet | — |
| BIL-1.2 | Route authority to `/services/` (11 posts) | 11 | Frontend | 3h | 3 | sonnet | BIL-1.1 |
| BIL-1.3 | Route authority to `/products/shipwright/` (8 posts) | 8 | Frontend | 2h | 3 | sonnet | BIL-1.2 |
| BIL-1.4 | Verify build + link-graph (0 orphans/dead-ends) | — | Frontend | 1h | 2 | sonnet* | BIL-1.1, BIL-1.2, BIL-1.3 |

\* BIL-1.4 inherits `sonnet` via bundle inheritance (shares branch with 1.1–1.3, all sonnet-tier anyway).

**Branch (all 4, bundled):** `feat/bil-blog-internal-linking` — single PR, per spec ("all four features land in one PR given the overlapping file set").

**Safe to deploy standalone:** yes for all tasks — pure additions, no renames, removals, or constraint changes.

### Dependency Map

```
[START]
  └─ BIL-1.1: Fix 18 orphan posts (no deps)
        └─ BIL-1.2: Route to /services/ (needs 1.1)
              └─ BIL-1.3: Route to /products/shipwright/ (needs 1.2)
                    └─ BIL-1.4: Verify build + link-graph (needs 1.1, 1.2, 1.3)
```

```
Task     | Depends on          | Blocks | HITL
BIL-1.1  | —                   | 1.2    |
BIL-1.2  | 1.1                 | 1.3    |
BIL-1.3  | 1.2                 | 1.4    |
BIL-1.4  | 1.1, 1.2, 1.3       | —      |
```

**HITL scan:** no tasks require human steps — no infra, credentials, secrets, or privileged UI actions are involved. Pure markdown content edits.

---

## Task Detail

### BIL-1.1 — Fix 18 orphan posts (add inbound links)

Add the exact source→target inbound links specified in the PRODUCT-SPEC's Feature 1 table (all 18 orphan targets, all listed source posts). Every added link must sit in relevant body prose with descriptive, varied anchor text — no "click here", no link-list/footer block.

**Source → target map:** see [PRODUCT-SPEC.md § Feature 1](./PRODUCT-SPEC.md) for the full 18-row table (`85-prs-a-week`, `accidental-devin-alternative`, `ai-coding-assistant-vs-agent`, `ai-tools-ci-pipeline-overload`, `anthropic-ended-ai-free-ride`, `choosing-not-to-10x`, `dora-metrics-ai-era`, `entrepreneurs-vs-engineers`, `google-meet-epiphany`, `how-to-roll-out-claude-code`, `natural-language-data-queries`, `no-one-is-paying-you-to-code-anymore`, `notepad-to-claude`, `one-tool-for-everyone`, `shipwright-vs-devin`, `the-ai-adoption-ladder`, `this-week-in-claude-code-ep002`, `who-leads-ai-transformation`).

**Acceptance Criteria:**
- All 18 orphan posts have ≥1 inbound internal link from the source posts named in the spec's table after this change, using trailing-slash `/blog/{slug}/` form.
- Each added link uses descriptive, varied anchor text placed in relevant surrounding prose — no "click here", no link-list or footer block.
- Each source post gains at most ~2–3 new links from this task, **except** `one-tool-for-everyone`, `choosing-not-to-10x`, and `measure-ai-adoption-roi`, which are confirmed exceptions and may reach 4 total (across this task plus BIL-1.2/1.3 — see PLAN.md resolved-ambiguity note above).
- Test decision: no unit/integration/smoke/e2e tests apply — this is static markdown content with no runtime logic. Verification is deferred to BIL-1.4's build + link-graph check. No existing tests are retired.

### BIL-1.2 — Route authority to `/services/`

Add one contextual `/services/` link to each of the 11 consulting-oriented posts named in PRODUCT-SPEC.md § Feature 2: `how-to-roll-out-claude-code`, `the-ai-adoption-ladder`, `ai-velocity-assessment`, `why-tool-rollouts-fail`, `enterprise-ai-adoption-mistakes`, `why-ai-adoption-fails`, `who-leads-ai-transformation`, `what-boards-ask-about-ai`, `pick-one-project-crush-it`, `measure-ai-adoption-roi`, `ai-champion-playbook`.

**Acceptance Criteria:**
- All 11 named posts contain a contextual `/services/` link (trailing-slash form) after this change.
- Each link reads as a natural in-body mention or soft CTA where the reader would plausibly want hands-on help — not a hard sell, not a repeated boilerplate footer.
- Depends on BIL-1.1 completing first since 8 of these 11 files were also edited by BIL-1.1 — this task must add to, not overwrite, those edits.
- Test decision: no unit/integration/smoke/e2e tests apply — static content only. Verification deferred to BIL-1.4. No existing tests are retired.

### BIL-1.3 — Route authority to `/products/shipwright/`

Add one contextual `/products/shipwright/` link to each of the 8 Shipwright-oriented posts named in PRODUCT-SPEC.md § Feature 3: `shipwright-vs-devin`, `accidental-devin-alternative`, `shipwright-autonomous-dev-pipeline`, `choosing-not-to-10x`, `85-prs-a-week`, `autonomous-coding-pipeline`, `building-a-system-to-build-code`, `we-code-autonomously`.

**Acceptance Criteria:**
- All 8 named posts contain a contextual `/products/shipwright/` link (trailing-slash form) after this change.
- Each link is placed where Shipwright is already the subject of the surrounding prose, not bolted onto an unrelated paragraph.
- Depends on BIL-1.2 completing first since all 8 of these files were also edited by BIL-1.1 (and `choosing-not-to-10x` needs its running link-count tracked against the confirmed 4-link exception).
- Test decision: no unit/integration/smoke/e2e tests apply — static content only. Verification deferred to BIL-1.4. No existing tests are retired.

### BIL-1.4 — Verify build + link-graph (0 orphans/dead-ends)

Verification gate for Features 1–3, and the mechanism by which PRODUCT-SPEC.md's Feature 4 (4 dead-end posts) is confirmed resolved as a side effect — not separate edits.

**Acceptance Criteria:**
- `npm run build` passes with no broken internal links and no build errors.
- A link-graph re-check confirms: 0 orphan posts (all 51 have ≥1 inbound internal link), 0 dead-end posts (all 51 have ≥1 outbound internal link) — including the 4 named in Feature 4: `natural-language-data-queries`, `no-one-is-paying-you-to-code-anymore`, `shipwright-vs-devin`, `the-ai-adoption-ladder`.
- Link-graph confirms ≥11 posts link to `/services/` and ≥8 posts link to `/products/shipwright/`.
- Spot-check a random sample of ~6 edited posts to confirm links read naturally in context (not mechanical insertions).
- Test decision: this task *is* the test — a content-verification pass (build + link-graph script), not unit/integration/smoke/e2e code tests, per the spec's own Testing Strategy. No existing tests are retired or added in code form.
