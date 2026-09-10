---
title: "Unlimited Resources Stopped Being a Moat"
date: "2026-09-10"
author: "Dave O'Dell"
category: "Engineering Velocity"
excerpt: "The best engineers in the world, unlimited GPUs, unlimited tokens — and still shipping slower than a two-person company. The constraint was never resources. It's the layer of process sitting between a decision and the work."
readTime: "7 min read"
---

Thirteen months ago, DHH went on a very long podcast and called AI slop. Fancy autocomplete. Not a serious tool for serious people. It was a good bit, and a lot of engineers quoted it approvingly for the better part of a year.

Last month he shipped an open source project for orchestrating coding agents.

We're not bringing that up to dunk on him. The reversal is the interesting part, because of *how* it happened. He didn't get argued into it. He didn't read a McKinsey deck about AI-enabled productivity. He watched agents produce code, over and over, until the evidence outweighed the position. That's the only conversion mechanism that has ever worked in this industry, and it's worth sitting with, because it explains something that otherwise makes no sense.

Here's the thing that makes no sense. Dan and I are two people. Last week I spun up a new project on a Friday. As I'm writing this, it has 103 closed pull requests and seven open. I wrote none of the code. Meanwhile there are companies with the best engineers on the planet, effectively unlimited GPUs, unlimited tokens, and internal models the rest of us don't have access to — and they are moving slower than we are.

That should be impossible. So what's actually going on?

## The Resource Advantage Evaporated

For most of the history of software, "unlimited resources" was a real moat. If you could hire a thousand engineers and we could hire five, you won on volume. You could staff the boring parts, run three approaches in parallel, and absorb mistakes that would have killed us.

That moat is mostly gone, and it went quietly. Not because big companies got worse, but because the floor came up underneath everyone else. Agents gave a two-person company access to something that functions a lot like a large team: parallel execution, tireless throughput, and a tolerance for grunt work that no human has. Dan and I are two people with six agents between us — two coding agents and a personal assistant on his side, two on mine, and a marketing agent we share. That's not a two-person company anymore in any way that matters operationally.

So if both sides now have effectively unlimited execution capacity, capacity isn't the differentiator. Something else is.

## What Actually Sits Between a Decision and the Work

Walk through what it takes to ship a feature at a company of any real size.

Someone writes a PRD. Then there's a meeting to review the PRD. Then the PRD gets revised based on the meeting. Then there's an architecture diagram and a data model. Then a design doc. Then a meeting about the design doc. Then implementation starts, and eventually a PR shows up, and maybe someone decides it's too complicated, so there's a meeting about that.

Every one of those steps is defensible in isolation. Together they're the product. The process *is* what the company does now, and the code is a byproduct.

DHH's read on this was that the bottleneck is human-to-human contact, which is a little sad to say out loud, because we like talking to humans. But we think that's slightly off target, and the distinction matters. The bottleneck isn't contact. Dan and I talk constantly — we're usually in the same co-working space. What we don't have is *bureaucracy*. There's no coordination tax between deciding something and it being underway. I can queue up five different pieces of work in an afternoon and have agents grinding through all of them in the background before anyone would have finished scheduling the kickoff.

That's the whole delta. Not talent. Not tooling budget. The number of steps between a decision and the work starting.

## The Six-Month Ski Trip Story

Six or eight months ago I was talking to a friend of mine who's an engineering manager at Google. I asked him what they were using internally — figuring they'd be a year ahead of the rest of us, given the resources.

He was using no AI. Zero. And he told me a lot of the engineering leadership around him was saying there would never be AI-written code at their level of quality.

I assume most of those people have changed their minds by now. Some of them probably changed jobs. But think about what that position costs when you're wrong about it for eight months at that scale. It isn't just lost productivity. It's eight months of your best people building the *habits* of a workflow that's about to be obsolete, and then having to unlearn them.

The mistake wasn't skepticism. Skepticism is fine and often correct. The mistake was skepticism without a mechanism for updating — no experiment running in the background, no small team quietly proving or disproving it, nothing set up to change anyone's mind if the evidence changed. DHH updated because he had a way to see the evidence. Those leaders didn't build one.

## There Are Two Ways In, and One of Them Is Slower Than It Looks

If you're going to adopt this — and you are, everyone is — there are exactly two paths.

