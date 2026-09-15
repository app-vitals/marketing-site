---
title: "One Winner Per Tick"
date: "2026-09-15"
author: "Dan McAulay"
category: "Company Updates"
excerpt: "We tried to fix cron scheduling twice with tricks — stagger the times, fuse two commands into one — and both tricks broke the moment the pipeline grew past what they were built for. One of them broke quietly enough that nobody noticed for five weeks. Here's how a pile of specific fixes turned into one dispatcher that ticks every minute and picks a single winner."
readTime: "9 min read"
---

*Fifth post in the series on how Shipwright actually came together — [the first one](/blog/cloud-agent-review-origin/) covered the cloud review pipeline, [the second](/blog/openclaw-todos-origin/) covered OpenClaw and the original todo list, [the third](/blog/vitals-os-merge-origin/) covered the merge into Vitals OS, [the fourth](/blog/task-store-origin/) covered the task store. That post ended with a promise I want to pick back up directly: why the whole system polls instead of reacting to events, and why a command called `patch` had to exist before the rest of the pipeline could narrow back down to what it was actually supposed to do. This one's that story — how four separately-scheduled crons, patched and re-patched by hand for months, turned into `shipwright-loop`, the single dispatcher that actually runs the pipeline today.*

On May 31st, `review-patch.md` shipped — a single command that would run review and patch back to back, plus its own precheck script to decide when to bother. Inside about a day it needed a fix: a skip condition it had shipped with turned out to be wrong and got reverted. By June 1st it had already been rewritten from scratch — not deleted, pared down into a thin orchestrator that just called `/shipwright:patch` and `/shipwright:review` as fresh sessions and looped between them until both came back with nothing to do. One command went from new, to broken, to rebuilt, in about 36 hours. And the version that replaced it kept running for another six weeks before anything better existed.

That's not the kind of story you tell before explaining what came before it, so here's what came before it.

## Where Four Crons Came From

The pipeline started with two crons. `shipwright-execute` ran at ten minutes past the hour; `shipwright-review` ran at forty-five. Staggering them by hand was easy — there were only two things to keep apart.

Neither cron was doing one job, though. `shipwright-execute` reconciled merged PRs, deployed anything approved and green, and picked up the next item on the todo list, all in one script. `shipwright-review` wasn't much cleaner — it evaluated PRs, but it also tried to fix its own findings, gated re-review on whether old comments looked resolved, and handed approved work off to deploy. Two crons, but the actual responsibilities inside them were already tangled together well before anyone touched the schedule.

Late May, we pulled those apart for real. `patch` became its own command — scan your own open PRs, fix what review flagged. `deploy` became its own command — check approval and CI, ship it. `review` got stripped down to one job: evaluate PRs and post findings, nothing else. Four clean responsibilities where there used to be two messy ones. Which meant four crons where there used to be two — and hand-staggering four things doesn't work the way it did for two. So we didn't. All four went on identical thirty-minute schedules. That wasn't an oversight — staggering by hand doesn't scale past a couple of slots, and it felt like exactly the kind of hack we shouldn't be building permanent scheduling around. Better to run them together and deal with whatever that caused than keep hand-tuning cron offsets forever.

The same day, each of the four got something the two-cron model never had: a precheck script. A full agent session is the expensive part of any of this — spinning up Claude, giving it tools, letting it read and reason — and most ticks of most crons find nothing to do. So before any of that starts, a small, plain script runs first and answers one narrow question: is there actually work here? `check-dev-task.ts` looks for a ready task. `check-review.ts` looks for a PR that needs eyes. `check-patch.ts` and `check-deploy.ts` do the equivalent for their own commands. Each one is a pure function, no agent involved, cheap enough to run every tick and unit-testable on its own. If the answer's no, the cron goes silent without ever paying for a session. If it's yes, that's the signal to actually spend the money.

What the schedule change caused showed up almost immediately.

## The Week We Shipped and Patched

The four-cron model landed May 26th and 27th. The `review-patch` command — the one from the opening of this post — was born May 31st, in the middle of the same week. Here's commit volume across just the files that had just shipped — `patch.md`, `review.md`, `deploy.md`, and the four precheck scripts — for the ten days after:

| Date (May) | 25 | 26 | 27 | 28 | 29 | 30 | 31 | Jun 1 | Jun 2 |
|---|---|---|---|---|---|---|---|---|---|
| Commits | 2 | 14 | 5 | 13 | 8 | 11 | 11 | 8 | 2 |

That's not a launch followed by occasional cleanup. That's continuous, live correction on the same surfaces for a full week, tapering off only once June arrived. I knew that was coming, more or less — I waited until I was actually online to ship those changes, because I knew things would break, and they did.

The sharpest single piece of it is the `review-patch` arc from the top of this post: a whole new command, broken within a day, rebuilt within two. But it wasn't the only thing moving that week — it's just the one you can point to and say "there, that's the shape of it."

## Blast Radius, Not Luck

The instinct, looking back at a week like that, is to read it as "we got away with it." That's not quite right, and it's worth being precise about why.

Keanu — the one client-facing agent actually live at the time — never once shows up as a commit author anywhere in that week's history. Every commit was made by our own internal agents. Keanu does client work through a completely separate path from the dev-task/review/patch/deploy pipeline that was breaking, so it was never exposed to any of this churn in the first place. And there was no mechanism yet that could have pushed the week's breakage onto a live deployment even if there had been one to hit — nothing auto-propagated code or container updates to a client's cluster for months afterward.

