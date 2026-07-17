---
title: "We Accidentally Built an Open-Source Alternative to Devin. Here's How They Compare."
date: "2026-07-16"
author: "Dave O'Dell"
category: "Engineering Velocity"
excerpt: "Devin has a $26B valuation and a billion dollars in funding. We built something that does most of the same things for free. Here's an honest comparison."
readTime: "8 min read"
---

Devin has a $26 billion valuation. They're raising a billion dollars. They're doing autonomous coding, and Dan and I — through luck or bad luck — built an open-source alternative.

We didn't set out to compete with anyone. We built Shipwright in November because we needed it for ourselves and our clients. We believed you could do autonomous coding on Claude Code, so we built the harness to make it work. Now we're running 100 pull requests a week and we have clients doing the same.

It turns out what we built competes directly with Devin. So let's talk about how they compare.

## The Fundamental Difference: Open Source vs. Black Box

Devin is a black box. You have no idea what it's doing. The only knobs you can turn are the ones they give you.

Shipwright is MIT licensed, free, and completely open. You can literally open a Claude Code session and ask it to explain what Shipwright is doing — because Shipwright *is* Claude Code, with a harness on top. Every skill, every command, every automation is readable and forkable.

This isn't just a philosophical difference. It has practical consequences.

When something goes wrong with Devin, you wait for their support team. When something goes wrong with Shipwright, you open the skill file and fix it. When you need a new behavior — a custom deployment flow, a client-specific code review process, a bespoke security check — with Devin you put in a feature request. With Shipwright, you write a skill and ship it this afternoon.

## Why We Built on Claude Code

One thing Dan and I keep coming back to: Claude Code feels like it was built by developers for developers. The same is true of Shipwright. We're developers. We built this tool for developers.

The choice to build on Claude Code wasn't just philosophical — it's a practical leverage point. Every plugin you've built for Claude Code, every skill your team has developed, every process you've automated in your local Claude Code sessions — all of it carries over to Shipwright. The agent running autonomously in the cloud uses the same plugin ecosystem as your local terminal.

That means if you're already a Claude Code shop, adopting Shipwright isn't a migration. It's an extension. You're not throwing away everything you've built; you're putting it on autopilot.

If you're evaluating autonomous coding tools and you're currently using Claude Code, our answer is always Shipwright. Every time.

## Where They're Similar

To be fair: Devin and Shipwright do a lot of the same things. Both take a PRD, work interactively with a developer to build task lists, execute those tasks autonomously, and produce pull requests. Both handle bug fixes, features, and maintenance work without a human writing the code.

Devin's got scale, resources, and enterprise certifications that we don't have yet. They've clearly built Devin to make money, and they have every enterprise-y checkbox you could want. For large organizations that need a SOC 2-certified, fully managed solution with a dedicated support contract, Devin makes sense.

But for a Claude Code shop that wants to move fast, keep costs down, and actually understand what their autonomous agent is doing? The calculus looks different.

## The Deployment Gap

Here's the biggest functional difference, and most people don't know about it.

**Devin does not deploy.**

Devin will help you plan, it'll code, it'll create the PR, and it'll fix review comments. That's where it stops. Deployment is your problem.

Shipwright deploys. After a PR is merged (either by a human reviewer or, if you've configured it, automatically), Shipwright goes and deploys for you. That's a Claude Code skill — meaning it's customizable. We have clients where we wrote a custom deploy skill tailored to their infrastructure. They could have used Shipwright's default deploy, or they could write their own. Both work.

We default to deployment off, because there's real work required for an engineering team to build the confidence to merge-and-auto-deploy. You need good test coverage, clean CI, and trust in the system. But we'll take you there, and when you're ready, flipping that switch means the pipeline runs all the way to production with no human touch.

## The Cost Difference

Devin charges per seat. Every developer who uses it is a recurring licensing cost, on top of your existing AI token costs.

Shipwright has no licensing cost. Your only expense is the token cost of the Claude API calls the agent makes. And we've worked hard to keep those low — we almost never use Opus by default. We route to cheaper models for straightforward tasks, and reserve the heavy lifting for work that genuinely needs it.

Scale that across an org. One developer with Shipwright versus one developer with Devin: the costs are comparable. Scale to 200 developers, each with their own agent — that's 200 pods running in Kubernetes at near-zero infrastructure cost, versus 200 Devin seats at whatever they're charging this year.

One agent per developer is the model we believe in. Every developer should have their own agent, with its own name and personality, that learns how that developer wants to work. That's not a luxury — it's the model that makes autonomous coding actually stick inside an organization.

## Shipwright Built Shipwright

We think the most compelling thing we can show you isn't a benchmark or a demo. It's the public commit history.

Since we open-sourced Shipwright a few months ago, the last 1,000 pull requests in the repository were all written by Shipwright itself. Dan and I aren't writing code in the background. We create PRDs, hand them to our agent in Slack, and Shipwright creates the task list, executes the work, reviews its own PRs, and merges them.

If you go to `proof.shipwrightharness.com`, you can see exactly what Shipwright is working on for itself right now. It's dogfooding in public, continuously.

That's the proof we can offer that Devin can't: an open, auditable, live record of autonomous coding running on real infrastructure. Not a controlled demo. Not cherry-picked examples. The actual work.

## How to Choose

If someone asks Dan and me whether they should use Shipwright or Devin, the first question we ask is: are you currently using Claude Code?

If yes: Shipwright, every time. Your existing plugins, skills, and process carry over. You get deployment. You pay only for tokens. You can customize anything.

If no: it's more nuanced. Devin is a mature, well-resourced product with enterprise support. If you're starting from scratch and need hand-holding, that has value. But you're also locking yourself into their cloud, their pricing model, and their roadmap.

The thing about Shipwright is that because it's built on Claude Code, any time Claude Code improves — any time Anthropic ships a better model, a new capability, a faster execution path — Shipwright gets better automatically. We're riding that curve, not trying to keep up with it.

That's a different kind of competitive advantage. And it's one we're happy to put in your hands for free.

---

*This post is adapted from [The Velocity Lab podcast](https://podcasts.apple.com/podcast/the-velocity-lab/id1888653618), Episode 28: Shipwright vs. Devin: The $26B Competitor We Accidentally Built Against.*
