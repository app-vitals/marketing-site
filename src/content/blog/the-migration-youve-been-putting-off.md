---
title: "Stop Shipping the 12,000-Line PR: How to Actually Run a Migration With Claude"
date: "2026-05-07"
author: "Dave O'Dell"
category: "Engineering Velocity"
excerpt: "Claude can absolutely write the 12,000-line monolith-to-services migration in two days. It will not ship. Here's the three-piece pattern that turns multi-year migrations into a reviewable PR a day — while your team keeps shipping product code."
readTime: "8 min read"
---

A few years ago, before App Vitals, I was a salaried engineer when Claude Code launched.

We had a giant Ruby on Rails monolith. The kind of codebase where everyone knew about the migration we should do, and nobody was ever going to do it. The architecture diagram from 2019 still sat in the wiki, untouched. The cleanup ticket had been carried over four planning cycles. The number "five years to fully migrate" had been quoted to leadership so many times it had stopped meaning anything.

Then Claude came out. Suddenly someone on the team thought — this is the moment.

They opened a 12,000-line pull request titled, basically, "tech debt fix."

I'm being generous. It might have been closer to 10,000.

It didn't ship. It couldn't ship. Nobody could review 12,000 lines of mechanical refactor with confidence — and code you can't review is code you can't merge, no matter who or what wrote it. The PR sat open for two weeks, picked up a few comments, and quietly closed when the next sprint started.

The lesson stuck with me. **Claude doesn't repeal the laws of code review.**

What Claude does change is the shape of the work. The 12,000-line monster wants to be 30 small PRs. Same migration. Same end state. But every step is reviewable, reversible, testable. Every diff lives inside its own boundary, with its own test, its own rollout window, its own off-switch.

That's the move I wish we'd made then. It's the move we walk every team through now.

## Why Migrations Were Always Hard

Before we get to the pattern, it's worth being honest about what made migrations hard in the first place.

The hard part was never writing the code. Engineers know how to swap an ORM. They know how to extract a service. They know how to upgrade a framework. The patterns are well-documented, the tools are mature, and any senior engineer in your org could sketch the target architecture on a whiteboard in twenty minutes.

The hard part was everything around the code: the review cost, the rollout risk, the testing burden, the coordination tax. A monolith-to-services migration touches hundreds of files, often spanning six teams. Every one of those teams has its own deployment cadence, its own on-call rotation, its own opinions about what "service boundary" means in their context. The mechanical work was always small. The social and operational work was always enormous.

That math is what produced the "50% of engineering for a year" estimate that has killed every migration proposal ever brought to a CFO.

It also produced the standard playbook: do migrations gradually, over years, while shipping product on top. The classic five-year migration was never really five years of code — it was eighteen months of code spread across five years of negotiation, prioritization, and waiting for the right moment.

## The Wrong AI Move

When Claude lands in an organization that has a backlog of avoided migrations, the first instinct is almost always wrong.

The instinct is to point the agent at the codebase, name the target architecture, and let it rip. Claude is happy to oblige. It will dutifully produce a 12,000-line diff that, on the surface, does the migration. The temptation here is real. The dollar cost of the agent run is small. The diff *looks* correct. The migration that has been on the backlog since 2023 is suddenly, apparently, done.

We have watched this story end the same way every time. The PR sits. The reviewers stall. Confidence drops. Nobody can certify that the new code is behaviorally equivalent to the old code, because no human can hold 12,000 lines of mechanical refactor in their head. Tests pass — and nobody trusts them, because the same agent wrote the tests. Rollout never happens. The migration is "done" except for the last and most important step: shipping.

Eventually the branch goes stale, the PR gets closed, and the team learns the wrong lesson. They conclude that AI can't actually do migrations. What they actually demonstrated is that AI can't replace the review and rollout discipline that was always the real bottleneck.

The mega-PR isn't a faster path. It's the *same* path that didn't work before, just with a faster compile step.

## The Right Pattern: Skill, Cron, Learning Loop

Here's what does work. Three pieces. None of them are the AI itself.

**Skill. Cron. Learning loop.**

This is the pattern we walk every client through, and it's the pattern we use on our own work. It compresses what used to be a five-year, fifty-percent-engineering migration into a three-month side project that nobody is fully staffed on.

### Step 1: Pick one small piece

The first slice has to be end-to-end. The first ORM call. The first endpoint. The smallest possible change that exercises the whole shape of the migration — boundary, test, rollout, observability.

Don't pick the easiest slice. Pick the most representative slice. You're learning the workflow here, not optimizing for time.

### Step 2: Do that slice manually, with Claude in the loop

This is where the real engineering happens, and it's the part that people skip when they're chasing the headline. You and the agent work the slice together. You make the architectural decisions. You decide what gets shadowed and what gets cut over directly. You decide what tests need to exist. Claude writes the code, but you're calibrating the workflow.

What you're producing here isn't just the first migrated slice. You're producing the patterns, the guardrails, and the assertions that the rest of the migration will follow.

### Step 3: Have Claude write a skill from what you learned

This is the unlock most teams never reach.

