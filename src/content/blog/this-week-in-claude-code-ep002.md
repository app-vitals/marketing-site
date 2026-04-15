---
title: "Voice, Remote Sessions, and the 1M Token Window: Claude Code's Biggest Week"
date: "2026-03-28"
author: "Dave O'Dell"
category: "Engineering Velocity"
excerpt: "Claude Code added voice input, remote session control, and a 1M token context window. Here's what actually changed our workflow—and what didn't."
readTime: "7 min read"
---

There's a specific kind of moment in technology adoption where something stops being a tool and starts being an extension of how you think. This past week, Claude Code had one of those weeks. Three significant updates shipped: native voice input in the CLI, remote session control from your phone, and a 1 million token context window. We've been using all three in real work. Here's the honest take.

## Voice in the CLI: The Feature Nobody's Talking About Enough

We've both been using voice with AI tools for a while now. Dan was on Grok voice from early on—the "talking to your phone like a crazy person while walking the dog" era of AI. The early Claude voice experience on mobile was rough. You'd finish speaking and it would just sit there waiting for you to press a button. Not useful when you're driving or your hands are occupied.

Something changed about a month ago. The voice recognition got meaningfully better at detecting natural speech endpoints. And now it's built directly into Claude Code.

The setup is dead simple. Run `claude /config` and you'll see the option to enable voice globally. Or toggle it per session with `/voice`. Once it's on, you hold the spacebar to speak. That's it.

Dave has been using this constantly—building presentations from the command line entirely through voice, walking through Trello cards on the go and ending up with pull requests. We had a client session over Zoom recently where Dave built the entire presentation by holding the spacebar and talking. Not one keystroke. The transcription handles technical terminology surprisingly well, and when it misses a word, the corrections are minor.

The bigger picture here is the integration story. Six months ago, teams were building custom voice plugins—stitching together speech detection libraries and piping them into Claude. That works, but it's setup overhead, it's another thing to maintain, and it creates a gap between "people who bothered to set this up" and "everyone else on the team." Now it ships with Claude Code. That gap disappears.

The same pattern is happening with PR review tooling. Skills and capabilities that used to require custom wiring are getting absorbed into the platform. For teams trying to [drive real adoption across an organization](/blog/enterprise-ai-adoption-mistakes/), this matters more than the feature itself—less friction between the tool existing and people actually using it.

## Remote Sessions: Your Laptop Becomes a 24/7 Coding Server

This is the one that actually changed how we work at a structural level.

Enable remote control via `claude /config` (second-to-last option, enable globally). Then add a small shell alias so every Claude session gets a named identifier—we use the repo name plus the date. The name is what lets you find and connect to the session remotely.

Once that's set up, open the Claude app on your phone, tap into Code, and you see every running session on your laptop listed by name. You can query any of them, send it tasks, watch it run.

What this means practically: Dave left his house to walk the dog with a Trello card open on his phone. He queried the running Claude Code session from his phone, talked through the requirements, and by the time he got home, there was a pull request waiting. He approved nothing on his laptop. The whole thing happened in his jacket pocket.

There's a legitimate conversation to have about approval workflows here—Dan is more cautious about running sessions that execute without human-in-the-loop confirmation at each step. That's reasonable. Dave has approvals enabled, so he's still confirming consequential actions. But the compute runs on the laptop; the interface runs wherever you are.

The deeper implication is that "the workday" as a fixed window tied to when you're at a desk becomes optional. Our own assistants—personal AI agents running on hardware at home—are already [part of how we operate around the clock](/blog/velocity-engineering/). Remote Claude Code sessions extend that same logic to the actual coding environment. Your laptop doesn't have to be where you are. It just has to be on.

For anyone on the fence: Tmux or a session manager in the background, laptop stays running, remote control enabled. That's the setup. The overhead is fifteen minutes once.

## The 1 Million Token Window: Underwhelming, and That's Fine

Honest review: neither of us has noticed it.

When the 1M window first shipped in beta, access was random—some sessions had it, some didn't. You could check with `/model` and it would tell you whether your session had the expanded context. Dave watched for it and never got the beta. Dan watched too. Neither of us got it. We were both mildly annoyed.

