---
title: "Shipwright vs. Claude in Slack: Session Launcher vs. Delivery System"
date: "2026-08-04"
author: "Dave O'Dell"
category: "Engineering Velocity"
excerpt: "Claude in Slack — Claude Tag and the Claude Code integration — is great at starting work. Here's the honest difference between a session launcher and a system that runs your whole delivery backlog."
readTime: "6 min read"
---

If you've started tagging Claude in Slack, you've met two things Anthropic ships there — and it's worth separating them:

- **Claude Tag** — a general Slack teammate with its own identity and memory. Tag it and it breaks your request into stages and works through them, right in the thread.
- **The Claude Code Slack integration** — the coding surface. Tag it against a repo and it can investigate the bug, edit files, run tests, and prepare a pull request, all from Slack.

Both are genuinely good at *starting* work. For a one-off task, either is a great door into the harness.

The question a lot of engineering teams ask next is the interesting one: **can it run the backlog for me?** Pick up the next ready task on its own, build it, open a PR, run the review, reconcile state, and move to the next one — on a schedule, without me re-prompting each step?

That's a different job, and it's the one [Shipwright](/products/shipwright/) is built for.

## The short version

| | Claude in Slack (Tag + Claude Code integration) | Shipwright |
|---|---|---|
| Start a task from Slack | ✅ Yes | ✅ Yes (built on the same Claude Code harness) |
| Break one tagged request into stages | ✅ Yes, within that session | ✅ Yes |
| Open a PR for a task | ✅ Yes (Claude Code integration) | ✅ Yes |
| **Durable** queue where planned tasks wait across days | ❌ No | ✅ Yes |
| Autonomously pull the *next ready* task on a schedule — no re-tag | ❌ No (acts when tagged / ambiently watches a thread) | ✅ Yes |
| Reconcile PR + review state across a whole backlog | ❌ Session-scoped | ✅ Across the queue |
| Open source, self-hostable — the whole loop | ❌ Client, not the loop | ✅ Whole harness, MIT |

It's not Shipwright *instead of* Claude Code. Shipwright runs **on** Claude Code — it ships zero model or inference code and shells out to the same `claude` you already use. The comparison isn't "which harness," it's "a way to *launch* sessions vs. a system that *runs the delivery loop* around them."

## What the Slack surface is (and it's good at it)

Both Slack surfaces are **session launchers**. You tag Claude, it opens a session — against a thread (Claude Tag) or against your repo (the Claude Code integration) — breaks the request into stages, works through them, and the session ends. That's genuinely useful for:

- a quick bug fix while you're away from your editor
- a review or a question against a specific file
- kicking off a prototype from your phone

Claude Tag will even stage a multi-step request and monitor a thread ambiently — real autonomy inside the moment it's tagged. What neither surface is, is a place where work *waits*. There's no durable queue holding planned tasks across days, no autonomous cycle that pulls the *next ready* task on a schedule, and no backlog-wide reconciliation of PR and review state as work lands. Each tag is its own session. When it ends, the loop ends.

## What Shipwright adds: plan → queue → loop

Shipwright is the delivery system that sits *around* the harness:

- **Plan.** Decompose a goal into a queue of concrete, reviewable tasks — the "plan before you implement" discipline, made durable instead of living in one session's context.
- **Queue.** A persistent work store. Tasks wait, get picked up in dependency order, and survive across sessions, restarts, and days.
- **Loop.** An autonomous cycle that pulls the next ready task, builds it, opens a PR, runs the review, reconciles state, and moves on — on a schedule, without a human re-prompting each step.

You stay in the loop where it counts — approving what ships, steering priorities, killing bad ideas. You leave the loop where you shouldn't have to be: re-typing "okay, now do the next one."

## Why it's built as a thin layer — on purpose

Shipwright is a deliberately thin layer on Claude Code, and that's the strategy, not an apology:

- **Anthropic's progress is our tailwind.** Better planning, safer autonomy, cheaper context in the underlying harness — we inherit it for free. We spend our whole budget on the part that's ours: the loop.
- **We build the part the platform doesn't.** The Slack surface gives you a door to the harness. Shipwright is the delivery system built around it. We complement Anthropic's moves rather than racing them.
- **You can read all of it.** The whole harness is open source (MIT). Before you commit to anything, you can see exactly how it's wired — no black box.

## The exit, stated precisely

If you stop using Shipwright, you lose Shipwright — the engine, the queue, the loop. We won't pretend otherwise. But everything it *wrote into your repo* stays: your CLAUDE.md, docs, skills, and slash commands are plain Claude Code primitives that keep working on vanilla Claude Code with Shipwright removed. The only thing you'd tear out is the orchestration you were self-hosting anyway.

So the exit is cheap and non-punitive. We're not betting you can't leave — we're betting that once you've felt plan → queue → loop actually close, you won't want to.

## When to use which

- **Reach for the Slack integration / Claude Tag** when you want to *start* a discrete task fast — a fix, a review, a prototype — and you're happy to drive.
- **Reach for Shipwright** when you have a *backlog* you want run: a queue of tasks that should get planned, built, PR'd, reviewed, and reconciled on a schedule while you stay at the approval gate.

If you're weighing autonomous coding tools more broadly, the same "delivery system, not a session" lens is why we wrote [We Accidentally Built an Open-Source Alternative to Devin](/blog/shipwright-vs-devin/). If it's community Claude Code task-queue tools you're weighing instead — [claude-queue](https://github.com/vasiliyk/claude-queue) or [Dispatch](https://github.com/bassimeledath/dispatch) — see the same lens applied in [Shipwright vs. Claude Code Task-Queue Tools](/blog/shipwright-vs-claude-code-orchestrators/).

---

*Shipwright is the open-source autonomous delivery agent for Claude Code. It's free, MIT-licensed, and runs in your own cloud — [see how it works](/products/shipwright/). Want Dan and Dave to install and tune it on your pipeline? See the [design partner program](/shipwright/design-partners/).*
