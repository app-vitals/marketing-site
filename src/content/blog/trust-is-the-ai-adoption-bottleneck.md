---
title: "Your AI Adoption Problem Is a Trust Problem"
date: "2026-09-21"
author: "Dave O'Dell"
category: "AI Adoption"
excerpt: "Every company we work with can install the tool in an afternoon. Months later most of them still are not shipping any faster. What actually stands in the way — not the model, not the budget, not the integration — is trust, and it has two halves."
readTime: "7 min read"
---

Every company we work with can install the tool in an afternoon.

That is genuinely the easy part. Procurement takes longer than setup. The agent connects to the repo, the seats get provisioned, somebody runs a demo in an all-hands and people make impressed noises. Then six months later the engineering org is shipping at roughly the same rate it was before, and somebody senior starts asking whether the whole thing was oversold.

We have watched this happen enough times to stop believing it is a tooling problem. Dan and I spent an episode on it recently and landed somewhere that sounds soft but is not: the bottleneck is trust. Not trust in the abstract corporate-values sense. Two specific, concrete kinds of trust, both of which have to be present before anything gets faster.

## Why this is harder than any tool rollout you have done

Start with an honest accounting of what you are actually asking for.

You are asking a manager whose job is measured in headcount to advocate for a change that shrinks headcount. You are asking an engineer whose entire professional identity is built around writing code to stop writing code. These are not irrational objections to be steamrolled in a town hall. They are people correctly reading what the change means for them.

That is what makes this different from every other tool rollout in your history. Moving from one ticket tracker to another asks people to learn new buttons. This asks millions of individual engineers and DevOps people to change what the job *is*. We have written before about [why tool rollouts fail](/blog/why-tool-rollouts-fail/), and AI adoption fails in the same shape but with far higher stakes, because what is being threatened is bigger than a workflow preference: it is the thing people think they are.

We should be honest that we did not arrive at this from a position of calm strategic clarity either. Part of why we adopted AI as aggressively as we did was fear. The specific feeling was: we are going to get left behind. The real origin story is not a noble one, but it is worth admitting, because it is probably also what is happening in your org, unspoken, at every level.

## The first half: trusting the AI

Trust in an agent builds up like residue, not like a decision you make.

You do not read a benchmark and decide to trust it. You watch it succeed, and then watch it succeed again, and then watch it handle something you were sure it would get wrong, and eventually you notice you have stopped double-checking everything. Nobody ever announces the moment. It accumulates.

Here is our own data point. Neither of us has hand-written a line of production code in eight months. In that time we have shipped roughly ten thousand pull requests, across our own company and across client work. That number matters less as a flex about volume than as evidence about trust: you do not get to ten thousand if you are personally reviewing every line with your jaw clenched. At some point the reviewing has to relax into spot-checking, and that only happens after the success rate earns it.

What made it earn it was structure, not faith. The workflow is plan first, validate second. A PRD gets written. The PRD becomes discrete tasks. Agents execute tasks. Every stage produces something a human can inspect before the next stage runs. That is what [coding autonomously](/blog/we-code-autonomously/) actually looks like in practice, and the reason it works is that the validation points are load-bearing. Remove them and you are not trusting the system, you are gambling on it.

The interesting wrinkle is that Dan and I arrive at trust from opposite directions.

Dan is a developer. He trusts the system because he has read its output a thousand times and knows its failure modes the way you know a colleague's. His trust is earned through inspection.

I do not write code. I cannot evaluate a diff on its merits, so inspection is not available to me. My trust has to be total or nonexistent, and it comes from a different source: outcomes I *can* evaluate. Did the thing ship. Did it work. Did it break anything. Did the canary catch it when it did.

That difference matters more than it sounds, because most organizations contain both kinds of people, and a rollout designed only for the inspectors leaves everyone else with no path to trust at all. If your adoption plan assumes every stakeholder can read code, it has already excluded most of your stakeholders.

