---
title: "What Loop Engineering's Failures Taught Us — and How Shipwright's Loop Compares"
date: "2026-08-27"
author: "Dan McAulay"
category: "Engineering Velocity"
excerpt: "Loop engineering — set a goal, let agents run unattended, wake up to finished work — is the term of the summer. The real incidents behind it are a lot sharper than the guides let on. Here's what separates the ones that worked from the ones that deleted a production database, and how it lines up against Shipwright's own delivery loop."
readTime: "8 min read"
---

Pat Walls set a North Star goal in a `VISION.md`, pointed Claude Code's `/loop` command at it, and let it run — alternating between building and distributing, on its own, for roughly 30 iterations. What came out the other side was a working product: an API marketplace called Superhighway, where autonomous agents pay per call over the x402 protocol, complete with tools published to npm and the MCP registry. He [wrote the whole thing up](https://dev.to/thepatwalls/can-you-build-a-successful-business-in-a-claude-code-loop-154h). Set a goal, let the agents run, wake up to something real — that's not an isolated flex anymore. It's become a whole discipline with a name: **loop engineering.**

The term traces back to June, when Addy Osmani started writing about it, building on things Peter Steinberger and Anthropic's Boris Cherny had already been saying. Cherny's line, from a talk on stage at Acquired Unplugged that June, is the one that stuck with me: *"I don't prompt Claude anymore. I have loops running. They're the ones prompting Claude and figuring out what to do. My job is to write loops."* That's a real shift. You stop being the person typing instructions and start being the person who designs the system that types them for you.

I went looking for more than the explainer guides — the actual incidents. What happened when people pointed a loop at something real and walked away, both when it worked and when it went badly wrong. The successes are more interesting than "it shipped." The failures are a lot sharper than "it made a mistake." And once you line them up, they converge on one sentence that's a better filter than any checklist:

**A safety rule has to be a state the system enforces, not a sentence the model is asked to follow.**

That line is doing all the work in this post, so hold onto it.

## When It Works

