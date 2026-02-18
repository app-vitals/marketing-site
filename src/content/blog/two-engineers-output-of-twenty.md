---
title: "Two Engineers, AI Assistants, and the Output of Twenty"
date: "2026-02-18"
author: "Dave O'Dell"
category: "Company Updates"
excerpt: "How App Vitals operates as a 2-person team with AI force multiplication — and what that means for how we think about engineering velocity."
readTime: "5 min read"
---

App Vitals is two people. Dan and I have a combined 40+ years of engineering experience across companies like Uber and other enterprise-scale organizations. We've led teams, architected distributed systems, and navigated the kind of organizational complexity that most consultancies only read about.

And right now, we're shipping at a pace that shouldn't be possible for a team of two.

## The Honest Version

I want to be direct about this, because there's a lot of hype around AI productivity and not enough honesty. AI tools don't make you ten times faster at everything. They make you dramatically faster at specific things, and moderately faster at most things, and they introduce new failure modes you need to learn to manage.

Here's what our actual workflow looks like.

## What AI Actually Accelerates

**Boilerplate and scaffolding.** When we need a new page, component, API endpoint, or test suite, AI handles the initial structure. Things that used to take 30-60 minutes take 5. This is real, it's consistent, and it compounds across a project.

**Context switching.** We work across multiple codebases, languages, and frameworks. AI assistants that understand the codebase we're in reduce the ramp-up time from "let me re-read how this service works" to "let me ask and get a grounded answer." That's not trivial when you're jumping between projects daily.

**Documentation and communication.** Technical writing, architecture docs, PR descriptions, clarifying questions — AI drafts these faster than we could write them from scratch. We edit and refine, but the first draft is usually 80% there.

**Exploration and research.** When evaluating a new library, understanding an unfamiliar API, or figuring out how a legacy system works, AI can synthesize information faster than reading docs manually. Not always perfectly, but fast enough to accelerate the discovery phase significantly.

## What AI Doesn't Do

**Make architectural decisions.** AI can suggest patterns, but knowing which pattern fits this specific system, with these constraints, for this team? That's experience. That's judgment. AI provides options; humans decide.

**Understand organizational dynamics.** Half of engineering consulting is navigating people, not code. Who's the real decision-maker? What's the unspoken constraint? Why does this team resist change? AI can't read a room.

**Replace deep expertise.** When something goes wrong in production at 2 AM, you need someone who's been in the trenches. AI can help diagnose, but the pattern recognition that comes from years of operating distributed systems — that's human.

**Guarantee correctness.** Everything AI produces needs review. We've built habits around verification — running tests, reviewing diffs, checking edge cases. The speed gain only works if you maintain quality discipline.

## How We Actually Work

Our workflow is built around a few principles:

**Convention files in every repo.** Every project we work on has a conventions file that describes patterns, architecture, and coding standards. This makes AI suggestions dramatically more accurate. It also makes our code more consistent, which is good for clients regardless of AI.

**Small, focused PRs.** AI makes it easy to produce large changes quickly. That's a trap. We keep PRs small and focused because they're easier to review, easier to revert, and less likely to introduce subtle bugs. Speed of production doesn't change the value of small batches.

**Aggressive testing.** When AI writes code faster, you need to verify faster too. We invest heavily in test infrastructure — not because we don't trust AI, but because we don't trust any code that isn't tested. AI-written or human-written, the bar is the same.

**Human review of everything.** Neither of us ships code that the other hasn't reviewed. AI-generated code gets the same scrutiny as human-written code. Sometimes more, because AI can produce plausible-looking code that has subtle issues.

## What This Means for Our Clients

When we embed with a client's team, we're not just bringing two engineers. We're bringing two engineers who have spent thousands of hours optimizing their own AI-assisted workflow. We know what works, what doesn't, and where the pitfalls are — because we hit them ourselves first.

More importantly, we understand that AI velocity is a system property, not a tool property. It's not enough to give developers AI tools. You need the conventions, the documentation, the CI pipeline, the review process, and the deployment infrastructure to all be optimized for higher throughput.

That's what we help teams build. Not "AI tool rollout" but the entire velocity stack — from developer workflow to production deployment.

## The Leverage Equation

Two engineers with AI tools and deep experience can do things that would have required a much larger team five years ago. But the leverage isn't just about speed. It's about focus.

When you eliminate most of the mechanical work, what's left is the hard stuff — the architecture decisions, the system design, the debugging that requires deep understanding. That's where experience matters most. AI didn't replace our expertise; it freed us to spend more time using it.

That's the model we believe in: experienced engineers, amplified by AI, focused on the work that actually matters. It's how we run App Vitals, and it's what we help our clients' teams achieve.

The question isn't whether AI makes engineers faster. It does. The question is whether your organization is set up to capture that speed. That's where the real work is.
