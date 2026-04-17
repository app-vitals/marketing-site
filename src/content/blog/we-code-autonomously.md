---
title: "We Code Autonomously — And Here's Why That's Achievable Today"
date: "2026-04-17"
author: "Dave O'Dell"
category: "AI Adoption"
excerpt: "Dan and I have been coding autonomously for months. Not vibe coding. Actual production systems, 393 PRs in two weeks, 90% test coverage. Here's why we think most engineering teams can get there — and what it actually takes."
readTime: "5 min read"
---

Dan and I are coding autonomously.

Not "AI helps us write code faster." Not "we use Copilot for boilerplate." Autonomous. Our agents plan work, write code, handle CI failures, and merge pull requests while we're walking our dogs or talking to clients. We shipped 393 PRs in two weeks. We personally opened fewer than 10 of them.

I want to be honest about what made this possible — because the internet is full of vague claims about autonomous coding, and most of them skip the part that matters.

## This Isn't Vibe Coding

Vibe coding is what happens when someone uses a good AI model, ignores the rough edges, and ships something that demos well but breaks in production. It works for prototypes. It fails for systems.

What Dan and I are doing is different. We have 90% code coverage across the board. Every merged PR passed its full test suite. The codebase isn't a pile of AI-generated slop held together by hope — it's a system with structure, tests, observability, and a deployment pipeline that actually works.

The difference is what we brought to the table before we wrote a single agentic workflow.

## Why Most Teams Can't Do This Yet

Here's the uncomfortable truth: autonomous coding doesn't fail at the code generation layer. It fails everywhere else.

AI can write a function. It cannot fix a flaky CI pipeline. It cannot reason about a 45-minute build queue. It cannot fix tests that only fail on Thursdays because someone coupled a test to the system clock. It cannot navigate a deployment process that requires four approvals and a release manager.

When an agent hits those walls, it either halts, or worse, it works around them. And workarounds compound.

Dan and I spent years in engineering at Uber, Alto Pharmacy, and enterprise companies. We know builds, testing, CI/CD, observability, deployment — the entire SDLC, not just the code layer. We spent the last 10+ months heads-down in LLMs and agentic systems on top of that. The autonomous pipeline is the output of both things combined.

Remove either one and you don't have autonomous coding. You have autonomous code generation — which is useful, but very different.

## The AI Adoption Ladder

There's a progression to how teams get here. We call it the AI Adoption Ladder.

**Rung 1: Synchronous.** The tool writes and you supervise every line. Copilot-style autocomplete. Useful, but you can't walk away. Most teams are here.

**Rung 2: Supervised.** Claude Code or a similar agent handles a task while you steer. You review each step but don't write the code. Faster than rung 1, but still full-time supervision.

**Rung 3: Asynchronous.** You kick off a task and come back to review the output. PR review automation is a good example — send the agent a PR, it reviews, you check the result. We've written about [getting to asynchronous PR reviews](/blog/autonomous-coding-pipeline/) in detail.

**Rung 4: Parallel Asynchronous.** Multiple independent workstreams running simultaneously. This is where we operate. This is what produced 393 PRs in two weeks.

Most teams are stuck between rung 1 and rung 2. Not because the tools aren't good enough — they are. Because the infrastructure underneath the tools isn't ready to support autonomous execution.

## What It Takes to Climb Each Rung

**To get from rung 1 to rung 2**: You need to trust your test suite. If tests are brittle or missing, you'll be reviewing every line because you can't trust the output. Invest in test coverage first.

**To get from rung 2 to rung 3**: You need fast, reliable CI. An agent can't work asynchronously if every run takes 30 minutes and randomly fails. Fix your builds before you try to hand them to an agent.

**To get from rung 3 to rung 4**: You need structured agent workflows. Ad-hoc prompting doesn't scale to parallel work — agents drift, duplicate effort, or create conflicts. You need a research → plan → execute → validate loop that runs without supervision. This is what [Shipwright](https://marketplace.app-vitals.com) was built for.

There are no shortcuts through the ladder. Teams that try to jump from rung 1 to rung 4 don't get 393 PRs — they get a pile of half-finished code they don't know how to review.

## What This Means for Your Org

Dan and I are not special. We're two engineers who got every other layer right before we tried to automate the top layer. That's a replicable process.

The path isn't mysterious:
1. Fix your CI pipeline
2. Build real test coverage
3. Standardize your tooling
4. Find your champions and get them to rung 2
5. Extend the workflow toward rung 3
6. Scale from there

This is exactly the work we do with engineering teams. Not "here's a tool, good luck" — structured progression up the ladder with measurable milestones at each rung.

If you want to understand where your team is on the ladder and what it would take to climb it, that's what the [AI Velocity Assessment](/blog/ai-velocity-assessment/) is designed to answer.

---

*The detailed breakdown of how our autonomous pipeline actually works — Shipwright, the CI loop, cron execution, and what the 5% human contribution looks like — is in [392 Pull Requests in Two Weeks](/blog/autonomous-coding-pipeline/).*
