---
title: "You Taught Claude Code Every Step. It Still Doesn't Ship."
date: "2026-08-01"
author: "Dan McAulay"
category: "Engineering Velocity"
excerpt: "We taught Claude Code every phase of shipping software — requirements, plan, code, review, deploy — and it still didn't ship on its own. The missing piece was never a skill. It was orchestration. Here's the state machine that ships our own product, hands off, for under $20 a PR."
readTime: "6 min read"
---

Here's something I ran into building our own product, and I don't think we're the only ones.

We taught Claude Code every step of shipping software. How to turn a rough idea into requirements. How to turn those requirements into a plan. How to write the code against that plan, review the diff, patch what the review caught, deploy it, monitor what's live, and debug what broke.

Eight skills. Every phase of building software, each one sharp.

And we still didn't have a single pull request making it to production without one of us standing over it — hand-carrying the work from one step to the next.

That stopped me. We'd solved every individual piece. So why wasn't anything shipping on its own?

Because a pile of skills isn't a pipeline. This one is for the person who can look at autonomous delivery, judge it on the mechanism, and move without waiting for a case study to give them cover. If that's you, keep reading. If it isn't, this won't land — and that's fine.

## The Phases Are Universal. That's the Whole Point.

Requirements, plan, code, review, patch, deploy, debug, monitor. Every company on earth building software moves work through some version of that sequence. It doesn't matter if you're two people or two thousand — the phases are the same.

That universality is exactly why they can be automated. They don't change from company to company, so the machine that runs them doesn't have to either. What changes per company is cosmetic. What's *missing* everywhere is the same thing: the layer that drives one unit of work through all eight phases without a human carrying it between each one.

## Skills Are the Labor. Orchestration Is the Management.

A skill knows how to do a phase. It does not know that it's phase four of eight. It doesn't know that phase three left the branch sitting in review, that CI just went red and it's now phase four's job to fix it, or that once it's green the work should advance to deploy on its own.

That state — where is this task, what's true about its pull request, what happens next — lives nowhere in a folder of skills. *You* are the state machine. You're the one remembering that PR #217 passed review and needs a merge, that the deploy half-finished, that the thing you shipped Tuesday is throwing errors and needs a patch task opened.

I've come to think of it the way I'd think about a team. A company of brilliant engineers with no process ships nothing. The labor was never the bottleneck. The management was.

So that's what we went and built.

## We Built the Manager

We took those universal phases and orchestrated them off the **state of a task and its pull request.**

A task enters as a requirement. The pipeline plans it, builds it, opens a PR, reviews the diff, patches what the review found, merges when it's green, deploys, and watches what happens next — and it decides each of those moves by reading the state the last one left behind. Nobody carries the work between phases. The state machine does.

That's the whole thing in one sentence: **orchestration keyed to the state of the work, running the phases every company already has.** We called it Shipwright.

## It Ships Itself. Fifty Times.

I'm not going to walk you through a demo on a sample repo. Here's our actual task store, right now:

- **50 tasks carried end to end — none abandoned.** 24 already deployed to production, the rest merged and queued behind them.
- **Across two real products** — Shipwright itself *and* our consulting-ops platform. Not toys.
- **35 of 36 tasks that tracked it ran with no human-in-the-loop gate.** The machine drove.
- **Pull request to production in under two hours on median — the fastest in nineteen minutes.**
- **Under $20 in model cost per shipped PR.** Requirement to reviewed, deployed code — for less than the price of lunch.

And the work isn't all greenfield feature-adding. One of those deployed tasks was *"Remove event-store providers, PostHog SDK, and HogQL layer."* That's surgery on a live system — a deletion threaded across a running codebase — planned, executed, reviewed, and shipped by the pipeline. The management layer doesn't just bolt on features. It maintains.

## The Economics Are the Part That Should Stop You

Sit with that cost number for a second, because it's the one that reframes everything.

An engineer-hour is worth many multiples of twenty dollars. We're carrying a requirement all the way to reviewed code running in production for less than that — and doing it while I'm asleep. That's not a discount on engineering. It's a different unit of economics.

Once the phases are orchestrated instead of hand-carried, the cost of shipping a change stops tracking human hours and starts tracking model tokens. That's a step change in the denominator, not a percentage off the top.

## And It's Zero-Risk to Try

Here's the part that made this an easy call for me, and I think it makes it an easy call for you.

Shipwright is built *on* Claude Code. Everything it does to sharpen each phase is Claude Code underneath. Pull the orchestration layer out and you keep every improvement — the skills are still yours, still runnable by hand. You only lose the predictable automation.

There is no lock-in to defend to anyone. You're not betting the company on a black box. You're adding a manager on top of engineers you already have — and if you ever want the manager gone, the engineers stay. That's a decision you can make on a Tuesday and not think about again.

## If You Can Already See It

You didn't need this post to tell you autonomous delivery is coming. If you've built even part of it yourself, you've already felt where the wall is. The wall is orchestration — and it's built.

If you need a committee to try this, we're probably too early for you. If you don't — let's run Shipwright on your pipeline. We're taking a small number of design partners and working directly with each one. **[Talk to us.](/contact)**

Or if you'd rather kick the tires first, the whole thing is open source — the proof is in the commit history. **[Star it and read the code.](https://github.com/app-vitals/shipwright)**
