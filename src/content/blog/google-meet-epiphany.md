---
title: "The Google Meet Epiphany: Two Engineers, One Claude Session, Zero Friction"
date: "2026-04-05"
author: "Dave O'Dell"
category: "Engineering Velocity"
excerpt: "We accidentally discovered you can pair-plan with Claude Code over Google Meet. Dan talks, Dave's mic picks it up, and the session gets both voices."
readTime: "8 min read"
---

We live twenty minutes apart. We're together in person exactly one day a week—Fridays, when we record the podcast. Every other day, we're collaborating over Google Meet, same as any distributed team.

So we were on a Meet call working through a presentation. Nothing special. Dave had Claude Code open in voice mode—holding spacebar, talking through slides, the usual. Dan started suggesting edits out loud. And then something happened that we both needed a second to process: Claude responded to Dan.

Not because Dan had Claude open. Not because we had some elaborate setup. Just because Dan was talking in the same room as Dave's laptop, and the mic picked it up.

We stared at each other for a second. Then Dave high-fived his laptop screen. Then we spent the next ten minutes being genuinely loud about it, like two guys from Southie who just watched a walk-off home run. Because in that moment, the collaboration workflow we'd been mentally outlining—"eventually we should build a shared planning mode," "wouldn't it be cool if both of us could talk to Claude at once"—collapsed into something that already existed and cost nothing to set up.

This is what those moments feel like. Not a new feature. Just a new understanding of what's already there.

## What Actually Happened

The mechanics are trivially simple, which is part of why it hit so hard.

Claude Code in voice mode listens through your system microphone. Google Meet routes the audio of everyone on the call to that same system. Those two facts combined produce a two-person AI session over any video call, with zero additional tooling.

Dan says something. Dave's mic captures it. Claude hears it as part of the ongoing session. The full context—everything we've already discussed, the document we're editing, the decisions we've made—is sitting right there. Claude responds to Dan's point in the context of all of it.

We've been building for months on the premise that [engineering velocity compounds when the right inputs are in the right place at the right time](/blog/velocity-engineering/). Voice input gets thoughts into Claude without the friction of typing. Sub-agent architectures keep sessions clean. CLAUDE.md files carry team context so you're not rebuilding it every session. These are all the same underlying idea: reduce the distance between "knowing something" and "Claude knowing it."

The Google Meet discovery is the collaborative version of that same principle. Two engineers on a call know things. Both of those engineers can now tell Claude things, simultaneously, in context, without any handoff step.

## Why the Handoff Step Kills Planning

Here's what used to happen. Dan and Dave are on a call. Dan says something sharp—catches an edge case, has a take on how a module should be structured, suggests cutting a feature that's adding scope. Dave types it into Claude or summarizes it in a follow-up prompt. Claude responds to the summary, which is always a slightly degraded version of what Dan actually said.

That degradation is subtle but real. When you summarize someone else's words, you're already filtering. Your interpretation of what mattered. Your language, not theirs. And when Claude is responding to your summary, it's working with a copy of a copy. You're introducing translation loss at every step.

The Google Meet approach removes the translation entirely. Dan speaks. Claude hears it. The response is to what Dan actually said, at the exact moment he said it, inside the full context of the session.

For planning work specifically—the messy, iterative, high-stakes thinking that happens before a single line of code gets written—this is a different kind of tool. We've written about [the context problem](/blog/context-problem/) in AI-assisted development: the challenge isn't getting Claude to write good code, it's keeping Claude equipped with the right understanding of what you're actually trying to build. Voice over video call makes that problem meaningfully easier to solve, because both people can feed the context simultaneously rather than taking turns.

## The Part About Not Owning the Code

One thing that came up in the conversation that we want to expand on: when AI is writing your code, your relationship to that code changes.

This sounds abstract, but it has real collaborative implications. When a developer spends a week on a feature—wrestling with the logic, making tradeoffs, debugging edge cases—they're emotionally invested in it. Code review becomes personal. Feedback lands like criticism of the person, not just the work. Teams paper over this with process—careful language in reviews, "code is not identity" mantras—but the underlying psychology is hard to fully neutralize.

When Claude wrote it, the dynamic shifts. You spoke to it, you reviewed what came out, you gave it back to Claude to revise. By the time a PR exists, neither of you wrote it the way a developer writes something after a week in a file. The ego attachment is structurally different. Comments in review are easier to absorb. Iterating on the implementation feels lighter.

