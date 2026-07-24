---
title: "Everyone I Talk To Has 'Adopted AI.' Almost None of Them Have."
date: "2026-07-24"
author: "Dan McAulay"
category: "AI Adoption"
excerpt: "A head of engineering asked me why some of his devs were burning through tokens while others spent nothing. That question is the whole story. Here's the ladder I've started using to answer it."
readTime: "7 min read"
---

A head of engineering messaged me last week with a specific problem: a few of his developers were spending a lot on Claude Code, most of the rest were spending almost nothing, and he didn't know what to make of it.

My answer was quick — aim for $10-20 a pull request all in, planning through merge. Overspend usually means someone's leaving a session open across three unrelated tasks instead of starting fresh. Underspend usually means distrust — someone who hasn't actually let the model do real work yet.

But the interesting part wasn't the number. It's that he was asking the question at all. This is a team that would tell you, correctly, that they've adopted AI. And they're still down in the weeds on token hygiene and per-developer variance, because "adopted" and "operating well" turned out to be two completely different states.

I think that gap is the whole story right now, and most of the industry hasn't caught up to it.

## Everyone's Adopted AI. Nobody Agrees On What That Means.

The stats on individual usage are done moving. Stack Overflow's 2025 survey put AI tool usage at 80-84% of developers, roughly half daily. JetBrains found 85% using AI tools regularly. DORA's numbers put it at 90% of tech professionals using AI at work. If your mental model is "has this team touched Claude Code or Copilot," basically everyone clears that bar now.

But JetBrains asked a sharper question too: is AI actually integrated into how the *team* works, not just how individuals work? Only 44% said yes. That's a 40-point gap between "I use it" and "we've organized around it." DORA's own language for where most orgs sit: adoption is "predominantly individual and ungoverned." McKinsey found only about 23% of orgs are actually scaling agentic AI anywhere in the org — the rest are either experimenting or haven't started.

So when a head of engineering tells you his team "adopted AI months ago," believe him — and also assume he's probably still at the stage where nobody's agreed on what a healthy token spend looks like, because nobody built the system that would tell them.

## The Bottleneck Didn't Disappear. It Moved.

Here's the part that actually costs teams money. Faros AI tracked over 10,000 developers across 400+ orgs and found that in heavy-AI-adoption teams, PR volume went up 98% — and review time went up 91-441%, bugs per developer rose 54%, and incidents per PR rose 243%. Org-level delivery metrics stayed flat. A separate case study of several hundred engineers over ten months found PR volume grew 3.1x while reviewer capacity only grew 1.5x — human review coverage dropped from 89% to 68%.

DORA's framing for this: AI is an "amplifier of existing dysfunction," not a fix. It correlates positively with throughput and negatively with delivery stability, and their 2026 ROI research says it plainly — returns come from strong engineering foundations, not from how much you're spending on tools.

CloudBees put a number on the gap directly: 97% tool adoption, but only about 30% of orgs have real governance over the code AI is producing. 81% report *more* production issues since rolling AI out, not fewer.

None of this is a model problem. It's a systems problem. Code generation got fast. Everything downstream of it — review, testing, CI, deploy — didn't, and now that's where the time goes.

## The Ladder

I've started using a framework from Boris Cherny — he built Claude Code — that he posted a few weeks ago. It's the clearest version of this I've seen, so I'm just going to walk through it as he laid it out:

**Step 0, Gated.** AI access is locked down, no real infrastructure to host what it produces. Most orgs are past this.

**Step 1, Assisted.** One engineer, one agent, mostly supervised — a fast pair programmer. You review almost everything before it merges, and you're watching the whole time because you don't trust it enough to look away. This is where most teams who say they've "adopted AI" actually live.

**Step 2, Parallel.** One engineer runs 5-10 agents at once across separate worktrees. Auto mode is on, code review and security review are automated by default. You're reviewing final diffs, not keystrokes. Your backlog starts shrinking instead of growing.

**Step 3, Supervised autonomy.** Claude writes nearly all the code. The question stops being "did you read this" and becomes "what context was the model missing." Roughly a hundred agents running, one engineer effectively managing managers.

**Step 4, AI-native.** The loop closes. Most agents get kicked off by Claude itself. You steer by intent and check in by exception.

The line that stuck with me: Boris said Anthropic itself is at step 3, pushing toward 4. He'd just hit 4 personally. If the company that builds the tool is only at step 3, nobody who's spent two months rolling out Copilot licenses is further along than step 1 or 2 — and that's not a knock on them, it's just where the guardrails run out.

## The Unlock Wasn't the Model. It Was Slack.

I got from step 1 to step 2 by accident, and it took me a while to understand why it worked.

For months I ran Claude Code the normal way — terminal open, watching it work, one task at a time. That's textbook step 1: synchronous, supervised, your attention is the bottleneck. The thing that actually moved me was getting agents into Slack. Slack was already how I worked asynchronously with people — plan something, hand it off, come back later. It turned out to be exactly how I needed to work with agents too. I stopped babysitting a terminal and started delegating the way I'd delegate to another engineer.

That's it. That's the whole unlock. Not a better prompt, not a bigger model — a different interface that let me stop being chained to the screen. Boris's own ladder names this exact bottleneck at step 1: "work is synchronous, you sit and watch while Claude works, rather than moving on to the next task." I found the fix before I had a name for the problem.

## Where Most Teams Actually Are

Go back to the head of engineering with the token-spend question. His team looks, from the outside, like a success story — high usage, real spend, people using the tool daily. By the survey numbers, they're done adopting.

But the actual symptom he brought me — a few people way over on tokens, most people at zero, no shared sense of what "normal" looks like — is a step 1 symptom. Nobody's agreed on the guardrails yet, because nobody's had to. Individual usage doesn't require them. Getting to step 2 does: a self-verification loop everyone trusts, automated review and security so a diff doesn't live or die on one person's attention, and enough parallel work that "how much should this cost" stops being a personal judgment call and starts being a system property.

That's a more useful diagnostic than "have you adopted AI." Ask instead: could your team tell me, right now, what a normal pull request costs and how long it should take? If the honest answer is "it depends who you ask," you're at step 1, no matter how good your adoption numbers look.

## What We Actually Do About It

This is the thing we rebuilt our services page around. Installing Devin or Shipwright doesn't move you up the ladder by itself — plenty of teams have installed one or the other and are still stuck exactly where they started. What moves a team is finding out honestly which rung they're actually on, building the specific guardrails the next one requires, and then running the work alongside the team until orchestrating agents is just how Tuesday goes, not a curriculum item.

We tried the curriculum version first, for what it's worth. Champions, workshops, co-created learning materials. It didn't work — not because the people weren't capable, but because a training session doesn't change how a team ships. Installing a system that ships, and running it with them until it's normal, does.

If you want a straight answer on which rung you're actually on, that's a 30-minute conversation, not a sales pitch.
