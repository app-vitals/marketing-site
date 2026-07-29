---
title: "The Harness Is All You Need. So We Built One in the Open — and Made It Easy to Leave."
date: "2026-07-29"
author: "Dave O'Dell"
category: "Engineering Velocity"
excerpt: "GitHub says the harness — not the model, not the tools — is where the leverage is. They're right. Here's the step past where their argument stops, and why being a thin, open layer on Claude Code beats going fullstack."
readTime: "5 min read"
---

GitHub's Burke Holland made an argument last week that we've believed for a while, so it was good to see it said out loud: the leverage in AI-assisted engineering isn't the model, and it isn't the pile of tools you bolt on. It's the **harness** — the layer that plans, picks the model, runs the subagents, and drives the loop. Master that, he argues, and you stop chasing the next shiny MCP. Chase tools instead, and you're collecting gimmicks.

He's right. We'd just push the argument one step further than [the post](https://github.blog/ai-and-ml/github-copilot/the-harness-is-all-you-need-mostly/) does — and that step is the whole reason we built Shipwright.

## The ceiling in the argument

Read the workflow Holland lays out and notice who's in the chair the entire time. Pick a tool. Turn on autonomy. Prototype. Plan. Implement. Iterate. Rubber-duck. Ship. Every one of those steps has a human driving — plan *it*, iterate on *it*, review *it*, ship *it*. The harness is a phenomenal copilot. But you're still flying the plane, hands on the yoke, for the length of the flight.

That's not a criticism. For a lot of work it's exactly right. But it's a ceiling, and the interesting question is what sits above it: **what does the harness become when it closes the loop itself?** When the human moves from the keyboard to the approval gate?

## Plan → queue → loop

That's the part we built. Not a better model — we don't make one. Not a better IDE. The delivery system that sits *around* the harness and runs the loop when you're not watching:

- **Plan.** Decompose a goal into a queue of concrete, reviewable tasks — the same "plan before you implement" discipline the GitHub post rightly insists on, made durable instead of living in one session's context.
- **Queue.** A persistent work store. Tasks wait, get picked up in dependency order, and survive across sessions, restarts, and days. Not a chat you have to babysit.
- **Loop.** An autonomous cycle that pulls the next ready task, builds it, opens a PR, runs the review, reconciles state, and moves on — on a schedule, without a human re-prompting it each step.

You stay in the loop where it counts: approving what ships, steering priorities, killing bad ideas. You leave the loop where you shouldn't have to be: re-typing "okay, now do the next one" forty times a day. We run this on our own codebase every week — the PR count is on a [public proof dashboard](https://proof.shipwrightharness.com/public/dashboard), and we personally open almost none of them.

## Why we didn't go fullstack — and why that's the point

The other agents in this space — Devin, Cursor, Copilot — go all the way down to the model. Fullstack. That's a real strategy, and it's not ours. Shipwright is a deliberately thin layer on Claude Code. We ship zero inference code. We shell out to the harness Anthropic already built, and we build the delivery system on top.

People sometimes hear "thin layer" as "just a wrapper." We hear it as the strongest position on the board, for three reasons:

**Their progress is our tailwind.** When the underlying harness gets a better planning mode, safer autonomy, cheaper context — we inherit it for free. We're not carrying the cost or the pace-risk of owning a model. We spend our whole budget on the part that's ours: the loop.

**We build the part the platform doesn't.** Claude Code itself has a Slack integration now — tag it, and it spins up a session against your repo. It's great for a bug or a quick review. But it's a *session launcher*, not a delivery system: no persistent queue, no plan-then-decompose step, no autonomous loop that pulls ready work on a schedule and reconciles review state. That gap is exactly what Shipwright is. The platform gives you a door to the harness. We're the system built around it.

**You can see all of it.** It's open source, MIT licensed. Before you commit to anything, you can read exactly how the harness is wired — no fullstack black box, no "trust us."

## The part nobody else can offer: an easy exit

Here's the line we care about most, and we're going to be precise about it, because the sloppy version isn't true.

If you stop using Shipwright, you lose Shipwright — the engine, the queue, the loop. We're not going to pretend otherwise. But everything it *wrote into your repo* stays: the CLAUDE.md, the docs, the skills, the slash commands. Those are plain Claude Code primitives. They keep working on vanilla Claude Code with Shipwright completely removed. The only thing you'd tear out is the orchestration you were self-hosting anyway.

Compare that to the fullstack agents. Leaving one of those means leaving your whole workflow behind — it lived in their stack, and it doesn't come with you. Lock-in is the business model. Ours is the opposite: **the exit is cheap, clean, and leaves your repo better than it found it.** We're not betting you can't leave. We're betting that once you've felt plan → queue → loop actually close, you won't want to.

That's the ladder. Try it as a low-risk trial — it's open, you can read every line. Learn how a real harness is built. And if you ever walk away, you keep everything it taught your codebase.

The harness really is (mostly) all you need. We just think you shouldn't have to build it from scratch — or get locked into someone else's to use one.
