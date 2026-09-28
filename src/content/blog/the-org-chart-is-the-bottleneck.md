---
title: "The Tech Is Ready. Your Org Chart Isn't."
date: "2026-09-28"
author: "Dave O'Dell"
category: "Technical Leadership"
excerpt: "Someone asked us where App Vitals will be in three years. The honest answer is that the models will be further along than anyone's org chart. The constraint was never the technology."
readTime: "7 min read"
---

Someone asked us a question this week that sounded like small talk and wasn't: where will App Vitals be in three years?

Dan and I have different instincts about most things, but we landed in the same place on this one, and it wasn't a prediction about models. It was a prediction about companies. Three years from now the technology will be capable of running almost everything we currently pay humans to do inside a software organization. It's most of the way there today. What won't have moved nearly as far is the shape of the companies trying to use it.

That's the whole thesis, and it's worth sitting with, because it inverts where almost everyone is spending their attention. Teams are still evaluating tools. The tools are fine. The tools have been fine for a while.

## The slow part isn't the technology

We say a version of this on nearly every call, and it never stops being true: the slow part is not the technology. It's the human beings standing between the technology and the work.

Not because those humans are dumb or lazy. Because they're embedded in a structure that was designed for a completely different cost of production. An org chart is a compression algorithm for decision-making under scarcity. When shipping software was expensive and slow, you needed layers of people to decide what was worth shipping, because getting it wrong burned six months. Committees, steering groups, approval chains, quarterly planning: all of that is a rational response to expensive mistakes.

Now the mistakes are cheap. A wrong direction costs an afternoon of agent time. But the structure built to prevent expensive mistakes is still fully staffed, still meeting on Thursdays, and still the thing every change has to pass through.

We have a friend who's a patent lawyer. Sharp guy, nothing to do with software. He's genuinely worried about falling behind, and when he described how his field is using AI, it was roughly: some people paste things into a chat window. That's it. That's the state of the art in a knowledge-work profession that is almost entirely reading, drafting, and pattern-matching against precedent. If you work in software you are living in the fastest-moving corner of this whole transition and it still feels chaotic. Everywhere else, the gap between what's possible and what's happening is enormous.

That gap is not a technology gap. Nobody is waiting for a better model. They're waiting for permission, budget, a process, and someone senior enough to say yes.

## You can 10x your shipping and still be slow

Here's the trap we watch teams walk into, and it's the most expensive one.

You adopt the tooling. You wire up autonomous agents. They run in the cloud, around the clock, and your throughput genuinely goes up by an order of magnitude. We're not being cute about that number, we [run our own company this way](/blog/we-code-autonomously/) and the code gets written whether we're awake or not.

And then nothing downstream changes. The PRs land in a review queue that one human drains on Tuesdays. The release still waits on a change-advisory meeting. The feature still needs three directors to agree it's the right feature. If your organization is still organized the same way, with a crowd of humans needing to approve this thing in meetings, you are not going to move any faster. You've just built a much faster machine feeding a queue that empties at exactly the same rate it always did.

This is the part people underestimate. Velocity is a property of the whole system, not the part you upgraded. We've written before about [the review bottleneck](/blog/ai-pr-review-bottleneck/) and about [CI pipelines buckling](/blog/ai-tools-ci-pipeline-overload/) under agent throughput, and they're the same story at different layers: the constraint moves, it doesn't disappear. Upgrade generation, and approval becomes the wall. Fix approval, and prioritization becomes the wall.

So the actual work of the next three years isn't installing anything. It's finding every place a decision waits on a quorum and replacing it with a single trusted human who can say yes today.

## A lot of those titles have to go away

This is the uncomfortable part and we're not going to dress it up.

A large number of management titles exist to coordinate humans doing work that humans will not be doing. Senior manager, director, VP, layered over teams whose output is increasingly produced by systems. The job content of those roles is disproportionately meetings, status aggregation, and oversight. When the thing being overseen is an agent fleet with a dashboard, that job doesn't need a layer. It needs an owner.

Those people have real influence, which is exactly why this is hard. A lot of those titles are going to go, and they have to go, and the ones holding them are frequently the same people who'd need to sponsor the change that eliminates them. That's not a technology problem you can solve with a better rollout plan. It's the [pointy-haired-boss problem](/blog/pointy-haired-boss/) with the stakes turned up.

We want to be precise, because "management goes away" gets read as "nobody manages anything." Wrong. Judgment gets more valuable, not less. Deciding what to build, what not to build, what quality bar actually matters, when to stop: that's the scarce input now. What loses value is coordination as a full-time occupation, and oversight as a substitute for trust. The move is to [remove the human from the loop wherever the human is only forwarding information](/blog/no-one-is-paying-you-to-code-anymore/), and concentrate the remaining humans on the calls that genuinely require taste.

A two-person company is not automatically better at this. We're just structurally unable to build the bureaucracy in the first place. That's the actual advantage, and it's available to a 200-person company that's willing to be deliberate about it. We've made [that argument at length](/blog/two-people-and-the-200-person-question/).

## Where we're going, specifically

Back to the original question, since we owe a real answer.

We'll still be building software in three years. That's not in doubt. It's what we're good at and, frankly, it's fun, and we're not going to stop doing the thing we enjoy because the tooling changed. What changes is where we sit in the stack.

Two years ago the work was writing code. This year the work is writing PRDs and specifications precise enough that the factory can execute them without us. The direction is clear: keep moving upstream. From code, to specs, to goals. The endpoint is a system where we state an outcome and the pipeline decomposes it, plans it, builds it, reviews it, and ships it, with us in the loop for judgment and nothing else. Every quarter, the thing we hand the machine gets one level more abstract.

The other half of our attention, honestly, is on distribution. Building has stopped being the constraint for us, which means the constraint is whether the right people ever hear about what we built. So a lot of what we're streamlining now isn't engineering at all. It's marketing surface, presence, being findable at the moment someone has the problem we solve. That's a strange sentence for two engineers to write, and it's where the leverage actually is once the factory runs itself.

## And then it stops being about software

The part of the conversation that stuck with both of us afterward wasn't about code.

Three years from now there will be autonomous robots doing physical work that today has no automation at all. Loading dishwashers. Stocking shelves. None of that exists in any meaningful commercial way right now, and the rate of progress on embodied models does not suggest it stays that way for long.

And then there's trucking. Long-haul is going to be replaced, and that's millions of jobs that are genuinely good jobs, jobs that let people without a degree support a family. If UPS could automate that route tomorrow, they would. That's not cynicism about UPS, it's just what a business does. The economics are overwhelming and the social absorption plan does not exist.

We're software people, we don't have a policy answer, and we're suspicious of anyone who claims to. But it reframes the software conversation. Engineers have spent two years arguing about whether their jobs are safe. That argument is already [settled in a narrow sense](/blog/your-engineering-career-was-never-safe/): the work changed, the people who adapted are fine, the ones waiting for it to blow over are not. What's coming for the physical economy is the same transition without the luxury of being early to it.

The thing worth doing about it, in our own small corner, is the thing we're already doing: making it possible for people who are not career engineers to build real software. That's not a heartwarming detail, it's the point. When the leverage moves from typing to judgment, the set of people who can build expands enormously, and that's the most useful thing we can be building toward.

Three years. The models will be ready well before that. The question is whether your org chart is.

---

*This post is adapted from [The Velocity Lab podcast](https://podcasts.apple.com/podcast/the-velocity-lab/id1888653618), Episode 40: Three Years From Now: The Tech Is Ready, Your Org Chart Isn't.*
