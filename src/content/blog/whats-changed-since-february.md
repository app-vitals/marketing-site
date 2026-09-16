---
title: "What's Changed Since February"
date: "2026-09-18"
author: "Dave O'Dell"
category: "AI Adoption"
excerpt: "In February, every call started with 'we're behind'; now it starts with 'we bought the tools and nothing moved.' Same panic, different diagnosis — and only one of them points at the actual fix."
readTime: "6 min read"
---

In February, a VP of Engineering told me his board wanted an AI plan on the table in two weeks. Not a rollout — a plan. Something to point at. He wasn't asking whether to adopt AI coding tools. He was asking how fast he could look like he had.

Seven months later, a different VP, same size company, told me something that sounded almost identical and meant the opposite thing. His team has Claude Code, Copilot, and a Cursor holdout in QA. Spend is up. Usage is up. His board wants to know why the roadmap hasn't moved. He wasn't asking how to adopt. He'd already done that. He wanted to know why it didn't work.

That's the shift. Not from resistance to adoption — that part's basically done. From "we're behind" to "we did the thing and it didn't pay off." And the second problem is harder, because there's no vendor demo that fixes it.

## The Anxiety Phase Is Over

Adoption anxiety was never really about the tools. It was about being the org that got left out — the one still doing code review by hand while a competitor shipped a feature in an afternoon. That fear moved fast in Q1 and Q2. It moved fast enough that we told clients in July to [stop deliberating and adopt now](/blog/adopt-autonomous-coding-now/), because the tools had finally crossed the threshold where waiting cost more than moving.

That advice held. The tools kept improving. But "adopt now" was an answer to a February problem, and February's problem is solved. 80–90% of developers use AI tools regularly at this point — that number's been true for a while and it's not the interesting one anymore. The interesting one is that only 44% of teams say AI is actually integrated into how the *team* works, as opposed to how individual developers happen to use it on their own. Nine in ten devs, fewer than half the teams. That gap is where every one of my September calls actually lives.

## The Bill Came Due

Here's what "adopted but not integrated" costs in practice. Faros AI tracked over 10,000 developers across 400+ orgs and found that in the teams with the heaviest AI adoption, PR volume went up 98%. Review time went up 91–441%, depending on the team, and bugs per developer rose 54%. Incidents per PR rose 243%. Org-level delivery didn't move the way any of that would suggest it should — the code got faster to write and slower to trust.

CloudBees put a cleaner number on the same story: 97% of orgs have adopted some AI coding tool, but only about 30% have real governance over the code it produces. 81% report *more* production issues since rolling it out, not fewer. Read those two numbers together and the pattern is obvious — everybody bought the tool, almost nobody built the thing around the tool that makes the output safe to ship at the new pace.

DX's research across 400+ orgs found median throughput gains landing around 7.8%. Vendors were selling 2-3x. That's not a rounding error, and it's not because the models are bad. It's because a 40%-faster typist doesn't move an org whose real bottleneck was never typing speed. Gartner's read on this from the vendor side: coding agents are sitting near the peak of the hype cycle right now, and they're predicting 40% of agentic AI projects get canceled by 2027 over exactly this — cost and ROI that didn't show up.

None of this is a "the AI isn't good enough yet" story. The February fear was real and the tools answered it. This is a different failure, one level up: individuals got faster, and the system around them — review, testing, deploy, the parts of the job that were never about typing — stayed exactly as slow as it was in January.

## Why "Just Get the Tool" Was Always Going to Stall Here

Go back to what adoption anxiety actually optimized for. Boards wanted evidence of movement, which procurement translated into a signed contract. Engineering's version was licenses distributed before the next all-hands. Every incentive in February pointed at the same finish line: get the tool in developers' hands. Nobody's incentive pointed at "and then build the review pipeline that can handle triple the PR volume," because in February nobody had triple the PR volume yet.

That's not a mistake anyone should feel bad about. It's just a different problem than the one sitting on desks now. [We wrote about the version of this we see most often](/blog/velocity-trap/) — a team hits 40% faster coding, applies it to a workflow where coding was already a small slice of total cycle time, and ends up with a number so small it barely shows up on a chart. The lever worked. It was attached to the wrong part of the machine.

This is the gap the [adoption ladder](/blog/the-ai-adoption-ladder/) exists to name. Step 1, Assisted, is one engineer and one agent, mostly supervised — every line gets read before it merges, because nobody trusts the system enough to look away. That's where "adopted" gets you. The Faros and CloudBees numbers above are what Step 1 looks like at scale: more code, less coverage, no governance built for the new volume. Step 2 is Parallel. Automated review and security stop being optional there and start being infrastructure — the thing that has to exist before more PR volume is good news instead of a liability. Getting from one to the other isn't a tool purchase. It's the part that got skipped in February because in February there was nothing yet to build it around.

## What This Means If You're Reading This in September

If your org is in the "we adopted and it didn't move the numbers" camp, you're not behind and you're not doing it wrong — you solved last quarter's problem and now you're staring at this quarter's. The fix isn't a better model or a fourth tool. It's the unglamorous work of building the review, testing, and deploy infrastructure that can absorb the volume the first tool already produces. That's rung two of the ladder, not rung zero, and it's a completely different project than the one your board approved in February.

We still think adopting fast was the right call in July. We also think most of the orgs who did it are now sitting exactly where the data above says they'd be — more code, more spend, flat delivery — and mistaking that for a tool problem instead of the integration problem it actually is. If you can't tell your board right now what a normal PR costs, how long it should take, or who's actually reviewing the 98% more code you're producing, that's not an AI question. That's the next rung.
