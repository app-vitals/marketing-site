---
title: "What Actually Needs a Human"
date: "2026-10-01"
author: "Dan McAulay"
category: "Company Updates"
excerpt: "In a pipeline built to run the rest of itself, two things turned out to need a human: a narrow slice of tasks an agent is deliberately kept away from, and a decision about which tasks those are, made before any agent starts, not inferred mid-run. Getting the first one right took an outage. Getting the second one right took three days to half-undo what we'd just shipped."
readTime: "6 min read"
---

*Eighth post in the series on how Shipwright actually came together — [the first one](/blog/cloud-agent-review-origin/) covered the cloud review pipeline, [the second](/blog/openclaw-todos-origin/) covered OpenClaw and the original todo list, [the third](/blog/vitals-os-merge-origin/) covered the merge into Vitals OS, [the fourth](/blog/task-store-origin/) covered the task store, [the fifth](/blog/shipwright-loop-origin/) covered the dispatcher that runs the pipeline today, [the sixth](/blog/shipwright-oss-origin/) covered open-sourcing the whole thing, [the seventh](/blog/metrics-origin/) covered the metrics pipeline. That one ended with a tease: why "blocked" and "needs a human" spent weeks being the exact same bit before anyone noticed they weren't. This is that story.*

This whole series has been about a pipeline that does more of the work on its own with every post — plan a spec, execute it, review it, patch it, ship it, with less of me in the middle each time. That raises an obvious question: how much further can that go, and where does it actually stop?

Planning's the easy answer. Writing the spec and turning it into tasks is still squarely a human's job, sitting outside the core loop entirely — dev-task, review, patch, and deploy run without me; plan-session mostly doesn't, yet (we're poking at automating pieces of that too, but that's not where this post is going). This post is about something less obvious: a case inside the loop itself, after planning is already done, that still needs a human — and what it cost us before we admitted that clearly.

We had more than one outage this year caused by the same shape of mistake: work a human was supposed to do first, that didn't get done, so the agent went ahead anyway. A secret that needed provisioning before the work could even start. A deploy that had to actually finish before the next task made sense. The annoying version isn't the one I caused myself — it's finding out someone else's plan session let the requirement through, with nothing written down anywhere an agent could check, and I'm the one who finds out after it's already broken. Being more careful myself only fixes it for me, and only until I forget again. What actually helps is something that stops it from being possible for someone else, later, who never saw the outage that taught me the lesson.

## What Qualifies

The answer turned out narrower than it sounds. Not code review. Not most infrastructure work, even. Just the handful of things we've deliberately kept out of an agent's hands entirely — provisioning a secret, logging into a console, anything where the access itself is the risk, for safety (it has no business holding the kind of access that lets it drop a database) or plain security (credentials to a system it has no reason to touch). Everything else, the pipeline is built to run on its own.

We built a flag for exactly that, directly off outages like the one above — enough of them shared the same root cause that it was worth making the dependency explicit instead of hoping someone remembered. A task flagged `hitl`: no code to write, a human has to physically go do something. Once a task carries it, anything depending on it is actually stuck — not just "shouldn't" move forward, structurally can't. That's the whole definition: no diff, a human executes, full stop. The skill shipped June 17th, the same day it got ported into Shipwright's own repo, one day before [the cutover that made Shipwright its own project](/blog/shipwright-oss-origin/) was final.

## Where the Decision Gets Made

The planning agent is the one that actually proposes a task as `hitl`, scanning every task against the same rules every time. I look at that list and confirm it before any of it reaches the queue — before an agent is ever dispatched to work on any of it. That's the only point where this gets decided.

Getting to that point took longer than it should have, because `hitl` wasn't the only signal already doing a version of this job.

## A Flag Nobody Reconciled With What Already Existed

`blocked` was already there before any of this — one of the ordinary ways a task's life could go, alongside pending, in progress, PR open, done, cancelled. A task could already sit blocked, waiting on something, long before `hitl` existed. When `hitl` showed up to solve the outage problem, nobody sat down and worked out how the two related. It was new, it solved an immediate problem, and it shipped without anyone reconciling it against the status that had been sitting there the whole time.

