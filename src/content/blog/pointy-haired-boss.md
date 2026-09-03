---
title: "Am I Building the Pointy-Haired Boss?"
date: "2026-09-03"
author: "Dan McAulay"
category: "Company Updates"
excerpt: "DHH's argument that over-specifying an agent makes it worse got under my skin. Running Shipwright's own origin-story test against it took me somewhere I didn't expect — not toward bloat, but toward something quieter and harder to see."
readTime: "8 min read"
---

*This one isn't part of the numbered origin series — [cloud review](/blog/cloud-agent-review-origin/), [OpenClaw](/blog/openclaw-todos-origin/), [the VitalsOS merge](/blog/vitals-os-merge-origin/), [the task store](/blog/task-store-origin/) — but it runs on the same test that series set up. I said it plainly in the first one: every piece of Shipwright has to earn its place by pointing back to a specific problem it solved for a specific person. If it can't, it probably doesn't belong. I don't just apply that test when I'm building something new. I apply it whenever I catch myself worried I've built too much — which is most weeks, and which is what this post actually is.*

I watched DHH make an argument recently that got under my skin: the instinct to over-specify your agent backfires. Huge instruction files hurt. When you tell a coding agent exactly how to do its job, against its better judgment, you get worse output — the same way a team gets worse output from an engineer whose boss micromanages every decision. An Anthropic engineer put out a post this year showing Claude Code's own system prompt getting cut by somewhere around 70 to 80% — depending on whose remeasurement you trust — moving fixed rules into on-demand skills instead of upfront instructions. Boris Cherny, who built Claude Code, was the one who put it in front of the industry. Either way, the point stands: the model did fine without the parts humans had added for their own comfort, not the model's.

That one landed hard, because I build a tool whose entire pitch is process. Shipwright has a task queue, review gates, merge policy, claim locks, a whole pipeline an agent moves through before code reaches main. The question I couldn't shake: is that scaffolding making the model worse? Am I the pointy-haired boss?

## The fear, stated plainly

DHH's second point made it worse. He said upfront specs never worked — that's the whole lesson of agile. You write a detailed spec, hand it to an engineer, and nobody's happy, because nobody actually knows what they want until they've used the thing. The move is to manifest something rough and *discover* the real requirement through use, not to specify your way to it in advance.

Shipwright is spec-heavy by design. PRDs before code. Plan sessions before dev tasks. Skill files that walk an agent through a numbered sequence of steps. If detailed upfront specification degrades output — for humans and, per DHH, for agents too — I've built a tool that runs directly against that finding, and I've built it on purpose.

## The category was itself the trap

My first pass at resolving this was a rule: be loose where you're telling the model *how to write code*, be strict where you're keeping multiple agents from corrupting shared state. Coordination earns rigor. Implementation doesn't. That felt clean, and it's not wrong exactly, but I caught myself about to file every future decision under one of those two buckets and stop thinking once I knew which bucket it was in.

That's the same move DHH is warning about, just one level up. A rule that says "always be rigorous about X, always be loose about Y" is a spec — I'd have specified my way out of specifying too much, which is its own small joke. Something coordination-shaped might turn out not to need the rigor once you actually look at it. Something that looks like plain implementation might turn out to need real discipline — a security-sensitive parsing step doesn't get a pass just because it's "just implementation." The category isn't the discipline. Checking, freshly, every time, is the discipline. The category is just what you reach for when you want to stop checking.

So I stopped trying to find the rule and asked the actual question instead: right now, today, does Shipwright's rigor earn its keep?

## What the honest check actually found

I expected to find bloat. I went looking for it — the numbered skill steps, the mechanical gates, all the places I'd feel silly defending to DHH's face. I didn't find much. Almost every rigid piece I checked still traces to a specific day something broke — a real gate closing a real hole, not a step I added because it felt responsible. Cutting rigor on the strength of this pass would have meant reopening real holes, not trimming decorative ones.

That's not the interesting part, though. The interesting part is what I found instead, once "is this piece over-specified" stopped being the right question.

We've been heads-down on autonomy for a while now — getting agents to do more of the pipeline without a human catching things — more than we've been heads-down on the system underneath it. Every gate I checked was added the same way: one incident, one fix, individually correct at the moment it landed. But nobody went back afterward and asked whether that fix still made sense once three more fixes landed around it. I found exactly that, once: a step that used to be the right, safe default reset of some state, written back when it was the only thing touching that state — and it kept running unchanged after a more careful state machine had grown up around it, until it finally clobbered something it shouldn't have and someone caught it the hard way. It got fixed within a day of that. The old step wasn't wrong when it was written. It just stopped noticing that the ground under it had moved, and nothing was checking until it broke something.

That's not over-specification. It's not under-specification either. It's a piece that passed the test the day it was born and never got asked the question again.

## The search got sharper, not the answer

I didn't expect that to be the outcome of a post that started as "am I over-building this." I went in with a fear and a binary — too much scaffolding or not — and came out with a different question entirely: not "does this piece deserve to exist," which I can check file by file and mostly get a clean answer to, but "does this piece's assumption still hold, given everything that's shipped around it since." That's not a question you can answer by walking the skill files one at a time. You have to walk an actual task through the whole pipeline, start to finish, and check every handoff against what's actually true today instead of what was true when that handoff was written.

That's genuinely a new way to search, and it only showed up because I refused to let "coordination vs. implementation" settle into a rule I could stop re-checking. The fear that sent me looking was about specification. What I found was about staleness. Those aren't the same problem, and I wouldn't have found the second one if I'd been satisfied with an answer to the first.

I'm not less scared of over-specifying the model than I was a week ago. I'm also not planning to cut anything based on this pass — the rigor I checked earned its place. But I know exactly what to go check next, and it isn't a list of skill files. It's a single task, walked end to end, asking at every step whether it still knows what's true.
