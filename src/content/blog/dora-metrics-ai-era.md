---
title: "DORA Metrics in the AI Era: What They Still Get Right (and What They Miss)"
date: "2026-04-14"
author: "Dave O'Dell"
category: "Engineering Velocity"
excerpt: "AI tripled your deployment frequency. Change failure rate followed. Here's why DORA still matters—and what it can't see when AI is writing the code."
readTime: "8 min read"
---

Deployment frequency went up 40%. Change failure rate followed. The team shipped more code than they ever had before — and spent Friday night rolling it back.

This is the story we keep hearing. Engineering leaders roll out AI coding tools, watch the throughput numbers climb, celebrate the DORA improvements on the next quarterly review, and then quietly start fielding incident reports they don't quite understand. The metrics moved in the right direction. The production environment did not.

DORA metrics — Deployment Frequency, Lead Time for Changes, Change Failure Rate, Mean Time to Recovery — were designed in a world where the bottleneck was human throughput. They were measuring the speed and health of systems that were fundamentally constrained by how fast engineers could write, review, and ship code. That constraint no longer exists the way it used to. And the metrics, if you don't know what you're looking at, can actively mislead you.

This isn't an argument against DORA. It's an argument for knowing what they're measuring now that the variables changed.

## DORA Was Built to Find the Wrong Bottleneck

The original DORA research, built over years of survey data from thousands of development teams, was fundamentally a study in friction. Where does software slow down? Where does it break? What distinguishes elite performers from everyone else?

The answers were consistent: elite teams deployed more frequently, recovered from incidents faster, and had lower change failure rates. The insight was that these weren't trade-offs — you didn't have to choose between speed and stability. The teams that were fastest were also the most stable, because they shipped smaller changes, caught problems earlier, and had the organizational muscle to fix things quickly.

That research holds. The conclusions still apply. But the inputs have changed.

When a developer was the bottleneck, deployment frequency was a direct proxy for how well your process supported continuous delivery. A team deploying daily had figured out how to make small, safe changes. A team deploying monthly was almost certainly batching up risk.

When an AI is generating the code, deployment frequency tells you something different. It might tell you that your engineers have more PRs to review than they can handle. It might tell you that your CI pipeline is the new choke point. It might tell you nothing meaningful at all about code quality, because the volume increased without a corresponding increase in human judgment applied to each change. We've written about how [the code review queue often becomes the first visible bottleneck](/blog/code-review-bottleneck/) when teams start using AI tools seriously, and this is exactly the mechanism.

## What the Numbers Look Like When AI Gets Involved

Here's a pattern we see regularly working inside engineering teams at the stage where they've achieved real AI adoption — not "everyone has a license" adoption, but actual workflow integration:

Lead time for changes compresses significantly, sometimes by half. An engineer who used to spend two days writing and testing a feature is doing it in four hours. That's real. It shows up in the metrics.

Deployment frequency increases, sometimes dramatically. More changes are ready to ship.

And then — about six to eight weeks in — change failure rate starts creeping. Not dramatically. Maybe from 8% to 12%. Maybe from 5% to 9%. The kind of movement that's easy to explain away ("we had a rough sprint," "there was a hard migration") but that doesn't reverse on its own.

What's happening is that the review layer didn't scale with the throughput. Reviewers are approving more code faster, which means they're approving it less carefully. The AI-generated code often passes tests and looks structurally correct, but it's subtly wrong in ways that require domain context to catch — the kind of thing a careful reviewer catches on the second read and an overwhelmed reviewer misses entirely. The [CI pipeline is a related bottleneck](/blog/ci-pipeline-bottleneck/) that shows up the same way: the pipe widens at the generation end, but nothing upstream changed.

DORA sees the failure rate go up. It doesn't see why.

## What DORA Still Gets Right

None of this means you should throw out your DORA dashboard. The framework is measuring outcomes, not activities — and that's exactly the right thing to measure. Deployment frequency, lead time, change failure rate, and MTTR are all real signals about how your software delivery system is functioning. The problem isn't the metrics. The problem is interpreting them without accounting for what changed.

Deployment frequency is still meaningful — but now it needs to be paired with review cycle time and PR queue depth. If your deployment frequency is up and your review queue is also longer than it's ever been, you're not moving faster. You're accumulating risk while the queue is a pressure valve.