That has a direct effect on the kind of collaborative planning we're describing. If Dan and Dave are on a Google Meet and both feeding Claude input about how something should work, and Claude is producing the plan while they're talking—what comes out isn't "Dave's idea" or "Dan's idea." It's the product of the conversation. The ownership is genuinely shared. The friction that usually lives in the gap between two engineers' mental models gets mediated in real time by something that doesn't have a side.

We're not fully through the implications of this yet. But it feels significant.

## The Last Five Percent

Every project has a version of this problem: the gap between what someone explains and what you need to understand to build it correctly. When we're working with product stakeholders—people who know what they want but aren't embedded in the implementation—there's almost always a last five percent that's hard to transfer.

They know it. You can feel it in the conversation. They're describing the behavior they expect. You're asking questions to surface the edge cases they're not articulating. There's a back-and-forth that goes three rounds longer than it should because the specifics only emerge when someone pushes on them.

Now: open a Claude Code session before the meeting. Start voice mode. Get on the call. Both people are talking into the same session. The product person describes the behavior. You ask the clarifying questions. Claude synthesizes it in real time, asks its own clarifying questions, and you both can see the plan forming.

That last five percent isn't a conversation problem—it's a context transfer problem. You need to get someone else's knowledge about what they want into the system that's going to help you build it. Every step that requires one person to first understand and then re-explain something to another system is a chance for signal to degrade. Remove those steps.

This is exactly the kind of [velocity trap](/blog/velocity-trap/) that doesn't show up in sprint metrics. Meetings don't look like waste. Conversations feel productive. But the actual transfer of context—the thing you need to build correctly—is happening inefficiently, and it shows up later as rework, misaligned features, and another round of revision.

## Simple Is the Point

We want to acknowledge the irony here, because we both noticed it immediately. We've spent time thinking about collaboration features—shared sessions, multiplayer modes, team context systems. All real problems worth solving. And the breakthrough moment that made us high-five over a video call was: Google Meet + voice mode + two people talking.

That's it. No custom integration. No plugin. No new product. Just a realization about what's already true.

Dan said it on the call and it landed right: you don't need a hundred different features. Get on a Google Meet and start pairing. The complexity you're imagining is optional. The capability you need might already be there.

This is a bias we try to hold in the work we do with engineering teams. The [velocity trap](/blog/velocity-trap/) isn't just about slow processes—it's about looking for elaborate solutions to problems that have simpler ones. We've seen teams build custom tooling to solve context management problems that CLAUDE.md files handle natively. We've seen voice workflows get duct-taped together with external libraries when the spacebar integration shipped and nobody noticed. The tool ships features; the teams don't always find them.

When you're deep in optimizing a workflow, you develop blind spots. You're managing what you built, not scanning for what got easier. That's not a failure—it's just what happens when you're heads-down shipping. The value of a consistent check-in on what's new in the platform isn't staying current for its own sake. It's catching moments like this one, where the thing you wanted already exists and you just hadn't seen it yet.

## What We're Going to Do With This

We've only used this once, which means we're still figuring out when it's the right mode versus when it isn't. Some thoughts:

**Planning new features:** This is the obvious one. Before any code gets written, both of us can contribute directly to the plan inside the same session. The thing that comes out is genuinely co-produced.

**PRD iteration with product stakeholders:** Instead of reading a spec and scheduling a follow-up, open a Claude session and get on a call. Work through the questions live. Both people feeding context means the synthesis happens faster.

**Architecture discussions:** When two engineers have different mental models about how something should be built, talking through it into a shared Claude session forces the explicit articulation that reveals where the models diverge. Claude doesn't just receive the answer—it helps surface the question.

**Quick syncs that used to produce notes:** How many times has someone taken notes after a planning meeting and then distilled them into a task or a prompt for Claude? That's now a step that can disappear. The conversation is already in the session.

The place this doesn't work is anywhere that requires careful, focused solo work—actual coding, review, debugging. Voice mode and shared sessions are for the messy human stuff. Once you know what to build, the collaborative input layer steps back and the execution layer takes over.

But for the planning work—the highest-leverage, hardest-to-scale part of the whole pipeline—this is a real change. We both left that call thinking about what we'd been leaving on the table.

---

*This post is adapted from [The Velocity Lab podcast](https://podcasts.apple.com/podcast/the-velocity-lab/id1888653618), Episode 5.*
