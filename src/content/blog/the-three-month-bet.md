---
title: "The Three-Month Bet: Why 20% Time Is the Slowest Way to Adopt AI"
date: "2026-05-15"
author: "Dave O'Dell"
category: "Technical Leadership"
excerpt: "Every engineering org we work with is spending 20% of someone's time on AI adoption. It's the most expensive way to go slowly. The companies pulling ahead made a different bet — and it's a board conversation, not an engineering one."
readTime: "8 min read"
---

Six weeks ago, autonomous programming was an idea we were sketching on a call.

Today we have clients running it in production. Not a demo. Not a pilot that lives in a branch nobody merges. Production work, planned and reviewed by humans, written and shipped by agents. That platform did not exist six weeks ago. Now it does, and the gap between "idea" and "clients depend on it" was measured in weeks.

I lead with that timeline because it reframes every conversation we have with engineering leaders. The question is never "is this real yet?" By the time you've finished asking, the answer has changed. The real question is the one almost nobody is answering well: **how much do you commit, and how fast?**

Most companies have answered it the same way. They've answered it badly.

## The 20% Answer

Here is the pattern we see in nearly every engineering organization we walk into. Someone — often a strong senior engineer — gets handed AI adoption as a part-time mandate. Twenty percent of their week. A Friday. A "when things are quiet" assignment. The org tells itself this is prudent: we're investing, but we're not betting the roadmap on it.

It feels responsible. It is actually the most expensive way to move slowly.

Dan and I have said this enough times that I feel like a broken record, but it keeps being true: the companies that have genuinely transformed didn't do it on 20% time. They took a handful of their best people and pointed them at this — only this — for a concentrated stretch. The companies still stuck on rung one of the [AI Adoption Ladder](/blog/we-code-autonomously/) are almost always the ones running the slow burn.

The slow burn fails for a structural reason, not a motivational one. Adopting AI isn't a tool rollout. It's the construction of a system — docs that lazy-load the right context, test coverage an agent can trust, a CI pipeline that doesn't collapse under parallel work, a deployment path that doesn't need four approvals and a release manager. We've written before about why [autonomous coding fails everywhere except the code layer](/blog/we-code-autonomously/). Building the system underneath is the actual work, and systems don't get built in the cracks between sprint commitments. They get built when someone owns them.

Twenty percent time doesn't build a system. It builds a graveyard of half-finished experiments that each have to be re-understood from scratch every Friday.

## What Actually Changed in Three Months

To understand why concentrated effort compounds and diffuse effort doesn't, look at what shifted for us in one quarter.

Three months ago, I watched Claude write code. I sat there, read every line as it appeared, ready to interrupt. That's rung two — supervised. Useful, but you can't walk away.

Now I don't watch. I run a planning session, hand off, and the agent writes across multiple commits and multiple tasks while I do something else. I review later — with Claude's help, of course. Not because I got reckless, but because the confidence was earned: enough reps, enough coverage, enough structure that watching every keystroke stopped adding information. Claude is, functionally, an employee on our team now.

That shift — from "watch" to "review the work of something you trust" — is the entire ballgame. And it did not happen because we dabbled. It happened because we went head-first, tried to do as much as possible with AI, and discovered the thing everyone discovers when they actually commit: **things you were certain wouldn't work, work.** You cannot find that out at 20%. You find it out by living in it, watching what other people pull off, thinking "wait, that worked?", and trying it yourself.

## The Hygiene On-Ramp

None of this means the answer is "flip autonomous programming on for your team on day one." That's not step one for anyone, and pretending otherwise is how you get the vague claims that fill the internet.

The honest on-ramp is hygiene work. The tasks every engineer wanted to do and never had time for. A doc that describes your data model so an agent can lazy-load it instead of re-deriving it every session. A README that's been stale for eight months. Code coverage gaps. The README you'd glance at once every six months, wince, and close.

