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
  - **Correction (2026-08-18):** OpenClaw-on-Raspberry-Pi wasn't Dan's independent
    parallel path — Dave bought his Pi and ran OpenClaw on it first; Dan bought his
    own Pi a couple weeks later and ran OpenClaw too, same platform, same starting
    point. Dan clarified further: they were in regular communication throughout, not
    working in silos — what diverged was which problems each of them applied it to,
    driven by the different shape of their day-to-day work. Post 2's opening reflects
    this (shared platform + shared starting point + ongoing communication + naturally
    diverging applications). Don't reintroduce the "two paths, same starting point"
    framing for the OpenClaw-Pi thread specifically as if it were independent
    discovery (that framing belongs to the *Nov 2025* Claude-Code-cloud vs.
    autonomous-workflow-plugin milestone, per the top of this doc — a different,
    earlier starting point, don't conflate the two).
  - **Why Dan actually moved off OpenClaw (his words, 2026-08-18) — don't lose this,
    it's more specific and more honest than "I didn't trust the platform":** he was
    new to the real risks of running an AI agent without approving every task, and
    watching OpenClaw's own commit history move fast made him nervous in a way he
    hadn't expected. He knew Claude Code's internals far better than OpenClaw's, and
    — this is the line worth reusing verbatim in future posts — "trust in the system
    is key for autonomous coding, it's very hard to let an agent write code if you
    don't trust the system." He built that trust later into Bodhi's own workflow via
    lint, tests, and a controlled environment — the same mechanism, applied to a
    system he already understood. Secondary motive: building it himself meant going
    deeper on Claude Code specifically, which is directly useful for client work.
  - `2026-02-28` — Bodhi's first boot, over Telegram (the easiest way to get going
    with OpenClaw — same channel Dave used). **Correction (2026-08-18):** the
    identity-file creation isn't something Dan sat down and deliberately wrote — it's
    OpenClaw's own onboarding flow, which runs automatically in-chat the first time
    you talk to it (who is this thing, what should it sound like, what should it
    refuse to do). Don't frame it as a deliberate authorial act in future posts;
    frame it as standard OpenClaw behavior that happened to be the moment Bodhi got
    a name. (Filesystem birth time still confirms the Feb 28 date; predates the
    workspace's own git history, so not git-verifiable beyond that.)
  - `2026-03-04` — OpenClaw replaced by Claude Code. `~/.bodhi/workspace` created
    fresh; `bodhi-workspace` repo's first commit (`a3fb42b`, "initial snapshot")
    lands same day. **Don't frame this as a fast from-scratch rebuild** — Dan was
    already running Claude Code in `-p` (headless) mode for the cloud agent project
    (post 1) by this point, which streamlined the move. Don't assert a specific
    day-count ("N days after first boot") as a dramatic beat; Dan wasn't confident
    that framing was accurate even though the calendar dates check out.
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
| 2 | OpenClaw + the original `todos.json` — queuing work with cron jobs before any of this had a name | **Published**, follow-up corrections in progress | [#100](https://github.com/app-vitals/marketing-site/pull/100) (merged) — `src/content/blog/openclaw-todos-origin.md`; see `content/openclaw-todos-followup` branch for post-merge corrections |
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

## Post-Merge Corrections on Post 2 (Dan's notes, 2026-08-18 — apply to `content/openclaw-todos-followup`)

- **The `todos.json`-lineage file's actual move history** (Dan relayed this from a
  review with commit-level detail; the post's first cut had the sequence wrong —
  don't repeat the wrong version):
  1. `memory/engineering-todos.json` created Mar 7
  2. Renamed to `state/engineering-todos.json` Mar 9 (`48904cf`, "introduce state/
     dir") — still one file, engineering-flavored name carries over
  3. Renamed again to `state/todos.json` Mar 14 (`b4e8c4b`) — still one file
  4. Mar 16 (`f1d3ed5`): a genuinely *new* `state/engineering-todos.json` created
     alongside the existing `state/todos.json` — this is the actual split moment,
     two files side by side
  5. Mar 18 (`d2a071d`, eng-111–114): split reversed — commit message: "eng-114:
     delete state/engineering-todos.json — orphaned after eng-111 rename; todos now
     live exclusively in state/todos.json." One file again.
  For the post itself, narrate this as "renamed twice, briefly split into two files,
  merged back into one" — the blog doesn't need the hashes, but don't reintroduce the
  cleaner-than-reality linear version (single rename, then a permanent split) that
  the original draft had.
- **Bodhi didn't spontaneously audit itself — Dan designed a scoped, safety-railed
  system on purpose, within about a day of the first findings.** Two crons, not one
  emergent behavior: `eng-audit` (Mon/Thu 10am) with a detailed prompt telling Bodhi
  exactly what to scan (tests, lint, coverage gaps, an "outbound communication
  audit" for unapproved external calls, simplification opportunities, dead code,
  cron integrity) and the exact JSON shape to write findings in; `eng-execute`
  (every 2 hours) picks the next pending item, fixes small/medium ones, breaks large
  ones down, and is bound by explicit hard-stops — no messages, no env/credential
  changes, no git push, no deploy, no crons.json edits without approval. The
  `eng-001`–`006` findings (Mar 6) look like they triggered the idea, but the cron
  pair that formalized it was deliberate design, not autonomous initiative. Don't
  undersell the design work or oversell Bodhi's autonomy at this point in the story
  — this was prompt engineering with real thought about what Bodhi could and
  couldn't touch on its own, not "Bodhi decided to."
- **Crons are an OpenClaw feature, not something Bodhi/Claude Code invented.** One
  of the two big OpenClaw unlocks, alongside the messaging integration itself — an
  easy way to schedule background work for an agent. Attribute it to the platform
  in the post, not to Bodhi's own design.
- **Billing was the first real gap Dan automated, and it was genuinely manual
  before Bodhi:** invoicing by hand, manually checking whether payments had come
  in, and — since it's just Dan and Dave with no W-2, only distributions — the two
  of them paying each other manually too. Worth stating this upfront in the "Money
  Made It Real" section as the *why*, before the March 23/25 technical specifics.
- **The Slack move was a bigger deal than a channel swap — but it's causally
  unrelated to the Claude Code migration (Dan's words, 2026-08-18):** first pass
  wrongly bundled the Telegram→Slack switch together with the OpenClaw→Claude Code
  migration, as if one caused the other. Dan corrected this: he moved to Slack
  because that's where he was already comfortable and already working — Telegram
  was just an easy starting point for OpenClaw, and he didn't want to add another
  tool to his life. **Don't imply timing/causality between the platform migration
  and the channel switch in future drafts — they're two independent decisions,**
  even though they both get covered in the same section. The substance of why it
  mattered still stands: Slack was already where he did async work, unlike the
  terminal (heads-down, one task at a time), and talking to Bodhi there started to
  feel like talking to a teammate/developer who could go off and do work
  independently — directly tied to his actual goal of moving toward async,
  autonomous, multi-task agents, not just faster single-task execution. Section:
  "Slack Was the Other Unlock," placed right after the Claude Code migration and
  before the crons/backlog sections, since it's the structural reason the later
  async stuff (background crons, self-managed backlog, approve-from-phone
  invoicing) hangs together as one thing.
- **The "hard stops" list wasn't as airtight as the post first made it sound (Dan's
  words, 2026-08-18):** eng-execute was blocked from messaging, credentials, git
  push, deploy, and unapproved schedule changes — but nothing stopped it from
  freely rewriting the actual code in its own workspace, and whatever it wrote
  would just run the next time a cron fired or Dan asked it to do something. No
  review step sat between "Bodhi edits its own code" and "that code executes."
  Added an honest "looking back, less airtight than it sounds" caveat right after
  the hard-stops list — this fits the series' own ethos (real path, not a polished
  safety story) better than leaving the hard-stops list sounding complete. Keep this
  caveat if post 3 revisits eng-execute's evolution — it's the real gap, not a
  detail to smooth over.
- **Don't invent comparative value-judgments on Dan's behalf.** Wrote "the hard
  stops mattered more to me than the automation did" as editorial synthesis — Dan
  confirmed the hard stops were real and he wanted safety, but never said or implied
  a ranking against the automation itself. This is the same failure mode as post 1's
  "don't invent specificity to illustrate vagueness" lesson, just applied to
  sentiment/values instead of concrete facts: extrapolating what someone *felt more
  strongly about* is exactly as fabricable as inventing a fake cron name. Fixed to
  "I wanted it done safely as much as I wanted it done at all" — additive, not
  comparative, and matches what Dan actually said. When drafting interior states
  (what mattered more, what he was proudest of, what worried him most), don't
  extrapolate from adjacent facts — ask, or keep it non-comparative.
- **eng-todos wasn't audit-only — Dan used it as a general work queue for building
  things from the beginning (his words, 2026-08-18):** "this wasn't all about
  finding issues and queueing up work... I was using eng todos to queue up work and
  build things from the beginning." The post's first cut framed the backlog as fed
  purely by the `eng-audit` cron's findings, which undersold it — closer to
  Shipwright's entropy patrol (scan, find, queue) than what was actually broader:
  a general backlog Dan added build work to directly, not just a remediation queue.
  Drew the entropy-patrol comparison explicitly in the post but flagged it as
  *narrower* than what eng-todos actually was, not equivalent.
- **Cut the todos.json file-churn paragraph (renamed twice, split, merged back)
  entirely** — Dan asked "is this relevant?" and on reflection it wasn't: granular
  file-move detail with no payoff for the reader. The precise git-verified sequence
  is still recorded above in this doc if it's ever needed again. Folded the
  `todos.json` anchor into the section's opening sentence instead, where it
  introduces the general work-queue concept rather than just naming a file that got
  renamed a few times.
- **Section order: crons before the eng-audit/eng-execute application, not after
  (Dan's words, 2026-08-18):** "todos.json was built on crons," so introduce the
  general mechanism before the specific composite built from it. Swapped "Crons
  Were There From Day One" ahead of "The First Thing I Set Bodhi Up to Do in the
  Background." The crons section now closes with a bridge line ("But two other
  crons, running in parallel, were exactly [engineering]") into the eng-todos
  section instead of pivoting straight to billing.
- **Referent clarity: name the two crons explicitly and keep naming them.** Dan
  couldn't tell which entity a given "it" referred to (the work queue, the audit
  cron, the execute cron, or the guardrails) — the draft introduced three-plus
  entities in one paragraph (workload, list, cron one, cron two) then used bare
  pronouns in later paragraphs without re-establishing which one. Fixed by
  consistently calling them "the audit cron" and "the execute cron" (plain English,
  not the `eng-audit`/`eng-execute` slugs) every time the subject changes, and by
  explicitly re-anchoring ("the execute cron's hard stops," "the execute cron could
  rewrite that freely") instead of relying on "it" across paragraph breaks. General
  rule for future posts: when a paragraph introduces more than one actor/entity,
  don't lean on pronouns past the sentence that introduced them — re-name the
  subject at the start of each new point, even if it reads slightly more repetitive.
- **"No W-2, only distributions" was wrong for this timeframe.** Dan flagged it
  (2026-08-18): "since this is feb 2026 i guess we had w-2s so things had just
  become more complicated" — he wasn't fully sure himself, so don't reintroduce a
  specific compensation-structure claim without confirming it first. Cut the clause
  entirely rather than guess at a replacement; the underlying fact (paying each
  other manually) wasn't disputed and stayed in. If Dan wants the "things had just
  gotten more complicated" color back in, ask what specifically changed before
  writing it in.
- **Cut low-value specificity Dan flagged directly:**
  - The `~/.bodhi/workspace`-creation-date / mtime-preservation paragraph — Dan:
    "not sure we need this." Cut it from the post entirely.
  - Internal filenames throughout (`SOUL.md`, `IDENTITY.md`, `crons.json`,
    `comp-calc.ts`, `calculate.ts`, `claude.ts`, `config.ts`, etc.) — Dan: "not sure
    how useful calling out actual file names is... people may not have a reference
    point for them." **Style rule going forward:** describe internal implementation
    files in plain language, not backticked filenames, unless the specific name is
    a narrative anchor the reader was already promised (e.g. `todos.json`, named
    explicitly in post 1's "next up" pointer — that one stays). Named third-party
    products (Gmail, Resend, Claude Code) are fine to keep; they're not the issue.