After the first slice, you ask Claude to encode what just happened into a skill. The skill is the codified workflow — the steps it takes to migrate one slice end-to-end. The boundaries it puts in place. The tests it writes. The rollout pattern it follows. The pre-flight checks. The post-flight verifications.

The skill is not a prompt. It's not a snippet. It's a runbook the agent can execute consistently, with all the things you discovered the hard way during slice one already baked in.

This is also where the OpenAI Harness Engineering blog's "golden patterns" idea is doing real work for us — you're capturing the canonical execution shape for this migration, and then enforcing it.

### Step 4: Run the skill on a cron

Once a day, Claude wakes up, finds the next migration target, runs the skill, and opens a small PR.

You review the PR. You merge it. You go back to your product work.

The migration is now happening in the background. The cron is the unlock — it's what turns the migration from a "we need to allocate 50% of engineering for a year" decision into a "one engineer reviews one PR per day" rhythm. That's a different kind of project. It doesn't need board approval. It doesn't need a freeze. It doesn't need a project manager.

### Step 5: Add a learning loop

Every cron run logs what it found, what it had to decide, what surprised it. The skill updates itself. PR ten is cleaner than PR one. PR thirty barely needs review. The migration gets faster as it goes, not slower.

The first few PRs are rocky. Expect that. Plan for it. By the time you're a week in, the agent has stopped repeating the same mistakes, and the diffs start to look almost mechanical — exactly the way you wanted them to look from the start.

## What Still Has to Be True

The pattern works. But it doesn't work on a codebase that isn't ready for it.

If your test suite is unreliable, you cannot trust the agent's PRs. You will spend more time manually verifying than you would have spent writing the migration yourself. We've written about [the six non-negotiables before you turn on autonomous programming](/blog/prepping-repo-autonomous-programming/) — those are non-negotiable here too.

If you don't have shadow reads and writes available — at least the option to run new code in parallel with old code without affecting users — you're going to be doing a lot of manual integration testing, and the agent will run faster than your verification can keep up.

If you don't have an incident-handling pattern for AI-introduced regressions, the first one will scare your team off the whole approach. Decide ahead of time how a bad migration PR gets caught, reverted, and the lesson fed back into the skill.

The fundamentals of engineering haven't changed. Testing infrastructure, planning sessions, gradual rollout, shadow reads/writes, observability, rollback capability — all of these still apply. Claude doesn't replace them. It just lets you run the migration on autopilot once they're in place.

The teams that win with autonomous migrations are the teams that did the prep work first. The teams that fail are the teams that thought the agent was the prep work.

## The New Economics

Here's what this actually does to the spreadsheet.

The old migration economics looked like this:

- 12–18 months of calendar time
- 50% of engineering allocated for most of it
- Product roadmap frozen
- Board approval required
- One person tracking the project full-time

The new migration economics look like this:

- 3–4 months of calendar time
- One engineer reviewing one PR per day
- Product roadmap untouched
- Slots into a normal sprint
- The migration has no project manager

The compression on calendar time gets the headline — "five years to three months" — and it's real. But the compression on engineering hours is the part that should change how you plan. Calendar time went down maybe 5x. Engineering hours went down 50x or more.

That gap is what makes this a leadership question and not just an engineering one.

The migration list at the back of your strategy doc — the one you've been carrying for years, the one you keep meaning to address — used to be a CEO-level decision. Long timelines, big team commitments, real opportunity cost. It made sense to weigh each one against the product roadmap.

It's now an engineering manager's call.

That changes the conversation about technical debt entirely. Debt that you couldn't afford to repay, you can. Debt that wasn't a priority, becomes one. The constraints that justified leaving the migration on the backlog were rational at the time, and they're gone now. The team that picks up that backlog and runs through it in 2026 will, in 2027, have a meaningfully different codebase from the team that didn't.

There's a leadership question your team probably hasn't asked yet: when was the last time you re-evaluated the migration backlog with this new math? If the answer is "we've been carrying that list for two years and the cost-benefit hasn't changed," it has changed. The list deserves another look.

## What We Tell Clients

When we step into an engineering organization to help with autonomous migrations, the first conversation is almost never about the agent.

It's about the backlog. Which migration has been on the list longest? Which one would actually unlock product work if it were done? Which one is the team most afraid of? The answers to those questions usually point at the right slice to start with — and they're questions the engineering leaders in the room already know the answers to. They just haven't been asked recently.

The second conversation is about the prep. Is the test suite where it needs to be? Are the deployment patterns ready for this? Do we have shadow infrastructure? Is anyone going to flinch when the first PR shows up? If those answers aren't all yes, we work on the prep first — because running this pattern on a codebase that isn't ready produces exactly the kind of expensive failure that sets the whole program back six months.

The third conversation is the actual migration. By that point, the question isn't whether it's possible. It's how aggressively to lean in.

The migrations our clients have been putting off for years have started shipping. Not in dramatic, freeze-the-org rewrites — in quiet, daily, reviewable PRs that nobody outside engineering noticed.

That's the version of this story that should have been the default the whole time.

---

*This post is adapted from [The Velocity Lab podcast](https://podcasts.apple.com/podcast/the-velocity-lab/id1888653618), Episode 14: The Migration You've Been Putting Off for Years.*
