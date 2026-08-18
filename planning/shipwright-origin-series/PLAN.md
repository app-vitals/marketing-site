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
- **`app-vitals/bodhi`** — this is the harness **code** repo (the Slack bot service
  itself: `claude.ts`, `config.ts`, `cron.ts`, `sessions.ts`, `slack.ts`) — the
  original harness that became Shipwright's agent harness. It does **not** contain
  Dan's personal workspace state (no `SOUL.md`, `IDENTITY.md`, `todos.json`,
  `crons.json` content, `comp-calc.ts`, billing scripts). Useful for structural
  comparison (file-naming lineage into `agent/src/` in shipwright), not for the
  personal-ops timeline.
- **`dmcaulay/bodhi-workspace`** — Dan's actual `~/.bodhi/workspace`, analogous to
  this agent's own PVC: a local git repo, never pushed to GitHub, so it can't be
  cloned or granted as repo access. First commit `a3fb42b` "initial snapshot"
  (2026-03-04) — **confirmed**, this is the real hash (an earlier attempt to match it
  against `app-vitals/bodhi` failed because that's the wrong repo entirely). To
  verify claims sourced from here: ask Dan to have Bodhi run `git log` locally and
  paste the raw output back — see PR #99+ follow-up thread for the prompt template
  used for post 2. Commit subject lines in this repo are unusually specific (ticket
  IDs, exact file/flag names), so a plain `git log --format="%h %ad %s" --date=short
  --reverse` was sufficient to verify post 2's claims without needing `--name-status`
  or file-level history.
- **Confirmed chronology** (from Dan directly + git evidence):
  - `2025-11-13` — first YouTube tutorial on the cloud agent system (FastAPI, Celery,
    Novita sandboxes; agent fixes tests against local Postgres, opens PR from sandbox)
  - `~2025-12` — LinkedIn post announcing that tutorial (Dan: "8 months ago" as of
    2026-08-05)
  - `~2026-01` — LinkedIn post "the one thing I actually use my cloud agent for"
    (Dan: "7 months ago" as of 2026-08-05) — the post post-1 is built around
  - `2026-02-04` — `pr-review` plugin ships to the marketplace repo
  - `2026-02-28` — Bodhi's first boot, on OpenClaw. `SOUL.md`/`IDENTITY.md` authored
    (filesystem birth time + Dan's direct account; predates the workspace's own git
    history, so not git-verifiable, but nothing in the repo contradicts it)
  - `2026-03-04` — OpenClaw replaced by Claude Code, four days after first boot.
    `~/.bodhi/workspace` created fresh; `bodhi-workspace` repo's first commit
    (`a3fb42b`, "initial snapshot") lands same day
  - `2026-03-27` — `vitals-os` added to the bodhi-workspace as a synced shared repo
    (commit `e91bc46`), same day as vitals-os's own first commit

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
| 2 | OpenClaw + the original `todos.json` — queuing work with cron jobs before any of this had a name | Drafted, PR open | `src/content/blog/openclaw-todos-origin.md`, branch `content/openclaw-todos-origin` |
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

## Lessons From Post 2 (apply going forward)

- **A repo mentioned by name may not be the repo that has the data.** Initial research
  cloned `app-vitals/bodhi` expecting Dan's workspace history and found none of it —
  that repo is the harness *code*, not Dan's personal workspace. The workspace lives
  in `dmcaulay/bodhi-workspace`, a local-only git repo never pushed to GitHub (same
  shape as this agent's own PVC). When a claim can't be found where expected, say so
  and ask, rather than assuming the claim is wrong or the repo is stale.
- **Same-day claims get compressed in retelling.** Two of Dan's recalled details were
  off once checked against the actual commit timestamps: the marketplace repo was
  vendored into the workspace and moved back out *the same day* (Mar 12), not "two
  days later"; the weekly billing cron was a single Mar 25 commit, not a Mar 25–27
  span. Neither was wrong in substance, just compressed — worth a quick date check
  even when the story sounds precise.
- **When direct repo access isn't possible, ask for a raw `git log` paste instead of
  giving up on verification.** Handing over a specific, copy-pasteable prompt (for
  Dan to relay to Bodhi) got a 645-commit raw log back, which was enough to confirm
  nearly every claim in the post — including the exact commit hash and message for
  the vitals-os handoff (`e91bc46`) that looked fabricated when checked against the
  wrong repo.
