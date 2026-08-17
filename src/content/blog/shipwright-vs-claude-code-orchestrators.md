---
title: "Shipwright vs. Claude Code Task-Queue Tools: A Queue Isn't a Delivery System"
date: "2026-08-14"
author: "Dave O'Dell"
category: "Engineering Velocity"
excerpt: "claude-queue and Dispatch are solid community tools for running Claude Code unattended. Here's the honest comparison — including where they're a better fit than Shipwright."
readTime: "6 min read"
---

If you're trying to run Claude Code *unattended* — hand it a backlog, walk away,
come back to opened PRs — you've probably found the community tools that got there
first. **[claude-queue](https://github.com/vasiliyk/claude-queue)** gives you a real
task queue with priorities and dependencies that runs tasks while watching your plan
limits. **[Dispatch](https://github.com/bassimeledath/dispatch)** fans a big task out
to background workers in isolated worktrees so one session can do the work of several.

These are good tools. If you searched "claude code task queue," they belong on your
list. This page is the honest comparison — including where they're a *better* fit than
Shipwright — so you can tell which job you're actually hiring for.

The short answer: **a queue schedules work; a delivery system finishes it.** Shipwright
is the second thing.

## The short version

| | claude-queue | Dispatch | Shipwright |
|---|---|---|---|
| Persistent task queue (priorities, dependencies) | ✅ Yes | ⚠️ Per-task checklist, per session | ✅ Yes |
| Runs tasks unattended | ✅ Yes (manual worker start) | ✅ Background workers | ✅ Yes (scheduled loop) |
| Parallel workers / worktree isolation | ❌ | ✅ Yes | ✅ Yes |
| Plan → decompose a goal into reviewable tasks | ❌ You enqueue tasks | ✅ Into a checklist | ✅ Into a durable queue |
| Opens PRs | ❌ No (per README) | ❌ Not its job | ✅ Yes |
| Runs review + reconciles PR/review state | ❌ No | ❌ No | ✅ Across the whole queue |
| Survives across days / restarts | ✅ Queue persists | ⚠️ Session-scoped | ✅ Yes |
| Scheduled autonomy (pulls ready work on a cron) | ❌ Manual worker start | ❌ | ✅ Yes |
| Talks to Claude via the official `claude` CLI | ⚠️ Also hits Claude.ai internal endpoints* | ✅ CLI | ✅ CLI, only |
| Open source, self-hostable | ✅ | ✅ | ✅ Whole harness, MIT |

<sub>*claude-queue's own README notes it "accesses Claude.ai internal web endpoints for usage limit monitoring, which may violate Anthropic's Terms of Service." Worth knowing before you run it on a work account; verify current behavior at its source.</sub>

Rows are drawn from each project's own documentation as of 2026-08-02 — check the
repos for the latest, they move fast.

## Where these tools are the right call

Be honest about this up front, because sometimes they are:

- **You want a lightweight queue in front of one Claude plan.** claude-queue is
  purpose-built for exactly that: enqueue tasks with priorities and dependencies, let
  a worker chew through them, and have it politely pause when you're about to hit your
  5-hour or weekly limit and resume when it resets. If "don't blow my plan quota" is
  the problem, that's a sharp tool.
- **You want one big task done faster, right now, in this session.** Dispatch turns a
  single Claude Code session into an orchestrator that spins up background workers in
  isolated worktrees — so a refactor that would serialize across one context window
  fans out across several. If your bottleneck is *context window*, not *backlog
  management*, Dispatch is the more direct fix.

Neither is trying to be a delivery system. That's not a knock — it's scope. Which
brings us to the actual difference.

## What "delivery system" means (and why a queue isn't one)

A queue answers *what runs next*. A delivery system answers *what finishes* — and
"finish" for real engineering work isn't "the worker exited," it's **a reviewed PR
that reconciles with the rest of the work in flight.** That's a longer chain:

- **Plan.** Decompose a goal into concrete, reviewable tasks — before implementation,
  as durable records, not one session's scratch checklist.
- **Queue.** A persistent store where tasks wait, get picked up in dependency order,
  and survive across sessions, restarts, and days. *(This part the community tools do
  have — credit where due.)*
- **Loop.** A scheduled cycle that pulls the next ready task, builds it, **opens a
  PR, runs the review, and reconciles PR/review state across the whole queue**, then
  moves on — without a human re-prompting each step.

The last bullet is the gap. claude-queue's README is explicit that it does **not**
open PRs or run reviews, and its worker is started by hand rather than on a schedule.
Dispatch's job ends when the background work merges back into your session. In both
cases *the task runs*; in neither does *the delivery loop close itself*. Shipwright's
`plan → queue → shipwright-loop` is built for that closing — the same "delivery
system, not a session" lens we used comparing Shipwright to [Claude in Slack](/blog/shipwright-vs-claude-code-slack/).

## Three concrete differences

1. **PR + review are in the loop, not bolted on.** Shipwright opens the PR, runs the
   review pass, and reconciles review state as PRs land — as part of the same cycle
   that picked up the task. With a bare queue you own that half yourself.

2. **Durable across days, not scoped to a session.** Shipwright's queue is a hosted
   task store; the loop runs on a schedule and picks up ready work whether or not
   anyone's at a terminal. Dispatch's checklist lives inside the session that spawned
   it; claude-queue persists the queue but still needs you to start the worker.

3. **Official CLI, nothing gray.** Shipwright ships zero model or inference code and
   shells out to the same official `claude` CLI you already use — no scraping of
   Claude.ai internal endpoints, no plan-limit reverse-engineering, nothing that puts
   a work account in Terms-of-Service limbo. If you're running this on a company repo,
   that distinction matters.

## It's not either/or

Shipwright runs **on** Claude Code, same as these tools do. If claude-queue's
plan-limit pausing solves a real pain for you, that idea isn't incompatible with a
delivery loop — it's a feature a delivery loop could adopt. The comparison isn't
"which community tool wins." It's: **do you need a way to run tasks, or a system that
delivers reviewed code?** If it's the second, that's the whole reason [Shipwright](/products/shipwright/)
exists — and it's the same reason we wrote up [how it compares to Devin](/blog/shipwright-vs-devin/).
It's open source (MIT, the whole harness), so you can read exactly how the loop
closes before you trust it with a backlog.

---

*Shipwright is the open-source autonomous delivery agent for Claude Code. It's free, MIT-licensed, and runs in your own cloud — [see how it works](/products/shipwright/). Want Dan and Dave to install and tune it on your pipeline? See the [design partner program](/shipwright/design-partners/).*
