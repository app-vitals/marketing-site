---
title: "Why Your Best Engineers Are Resisting AI (And What That's Actually Telling You)"
date: ""
author: "Dave O'Dell"
category: "AI Adoption"
excerpt: "When your strongest engineers push back on AI tooling, most orgs treat it as a change management problem. They're missing the signal entirely."
readTime: "8 min read"
---

Forty percent of the engineers we talk to describe their AI rollout as "fine." Which means the tools are installed, the licenses are paid for, and utilization is just high enough that nobody's asking hard questions. Meanwhile, their best engineers — the ones who push back on bad ideas, who've been around long enough to remember the last three waves of "this changes everything" — are quietly not using any of it.

This is the part where most AI adoption advice tells you to overcome resistance. Work the change management angles. Get buy-in. Find your champions and flood them with enablement.

We think that's mostly wrong.

After working inside engineering teams at companies across the adoption curve, we've come to a different read: when your strongest engineers resist AI tooling, they're usually right. Not about the technology itself — they may be miscalibrated there — but about why *this rollout, in this form, for this codebase* isn't working. The resistance is a signal. Most organizations treat it like a problem to solve. That's the mistake.

## The Skeptics Are Usually Your Best Signal Detectors

Think about what makes an engineer resistant to a new tool. It's almost never laziness or fear. The engineers who push back hardest are typically the ones who've been burned the most by silver bullets. They've lived through the microservices-all-the-things era, the blockchain POC that went nowhere, the observability platform that required three months of instrumentation before it showed anything useful. They have a finely calibrated skepticism that's been earned through scar tissue.

When that engineer says "I tried it and it slowed me down" or "the suggestions are wrong half the time" or "I don't trust the generated tests" — they're not being difficult. They're reporting real feedback about their real experience.

The mistake is treating this as a personality issue rather than a product issue.

We've seen this exact pattern at companies trying to roll out AI coding assistants to senior engineers who specialize in complex systems work — distributed state management, consensus protocols, gnarly data pipelines. The AI tooling works great for the newer engineers writing CRUD endpoints. It's mediocre to useless for the senior engineers doing the hard parts. And when leadership sees that the seniors aren't using it, they conclude the seniors are the problem.

That has it backwards.

## What the Resistance Is Usually About

We've catalogued the actual reasons experienced engineers resist AI tooling, and they cluster into a few categories.

**Context problems.** The AI doesn't know your codebase, your conventions, your constraints, or your architectural decisions. It generates plausible-looking code that violates all of them. Fixing that generated code takes longer than writing it yourself. We've written about [the context problem](/blog/context-problem/) in depth — it's one of the most underappreciated failure modes in enterprise AI adoption. The engineers who run into it first are almost always the most senior, working in the most complex parts of the system.

**Quality mismatches.** Senior engineers have high standards because they've been burned by low-quality code making it to production. AI-generated code often clears "it works" while failing "it belongs in this codebase." The engineer who spots this isn't being precious — they're doing their job. The problem is that AI tooling, as typically deployed, doesn't get better at your standards unless you invest in making it better.

**Workflow friction.** The tooling was designed for a certain kind of workflow, and that workflow doesn't match how your best engineers actually work. Maybe they live in the terminal and the AI is buried in the IDE. Maybe their development cycle is heavy on reading and reasoning, not on fast text generation. Forcing a tool into a workflow that doesn't fit it generates real costs.

**Trust deficits.** This one is subtle but important. Senior engineers trust themselves. They've built that trust through years of getting feedback on their code — code reviews, production incidents, debugging sessions. They don't have that feedback loop with AI yet, and they're not wrong to be skeptical about a tool they can't yet calibrate. [AI adoption mistakes](/blog/enterprise-ai-adoption-mistakes/) almost always include skipping the trust-building phase.

## The Standard Response Makes It Worse

