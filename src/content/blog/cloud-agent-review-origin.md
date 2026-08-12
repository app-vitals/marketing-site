---
title: "The Cloud Agent Was Supposed to Write Code. It Ended Up Reviewing It."
date: "2026-08-05"
author: "Dan McAulay"
category: "Company Updates"
excerpt: "I built a system to run Claude Code in isolated cloud sandboxes, chasing full autonomy — parallel features, overnight PRs, the works. Almost none of that survived contact with reality. The one piece that did became the review skill Shipwright runs on today."
readTime: "7 min read"
---

*This is the first post in a series on how Shipwright actually came together. Not to flex — because every piece of it exists for a reason, and I'd rather show you the reason than ask you to trust it blind.*

I built the whole thing to get an agent doing work for me in the background. That was the entire goal. Not "AI helps me code faster" — I already had that. I wanted work happening while I wasn't looking at it.

I started with reviews, because reviews were the first real blocker. Once you're using AI to write code, PR review becomes the thing that doesn't scale with you. I'd kick one off, go do something else, then come back and work through it — read it, decide if it held up, have Claude post it. It wasn't parallel — no worktrees, one PR at a time — but it was less babysitting than reviewing synchronously, and I tuned that pipeline until I was actually happy with it. I thought my curated reviews were better than what the generic AI review tools were putting out, and I still think that's true. (These days I don't curate them by hand — that's a later chapter.)

So I built a system to run Claude Code in isolated cloud sandboxes — FastAPI and Celery on the backend, Novita for the actual sandbox compute. Send it off, it fixes tests against a local Postgres inside the sandbox, opens a PR when it's done. We [put out a tutorial on it in November](https://www.youtube.com/watch?v=OCA8iInD1x8) when it was fresh. It was genuinely fun to build. I geeked out on it.

## The Dream vs. the Reality

I didn't have a crisp spec for it, though — just the shape of it. Asleep, skiing, on a walk with the dog, heads-down on something else entirely: work happening whether or not I was watching. In my head that looked something like cron jobs queuing PR reviews overnight so they'd be sitting there in the morning, or Trello issues picked up automatically with PRs already open and ready to merge. Vague shapes, not a plan.

The reality was narrower. Sending Claude off to build a real feature, unsupervised, and trusting what came back — I couldn't get there. Maybe my prompting wasn't tight enough yet. Maybe I'm just too picky about implementation. But it wasn't just me — most of the industry wasn't there yet either. We'd stopped writing the code by hand. We hadn't stopped supervising it. Trust in the system was something you built up, not something you started with. So I was still in hands-on, human-in-the-loop mode for anything that touched actual feature work.

But one piece of the dream worked exactly as advertised: PR review. Claude Code would load the context and hand me a starting point — I'd still work it human-in-the-loop from there before anything got posted.

AI was writing a lot of code by then. The PRs I was reviewing had doubled, some had tripled in size. Large PRs are hard to review under the best conditions — you miss things. Even Claude misses things. So the parallel-cloud-sandbox idea, which was overkill for "build me a feature," turned out to be exactly the right shape for "review four PRs while I'm not looking."

## What I Actually Built

The workflow ended up as a single slash command:

```
/ca-review-prs 626 636 637 642
```

That tells Claude to queue all four reviews to the cloud, wait on them in the background, and apply each one as it finishes:

```
ca pr review 626   # queue to cloud
ca task wait <id>  # wait in background
ca task apply <id> # pull the review down locally
```

I'd grab coffee. Come back, and the first review would be sitting there ready. I'd read it, sometimes argue with Claude about it — "is this actually a problem, or am I nitpicking?" — and when I was done, I'd just say "next" and it would pull in the next completed one.

I don't ship what Claude flags without looking at it first. Realistically, maybe half of what it catches is worth acting on. The rest gets thrown away. It's a filter, not a replacement for judgment.

And it wasn't one-directional. During my own manual pass, if something bugged me, I'd bounce it off Claude right there — "can we simplify this?" or "is this actually worth blocking on?" Because Claude already had the full context of the PR loaded, those conversations were useful instead of cold starts. Sometimes I was right. Sometimes I got talked out of it. Either way, the comments I actually posted were better for the back-and-forth.

## Why Not Just Cron It?

The obvious question, in hindsight: why not write a cron job that polls GitHub for pending reviews and works through them in the background? I could have. But that wasn't really the point of the cloud agent — the point was queuing up work and coming back to it, not scheduling it to run without me.

At the time, most of what filled that queue was PR review. So instead of stepping back and designing "an automated review system," I did what actually happens when you're heads-down: I made the thing I kept doing easier to do, one iteration at a time. The tooling followed the habit, not the other way around.

Cron didn't show up until OpenClaw — which is funny, because cron jobs have been around forever. They're arguably the original way people automated work with computers, long before anyone was pointing an LLM at a codebase. I had the oldest automation primitive there is sitting right there the whole time, and it took a second system before I actually reached for it.

## Where This Actually Went

That slash command shipped as a real plugin on February 4, 2026 — `pr-review`, with `/ca-review-prs` as one of its commands, local review drafts, CLAUDE.md compliance scoring, the works. Not a designed feature. A personal workflow I built because I was drowning in my own review queue, generalized once it started working.

I was already spending most of my time reviewing PRs instead of writing code by then — that's where you tend to land as a senior IC. But once AI entered the picture, I really felt like the bottleneck. I couldn't keep up with the volume of changes coming in anymore. The review pipeline wasn't abstract. It was built because I genuinely couldn't keep pace.

We've since written more generally about [why AI-generated code turns review into the new bottleneck](/blog/code-review-bottleneck/) and [why review time gets worse before it gets better](/blog/ai-pr-review-bottleneck/). Both of those posts describe the pattern. This post is the specific tool we built before we knew it was a pattern.

Every piece of scaffolding in Shipwright has to earn its place the way this one did. I'm not trying to build a platform — I want the thinnest layer on top of Claude Code that still fixes real problems. The review skill isn't there because "AI needs review tooling" in the abstract. It's there because I personally couldn't keep up with my own queue, and a slash command that batches to the cloud and hands me results one coffee at a time fixed exactly that, nothing more. If a piece of Shipwright can't point back to a moment like this — one person, drowning in one specific problem — it probably doesn't belong.

Next up: [the real story behind Shipwright](https://shipwrightharness.com/story/) continues with OpenClaw, and the original `todos.json` I was using to queue up work with cron jobs before any of this had a name.
