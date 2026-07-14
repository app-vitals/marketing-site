---
title: "We Didn't Set Out to Compete With Devin — We Just Built the Tools We Needed"
date: "2026-07-10"
author: "Dave O'Dell"
category: "Company Updates"
excerpt: "A year ago we were making LiveKit voice tutorials. Somewhere between a mobile side project and an epic powder day, we accidentally built an open-source autonomous coding agent. Here's the origin story — and the philosophy underneath it."
readTime: "7 min read"
---

It was 16 degrees and dumping three feet of fresh snow at Mammoth. I was on a chairlift with my daughter, who is a far better skier than me — which is annoying, because I'm a ski patroller. Between runs I pulled out my phone, opened Telegram, and talked to my agent: "Hey, let's build a solitaire website."

By the time I got off the lift, it had scaffolded a version. I gave it feedback with my thumbs. A few runs later it had built a *different* version of solitaire, deployed it to Vercel, and all I had to do was buy a $12 domain and approve a couple of things. It was live that day. I never opened my laptop. I wasn't even typing — it was too cold, so I was just talking to my phone between powder runs.

That was the day it clicked for both Dan and me: we can ship real software without being in a terminal. Not "AI helps us type faster." Actually *away* from the machine.

We didn't set out to build a product that day. We didn't set out to build one ever, really. But that instinct — build the thing you personally need, right now, wherever you happen to be — is exactly how we ended up with an open-source alternative to Devin that we never planned to make.

## A Year of Accidents

App Vitals started a little over a year ago, and almost nothing about it went according to plan.

