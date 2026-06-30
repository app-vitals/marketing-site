---
title: "A Free 10X Is Sitting Right There. Now Justify Not Taking It."
date: "2026-06-28"
author: "Dave O'Dell"
category: "AI Adoption"
excerpt: "We open-sourced Shipwright — the autonomous agent that takes you from PRD to production with almost no human in the loop. It shipped ~500 of its own pull requests. The catch isn't the tool. It's that a 10X in throughput is a 10X in your token bill, which turns adoption into a decision only the person holding the purse strings can make."
readTime: "8 min read"
---

We built an autonomous coding agent that goes from a product spec all the way to a production deployment, and roughly 99% of the time no human touches the code in between. It plans the work, writes the code, writes the tests, opens the pull request, checks CI, fixes what's broken, addresses the review, merges, and deploys. Then it picks up the next task. We've been running it since November. And this month we open-sourced the whole thing — it's called [Shipwright](https://shipwrightharness.com), it's MIT, and you can have it today.

Here's the number that still surprises us when we say it out loud: the current Shipwright repository has around 500 pull requests, and between the two of us, we wrote maybe two or three of them by hand. The rest, Shipwright wrote. Shipwright built Shipwright. Dan spent his time shepherding PRs and denying the occasional bad task request; I spent mine on infrastructure and marketing. Neither of us sat and typed out features. One week we shipped 263 tasks with two agents running. Two people producing the throughput of a 20-engineer team — not because we're fast typists, but because we stopped typing.

That's the part worth sitting with, because it changes what the conversation about AI adoption is actually about.

## The tool was never the hard part

People assume the blocker to this kind of velocity is capability — that the agents aren't good enough yet, that the code is junk, that you'd spend more time cleaning up than you saved. That's not what we see. Plain Claude Code, even when you follow every best practice we teach, will happily put up a half-baked PR: no tests, CI red, no docs, because it skipped the steps. Shipwright doesn't, because the *system* won't let it. A single dev task carries 14 steps — write the endpoint, write the unit test, the integration test, the smoke test, update the docs, deprecate the dead code, open the PR, pass CI, fix CI, take the review, patch the review, merge, deploy. We started with one step. We're at 14. Next month it might be 15, because we tune it off metrics every week.

The agents run in your cloud, not ours — EC2, EKS, GKE, AKS, a Kubernetes cluster you control, or entirely on your laptop with one command. You talk to them in Slack like coworkers. You can run one agent or four thousand; they're free, you only pay for tokens. You can name them, give each one a personality, and point one at infrastructure review and another at application logic so their different lenses catch different things. This is the boring, load-bearing truth of the last year: [the tool is the easy part](/blog/why-ai-adoption-fails/). The system around the tool is the whole game, and a system is exactly what most teams never get around to building.

So if the capability is here and the system is free and open-source, adoption should be a stampede. It won't be. And the reason has nothing to do with the technology.

## The math nobody wants to say out loud

A 10X in throughput is a 10X in token spend. That's the catch, and it's not a small one.

Run the arithmetic. Say you have ten engineers burning $1,000 a month in tokens between them. You drop in Shipwright — free — and suddenly each of them is shipping ten times the work. Your token bill doesn't stay at $10,000. It tracks the work, so it goes toward $100,000. The tool costs you nothing. The *throughput* costs you a fortune. We feel it ourselves at a much smaller scale: I've maxed my weekly Claude token limit five weeks running, I run out of Sonnet most days, and the thing that keeps me up at night isn't that the agents will break something — it's that I didn't queue enough work before bed to keep them busy overnight. Even our GitHub Actions bill jumped, because shipping that many PRs means running that many test suites. Two hundred bucks in CI, just from velocity.

You're already watching this play out at the companies furthest ahead. The ones that built their own agents and their own systems are blowing through annual token budgets in a couple of months. That's not a sign the approach is broken. It's a sign the approach *works* — the spend is the shadow the throughput casts. But it reframes the whole decision.

