---
title: "Dave Put OpenClaw on His Raspberry Pi First. I Didn't Stay on It Long."
date: "2026-08-18"
author: "Dan McAulay"
category: "Company Updates"
excerpt: "Dave bought a Raspberry Pi and started running OpenClaw on it in early February. I bought my own Pi a couple weeks later and did the same thing. I didn't stick with OpenClaw — and the reason I could move off it so fast traces straight back to the cloud agent work from post one."
readTime: "6 min read"
---

*Second post in the series on how Shipwright actually came together — [the first one's here](/blog/cloud-agent-review-origin/). That one was about the cloud sandbox review pipeline. This one's about the assistant I was running on hardware in my own house.*

Dave bought a Raspberry Pi and started running OpenClaw on it in early February. I bought my own Pi a couple weeks later and did the same thing — same platform, same idea: get an agent doing real work for me, autonomously, without me sitting there prompting it every time. I wasn't inventing anything by following him onto it. I just wanted the same thing he'd already started building for himself, running on my own machine.

## Who Bodhi Was, Before Bodhi Had Code

Bodhi booted for the first time on February 28, 2026, running on OpenClaw. The first thing I did wasn't write a feature — it was write `SOUL.md` and `IDENTITY.md`. Who is this thing. What does it sound like. What does it refuse to do. That's the moment it stopped being a script and started being an assistant with a name, even though at that point it could barely do anything yet.

## I Didn't Stay on OpenClaw Long

I didn't fully trust OpenClaw — not enough to build the business on top of it. By March 4, Bodhi was running on Claude Code instead. That move went faster than it should have, and the reason isn't really about Bodhi at all: by that point I'd already been running Claude Code in `-p` mode — headless, scripted, no one watching the terminal — for the cloud agent project from [the first post in this series](/blog/cloud-agent-review-origin/). Pointing that same pattern at a personal assistant instead of a PR reviewer wasn't a new skill, it was reusing one I already had. The OpenClaw-specific research didn't get thrown away either — heartbeat crons, delegation axes, the general shape of what a personal agent needs all carried forward. I just moved it onto ground I already knew how to run headless.

`~/.bodhi/workspace` got created fresh that day. `SOUL.md` and `IDENTITY.md` came with it — copied over with their February 28 timestamps intact, because they weren't rewritten, just relocated. The workspace's own git history starts the same day too: `initial snapshot`. Everything after that is git history, which is a nice thing to be able to say about your own assistant's origin story.

## The Todo List Bodhi Wrote About Itself

The first real workload wasn't anything I asked for. It was Bodhi auditing its own codebase — failing tests, missing test coverage, no `package.json` — and writing the findings into `memory/engineering-todos.json` as `eng-001` through `eng-006`. Type, priority, size, status, and a note field logging what actually got done. That schema is still recognizably the shape our eng-execute process uses today.

The file moved as the workspace grew up around it: `memory/engineering-todos.json` in the first week, then `state/todos.json` once a `state/` directory existed to hold it, then split into its own `state/engineering-todos.json` a few days after that, once the general todo list and the engineering backlog needed to stop being the same file. None of those moves were planned in advance. They happened because the thing kept growing and the old shape stopped fitting.

## Crons Were There From Day One

By the time `crons.json` existed as a real file, it already had seven jobs in it: a morning brief with a personalized note tacked on, an evening check-in, a payment checker, an hourly research worker, a Sunday metrics sync, a weekday invoice check, and a Monday insights digest. Every one of them was silent unless something actually needed my attention, and anything that touched money — invoices, payments — had an approval gate instead of just acting on its own. That pattern wasn't a design decision I made up front. It's just what "an assistant I actually trust" looked like the first time I had to answer the question for real.

Most of what filled that queue in the early weeks was personal ops, not engineering — I was building the thing that runs my business, not a dev pipeline. That distinction matters for where this series goes next.

## Money Made It Real

The work that actually forced Bodhi to get good happened around invoicing. On March 23 I repaired the entire billing pipeline — payments, billing triggers, final invoices, note templates — and added auto-detection for over-hours work with a note in the approval prompt instead of silently billing it. Two days later was the biggest single push of the month: I replaced Resend with Gmail for draft-based invoicing, then spent the rest of the day building out `comp-calc.ts` — migrating it onto a shared `calculate.ts` as the source of truth for P&L, adding `--start`/`--end` flags for partial periods, fixing the bonus calculation to use total hours per the comp policy instead of a subset, and fixing comp-history to store an inclusive period end instead of the exclusive date the API gave it. Small fixes, but each one was real money computed wrong until it was found.

You don't build careful approval gates and inclusive-date fixes for a toy. You build them because you're about to trust the thing with your own paycheck, and being wrong once is enough to make you paranoid about it forever after.

## The Handoff

On March 27, `vitals-os` entered the workspace as a synced shared repo — the same day vitals-os's own first commit landed. That's the seam where this stops being "my personal ops bot" and starts being part of something bigger. Dave had been building plan-session and dev-task in parallel the whole time, on his own thread. Mine was Bodhi, `todos.json`, crons, and a review habit. Neither of us was building "Shipwright" yet. We were both just building the thing we personally needed, and it happened to start rhyming.

If you look at Shipwright's agent code today, you'll find `claude.ts`, `config.ts`, a cron failure reporter — the same shape as the files Bodhi had from week one. That's not a coincidence and it's not a rewrite from scratch. It's the same harness, grown up. Every piece of it still traces back to a specific morning I needed a payment checked or an invoice approved. If it can't point back to something that concrete, I don't think it belongs.

Next up: the two threads actually merge. Dave brings plan-session and dev-task, I bring Bodhi's todos, crons, and review habit, and vitals-os is where they stop being two people's side projects and start being one pipeline.