None of that was built as a safety net for this moment. It's more accurate to say the blast radius was already small because of who could reach this code at all, and that upgrading a client's deployment has never been automated the way our own fleet increasingly is. Not a safety system. Not recklessness either. Just an absence of a feature that happened to matter a great deal, that week.

## Why We Didn't Just Go Event-Based

Somewhere in all of this, Dave made the case that the whole model should change: instead of a cron waking up on a schedule and checking whether there's work, something should tell the pipeline the moment work exists. Queue a task, and it starts now — not whenever the next tick happens to land.

He wasn't wrong about the upside. An event-driven check only has to look at the one PR or task that actually changed, instead of a precheck script rescanning everything on every tick. That's real, and it's cheaper.

It didn't happen, not yet, for a few reasons that all pointed the same direction. Dev-task, review, patch, and deploy are four different kinds of work, which means four different event sources to hook into — four separate wiring jobs instead of one polling loop. Crons already exist and already handle plenty of things that have nothing to do with this pipeline, so an event system wouldn't replace them, it would sit alongside them as a second concept to reason about. And the actual cost of doing it right — retry and redelivery handling, a public endpoint for the agent to receive webhooks on — didn't feel justified yet against what it would save.

That's not a rejection, though. The precheck scripts that already existed for cost reasons are shaped like a trigger check on purpose — each one answers "is there real work here" in a fast, deterministic way, which is most of what an event handler would need to do anyway. If it's ever worth making the jump, the shape is already sitting there waiting to be wired to something other than a clock.

There's a wrinkle worth being honest about, too. Those precheck scripts ended up doing more than deciding whether to spend money on an agent — they also became the thing that picks *which* task or PR a cron acts on next. That's more load-bearing than "cost gate" was ever supposed to mean, and it comes with a real gap: a static script can still miss something a live agent would catch just by looking. Whether that gap matters less under a real event model, where the trigger is already scoped to the one thing that changed — I don't know yet. Left open on purpose.

It's worth naming the shape of this problem out loud, too, because it's the same shape as the task store's own story: `patch` existing at all, and the precheck scripts needing to be concrete about what "actionable" means, come from the same instinct — replace something fuzzy and overloaded with something narrow and specific, at whatever layer it's currently causing trouble.

## The Quiet One

The `*/30` schedule we settled on in late May sat there for five weeks without anyone touching it. Nothing was on fire. That's not because it was fine — it's because Kubernetes was already restarting pods that got killed for running out of memory, which is exactly what four crons firing on the same tick will occasionally do. The pipeline kept working. It just kept quietly crashing and coming back, and nobody was looking for it, because nothing a person would notice was actually broken.

Dave found it the way you'd expect something silent to get found: not chasing an incident, just looking at pod restart counts for an unrelated reason, and noticing they were higher than they should be. He traced it back to the simultaneous firing and fixed the immediate problem the same way we'd fixed it once before — stagger the schedules. Five crons this time, five minutes apart: `0,30`, `5,35`, `10,40`, `15,45`, `20,50`. That bought eight days.

Two different mistakes, five weeks apart, and both of them survived on infrastructure nobody built for that specific job — one on the fact that a client agent's own path never touched the code that broke, the other on Kubernetes doing exactly what a restart policy is supposed to do. Neither was luck, exactly. Neither was designed for this, either.

## The General Fix

Eight days after that second stagger, `shipwright-loop` shipped. One dispatcher, ticking every single minute, reading all four phases — dev-task, review, patch, deploy — as a set of symmetric candidates instead of four independently scheduled things. Each tick, it collects whatever's actually ready across all four, picks exactly one winner by strict first-in-first-out order, dispatches it, and checks again immediately rather than waiting for the next slot. A busy guard keeps two ticks from overlapping, and it keeps draining candidates until there's genuinely nothing left before going quiet.

This is the piece that actually answers Dave's original ask, just not the way he first proposed it. A minute-by-minute tick gets you most of the way to "starts now" without needing a single webhook — and it's only affordable because the precheck scripts already turned "is there work" into something cheap enough to ask sixty times an hour instead of two. Polling didn't lose to events on responsiveness. It got close enough that the gap stopped being the thing worth solving.

Staggering stopped mattering the moment this shipped — there's only one scheduled entry point now, not four or five competing for non-overlapping minutes. The `review-patch` command and the manual loop skill built around it both got retired a week later, once `review` and `patch` gained the ability to take an explicit target directly. The removal PR says it plainly: fully redundant, once the two commands it used to paper over could be called correctly on their own.

## Why This Shape

Two specific-case fixes, tried more than once each — stagger the times by hand, fuse two commands into one — and both of them worked for exactly as long as the pipeline stayed small enough not to notice. Neither one generalized, because neither one was actually solving the problem underneath: four different kinds of work, each with its own opinion about when it should run, competing for a shared resource with no shared coordinator. The fix that stuck wasn't a better trick. It was making all four phases symmetric and interchangeable, and putting exactly one arbiter in charge of picking among them. Every piece of Shipwright has to earn its place by pointing back to a specific problem it solved for a specific person — this one earned it by watching two smaller ideas run out of road first.

Next up: pulling Shipwright out of the Vitals OS monorepo and putting it in front of anyone who wants to run it themselves.
