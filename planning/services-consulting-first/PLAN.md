# PLAN: Services Page — Consulting-First Rewrite

**Session:** services-consulting-first
**Repo:** marketing-site
**Branch (bundle):** feat/av-services-consulting-first
**Source spec:** planning/services-consulting-first/PRODUCT-SPEC.md
**Date:** 2026-07-28

---

## Technical Design

Astro static site. All work lands on one branch → one cohesive PR so Dan/Dave review
the rendered `/services` page as a whole (draft-only; human approves the deploy).

**Views/UX**
- New `src/components/ProblemSection.astro` — data-backed problem section (44% integration
  gap, Faros +98%/+91–441%, CloudBees stats), a 5-rung ladder summary, and a link to
  `/blog/the-ai-adoption-ladder/`. Follows the existing `ExecProofSection.astro` pattern.
  Inserted into `services.astro` between the hero and the "The Model" phases section.
- `src/pages/services.astro` — Devin/Shipwright reframe (hero subhead, phase 01 bullet +
  outcome, phase 02 description, a Why-Us note positioning Shipwright as the default install).
  Extracting the new section into a component keeps this file under the 200-line limit
  (currently 193).

**Shared / SEO**
- `src/components/StructuredData.astro` line 8 — Organization JSON-LD `description` updated
  to consulting-first copy.

**No business logic, API, or DB layers touched.** No runtime JS (no Astro island needed).

**Testing strategy:** Smoke only — `npm run build` passes; page renders; JSON-LD parses as
valid JSON. Static content, no unit logic.

## Complexity / Breaking-Change Notes

- All changes are additions or in-place copy edits. JSON-LD description change has no code
  consumers. No renames/removals/constraints. **Safe to deploy standalone: yes** (bundled
  only for reviewer cohesion, not correctness).
- File-size constraint (200 lines) is the one real risk on `services.astro` — addressed by
  componentizing the new section.

## Tasks (bundle → feat/av-services-consulting-first, one PR)

| ID | Title | Layer | Deps | Cx | Model | HITL |
|----|-------|-------|------|----|-------|------|
| SVC-1.1 | Update Organization JSON-LD to consulting-first | Shared | — | 1 | sonnet* | — |
| SVC-1.2 | Reframe Devin/Shipwright copy on services page | Frontend | — | 2 | sonnet* | — |
| SVC-1.3 | Add ProblemSection component (data + ladder + blog link) | Frontend | SVC-1.2 | 3 | sonnet | — |

\* Bundle inheritance: all tasks share a branch, so all run at the highest tier in the
bundle (sonnet).

### Dependency graph

```
[START]
  ├─ SVC-1.1: JSON-LD update (no deps)
  └─ SVC-1.2: Devin/Shipwright reframe (no deps)
        └─ SVC-1.3: ProblemSection component (needs 1.2 — same file, sequenced)
```

SVC-1.3 depends on SVC-1.2 only to serialize edits to `services.astro` and avoid a
same-file conflict on the shared branch. SVC-1.1 touches a different file and is
independent.

## HITL

None. Static copy/component change — no secrets, no infra, no CI workflow changes, no
migration, no live-data read. Deploy is a separate human-approved step (not part of these
tasks).

## Out of Scope

Blog post edits, other pages, design tokens, booking flows, production deploy.