Lead time is still meaningful — but now the interesting question is where time is actually being spent. Before AI, most lead time was in development. Now it's often in review, in CI, and in the gap between "code is ready" and "code is merged." The [velocity engineering](/blog/velocity-engineering/) insight here is that optimizing the wrong stage of the pipeline produces real numbers that describe a problem you haven't actually solved.

Change failure rate is still the single most honest metric in the DORA set. It doesn't lie. If code is failing in production more often, something is wrong. It's just that the root cause in an AI-assisted team often points somewhere different than it used to.

MTTR remains a meaningful signal about your operational maturity — can you find problems fast, fix them fast, ship the fix fast? This one is mostly unchanged by AI tooling, except that AI can now accelerate the fix itself. Teams we work with that have integrated AI deeply into their incident response workflows do see meaningful MTTR improvements. But that's a separate problem from what we're talking about.

## What DORA Can't See

The gaps are specific. Here are the signals DORA doesn't capture that we've found genuinely useful in AI-era engineering teams.

**Rework rate.** How often does merged code come back for significant revision within two weeks? In a pre-AI world, rework was relatively rare and usually pointed to a requirements problem. In an AI-heavy workflow, rework often points to code that passed review but didn't actually solve the problem correctly. The AI-generated solution was structurally plausible and test-passing, but it was solving a slightly different problem than the one specified. Tracking rework rate gives you a leading indicator that your context-passing process is broken — a problem we've covered in depth in the [context problem post](/blog/context-problem/).

**Review throughput vs. approval rate.** If reviewers are approving a higher percentage of PRs without changes — and they're doing so faster — that's not necessarily good news. It might mean the code quality improved. It might mean review quality degraded. Tracking the ratio over time, especially before and after AI tool rollout, tells you something DORA doesn't.

**AI-authored vs. human-authored change failure rate.** This is the metric most teams aren't collecting but should be. If you can tag changes by how much of the code was AI-generated and track their production failure rate separately, you'll get an accurate picture of where your quality gap actually lives. Most of the time, it's not that AI code fails more — it's that it fails *differently*, and in ways your review process wasn't designed to catch.

**Queue depth at each stage.** Where is work sitting? DORA's lead time metric captures end-to-end duration, but it doesn't tell you whether days are being lost in review, in CI, in staging, or in waiting for approval. Understanding the shape of your queue is the difference between knowing your pipeline is slow and knowing where to fix it. This is core to how we approach [velocity engineering](/blog/velocity-engineering/) — instruments everywhere, not just at the finish line.

## How to Think About DORA Going Forward

The framework is right. The original insight — that speed and stability aren't opposites, that high-performing teams ship fast *because* they've reduced risk per change — is still correct and still useful. AI doesn't change the theory. It changes the inputs.

What it calls for is an instrument upgrade, not an instrument replacement. Keep your DORA metrics. Add the context they need to be interpretable. Specifically:

Pair deployment frequency with PR queue depth and reviewer load. A spike in deployments means something different when reviewers are underwater than when they have capacity.

Pair lead time with stage-by-stage breakdown. Where specifically is the time going? The answer changes with AI tooling, and the answer to "how do we improve this" changes with it.

Add rework rate as a first-class metric. Two-week rework is your canary for context and review quality problems.

Track change failure rate by code origin if you can. Even an imperfect proxy — "was this PR more than 60% AI-generated?" — gives you signal that the aggregate doesn't.

The teams that get this right don't measure less. They measure smarter. They understand what each number is actually telling them about the system, and they don't confuse movement in the metrics with movement in the actual quality of software delivery.

We see this mistake constantly — organizations that ran an [AI adoption rollout](/blog/enterprise-ai-adoption-mistakes/) and pronounced it successful based on DORA numbers that were technically correct and practically misleading. Deployment frequency was up. The engineering org was not, in any meaningful sense, healthier.

The best way to know if your AI adoption is actually working is to look at whether outcomes improved — not just volume. DORA is a window into outcomes. It's just a window that requires more interpretation than it used to. If you're trying to build a measurement framework that accounts for this, the [ROI measurement approach](/blog/measure-ai-adoption-roi/) we use starts with outcomes and works backward to the metrics that actually connect to them.

The numbers are still worth chasing. Just make sure you know what they're saying.
