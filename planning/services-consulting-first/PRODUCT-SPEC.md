# PRODUCT-SPEC: Services Page — Consulting-First Rewrite

**Repo:** marketing-site
**Branch:** feat/av-services-consulting-first
**Status:** Draft for approval (Dan/Dave) — draft-only, no deploy until signed off
**Author:** Saul (marketing agent)
**Date:** 2026-07-28

---

## Problem Statement

The `/services` page presents a strong four-phase engagement model but assumes the
visitor already believes they have a problem. It has no data-backed hook establishing
*why* the gap between "adopted AI" and "shipping autonomously" is hard, and no link to
the `the-ai-adoption-ladder` blog post that does that intellectual work. Separately, the
Devin/Shipwright framing weighs the two as equal alternatives ("Devin or Shipwright"),
which reads reseller-ish rather than "we built Shipwright and install it by default."
The Organization JSON-LD is product-first, not consulting-first.

## Users & Context

- **Primary:** Engineering leaders (VP Eng, CTO, Director) at orgs that have "adopted
  AI" but stalled at individual, ungoverned usage. Landing cold on `/services`, often
  from search or a referral, not yet convinced they have a systemic problem.
- **Secondary:** Warm prospects sent the page directly by Dan/Dave who need the
  engagement model and differentiators to justify a discovery call.

## Features

### Feature 1 — Data-backed problem section (NEW)

A new section placed **above the existing "The Model" phases section** (after the hero),
establishing the adoption-vs-integration gap with hard data before pitching the model.

