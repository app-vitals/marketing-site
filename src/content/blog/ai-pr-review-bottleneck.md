---
title: "Why AI Makes PR Review Time Slower Before It Gets Faster"
date: "2026-04-14"
author: "Dave O'Dell"
category: "Engineering Velocity"
excerpt: "Teams with high AI adoption saw a 91% increase in PR review time. That's not a bug in the data — it's a predictable transition you can plan for."
readTime: "8 min read"
---

Faros AI analyzed over 10,000 developers across companies with high AI tool adoption and found that PR review time went up 91%. Not code writing time — review time. The part that was supposed to stay the same.

If you've already rolled out AI coding tools and your cycle time metrics haven't moved — or have gotten worse — this is probably why. And more importantly: it's predictable, it's temporary, and there's a specific sequence of fixes that gets you through it.

But most teams are flying blind on this. They see the slowdown, conclude the AI tools aren't delivering, and start second-guessing the whole adoption. That's the wrong read. The slowdown isn't evidence that AI doesn't work. It's evidence that the rest of your pipeline wasn't ready for the throughput increase.

## Why This Happens in the First Place

When AI coding tools go in, code writing velocity typically increases 2-3x within the first few months. That part works as advertised. What nobody told you is that you just turned a trickle into a firehose, and everything downstream — code review, CI, deployment — is still sized for the trickle.

Think about what that actually looks like on the ground. Before AI, your team opened maybe 20 PRs a week. Now they're opening 35. Each one is also larger — Faros AI's data shows AI-assisted PRs run roughly 40-50% bigger than hand-written ones, because AI fills in the boilerplate that developers used to skip or leave for a follow-up. Your reviewers are the same four people they were before. The math doesn't work.

But volume and size are just the surface problem. The deeper issue is that AI-generated code has a different texture than human-written code, and your reviewers haven't adapted their workflows to match it.

Human-written code leaves a trail. You can trace the developer's reasoning through variable names, comments at the tricky spots, patterns that mirror the rest of the codebase because the author has been reading it for six months. AI-generated code is syntactically correct and often well-structured, but it's optimized for producing something that runs — not something that communicates. Reviewers instinctively know something's off. They can't skim it the way they'd skim a colleague's code, so they read it carefully. All of it. Every time.

That's where the 91% comes from.

## The Trough Is Real but Finite

We work inside engineering teams during these transitions. There's a consistent shape to what happens:

**Month one:** Everyone's excited. Developers are shipping code faster. PRs start stacking up but nobody's measuring it yet.

**Month two or three:** Someone pulls the cycle time data. It's flat or trending worse. The conversation starts: "Are these AI tools actually helping?" Teams that don't understand the transition dynamic sometimes pull back here, which is exactly the wrong move.

**Month four or five (for teams that stay the course and fix the downstream bottlenecks):** Review processes adapt, PR size norms tighten up, AI-assisted review tools go in. Cycle time starts improving — often dramatically, because now you've accelerated multiple stages of the pipeline simultaneously.

The trough is real. It's also survivable. The teams that come out the other side faster are the ones that diagnose the transition clearly and work the actual problem instead of questioning whether the AI investment was right.

## The Most Common Mistake: Measuring the Wrong Thing

A lot of engineering leaders look at their AI adoption and measure developer productivity by code output — lines written, PRs opened, features completed. Those numbers look great. Then they wonder why delivery speed hasn't budged.

The mistake is treating code writing as the goal. [Velocity engineering](/blog/velocity-engineering/) is about the whole system — from ticket to production. Code writing has never been the slow part of software delivery. It wasn't the slow part before AI, and it's not the slow part after. Review, CI, deployment queues: those have always been where time disappears.

AI just made the already-not-the-bottleneck stage even faster, which means every efficiency gain is getting absorbed by the stages that were already slower. If you don't address those, you're adding capacity to a part of the pipeline that wasn't the constraint, and wondering why throughput didn't improve. This is the same pattern we see with [CI pipeline bottlenecks](/blog/ci-pipeline-bottleneck/) — fixing one stage without addressing the next just moves the pain.

The number to watch isn't "time to open a PR." It's "time from first commit to production." That's the only metric that tells you whether your AI investment is translating into delivery speed.

## What Actually Fixes This

There's a specific sequence. Doing these out of order is less effective — each one removes a different constraint, and some constraints have to be cleared before others become visible.

### Set PR size limits and enforce them

This sounds mundane. It has the biggest single impact on review throughput.

The 91% increase in review time isn't linear with PR size — it's closer to exponential. A 100-line PR takes a reviewer 5-10 minutes. A 400-line PR takes 45 minutes to an hour, because you can't hold the full change in your head and you have to keep re-reading sections to understand the dependencies. AI tools make it trivially easy to generate 400-line PRs. Nothing automatically makes you break them up.

