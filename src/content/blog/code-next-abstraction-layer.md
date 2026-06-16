---
title: "Is Code the Next Abstraction Layer? How Agentic AI Is Redefining What Software Engineers Actually Do"
date: "2026-03-28"
author: "Dave O'Dell"
category: "Technical Leadership"
excerpt: "One of us loves coding. The other built an agentic coding platform without writing code. Neither of us has written a line in months. So what does that mean for software engineers?"
readTime: "8 min read"
---

Here's a provocative question we've been wrestling with: in five years, will software engineers even know what a programming language looks like?

It sounds absurd. But when you sit with it for a minute, it's not that far off from questions people asked at every previous inflection point in computing history. When garbage-collected languages arrived, systems programmers said you couldn't build real software without managing your own memory. When high-level languages abstracted away assembly, people worried that nobody would understand what was actually happening on the hardware. Each time, the abstraction won. Engineers adapted. The sky did not fall.

We think we're at another one of those moments right now.

## Every Language Stands on the Shoulders of the One Before It

The history of programming languages is really a history of progressive abstraction. You had machine code. Then assembly. Then C, which let you stay close to the metal while writing something humans could read. Then C# and Java added garbage collection, removing an entire category of things engineers had to think about. Then Python and Ruby made expressiveness a feature. Each layer hid complexity from the layer above it, and the people working at the higher layers didn't need to know the details below.

We're not saying anything novel here — we're just pointing out the pattern.

The question is whether we're seeing that same pattern play out again, only faster and more dramatically than any previous transition. Because with agentic coding tools, the abstraction isn't just "now you don't have to write assembly." It's "now you might not need to write any specific programming language at all."

## The Six-Month Experiment

Dan is a self-described lover of code. He's the kind of engineer who finds debugging genuinely enjoyable, who cares about elegance, who thinks deeply about architecture. He has been writing code professionally for over a decade.

He hasn't written a line in six months.

That's not because agentic tools suddenly made him lazy. It's because the thing he actually loved was never the syntax — it was the engineering. The problem-solving. The design decisions. The architecture. The act of writing code was just the vehicle. And now there's a better vehicle.

When you stop and think about why you'd learn a specific programming language today, the rationale gets shaky fast. Imagine you want to build a Slack bot in Go. You could spend weeks learning Go idioms, the type system, goroutines, channels. Or you could describe what you want to an agentic tool, iterate on the behavior, and ship something functional in an afternoon. The tool handles the syntax. You handle the thinking.

That's not laziness. That's the abstraction layer doing its job.

## Harness Engineering: The New Abstraction

So if syntax is being abstracted away, what's the new layer that engineers actually work at?

The term that's emerging is "harness engineering." Your harness is the scaffolding you build around an agentic coding system — the prompts, constraints, validation gates, review loops, and orchestration logic that steer the AI toward outputs that actually work and hold up over time.

Think of it this way: the AI writes the code, but you write the rules the AI plays by. You define what "correct" means. You set up the validation that proves it's correct. You design the feedback loops that keep quality high over hundreds of iterations.

We've both built our own harnesses, and they look pretty different from each other — which actually illustrates the point well. One of us has a fairly elaborate, systematic pipeline that takes a product requirements document and breaks it down into sequenced phases, each resulting in a discrete pull request. It runs code simplification passes, enforces test coverage thresholds, uses Playwright for anything visual. The whole thing emerged from the recognition that you can't just one-shot a complex system — you need structure around the AI to get reliable output. The harness itself is almost entirely prompts and configuration files. There's essentially no traditional code.

The other approach is lighter: a five-step mental model that works well for small, well-scoped features. Plan, write, review, test, lint. Brief enough to fit on a napkin. The AI figures out the details.

Both work. The appropriate harness depends on the scope of what you're building. This is the new engineering judgment call — not "how do I implement this function" but "how do I structure my process so the AI gets me to something I can ship."

## The Slop Problem Is Real (And Harnesses Solve It)

We should be honest about the failure mode here. If you just tell an AI to build something and walk away, you'll get AI slop — code that compiles, maybe even passes your tests, but doesn't reflect your actual architecture, duplicates things that already exist, takes shortcuts that will hurt you in six months.

This is the thing that senior engineers mean when they say they don't trust AI-generated code. They've seen the slop. And they're not wrong that it exists.

