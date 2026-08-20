---
title: "The On-Ramp to Autonomous Coding"
date: "2026-08-20"
author: "Dave O'Dell"
category: "AI Adoption"
excerpt: "I was dead set against building a human-in-the-loop mode for Shipwright. It felt like a step backward. Then Dan shipped it overnight — using the very agents I was arguing with — and I changed my mind completely. Here's why the slow lane turned out to be the fast one."
readTime: "8 min read"
---

I was dead set against this feature. I said so, more than once, loudly. And then Dan built it while I was on vacation — using one of *my* agents to write the code, no less — and by the time I got back it was just there. Running. Working. Annoyingly good.

The feature is Shipwright Human-in-the-Loop, and the reason I hated the idea is the same reason it turned out to matter: it puts a human back in the middle of a process we've spent a year trying to get humans out of.

Let me explain why that's not the contradiction it sounds like.

## The Client Who Wasn't Ready

Here's the situation that forced the feature. We had a client who was, to put it gently, tepid on autonomous coding. Not hostile — tepid. They liked the idea in the abstract. They just weren't ready to let an agent run loose in their infrastructure overnight and wake up to a stack of merged pull requests.

And their hesitation was reasonable. It wasn't fear of the technology being bad. It was fear of the technology being *unsupervised* — of an agent escaping its sandbox, touching something it shouldn't, leaking a secret. They wanted to stay in the terminal. They wanted to watch.

Our whole pitch is the opposite of that. Dan and I barely touch a terminal anymore. We plan in Slack, an agent picks up the work, and code shows up as reviewed pull requests. That's the destination. But you can't drop a team that's nervous about AI straight into "turn your phone off and go boating, it'll be done tomorrow." That's a quantum leap, and quantum leaps are exactly what makes people freeze.

So the question wasn't "how do we convince them autonomous coding is safe." It was "how do we let them *feel* it — at their own pace, with their hand on the wheel."

## What Human-in-the-Loop Actually Is

Shipwright, in its full form, is an autonomous agent that runs in your cloud 24/7. Every developer gets their own. You talk to it through Slack, plan with it, and it builds a task list — think a Jira epic — and then just starts working through it. Writes the code, opens the PR, writes the tests, checks CI, reviews its own work, patches what it finds. Behind the scenes, no one watching.

Human-in-the-Loop is that exact same loop, with one change: instead of running autonomously in the cloud, it runs locally, on your laptop, and it pauses to let you watch. It pulls the oldest task off the queue — a dev task, a review, a patch — spins up Claude Code with the right prompt, and starts executing in front of you. You see what it's doing. When it wants a permission — fetch this URL, run this command — it asks. You approve. When it finishes one thing, you escape out, and the loop quietly picks up the next.

That's it. Same engine, same decisions, same pipeline. The only difference is the pane of glass you get to look through while it runs.

The funny part: building this was the first time *I* actually watched some of it work. We'd shipped Patch — the part of the harness that fixes up a PR when CI fails or review leaves comments — months ago and deployed it straight to the cloud. I knew what it did. I'd never once seen it do it. Watching Human-in-the-Loop run, I saw Patch reason through its checklist in real time: Did we get review comments? Is the build passing? Is the branch clean, or does it need a rebase? Three checks, worked one at a time. I ended up ripping five things out of our review pipeline that week, because watching it made obvious what should've been plain code instead of an agent decision.

If it taught *me* something, and I built the thing, imagine what it does for a team seeing autonomous coding for the first time.

## The Ladder, Not the Leap

What clicked for me is that we'd accidentally built a ladder. Three rungs, each one a little more hands-off than the last:

**Rung one: run the pieces individually.** Every discrete thing Shipwright does — planning, patching, reviewing, dev tasks — is available as a Claude Code plugin you run one at a time. You decide what's next in your queue, you run it, it does that one thing and stops. Nothing happens unless you tell it to. This is autonomous coding with training wheels bolted on and both feet on the ground.

**Rung two: local Human-in-the-Loop.** Now the loop runs itself — dev task, review, patch, next — but locally, in front of you, asking permission as it goes. You get to experience exactly what full autonomy would do, except you approve each step. You're watching the movie of your own cloud agent before you ever deploy it. This is where trust gets built.

**Rung three: deploy to your cloud and let it run.** Autonomous. In your infrastructure, which means you control precisely what it can touch. This is the destination — the phone-off, gone-boating version.

The thing I'd missed, arguing against Human-in-the-Loop, is that rung two isn't a detour off the path to rung three. It's the part of the path where people decide to keep climbing. You don't build trust in a system you've never seen operate. You build it by watching the system do the right thing, over and over, until watching starts to feel like a waste of your time — and *that's* the moment someone asks to move it to the cloud.

Nobody talks themselves into full autonomy. They watch their way into it.

## Why Local Is the Careful Choice, Not the Reckless One

There's a counterintuitive wrinkle here worth sitting with, because it's the opposite of what most people assume.

You would think running an agent on your own laptop is the *safe*, contained option and deploying it to the cloud is the scary one. It's backwards. My laptop is the most dangerous place I could possibly run an autonomous agent. It's got my GitHub token with access to everything. My Jira token. My Sentry token. An authenticated AWS CLI, if I'm not careful. Who knows what else — I've accumulated years of credentials on this machine. If I let a fully autonomous agent loose locally, it inherits *all* of it.

A managed agent in your cloud is the opposite. It has exactly the access you grant it and nothing more. Its GitHub token can reach three repos. It can't see prod data. It can't talk to your Kubernetes cluster unless you explicitly say so. If you don't give it GitHub access, it literally cannot do anything. That's not a limitation — that's the entire security model, and it's *stronger* than the laptop it came from.

So the guidance is: use Human-in-the-Loop locally, where you're watching and approving every step, precisely *because* your laptop has too much power to ever run unsupervised. And when you're ready to take your hands off, that's exactly when you move it to the cloud — where the blast radius is something you define, not something you inherit. I'll log out of my AWS CLI before I ever put an agent into auto mode locally. In the cloud, I don't have to think about it, because I already decided what it can reach.

The nervous instinct — "keep it on my machine where I can see it" — is right for the watching phase and wrong for the running phase. Human-in-the-Loop matches the tool to the instinct.

## The Medium Was the Message

I keep coming back to how this feature got built, because it's the whole thesis in miniature.

Dan didn't write Human-in-the-Loop. He had a planning session in Slack, described what he wanted, and a bunch of agents wrote it overnight. I came back from vacation to a working feature I had argued against, produced by the exact process it was designed to introduce people to. That's the real experience of this stuff now. You don't write the code. You decide what should exist, and the system brings it into being while you're not looking.

That's a hard thing to sell to someone still gripping the terminal. You can't argue somebody into it. But you *can* hand them a version that runs on their laptop, asks before it acts, and lets them watch it work — and let the watching do the arguing for you.

I was against this feature because it looked like a step backward from autonomy. I was wrong. It's the on-ramp. It's how you get a careful team from "we'd like to, someday" to "why were we ever doing it the old way" — one approved step at a time.

If your team is stuck at the bottom of that ladder, this is the rung to reach for. And if you're already convinced but your org isn't, [the case for moving now](/blog/adopt-autonomous-coding-now/) hasn't gotten any weaker.

Shipwright is open source. If you want to climb, we're the ones who'll help you do it.

---

*This post is adapted from [The Velocity Lab podcast](https://podcasts.apple.com/podcast/the-velocity-lab/id1888653618), Episode 32: I Was Dead Set Against This Feature (Then I Shipped It).*
