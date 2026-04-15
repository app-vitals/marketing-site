---
title: "We Built 254 Pull Requests in 7 Days. Here's the System Behind It."
date: "2026-04-04"
author: "Dave O'Dell"
category: "Engineering Velocity"
excerpt: "Dan and I shipped 254 PRs in seven days using AI agents — most while we slept. This is what we built and how it actually works."
readTime: "8 min read"
---

Last Friday, Dan and I finished recording our podcast, went home, and started building. By the following Friday, our AI agents had opened and closed 254 pull requests — roughly 37 a day, sustained across seven days, with a 90% minimum test coverage gate enforced on every single one.

Dan and I combined probably spent 10 hours actively involved.

This isn't a flex post. It's a breakdown of what we actually built, what broke, and what the number means — because "254 PRs" without context is just noise. With context, it's a window into a fundamentally different model of how software gets built.

## The Setup: Two Agents, One Codebase

We each have an AI assistant living on a Raspberry Pi. Mine is Sully. Dan's is Bodhi. They're both Claude-based, wrapped in [OpenClaw](https://github.com/anthropics/claude-code), and they communicate through Slack — with each other and with us.

The interesting thing is what happened when we just... let them run. They didn't wait for instructions. They opened a thread, coordinated, and started building. If Sully creates a pull request, Bodhi reviews it. If Bodhi finds something wrong, Sully patches it. They loop. We mostly watch.

The reason this works isn't magic. It's because over the past several months, we've been building something we call a harness — a structured system for how AI agents plan, execute, and validate code. This week was the first real stress test of that harness at scale.

## What the Harness Actually Is

Most people think about AI coding as: you write a prompt, AI writes code, you review it. That's vibe coding. It works for quick one-offs. It doesn't work for sustained, autonomous software development.

Our harness is a set of skills, workflows, and feedback loops that structure how the agents work. It's not one thing — it's layers:

**Planning.** Before any code gets written, there's a planning pass. The agent reads the codebase, understands the task, scopes the work, and produces a structured plan. We learned this the hard way — early in the week we kicked off work without proper planning (Dan was literally dictating features while walking his dog on Slack). We ended up with a working-but-messy monolith that we had to rearchitect three days in.

**Execution.** The actual coding pass runs against that plan. We use a Shipwright plugin that enforces the plan → execute → validate flow. Agents don't jump to code without a plan; plans don't sit idle without execution.

**Simplify.** After code is written, a simplify pass runs. It looks for unnecessary complexity, dead exports, redundant dependencies, code that does the same thing two different ways. Bodhi spent part of Wednesday just cleaning up TypeScript exports that nobody needed. We didn't ask him to. The harness told him to look.

**Review.** Every PR gets a review pass before merge. Not a rubber stamp — a real review that catches bugs, flags test coverage gaps, checks for [context bleed](/blog/context-problem/) and slop.

**CI gates.** GitHub Actions enforces 90% minimum test coverage. No green CI, no merge. This isn't a soft suggestion. It's a hard gate. The agents know it, so they write tests. Good tests, not throwaway coverage padding.

Every one of these steps is instrumented. Which brings us to the part that changed everything.

## Metrics: The Step That Changed Everything

We added PostHog metrics last week. This sounds like a small operational detail. It's not.

Before metrics, we had learning loops — agents would finish a task, reflect on what worked, and update their skills and context files. Good practice, but fundamentally anecdotal. The agent is judging its own output.

With metrics, we have ground truth. How much does the simplify pass actually change? How many bugs does the review pass actually catch? How much does coverage drift between tasks? The agents can now read these numbers themselves through an MCP server integration. They're not just coding — they're tracking whether their coding is improving.

The goal we're working toward: a simplify pass that has nothing to change means the code was right the first time. A review pass that finds no bugs means the execution pass is solid. When those numbers hit zero consistently, we're producing code that's as close to perfect as autonomous generation gets — reliably, at scale.

We're not there yet. But we're measuring now, which means we can get there. You can't improve what you can't measure, and for a while we were flying blind on whether the harness was actually getting better or just busier.

## Why Async Changed Everything for Me

Here's a thing I didn't expect: getting out of the terminal was the unlock.

After 20-plus years of coding, I had a deeply ingrained way of working. Terminal open, full focus, no context switching. When I started using Claude Code, I was still basically coding — I'd watch the agent, tweak prompts, stay in the zone. It was faster, but it wasn't fundamentally different.

Moving to Slack changed the frame. Slack is async by nature. I've been using it for 15 years. I'm wired for it. When I'm talking to Sully through Slack, I'm not watching the build — I'm queuing tasks, checking in, redirecting when needed, and doing other things in between. It's less like coding and more like managing a teammate I trust to handle execution.

This is not a minor UX preference. It's a different mode of working. When the interface forces synchronous engagement, you stay in the loop even when you don't need to be. When the interface is async by default, you naturally step back — and the agent naturally steps up.

## The Diversity Thing

One of the most surprising parts of this week was watching Sully and Bodhi disagree.

We use the same model. The only real difference is their memory — what they've each learned from their respective work with Dan and me. But when we pull them both into a thread and ask the same question, they don't give the same answer. Their context is different. Their perspective is different.

We had a situation where a PR got merged even though not all tests passed. We pinged both agents asking what happened. They both acknowledged it, owned it — and then gave different explanations for how it occurred and different suggestions for how to prevent it. One focused on the CI configuration. The other focused on the review pass not catching the failure state.

Both were right. Neither was complete without the other. That's the point.

When people talk about AI diversity, they usually mean training data diversity. What we're seeing is something more interesting: emergent perspective diversity from different operational histories. These two agents have built different mental models of the same codebase because they've each touched different parts of it differently. That's genuinely valuable.

## What We Got Wrong (And What It Cost Us)

We broke our own rules at the start, and we paid for it.

No planning pass. Dan was sketching architecture on a dog walk. I kicked off work without reviewing any of it. Three days in, we had a working monolith and a messy one. We spent two days on rearchitecture — migrating to microservices — that we could have avoided with a proper planning session up front.

The lesson isn't "AI is bad at greenfield work." The lesson is that the constraints we built into the harness exist for a reason. When we skip the plan, the agents default to reasonable assumptions — and reasonable assumptions on a greenfield project often mean "assume this is going into production soon" and "optimize for what works now, not what scales." Neither of those is wrong, exactly, but neither is right for a system you're actively designing.

The harness is designed to enforce the planning gate. We bypassed it because we were excited. Classic.

## Where This Is Going

The system isn't done. It's never done. We made at least seven harness improvements this week alone — small changes to how agents plan, how they handle test failures, how the review pass is structured. Each improvement compounds.

Next up: A/B testing. We want to be able to make a change to the harness, measure whether that change improves output quality, and roll it back if it doesn't. Same principle as [velocity-engineering](/blog/velocity-engineering/) applied to the system itself — the harness should be as measurable and iteratable as the product it builds.

The longer-term goal: the harness should self-improve. Agents reading their own metrics, identifying where they're underperforming, proposing improvements to their own skills and workflows. Not a thought experiment — we have most of the pieces. The metrics layer was the missing one.

## What This Means for Engineering Organizations

Most engineering teams aren't ready for this. That's not a criticism — it's an observation. What we did this week required months of infrastructure work, a deep willingness to experiment and break things, and two practitioners who do this professionally and still managed to skip their own planning process.

The [velocity trap](/blog/velocity-trap/) is real: teams adopt AI tools, see some improvement, and stop there. The tools are not the system. The tools are inputs to a system. If you don't build the system — the planning layer, the feedback loops, the metrics, the gates — you get faster slop instead of slower slop. That's not a win.

What we think the real unlock looks like: take a handful of your best engineers, give them a focused period to build an agentic engineering system from scratch — research, planning, execution, validation, metrics — and then bring that system back and let it compound. Not incrementally adopting AI features on top of existing workflows. A clean rebuild of how software development works, with AI at the center.

It's a harder sell than "here's a better autocomplete." But it's the one that actually changes the math.

We're out here proving that math every day. If you want to understand what it takes to build the system — or you want someone to build it for you — that's what we do.

---

*This post is adapted from [The Velocity Lab podcast](https://podcasts.apple.com/podcast/the-velocity-lab/id1888653618), Episode 4.*