Because if adopting autonomous agents means your token line goes up 10X, then the decision to adopt isn't a tooling call your VP of Engineering makes on a Tuesday. It's a budget decision. It belongs to whoever controls the purse strings — the CEO, the board, the person who has to absorb a line item that grew an order of magnitude. The CTO can prove it works in a week. Whether the company can stomach the bill that comes with it is a different question, asked at a different altitude.

## What engineers do when they stop writing code

If you take this seriously, the role of an engineer changes, and it's worth being honest about the direction.

If you're paying an engineer to write code, you're increasingly paying for the wrong thing. The valuable work moves upstream and downstream of the keyboard: knowing the product cold, knowing what *good* looks like, planning the work precisely enough that an agent can execute it, and then tuning the system so it executes better next time. Engineers still need to know how to write code — you can't direct or review what you don't understand, and [the path to senior judgment still runs through the craft](/blog/where-do-senior-engineers-come-from/). But the hours shift from producing code to architecting the system that produces it. You're not a bricklayer anymore. You're designing the machine that lays brick, and then making it lay brick better.

That's a genuinely uncomfortable shift, and we don't pretend otherwise. [The disruption that used to point outward is now pointing at us](/blog/your-engineering-career-was-never-safe/), and no amount of "it's just a productivity tool" framing makes that feeling go away. It's real, and it's underneath a lot of the resistance that gets dressed up as a technical objection. Pretending it isn't there doesn't help anyone adopt anything.

## Why we care about every token

Here's where the budget reality loops back into the design, and it's the part we're proudest of as builders. Because the bill is the constraint, we treat tokens as a first-class thing to manage, not an afterthought.

During planning, the system decides which model each task deserves. It mostly picks Sonnet. It drops to Haiku when the task is trivial. It reaches for Opus only when the work is genuinely hard. We're conscious about burning tokens at every step, so we don't run the most expensive model on a config change. And we measure everything — input tokens and output tokens are billed separately, so we track them separately, per task, per agent, with the dollar cost attached. When the constraint on your throughput is spend rather than capability, the discipline that matters is efficiency: getting the same work done on a cheaper model, and being able to see exactly where every token went. A system that 10X's your output *and* meters its own spend is a very different proposition than one that just floors the accelerator.

There's a longer-horizon version of this too. The system is built on Claude Code today, but the system isn't really *about* Claude Code — the shim to the underlying model is light, and most of the value lives in the skills, the steps, and the orchestration. As open models on hardware you control get good enough, a lot of the spend problem changes shape. We built it so that swap is work, not a rewrite. The asset is the system, not the engine bolted underneath it.

## The question you'll have to answer

So here's where we've landed, and we'll say it plainly because we think it's true.

There is now a free, open-source system that will, at minimum, 10X the throughput of every developer on your team. We know it works because we use it to build itself, in public, and you can read the commits. The cost of saying yes is real — it's a token bill that scales with the work, and it may force trade-offs elsewhere. But the cost of saying no is also real, and it compounds quietly: six months building an inferior version of this in-house, or no system at all while the teams around you pull ahead.

If you run an engineering organization and you look at this and choose not to adopt it, that's a legitimate choice. But it is a *choice* — you are deciding, on purpose, not to 10X your team when the tool to do it is sitting right there for free. We're genuinely curious what the justification sounds like. If you're a CEO, an investor, or an advisor, that's the question worth walking into your next engineering review and asking: *Have you looked at this — and if you have, tell me why we've chosen not to 10X the team for free?*

We don't make a dollar when you clone the repo. We'll help you integrate it and bring your engineers along if you want that, but the system itself is yours to take. Run `task stack up`, watch the whole thing — agents, web UI, task store, metrics, token costs — spin up on your laptop, and decide for yourself.

---

*This post is adapted from [The Velocity Lab podcast](https://podcasts.apple.com/podcast/the-velocity-lab/id1888653618), Episode 26: You're Choosing Not to 10X Your Team for Free.*