The first is gradual. Sprinkle it in, let teams experiment, see what sticks. This is fine. It's what most companies will do. It works eventually.

The second is the one we keep arguing for. Take a handful of your best engineers, remove them from every other company function completely, and give them one mandate: we are going to adopt AI for every single process across the board. Not just engineering. Customer service, product, marketing, sales, finance. That's all they work on for the next six months to a year.

The reason we prefer the second path isn't speed for its own sake. It's that gradual adoption tends to stall at the exact point where it starts to threaten process, which is the point where the value actually is. Teams will happily use an agent to write tests. They will not, on their own initiative, dismantle the design review. Concentrated effort with executive cover gets past that wall. Diffuse effort almost never does.

We've made a version of this argument before, in [why you can't transform 200 engineers at once](/blog/you-cant-transform-the-whole-org-at-once/) — small concentrated group, real mandate, momentum that pulls the rest along. This is the same shape at a bigger scope.

And the honest counterpoint, which Dan raises every time: building the thing is not the hard part. Getting people to use it is the hard part. You can hand an org a working system and watch it sit there. Onboarding, trust, and breaking old habits are harder problems than any of the technical work, and we don't want to pretend otherwise.

## Trust Is Built by Repetition, Not Argument

The reason adoption is slow inside big companies isn't that people are dumb or lazy. It's that trust in a system like this is built by watching it work, repeatedly, on code you care about.

There's a specific version of this for developers that's almost a curse: you know what good code looks like. So you have to review every PR. You can't not. Someone who doesn't code can accept the output more easily precisely because they have no basis to evaluate it — which is a strange inversion, but it's real. The better your judgment, the longer your trust takes to build.

That's why the ladder matters. Run the individual pieces as plugins first, one task at a time. Then run it locally with a human in the loop, pressing enter on each step, watching exactly what it would do unattended. Then let it run autonomously in your own infrastructure. We wrote up that progression in [the AI adoption ladder](/blog/the-ai-adoption-ladder/), and every rung exists for the same reason: you're not buying capability, you're buying reps.

Once you've seen it produce above-average code enough times, the argument ends on its own. It may not be the best code ever written. It's better than mediocre, it's consistent, and it never gets tired. At that point, what's the alternative?

## You Will Have to Flatten the Org

Here's the part leadership doesn't want to hear.

If the coordination layer is the bottleneck, then removing the bottleneck means reshaping the org that produces it. You have to flatten. Twelve layers of management exists to route information between humans, and if agents are doing a large share of the work, most of that routing is overhead that slows down the part that's actually producing.

But — and this is where a lot of people take the wrong lesson — that does not mean fire all the managers. We think managers are enormously valuable, and the current fashion for gutting that layer is a mistake. The problem isn't that managers exist. It's that managers haven't automated their own jobs.

What does a manager actually do? A lot of meetings. A lot of Jira tickets. A lot of story points. And underneath that, the genuinely valuable thing: unblocking people, clearing obstacles, getting nonsense out of builders' way. That last part becomes *more* important when your team is moving fast, not less. It needs to be done at double speed. The rest of it — the status aggregation, the ticket hygiene, the meeting that exists to summarize other meetings — is exactly the kind of work that should have been automated first.

We're also watching a lot of CTOs and senior managers go back to being individual contributors right now. The pattern is consistent: they know how to adopt AI, they're tired of fighting the culture change, and they'd rather go build something with a thousand agents than spend another year trying to convince a leadership team. That's a real signal about where the friction is, and it isn't in the technology.

## Let Builders Build

The summary is short. Companies with unlimited resources are moving slowly, and the bottleneck is the process layer between humans, not the humans and not the tools. You fix it by automating every process, not just coding — product, marketing, finance, support. You fix it by flattening the org so decisions don't have to travel. And you fix it by telling people, clearly, that using this is not optional.

Then you let your builders go. It's a little scary. Your good engineers are going to be fine — better than fine. The thing that should actually scare you is the eight months my friend's team spent deciding this would never work.

It's going to take months. Get started.

---

*This post is adapted from [The Velocity Lab podcast](https://podcasts.apple.com/podcast/the-velocity-lab/id1888653618), Episode 34: Why Google Can't Move Fast (And Two Guys With Six Agents Can).*
