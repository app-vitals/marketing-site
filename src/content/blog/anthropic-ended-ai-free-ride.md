---
title: "The AI Free Ride Just Ended"
date: "2026-05-20"
author: "Dave O'Dell"
category: "AI Adoption"
excerpt: "VC-subsidized AI was always going to end the same way Uber did. Anthropic just pulled the subsidies on autonomous coding, and a $200/month plan becomes a $1,000–$5,000/month line item if you keep doing what you were doing."
readTime: "7 min read"
---

I lived in the East Bay for years. There was a window when an Uber across the Bay Bridge was twenty bucks. You knew, even as you took it, that the price wasn't real. Lyft and Uber were burning venture money to teach a generation of riders a habit and to put the taxi companies out of business. It worked. The taxis are gone. An Uber across the bridge is a hundred dollars now.

This week, Anthropic pulled the same lever on us — and on every other team that's been running cloud agents on the Claude Code Max plan.

If you're paying $200 a month and your code is being shipped by autonomous agents in the background, you should pay attention to what happened, because the bill is about to change a lot more than it looks like on the surface.

## What actually changed

Two moves, one direction. First, OAuth tokens lost their free pass for tools like Open Cloud — you can still authenticate, but you're now paying API fees for the same work. Anthropic softened it with a $200/month credit, which on the surface looks generous and on closer inspection mostly clarifies the math: $200 of credits will buy you a fraction of what $200 of subscription used to.

Second — and this is the load-bearing one — the Claude Code Max plan you and I have been treating as effectively unlimited just got a usage budget for **autonomous** workloads. In the loop with Claude Code, you're fine. Not in the loop — which is to say, agents running unattended in the background, kicking off jobs, opening PRs, working while you sleep — you're now metered. That's the world we and a lot of you have been quietly living in for months.

## The math, with the soft parts pulled out

The relevant number isn't $200 vs $200. It's $200 vs whatever your same workload costs at API rates. I've seen the napkin math from a few corners of the internet land on roughly **5–25× the subscription price** for moderately active autonomous use. Our own load — call it "a couple of operators running ShipRight against client projects 24/7" — looks like at least **$1,000/month**, possibly more.

That's not a tweak. It's the gap between "AI is a fixed software cost" and "AI is a variable line item that scales with how much work you do." Two different mental models. Two very different planning processes.

Even if you'd rather think about the philosophy than the bill, plan for the bill anyway. The companies that survived the Uber pricing reset are the ones that did the math while the subsidy was still on.

## "It was always going to happen" is not a strategy

I don't want to pretend we didn't see this coming. You knew. I knew. Whenever you can pay $200 for what reasonably costs thousands, somebody is burning a check to make that math work, and they aren't doing it forever. Calling the end of the subsidy "unfair" misses the point. The subsidy was the gift; the reset is the default state.

What does matter is what you do in the thirty-day window between "this is changing" and "this is the new bill." There are basically three honest options.

## Option 1: Eat the cost

If you're selling outcomes and the agents are doing the work that produces those outcomes, the new pricing might just be a real line item. A thousand dollars a month for a sufficiently leveraged operator is a rounding error against the throughput it produces. It's not the move I'd default to, but it's not the wrong move either — especially if your revenue scales with the agents' output.

The trap here is treating it as "we'll figure it out later." Later is when the bill arrives with no plan attached, and that's how reasonable monthly costs become emergencies.

## Option 2: Optimize, hard

This is what we're doing. There's a lot of fat to cut once you actually look:

- **Gate non-deterministic crons behind deterministic checks.** We have a cron that picks up new tasks every hour. Half the time there's nothing in the queue, and we were burning tokens just to *learn* that. A two-line script that reads Linear (or Jira, or your todos backend) and only fires the agent when there's actual work is most of the savings, sometimes.
- **Split planning and execution across model tiers.** The big model is great at planning. Execution against a clear plan is often a job for a cheaper, faster model. Spending Opus tokens to run code that's already been designed is throwing money at the wrong step.
- **Lock down the always-on laptop.** Once your laptop is a Caffeinate-running, mobile-prompted, in-the-loop coding station, the surface area for unintended runs gets bigger. Tighter permissions there protect both your credit budget and your repo. Our [damage-control patterns](/blog/ai-pr-review-bottleneck/) take on a new meaning when the cost of an agent running away with itself isn't just a broken branch.

The discipline that pays for itself here is the one we've been telling clients for months: **treat agents like a junior team and review the system, not every change.** When the only constraint was time-in-the-loop, sloppy was tolerable. Now sloppy has a price tag.

## Option 3: Re-evaluate the tool

We get the question every week now — "should we switch to Codex?" The honest answer, as of this writing, is no. Not because Codex isn't good. Because **Claude's ecosystem is a year ahead.** Skills, plugins, MCP, the patterns the community has built around Claude Code — that's the actual moat, and you don't switch tools to save a few hundred dollars a month when you'd give up a multiple of that in productivity.

We've talked about this before in [why ecosystem beats benchmarks](/blog/let-builders-build/), and the pricing reset doesn't change the calculus. It might tighten our optimization, but we're staying with Claude. Codex might catch up. We'll watch. Tools change. But you don't change tools on a thirty-day window because of a billing change.

## What this actually is

Strip the noise away and the lesson is unspectacular: **AI economics are about to look like real economics.** For two years we've been letting venture money make our line items look smaller than they were. The number on the invoice was never the cost — it was the marketing budget.

That era is closing. Anthropic is profitable-on-paper, raising at valuations that imply they need to behave like a real business, and the easiest place to start behaving like one is to stop letting heavy users run autonomous workloads on a subscription that was priced for a different shape of demand.

The operators who'll be fine aren't the ones who complain loudest about the change. They're the ones who already know what their agents actually cost — per minute, per task, per outcome — and adjust without drama. That's where we're trying to be. If you're not there yet, the thirty-day window is exactly long enough to get there.

The free ride was real, and we took it. Thanks, Anthropic. Time to grow up.

---

*This post is adapted from [The Velocity Lab podcast](https://podcasts.apple.com/podcast/the-velocity-lab/id1888653618), Episode 20: Anthropic Just Ended the AI Free Ride.*