Here's what most organizations do when they encounter resistance: they bring in more enablement. More training. More champions. More demos that show the tool working great on a greenfield feature or a contrived example, not on the hairy existing codebase that the resistant engineer actually lives in.

This is condescending, and experienced engineers know it. They're not resistant because they don't understand the tool. They're resistant because they've used the tool and it doesn't work well for their specific context. Showing them another demo of it working in a different context doesn't help.

Worse, the standard response often creates social pressure to use the tool regardless of whether it's actually productive. Engineers start running AI-generated code through PRs not because it's faster, but because they feel surveilled on adoption metrics. Quality drops. The engineers who care most about quality — your best engineers — get frustrated. Some of them leave. You've now used an AI adoption initiative to churn your senior talent. This is not hypothetical. We've seen it happen.

## What Actually Works

The pattern we've seen succeed is almost the opposite of the standard playbook.

Start by taking the resistance seriously as information. Sit down with the engineers who aren't using AI and ask them why. Not a survey. A conversation. Listen for the specific failure modes — the wrong suggestion that wasted an hour, the generated test that passed but didn't test the right thing, the refactor that looked correct but broke a subtle invariant. Those specific failures are your roadmap.

Then go fix those specific failures before you try to expand adoption. That might mean [investing in better context](/blog/context-problem/) — building out project documentation, conventions guides, and prompting patterns that make the AI useful for your actual codebase. It might mean removing the tooling from parts of the stack where it doesn't provide value and doubling down where it does. It might mean slowing down the rollout to get the quality bar right.

This is slower than a mandated rollout. It's also the only thing that produces durable adoption.

The engineers who were resistant will notice when the tool actually works for them. They'll adopt it without being asked. And when they adopt it and talk about it to their peers, that carries more weight than any top-down initiative. We wrote about this dynamic in the [AI champion playbook](/blog/ai-champion-playbook/) — peer credibility is the only currency that actually drives adoption.

## The Measurement Problem

One reason organizations don't catch this dynamic is that they're measuring the wrong things. License utilization tells you nothing. Commits-per-day tells you nothing. Even lines of code is mostly noise.

The metric that matters is whether the engineers who've adopted AI are shipping higher-quality work faster. Not more code — better outcomes. And the metric that surfaces the signal in the resistance is: are your best engineers among the adopters?

If your AI adoption curve is inverted — if the newer, less experienced engineers are using it heavily and the senior engineers are avoiding it — that's a red flag. The senior engineers are the calibration signal. They're not using it because it's not working well enough yet. [Measuring AI adoption ROI](/blog/measure-ai-adoption-roi/) requires getting past vanity metrics and asking what actually changed in output quality.

Some organizations never crack this because the adoption dashboard looks fine. Usage is up. A percentage of engineers are using it. The resistant engineers are getting social pressure to comply. From the top of the org, everything looks like progress.

Meanwhile, the engineers who know where the bodies are buried are doing their best work without the tools, feeling increasingly alienated, and updating their LinkedIn.

## The Bigger Picture

We're at an inflection point where AI coding tools genuinely do unlock velocity gains — meaningful ones, not demo-ware. We've watched teams move faster than they thought possible. [Velocity engineering](/blog/velocity-engineering/) is real, and the gap between teams that do it well and teams that don't is growing.

But the path to that velocity doesn't run through mandated adoption and ignored resistance. It runs through honesty about where the tools work and where they don't, investment in making them work better for your actual context, and trust in the engineers who are telling you something isn't working.

Your resistant engineers are not obstacles. They're the quality bar. If you can get them on board — genuinely, not performatively — you've actually succeeded. If you've gotten everyone else on board while the senior engineers quietly opt out, you've papered over the failure with utilization metrics.

The signal is there. Whether you listen to it is a choice.

---

*App Vitals works with engineering teams to build AI adoption that sticks — starting with the parts that aren't working. If your senior engineers aren't using the tools, we know where to start.*
