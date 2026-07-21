---
title: "No One Is Paying You to Code Anymore"
date: "2026-07-21"
author: "Dave O'Dell"
category: "Engineering Velocity"
excerpt: "We told a client last week there's absolutely no reason to pay developers to write code. Here's why that's the best career news engineers have gotten in decades."
readTime: "8 min read"
---

Last week I gave a client a TLDR: there is absolutely no reason at this moment to pay developers to write code. That is an absolute waste of money. The technology is there.

He looked at me like I'd lost my mind. Then I showed him what his competitor was doing.

We work with a Fortune 500 and a one-person startup. Both are coding autonomously. There's no org too big or too small — only organizations that are behind and organizations that are ahead.

If you're a developer reading this, I'm not trying to scare you. I'm trying to give you a better frame for the moment you're actually in. Because here's what most people get wrong: the end of writing code is not the end of software engineering. It might be the beginning of actually doing it.

## The Job Has Always Been Judgment

Here's the thing about code. Code was never the point. Code was the artifact — the output of a reasoning process about what to build, how to build it, what tradeoffs to make. Every line of code you ever wrote was downstream of judgment.

When Dan and I say developers aren't getting paid to write code anymore, we're saying the artifact has changed. The reasoning hasn't. The judgment hasn't. The engineering hasn't.

Your job was never really to write code. Code was a byproduct of judgment. Now you're still in that judgment space — what do we build, what to trust, when to stop — you're just not generating the byproduct yourself.

A useful analogy: architects don't pour concrete. They design systems. The work is in knowing what the system should do and why, not in being the one who lifts the bucket.

## What the New Job Actually Looks Like

Before: ticket arrives → you open the IDE → you type → you open a PR → senior reviews → merge.

Now: ticket arrives → you write a plan → Claude executes → you review → Claude fixes → you verify → merge. Or Claude plans, you review the plan, Claude executes, you review the code.

It sounds similar. The difference is velocity and scope. What used to take a week now takes a day. What used to require a staff engineer now requires a junior who knows how to run the agent.

Dan and I are living this inside Shipwright right now. We have three migrations running in parallel. Are Dan and I coding those migrations? No. Our agents are. But there is still a tremendous amount of work: reviewing the plans before they run, reviewing the diffs after they land, understanding the system well enough to know whether the agent got it right. We're managing more cognitive surface than we could have handled before.

That's the shift. You're not doing less work. You're doing different work. And if you're good at engineering — really good — there is suddenly more of that work available than you've ever had access to.

## The Junior Engineer Problem (And Why It's Actually Opportunity)

Here's the piece that worries people, and it's worth taking head-on.

Junior developers in the old model got paid to close tickets. Write the function, pass the tests, open the PR, repeat. It was how you learned the codebase. It was how you built instincts. And if you're a junior right now, that apprenticeship path feels like it's being kicked out from under you.

But watch what's actually happening: every junior developer who learns to run an autonomous coding agent well is now capable of shipping at the velocity of a senior. Not because they have a senior's judgment — they don't yet — but because the feedback loop has compressed.

At Uber, the org was radically flat. Everybody wrote their own RFCs and technical design docs, and then they got reviewed by somebody else. Over time you worked your way up from being reviewed to being the reviewer. That process took years.

That process now takes months. Because you're writing plans every day, having them executed, reviewing real diffs, building instincts about what the agent gets right and what it gets wrong. You're in the planning-and-reviewing loop from day one.

The ceiling just got lower — you can't hide in a ticket queue. But the floor got higher too. If you engage with this, you level up faster than any previous generation of engineers.

## What You Should Actually Be Spending Time On

Here's the thing that frees up when you stop writing code: all the systemic problems that have been sitting in your backlog for years.

Why is CI slow? How come deployments fail half the time? Why does that one service crash every Tuesday? Why does the migration pipeline deadlock under load?

These problems don't get solved because there's never time. There's always a ticket, always a sprint, always a feature that needs to ship. The engineering debt is real and everyone knows it and nobody fixes it because the cost-benefit doesn't clear when engineers are the constraint.

Agents change the constraint. Now the engineers are not the constraint on feature velocity. The constraint shifts to system quality and architectural judgment — exactly the problems nobody had time for.

I tweaked our testing framework last night. It was parallelizing everything all the time, even for small projects. That was draining our Actions budget. I wrote the plan — look at per-step duration, decide whether to parallelize based on actual elapsed time, account for startup and teardown overhead — and now it's automated and better. My engineering background is what let me know what to tell the agent to do.

Next time I find something, I'll improve it again. That's the job now.

## Why Engineers Are Scared (And Why They Shouldn't Be)

I'll be honest: I had a conversation recently with a friend who works at an AI lab. We both said to each other: "I wish AI hadn't happened. Because I love to code."

That's real. I love to code. There is something deeply satisfying about sitting down with a problem and working it out line by line. That's not going away for everyone — there are still problems that want a human directly in the loop. But for the broad category of product engineering work, the era of typing your way through it is over.

The fear engineers feel is legitimate. It's not paranoia. The role is changing fast, and change is hard. What I'd push back on is the frame that this is bad news.

You are still a software engineer. You are still the person who knows whether the system is designed right, whether the tests cover the cases that matter, whether the agent got confused and introduced a subtle bug. Claude does not write code without bugs. Humans do not write code without bugs. The bugs are still there. Finding them before they escape into production — that's still your job, and it's always been the hard part.

The stuff that's changing is the stuff that was always a bit soul-crushing: the repetitive implementation work, the boilerplate, the tickets that were just mechanical transformations of requirements into code. Good riddance.

## The Practical Question: What Do You Do Right Now

If you're a developer and you're reading this thinking "okay but what do I actually do," here's my honest answer.

Start with a side project. Install [Shipwright](https://shipwrightharness.com) — it's open source, you can spin it up locally with a single command. Give it a problem to solve. Watch what it does. Notice where it gets things right and where it gets confused. Develop your instincts about how to write plans that produce good code, how to review the diffs, how to catch the subtle errors.

That practice transfers directly to your day job. The muscle you're building is not "how to use this specific tool." It's how to work at one level of abstraction above the code — how to be the architect, not the concrete pourer.

The engineers who come out of this transition well are not the ones who hold on to the terminal longest. They're the ones who embrace the planning and reviewing layer earliest, build real instincts about what good output looks like, and spend the freed-up time on the systemic problems that actually make engineering orgs better.

As of July 2026, every engineering organization is going to be coding autonomously. Not in five years. This year. Dan and I are telling our clients — Fortune 500 and one-person startup alike — to adopt now. The technology is here. The question is only whether you're ahead of the curve or behind it.

You are still a software engineer. You always were. The code was just the byproduct.

---

*This post is adapted from [The Velocity Lab podcast](https://podcasts.apple.com/podcast/the-velocity-lab/id1888653618), Episode 29: You're Not Getting Paid to Code Anymore (And That's Good News).*
