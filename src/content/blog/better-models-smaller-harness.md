---
title: "The Better the Model, the Smaller the Harness"
date: "2026-09-15"
author: "Dave O'Dell"
category: "Engineering Velocity"
excerpt: "Anthropic deleted 80% of Claude Code's system prompt and nothing broke. That one fact tells you almost everything about where AI tooling is heading, and why the scaffolding you build today should be designed to get smaller."
readTime: "7 min read"
---

Boris from Anthropic mentioned recently that they deleted 80% of the system prompt for Claude Code and nothing broke.

Sit with that for a second. Not "we trimmed it and accepted a small regression." They cut four fifths of the instructions the tool ships with, and the tool kept working. Every one of those deleted tokens used to get sent, and paid for, on every single request.

As a user, that is money back in my pocket the instant it lands. But the more interesting part is what it says about the direction of travel. All those instructions existed because at some point the model needed them. It needed to be told to search before answering. It needed to be told how to use its tools. It needed guardrails around behavior it would otherwise get wrong. Then the model got good enough that the instructions became redundant, and someone was brave enough to delete them.

That is the whole story of harnesses in one anecdote.

## The Harness Is the Part You Actually Own

A harness is the orchestration layer you wrap around an AI coding agent. Claude Code is a harness. So is Cursor. So is the thing your team hacked together with a cron job and a prompt template.

Dan and I build one called Shipwright, and it sits on top of Claude Code rather than replacing it. People find that confusing at first. If Claude Code is already a harness, why do you need another one?

Because Claude Code is deliberately general. It has to work for the person refactoring a Rails monolith and the person writing a Terraform module and the person who just wants to rename a variable. Generality is the right call for Anthropic. It is the wrong call for us, because we do not have a general problem. We have a specific one: take a task off a queue, open a worktree, write the code, review the pull request, respond to the review, merge it.

That specificity is what a domain harness buys you. Shipwright knows what a task is. It knows what a PR review looks like and what to do with the findings. It knows the difference between "this is ready" and "this needs a human." None of that belongs in a general-purpose tool, and all of it is the difference between an agent that demos well and an agent that ships.

We wrote more about where that line sits in [Shipwright vs. Devin](/blog/shipwright-vs-devin/). The short version is that the harness is the part of the stack you actually control, so it is the part worth being opinionated about.

## The Second Harness Doesn't Write Code At All

The version of this that surprised me most is what Dan is building now, which is a second harness sitting upstream of the first one. It writes no code whatsoever.

Its job is planning. It holds the KPIs, decides what is worth doing, designs the experiments, and hands work down to the coding harness. It started as a marketing agent, which sounds like a detour but was actually the proof. Once you give a Claude Code plugin a persona and a memory, it stops being a command you run and starts being something that improves at its own job over time. It remembers what it tried last month. It knows which headline won.

Point that at goals rather than at a repo and you have a planning layer. Point the planning layer at the coding layer and you have something that decides what to build and then builds it.

Most teams are still trying to get one agent to write one function correctly. The gap between that and a planning harness is not model capability. It is orchestration.

## Token Anxiety Is a Real Budget Line

Here is the unglamorous part nobody puts in the keynote.

Dan and I get token anxiety. It is the same feeling people with electric cars get about range. You are watching the meter, you are doing math in your head about whether you can finish what you started, and it changes what you are willing to attempt.

We have six agents running 24 hours a day. In June I paid two thousand dollars in overages because we were shipping so much. That is not a complaint, it was worth it, but it is a real number and it is why the 80% system prompt deletion is not just a curiosity to me. Every token of scaffolding you send is a token you pay for on every request, forever, across every agent you run.

This is also why the model conversation keeps circling back to cost. Companies are looking hard at Groq and DeepSeek right now, and it is not because they think those models are better. It is because their AI bill went from a rounding error to a line item that someone has to defend.

One client of ours runs a dedicated team whose entire job is evaluating new open-source models: security testing them, benchmarking them, deciding whether they are safe to bring inside. They are a forty thousand person company spending serious money on that question. For them the math works. For a company our size, it does not come close.

## The Model Is Not the Variable

My honest position is that Claude Code on Sonnet is still the best thing available, and that optimizing away from it would cost us more than it saves.

That is a continuation of something we argued a few weeks ago in [The Model Doesn't Matter Anymore](/blog/the-model-doesnt-matter-anymore/). Models leapfrog each other constantly. If you re-tool every time a benchmark flips, you never ship anything. The trust you have built in a model's output is a real switching cost, and it does not transfer.

What has genuinely changed is how much the harness has to compensate for. Models have gotten dramatically better at calling tools and searching on their own. Two years ago you had to tell the model to go look at the file. Now it just goes and looks. Every capability like that which moves into the model is a piece of scaffolding you get to delete.

Even the giants run multiple harnesses, by the way. Anthropic ships Claude Code, and a web UI, and other surfaces besides. Nobody has converged on one way to wrap a model, including the people who make the model.

## Better Models Want Smaller Harnesses

So here is where Dan and I landed, and it is the thing I would want you to take away.

A harness should start general and get domain-specific as you learn what you actually do. But over time, as the models improve, the harness should shrink. You should be deleting instructions, not accumulating them. Every release is a chance to find the scaffolding that has become redundant and take it out.

That runs against instinct. When an agent does something wrong, the reflex is to add a rule. Then another one. A year later you have a three thousand line prompt that nobody wants to touch, half of which is defending against failure modes the current model does not have anymore.

Anthropic deleted 80% and nothing broke. That should be a standing invitation to go look at your own scaffolding and ask which parts are load bearing and which parts are scar tissue.

The harness still matters enormously right now. It is what turns a capable model into something that ships work while you sleep. But if you build it expecting to keep it forever, you are building it wrong. Build it so that the better the model gets, the less of it you need.

---

*This post is adapted from [The Velocity Lab podcast](https://podcasts.apple.com/podcast/the-velocity-lab/id1888653618), Episode 36: The Better the Model, the Smaller the Harness.*
