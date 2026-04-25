---
title: "Six Non-Negotiables Before You Turn On Autonomous Programming"
date: "2026-04-25"
author: "Dave O'Dell"
category: "Engineering Velocity"
excerpt: "You can't just install an agent and walk away. Here's the repo infrastructure that has to be in place before autonomous programming actually works — and why most teams stall on the prep, not the agent."
readTime: "8 min read"
---

You can't just turn it on and expect magic to happen.

That's the first thing we tell every team that asks us about autonomous programming. There's a bunch of upfront work — we call it infrastructure — around your repository. Until that work is done, the agent is just an expensive way to generate code you can't actually ship.

We've watched this pattern repeat itself across the engineering orgs we've worked with: leadership reads about agents shipping production code, installs Claude Code, points it at the repo, and waits for the compounding to start. Two weeks later they're frustrated. The agent is producing code, but PRs sit unmerged. Tests are flaky. Things break in prod. The "10x velocity" looks more like 1x with extra steps.

The agent is the easy part. The hard part is the repo around it.

This post is the prep checklist we walk every client through before we run a single autonomous PR. Six things. They're not exotic. Most of them are practices any well-run engineering org should already have. But "should" and "does" are different verbs, and autonomous programming is what turns "should" into "must."

## Why "Synchronous-Ready" and "Autonomous-Ready" Are Different Bars

Most engineering orgs we work with are already comfortable with what we call synchronous AI coding. A developer opens Claude Code, asks for a function, reviews it, edits it, commits it. The human is in the loop the entire time. The agent is an autocomplete with judgment.

Synchronous works on almost any repo. The human catches the mistakes.

Autonomous is a different bar. The agent is the one writing the code, opening the PR, reacting to CI failures, iterating, and merging — sometimes overnight, sometimes while you're walking your dog. There is no human catching things. The repo and the pipeline catch things, or nothing does.

We've written before about [why we code autonomously](/blog/we-code-autonomously) and the [pipeline that makes it possible](/blog/autonomous-coding-pipeline). Those posts cover what running autonomously looks like once it's working. This one covers what has to be true about the repo before any of that is possible.

## Non-Negotiable 1: A Monorepo with a Root CLAUDE.md

We prefer monorepos for autonomous work. Not because microservices are wrong — most of our clients are still microservice in deployment. But the agent's mental model has to span the whole system, and a single repo with a root-level `CLAUDE.md` is the cleanest way to give it that.

The problem with separate repos is that the agent can become an expert in repo A, repo B, and repo C without ever knowing how those three repos talk to each other. It writes a perfectly correct change in repo B that breaks the contract repo A depends on, because the contract was never written down anywhere the agent could see it.

A monorepo with a top-level `CLAUDE.md` lets you describe the system as a whole — how the services interact, what calls what, where the boundaries are. Each service can still have its own `CLAUDE.md` underneath, scoped to its own concerns. The structure mirrors the way the agent has to think about the system: zoomed out by default, zoomed in when needed.

If you can't move to a monorepo, the fallback is a "repos directory" — a parent directory holding all the repos and a parent `CLAUDE.md` that describes their relationships. We use this for clients who can't restructure. It works, but the monorepo is cleaner.

## Non-Negotiable 2: A Docs Directory with Progressive Disclosure

Your `CLAUDE.md` should be no more than 100 to 200 lines. Anything longer and the agent loses the plot — it spends its context window on background instead of the actual task.

The trick is progressive disclosure. Keep `CLAUDE.md` short and use it as an index. Push everything else into a `docs/` directory, one file per topic:

- `docs/architecture.md` — how the services fit together
- `docs/data-model.md` — schema, relationships, invariants
- `docs/github-actions.md` — CI structure (Claude reliably gets this wrong without explicit docs)
- `docs/terraform.md` — infrastructure conventions, if you have IaC
- `docs/api.md` — endpoints and contracts
- One file per integration that matters

In `CLAUDE.md`, reference each doc with a one-line description: "If you're working on the data model, read `docs/data-model.md`." The agent will lazy-load only what's relevant to the current task. This is the same pattern Claude's skills use — header up top, full content lazy-loaded by description.

The reason this matters for autonomous work specifically: the agent isn't going to ask a clarifying question. It can't afford to load every file every time. It needs a context-efficient way to find the right information for the current task and ignore the rest.

If you have agents running 24/7, you also want a docs cron — a nightly job that runs over the codebase, updates the docs to reflect the current state, and opens a PR if anything's drifted. We have one running on every client repo. The docs stay current because Claude updates them; the agent stays smart because the docs are current. The loop is self-reinforcing.

## Non-Negotiable 3: 90% Test Coverage with End-to-End Tests

Tests are how the agent knows whether its work is correct.

This is the part most teams underestimate. They've shipped code with 60% coverage for years and it's been "fine." It's been fine because humans were closing the gap — code review, manual QA, the developer-who-just-wrote-it sanity-checking the change before merging.

When the agent ships, none of that exists. The only signal the agent has is the test suite. If the tests pass, it merges. If the tests don't catch the regression, the regression ships.

We gate every autonomous PR on:

- 90% line coverage. Below that, the merge fails. Same bar for agent code and human code.
- All linters pass. No exceptions.
- All unit tests green.
- All end-to-end tests green.

That last one — end-to-end tests — is the one most teams skip. It's the one we make the loudest noise about.