The teams that handle this well establish explicit limits — 200 lines max is a common threshold — and use AI to help split large changes into logical, reviewable chunks. The same tool that generated 500 lines of feature code can also help you decompose it into three PRs with clean boundaries and a sensible merge order.

Stop measuring developer output by PR size. Start measuring it by PRs-merged-to-production. A developer who opens five 80-line PRs that each get reviewed in 10 minutes is moving faster through the system than one who opens a single 400-line PR that sits in queue for three days.

### Build an async review culture

Most code review processes were designed for a world where developers opened 3-5 PRs per week and review was a minor fraction of engineering time. That assumption is now wrong by a factor of two or three.

The teams that adapt fastest treat review as a first-class engineering activity, not an interruption between coding tasks. In practice that means dedicated review time blocks — 30-60 minutes per day that are protected the same way focus time is protected. If review is "whenever you get around to it," it always loses to in-flow coding work. Your PRs age. Your review queue backs up. Your cycle time suffers.

It also means distributing review load explicitly. In most teams, two or three senior engineers end up reviewing 70% of all PRs. That was a manageable problem before AI; it's a chokepoint after. Track who's reviewing what. Make the distribution visible. If one person's queue is blocking merges, that's not a people problem — it's a process problem with a process solution.

### Add AI-assisted review as a first pass

If AI is generating the code, AI should be part of reviewing it. Not instead of human review — that's how you ship subtle bugs into production — but before human review, to clear the noise.

The value here isn't catching logic errors. AI-assisted review is mediocre at that in large, complex PRs. The value is eliminating everything that wastes human review time: style violations, convention mismatches, obvious oversights, code that technically works but conflicts with how your team does things. If a reviewer can open a PR and see that the AI first pass already caught and flagged the three easy things, they can spend their time on the actual logic and architecture questions.

In our experience this can cut human review time 30-40% without changing who does the reviewing or how much context they need. The caveat: the AI reviewer needs to know your codebase — your conventions, your patterns, your common anti-patterns. A generic linter won't cut it. Context infrastructure matters here the same way it matters everywhere else in [AI-assisted development](/blog/context-problem/).

### Reframe how you describe AI-generated code

This is an underrated one. When a PR is AI-generated or heavily AI-assisted, include a description of what the AI was asked to do — the prompt, the intent, the constraints you gave it. "I asked Claude to implement retry logic with exponential backoff for the payment API, cap at 5 attempts, respect the existing error handling patterns in this module" is incredibly useful context for a reviewer.

Reviewing a 200-line diff cold is one cognitive task. Reviewing it with that framing is a different, much faster one. You can evaluate whether the AI did what you intended instead of trying to reverse-engineer the intent from the output. This single practice can take a 45-minute review down to 15.

## The Enterprise Version of This Problem

In larger organizations, the transition trough is harder because review culture is more entrenched and process change requires more coordination. We've written about some of the organizational dynamics at play in [enterprise AI adoption](/blog/enterprise-ai-adoption-mistakes/) — the short version is that the technical fixes are the easy part. The hard part is getting a 200-person engineering org to change how it treats review.

What works at scale: pick a team or pod to run the new process as a deliberate experiment. Instrument it — track PR size, review time, cycle time, bugs per PR. Show the results. Let teams opt in based on data instead of mandating a process change from the top.

The [AI champion model](/blog/ai-champion-playbook/) is useful here. The teams that adapt fastest usually have someone who owns the transition — not a full-time role, but an engineer who cares about this, experiments with different approaches, and socializes what works. Without that internal driver, process changes stall in committee.

## Getting the ROI You Paid For

The honest framing on AI coding tool adoption is this: you bought tools that accelerate code writing. Code writing is not the constraint in software delivery. You bought speed in a non-bottleneck stage.

That doesn't mean the tools aren't valuable. It means the value isn't automatically captured — you have to go get it. You do that by working through the stages where time actually disappears: review, CI, deployment. As you clear each bottleneck, the velocity gains from the coding tools start flowing through to actual delivery speed. That's when your [ROI measurement](/blog/measure-ai-adoption-roi/) starts looking like what you expected when you signed the contract.

The 91% increase in PR review time is a signal, not a verdict. It's telling you exactly where to focus next. The teams that read it that way and act on it come out the other side with delivery velocity that looks nothing like what they started with. The teams that read it as "AI tools don't work" stall out at step one.

You're past step one. The next step is the review queue. Go fix it.

---

*Dave O'Dell is co-founder of App Vitals, where he and Dan McAulay work with engineering teams to identify why AI investments aren't translating into delivery speed — and fix the actual constraints. If your cycle time hasn't moved since your AI rollout, [we've seen this before](https://app-vitals.com/contact).*
