---
title: "Shipwright: How We Built a Mostly Autonomous Dev Pipeline for Claude Code"
date: "2026-03-25"
author: "Dave O'Dell"
category: "Engineering Velocity"
excerpt: "We built a Claude Code plugin that plans projects, executes tasks, runs multi-agent code reviews, and merges PRs — mostly without human intervention. Here's how it works and what we learned."
readTime: "7 min read"
---

Last week, I pointed an AI at a product spec and walked away. When I came back, it had generated a 1,900-line task breakdown covering 7 features, 45 tasks, 5 development phases, and estimated 128 hours of work. Then it started building.

No, this isn't hype. This is [Shipwright](https://github.com/app-vitals/marketplace), a Claude Code plugin we built at App Vitals that turns product requirements into shipped software through a structured, mostly autonomous pipeline.

## The Problem We Were Solving

If you've used Claude Code for more than a week, you've hit this wall: it's incredible at individual tasks, but it has no memory between sessions. No structure. No pipeline. You end up being the orchestrator — feeding it context, checking its work, managing branches, running tests, creating PRs. We've written about why [context is the real bottleneck](/blog/context-problem) — Shipwright is our answer to that problem at scale.

That's fine for small tasks. It doesn't scale to building real products.

We needed something that could take a product spec and systematically work through it — planning, implementing, testing, reviewing, and merging — with human oversight at the right checkpoints, not at every step.

## What Shipwright Actually Does

Shipwright is five commands:

**`/plan-session`** takes a folder of requirements docs and produces a structured task breakdown. Not a vague outline — a detailed document with granular tasks (1-8 hours each), pre-answered implementation decisions, branch names, dependency chains, acceptance criteria, and coverage targets. It auto-detects your toolchain (Node, Python, Rust, Go, Ruby) and adapts accordingly.

For projects with a UI, it automatically includes Playwright end-to-end tests in the plan. No frontend project should ship without E2E tests, so we built that detection in.

**`/dev-task`** picks up a single task and runs it end-to-end: create branch, implement, write tests, validate, simplify, verify acceptance criteria, run pre-ship checks, push, create PR. With the `--merge` flag, it continues into multi-agent code review and auto-merges.

**`/dev-loop`** is where it gets interesting. This runs `/dev-task --merge` in a continuous loop — picking the next task with satisfied dependencies, executing it, confirming the merge, and moving on. It pauses only when it genuinely needs human judgment: acceptance criteria gaps, build failures, or blocked dependencies.

**`/review`** launches parallel review agents — code review, silent failure hunting, test analysis, type design — and produces a structured report with confidence-scored findings.

**`/refresh-plan`** syncs a stale planning doc against the current codebase state, checking file paths, completed dependencies, and already-met acceptance criteria.

## Standing on the Shoulders of the Community

Here's the thing: we didn't build this in isolation. The Claude Code plugin ecosystem is evolving fast, and Shipwright deliberately integrates with other plugins rather than reinventing what already works.

[`learning-loop`](https://github.com/app-vitals/marketplace) captures patterns from code reviews and promotes them to `CLAUDE.md`, so your project literally gets smarter over time. Every review finding that reveals a recurring issue becomes a convention that prevents the next one. It's the technical implementation of what we describe in the [AI Champion Playbook](/blog/ai-champion-playbook) — building internal knowledge that scales.

[`frontend-design`](https://github.com/anthropics/claude-code/tree/main/plugins) from Anthropic's plugin collection ensures UI tasks don't produce generic AI-generated interfaces. When a task is tagged with the design skill, it gets a dedicated design pass.

[`damage-control`](https://github.com/app-vitals/marketplace) provides defense-in-depth via PreToolUse hooks — blocking dangerous commands and protecting sensitive files. Because when you're running autonomous dev loops, guardrails matter.

We also learned from the community's patterns around structured orchestration, distillation, and context management. The marketplace model — where plugins compose rather than compete — is what makes this possible.

## What We Learned Building It

**Planning is the highest-leverage step.** The quality of the task breakdown determines everything downstream. If the plan has vague acceptance criteria or missing implementation decisions, the dev loop will stall. We spent more time refining `/plan-session` than all other commands combined.

**Pre-answering implementation decisions is crucial.** Each task in the breakdown includes five pre-answered fields: edge cases, error handling, scope boundaries, backward compatibility, and performance considerations. Without these, the dev task has to make judgment calls that should have been made during planning. That's where autonomous execution breaks down.

**Toolchain detection eliminates a whole class of failures.** Early versions had hardcoded `pnpm` and `cargo` references. Now Shipwright reads your lockfiles, package managers, and workspace configuration to adapt all build, test, and lint commands automatically. Multi-ecosystem projects (Node.js + Rust, for example) just work.

**Multi-agent review catches what single-pass review misses.** Running parallel review agents — each focused on a different concern — produces dramatically better reviews than a single pass. The silent failure hunter alone has caught dozens of issues that looked correct but would fail silently in production.

**Permission pre-flight prevents interruptions.** `/plan-session` Phase 7 auto-detects every permission the pipeline will need and pre-populates `.claude/settings.local.json`. Without this, the dev loop would stop every few minutes to ask for approval. After the loop completes, it offers to roll back pipeline-specific permissions.

## The Evolution Never Stops

Shipwright today is version three of this concept for us. The first version was a hardcoded pipeline tied to a specific Chrome extension project. The second was a fire-and-forget orchestration model that produced zombie processes and lost work. This version — structured, gated, composable — is what actually works.

But it's still evolving. We just added automatic Playwright E2E test planning for UI projects. We're looking at integrating with project management tools so the task breakdown stays synced with your board. And the learning-loop integration means the pipeline literally improves itself with every project it ships.

This is what [velocity engineering](/blog/velocity-engineering) looks like in practice. It's not just about making developers faster at writing code. It's about accelerating the entire pipeline — from requirements to production — so that the humans focus on the decisions that matter and the machines handle the mechanical work.

## Try It

Shipwright is open source and available in the [App Vitals marketplace](https://github.com/app-vitals/marketplace):

```
/plugin install shipwright@app-vitals/marketplace
```

Point it at a product spec and see what happens. We think you'll be surprised.

---

*Building something with Claude Code plugins? We'd love to hear what you're working on. Reach out at [dave@app-vitals.com](mailto:dave@app-vitals.com) or connect on [LinkedIn](https://www.linkedin.com/in/davido6/).*