These are perfect first targets for two reasons. First, they're not on the critical path — you don't lose money if a doc update is imperfect, and "imperfect but a step in the right direction" beats "stale and wrong," which is what those files were anyway. Second, they're recurring. You set up a job that runs weekly: *Claude, look at what we shipped this week, see what needs updating.* The agent reads the whole repo holistically, catches the duplication and the drift that piecemeal updates miss, and the codebase gets measurably better while nobody spends a sprint on it.

This is the introduction to autonomy. You're not betting production on it. You're letting people watch an agent do real, useful, low-stakes work on a cadence — and quietly climbing the ladder while you do. We laid out the repo-prep version of this in [six non-negotiables before you turn on autonomous programming](/blog/prepping-repo-autonomous-programming/).

## Why This Is a Board Conversation

Here's the part engineering leaders don't want to hear: the blocker is rarely technical, and the decision isn't yours alone to make.

The companies that pulled ahead — the ones where 20–30% of their changelog now ships through AI — didn't get there because their engineers were smarter. They got there because leadership dedicated critical resources full-bore instead of spreading them thin. Look at what Jack Dorsey is doing at Block: the posture is "we're going head-first, we're embracing this," not "we've allocated some slack capacity to explore it."

That posture has a cost, and the cost is a roadmap conversation you have to have with your board. The honest pitch sounds like this: *I'm taking my best people for the next three months and pointing them only at this. That means the next quarter we ship the top two roadmap items, not the top ten. At the end of three months, we are structurally faster than the competitors who went piecemeal.*

I want to be careful not to oversell the sacrifice. You don't necessarily put everything down for three months — sometimes the better framing is that instead of an 80-hour grind you do 40 hours and the system carries the rest. But you do have to actually invest. It will not happen by typing questions into ChatGPT. It happens because someone built a system and committed to it, and that requires the air cover only a board-level decision provides. This is the conversation we've written about in [what boards actually ask about AI](/blog/what-boards-ask-about-ai/) — and the answer leaders need to walk in with.

## The Compounding You're Giving Up

The reason the three-month bet wins isn't heroics. It's compounding, and the slow burn never reaches the part of the curve where compounding shows up.

Here's how Dan and I actually work. We do something with Claude once. The second time it comes up, we don't do it again — we write a skill so we never have to. The overhead of capturing it is low. The next time, we're meaningfully faster. The time after that, faster still.

Publishing this podcast is the clearest example I have. It is, end to end, automated. I record the episode and tell my assistant to publish it, and it does everything — audio, show notes, distribution, the site update, the social drafts. We would not be doing a podcast at all if it required real work beyond recording. It took effort to build that skill. But it was build-once, and now the marginal cost is zero. Compare that to the alternative — writing and maintaining a pile of brittle code forever. The skill is just the workflow, written down crisply and improved a little every time we run it.

That is what 20% time costs you. Not the slower start — the compounding you never reach. Every Friday-afternoon experiment that gets re-understood from scratch is a curve that resets to zero each week. The three-month bet isn't about working harder for a quarter. It's about getting onto the part of the curve where the system you built starts doing the work for you, so you can be doing something else while it ships.

## The Bet

So here's the actual decision in front of you, stripped of the comfortable framing.

You can keep someone on this 20% of the time, feel responsible, and watch competitors who made the concentrated bet pull structurally ahead — not because their people were better, but because they got to the compounding part of the curve and you kept resetting to zero.

Or you take a handful of your best people, give them three months on only this, accept that your roadmap does the top two things instead of the top ten for one quarter, and come out the other side genuinely faster — with a system that keeps compounding after the three months are over.

It's an investment, and it's a real one. But the slowest, most expensive path is the one that feels safest: a little bit of effort, indefinitely, that never reaches the point where it pays you back. Stop doing AI at 20%.

If you want help making the bet — and surviving the board conversation that comes with it — that's exactly the work Dan and I do. Hit us up.

---

*This post is adapted from [The Velocity Lab podcast](https://podcasts.apple.com/podcast/the-velocity-lab/id1888653618), Episode 17: Stop Doing AI at 20%.*