The practical move is to stage it. Do not hand an agent the whole pipeline on day one and hope. Start with planning and a single dev task, where the blast radius is small and the output is legible. Add automation as the track record accumulates. Trust built incrementally survives the first bad day. Trust granted all at once does not.

## The second half: trusting your team

This is the one people skip, and it is the one that kills more rollouts.

Think about what bureaucracy is actually for. Not the polite answer. The real one. Approval chains, sign-off matrices, the standing Thursday meeting where a decision waits a week for a room to be free. All of that exists so the organization does not have to trust any individual inside it. Process is what you install when trust is absent. It is a substitute good.

Dan and I run a two-person company. We have no approval process because we do not need one. That is just what is possible at our size, not some enlightened management philosophy. But it explains something real about why small teams outrun large ones on this particular change: AI moves the cost of an action close to zero, and if every near-zero-cost action still has to clear a week-long approval gate, the gate is now the entire cost. You have made the expensive part free and left the free part expensive.

We see the consequence most clearly in a pattern that keeps recurring: CTOs and senior engineering leaders quietly going back to being individual contributors. Not because they got demoted. Because getting an entire organization to adopt this is exhausting and slow, and doing it themselves is neither. When your most senior people conclude that routing around the org is faster than changing it, that is a diagnosis, not a personnel story. We have argued before that [you cannot transform the whole org at once](/blog/you-cant-transform-the-whole-org-at-once/), and this is the failure mode when you try.

The tell is easy to check. Ask how long it takes one of your engineers to ship a small, low-risk change end to end. If the answer is measured in days and almost none of that is engineering time, you do not have an AI problem yet. You have a trust problem that AI will simply make more visible.

## What changed in code review, and what it tells you

Here is a smaller thing from the episode that stuck with me, because it shows the shift better than any metric.

Code review used to be personal. You wrote something, another human read it, and their critique landed on you. Everyone has been on both ends of a review that went further than it needed to. There was ego in it, in both directions, and a lot of engineering culture was built around managing that.

Now the bots review the bots. An agent writes it, an agent reviews it, and the commentary is just information. Nobody's feelings are in the room. We still have a client where an engineer copies code into Slack by hand to get a human to look at it, and the honest reaction when you see it is: what are we doing.

Reviewers are not being replaced here; what changed is that the emotional weight left the process. Review gets faster because it stopped being an interpersonal event. Most of the friction we had accepted as inherent to the work was actually just the friction of humans critiquing humans.

## The third leg: you still have to verify

Trust with no verification is not trust. It is just hope with better branding.

So the two pillars need a third thing underneath them, which is the boring one: automated testing and canary deploys. You want to move fast without breaking things, and the only way that sentence is not a contradiction is if breakage is caught and rolled back automatically. Ship to a canary. Watch the signals. If it degrades, it reverts before most people notice.

That is what makes the trust rational rather than reckless. I am not trusting an agent's judgment in a vacuum. I am trusting a system where a bad call has a bounded, automatic consequence. Those are completely different bets, and only one of them is sane to make at scale.

It also happens to be the thing that makes trust *transferable*. I cannot ask a skeptical VP of Engineering to share my intuition about an agent. I can show them a rollback that happened at 2am without anyone being paged.

## So where does that leave you

If your AI adoption has stalled, the question to ask is not which model you are on or whether the integration is configured correctly. It is:

Do the people here trust the AI yet, and have you given them a structured way to build that trust rather than demanding it upfront?

Do the people here trust each other, or has that been replaced with process that AI cannot speed up because the process was never the slow part?

And if something goes wrong tonight, does it fix itself?

Most organizations we talk to are stuck on the second question and looking for the answer in the first one. The tool was never going to be the thing holding you back. [AI adoption fails for human reasons](/blog/why-ai-adoption-fails/), and it succeeds for human reasons too.

---

*This post is adapted from [The Velocity Lab podcast](https://podcasts.apple.com/podcast/the-velocity-lab/id1888653618), Episode 38: AI Transformation Is a Trust Problem, Not a Tool Problem.*
