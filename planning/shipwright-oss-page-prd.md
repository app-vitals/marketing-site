# PRD — Shipwright Page: OSS Launch Update

**Author:** Sully  
**Date:** June 28, 2026  
**Status:** Ready for implementation  
**Priority:** P0 — must ship before June 30 launch  
**Scope:** `src/pages/products/shipwright.astro` only

---

## Background

Shipwright Harness goes open source (MIT) on **Monday, June 30, 2026**. The current `app-vitals.com/products/shipwright` page was written for a consulting/managed-product positioning: "Book a Discovery Call," "Dan and Dave handle the infra agents can't," install → co-operate → hand-off. There is no mention of open source, no GitHub link, and no self-serve path.

The launch campaign (`goals/content/shipwright-oss-launch-campaign.md`) routes all OSS traffic to `shipwrightharness.com` and GitHub — but App Vitals will surface in every piece of launch content (LinkedIn, Show HN, YouTube, podcast), and `app-vitals.com/products/shipwright` will receive organic inbound. As of today, a visitor landing there finds a consulting pitch with no acknowledgment that the product they heard about is free and open source.

This is a messaging mismatch that will erode trust on launch day.

---

## Problem

1. **No open source signal.** The page has zero mention of MIT license, GitHub, or self-serve install. A developer who finds it after seeing the launch post will assume they're looking at a paid managed product.
2. **App Vitals creator/maintainer story is missing.** The current page doesn't establish that App Vitals *built* Shipwright — it just says "we install it for you." The OSS launch is the moment to make that creator narrative central.
3. **Single CTA path.** Everything funnels to "Book a Discovery Call." There's no path for the open source developer who just wants to try it.
4. **Wrong headline.** "Autonomous programming, installed." positions it as a managed service, not an OSS project.

---

## Goals

- Make it immediately clear to any visitor that Shipwright is **free, MIT licensed, and open source**
- Establish **App Vitals as the creator and maintainer** — not just an installer
- Add a **self-serve path** (shipwrightharness.com + GitHub) as the primary CTA
- **Preserve the Design Partner / consulting path** as a secondary CTA for teams that want App Vitals to install it for them
- Ship before June 30 with zero regressions on existing design system

---

## Non-Goals

- Redesigning any other page
- Changing the overall site nav or layout
- Adding new Astro components or dependencies
- Changing pricing (there is none — keep it that way)

---

## Target Audience (for this page)

**Primary:** Open source developers who encountered Shipwright via Show HN, LinkedIn, YouTube, or r/ClaudeAI and want to understand what it is and try it.

**Secondary:** Engineering managers / CTOs evaluating autonomous coding agents who want to understand App Vitals' credibility and the managed install option.

---

## Revised Page Structure

### 1. Hero

| Element | Current | Updated |
|---|---|---|
| Eyebrow | `Product · Shipwright` | `Open Source · MIT · Built by App Vitals` |
| Headline | "Autonomous programming, installed." | "The own-it alternative to closed AI agents." |
| Subhead | "A customizable agent system... Dan and Dave handle the infra..." | "Free, MIT-licensed autonomous coding agent built on Claude Code. Runs on your infrastructure. Your code never leaves your control." |
| Primary CTA | Book a Discovery Call → cal.com | **Get Started Free** → shipwrightharness.com |
| Secondary CTA | *(none)* | **⭐ Star on GitHub** → github.com/app-vitals/shipwright |
| GitHub link | *(none)* | Inline repo link in eyebrow |

### 2. "Created by App Vitals" — NEW SECTION (replaces "What it is")

Immediately below the hero. Establishes credibility: Dan and Dave built Shipwright, run it in production on their own engagements daily, and open sourced it because they believe you should own the system. Includes MIT / Self-hosted / Claude Code native / No lock-in tags.

**Key copy beat:** *"We didn't build a demo — we built the pipeline we trust with real codebases, every day."*

### 3. Two Modes (replaces "How it works" install/co-operate/hand-off flow)

Side-by-side cards:
- **Plugin Mode** — `/plugin install`, run `/shipwright:dev-task`, ship a PR from inside Claude Code
- **Cloud Agent Mode** — deploy to Docker/K8s/GitHub Actions, DM in Slack, runs on cron schedule

