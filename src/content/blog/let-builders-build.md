---
title: "Let Builders Build: Why AI Velocity Is an Org Chart Problem"
date: "2026-05-04"
author: "Dave O'Dell"
category: "Technical Leadership"
excerpt: "AI tooling makes engineers faster. It does not fix architecture committees, low-trust managers, or org charts that punish builders. Why every CTO we work with is starting to have the same conversation with their CEO."
readTime: "9 min read"
---

We work inside a lot of engineering organizations. Different stacks, different stages, different industries. The conversation that keeps happening — across all of them, increasingly out loud in 2026 — is the same one.

A CTO leans across the table. The leadership team has just approved another AI tooling budget. Claude Code seats. Cursor licenses. A new evaluation framework. The CTO knows, before any of those tools roll out, that the rollout is not going to move their delivery numbers the way the board is expecting it to. They tell us this directly, almost always in the same words: "The tooling is fine. The org isn't. I can't fix this from where I sit."

That sentence is the whole problem. And it's a problem that lives well above the engineering team.

## The Bottleneck Moved

There's a shape to AI rollouts that nobody talks about until they're three quarters in.

Phase one: tools land. Engineers learn them. Output increases — measurably, in some teams dramatically. PRs go up. Cycle time on first commit drops. The early demos are everything the leadership team hoped for when they signed the procurement line.

Phase two: the bottleneck moves. Code is now arriving at the next station faster than that station can handle it. Code review backlogs grow. PR queues lengthen. Security reviews stack up. Design has to weigh in on three flows where they used to weigh in on one. Product spends more time clarifying scope. The people upstream and downstream of engineering — none of whom are using AI yet — become the new constraint.

Phase three: the velocity story disappears. Senior leadership looks at the dashboard and sees throughput roughly where it was, despite a non-trivial AI bill. Some teams have started routing around the queues. Some engineers are quietly looking at companies where the queues don't exist. The CTO is in the awkward position of having delivered exactly what they said they would deliver — faster engineering — without delivering the business outcome leadership thought they were buying.

This is not a tooling failure. It's the predictable result of optimizing one part of a system without changing any of the other parts. We've written before about [the velocity trap](/blog/velocity-trap/) and [why tool rollouts fail](/blog/why-tool-rollouts-fail/) — this is the same dynamic, scaled up.

## Builders, Maintainers, and Palace Guards

One of my mentors framed engineering organizations into two roles 20 years ago, and the framing has held up better than almost anything else I've absorbed in my career.

You have palace guards. They look good. They protect the castle. They follow the rules and they make sure other people follow the rules. They don't really do much, but they do have a job: protect.

And you have commanders. They go out there and kick ass.

In a modern engineering org, that maps cleanly into builders and maintainers. Builders ship working software. They own outcomes. They fix things when things break. They do not need permission slips to do useful work. Maintainers guard the codebase. They enforce style. They treat speed as a threat to safety. They block changes that move "too fast."

Both roles have a place. A pure-builder team with zero maintainers eventually accumulates the kind of mess that does take you down. We've written about [AI-generated code as technical debt](/blog/ai-generated-code-technical-debt/) — that's a real thing and someone has to mind it. The question is not whether maintainers exist. It's the ratio.

Most engineering orgs we walk into have the ratio inverted. Roughly 70% maintainers, 30% builders. The maintainers fill the calendar. They sit on architecture review committees. They write the design-doc templates. They put their names on the senior-reviewer list. They're often the most visible people in the org, because the work of preventing things shows up everywhere — in tickets, in process, in meetings — while the work of building shows up in commits that nobody reads.

When you bolt AI onto that org, the builders get faster. The maintainers don't. And because the maintainers are positioned upstream and downstream of the builders' work, the org gets only as fast as its slowest gate.

## The Trust Problem Isn't a Process Problem

Here's the question worth sitting with: why does this org shape exist in the first place?

Almost every architecture committee, mandatory design doc, three-reviewer PR rule, and ticket-level approval gate we encounter was added at some point by someone who is still in the org. They were added because — explicitly or implicitly — somebody didn't trust someone to make a good decision without that gate.

That's the actual problem. The process is a downstream artifact of an upstream trust failure. And trust failures resolve in exactly two ways.

Either the people being mistrusted are not actually trustworthy — in which case the problem isn't the process, it's the hiring. Fix that, and most of the gates become obviously redundant. You'll find yourself deleting them over the next year as the new bar self-evidently makes them unnecessary. The process didn't need to be smarter; it needed to be unnecessary.

Or the people being mistrusted are fine — and a leader has been treating them as a liability when they aren't. In that case, the leader is the bottleneck. The team is bleeding talent silently. The good engineers are interviewing somewhere else. AI tooling will not change this; if anything, it accelerates the departure, because the gap between what those engineers could ship in a healthy environment and what they're allowed to ship in this one becomes mathematically obvious.

This is the conversation no CEO wants to have, but it's the conversation the org actually needs. We've watched [enterprise AI adoption fail](/blog/enterprise-ai-adoption-mistakes/) more than once because leadership tried to install velocity without ever addressing the trust dynamic that built the slow org in the first place. The tools work. The org doesn't.

## What Top Performers Actually Need

