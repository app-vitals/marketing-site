---
title: "Dave Put OpenClaw on His Pi First. The Todo List I Built After It Is What Actually Lasted."
date: "2026-08-18"
author: "Dan McAulay"
category: "Company Updates"
excerpt: "Dave bought a Raspberry Pi and ran OpenClaw on it first. I followed onto my own Pi a couple weeks later. I didn't stay on OpenClaw long — but the todo list and the crons I built once I moved off it are still recognizably the shape of how work gets tracked and executed today."
readTime: "11 min read"
---

*Second post in the series on how Shipwright actually came together — [the first one's here](/blog/cloud-agent-review-origin/). That one was about the cloud sandbox review pipeline. This one's about the assistant I was running on hardware in my own house.*

Dave bought a Raspberry Pi and started running OpenClaw on it in early February. I bought my own Pi a couple weeks later and did the same thing — same platform, same starting point. We talked about it the whole way through, the way we always do, but what each of us actually built diverged fast, because our day-to-day work pulled us toward different problems. Mine turned into a Slack bot I named Bodhi, built to run my side of the business.

## Who Bodhi Was, Before Bodhi Had Code

Bodhi booted for the first time on February 28, 2026, over Telegram — the easiest way to get going with OpenClaw, and the same channel Dave used. The first real interaction wasn't me writing a feature. It was OpenClaw's own onboarding, which happens right there in the chat: who is this thing, what should it sound like, what should it refuse to do. The answers get written down as the assistant's identity before it can do much else. That's standard OpenClaw behavior, not something I invented — but it's still the moment Bodhi stopped being an empty shell and became something with a name.

## Trust Had to Be Built, Not Assumed

I didn't stay on OpenClaw long, and it wasn't really about OpenClaw's quality. I was still new to the actual risks of turning an AI agent loose on my own machine without me approving every task it ran, and watching OpenClaw's own commit history move fast — a lot of changes landing quickly — made me nervous in a way I hadn't fully expected going in. I knew Claude Code's internals a lot better than I knew OpenClaw's, and trust in a system you're about to hand real autonomy to isn't something you assert — it's something you build. I ended up building it into Bodhi's own workflow later, the same way: lint, tests, a tightly controlled environment. At that point it was easier to build that trust on ground I already understood. There was a second, less defensive reason too — building this myself meant going deeper on Claude Code specifically, and that was directly useful. It's the tool we run for clients.

By March 4, Bodhi was running on Claude Code. That move went faster than it should have — I'd already been running Claude Code headless and scripted for the cloud agent project from [the first post in this series](/blog/cloud-agent-review-origin/). Pointing that same pattern at a personal assistant instead of a PR reviewer wasn't new work, it was reusing a pattern I already had. I just moved it onto ground I already knew how to run headless.

## The Part of OpenClaw That Actually Mattered

The crons and the trust-building habits weren't the biggest thing that carried over from OpenClaw. It was simpler than that: OpenClaw ran on its own hardware. Bodhi had a Raspberry Pi that was just its machine — not a shared server, not a chat session that resets, an actual persistent home. It could write something to disk and expect it to still be there tomorrow. It could record what it learned and build on that instead of starting from zero every conversation.

That's the same shape a Shipwright agent's own persistent storage is today — not a database it queries, a workspace it lives in. The hardware changed, a Pi on my desk to a volume in the cloud, but the pattern didn't: self-modifying software needs somewhere of its own to actually be self-modifying. Write code, run it, remember what happened, do it again tomorrow. Everything else in this post — the todo list, the crons, the eng-audit loop — only works because that space existed underneath it.

## Slack Was the Other Unlock

Bodhi also moved into Slack instead of Telegram, separately from the platform migration — not because of it. Telegram was just an easy starting point for OpenClaw. Slack was where I was already comfortable, a tool I already lived in, and I didn't need to add another one. That move mattered more than it sounds like it should. The terminal is where I go to get into the zone — heads-down, all-in on one task, until it's done. Slack was already where I did async work, the place I'd check in on things between other things, not the place I went to focus on one problem at a time. Once Bodhi lived there instead of in a terminal window, it stopped feeling like operating a tool and started feeling like talking to a teammate — a developer who could go off and actually do work while I was doing something else entirely.

That distinction mattered because "faster" was never really the goal. What I wanted was to move toward autonomous agents doing multiple things at once, not just an agent that answered me quicker when I was staring at it. A terminal keeps you synchronous by design — you're there, prompting, watching it work. Slack is asynchronous by design. Putting Bodhi somewhere I already worked asynchronously is what made everything else in this post make sense as one thing instead of a pile of separate features.

## Crons Were There From Day One

Crons were the other big unlock, alongside Slack itself — an easy way to schedule background work for an agent instead of prompting it by hand every time. Obvious in hindsight, but I hadn't had anything set up like that before, and once I did, the list filled up fast: a morning brief with a personalized note tacked on, an evening check-in, a payment checker, an hourly research worker, a Sunday metrics sync, a weekday invoice check, and a Monday insights digest — seven jobs within the first week. Every one of them was silent unless something actually needed my attention, and anything that touched money — invoices, payments — had an approval gate instead of just acting on its own. That pattern wasn't a design decision I made up front. It's just what "an assistant I actually trust" looked like the first time I had to answer the question for real.

Most of those seven were personal ops, not engineering — I was building the thing that runs my business, not a dev pipeline. But two other crons, running in parallel, were exactly that.

## The First Thing I Set Bodhi Up to Do in the Background

I built those two on purpose, with limits. From the start I kept a running list — `todos.json`, the one I promised at the end of the last post — as a general work queue: things I wanted built, plus whatever turned up on its own. The first, an audit cron, ran twice a week and scanned Bodhi's own codebase for failing tests, missing coverage, dead code, simplification opportunities, even an audit of any outbound communication it wasn't supposed to be sending — writing findings onto that list in an exact shape I specified. The second, an execute cron, ran every couple of hours, picked the next item off the same list — an audit finding or something I'd added myself to get built — fixed the small ones, broke the large ones down, and was bound by hard stops I wrote in on purpose: no messages, no touching credentials, no git push, no deploy, nothing to its own schedule without me approving it first.

That pairing — the audit cron feeding the list, the execute cron working through it — was a scoped, safety-railed system I designed on paper, not autonomous initiative. I wanted it done safely as much as I wanted it done at all.

It still echoes into Shipwright today, in two ways. Entropy patrol does something similar now — scan and queue for code quality — though this was broader from day one, a general backlog for building things, not just a maintenance loop. And that same list is an early ancestor of the shared task store the whole pipeline runs on, though the path between them is its own story, for another post.

Looking back, the execute cron's hard stops were less airtight than they sound. None of them covered the actual code sitting in Bodhi's own workspace — the execute cron could rewrite that freely, and whatever it wrote would just run the next time a cron fired, or the next time I asked it to do something, with no review step in between. The guardrails were real, but narrower than I gave them credit for at the time.

## Money Made It Real

Billing was the first real gap I automated, because it was a genuinely manual mess before Bodhi. I was invoicing by hand, checking by hand whether a payment had actually landed, and — since it's just the two of us — Dave and I were even paying each other manually. All of that moved onto Bodhi over the course of March, and the invoicing work specifically is what forced the whole pipeline to get reliable.

Testing and verifying the code myself, I found out why it needed to be reliable: the bonus math was using a subset of hours instead of the total at one point, payroll history was storing the wrong end date for a pay period at another — both quietly computing real money wrong until I caught them. That's the kind of mistake you don't want to make twice. So the pipeline got careful: an approval gate on anything touching money, over-hours flagged instead of silently billed, nothing moving without me saying yes.

You don't build that for a toy. You build it because you're about to trust the thing with your own paycheck, and being wrong once is enough to make you paranoid about it forever after.

## The Handoff

On March 27, vitals-os entered the workspace as a synced shared repo — the same day vitals-os's own first commit landed. That's the seam where this stops being "my personal ops bot" and starts being part of something bigger. Dave had been building plan-session and dev-task in parallel the whole time, on his own thread. Mine was Bodhi, its todo list, its crons, and the [review habit from the last post](/blog/cloud-agent-review-origin/). Neither of us was building "Shipwright" yet. We were both just building the thing we personally needed, and it happened to start rhyming.

If you look at Shipwright's agent code today, it has the same shape as what Bodhi had from week one — a wrapper around Claude Code, a config module, error handling for failed cron runs. That's not a coincidence and it's not a rewrite from scratch. It's the same harness, grown up. Every piece of it still traces back to a specific morning I needed a payment checked or an invoice approved. If it can't point back to something that concrete, I don't think it belongs.

Next up: the two threads actually merge. Dave brings plan-session and dev-task, I bring Bodhi's todos, crons, and review habit, and vitals-os is where they stop being two people's side projects and start being one pipeline.
