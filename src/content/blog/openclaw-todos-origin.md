---
title: "Dave Put OpenClaw on His Raspberry Pi First. I Didn't Stay on It Long."
date: "2026-08-18"
author: "Dan McAulay"
category: "Company Updates"
excerpt: "Dave bought a Raspberry Pi and started running OpenClaw on it in early February. I bought my own Pi a couple weeks later and did the same thing. I didn't stick with OpenClaw — watching its commit history move fast made me nervous about trusting an agent I didn't fully understand, and the reason I could move off it so quickly traces straight back to the cloud agent work from post one."
readTime: "9 min read"
---

*Second post in the series on how Shipwright actually came together — [the first one's here](/blog/cloud-agent-review-origin/). That one was about the cloud sandbox review pipeline. This one's about the assistant I was running on hardware in my own house.*

Dave bought a Raspberry Pi and started running OpenClaw on it in early February. I bought my own Pi a couple weeks later and did the same thing — same platform, same starting point. We talked about it the whole way through, the way we always do, but what each of us actually built diverged fast, because our day-to-day work pulled us toward different problems. Mine turned into a Slack bot I named Bodhi, built to run my side of the business.

## Who Bodhi Was, Before Bodhi Had Code

Bodhi booted for the first time on February 28, 2026, over Telegram — the easiest way to get going with OpenClaw, and the same channel Dave used. The first real interaction wasn't me writing a feature. It was OpenClaw's own onboarding, which happens right there in the chat: who is this thing, what should it sound like, what should it refuse to do. The answers get written down as the assistant's identity before it can do much else. That's standard OpenClaw behavior, not something I invented — but it's still the moment Bodhi stopped being an empty shell and became something with a name.

## Trust Had to Be Built, Not Assumed

I didn't stay on OpenClaw long, and it wasn't really about OpenClaw's quality. I was still new to the actual risks of turning an AI agent loose on my own machine without me approving every task it ran, and watching OpenClaw's own commit history move fast — a lot of changes landing quickly — made me nervous in a way I hadn't fully expected going in. I knew Claude Code's internals a lot better than I knew OpenClaw's, and trust in a system you're about to hand real autonomy to isn't something you assert — it's something you build. I ended up building it into Bodhi's own workflow later, the same way: lint, tests, a tightly controlled environment. At that point it was easier to build that trust on ground I already understood. There was a second, less defensive reason too — building this myself meant going deeper on Claude Code specifically, and that was directly useful. It's the tool we run for clients.

By March 4, Bodhi was running on Claude Code. That move went faster than it should have — I'd already been running Claude Code headless and scripted for the cloud agent project from [the first post in this series](/blog/cloud-agent-review-origin/). Pointing that same pattern at a personal assistant instead of a PR reviewer wasn't new work, it was reusing a pattern I already had. The OpenClaw-specific research didn't get thrown away either — heartbeat crons, delegation axes, the general shape of what a personal agent needs all carried forward. I just moved it onto ground I already knew how to run headless.

## Slack Was the Other Unlock

Bodhi also moved into Slack instead of Telegram, separately from the platform migration — not because of it. Telegram was just an easy starting point for OpenClaw. Slack was where I was already comfortable, a tool I already lived in, and I didn't need to add another one. That move mattered more than it sounds like it should. The terminal is where I go to get into the zone — heads-down, all-in on one task, until it's done. Slack was already where I did async work, the place I'd check in on things between other things, not the place I went to focus on one problem at a time. Once Bodhi lived there instead of in a terminal window, it stopped feeling like operating a tool and started feeling like talking to a teammate — a developer who could go off and actually do work while I was doing something else entirely.

That distinction mattered because "faster" was never really the goal. What I wanted was to move toward autonomous agents doing multiple things at once, not just an agent that answered me quicker when I was staring at it. A terminal keeps you synchronous by design — you're there, prompting, watching it work. Slack is asynchronous by design. Putting Bodhi somewhere I already worked asynchronously is what made everything else in this post make sense as one thing instead of a pile of separate features.

## The First Thing I Set Bodhi Up to Do in the Background

Bodhi's first real workload wasn't spontaneous — I built it on purpose, with limits. One cron ran twice a week and told Bodhi exactly what to look for in its own codebase: failing tests, missing coverage, dead code, simplification opportunities, even an audit of any outbound communication it wasn't supposed to be sending. It specified the exact shape to write findings in, too. A second cron ran every couple of hours, picked the next item off that list, fixed the small ones, broke the large ones into smaller pieces, and was bound by hard stops I wrote in on purpose: no messages, no touching credentials, no git push, no deploy, nothing to its own schedule without me approving it first.

It's a scoped, safety-railed system I designed on paper — prompt engineering, not autonomous initiative — built within about a day of the first findings actually showing up. The findings themselves were mundane: failing tests, gaps in coverage, missing basic project setup. But the two crons that turned "mundane findings" into an ongoing, self-managed backlog were the deliberate part, and the hard stops mattered more to me than the automation did.

Looking back, that list of stops was less airtight than it sounds. None of them covered the actual code sitting in its own workspace — it could rewrite that freely, and whatever it wrote would just run the next time a cron fired, or the next time I asked it to do something, with no review step in between. The guardrails were real, but narrower than I gave them credit for at the time.

That list — `todos.json`, the one I promised at the end of the last post — didn't stay in one place, either. The file itself got renamed twice in the first couple weeks, briefly split into two separate files once the general to-do list and the engineering backlog needed to stop being the same thing, then merged back into one a few days later once the split turned out to create more confusion than it solved. None of that was planned upfront. It's what actually happens when a system gets used instead of just designed.

## Crons Were There From Day One

Crons were the other big unlock, alongside Slack itself — an easy way to schedule background work for an agent instead of prompting it by hand every time. Obvious in hindsight, but I hadn't had anything set up like that before, and once I did, the list filled up fast: a morning brief with a personalized note tacked on, an evening check-in, a payment checker, an hourly research worker, a Sunday metrics sync, a weekday invoice check, and a Monday insights digest — seven jobs within the first week. Every one of them was silent unless something actually needed my attention, and anything that touched money — invoices, payments — had an approval gate instead of just acting on its own. That pattern wasn't a design decision I made up front. It's just what "an assistant I actually trust" looked like the first time I had to answer the question for real.

Most of what filled that queue in the early weeks was personal ops, not engineering — I was building the thing that runs my business, not a dev pipeline. That distinction matters for where this series goes next.

## Money Made It Real

Billing was the first real gap I automated, because it was a genuinely manual mess before Bodhi. I was invoicing by hand, checking by hand whether a payment had actually landed, and — since it's just the two of us with no W-2, only distributions — Dave and I were even paying each other manually. All of that moved onto Bodhi over the course of March, and the invoicing work specifically is what forced the whole pipeline to get reliable.

On March 23 I repaired the entire billing pipeline — payments, billing triggers, final invoices, note templates — and added auto-detection for over-hours work with a note in the approval prompt instead of silently billing it. Two days later was the biggest single push of the month: I replaced Resend with Gmail for draft-based invoicing, then spent the rest of the day rebuilding the payroll calculation — migrating it onto a shared calculation library as the single source of truth, adding date-range flags for partial periods, fixing the bonus math to use total hours instead of a subset, and fixing the payroll history to store an inclusive period end instead of the exclusive date the underlying API gave it. Small fixes, but each one was real money computed wrong until it was found.

You don't build careful approval gates and inclusive-date fixes for a toy. You build them because you're about to trust the thing with your own paycheck, and being wrong once is enough to make you paranoid about it forever after.

## The Handoff

On March 27, vitals-os entered the workspace as a synced shared repo — the same day vitals-os's own first commit landed. That's the seam where this stops being "my personal ops bot" and starts being part of something bigger. Dave had been building plan-session and dev-task in parallel the whole time, on his own thread. Mine was Bodhi, its todo list, its crons, and a review habit. Neither of us was building "Shipwright" yet. We were both just building the thing we personally needed, and it happened to start rhyming.

If you look at Shipwright's agent code today, it has the same shape as what Bodhi had from week one — a wrapper around Claude Code, a config module, error handling for failed cron runs. That's not a coincidence and it's not a rewrite from scratch. It's the same harness, grown up. Every piece of it still traces back to a specific morning I needed a payment checked or an invoice approved. If it can't point back to something that concrete, I don't think it belongs.

Next up: the two threads actually merge. Dave brings plan-session and dev-task, I bring Bodhi's todos, crons, and review habit, and vitals-os is where they stop being two people's side projects and start being one pipeline.
