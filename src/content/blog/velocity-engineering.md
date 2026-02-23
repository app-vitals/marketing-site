---
title: "Velocity Engineering: Why AI Adoption Alone Won't Make You Faster"
date: "2026-02-23"
author: "Dave O'Dell"
category: "Engineering Velocity"
excerpt: "Most teams adopt AI tools and expect to ship faster. They don't. Because speed in one part of the pipeline just exposes how slow everything else is. That's why we built a practice around velocity engineering."
readTime: "6 min read"
---

Here's something I keep seeing: an engineering leader rolls out AI coding tools to their team. Developers love it. Code output goes up. Everyone's excited.

Six weeks later, nothing has actually shipped faster.

This is the AI adoption trap. And it's happening everywhere right now.

## The Trap

AI code generation is genuinely fast. I use it every day. I've watched engineers go from spending four hours on a feature to finishing in ninety minutes. That part is real.

But code is maybe 20% of the journey from idea to production. The other 80% is everything else: builds, tests, code review, CI, staging, deployment, monitoring. And none of those got any faster when you added an AI tool to your editor.

What actually happened is you created a traffic jam. More code, moving faster, hitting the same slow pipeline. More PRs waiting for review. More CI runs queuing up. More deploy windows filling up.

You didn't eliminate a bottleneck. You moved it downstream.

## Why "AI Adoption" Isn't Enough

The consultants and vendors selling AI adoption are focused on one thing: tool rollout. Get licenses, run training sessions, maybe write some configuration files, measure how many engineers are using the tool. Done.

But tool usage isn't velocity. Velocity is how fast your team ships working software to production. And that depends on the entire software development lifecycle — not just the code generation step.

I've worked with engineering teams at every scale for 20+ years. The teams that actually move fast don't have one fast thing. They have everything moving fast. Builds are fast. Tests are fast. CI is fast. Deploys are fast. Review cycles are fast.

That's what velocity engineering is.

## What Velocity Engineering Actually Means

Velocity engineering is the practice of accelerating the entire software development lifecycle. Not just one step. Every step.

It starts by finding where work actually waits. Not where you think it waits — where it actually waits. In most organizations, the answer is surprising. Code review is a bigger bottleneck than code writing. CI is a bigger bottleneck than testing. Deploy approvals are a bigger bottleneck than staging.

Then you fix those bottlenecks systematically. Not with more tools. Not with process documents. With engineering — the same way you'd fix any other technical problem.

Here's why AI adoption is a critical part of this, but only a part: AI tools amplify whatever your pipeline can handle. If your pipeline is fast, AI makes your team dramatically faster. If your pipeline is slow, AI just helps your team write code that sits in a queue faster.

## The Bottleneck Cascade

Think about it like a highway. You widen one lane from two to six lanes. Traffic flows great — until it hits the next section, which is still two lanes. Now you have an even worse traffic jam than before, because more cars are arriving at the bottleneck faster.

That's exactly what happens when you speed up code generation without touching the rest of the pipeline:

- Developers write 3x more code → code review queue triples
- More PRs → CI pipeline backs up → flaky tests become a crisis
- More features ready for deploy → staging environments become contested → deploy conflicts multiply

Each speedup in one area cascades into pressure on the next bottleneck. The team feels busier but isn't actually shipping faster. Morale drops because everyone's working harder with nothing to show for it.

Velocity engineering breaks this cascade by accelerating every stage together.

## People, Not Just Pipeline

Here's the other piece that pure "AI adoption" misses: the people.

You can have the fastest pipeline in the world and still move slowly if your engineers don't trust their tools, don't share what they learn, or don't feel safe experimenting. AI adoption that comes as a mandate from leadership gets ignored or produces low-quality output. Engineers accept AI suggestions without understanding them. Bugs multiply. Quality drops. Leadership blames the tool.

Real velocity comes from engineers who understand what they're building, use AI as an accelerator (not a replacement for thinking), and share their workflows with the team. That kind of adoption doesn't come from training decks. It comes from working alongside people, on real code, solving real problems.

The best engineers on your team are already experimenting with AI. They just might not be sharing what they've learned. That's where the leverage is.

## What This Looks Like in Practice

We embed with engineering teams for 12 weeks. When we leave, two things are different:

**The pipeline is measurably faster.** Deploy frequency is up. Lead time is down. CI is faster. Review cycles are shorter. These aren't subjective — they're numbers you can track.

**The team is self-sustaining.** Engineers are teaching each other. The practices we introduced are spreading organically. You don't need us in the room anymore.

That's the goal. Not a dependency. Not a permanent consulting engagement. Twelve weeks of focused work, then your team carries it forward.

## The Question to Ask

If your team recently adopted AI tools and you're not seeing the velocity gains you expected, ask yourself this:

Where does work actually wait in our pipeline?

Not where you think it waits. Where it actually waits. Time the journey of a single PR from "code complete" to "running in production." Look at every stop along the way. How long does review take? How long does CI take? How long between "CI green" and "deployed"?

That's where your velocity is hiding.

AI tools solved the code generation problem. The rest of the pipeline is waiting.

---

*Dave O'Dell is co-founder of App Vitals, where he and Dan McAulay practice velocity engineering — accelerating the entire software development lifecycle through AI adoption. They work with engineering teams of 30-60+ engineers to ship 2-3x faster in 12 weeks.*