Now it's general availability. We both have it. And... nothing changed.

Context exhaustion still happens at roughly the same practical rate. Maybe there's a ceiling somewhere that we're not hitting anymore, but if so, it's not the ceiling we were actually bumping into.

Here's the thing about context windows that doesn't get said enough: the model still has to do something useful with everything in that window. One million tokens of context doesn't mean one million tokens of *relevant* context are being utilized effectively. Long-range retrieval in transformer architectures has well-documented degradation—the model is better at using things near the beginning and end of context than things buried in the middle. Whether a 1M window actually improves outcomes or just delays the same problem is a real question.

We wrote about [the context problem](/blog/context-problem/) in more depth elsewhere, but the short version is: bigger context windows are good, but they're not a substitute for thoughtful context management.

## What Actually Solves Context: Sub-Agents

The practical solution we've both converged on is sub-agents, not bigger windows.

The architecture is simple: keep the main agent session lean. Spawn sub-agents for anything that requires pulling in large amounts of data—research tasks, scraping repositories, analyzing documentation, anything where you want results but don't need to carry all the raw material forward.

A sub-agent that goes out, queries a bunch of sources, and comes back with a summary adds a few hundred tokens to your main context. A sub-agent that does all that work inline adds tens of thousands. At scale, across a complex session, the difference is dramatic.

Dave built Shipwright (available on the App Vitals marketplace) specifically around this principle—it uses structured sub-agent delegation so the main context stays healthy across long coding sessions. When context does run out now, it's usually in unstructured sessions where that discipline broke down, not in sessions where the sub-agent pattern is being followed.

The tradeoff with sub-agents is time and guidance. They run longer, they can go sideways if the prompt isn't tight, and you can't really watch them in real time the same way. But for async tasks—especially research—they're the right tool. Fire off a sub-agent to explore a codebase, synthesize patterns across a set of files, or survey how an industry problem is typically solved. Come back to a clean summary in your main context.

One thing we haven't fully resolved: as context windows get larger and models get better at long-range retrieval, how much of this management becomes unnecessary? Google shipped a 1M window and the response was "now we need to use Google for everything"—but you can't just swap models and expect context handling to improve automatically. Context architecture is a design choice. It's worth [thinking about it as a velocity variable](/blog/velocity-trap/), not just a technical parameter.

## The Integration Arc

Looking at these three features together, there's a clear pattern. Voice input, remote sessions, expanded context—each of these was achievable before via plugins, wrappers, and custom tooling. What changed is that the platform absorbed them.

This is how tooling maturation works. The early adopters do the custom integration work, prove it out, and eventually it gets standardized. The value shifts from "we figured this out" to "everyone has it now." For teams still in the evaluation phase—wondering whether to invest in Claude Code seriously—the platform is clearly heading toward absorbing the most common customizations. The moat for early adopters is getting shallower. The floor for everyone else is rising.

That said, there's a category of advantage that doesn't get absorbed: how you use the tool, not what the tool can do. Shipwright-style sub-agent orchestration. Tight CLAUDE.md files that carry team context across sessions. PR review workflows tuned to your actual standards. Voice habits that mean you're capturing thoughts while you're on a walk instead of losing them. None of that ships in a Claude Code release. It's learned, built, and embedded in your team's muscle memory.

The teams that will still have an edge six months from now aren't the ones with the best plugins. They're the ones that figured out how to [build genuine engineering velocity](/blog/velocity-engineering-playbook/)—the kind that compounds.

## Summary: What to Enable Today

If you're on Claude Code and haven't touched these features:

**Voice:** `claude /config`, enable globally. Hold spacebar. Use it for the messy thinking work—talking through requirements, doing code review commentary, anything where typing feels like friction.

**Remote sessions:** `claude /config`, enable remote control. Add a naming alias to your shell config. Open the phone app. The setup cost is small; the upside is an always-available coding environment wherever you are.

**1M context:** It's just there now. Don't do anything. Notice whether your experience actually improves—we'd be curious if yours does, because ours hasn't.

---

*This post is adapted from [The Velocity Lab podcast](https://podcasts.apple.com/podcast/the-velocity-lab/id1888653618), Episode 2.*
