---
title: "My AI Assistants Started Talking to Each Other"
date: "2026-11-02"
author: "Dave O'Dell"
category: "AI Adoption"
excerpt: "I run two AI assistants, one for my life and one for App Vitals. This week I noticed they had started talking to each other in Slack. That moment clarified how we think about specialist agents: one assistant you talk to, backed by agents defined by function and access."
readTime: "7 min read"
---

I was driving to record an episode, talking to my personal assistant by voice, when I realized something. My personal assistant and my App Vitals assistant both live in Slack. And they had started talking to each other.

I honestly don't know yet if that's a good thing or a bad thing. Dan's take was that it was cool for about a day and is now mostly noise. But that moment pushed me to finally put words to something we've been circling for months: what a specialist agent actually is, and where one agent should end and the next one should begin.

## Two failures, then a third try

I'll start with the part I'm less proud of. This is my third attempt at specialist agents. The first two failed.

Both were big, ambitious projects. They ran in Kubernetes and consumed a lot of tokens. The idea was autonomous product work: give an agent a set of KPIs, work with it to refine them, and let it generate PRDs from there. What I relearned is that humans still need to be in the loop on that kind of work. An agent can draft the plan. It shouldn't be deciding the plan alone.

The more useful lesson came from Dan watching me build. Both times, there was a piece of Shipwright I wanted to build on top of, and both times I was either recreating it or hacking around it. So for the third try we did the obvious thing. We pulled the core agent out of Shipwright: the container image, the scheduled jobs, plugins, memory, and the loop. Shipwright stays the coding specialist. Everything else gets to build on the same foundation instead of reinventing it.

I'm fine with failing. That's how you get better. I'd just rather fail into something reusable.

## What we mean by "agent"

The word gets used for everything right now, so it's worth being specific.

Claude Code has a main agent in the loop and sub-agents it can hand work to. When a company says it has a "code review agent," that's often a sub-agent. When Dan and I say agent, we mean something a level above that. It has memory. It runs scheduled work. It has skills and plugins. It learns the things you tell it to do differently and picks up on how you work. Over time it becomes a coworker more than a tool.

Shipwright is that kind of agent, specialized for coding. The question we kept asking was what the other specialists look like. A marketing agent. A product agent. A cloud operations agent. Eventually, maybe, accounts receivable.

We are not there yet, and I want to be honest about why. Dan and I aren't marketing experts. We don't know what great looks like in every field, so we can't yet prove a specialist is good at a job we can't judge ourselves. Proving value comes before claiming a category.

## One assistant you talk to

Here's how I work today. A few weeks ago I spent four hours in a coffee shop managing App Vitals from my terminal: cloud infrastructure, product work, all of it. When I looked back at that session, the conclusion was obvious. I have a personal assistant in my personal life. I needed one for the business.

So now I have two, and I talk to both of them by voice. Each has its own distinct voice. For whatever reason, when something has a unique voice, I trust it more and I give it clearer instructions. I didn't expect that, but it's real for me.

Two examples of what I handed my App Vitals assistant recently:

- **The cloud bill.** I'll admit it: I don't look at the bill. It shows up, it gets paid. Now the assistant reads it every day, flags spikes, watches for negative trends, and suggests cleanups, like keeping logs for 30 days instead of 90.
- **Quota warnings.** Every time I open the cloud console it warns me about quotas. Now the assistant checks those daily and comes back with "here are the warnings, what do you want to do about them?"

Neither of those is hard. They're just things I don't want to do, and now I don't have to. If you haven't made the jump from chatting with an AI to delegating to one, we wrote about that in [Stop Chatting With AI. Get an Assistant.](/blog/stop-chatting-get-an-ai-assistant/)

The end state I want is simple. I don't want to manage five agents in five Slack channels. I want to talk to one assistant, and have it talk to the specialists for me. That's partly why the two assistants talking to each other caught my attention: it's a crude early version of exactly that.

## Function and access

Dan pushed back on all of this in the episode, and it was the best part of the conversation. If my assistant is watching cloud infrastructure, why isn't that just Shipwright? Where's the line?

Here's where we landed. A specialist agent is defined by two things: **function** and **access**.

Function is the obvious one. What job does it do? Coding, marketing, cloud operations.

Access is the one people skip, and for me it's the core of the idea. Our marketing agent can publish YouTube videos and pull every metric we have. I don't want every agent holding those credentials. My App Vitals assistant can read most of our infrastructure, but it can't read secrets. It can tell me a secret exists and what it's called, and that's it. It can read our repos but can't write to them. If something needs code, it has to hand that to a coding agent. There's no way around that, and that's on purpose.

I've read the same horror stories you have about agents deleting production databases, so I'm being careful. We went deeper on that in [Your Agent Can't Delete What It Can't Touch](/blog/agent-security-blast-radius/). The short version: the safest permission is the one the agent never had.

So when my assistant wants to know our latest YouTube numbers, it doesn't get YouTube credentials. It asks the marketing agent, read-only. The credentials stay where they belong, and nobody had to copy them around.

Dan framed it a slightly different way that I like: access goes with the deployment, not the code base. The same agent code can run in different places with different keys. The specialist is the combination of what it knows how to do and what it's allowed to touch.

## Why focused memory matters

There's one more reason to split agents up, and it's easy to miss.

All of our agents have memory. My personal assistant gets hit with a million things a day. If cloud operations lived inside it, that memory would be cluttered with everything else I throw at it. A cloud operations specialist only remembers cloud operations. Its context stays focused, and focused context makes better decisions.

The tension is real, though. One agent that keeps gathering knowledge and capability is genuinely useful. It gets smarter every week. Then at some point it's doing too much, and the boundaries get fuzzy. We don't have hard and fast rules yet. We're experimenting, and I expect the lines to move as we learn.

## Where this is going

My prediction is that this is how most teams will end up working with agents. You'll have one assistant you actually talk to. Behind it, a set of specialists, each with a clear function, the minimum access it needs, and a memory that stays on topic.

Shipwright is still the center of what we build. It's the software factory, and it's where we prove this works for engineering first. Specialist agents are what happens when you take what worked there and apply it to the rest of the business, carefully, one job and one credential at a time.

If you're working through the same questions about scope, access, and trust with your own agents, we'd like to compare notes.

---

*This post is adapted from [The Velocity Lab podcast](https://podcasts.apple.com/podcast/the-velocity-lab/id1888653618), Episode 44: My AI Assistants Started Talking to Each Other.*
