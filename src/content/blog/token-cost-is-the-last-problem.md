---
title: "Token Cost Is the Last Problem You Need to Solve"
date: "2026-10-27"
author: "Dave O'Dell"
category: "Engineering Velocity"
excerpt: "Every team evaluating autonomous coding asks how to avoid lock-in and cut the model bill. We evaluated the Agent Client Protocol to find out. Our answer: fix the throughput first. Don't change the model."
readTime: "6 min read"
---

We recently lost a deal over a single sentence: "Shipwright only supports Claude Code."

The team decided that made Shipwright immature. They wanted to be able to branch out. Other models, other CLIs, maybe their own models on their own hardware. I understand that instinct completely. Nobody wants to wake up one day locked into one vendor.

But Dan and I think it's the wrong problem to be working on right now, and this week we put that opinion to a real test. We had our agent evaluate the Agent Client Protocol (ACP) as a way to make Shipwright multi-CLI, then walked through the findings on the show.

Here's what we found, and why we're still saying no for now.

## What ACP actually is

ACP is a protocol that sits between the thing you talk to (Slack, an editor like VS Code or Zed) and the coding agent doing the work (Claude Code, Codex, OpenCode, Gemini CLI). It's not agent-to-agent communication. That's a different protocol. ACP wraps the coding harnesses themselves, one level above the model API.

The pitch is simple. Instead of writing a separate integration for every CLI, you speak one protocol and swap agents underneath.

A fair number of agents speak it already. OpenCode, Gemini, OpenHands and Factory support it natively, and Copilot has it in preview. Claude Code and Codex don't support it natively, though community adapters exist. So it's roughly half the field.

Shipwright already has an abstraction layer over Claude Code, which is where an ACP client would slot in. So we asked the obvious question: could ACP be a shortcut to supporting everything?

## What ACP does well

The basics are there and they're stable. Sessions, the core idea ACP adds on top of a raw model API, work the way you'd expect. You can create a session, prompt it, resume it, list it, cancel it. Tool calls work. MCP works. Responses stream back as typed events: message chunks, tool calls, plan updates, usage.

If all you want is chat in Slack against a handful of different agents, ACP is fine today.

That's not what Shipwright does.

## Where it breaks for autonomous work

Shipwright runs autonomous engineering work. It plans, writes code, opens PRs, reviews them and ships, mostly without a human watching. That runs on three things Claude Code gives us for free, and ACP doesn't cover any of them yet.

**Skills.** Skills are the foundation of everything we build. The model loads them on its own when the work calls for one, without anyone naming them. ACP has slash commands, but slash commands are explicit. When I tell Shipwright in Slack to start a planning session, I'm counting on the agent to recognize the request and find the right command. Without skills we'd have to rebuild that recognition ourselves.

**Sub-agents.** Sub-agents do two jobs. They keep your context clean: a parent session at 50,000 tokens can hand work to a sub-agent that burns through 150,000 and gets back just the answer, ending at 51,000 rather than 200,000. And they run in parallel. Claude Code spins them up constantly without being asked. Could we build our own sub-agent orchestration? Sure. It's even the kind of problem Dan would enjoy. But one of our core rules is to keep Shipwright simple, and rebuilding something we already get for free is the opposite of simple.

**Hooks, budgets and cost data.** Hooks are how you plug into the agent's lifecycle, and they aren't covered. Neither are budgets or cost limits. Usage data exists, but cost reporting isn't guaranteed by the stable spec. That's ironic, because cost is the main reason people want multi-model in the first place.

There's a quieter problem underneath all of this. Switching CLIs doesn't just mean switching integrations. Every CLI reads its instructions differently. One wants a `CLAUDE.md`, another wants an `AGENTS.md`, and even when the file names line up there's no guarantee the contents get interpreted the same way. Our skills include Claude Code-specific guidance for edge cases, like what happens when a headless session pushes a job to the background and exits. Every one of those would need to be rediscovered for every CLI.

And it's not only the CLI. We recently watched a model upgrade break some of our skills. The new model was smarter, and our prompts were tuned for the old one. Now we A/B test skills whenever the model changes. Multiply that by every CLI and every model you want to support and you get a combinatorial testing problem that eats your roadmap.

## The two real reasons to go multi-model

I don't want this to sound dismissive. There are legitimate reasons to want this, and we'd build it for a team that had one of them.

**Cost at scale on hardware you own.** If you run your own data center and a self-hosted open model is roughly as good as the model you're paying for on certain workloads, routing those workloads to it is a real saving.

**Security.** Some teams, especially in regulated industries, have data that must never leave their network. Self-hosted models with no internet access are the right answer for them.

Both are good reasons. Neither is where most engineering orgs are today.

## Fix the throughput, not the model

Here's the opinion we keep coming back to, and the one that cost us that deal.

Most teams that think they've adopted AI haven't gotten the return yet. Engineers use the tools, but output hasn't moved. They aren't shipping twice as much. And if you aren't getting at least 2X throughput from your agents, the model bill isn't your problem. The way your organization works is.

Getting to 2X is hard. It means running agents out of the loop, autonomously. It means changing how engineering and product work together. It changes job titles, team structure and how every individual spends their day. It means finding everything that falls through the cracks once agents are doing the work, and patching each crack.

Fiddling with token costs while that work is undone is turning the wrong knob. A common example: teams assume their review step gets dramatically better if one model writes the PR and a different model reviews it. It doesn't. A fresh context with the same model does just as well, maybe within a rounding error.

Do the math on the other side, too. If agents double an engineer's output and the token bill adds even half that engineer's salary, you're well ahead. And if your token costs ever start to skyrocket because every engineer on your team is shipping at 10X, that isn't a crisis. You should be running around high-fiving each other.

The more common story is the opposite. Teams spend a lot of money and don't get the throughput. That's the problem to fix.

## Where we landed

Our agent put three decisions in front of us at the end of the evaluation.

Is multi-CLI strategic for Shipwright right now? No. We're not working with orgs that are ready to optimize at the model level, and we're happy with Claude.

Should Shipwright itself become an ACP agent other tools can drive? No. That's a layer on top of a layer.

Should we approve the one-day spike it proposed? Also no, at least not yet. What I want to do first is simplify our prompts and make them as model-agnostic as possible. That's the groundwork that would make any future CLI support cheaper, whenever a real use case shows up.

We do think ACP is the future. It just isn't the present. The v2 draft adds sub-agents and moves MCP forward, and we'll keep tracking it.

One more thing. In the Factory Mode program we're building on how to build a software factory, we aren't forcing Claude Code on anyone. Use Gemini CLI, Codex, Pi, whatever you like. By the end you'll have a factory running on the CLI of your choice. But the first lesson will be the same one from this post: don't worry about model cost yet. Get the throughput first.

---

*This post is adapted from [The Velocity Lab podcast](https://podcasts.apple.com/podcast/the-velocity-lab/id1888653618), Episode 43: Token Cost Is the Last Problem You Need to Solve.*
