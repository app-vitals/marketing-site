# PLAN: Shipwright Origin Series (Dan's "Why" Series)

**Repo:** marketing-site
**Owner:** Dan McAulay
**Started:** 2026-08-05

---

## What This Is

A recurring blog series (Company Updates) unpacking the real evolution behind
[shipwrightharness.com/story](https://shipwrightharness.com/story/), told from Dan's
POV. The public timeline lists milestones with no explanation — this series fills in
the why and the specifics behind each one.

Companion piece, not a duplicate: `accidental-devin-alternative.md` (2026-07-10,
Dave's voice) already covers Dave's origin thread (Mammoth ski lift / Telegram /
solitaire). This series covers Dan's parallel thread. Both trace back to the same
first timeline milestone (Nov 2025: "Dan starts running Claude Code in the cloud.
Dave starts building the first autonomous workflow plugin.") — two people, two paths,
same starting point.

## Why Dan Wants To Do This (his words, captured 2026-08-05)

1. **Trust through evolution.** Sharing where Shipwright came from — and why it
   should be trusted — by showing the real (messy, incremental) path instead of a
   polished feature list. If readers share the same goals and see the evolution,
   they understand what's backing the tool.
2. **Justify complexity.** Dan wants Shipwright to be sellable as a lightweight layer
   on top of Claude Code, not a platform. Every layer of scaffolding should be able to
   point back to a specific problem it solved for a specific person. The series is
   partly Dan justifying that complexity to himself as he writes it, not just to
   readers.

**Craft rule that fell out of this:** don't write a separate "manifesto" intro post.
Trust is built through specifics being true, not through asserting the goal. Instead,
each post carries a short framing line (open or close) naming the throughline, plus a
closing beat tying the chapter's tooling back to "does this still earn its place."
Keep both light — a sentence or a short paragraph, not a section. See
`cloud-agent-review-origin.md` for the working pattern (opening italic line +
closing "earns its place" paragraph).

## Structural Conventions

- **Byline:** Dan's name on his chapters ("my posts get my name," his words — most
  site posts default to Dave O'Dell, this series is the exception).
- **Category:** `Company Updates` (enum-constrained in `src/content.config.ts`, no
  room to add a `series` field without a schema change — not worth it for one series).
- **No formal series/tag system exists in the CMS.** Series continuity is carried by
  prose: a "next up" pointer at the end of each post, and inline cross-links between
  chapters once later posts exist. Follow the internal-linking convention documented
  in `content-calendar/` (trailing-slash canonical form, e.g. `/blog/slug/`).
- **Date field = publish date, not narrative date.** Learned the hard way on post 1
  (dodizzle review comment) — blog index sorts by `date` descending, so a
  narrative-accurate but backdated frontmatter date buries the post instead of
  surfacing it as current.
- **LinkedIn companion post per chapter**, drafted alongside the blog post but posted
  manually by Dan (not part of the PR — LinkedIn has no markdown rendering, so any
  quoted material needs plain-text formatting, not blockquote syntax). Draft lives in
  the PR description; `content-calendar/linkedin-drafts.md` is a separate,
  batch-specific artifact from an earlier SEO round, not a running log — don't append
  to it.
- **Accuracy check before merge:** confirm claims against git history in the source
  repos rather than relying on memory. This series leans on two repos not in the
  standard clone set — see Research Resources below.

## Research Resources

- **`app-vitals/marketplace`** (cloned to `repos/marketplace`, access granted
  2026-08-12) — the actual plugin marketplace repo. Confirmed timeline anchors:
  - `2025-12-22` — initial commit
  - `2026-01-09` — `ralph-orchestrator` plugin added (Dave's thread, attributed to
    `snarktank/ralph` as inspiration — **not part of Dan's series**, see Scope note)
  - `2026-02-04` (commit `655a412`, authored by Dan) — `pr-review` plugin ships,
    including `/ca-review-prs` — this is where post 1's origin story becomes a real
    shipped tool
- **`app-vitals/bodhi`** (access granted 2026-08-12) — Dan's personal Slack bot repo
  ("Responds to DMs and @mentions, maintains per-thread conversation sessions, and
  runs scheduled jobs via cron"). Source for post 2 — has the `todos.json` and cron
  history. Not yet explored in depth; next step when starting post 2.
- **Confirmed chronology** (from Dan directly + git evidence):
  - `2025-11-13` — first YouTube tutorial on the cloud agent system (FastAPI, Celery,
    Novita sandboxes; agent fixes tests against local Postgres, opens PR from sandbox)
  - `~2025-12` — LinkedIn post announcing that tutorial (Dan: "8 months ago" as of
    2026-08-05)
  - `~2026-01` — LinkedIn post "the one thing I actually use my cloud agent for"
    (Dan: "7 months ago" as of 2026-08-05) — the post post-1 is built around
  - `2026-02-04` — `pr-review` plugin ships to the marketplace repo
  - `~2026-02` — OpenClaw installed (Dan: uncertain of exact date)
  - `~2026-03` — OpenClaw replaced by a Claude Code wrapper

## Scope Note: Whose Story Is This?

Dan confirmed (2026-08-13): this is **his** story. Ralph/orchestration is Dave's
path and won't be covered here, even though it shows up in the same repo history
around the same time. If Dave wants to write that thread, it's a separate series (or
folds into more chapters off `accidental-devin-alternative.md`). Plan-session and
dev-task are Dave's too, and only get mentioned in Dan's posts as things being
"pulled in" later, not as a focus.

## Post Roster

| # | Topic | Status | Links |
|---|-------|--------|-------|
| 1 | Cloud agent → PR review origin (`/ca-review-prs`, ships as `pr-review` plugin Feb 4 2026) | **Published** | [#89](https://github.com/app-vitals/marketing-site/pull/89) (merged), [#90](https://github.com/app-vitals/marketing-site/pull/90) (merged, accuracy pass), [#91](https://github.com/app-vitals/marketing-site/pull/91) (open, further accuracy passes) — `src/content/blog/cloud-agent-review-origin.md` |
| 2 | OpenClaw + the original `todos.json` — queuing work with cron jobs before any of this had a name | Planned, not started | Source: `app-vitals/bodhi` repo history |
| 3+ | TBD — likely where plan-session/dev-task get pulled in as Dan's and Dave's threads start to merge into one pipeline | Not planned yet | — |

## Lessons From Post 1 (apply going forward)

- **Merge races are real.** A commit pushed to a PR's branch after the PR is already
  merged doesn't land anywhere. Confirm PR state before pushing a "just one more fix"
  commit, and verify the merged diff afterward rather than trusting the push
  succeeding.
- **Don't invent specificity to illustrate vagueness.** Draft trended toward adding
  concrete details (cron jobs, Trello) to make abstract statements feel grounded —
  caught twice by Dan as factually untrue. When the source says "it was vague," keep
  it vague; ask for real categories/examples instead of inventing plausible ones.
- **Line edits from Dan are often re-reads of the same passage** (the "dream" line
  was revised three times: cron/Trello specifics → "vague shapes" reframe → cut
  entirely → restored with real categories). Re-read the full post after each batch
  of edits, not just the diff, to catch redundancy with nearby paragraphs.