Unit tests verify a function's behavior. End-to-end tests verify that the user flow still works. The difference matters because most "broke in prod" failures we've debugged weren't bugs in a single function. They were integration mismatches: a contract changed, a config drifted, a dependency upgraded. Unit tests pass. End-to-end tests catch it.

For web apps, that means Playwright. For mobile, we've been using Maestro on iOS — it spins up a simulator, drives it like a real user, hits the dev API. Mobile end-to-end testing has never been easy, but it's possible, and "possible" is the bar when you're shipping autonomously.

## Non-Negotiable 4: A Dev Environment That Matches Prod

Most engineering orgs we've worked with have a dev environment, but it's not actually like prod. It was set up once, has drifted, and nobody's burned the calories to keep it current. People work around it — "oh that doesn't work in dev, just push it and check in prod." It's "fine" because humans are doing the pushing.

That breaks autonomously.

When the agent runs end-to-end tests against your dev API and they pass, the agent is going to merge. If dev doesn't match prod, the agent has just shipped code that "works" in a system that doesn't exist outside the dev environment. The first sign of trouble is real users hitting it.

Two requirements:

**Dev parity.** Same database flavor and version, same auth provider behavior, same external service integrations (use sandbox modes — most providers have them). If your prod uses Stripe live, dev uses Stripe test. If your prod has a feature flag system, dev has one too. Don't fake any of it. Don't shim anything in tests.

**Single-command local startup.** "K, Claude, run my local development." That should spin up the API, the web app, the mobile simulator, the database, the queues — everything — without the developer having to remember a Notion page from 2024. The agent will need to run things locally too, and "it used to work" is fatal when there's no human to debug.

## Non-Negotiable 5: Canary Deploys

Even with 90% coverage and matching dev, the agent will eventually ship a regression. Tests are necessary, not sufficient.

Canary deploys are the safety net. New code goes to a small slice of traffic — 1%, 5%, depending on your scale — and runs alongside the previous version. Your observability stack watches both. If error rates spike on the canary, latencies degrade, or non-200 responses climb, traffic gets pulled back. Automatically.

This isn't a new pattern. Big tech has been doing it for fifteen years. What's new is that it's no longer optional. When humans ship, you can argue about whether canary deploys are worth the operational complexity. When agents ship, the argument is over. The system has to be able to roll itself back, because there's nobody on call to do it manually.

Pair this with feature flags for risky changes. A new code path lands behind a flag, off in prod by default. The agent merges. You flip the flag for 1% of users. Watch metrics. Ramp up. The agent never directly ships changes to all users — the deployment system does, on its own schedule, with the safety rails on.

## Non-Negotiable 6: Observability You Can Trust

I'll quote Dan from this week's episode, because it's the line I keep thinking about:

> "I am an open source guy. But if it was up to me — just bite the bullet. Pay for Datadog and use APM."

Dan and I are both former DevOps engineers. Both of us have built our own observability stacks more times than we'd care to count. Both of us, in 2026, would just pay for the APM tool.

Here's why: the observability stack is the system's nervous system. It's how you find out an autonomous deploy regressed something. It's how the canary system decides whether to roll back. It's how an on-call engineer (when there is one) gets paged. If your observability is duct-taped together, your "autonomous" pipeline is just unattended — the risk hasn't been removed, only moved.

A modern paid APM (Datadog, New Relic, Honeycomb, take your pick) gives you traces, structured logs, and metrics out of the box, with auto-instrumentation that picks up most frameworks without configuration. You point it at your services and it learns your endpoints, surfaces regressions, and traces requests across systems. The time-to-value compared to rolling your own is measured in days versus quarters.

We've worked with clients whose entire on-call signal is "customer support tells us." That's fine when you have humans hand-holding every deploy. It does not work when agents are deploying. You will find out about the regression days later, and the agent will have shipped six more changes on top of it.

## What This Adds Up To

Six things:

1. Monorepo with a root `CLAUDE.md`
2. `docs/` directory with progressive disclosure
3. 90% test coverage with end-to-end tests
4. Dev environment that matches prod, single-command startup
5. Canary deploys
6. Paid observability

Notice that none of this is autonomous-programming-specific. Every well-run engineering org should already be doing it. We've made the same arguments in [Why AI Coding Tools Don't Make Teams Ship Faster](/blog/velocity-engineering) — bad foundations create false tradeoffs, and most "AI velocity" failures trace back to infrastructure that was already broken before the AI showed up.

What autonomous programming does is take "should" and turn it into "must." A repo with patchy test coverage and a dev environment that hasn't matched prod since 2023 will get by under synchronous AI coding because humans are doing the catching. The same repo, run autonomously, will ship broken code on its first night.

The leaders who get this start with the infrastructure work first. They spend the first sprint of an autonomous initiative not on the agent, but on the repo around it: closing test coverage gaps, rebuilding the dev environment, adding the docs directory, signing the Datadog contract. Then they turn the agent on, and it actually works.

The leaders who skip this part are the ones who tell us, three months in, that "autonomous programming doesn't really work for us."

It works. But you have to do the prep.

If you're trying to figure out which of these six gaps your team has, hit us up at [App Vitals](/contact). Our [AI Velocity Assessment](/blog/ai-velocity-assessment) is built around exactly this kind of audit — we walk the codebase, identify the prep work, and tell you what has to be true before autonomous can compound.

Listen to the full episode on [The Velocity Lab](https://share.transistor.fm/s/2b549080).
