---
title: "392 Pull Requests in Two Weeks: How We Built an Autonomous Coding Pipeline"
date: "2026-04-12"
author: "Dave O'Dell"
category: "Engineering Velocity"
excerpt: "Dan and I shipped 392 PRs in two weeks — and we personally opened fewer than 10 of them. Here's how our autonomous pipeline actually works."
readTime: "8 min read"
---

Dan and I have done fewer than 10 pull requests out of 392.

That's the number we landed on during recording this week. 392 closed pull requests in two weeks. One still open. And the two humans behind this codebase — a pair of DevOps engineers running a two-person AI consulting shop — contributed maybe 5% of it.

The other 95%? Fully autonomous. Agents planning, coding, reviewing, fixing CI failures, and merging — while we walked our dogs and talked to Slack.

This post is the breakdown.

## What "Autonomous Pipeline" Actually Means

When most people hear "AI coding agent," they picture a chatbot that writes a function when you ask nicely. That's not what this is.

Our pipeline is closer to a DevOps pipeline — except instead of automating builds and deployments, it automates the entire software development cycle. Research. Planning. Execution. Validation. Merge. Repeat.

We've written before about [building a system to build code](/blog/building-a-system-to-build-code/) and the philosophy of [engineering for velocity at the pipeline level](/blog/velocity-engineering/) rather than just individual developer output. This is what that looks like at full operational scale.

The core components are:

**Claude Code as the engine.** Our agents — Sully and Bodhi — both run on Claude Code, each living on a Raspberry Pi, each connected to Slack. They receive instructions, plan work, write code, and push PRs.

**Shipwright as the structured workflow.** This is our plugin, available on the App Vitals marketplace. It enforces the research → plan → execute → validate loop. Without structure, agents drift — they start inventing features, skipping tests, or producing code that works today but creates problems tomorrow. Shipwright is the guardrail that keeps them focused and measurable.

**Cron-driven execution.** There's a cron job that kicks the pipeline off. It doesn't wait for us. It picks up the next task, runs the full cycle, and moves on. This is why 392 PRs happened in two weeks — the system ran continuously, not just when we were sitting at our laptops.

**Self-healing CI loops.** When a PR opens and tests fail, the agent doesn't stop. It reads the GitHub Actions logs, identifies the failure, patches the code, and commits again. It loops until everything is green. Every merged PR has passed its full test suite. We're holding 90% code coverage across the board.

## Why 95% Is Actually the Hard Part

People ask us what percentage the agents handle vs. what we handle. The answer is about 95/5.

But that framing undersells what 95% means in practice. The agents aren't handling the easy stuff while we do the hard stuff. They're handling planning, implementation, debugging, test coverage, and CI validation — the bulk of the actual engineering work. What we contribute is direction and judgment: the upfront planning pass, the occasional course correction, and the final 5% where things like production deployment, infrastructure decisions, and architectural sanity checks require human eyes.

That last 5% is also the part that tends to trip up vibe-coded pipelines. Any tool can open a PR. Shipping to production, setting up monitoring, and keeping architecture sane as a codebase grows — that's where things fall apart if nobody's watching. We're watching. That's the value of the human-in-the-loop for the 5%, not the 95%.

The [velocity trap](/blog/velocity-trap/) we see in a lot of AI adoption is teams optimizing the wrong part of the cycle. They speed up individual coding while leaving planning, review, and deployment as the bottleneck. We went the other direction — we structured the entire pipeline and let the agents run the middle.

## The Honest Part: Planning Still Matters

We're not going to oversell this. Early in the process, we took shortcuts.

Dan would send a voice note to his agent while walking his dog — "hey, add this feature" — and the agent would go build something. We got code back. Sometimes it was great. Sometimes we had to go clean up choices the agent made with incomplete context.

The pattern we've converged on: invest in the planning phase. When we give agents a proper planning session — actual context, clear scope, defined acceptance criteria — the output quality jumps significantly. The Shipwright plugin enforces this formally: there's a planning step that runs before any code gets written, and the agent does real research into the codebase before it starts touching files.

When we skip that? We get working code that we still have to go edit. When we do it right? We come back to PRs that are ready to merge.

We talked about this exact dynamic in [our post on CI pipeline bottlenecks](/blog/ci-pipeline-bottleneck/) — the cost of finding problems late is always higher than the cost of getting context right upfront.

## What We Actually Built With It

The codebase we've been running this on is Vitals OS — our internal ops platform. We're replacing a stack of third-party SaaS tools we were paying for and patching around: time tracking, billing, calendar booking, invoicing.

We built all of it with the pipeline. Time tracking module. Billing engine. Calendar app with proper multi-person scheduling (Cal.com couldn't handle booking for both of us cleanly). Full CI with five jobs — lint, test, typecheck, end-to-end Playwright tests, Docker build. All of it agent-driven, all of it tested, all of it sitting behind passing GitHub Actions.

The product is real. It works end-to-end. And most of the code in it was never directly touched by either of us.

What we contributed was architecture decisions early on, and about 20 combined PRs across two weeks where we patched something the agent got wrong or made a judgment call that needed a human. That's it.

## What This Looks Like for a Client

Here's the practical pitch, because we're not building Vitals OS just for ourselves.

If you're a founder with a product vision but limited engineering bandwidth, or a technical leader who wants to accelerate a team without scaling headcount — this pipeline is deployable to your codebase.

The setup involves getting your repositories into shape so the agents have what they need: established patterns, documented conventions, clear task definitions. We know what agents need to be successful because we've been running them for months. That prep work is what makes the difference between 95% autonomous and 60% autonomous.

Once it's running, your interaction model is: you brainstorm and direct, the agents build. You get pinged in Slack when something is ready to test. You review, give feedback, and move on to the next thing. If you're building a mobile app, it pushes to TestFlight. If something breaks in a way the agent can't self-heal, we're there to get in and fix it — because we're running this same pipeline on our own code every day. We know where the edge cases live.

It's different from fully hands-off autonomous tools where you're on your own when something goes sideways. We're in the system. We've done 400 PRs on it. We know how it behaves.

## The Metrics That Tell the Real Story

392 pull requests. 90% test coverage enforced on every single one. Two human contributors out of a team that is almost entirely agents.

But the metric we're actually tracking isn't PR count — that's an output, not an outcome. What we're tracking is cycle time: how long from task definition to merged, tested, deployed code. And we're capturing it on every run through PostHog so we can see where the pipeline slows down, where it fails, and how it improves over time.

This is what distinguishes a real pipeline from a vibe-coding session. Vibe coding is fun. It produces results. It doesn't compound. A structured pipeline with metrics gets measurably better every week because you're capturing what works and what doesn't.

We're one month in. Already at 95%. The trajectory is toward a pipeline that makes the 5% exception rarer and rarer.

## What's Next

We're taking on our first client with this pipeline. The goal is to prove the model outside our own codebase — same Shipwright-driven workflow, same metrics loop, same human oversight layer, but applied to someone else's product.

If you're building something and the bottleneck is engineering execution — not ideas, not market fit, not funding — we want to talk to you. We're not selling you a tool. We're offering to run an autonomous coding pipeline on your behalf, with Dan and me watching the 5% that still needs human judgment.

Hit us up at [app-vitals.com](https://app-vitals.com).

---

*This post is based on Episode 8 of The Velocity Lab: "Vitals OS: The Autonomous Coding Pipeline," recorded April 12, 2026. Listen on [Apple Podcasts](https://podcasts.apple.com/podcast/the-velocity-lab/id1888653618).*