**Copy direction (v1 draft, subject to Dan's edit):**
- Heading: "Almost everyone has adopted AI. Almost no one has integrated it."
- Lead stat: 80–90% of developers use AI tools; only **44%** have team-level integration.
- Backfire stats (Faros AI, 10,000+ devs / 400+ orgs): PR volume +98%, review time
  +91–441%, bugs +54%, incidents +243%.
- CloudBees: 81% report more production issues since AI rollout; 97% adoption vs 30% governance.
- Close: "The gap between 'we're using Claude Code' and 'agents ship production PRs
  independently' is a systems problem, not a model problem."
- Every stat carries an inline source attribution.

**Acceptance criteria:**
- [ ] A problem section renders between the hero and the phases section on `/services`
- [ ] The 44% integration-gap stat and at least the Faros PR-volume/review-time figures appear with source attribution
- [ ] Section uses the existing design tokens (mono eyebrow label, display heading, `text-white/40` body) and matches the visual rhythm of adjacent sections
- [ ] Implemented as a dedicated section component (e.g. `ProblemSection.astro`), keeping `services.astro` under the 200-line file limit

**Source Map:**
- `src/pages/services.astro` (insert section)
- `src/components/ProblemSection.astro` (new — follows `ExecProofSection.astro` pattern)

**Testing Strategy:** Smoke — static Astro page; verify `npm run build` succeeds and the
section renders with expected copy. No unit logic.

### Feature 2 — Blog link + inline ladder summary (NEW)

A prominent link from `/services` to `/blog/the-ai-adoption-ladder/`, plus a light
one-line-per-rung summary of the 5-rung ladder (Gated → Assisted → Parallel →
Supervised Autonomy → AI-native) so a cold visitor understands *where they are* before
seeing the engagement model.

**Acceptance criteria:**
- [ ] `/services` contains a visible, styled link to `/blog/the-ai-adoption-ladder/`
- [ ] A 5-rung ladder summary renders, one concise line per rung
- [ ] Link uses a relative internal path, not a hardcoded absolute domain
- [ ] The ladder summary can live within the problem section or its own block — no duplicate PhaseCard styling

**Source Map:**
- `src/components/ProblemSection.astro` (ladder summary + blog link, or a sibling component)

**Testing Strategy:** Smoke — verify link href resolves to the existing blog route and build passes.

### Feature 3 — Devin/Shipwright reframe (EDIT existing copy)

Move Shipwright out of equal "Devin or Shipwright" weighing into "we work with what's in
place, and install Shipwright where there isn't." Add a short note that Shipwright is
open-source, self-hosted, code-stays-in-your-infra.

**Specific edits in `services.astro`:**
- Hero subhead (line ~131): keep "Installing Devin or Shipwright doesn't guarantee
  velocity" but reframe the tool relationship.
- Phase 01 bullet "Devin vs. Shipwright fit assessment" (line 17) and outcome (line 19):
  soften from equal-weighing to "work with what's in place, install Shipwright where there isn't."
- Phase 02 description (line 31): "whichever tool you've chosen — Devin or Shipwright" → reframed.
- Add a "Why Us" card or sidebar note establishing Shipwright as the default install
  (open-source, self-hosted, no vendor lock-in, code stays in your infra).

**Acceptance criteria:**
- [ ] No copy on `/services` presents Devin and Shipwright as equally-weighted alternatives
- [ ] Page states App Vitals works with existing tooling AND installs Shipwright where there's none
- [ ] A note establishes Shipwright as open-source, self-hosted, code-stays-in-infra
- [ ] Tone stays tool-agnostic for the consulting pitch (not a Shipwright ad)

**Source Map:**
- `src/pages/services.astro` (hero subhead, phases array, whyUsItems array)

**Testing Strategy:** Smoke — copy-only change; verify build passes and no "Devin or Shipwright" equal-weight phrasing remains.

### Feature 4 — Organization JSON-LD → consulting-first (EDIT)

Update the Organization schema `description` to reflect the consulting-first business.

**Change in `src/components/StructuredData.astro` line 8:**
- From: `"App Vitals builds and installs Shipwright — the free, MIT-licensed alternative to Devin, running entirely in your cloud."`
- To: `"App Vitals is an autonomous delivery consultancy — we install and operate the infrastructure that gets engineering orgs from AI tool adoption to autonomous production delivery, using the AI adoption ladder framework and Shipwright, the open-source agent we built for this."`

**Acceptance criteria:**
- [ ] Organization JSON-LD description matches the consulting-first copy above
- [ ] JSON-LD still validates as well-formed schema.org Organization markup
- [ ] Description remains consistent with visible page copy (the #77 alignment intent)

**Source Map:**
- `src/components/StructuredData.astro` (line 8)

**Testing Strategy:** Smoke — verify build passes and the emitted `<script type="application/ld+json">` parses as valid JSON.

## Technical Constraints

- Astro static site (no SSR, no runtime JS unless an island is required — none needed here)
- Tailwind + existing design tokens (navy background, electric/cyan/violet accents, Space Grotesk / General Sans / JetBrains Mono)
- **~200 lines max per file** — new sections must be extracted into components, not inlined
- Content rules: NO client names, NO specific pricing/rates, NO email capture forms
- Booking link must import `BOOKING_URL` from `src/consts.ts`, never hardcoded
- Mobile-first responsive
- Conventional commits; feature branch + squash merge; never commit to main

## Out of Scope

- The blog post itself (`the-ai-adoption-ladder.md`) — no edits
- Any other page (home, pricing, privacy, terms)
- Design-token / global-style changes
- New booking flows or email capture
- Deploy to production — this ships as a PR for Dan/Dave review only

## Priorities & Sequence

1. Feature 4 (JSON-LD) — smallest, independent, no dependencies
2. Feature 3 (Devin/Shipwright reframe) — copy edits in place
3. Feature 1 (problem section) — new component, largest change
4. Feature 2 (blog link + ladder) — can fold into Feature 1's component

Features 1 and 2 are best delivered together (same component). 3 and 4 are independent
and can land first as low-risk copy changes.

## Resolved Decisions

- **Componentization (from file-size constraint):** New problem/ladder content goes into
  a dedicated `.astro` component following the `ExecProofSection` pattern, not inlined
  into `services.astro`. Chosen to respect the 200-line file limit. Can be revisited.
- **Devin/Shipwright framing:** Reframe to "work with what's in place, install Shipwright
  where there isn't" rather than removing Devin entirely. Keeps the consulting pitch
  tool-agnostic while positioning the product honestly. (Dan's stated direction.)
- **Draft-only gate:** Work produces a PR; nothing deploys until Dan or Dave approves.
  External-publish approval boundary per TEAM.md.
- **Data density:** Problem section leads with the full stat stack (Faros + CloudBees +
  integration gap), since it is the page's evidentiary hook. (Dan approved default,
  2026-07-28.) Can be trimmed to the 44% gap + Faros PR/review line if it reads too dense.

## Success Criteria

- **User's perspective:** A cold visitor to `/services` understands within the first
  screen why AI adoption without a system backfires, sees credible data, can click
  through to the ladder blog post, and reaches the discovery-call CTA convinced the
  problem is systemic — not just tooling.
- **Technical:** `npm run build` passes; all four features' acceptance criteria met;
  `services.astro` stays under 200 lines; JSON-LD validates; PR opened on
  `feat/av-services-consulting-first` for review. No production deploy without approval.
