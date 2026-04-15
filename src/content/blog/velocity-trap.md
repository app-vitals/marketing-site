---
title: "The Velocity Trap: Why Giving Every Engineer an AI Tool Doesn't Work"
date: "2026-03-28"
author: "Dave O'Dell"
category: "Engineering Velocity"
excerpt: "Giving every engineer access to every AI tool is a waste of money. Here's the scattershot mistake killing adoption—and what actually works."
readTime: "7 min read"
---

Here's what we keep seeing: an engineering leader decides it's time to get serious about AI. So they buy licenses. Copilot for the people who asked. Cursor for the ones who pushed back. ChatGPT for the managers who read about it. Maybe Codex. Maybe Claude Code too. Problem solved, right? Everyone has a tool. Adoption will sort itself out.

It won't. We've watched this play out across enough organizations to say it clearly: the scattershot approach doesn't work. It wastes money, creates confusion, and produces a fraction of the productivity gains you're chasing.

This is the velocity trap.

## The Scattershot Approach Always Fails

We're hands-on consultants. We sit with developers, we write code alongside them, we help them deploy agents and automate real workflows. Not PDFs. Not slide decks. Actual systems, inside actual teams.

And in every organization that went the "everyone picks their own tool" route, we see the same thing: developers gravitate toward one tool on their own anyway, half the licenses go unused, and the organization has paid for four tools while getting value from one.

The last time one of us had a traditional salary job, there were three active licenses sitting in the account — Copilot, Cursor, and Claude Code. All authorized, all paid for. One got used. The others kept renewing.

The problem isn't that the other tools are bad. The problem is that **it's not the tool that wins. It's the system you build around the tool.** And you cannot build a coherent system on top of four different CLIs that each have different plugin formats, different skill conventions, different directory structures, different ecosystem tooling.

Think about Kubernetes. There were fifty orchestrators competing for mindshare. Kubernetes won — not because the orchestrator itself was better than everything else, but because of the ecosystem that grew around it. The plugins, the tooling, the community knowledge, the shared patterns. Kubernetes the thing is actually pretty boring. Kubernetes the ecosystem is enormously powerful.

The same logic applies here. Pick one AI coding tool. Build your ecosystem around it. That's how you win.

## Why We Chose Claude Code

We're not going to pretend there's no opinion here. We live in Claude Code. We chose it, and we recommend it to the organizations we work with.

Part of that is the tooling. Claude Code has a marketplace model — think of it as an open-source project within your company. Plugins, subagents, skills, hooks. You can build a custom distribution of capabilities that every engineer on your team gets automatically. Your organization's knowledge base, your preferred workflows, your custom agents — all of it ships as a coherent package.

The hooks system alone is something we lean on heavily. We have a "damage control" plugin specifically designed to keep agents from doing destructive things — deleting databases, clobbering uncommitted work, nuking infrastructure. When you're running agentic coding at scale, that kind of guardrail matters.

But the deeper reason is consistency. When everyone on your team is in the same tool, you can share context, skills, and workflows. When Dan builds something useful, I can use it tomorrow. When we develop a PR review agent for a client, it runs in the same environment their developers work in every day. That compounding effect is where the real productivity gains live.

Other CLIs will catch up. The ecosystem is moving fast, and there will probably be some kind of standardization eventually. But right now, the abstraction layer you're trying to build on is the CLI itself — and that's different enough across tools that trying to span all of them is actively counterproductive. You're spending energy on portability instead of capability.

## The Real Ceiling on Your Productivity Gains

Here's a number that stopped us cold in one of our engagements. We were working with an engineering team, embedded with them, when they shared a data point about how their developers were actually spending their time: **10% on coding. The other 90% on everything else** in the software development lifecycle.

Stop and sit with that for a second.

If you take an AI tool that genuinely makes developers 40% more productive at writing code — a real, proven number — and you apply it to a workflow where coding is 10% of the total time, you've made the team 4% more efficient overall. Four percent. That's the return on your AI investment if you only optimize the coding step.

This is the core of what we call the velocity trap. Organizations focus on the tool because the tool is visible and easy to measure. Licenses purchased. Developers onboarded. Lines of code generated per hour. But those metrics don't capture where work actually waits, and work doesn't wait at the keyboard.

Work waits in code review. It waits in the CI queue. It waits on flaky tests that have to be re-run. It waits on Dependabot PRs that nobody has the context to merge confidently. It waits on a build process that takes two hours because it's running the same compilation four times in sequence. It waits on deploy approvals and staging environments and post-merge verification.

[Accelerating your entire SDLC](/blog/velocity-engineering/) is the only path to real velocity gains. Coding is one step. You need every step.