When we run engagement work, one of the early exercises is a direct conversation with the org's top three or four engineers. We ask them, point blank: "What would it take for you to double your output?"

The answers are remarkably consistent. They are also almost never about tools.

The top three answers we hear, in order:

"I'd be in fewer meetings." Eight hours a day in meetings is real and it's everywhere. Half of those meetings exist because a manager somewhere needs status, not because the engineer needs alignment. The other half exist because a process step requires a synchronous human checkpoint that could be asynchronous. None of it is making the engineer faster.

"I'd stop waiting on approvals from people who don't ship." Architecture committees, three-reviewer PR rules, security gates with no SLA. Each rule was added in response to something specific. None of them get retired when the precipitating thing fades. The cumulative tax is enormous, and nobody is responsible for the cumulative tax — every individual gate is "reasonable."

"I'd have something to do when I'm blocked upstream." Engineering finishes work and waits days on product clarification, design feedback, legal review. The bottleneck moved out of engineering. Nobody in engineering can fix it. Nobody outside engineering thinks they own it.

Notice what is not on the list. Nobody says "give me a better AI tool." Nobody says "I need a faster local dev loop." The top performers in your org are not telling you the technology is the constraint. They are telling you the org is the constraint, and they are telling you in language that feels safer than the language they're using to describe the situation to their friends.

We've written about [measuring AI adoption ROI](/blog/measure-ai-adoption-roi/) — the metrics matter, but they will mislead you if you only look at the tooling line. The metric that matters most is what your top performers say when you ask them what is slowing them down, and whether you act on what they tell you.

## Why Block, Square, and Shopify Are Trimming Right Now

Look at the public moves of the last 18 months. Block. Square. Shopify. Meta. Google. Every one of them has cut headcount. Every announcement has cited AI as a driver. None of them mean only AI.

What they actually mean — and what they aren't saying out loud, because they don't need to — is that a lot of the roles being eliminated probably should have been eliminated years ago. AI gave them the cover story. The real story is that headcount was cheap, growth covered for inefficiency, and "we'll fix it later" was a real strategy until it wasn't.

The companies trimming now are doing two things at once. They're flattening the org chart, and they're restoring trust to the people who actually ship. The flattening is what the press release talks about. The trust restoration is what shows up in their delivery numbers six months later. The two are inseparable.

The companies not trimming — the ones bolting AI tooling onto the same org chart they had in 2023 — are running a different experiment. They are paying for AI tools, paying for the layers above and around the people using those tools, and waiting for the math to add up. It will not add up. It will look identical to the experiment they were running before AI, just with a new line item.

This is the choice every CEO is currently making, whether they realize it or not. The board is going to ask which experiment you ran. The honest answer in 24 months is the one that's already implicit in your last three personnel decisions.

## What CTOs Are Starting to Say to CEOs

The CTOs we work with are starting to make the case explicitly. They're walking into the CEO's office with a version of this:

"Our AI rollout is working. The tools are landing. Engineering is producing more and we have the metrics to prove it. The reason it isn't showing up at the company level is structural. The work is queueing up at gates I don't own. Until we restructure those gates — which means making personnel decisions in functions outside engineering, which means changing reporting lines, which means actually trimming layers I can't trim — we will keep paying for AI without seeing AI."

That's a hard sentence to deliver. It's an even harder sentence to hear. But it's the truthful version of what the metrics are saying, and the CTOs who deliver it are the ones whose AI rollouts will actually show up in the company's numbers.

If you're a CEO and your CTO has not had this conversation with you yet, two things are likely true. The first is that your CTO has had the conversation with themselves and concluded the political cost of bringing it to you is higher than the personal cost of just accepting that the rollout will under-perform. The second is that your CTO is right. AI velocity is not an engineering decision in 2026. It's a c-suite decision wearing engineering's clothes.

## What We Tell Clients

When we step into an organization to help with AI adoption, we now spend roughly half of the engagement on what looks, on paper, like organizational consulting work. Mapping the org chart. Identifying the layers that exist because of historical trust failures. Naming the personnel changes that the CTO has wanted to make for two quarters but hasn't had the cover to propose. Walking the CEO through what the velocity story will require, and what it will cost socially.

This isn't what we signed up to do. We're engineers. We came in expecting to talk about CLAUDE.md files, sub-agent architectures, evaluation pipelines, and the [autonomous coding pipeline](/blog/autonomous-coding-pipeline/). And those conversations still happen, every engagement. But the questions clients now ask us, more often than the technical ones — "Should we keep this person? Should this team be three layers or two? Is this committee actually adding value?" — are the questions that actually determine whether the AI rollout works.

We didn't expect to be the people who say it. We are saying it anyway, because nobody else in the room is incentivized to.

If you take one thing from this: the AI transformation conversation in 2026 has stopped being about AI. It is about whether your organization is shaped like an organization that ships, or shaped like an organization that prevents shipping. The tools will run on top of either shape. Only one of those shapes turns the tools into velocity.

The other shape just gets you a more expensive version of the company you already had.

---

*This post is adapted from [The Velocity Lab podcast](https://podcasts.apple.com/podcast/the-velocity-lab/id1888653618), Episode 12: Let Builders Build.*
