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

Rows 7-9 added 2026-08-25 as a topic dump from Dan, not yet scoped individually
— his framing for all of them, verbatim: "all part of the things that earn
their spot in shipwright. the why behind the features." Same thesis as the
series' original "justify complexity" goal at the top of this doc, just
applied to newer, more granular pieces of the system than the original roster
anticipated. Treat rows 7-9 as a backlog, not a commitment to write them in
that order or as three separate posts — scope each one for real when its turn
comes, the way rows 4-6 already got a first pass this session.

| # | Topic | Status | Links |
|---|-------|--------|-------|
| 1 | Cloud agent → PR review origin (`/ca-review-prs`, ships as `pr-review` plugin Feb 4 2026) | **Published** | [#89](https://github.com/app-vitals/marketing-site/pull/89) (merged), [#90](https://github.com/app-vitals/marketing-site/pull/90) (merged, accuracy pass), [#91](https://github.com/app-vitals/marketing-site/pull/91) (open, further accuracy passes) — `src/content/blog/cloud-agent-review-origin.md` |
| 2 | OpenClaw + the original `todos.json` — queuing work with cron jobs before any of this had a name | **Published, done** — LinkedIn companion also live | [#100](https://github.com/app-vitals/marketing-site/pull/100), [#101](https://github.com/app-vitals/marketing-site/pull/101), [#102](https://github.com/app-vitals/marketing-site/pull/102), [#103](https://github.com/app-vitals/marketing-site/pull/103), [#104](https://github.com/app-vitals/marketing-site/pull/104) (all merged) — `src/content/blog/openclaw-todos-origin.md`. LinkedIn post published 2026-08-18 (final as-posted text recorded in PR #104's description, not duplicated here) |
| 3 | The vitals-os merge — Dave brings plan-session/dev-task, Dan brings Bodhi's todos/crons/review habit, they stop being two side projects and become one pipeline. Titled "Build What You Need," built around a 37signals throughline: the Truckee meeting (Lift Workspace) where Dan sold Dave on the model → billing code moving out of Bodhi's workspace to get a real API → the Toggl/Cal.com replacement decision → the two tools merging → Keanu as the first agent deployed for a client to use directly. Timeline: March 19 (Dave's plugin already live via the marketplace) → March 27 (vitals-os born) → April 20 (Keanu). | **PR open** | [#112](https://github.com/app-vitals/marketing-site/pull/112) — `src/content/blog/vitals-os-merge-origin.md` |
| 4 | The task store's real origin: `todos.json` got put behind an interface, a GitHub Issues–backed implementation was built alongside it (a GitHub Projects v2 backend was also tried, per git — `TS-2.1`, 2026-05-25 — before Issues won out), running both was "split-brained" (the agent got confused switching between them), and multi-agent-on-one-repo needs (shared task queue, tighter concurrency control) forced ripping both out and building the task store from scratch. **Expanded scope (Dan, 2026-08-25):** should also cover the task store's actual state model (ready / in-progress / blocked / closed), filtering, and claiming — specifically what happens when multiple agents go after the same task. | Not planned yet — **don't fold this into post 3**, Dan confirmed 2026-08-18 it's its own post | — |
| 5 | System crons + the shipwright-loop dispatcher — patch and deploy commands added, the four-cron model with preCheck gates, and the loop mechanism itself: wake up every minute, check for work across dev-task/review/patch/deploy, execute. **Scoping note (2026-08-25):** per git, the patch/deploy/four-cron work happened in the *same week* as the task store rebuild (`SWC-1.1` patch command 2026-05-26, `SWD-2.1` deploy command 2026-05-26, `SWC-1.5` four-cron model 2026-05-27 — task store work spans 2026-05-25–28). Not clearly a separate era from post 4 chronologically. Dan raised (2026-08-25) whether this needs its own post or folds into post 4 — undecided, flagged for scoping when we get there. | Not planned yet | — |
| 6 | Open-sourcing Shipwright — the plugin's extraction from the vitals-os monorepo into its own repo (`app-vitals/shipwright`, scaffolded 2026-06-06) and the ~10-day phased migration of every live production agent off the homegrown runtime and onto the new harness (canary-first on `okwow`, then `fern-dan`, `sideby-dan`, `warchild`, `keaunu` in that order), ending in a single commit deleting the entire legacy `agent/` workspace (17,165 lines, 107 files, 2026-06-18). Well-documented in git already — see this session's research. Matches the public timeline's "June 2026: Shipwright transitions from marketplace to independent repository." | Not planned yet | — |
| 7 | The metrics journey — PostHog first, then a move to Postgres, then a series of accuracy improvements. Why each move happened, not just that it happened. | Not planned yet, topic only (Dan, 2026-08-25) | — |
| 8 | Observability across a fleet of autonomous agents — agent cron logs, the work queue itself, Sentry logs, shipwright-loop's own logs, PR findings, PR events. How they gained visibility into what a fleet of agents was actually doing, not just what it shipped. | Not planned yet, topic only (Dan, 2026-08-25) | — |
| 9 | HITL (human-in-the-loop) — what actually needs a human in an otherwise autonomous pipeline, and when/why a task gets blocked pending one. Likely pairs well with the task store's state model (row 4) since `blocked` is a task-store state, but Dan listed it separately — worth checking at scoping time whether it's its own post or a chapter of row 4. | Not planned yet, topic only (Dan, 2026-08-25) | — |

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

- **A LinkedIn commenter (Cole McIntosh) caught the same vagueness the blog post
  had, post-publication (2026-08-18):** "Went from a Pi in February to a shared
  task store running the whole pipeline — that's a fast jump." "Early version of
  the shared task store" was honest but vague enough to read as more continuity
  than actually existed. Dan's reply to the comment had the concrete grounding the
  post itself was missing: the execute cron built locally, verified with lint and
  tests, then stopped — no PR, no review or patch loop, no deploy at all. A
  *separate* daily cron snapshotted to git purely for historical record. Added this
  directly to the post (right where the execute cron is first described) rather
  than leaving it implied by the "no git push, no deploy" hard-stops list.
  **Lesson: real reader feedback post-publication is exactly the kind of accuracy
  check this series relies on — treat it the same as Dan's own corrections, not as
  a separate lower-priority feedback channel.** Also: Dan's same reply had a second
  detail not yet used — "the biggest gap [after OpenClaw] was channels, the Slack
  integration and voice-to-text support. I never added voice, but Dave did a month
  or two later." **Status: parked, undecided.** Dan: "i don't know if
  slack and voice make it in to this series, but i could be convinced otherwise."
  Doc's take when asked: the Slack half has a real home — it'd explain *why* the
  Telegram→Slack transition (already covered in "Slack Was the Other Unlock") took
  real effort, since there was a genuine gap right after leaving OpenClaw where
  Bodhi had no channel at all. The voice-to-text half is Dave's thread, not Dan's —
  the scope note above already draws that line for this series. Not added to the
  post; revisit only if Dan decides he wants it, don't reintroduce unprompted.
- **Post-merge polish, after PR #103 (2026-08-18):** two small fixes on a fresh
  branch since #103 was already merged. (1) Added a link to
  [openclaw.ai](https://openclaw.ai/) on first mention — the post references
  OpenClaw extensively (including in the title) but never linked it; matches the
  series' pattern of citing real external sources on first mention. (2) Dan flagged
  "Nothing else in this post... works without that space underneath it" as
  overstated — "works without" asserts strict impossibility, which doesn't hold for
  every item listed (crons/schedules don't strictly require persistence the way the
  todo list does). Softened to "assumes that space is there" — accurate to what's
  actually true without the absolute claim. **Also considered and declined:**
  visuals/diagrams for the post — genuinely could help the densest section (the
  three-way entropy-patrol/task-store mapping), but no blog post on this site has
  ever embedded an image (plain markdown only, `.prose img` CSS hook exists but
  unused across all ~48 posts), so it'd be a first with no house style to match and
  no image-generation capability on this side — Dan decided to skip it for now.
- **Reordered the "echoes into Shipwright" paragraph to lead with execute cron/
  `todos.json`, per Dan's consistent preference (2026-08-18): "focus on eng execute
  and todos.json first and then audit cron."** The paragraph still had audit-cron-
  first ordering left over from before the section was rebalanced. Reordering it
  naively would have recreated the exact referent bug fixed two commits earlier
  (moving the audit mention next to "the path from one to the other" makes that
  closing line ambiguous again). Fixed by moving "the path from one to the other"
  to sit directly after the list/execute-cron → task-store/loop mapping — its actual
  referent — and pushing the audit-cron mention to the very end of the paragraph
  ("The audit cron, meanwhile...— always the smaller half of the pair"), which also
  reinforces the "audit is secondary" framing by literal position. **Reinforces the
  standing lesson: reordering for emphasis and reordering for correctness aren't
  independent — check both every time.**
- **Added a synthesis beat to the billing section tying it back to everything
  established earlier (Dan, 2026-08-18):** "make the point that bodhi wrote this
  code in his workspace and executed it using crons... and used lint and test to
  verify as well as the guardrails." Billing was introduced as if starting fresh;
  it's actually the payoff of every pattern the post already built up — persistent
  workspace, cron execution, lint/test verification, guardrails. Added: "Bodhi
  wrote the fix the same way it did everything else by then: code living in its own
  workspace, run on a cron, checked with lint and tests, bound by the same
  guardrails as everything else it touched." Good general pattern for later
  sections too — check whether a section's opening treats an established theme as
  brand new instead of calling back to it.
- **Rebalanced "The First Thing I Set Bodhi Up to Do in the Background" — execute
  cron + `todos.json` are the story, the audit cron is a nice-to-have (Dan,
  2026-08-18):** "the focus should be on todos.json and eng execute... the audit is
  a nice to have and was inspired by openai['s harness engineering
  writing'](https://openai.com/index/harness-engineering/)." Prior drafts treated
  the audit/execute pair as co-equal. Reworked: execute cron + the general work
  queue lead the section; the audit cron is introduced second, explicitly as a
  nice-to-have, with a real citation to its source of inspiration (a genuine
  external reference, fits the series' whole "specifics being true" thesis). Also
  reworded the Crons section's bridge line from "two other crons... were exactly
  that" to singular ("one more piece ran in parallel") to match the new emphasis.
  **Caught a referent bug the reorder introduced:** moving the audit-cron/entropy-
  patrol mention to right before "the path from one to the other" made that closing
  line's "one"/"the other" ambiguous (audit↔entropy-patrol vs. list↔task-store).
  Fixed by keeping the audit/entropy-patrol aside brief and early in that paragraph,
  then building to the list/execute-cron → task-store/loop mapping right before the
  closing sentence, so "one to the other" has an unambiguous, adjacent antecedent
  again. **Standing lesson, reinforced again:** any time content gets reordered or
  re-weighted, re-check every pronoun/comparative in the surrounding sentences —
  this is now the single most common bug class in this post's edit history.
- **Added Dan's real concrete evidence for "I knew Claude Code's internals a lot
  better" (2026-08-18):** "the damage control plugin and knew how to configure
  allow and deny lists" — he already had a damage-control plugin built for Claude Code
  and already knew how to configure its allow/deny permission lists. The prior
  version just asserted the claim abstractly; this makes it specific and verifiable
  in spirit, matching the series' whole thesis (trust through specifics being true,
  not assertion). Worked into the Trust section right where the abstract claim was.
- **Bridge sentence into Trust needed a second dimension: autonomous execution, not
  just self-modification (Dan, 2026-08-18):** "running code and/or skills without a
  human being in the loop unless it decided to stop an ask for approval." Rewriting
  its own code was already in the bridge line; the bigger point Dan wanted was that
  *running* code/skills without a human checkpoint was the default, and human
  approval was something the agent itself chose to invoke, not a structural gate
  someone else controlled. Updated: "able to rewrite its own code, run it, and act
  on skills without a human in the loop unless it decided on its own to stop and
  ask." That's a scarier, more specific claim than self-modification alone, and it's
  the more accurate reason trust had to be built deliberately.
- **Moved "The Part of OpenClaw That Actually Mattered" earlier, before Trust, per
  Dan's structural note (2026-08-18):** "maybe the part of openclaw that actually
  matter should be before trust and could be altered slightly to help frame why
  trust was important for an ai agent running on it's own hardware and capable of
  modifying itself." New order: Who Bodhi Was → **The Part of OpenClaw That Actually
  Mattered** → Trust Had to Be Built → Slack → Crons → eng-todos → Money → Handoff.
  Added a closing bridge sentence to the hardware section ("an agent with its own
  machine, able to rewrite its own code, is exactly the kind of thing you should be
  nervous about handing real autonomy to — that's where trust actually had to
  start") so it sets up Trust's opening causally instead of Trust starting cold.
  **Correction (still 2026-08-18):** initially also cut "the hardware changed, a Pi
  on my desk to a volume in the cloud" out of caution about forward-referencing the
  March 4 migration — overly cautious. On reflection with Dan, that detail isn't
  about the March 4 OpenClaw→Claude Code migration at all (Bodhi likely stayed on
  the physical Pi through that); it's a present-day comparison to today's cloud-PVC
  Shipwright agents, same timeless "today" framing as the sentence right before it.
  Restored. **Lesson: reordering sections isn't just cut-and-paste — recheck every
  sentence in a moved section for references to content that used to be earlier but
  is now later** (or vice versa) — but also distinguish a genuine forward-reference
  from a present-day/timeless comparison before cutting; not every mention of a
  later-feeling detail is actually unsafe to keep.
- **A second, distinct "encoding" bug found on a full-article pass: forward-
  referencing later sections before they exist to the reader.** Dan: "in this
  statement we kind of get ahead of the article by talking about things other
  sections before introducing them." Two instances, both in "The Part of OpenClaw
  That Actually Mattered": (1) "The crons... weren't the biggest thing that carried
  over" named crons two sections before the Crons section actually exists; (2)
  "Everything else in this post — the todo list, the crons, the eng-audit loop —
  only works because..." named three specific concepts, none introduced yet at that
  point (todo list and eng-audit loop don't appear until two sections later). Fixed
  by (1) dropping the crons half of the comparison, keeping only the trust-building
  callback (which *is* valid — it's the immediately preceding section), and (2)
  genericizing the list to "not the lists, not the schedules, not the safety rails"
  — vague common nouns that preview what's coming without requiring the reader to
  already recognize them as named concepts. **This is a different failure mode from
  edit-history leakage** (referencing our discarded drafts) even though both read as
  "assumes context the reader doesn't have." Checklist for future full-article
  passes: for every specific named thing a sentence references, confirm it's either
  (a) already introduced earlier in *this* article, (b) a real-world present-day
  fact needing no article context, or (c) an explicitly linked cross-post
  reference — anything else needs to go generic or move.
- **Dropped "fixed the small ones, broke the large ones down" from the execute-cron
  description — agreed with Dan's read.** He confirmed the mapping nuance flagged
  above was real, then asked whether to just gloss it: "the breaking things down is
  key, but we don't really say why here." Rather than explain the decomposition
  behavior's actual significance (which would need real space to do right — why
  breaking large tasks down mattered, what happened to the pieces), cut it and let
  the sentence focus purely on executing: "picked the next item... and worked
  through it." Simpler and still accurate; doesn't assert a mapping to
  today's shipwright-loop that isn't quite right. If a future post wants to tell
  the decomposition story properly, it deserves its own explanation, not a
  three-word aside.
- **Same edit-history-leakage bug recurred in the very next sentence I wrote.**
  "The audit cron was never more than entropy patrol is now" only makes sense as a
  rebuttal of the "broader than entropy patrol" claim I'd just walked back — a
  reader never saw that claim, so "was never more than" reads as an unexplained
  defensive hedge. Dan: "you're doing it again." Fixed to a plain positive
  statement ("did what entropy patrol does now"). **This is now a standing
  self-check, not a one-off:** after any correction, reread the very next sentence
  I write for "was never," "isn't just," "wasn't really," etc. — these constructions
  are the tell that I'm still arguing against the discarded draft instead of just
  stating the corrected fact.
- **Re-verified the corrected mapping directly against the shipwright codebase**
  (`plugins/shipwright/CLAUDE.md`) after Dan asked me to reread the section: entropy
  patrol is explicitly documented as a "maintenance task" separate from "the core
  shipwright loop (dev-task, review, patch, deploy)," and the loop dispatches work
  from the task store regardless of source — both match what the post now says.
  **One nuance not written into the post, flagged for awareness:** the execute
  cron's "fixed the small ones, broke the large ones down" behavior doesn't map
  purely onto today's shipwright-loop (a pure dispatcher) — the decomposition part
  is closer to what plan-session/dev-task do now. Bodhi's single execute cron did
  the work that's since split across multiple specialized pieces. Didn't add this
  distinction to the post itself (it's more architectural precision than a blog
  post needs), but worth knowing if post 3 or later posts dig into how the loop
  actually evolved.
- **Corrected the entropy-patrol/task-store architectural mapping — it's a
  three-way split, not a two-way "broader" comparison (Dan, 2026-08-18):** "it's
  bodhi split as well? the audit cron was just about finding things like entropy.
  the todos.json and eng execute were the early versions of task store and the
  shipwright loop." My first version said "what I built for Bodhi was broader than
  entropy patrol" as a single comparison — wrong framing. Verified against the
  actual skill definitions (`plugins/shipwright/skills/entropy-scan/SKILL.md`,
  `entropy-fix/SKILL.md`) before Dan's correction: entropy-scan/entropy-fix really
  is scan-and-report-only, same narrow scope as the audit cron. The correct mapping
  is three pieces, not two: **audit cron ↔ entropy patrol** (both find-only, narrow),
  **`todos.json` ↔ the shared task store** (the general queue), **execute cron ↔
  the shipwright loop** (the thing that actually works items off the queue,
  regardless of source). Entropy patrol today is just one feeder into the task
  store, the same way the audit cron was just one feeder into `todos.json`
  alongside things Dan added by hand — that's where "broader than just maintenance"
  actually lives, not in a comparison between the audit cron and entropy patrol
  directly. **Lesson:** verifying a claim's factual accuracy (entropy-scan really is
  narrow) doesn't mean the *framing* built on top of it is correct — check the
  structure of the comparison itself, not just whether each piece is independently
  true.
- **Another dangling-referent bug, same family as the earlier ones — "though this
  was broader from day one" pointed at the wrong noun.** Dan: "what was broader?"
  Grammatically "this" resolves to the closest antecedent, "entropy patrol" (the
  sentence right before it) — implying entropy patrol was broader, when the
  intended meaning was the opposite: Bodhi's original system was broader than
  entropy patrol's current scope. Fixed by naming the subject explicitly ("what I
  built for Bodhi was broader than that") instead of leaving a bare "this" to
  resolve on its own. **Running tally of this exact failure mode in post 2:**
  dangling "it" (crons vs. queue vs. execute cron, twice), "the reason why" with no
  stated object, and now this — comparative/referential pronouns are consistently
  the highest-yield thing to scrutinize on a self-review pass, not just a one-off.
- **"Built within about a day of the first findings showing up" outgrew its own
  premise.** Dan flagged it as feeling outdated — likely because the eng-todos
  section now establishes `todos.json` as a general work queue used from day one
  (not something that only existed once audit findings triggered it), so a timing
  claim anchored to "the first findings" no longer fits cleanly with the broader
  framing that replaced it. Cut rather than tried to patch — the paragraph's actual
  point (deliberately designed, not autonomous initiative) doesn't need the date
  anchor to land. **Pattern to watch:** when a section gets reframed (audit-only →
  general work queue, here), go back and check whether earlier supporting details
  still fit the new frame, not just whether they're independently still true.
- **Missed a main theme on the first pass: OpenClaw's own hardware is what became
  the PVC pattern (Dan's words, 2026-08-18):** "one of the main things about
  openclaw that carried over to shipwright agents. openclaw was running on it's own
  hardware. in shipwright it's the pvc that survives shipwright... self modifying
  software/agents that run in their own isolated environment." Added a dedicated
  section, "The Part of OpenClaw That Actually Mattered," right after the Claude
  Code migration and before the Slack section — Bodhi's Raspberry Pi wasn't just
  a fun detail, it established the pattern (agent + durable, isolated, writable
  space of its own) that everything else in the post depends on: the todo list, the
  crons, the eng-audit loop all only work because that persistent space exists
  underneath them. Also removed the vague "heartbeat crons, delegation axes... all
  carried forward" clause from the Trust section — it was never explained and this
  new section replaces it with something concrete. **Lesson for future posts:**
  when Dan describes what "carried over" from one system to the next, ask whether
  it's an infrastructure/architecture pattern (durable, load-bearing, worth its own
  section) versus a feature-level detail (a clause is enough) — don't default to
  folding everything into one aside.
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
- **Task store hint: added, but light — a one-clause aside, not the mechanism.**
  First instinct was to either omit it entirely (too complex to tease accurately) or
  spell out the real arc (too much for one sentence). Dan's actual ask was simpler:
  something as brief as the existing entropy-patrol aside in the same paragraph.
  Landed on: "That queue is also an early ancestor of the shared task store the
  whole pipeline runs on now, though the path between them is its own story, for
  another post." No mechanism claim, just acknowledges the throughline exists. See
  the Post Roster's row 4+ for the real arc (interface → GitHub Issues
  implementation → split-brain confusion → multi-agent concurrency needs → task
  store built from scratch) — that's still its own future post, not part of post 3.
- **Billing section was changelog trivia, trimmed to the actual point.** Dan asked
  "is this relevant? what's the point we're making?" about a paragraph listing six-
  plus technical changes (payments/triggers/invoices/notes, Resend→Gmail, shared
  calc library, date-range flags, bonus math fix, period-end fix). The section's own
  point — stated in its closing line — is "small bugs = real money computed wrong,"
  which only needs one or two concrete examples, not a full changelog. Trimmed to
  the bonus-math bug and the period-end bug (the two that most vividly show "real
  money wrong until found") plus the over-hours approval-gate detail (ties back to
  the money-gets-approval-gates pattern from the crons section). Cut the Resend→
  Gmail swap and the shared-calculation-library migration — accurate, but neither
  serves the point being made. **Recurring pattern worth naming:** when a paragraph
  is a list of technical changes, check whether it's illustrating the section's
  actual point or just proving research was thorough — the latter belongs in
  PLAN.md, not the post.
- **Even after trimming, the paragraph still "felt kinda random" to Dan** — the
  bugs were listed first, then the thematic payoff ("you build careful approval
  gates because...") landed two sentences later as a separate paragraph, so the
  reader had to connect the dots themselves instead of the prose doing it. Fixed by
  merging evidence and point into one flow: state that the bugs are *why* the
  pipeline got careful, list them as direct support for that claim, then show what
  "got careful" actually looked like (approval gate, over-hours flagging), before
  the closing paycheck line. **General lesson:** don't separate concrete evidence
  from the point it's supporting across a paragraph break and trust the reader to
  link them — say the causal connection explicitly, in the same breath as the
  evidence.
- **"The bugs it turned up" had a dangling "it" and, worse, wrongly implied
  autonomous discovery.** Dan: "you mean the bugs it introduced when coding and i
  discovered, or are you saying bodhi found them? i actually found these issues
  while testing and/or exploring and verifying the code output." Two separate
  problems in one sentence: (1) "it" had no clean antecedent after the paragraph
  merge, (2) even if it had, the phrasing credited discovery to the pipeline/Bodhi
  rather than to Dan's own manual testing and verification. Fixed to state
  explicitly that Dan found these himself, testing and verifying the code. **Don't
  default to passive/agentless phrasing ("bugs it turned up," "issues that
  surfaced") for anything Dan actually did by hand** — attribution of who-found-what
  matters a lot in this series, since the whole trust narrative hinges on human
  verification, not autonomous correctness.
- **"I found the reason why" had no stated object — Dan: "the reason why what?"**
  The phrase forward-referenced a point ("so the pipeline got careful") that hadn't
  been stated yet, instead of connecting back to something already established
  (the prior paragraph's "forced the whole pipeline to get reliable"). Fixed to "I
  found out why it needed to be reliable" — ties back to an antecedent the reader
  already has, instead of dangling forward toward one they don't have yet. **General
  lesson, same family as the earlier dangling-negation fixes:** any clause shaped
  like "the reason why," "that's why," or "here's what changed" needs its referent
  either already on the page or immediately following in the same sentence — never
  two-plus sentences ahead.
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

## Lessons From Post 3 (apply going forward)

- **Structure problem caught by Dan mid-draft: a list of facts isn't an origin
  story.** First full draft had one section per topic (billing move, Toggl/Cal
  decision, tool merge, PR stats, planning gap, review, state of Shipwright,
  Keanu) with no causal connection between them — each one a fact, not a
  consequence of the fact before it. Dan: "that kinda reads as a series of
  bullet points rather than an origin story. how can we improve the flow."
  Fixed by getting an actual spine from Dan rather than guessing at one — see
  next entry. **General lesson:** if a draft feels like a list, it's missing a
  throughline, not missing more content. Ask for the spine directly instead of
  adding more transition sentences to paper over its absence.
- **The real spine came from Dan directly, as a causal chain, not a theme:**
  "the 37 signal piece — led us to building what we need — led us to combining
  what we'd built — led us to landing our first client using our product
  (shipwright) — and we still use every single piece of what we built daily."
  Restructured the whole post around this chain (merged the billing-move and
  Toggl/Cal sections into one "build what we needed" beat; made the tool-merge
  section open with an explicit causal bridge — "building real things meant we
  needed a real way to build them" — instead of arriving as an unrelated new
  topic; folded PR stats, the planning-quality gap, and the state-of-Shipwright
  snapshot into one "fast wasn't the same as good" arc instead of three
  standalone data sections; added a closing paragraph explicitly naming all
  four links in the chain). **Lesson for future posts in this series:** ask for
  the causal chain in the user's own words before restructuring — post 2 had an
  equivalent single-sentence spine ("trust had to be built, not assumed") from
  the start; post 3 didn't, and the draft suffered for it until asked for
  directly.
- **The actual origin scene wasn't in git and had to be asked for directly.**
  The whole post opened on the dry fact ("On March 27, 2026, vitals-os got its
  first commit") until Dan volunteered the real scene: a weekly in-person
  meeting at [Lift Workspace](https://www.liftworkspace.com/) in Truckee, where
  Dave wanted to build a product and Dan didn't — he wanted to optimize the
  business — and Dan sold Dave on the 37signals model as the resolution. That
  became the actual opening of the post, with the causal-chain spine (above)
  following directly from it. **Lesson, same family as post 2's `bodhi-workspace`
  finding:** the load-bearing scene for an origin post is very often not
  git-verifiable at all — it's a conversation, in a room, that git has no record
  of. Ask "was there a specific moment" directly and early, don't wait for it to
  surface as an aside.
- **Same pattern, second instance: the Keanu onboarding scene.** Initial draft
  described Keanu's first-client deployment abstractly (per-client isolation,
  architecture requirement). Dan supplied the actual scene — provisioning done
  ahead of an onboarding call, waiting for the client to message first, Keanu
  running the onboarding ritual, the client skipping the back-and-forth and
  pasting in a complete markdown file he'd already built himself in Claude —
  and asked to verify the mechanism against the code rather than take his
  memory as the final word. Found it exactly as described in
  `agent/src/setup.ts`'s `BOOTSTRAP_TEMPLATE` (`vitals-os` repo, commit
  `68158957`, 2026-04-14): the scripted opening line is verbatim "Hey. I just
  came online. Who am I? Who are you?" That commit's sibling plan
  (`9c019159`, same day) is explicitly titled "openclaw-inspired workspace
  bootstrap" — meaning this onboarding ritual is a direct, provable callback to
  the OpenClaw onboarding beat from post 2, not just a thematic echo. **Lesson:**
  when a scene is offered as memory with "maybe check it in the code," always
  check — this one turned a good anecdote into a verified, quotable detail with
  a real cross-post callback.
- **"Parallel work" framing on Toggl was cut at Dan's request as potentially
  controversial, with no further explanation given or asked for.** Original
  draft said Toggl's single-timer limit broke "the moment you have agents and
  humans working the same client in parallel" (extrapolated from the actual
  README wording, "broken for parallel agent work across clients" — the draft
  added "and humans" and "same client," neither in the source). Dan: "we don't
  need to mention parallel work re: toggl. it may still be controversial."
  Removed the elaboration entirely rather than press for the reason. **Lesson:**
  when a correction comes with "it may still be controversial" and no further
  detail, that's a stop sign, not an invitation to ask why — cut and move on.
- **The billing-code-moving beat needed a real "why," not just "it moved."**
  Original draft framed the migration as inevitable ("it moved because it was
  needed") without saying what was actually missing. Dan supplied the concrete
  gap: the code already worked, tested and linted, but only Bodhi could touch
  it, and only through chat — no API, no way for another agent to hit it, no
  web interface. That's what "make it real" meant. Rewrote the section around
  that specific limitation instead of the vaguer "it needed to move."
- **The Toggl/Cal.com replacement vision needed the actual end-to-end loop
  spelled out, not just "these tools were broken."** Dan supplied the real
  shape: schedule an event with a client's email address → routes to the
  correct calendar → time tracking against the engagement → invoicing off the
  actual hours (including drafting the invoice emails themselves) → payment
  tracking with reminders. Also added Dave's specific, human complaint about
  Cal.com — hating a separate browser tab open per calendar, wanting one
  surface — alongside the calendar-routing-bug detail already sourced from the
  README/PRD. Both replaced a more generic "these tools were broken" framing.
- **"Out of a mobile project he didn't know how to ship" — cut on Dan's
  question, not correction.** Dan asked "should we say this?" rather than
  flagging it as wrong. On reflection: it's Dave's own origin beat from his own
  published post, and the series' scope note already says Dave's material only
  gets mentioned as "pulled in," not retold in detail. Replaced with a link to
  Dave's post instead of restating his story in Dan's voice. **Lesson:** when a
  detail is accurate but sourced from a co-author's own post, prefer linking
  over retelling, even under a scope note that would technically permit a brief
  mention — restating someone else's beat in your voice reads as claiming it.
- **PR-volume stat needed an honest caveat, added after the number was already
  in the post.** Dan, after seeing the 628-PRs-in-25-days stat drafted: "the
  sheer volume of prs was partially shipwright and partially us being stoked on
  it. but it was still part time work. we were delivering work for clients
  throughout the entire process." Added directly after the stat rather than
  letting it imply full-time, tooling-only velocity. **Lesson, consistent with
  post 2's "no invented specificity" rule applied to the opposite direction:**
  a true, sourced number can still mislead by omission — ask what context the
  number needs before publishing it standalone, don't wait for the correction.
- **A factual correction that came from research, not from Dan:** the draft's
  transition — "before either of us called any of this Shipwright" — was
  wrong. Dan: "it kinda did have a name? shipwright was the plugin name, but
  didn't become the name of the entire project until later." The name existed
  from the plugin's actual first commit (`212143e`, 2026-03-19); what changed
  later was the plugin becoming *the* system rather than *a* plugin among
  several in the shared marketplace. Dropped the "before it had a name" hook
  entirely rather than patch it — the 628-PR stat didn't need that framing to
  land.
- **Scope check, mid-conversation, before drafting:** Dan confirmed (2026-08-25)
  the review-merge story (`pr-review` vs. shipwright's original bundled review
  command, converging via Dan's 2026-04-15 rewrite) should stay in the post
  only as a single light-touch paragraph, not the multi-commit deep dive
  research surfaced — closing the loop post 2 opened ("Dan brings... review
  habit") without turning it into its own subplot.

## Context Gathered for Future Posts (2026-08-25 research session)

Research done while scoping post 3 went well past what post 3 needed. Recording
it here so posts 4-6 don't re-derive it from scratch.

### Post 6 (open-sourcing Shipwright) is already substantially pre-researched

Full verified timeline, in `vitals-os` repo history:

- `2026-06-06` — Warchild scaffolds `app-vitals/shipwright` as a standalone OSS
  repo from nothing (`0dd2b9d8` + follow-ups same day) — this is the actual
  extraction moment, not a gradual drift.
- `2026-06-08` — `sydecar-shipwright`, an early test/canary agent, decommissioned
  (`e19a57d7`) — looks like a dry run to validate the new harness before
  touching any real agent.
- `2026-06-11` to `06-12` — migration tooling built: PR #1472 ("Bodhi→Shipwright
  migration tooling") and PR #1478 (`shipwrightAgents[]` Helm block + 5 GCP
  secrets). PR #1472's commit body is unusually rich — worth reading directly
  when drafting, not just summarizing — includes a `migrate-agent-to-shipwright.ts`
  script, DRY_RUN support, and a note that it was "verified read-only against
  Bodhi's 30 live crons (19 user / 11 system)" before running for real. Explicit
  phased rollout order stated in the commit: **okwow → fern-dan → sideby-dan →
  warchild → keaunu** (client names in that list need anonymizing the same way
  post 3 anonymized Fern/HiFriends — the *agent* names are fine, the engagements
  behind fern-dan/keaunu are not).
- `2026-06-12` — okwow migrated first, explicitly as the canary (runbook:
  "okwow-canary lessons before fern-dan rollout").
- `2026-06-16` — sideby-dan + warchild flipped onto Shipwright; secrets for the
  already-migrated okwow/fern-dan dropped.
- `2026-06-17` — keaunu (last agent) enabled; migration runbook deleted same day,
  marked complete.
- `2026-06-18` — the decommission, one commit (`c427c7a6`, PR #1611): **17,165
  lines deleted across 107 files** — the entire legacy `agent/` workspace (63
  source files), the standalone `helm/agent-service/` chart, the interceptor
  service, DB tables, the `AGENT` role, and the embedded shipwright plugin copy.
  Commit message literally says *"All agents now run via Shipwright harness."*
  Same day, two companion commits: `8167113f` (remove shipwright plugin
  registration) and `3874b8fa` (drop agent DB tables + AGENT role) — all three
  read like one deliberate, planned cutover day, not three unrelated cleanups
  that happened to land together.
- Corroborated independently by the public timeline at shipwrightharness.com/story:
  *"June 2026: Shipwright transitions from marketplace to independent repository
  with sanitized internal references."*

### The named agent-persona fleet (relevant across posts 4-6, especially 6)

Git author / co-author history in `vitals-os` shows a real multi-agent fleet,
overlapping in time, not one persona renamed over and over:

| Persona | Active (co-author date range) | Role |
|---|---|---|
| Sully | 2026-03-29 → 04-19 | Dave's hub agent — early planning/reconciliation, Cal features |
| Bodhi | 2026-05-03 → 07-17 (bracket-tag commits from 03-28) | Dan's hub agent — infra maintenance, chart/BASE_TAG bumps, changelog sync |
| Warchild | 2026-05-12 → still active as of 08-20 | Broadest scope — test coverage, canary CI, deploy, Shipwright pipeline internals, scaffolded the standalone shipwright repo |
| Rosie | 2026-05-27 → 06-02 | Short-lived — built Shipwright's own check-patch/check-review-patch/test-readiness internals, right in the task-store-rebuild window (relevant to post 4/5) |
| Doc | 2026-07-05 → present | Current identity — vitals-os + Shipwright ops, changelog sync, docs refresh |
| The Dude | 2026-07-02 → still active as of 08-20 | Growth/marketing persona — even authored its own IDENTITY.md/SOUL.md |

Underlying Claude model co-authorship also shifts across this whole window if a
future post wants that texture: Opus 4.6 (03-27→04-16) → Opus 4.7 (04-16→05-27)
→ Opus 4.8 (05-28→07-24), with Sonnet 4.6 running in parallel 03-27→07-17, then
Fable 5 taking over 07-03→08-20.

### Open threads — unresolved, flag for whoever picks these up

- **`app-vitals/bodhi` 404s for current repo access**, despite being cited as a
  research resource for post 2. Either needs the same explicit access grant the
  `marketplace` repo got (2026-08-12), or it's genuinely gone. Check before
  assuming it's usable.
- **"OpenClaude" (Dave's `accidental-devin-alternative.md`) vs. "OpenClaw"
  (Dan's `openclaw-todos-origin.md`, linked to openclaw.ai)** — naming
  discrepancy between the two already-published posts, never resolved this
  session. Worth reconciling before it gets cited a third time in a future post.
- **`feature-dev:code-reviewer`** — an external agent-type dependency in
  shipwright's original `review.md` (marketplace repo, commit `212143e`,
  2026-03-19), never traced to any repo in `app-vitals`. Possibly related to
  the `docs/superpowers/` convention referenced elsewhere in `vitals-os`, not
  confirmed. Low priority unless a future post needs to explain review's full
  lineage in more depth than post 3 did.
- **"Dan owns all architecture decisions"** — was in `vitals-os` CLAUDE.md at
  some point, cut from post 3 at Dan's request because provenance is uncertain
  ("maybe an outage," his words 2026-08-25). Don't reuse in a future post
  without first re-verifying where it actually came from.
