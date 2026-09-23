---
title: "A Step an Agent Could Skip"
date: "2026-09-22"
author: "Dan McAulay"
category: "Company Updates"
excerpt: "PostHog was free, reused from a client project, and good enough — until we started using its numbers to decide how fast we could actually ship, and to back specific claims to clients. That's when a metrics pipeline built out of steps an agent could quietly skip stopped being tolerable, and we tore it out for code that can't be."
readTime: "6 min read"
---

*Seventh post in the series on how Shipwright actually came together — [the first one](/blog/cloud-agent-review-origin/) covered the cloud review pipeline, [the second](/blog/openclaw-todos-origin/) covered OpenClaw and the original todo list, [the third](/blog/vitals-os-merge-origin/) covered the merge into Vitals OS, [the fourth](/blog/task-store-origin/) covered the task store, [the fifth](/blog/shipwright-loop-origin/) covered the dispatcher that runs the pipeline today, [the sixth](/blog/shipwright-oss-origin/) covered open-sourcing the whole thing. That post ended with a tease: PostHog first, then a pivot the moment this had to run without our own accounts, then the task store taking over entirely. That's still the shape of what follows. It's just not why it happened.*

Here's what reporting a task's progress used to look like. Somewhere in the middle of `dev-task.md` — the playbook every agent follows to build a feature and ship a PR — there's a step that says, in effect: now go tell PostHog what just happened. Run `python3 posthog_send.py`, pass it an event name, move on to the next step. `task_started`. `pr_created`. `ci_result`. `task_complete`. Nine event names like that, spread across three separate playbooks — `dev-task.md`, `review.md`, `deploy.md` — and every single one was a step, no different in kind from any other step in the sequence. Nothing checked that it actually ran. Nothing downstream noticed if it didn't. For most of a year, that was fine. Nobody was betting anything on these numbers being exactly right.

## Where It Came From

PostHog wasn't chosen for Shipwright. Dave had just finished building PostHog-backed analytics for a client project — real dashboards, already paid for by being free — and reached for the same thing in April to answer a much smaller question: is our own pipeline doing anything at all. `PH-1.1` landed April 3rd, a typed HogQL client with eleven tests, folded into the monorepo that hadn't split into pieces yet. There wasn't a task store to query instead. The earliest attempt at one was still seven weeks out. PostHog wasn't the wrong tool, chosen over a better one already sitting on the shelf. It was the only tool on the shelf.

## The Backend Nobody Needed Yet

Two months later, self-hosting made the choice matter in a way it hadn't before. Anyone running Shipwright themselves wasn't going to have our PostHog key, and metrics weren't a nice-to-have that could just quietly go dark for them. `MetricsProvider` landed June 8th — a real seam behind the dashboard, SQLite as the default in the same commit, Postgres added alongside it the same day. Self-hosters got a metrics backend of their own that didn't depend on us. That's a real reason this story happened. If it were the only one, this would be a much shorter post.

## Why It Actually Happened

The real reason came down to what we'd started using the numbers for. Early on, a metrics dashboard was something you glanced at. By June, I was pulling real numbers to answer how fast we could actually ship with Shipwright, and using those same numbers in conversations with clients. Once a number is backing an actual claim, "probably right" stops being good enough — and a step buried in a two-hundred-line markdown playbook, one an agent could skip without anything noticing, was never built to clear a bar that high. If something has to be accurate and it has to always happen, the answer is to write it in code, not leave it up to the agent. Fewer steps an agent has to remember means fewer places for one to quietly disappear.

That shift landed right when we finally had the means to act on it — and the room to. `TaskStoreProvider`, the thing that actually answers a metric query by asking the task store and the admin API directly instead of a separate analytics platform, didn't exist until June 27th, three weeks after the self-hosting seam went in. The four days of work that built it, `MME-1` through `MME-5`, started June 25th — one week to the day after the last commit of [the previous post](/blog/shipwright-oss-origin/) deleted our entire legacy agent workspace for good. Needing it, being able to build it, and having the time to build it were three separate things, and none of them arrived before the other two.

## What Got Deleted

`MME-1` added token columns to the admin database and a way to mark a cron run complete with real numbers already attached. `MME-2` and `MME-3` wired the harness to report token usage and task-execution data as a normal part of handling a request, not a separate step tacked onto the end of one. `MME-4`, June 27th, is `TaskStoreProvider` itself — all sixteen metric queries our dashboard answers, sourced straight from the task store and admin API. `MME-5`, the very next day, deleted the old pipeline outright: `posthog_send.py`, gone. Every one of those nine invocation sites across three playbooks, gone. The session-transcript snapshot that used to open `dev-task.md`'s very first step, gone. The commit message calls it what it was — superseded, not improved. A few days of ordinary shakeout followed: a token total that came up short somewhere, a stubbed field that needed a real implementation. The kind of thing that always happens the week after something this size lands.

## What It Made Possible

One thing came out of trustworthy numbers that had nothing to do with self-hosting at all. That same week, Dave was building the public side of shipwrightharness.com, and part of that was a read-only dashboard — no login, no token data, just the real numbers, sitting at `/public/dashboard` for anyone to look at. It's still there today. [The last post](/blog/shipwright-oss-origin/) was titled *Sharing Proof, Not Promises*, about the source code. This is the same idea, aimed at the numbers instead: you don't get to put a dashboard in front of strangers and call it proof unless you're actually sure it's telling the truth.

## What's Still Not True

Here's the part I won't round up. Claude Code only reliably reports how many tokens a session used when that session ends cleanly. Kill it, or have it crash, mid-run, and most of what it spent never gets reported at all. We've been trying to patch around that — the harness now pushes a running token count after every turn instead of waiting for the end, specifically so a kill doesn't erase the whole run's numbers — but that's a mitigation, not a fix. Most of a crashed session's tokens still don't make it through. It's not solved. I'm not going to write a post about getting serious on accuracy and then pretend it is.

That's the actual shape of this one: not a backend swap, a decision to stop trusting a process that only worked if everyone remembered to follow it. Next up: HITL — what actually needs a human in a pipeline built to run the rest of itself, and why "blocked" and "needs a human" spent weeks being the exact same bit before anyone noticed they weren't.
