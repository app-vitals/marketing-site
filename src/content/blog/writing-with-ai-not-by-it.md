---
title: "Writing With AI, Not By It"
date: "2026-09-16"
author: "Dan McAulay"
category: "Company Updates"
excerpt: "LinkedIn shipped a button in July for reporting AI-generated 'slop' — it's been clicked over a million times in three weeks. I write every post on this blog with AI. Here's the distinction I don't think the backlash is making, and what we just shipped to make sure we're on the right side of it."
readTime: "4 min read"
---

LinkedIn shipped a button in July that lets you report a post as ["seems like AI slop."](https://techcrunch.com/2026/07/30/linkedin-adds-a-button-to-report-ai-generated-slop/) People have clicked it more than a million times in three weeks. Posts that get flagged lose something like 40% of their reach.

I write every post on this blog with AI. This one included.

## What the backlash gets right

I'm not going to pretend that button exists because people are confused. Open LinkedIn on any given day and you can spot the tells inside thirty seconds — the same three-beat structure, "delve" and "leverage" and "unlock the power of," a question at the end that isn't actually curious about the answer. People got good at spotting it because there's a lot of it to practice on, and most of what they're flagging really is what it looks like: someone who didn't want to write anything, having a model do it for them, unedited and unowned. That's not a grey area. That deserves exactly the reaction it's getting.

Here's the distinction I don't think the backlash is making, though, because most of what's out there doesn't give it a reason to: there's writing AI does *for* you, and there's writing you do *with* it. Those can look identical from the outside — same words, same publish button — which is exactly why one gets mistaken for the other.

## The gap I actually have

I'm not a writer. I've never been the guy who sits down and gets a clean paragraph out on the first pass. I know what I think — I can tell you out loud in about ninety seconds — and watching me try to type the same thing usually takes twenty minutes and comes out worse than what I said. For years that gap just meant the thought didn't get written down. It stayed a thing I believed, not a thing anyone else could read, argue with, or hold me to.

Now I talk it through with a model, push back when it flattens something I actually meant, and keep going until what's on the page is the thing I said — not an averaged-out version of it that could belong to anyone. The account this publishes under is mine. The stance is mine. If I'm wrong about any of this, I'm the one who has to answer for it in three months, not a tool.

There's a plainer reason this matters too, and I'd rather say it than dance around it. App Vitals needs a public voice — that's most of how two people get found by the kind of client actually looking for what we do. A professional writer would cost us hours we don't have and money we'd rather spend shipping. The realistic alternative to writing with AI isn't "I write it slowly by hand instead." It's "it doesn't get written." Nobody hears the thing I actually think.

## The test I trust more than my own explanation

Everything above is still just me telling you my intentions were good, and intentions are cheap. The test I actually trust is simpler and doesn't take my word for anything: could someone else's byline sit on top of this paragraph and nobody would notice?

If a generic AI-adoption consultant could have published this exact post, word for word, that's not a defensible use of AI — that's the slop the LinkedIn button exists to catch, and it should get caught. The specific number, the actual disagreement, the thing that happened to us and nobody else — that's the part a model can't originate on its own. It can help me say it faster and clearer than I'd manage alone. It can't have thought of it first.

## We hadn't actually done anything about it

I'd been making some version of this argument for a while without doing much to back it up — the case was there, the follow-through wasn't. That changed a couple of weeks ago. We vendored a mechanical check into this repo — [word-choice rules](https://github.com/app-vitals/marketing-site/blob/main/brand/terminology.yaml) and [the script that enforces them](https://github.com/app-vitals/marketing-site/blob/main/brand/brand-lint.py) — wired it into CI, and wrote down [the actual checklist](https://github.com/app-vitals/marketing-site/blob/main/docs/content-writing/blog-post.md) every AI-assisted draft here has to survive before it ships: vary the sentence rhythm, cut the connective filler, don't let our own favorite rhetorical moves stand in for something real underneath them.

It's simplistic. It catches word choices and leaves the actual judgment calls to whoever's writing, which is most of the job — no lint rule can tell you whether a paragraph could've come from anyone. But that's close to how everything else here started too: a handful of scripts nobody would call sophisticated, that earned the right to get more capable by solving a real problem on day one instead of waiting to be perfect first. I'd bet this looks different in six months. For now it's a start, and it's a real one — this post had to clear it before you read it.