The answer isn't to avoid agentic tools — it's to build the harness that prevents slop. That means code review steps built into the pipeline. Simplification passes that identify duplication before it gets merged. Automated checks for test coverage. And, critically, a human who understands the system well enough to catch the cases where the AI built a perfectly functional parallel version of something that already existed.

Dan still reads a lot of code. He reviews PRs. He catches the cases where the AI missed existing patterns and went off-road. That review capacity — knowing what the system is supposed to look like and recognizing when generated code doesn't match — is still entirely human. The tool generates. The engineer validates.

For more on where AI adoption actually breaks down in engineering organizations, we wrote about [the velocity trap](/blog/velocity-trap/) — the mistake of speeding up code generation without addressing the review and deployment bottlenecks downstream.

## What You Still Have to Know

Here's the thing: even as syntax becomes irrelevant, the underlying engineering principles become more important, not less.

Systems still need logging. They need metrics. They need observability. They need to handle failures gracefully. Duplicate code still breaks things — the agent fixed it in one place, missed it in another, now you have a subtle bug that only surfaces under load. These patterns — the things that senior engineers know instinctively — don't go away just because the code is AI-generated. If anything, they become the gate between engineers who can direct agentic systems effectively and those who can't.

You have to know that this service should emit structured logs. You have to know that this API needs circuit breakers. You have to know that this database query will be a problem at scale. The AI doesn't know what it doesn't know. You're the one who has to ask the right questions.

This is where we see new engineers struggling. The fear of getting something wrong — of the system being in an unexpected state — used to be addressed through thousands of hours of hands-on debugging. You broke things. You fixed them. You built intuition. If that feedback loop disappears because the AI handles everything, how do junior engineers build that intuition? We don't have a clean answer yet. Neither does anyone else.

We talked about the talent pipeline problem in more depth when we covered [enterprise AI adoption mistakes](/blog/enterprise-ai-adoption-mistakes/) — the cultural and organizational dynamics that determine whether AI actually makes your team better or just faster at producing the wrong things.

## You Can't Build a Lasting System Without an Expert

Here's where we push back on the most optimistic takes about AI-generated software: you can one-shot a prototype. You cannot one-shot a production system that's going to be maintained by a team for five years.

A one-shot prototype might work. It'll probably have architectural problems. It won't reflect your organization's conventions. It won't be set up for the operational reality of keeping a service running at 3am when something breaks. It'll have the observability your AI thought to add, not the observability your on-call rotation actually needs.

Building a harness that produces good software consistently requires knowing what good software looks like. That knowledge comes from experience. And that experience still comes from doing the hard engineering work — debugging things, understanding why systems fail, learning the patterns that separate software that holds up from software that doesn't.

There's an interesting parallel to on-call. When you're paged on a service you didn't write, you don't need to know the code — you need to know how to use the tools. What logs matter. What metrics to look at. How to narrow down where the failure is. That's a skill set you build through experience, and it transfers. It transfers to AI-generated code too. If you know how to troubleshoot, you can troubleshoot anything. The same can't be said for someone who's only ever described requirements to an AI and reviewed the output.

The deeper question — how teams build this expertise in an environment where junior engineers might never write code — is one of the things we think about constantly. We covered our framework for this in [velocity engineering](/blog/velocity-engineering/).

## So Is Code Done?

Kind of. The craft of writing syntax in a specific programming language is becoming less relevant — that much seems clear. Dan hasn't written code in six months. The Shipwright harness that orchestrates our agentic development pipeline is almost entirely prompts and markdown files, with essentially no traditional code.

But the things we love about engineering are still here. Building systems that work. Making sure they stay working. Understanding why they fail. Thinking through architecture. Reviewing what the AI generates and knowing whether it's right. None of that is gone. If anything, those skills are more valuable now because they're the ones the AI can't replicate.

The abstraction layer is shifting upward. The engineers who thrive will be the ones who move with it — who let go of the syntax and hold tight to the judgment.

We're not losing software engineering. We're getting a more powerful version of it, where the constraint is no longer "how fast can I write code" but "how clearly can I think about the system I'm trying to build."

That's a better constraint to optimize against.

---

*This post is adapted from [The Velocity Lab podcast](https://podcasts.apple.com/podcast/the-velocity-lab/id1888653618), Episode 3.*
