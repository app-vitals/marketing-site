---
title: "Why Non-Technical Entrepreneurs Are Out-AI'ing Professional Engineers"
date: "2026-05-13"
author: "Dave O'Dell"
category: "AI Adoption"
excerpt: "We work inside engineering teams that haven't touched Claude Code, while non-technical founders we meet at dinner parties are shipping production software with it. The gap isn't skill. It's posture — and the engineers are losing on a battle they should be winning."
readTime: "8 min read"
---

Dan and I were debriefing a client call this week and one of us said the quiet part out loud.

We were on a call with a CTO whose engineers — engineers, plural, real software engineers with real tenure — had not adopted agentic programming yet. We came off the call, drove twenty minutes, and ended up at a meetup. The first person we talked to was a non-technical operator running a mortuary business. She was telling us how she'd been using ChatGPT to redo her accountant's spreadsheets and was now thinking through how to wire it into her booking flow. Her words: "Anybody can use this thing. It's just Google but for knowledge."

The same week. The same technology. Two opposite postures.

This pattern has come up enough times now that we have to talk about it. The engineers we work with — the people whose entire profession is supposed to be most adjacent to this stuff — are, on average, behind the non-technical entrepreneurs we meet socially. Not by a little. By a lot.

It's not a skill gap. It's a posture gap. And it has consequences for hiring, for AI rollouts, and for what it means to be a senior engineer in 2026.

## What the Entrepreneurs Are Actually Doing

Let's start with what we keep seeing on the non-engineer side, because it's stranger than it sounds in summary.

A retired bookkeeper in her seventies is running her clients' books through ChatGPT and shipping them a polished deliverable in half the time. A founder with no CS background is using a coding agent to build the booking flow for her event business — she didn't write a line of it, but she's the one driving the build, deciding the schema, picking the integrations. A mortuary owner has wired up an LLM to summarize incoming inquiries and is now asking us, unprompted, about staging environments. He didn't know the term "staging environment" three months ago. He learned it because his agent told him he needed one.

A pattern across all of them: they didn't ask permission. They didn't wait for training. They didn't worry about whether their code is "good." They opened the tool, started talking to it, and the tool met them where they were.

Some of the code under the hood is genuinely bad. It would not pass a senior engineer's code review. There are race conditions that haven't bitten yet. Security holes that haven't been probed yet. Database schemas that are going to require a painful migration in eighteen months.

And they're making money.

That's the part that breaks the engineering brain. Every instinct we've trained for fifteen years says you cannot ship that code. And every one of those entrepreneurs is shipping it, getting paid, and learning the next thing they need to learn — usually from the agent itself. The same person who didn't know what a staging environment was last quarter is asking us about CI gates this quarter. They are climbing the engineering ladder in fast-forward, because they have no professional identity to defend.

## What the Engineers Are Actually Doing

Now flip it.

We sit down with an engineering team that's been told, top-down, to roll out agentic tooling. The licenses are paid for. The Claude Code seats are provisioned. The internal documentation is written. And nothing is moving.

The reasons we hear are familiar — and they are not technical reasons.

"I don't trust it on production code." "I want to understand what it's doing before I use it." "It's faster for me to write it myself." "I tried it on a hard problem once and it failed, so I stopped." "If I use it, am I still really the engineer on this PR?"

These are not bad sentences. They are the sentences of people who have built a craft and have a real reason to be cautious about a tool that threatens to commodity-ize the part of the craft they're proudest of. We understand the feeling. We have the feeling.

The problem is that the entrepreneur on the other side of the wall does not have the feeling. She does not have an identity to defend, so she does not defend one. She walks up to the tool, asks it the question, and uses the answer. By the time the engineer down the hall has finished evaluating whether the tool is good enough to deserve their attention, the entrepreneur has shipped two features and is asking the agent what to do about her flaky test.

This is, increasingly, the thing keeping us up at night. The engineers we know best are losing ground on a domain they are supposed to own, and the speed of the loss is accelerating.

## The Curiosity Premium

Dan said something on this episode that's been rattling around in my head since.

"This is the age when the curious people are going to crush it."

That's not a slogan. It's a strategy statement.