Dan and I began by making YouTube videos together. We were heads-down on AI voice — LiveKit was going to change everything, you could *call up an agent* — so we made a pile of LiveKit tutorials. (They're still up. Like and subscribe.) I picked up a couple of gen-AI product contracts, and then something predictable happened: my contacts stopped asking me to build AI things and just started asking me to build *things*. In the new year we pivoted again, into AI transformation — helping engineering orgs actually adopt tools like Claude Code instead of just buying licenses and hoping.

Every one of those pivots taught us something, but none of them was the plan. The plan kept getting overtaken by what was actually working. And the thing that was actually working, over and over, was that Dan and I are builders. We build stuff whether or not anyone is paying us to. That turns out to be less of a personality quirk and more of a business model.

## The 37signals Model, Pointed at AI

The philosophy we eventually landed on isn't ours — it's the [37signals](https://37signals.com) model, and we say thank you to DHH for it. Be consultants. Use that money to pay the bills. And in the meantime, build products for yourselves — tools you actually use every day — and if they turn out to be useful to other people, launch them.

We're not building Rails. But the shape is the same: solve your own problem first, in public later.

And here's the part that surprised us. Once we started building for ourselves, we didn't stop at one tool. We built our own billing system. Our own invoice tracking. Our own calendar booking. A whole internal system for the influencer/content side of the business. One by one, we replaced the SaaS products we were paying for with software we built ourselves — mostly with Claude, running through our own agent.

None of that was a roadmap. It was just: we needed the thing, so we built the thing. When your marginal cost of building a tool drops far enough, "just buy the SaaS" stops being the obvious answer. That's a genuinely new economic fact about running a small company, and most people haven't updated on it yet.

## From a Mobile Side Project to a Harness

The tool that became [Shipwright](/blog/shipwright-autonomous-dev-pipeline/) started as the least glamorous thing imaginable: I got put on a mobile project, and I don't know anything about mobile development.

So I did what I always do — I built a tool to cover the gap. I started writing a Claude Code plugin with a skill to help me do mobile work, and I made sure to wire in testing and development and review as I went. That plugin was the earliest version of Shipwright. It existed purely because I was out of my depth and too stubborn to stay there.

Then OpenClaude came out, and it changed everything for Dan and me at the same time.

For me, the magic was Slack. When I coded before, I was always *in the loop* — zoned into the terminal, in focus mode, doing the work myself even when Claude Code was doing the typing. My whole goal for the year was moving more of my work asynchronous, and Slack was where I already worked asynchronously and naturally. Once the agent lived in Slack, I started talking to it like a junior developer — queueing tasks, checking back later, reviewing PRs. That was the game changer. Dan had his own version of the same realization (his involved a chairlift).

But we made different choices about where to go next. I deleted OpenClaude pretty quickly — not because it was bad, but because our actual job was onboarding clients onto Claude Code, and the best way to get sharp at that was to rebuild what OpenClaude did *on top of* Claude Code myself. So I did. That rebuild became the Shipwright harness. Today it's two things: the plugin, and the managed agent that runs the whole pipeline.

## Why Open Source, Why Your Own Infrastructure

If you've seen Devin, you already understand most of what Shipwright does. You interact with it in Slack. You do the planning and the reviewing. It does the coding, the PRs, the testing, and the deploying — in the background, with no human in the loop for the middle of the pipeline. We [ship hundreds of PRs a week](/blog/we-code-autonomously/) this way, for ourselves and our clients, and we personally open almost none of them.

There are two differences that matter, and we didn't design them to win an argument with Devin — they just fell out of building for ourselves.

**Devin is closed source. Shipwright is open source.** You can read exactly what it's doing under the hood. It's mostly Claude Code skills plus a harness that walks work through a pipeline — plan, execute, build, review, patch, deploy — the same stages you already do by hand.

**Devin runs as a SaaS. Shipwright runs in your own infrastructure.** And because it's yours, it's yours to change. Everything has a common interface with pluggable implementations underneath — Linear, GitHub Issues, Jira, whatever your team already uses. Don't like how it plans? Swap in your own Claude Code skill and it starts planning your way. You wire it to your own marketplace, your own crons. It even runs maintenance loops on itself: scanning your Claude Code sessions to learn from them, watching your errors and logs to capture bugs and queue tasks, checking what you shipped for new inconsistencies.

To be clear: we did not build this to compete with Devin. We built it because we wanted to code overnight and didn't want a black box doing it. The competitive framing came later, from other people.

## Test Readiness Is the On-Ramp Nobody Talks About

Here's the honest catch, and it's the most important part of the whole episode.

If you have a greenfield project, you could start with Shipwright today. But for any existing codebase, autonomous programming doesn't fail at code generation — it fails everywhere else. Most companies' tests are flaky. They're slow. Coverage is thin. And you cannot hand work to an agent you can't verify. [Testing is Phase Zero](/blog/testing-is-phase-zero/) for a reason: without a repeatable verification process, "the agent finished" means nothing.

So the real first step isn't installing an agent. It's test readiness. We point the system at your repository and ask the boring, decisive questions: What do we need to add? What's your unit coverage? What's your *feature* coverage — which nobody ever measures, and which matters as much as line coverage? Where do we actually gain confidence, and are your tests fast enough to run in the loop?

Then it produces a plan. A human reviews the plan — that part stays human — and hands it off to the agent. The agent does the grind: it might take three days, it might take two weeks, depending on the repo. But you're not writing those tests. You're reviewing the work. And one day you look up and coverage went from 40% to 90%, the suite runs twice as fast, and you actually trust it. *Now* you can code autonomously. The beautiful part is you use Shipwright to get Shipwright-ready.

That's the throughline of everything we build: no one-offs. Everything is a system and a plan.

## We'd Build It Anyway

People ask how we're planning to make money on an open-source agent, and the honest answer is that it's already making us money — just not by selling the agent. It makes us faster on client work. It makes AI transformations land, because Shipwright integrates into how an engineering org actually works instead of demanding they change first. And when a team wants help getting started, or wants a feature built, or wants us to host it for them, that's a conversation.

But the deepest reason we're confident is the 37signals reason. If we had zero clients using Shipwright tomorrow, we would not stop developing it — because we use it every single day, for ourselves. That's what makes a tool durable. Not a roadmap. Not a market. The fact that you'd build it anyway.

We're at [app-vitals.com](https://app-vitals.com), and you can learn a lot more about the agent at [shipwrightharness.com](https://shipwrightharness.com). Come build something.

---

*This post is adapted from [The Velocity Lab podcast](https://podcasts.apple.com/podcast/the-velocity-lab/id1888653618), Episode 27: How We Accidentally Built an Open-Source Alternative to Devin.*