Shows the actual install command. Short and concrete.

### 4. Why Open Source (replaces "How we're different")

Three cards:
1. **Your code, your control** — the managed-agent market is "trust us" SaaS; Shipwright is MIT, self-hosted, fork it
2. **Same bar as human code** — tests land with the code, CI must be green, same standards as your engineers
3. **Metrics on your pipeline** — first-time-quality rate, cycle time, estimation accuracy, your data on SQLite or PostHog

### 5. Quickstart — NEW SECTION

The actual one-prompt copy-paste quickstart, visible on the page. 5 minutes, no accounts, no secrets. Links to full docs at shipwrightharness.com.

### 6. Design Partner Program (preserved, reframed)

Heading changes from "Early. Honest. Room for a few more." to **"Want us to install it for you?"**

Copy updated to make the hierarchy explicit: Shipwright is free to self-install; the Design Partner program is for teams that want App Vitals to handle the install, configuration, and first 8–10 weeks alongside them. Pilot details (8–10 weeks, reduced-rate, weekly sessions, roadmap influence) unchanged.

### 7. Final CTA — Two Paths (replaces single "Book a Discovery Call")

Two equal-weight cards side by side:

**Left — Install it yourself (free)**
- Free · Open Source badge
- "MIT licensed. Clone the repo, run the quickstart, have the metrics dashboard up in 5 minutes."
- Primary button: Get Started Free → shipwrightharness.com
- Secondary button: ⭐ Star on GitHub

**Right — Have us install it (Design Partner · App Vitals)**
- "Dan and Dave handle the install, configuration, and first 8–10 weeks alongside your team."
- Button: Book a Discovery Call → cal.com/team/app-vitals

---

## Messaging Hierarchy

```
1. Free. MIT. Open source. (primary — OSS developer audience)
2. App Vitals built it. They run it daily. They maintain it. (credibility)
3. Claude Code native. Your infra. Your control. (differentiator)
4. Want App Vitals to install it? Design Partner program. (secondary — enterprise)
```

---

## SEO

| Field | Current | Updated |
|---|---|---|
| `<title>` | Shipwright — Autonomous Programming, Installed | Shipwright — Open-Source Autonomous Delivery Agent for Claude Code |
| `description` | "Shipwright is a customizable autonomous-programming system..." | "Shipwright is an MIT-licensed autonomous coding agent built on Claude Code. Runs on your infrastructure. Created and maintained by App Vitals." |
| `keywords` | autonomous programming, AI agents, AI coding... | + open source, MIT, self-hosted, Claude Code |

---

## Implementation Notes

- No new Astro components needed — all existing design system classes (`gradient-text`, `card-glow`, `reveal`, `glow-orb`, `gradient-divider`, `animate-fade-in-up*`) are used as-is
- GitHub SVG icon inline (no new dependency)
- Two-column hero CTA uses `flex flex-wrap gap-4` — degrades cleanly on mobile
- Two-path final CTA uses `grid md:grid-cols-2` — standard pattern already in use on site
- All external links: `target="_blank" rel="noopener noreferrer"`
- `shipwrightharness.com` and `github.com/app-vitals/shipwright` are the two external destinations added

---

## Acceptance Criteria

- [ ] Hero headline does not contain the word "installed" or frame it as a managed service
- [ ] "Open Source" and "MIT" visible above the fold
- [ ] App Vitals credited as creator/maintainer in the first scroll
- [ ] GitHub link visible in hero section
- [ ] `shipwrightharness.com` linked as primary CTA
- [ ] Self-serve path (install yourself) and consulting path (Design Partner) both present and clearly differentiated
- [ ] Quickstart copy-paste prompt visible on page
- [ ] No broken links; all existing `cal.com/team/app-vitals` links preserved
- [ ] Mobile-responsive (no layout regressions)
- [ ] Passes existing CI (lint, typecheck, build)

---

## Delivery

**Branch:** `sully/shipwright-oss-page-update`  
**Files changed:** `src/pages/products/shipwright.astro` (1 file)  
**PR:** Opens against `main`  
**Target merge:** Before June 30, 2026 launch