For most of the last twenty years, the durable professional advantage in software was depth. Knowing the language better, the framework better, the database engine better than the next person. Curiosity helped, but rigor and tenure paid the bills.

The arithmetic just changed. Depth still matters — but a senior engineer's depth advantage now compounds against a non-engineer with an agent at roughly one-tenth the rate it used to compound against a non-engineer with Stack Overflow. Meanwhile, *curiosity* now compounds at a wildly different rate, because the tool you ask the curious question to is a multi-trillion-token model that has, embedded in it, the textual answer to nearly any well-posed engineering question.

If you are curious and you can describe what you want, you can get a working answer in seconds. If you are not curious, none of the depth in the world will help you, because you will never reach for the tool that translates depth into output.

This is why the demographics of who is "ahead" in 2026 are inverted from what most people expected. The non-engineers who are ahead are ahead because they were never not-curious about AI. The engineers who are behind are behind not because they lack skill but because they are spending their curiosity budget on something else — on the codebase, on the language, on the system architecture, on the on-call rotation. There's no curiosity left over to point at the tool that would have made all of those things faster.

## Why This Is an Engineering Leadership Problem

This isn't just an interesting sociological observation. It's a leadership problem, and the people who feel it first are CTOs.

We've written before about [why most AI adoption rollouts fail](/blog/why-ai-adoption-fails/) — the short version is that "we bought everyone a license" is not a rollout, and senior leadership has to own the cultural change, not just the procurement line. The curiosity gap is the same problem, viewed from a different angle.

If your senior engineers haven't adopted yet, asking them to adopt is not the move. What you actually need to do is *change what curiosity gets rewarded for*. Right now, in most engineering orgs, curiosity gets rewarded when it points at the internal stack — at the legacy service that's been bothering everybody, at the new database engine, at the framework upgrade. Curiosity that points outside that scope is treated as a hobby.

In 2026, that allocation produces engineers who lose ground to founders.

The fix is uncomfortable: you have to make agentic tooling part of the *internal stack*. Not a perk, not a license, not a sidecar. Part of the way work gets done, evaluated, and promoted. The team that ships features twice as fast because they're routing through Claude Code should be the team that gets the next big project. The senior who can drive an agent to write a clean migration should be the senior who gets credit for the migration — not the senior who hand-rolled it in a weekend.

Until that shift happens, the curiosity gap will keep widening, because curiosity follows reward.

## What This Means for the AppVitals Team

Selfishly, this is also why Dan and I built AppVitals in the first place.

We wouldn't have AppVitals without agentic tooling. We've said this a few times, but it's worth saying once more concretely: our marketing site was redesigned by an AI assistant while one of us was driving home from a ski trip with a kid in the back seat. Our entire internal SaaS stack — accounts, calendar, time tracking, billing, invoicing, partner pay-outs — we deleted the four SaaS tools we used to pay for and rebuilt them ourselves, because we have an autonomous coding pipeline and we can. This podcast only exists because publishing it is one command. If publishing required work, we wouldn't be doing it. We've tried.

Every single one of those wins came from being curious enough to ask the question "could we just build that?" The answer used to be no. The answer is now, almost always, yes — for two engineers, at the speed of a conversation, with most of the engineering ladder collapsed into the assistant.

If we — two engineers — can do this, the founder running the mortuary business can do most of it too. And she will. That's not a threat to engineers; it's a reframing of what engineers should be doing. The work is no longer to write the code. The work is to know what to build, to make sure it works, to keep the lights on, to handle the cases the agent can't. That is still real, valuable work. But it's different work than the work we got hired to do five years ago, and the engineers who are going to thrive are the ones who recognize the difference quickly.

## The Question to Sit With

Here is the question we keep asking the engineering leaders we work with, and the question we'd ask any engineer reading this.

When did you last get the same kind of giddy, untrained, "I wonder if this works" feeling about a tool that the non-technical entrepreneur you know has every time she opens her phone?

If the answer is "recently," you're fine. Keep going.

If the answer is "I don't remember," that's the gap. And the gap is not closing on its own.

---

*This post is adapted from [The Velocity Lab podcast](https://podcasts.apple.com/podcast/the-velocity-lab/id1888653618), Episode 16: Why Entrepreneurs Are Out-AI'ing Engineers.*