That gap showed up for real a few weeks later. Pull requests needed the same kind of signal — a PR opened by hand could spin forever in review or patch with nothing able to stop it. The honest fix would have mirrored the existing `blocked` concept onto PRs, since a stuck PR is exactly what `blocked` already meant. What actually shipped mirrored `hitl` instead — `hitl`, `hitlNotifiedAt`, `blockedReason`, all now living on a PR record. Probably just recency bias: `hitl` was the newer pattern, still top of mind, so that's the shape we reached for.

Past the operational cost, there was a smaller, more constant one. Every time I sat down during a later plan-session to extend the feature, I couldn't consistently say which bucket a new piece of logic belonged in. If I couldn't tell, the planning agent's own classification started feeling arbitrary too — `hitl` and `blocked` were doing adjacent jobs with no clean line between them, and nothing forced anyone to draw one.

## The Split

HSR — hitl-status-rework — landed August 8th as one bundled PR, eight tasks deep. It split the overloaded flag into three real things: `Task.hitl` kept the job it always had. A new `Task.requiresHumanApproval` covered real code, a real diff, just one that needed a human's sign-off before merge rather than a human doing the work by hand. And `PullRequest.blocked` finally gave PRs the name they should have had from the start — a pipeline stuck on a PR, independent of whether a task was even still attached, using the same word a task had used for the same situation all along. Alongside it shipped `/shipwright:unblock`, the first real triage surface for anything sitting stuck: see everything blocked, read why, and decide — retry it, redirect it with a clearer spec, or abandon it outright.

## Three Days Later, I Pulled a Third of It Back Out

The new approval flag never got used. Not phased out slowly, not left to wither over a quarter of awkward adoption — zero tasks, ever, actually set `requiresHumanApproval` to true. I'd built an entire extra bucket for a distinction that sounded right while I was designing it and never once mattered in practice. RHA-1, August 11th: gone, three days after it shipped.

It wasn't a bug. Nothing about it was broken — it just never earned the complexity it cost to carry. I like clear definitions and boundaries. They make things easier to think about, talk about, explain, and work on. A boundary nothing ever crosses isn't a boundary. It's one more category I'd have had to hold in my head every time I planned a task, for a distinction that was never actually load-bearing.

## The Shape That's Left

What's left fits in one sentence: `hitl` means a human has to physically do this, `blocked` means the pipeline got stuck and needs a decision, and nothing else lives in between. `blocked` shows up as two different shapes depending on what's stuck — a status value directly in a task's own lifecycle, and a separate boolean on a PR record, since a PR doesn't carry that kind of status to begin with — but it's one concept wearing two shapes, not two concepts. Not because "needs a human" was a novel idea. Because it took an outage, a bolted-on flag, a three-day-old bucket, and a cut, to end up with a line simple enough that neither of us — me or the agent — has to think twice about which side of it something's on.

## Checking That Against the Field

I went looking for how other software factories handle this, because deciding ahead of time, with someone checking before work starts, sounds like exactly the kind of thing everyone's already doing. Gergely Orosz's recent look inside [OpenAI's internal Codex factory](https://newsletter.pragmaticengineer.com/p/openai-software-factory) agrees with half of that: risk gets classified before an agent starts, not decided live. Some areas of a codebase are cleared for an agent to auto-approve its own low-risk PRs; higher-risk changes route through stricter review. That's a standing policy, not a per-task judgment call.

Where it diverges is underneath that policy. Even inside a codebase area cleared for autonomy, their own description of the system still has the agent deciding, live, mid-execution, whether a given situation needs to escalate to a human — one step inside the pipeline itself, nothing upstream double-checking it. That's the exact gap the confirmation step above is built to close. The difference isn't whether an agent ever gets to make this judgment — it's whether anyone checks the judgment before real work starts. Two real bets on the same unsettled problem — they trust the live call inside the loop; I'd rather catch it earlier, while I'm still looking at the list.

None of this works without the thing [the task store post](/blog/task-store-origin/) already covered — a durable backlog that outlives any single session, which a human can classify once and a cron can keep dispatching against indefinitely. Take that away and there's no "during planning" to decide this at; there's just whatever's in front of whoever's typing, in the moment, same as everywhere else. The signal itself is small. What makes it worth having is everything underneath it that was already there.

Next up: what it actually looks like to watch a fleet of agents work day to day.