## The Bottleneck That Moves

There's a pattern we see play out almost every time an organization starts using AI coding tools seriously. They're excited because PRs are shipping faster. Developers are producing more code, building features in hours instead of days.

And then things start to back up.

The first bottleneck is code review. More code, written faster, arriving in bigger batches. Reviewers are overwhelmed. PRs sit for days waiting for feedback that used to come in hours. The throughput gain at the keyboard evaporates in the review queue.

So the organization adds PR review tooling — often one of the off-the-shelf integrations that drops automated comments into pull requests. This helps, but we've found those generic tools to be low value on their own. They say too much. A reviewer doesn't drop twenty half-paragraph comments on a PR. They identify the two or three things that actually matter and make sure those get addressed. That prioritization is something you have to build for your organization specifically.

After review, the next bottleneck surfaces. End-to-end tests. Integration tests. These were already flaky before AI tools showed up; now they're getting hit with higher volume and failing more often. Engineers are spending meaningful time babysitting tests that were never that reliable to begin with.

Then the build pipeline. We've worked with teams whose builds take two hours because of redundant compilation steps that nobody has ever had the time to clean up. That was tolerable when PRs merged twice a day. It's a crisis when your new AI-accelerated team is merging ten.

And then — because you're shipping more, faster, with the same test coverage you had before — production incidents start to tick up. [AWS reportedly had an outage caused by an agent](/blog/context-problem/) a few months ago. The models themselves have their own reliability issues. Moving fast without the right infrastructure in place means breaking things.

The lesson is not to slow down. The lesson is to build infrastructure that matches your new output rate.

## What Fixing This Actually Looks Like

We don't just identify problems. We build agents to fix them.

The model we use with clients is to automate each stage of the SDLC with agents that don't just flag issues but resolve them. One agent ships the PR. Another reviews it — not with generic comments but with organization-specific criteria — and if it finds issues, it patches them, commits, and pushes. A third monitors integration test results and starts building context on failures, eventually proposing fixes or updating the PR that caused the problem.

There's an interesting cultural shift that happens here. Engineers used to have strong feelings about other people touching their PRs. That was their work; modifying it felt presumptuous. What we're seeing now is that when the thing touching your PR is an agent rather than a person, that friction disappears. Nobody's ego is tied to what the agent contributes. The PR becomes collaborative in a way human review never quite was.

This approach applies across the whole lifecycle. [Flaky tests become targets for automation rather than permanent annoyances](/blog/ci-pipeline-bottleneck/). Dependabot PRs get an agent that builds context and helps you merge with confidence instead of anxiety. Build pipelines get analyzed and restructured. [The entire review-to-deploy cycle gets accelerated in ways that the raw velocity of AI code generation can't achieve on its own](/blog/measure-ai-adoption-roi/).

The organizations seeing real results here — not theoretical results, real ones — have understood this. They're not just giving engineers faster keyboards. They're rebuilding their software development lifecycle around AI agents at every stage.

## What Decision-Makers Should Actually Do

If you're a CTO, VP of Engineering, or anyone responsible for how your organization adopts AI, here's the concrete advice:

**Pick one tool and make everyone use it.** We know developers are opinionated about their environments. You don't tell them which editor to use or which terminal to prefer. But the AI coding tool isn't just a personal productivity tool anymore — it's the foundation for shared infrastructure. That requires standardization. Claude Code is our recommendation, but the specific choice matters less than the commitment to one thing.

**Think system, not tool.** The tool gives you a foundation. What you build on top — plugins, skills, custom agents, shared context — is where the leverage comes from. You cannot build that system if your engineers are spread across four different CLIs with incompatible extension formats.

**Audit the entire lifecycle.** Before you optimize anything, find out where your engineers actually spend their time. You might find, as we have, that coding is a small fraction of the total. The bottlenecks are usually in review, testing, and deployment — not at the keyboard. [Understanding what's actually slowing your team down](/blog/ai-champion-playbook/) is the prerequisite for fixing it.

**Build for your organization.** The generic AI tools that plug into GitHub and drop automated PR comments are a starting point, not a destination. Your team has specific patterns, specific pain points, specific conventions. The agents you build should reflect that. Custom beats generic every time.

The 30% productivity improvements we see at the best organizations aren't coming from faster code generation alone. They're coming from teams that have thought carefully about every stage of how software gets built and shipped — and have applied AI to all of it, not just the part where your fingers touch the keyboard.

That's how you escape the velocity trap.

---

*This post is adapted from [The Velocity Lab podcast](https://podcasts.apple.com/podcast/the-velocity-lab/id1888653618), Episode 1.*