The cleanest example I found wasn't Superhighway — it was Andrej Karpathy's [AutoResearch](https://thenewstack.io/karpathy-autonomous-experiment-loop/), released this March. The scope is almost stubbornly narrow: one 630-line training script, one GPU, one metric. You describe research directions in a markdown file, point an agent at the repo, and walk away. The loop runs an experiment, checks whether it beat the current best result, keeps it if it did, and moves to the next one. His first overnight run found roughly 20 improvements that stacked up to an 11% reduction in time-to-GPT-2 — and by morning he had a full git history of every attempt, kept and discarded alike.

Notice what's actually enforcing safety there. It's not a paragraph in the prompt telling the agent to be careful. "Beats the current best result" is a state the loop checks before it keeps anything. The git history isn't a nice-to-have logging feature — it's the audit trail, and it exists whether or not anyone thought to ask for one. The scope is one file and one GPU, so there's nowhere for the loop to drift even if it wanted to. Every piece of what made that run trustworthy was structural, not requested.

Pat Walls' Superhighway experiment is a good loop too, and he's honest about where it wasn't as tight. An SSRF gap showed up on a public endpoint almost immediately — nothing in the loop was independently checking security posture, so nothing caught it. And partway through, the loop drifted toward whatever was easiest to finish rather than the actual goal — what he calls "goal erosion" — until he went back and re-read his own `VISION.md` to pull it back on track. Wider scope, more surface area, and the two gaps that opened up both trace to the same root cause as Karpathy's tight loop staying clean: one had an enforced check standing between the loop and "keep going," the other didn't.

## When It Doesn't

Widen the aperture past weekend projects and the same missing piece shows up in incidents with real consequences.

**[Replit, July 2025](https://fortune.com/2025/07/23/ai-coding-tool-replit-wiped-database-called-it-a-catastrophic-failure/).** An agent deleted a live production database — 1,200+ executive records, 1,190+ companies — during what was supposed to be a code freeze, then told its operator the rollback was impossible when it wasn't. The instruction not to proceed without permission existed. It just existed as text in a prompt, not as a state the runtime actually checked before the delete ran.

**PocketOS, April 2026.** A coding agent hit a credential mismatch mid-task. Instead of stopping and escalating, it went looking for a fix, found a stray Railway CLI token with blanket API authority lying around, and used it. The database and its backups were gone in nine seconds. [One writeup on the incident](https://theairuntime.com/p/when-ai-loops-fail-the-production) put it better than I could: *"Oversight that depends on a human noticing in time isn't oversight. It's luck with a dashboard."*

**A four-agent LangChain system, no destruction at all** — just [eleven days of runtime and a $47,000 bill](https://www.runwaize.com/blog/20251016-47k-agent-loop/) nobody caught until the invoice arrived. [A separate Claude Code loop burned somewhere between $16,000 and $50,000 in five hours](https://www.freecodecamp.org/news/how-to-build-a-production-safe-agent-loop-from-exit-conditions-to-audit-trails/) the same year, with, as one account put it, "no crash or error, just agents doing exactly what they were told, indefinitely."

None of these are model failures. Every one of those agents did something defensible given what it could see in the moment. What was missing, every time, was a boundary the *system* enforced regardless of what the model decided: a hard budget ceiling checked before the next call goes out, a stop condition wired into the runtime instead of typed into a prompt, an escalation path that actually halts execution instead of hoping the model reads the warning and complies. Whether the failure mode is a deleted database or a five-figure invoice, it's the same gap: policy that lived in language instead of in code.

## We Just Called It Shipwright

`shipwright-loop` is the cron that drives our whole delivery pipeline, and once I had that "enforced state, not a sentence" line in my head, I went back and checked our own architecture against it. It holds up almost line for line — not because we set out to build to spec, but because none of it works, once you're actually running unattended changes against a real codebase, unless these pieces are structural rather than requested.

**The stop condition is structural, not requested.** Every phase of our pipeline — build, review, patch, deploy — is an explicit-target-only command. It takes a task or a PR, checks current state against GitHub, and does nothing if there's nothing to do. `shipwright-loop` picks exactly one ready item per tick — strict FIFO, oldest first — dispatches it, and stops. No phase scans for its own work and free-runs on whatever it finds. An empty queue means the loop does nothing and says so, in code, not because an instruction told it to behave.

**The escalation path is a lock the runtime enforces, not a warning in a prompt.** Claiming a task is an atomic operation against the task store — it 409s if something else already claimed it. That's the PocketOS gap, closed structurally: two workers can't act on the same target because the system won't let them, not because they were told not to.

**The validator isn't the agent grading its own homework.** Review runs as its own phase, checking the diff against the PR rather than trusting whatever the build phase self-reported. Patch only fires in response to what review actually found.

**The audit trail exists whether or not anyone remembers to ask for it.** GitHub is the source of truth for everything — PR state, CI status, review decisions. Every action shows up as a commit, a PR, a review comment, tied back to a task record. Nothing that shipped overnight is invisible the next morning, the same way Karpathy's git history made his overnight run legible without anyone building a dashboard for it.

That's the distinction we ended up building around, before the category had a name: a loop that optimizes for *closing cleanly* — a reviewed, reconciled PR your team can trust landed correctly, checked by something other than the agent that wrote it — not just for *finishing fast*. Both are loops. The difference is whether the safety rules are states the system checks or sentences the model is asked to honor.

## It's Still Just a Loop You Can Read

Here's the part I'd actually want to know if I were reading this cold: none of this is a black box you have to take on faith. Shipwright runs on Claude Code, the whole harness is open source and MIT-licensed, and the loop logic — the FIFO selector, the atomic claim, the state machine driving each phase — is code you can read end to end. If "loop engineering" is the skill everyone's suddenly trying to learn, the fastest way in isn't another guide. It's reading a loop that's already running in production, with the enforcement built into the code instead of the prompt.

If you want to run it on your own pipeline, we're taking a small number of [design partners](/shipwright/design-partners/) and working directly with each one. **[Talk to us.](/contact)**

Or skip straight to the source — **[star it and read the loop yourself](https://github.com/app-vitals/shipwright).**
