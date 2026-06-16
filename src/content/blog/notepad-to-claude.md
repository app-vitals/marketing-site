---
title: "Notepad to Claude: What a Non-Coder Founder Sees That Senior Engineers Miss"
date: "2026-05-07"
author: "Dave O'Dell"
category: "AI Adoption"
excerpt: "Our friend Brian doesn't write code. He's running a one-person agency that would have required a team of ten two years ago. He moves faster than most of the senior engineers we work with — and the reason is a thing we've started calling the expertise tax."
readTime: "8 min read"
---

A friend of ours, Brian, runs a marketing agency in Truckee. He doesn't code. He has never written a line of code in his life — not in school, not as a hobby, not now. He's an entrepreneur. He makes things. The making just used to involve hiring people.

Two years ago, the first version of his wife's online game tutorial — a word generator for Pictionary — was built by a developer who charged thousands of dollars over multiple iterations. A year ago, Brian rebuilt it himself using ChatGPT and Microsoft Notepad. He'd ask the chat for the code, paste the response into a `.html`, `.css`, and `.js` file, save the folder, zip it as backup, and FTP it up. No GitHub. No version control. No rollback strategy beyond "save another zip."

Thousands of people used it.

When that workflow broke, he moved to Replit. Then Cursor. Then VS Code with the Claude extension. Last week, he switched to using the Claude desktop app directly, because diff views were slowing him down — he didn't need to see them. Today he's running a one-person agency helping local businesses fix their digital storefront, with phase one of his methodology mapped out as 94 discrete tasks, mostly orchestrated through Claude.

He's shipping faster than most senior engineers we work with.

We sat down with him on the podcast — our [first guest, ever](https://share.transistor.fm/s/6d6debaf) — and he said something that crystallized a pattern we'd been seeing for months:

> Experts know what can go wrong. They know all the different ways things can break, all the spaghetti code AI can produce, every place a sloppy diff can ship a regression. So that's what they're thinking about. They're hedging.

He paused, then: "I don't know any of that. I just go."

This is the expertise tax. And it's the most underrated reason senior engineering orgs are stalling on AI adoption.

## The Tax No One Told Us About

There's a story senior engineers tell themselves about why they're slower to adopt AI tooling than the vibe coders. It goes something like: *they don't know what they don't know. Once it bites them, they'll learn.* And then everyone smiles, because we've all been the senior engineer cleaning up a junior's mess at some point.

That story is partly right and mostly wrong.

The part that's right: experience produces real instincts. When a senior engineer reads a Claude-generated migration and feels their stomach drop, they're often correct. Years of debugging concurrent systems, reading post-mortems, and inheriting cursed code create a sense of where the dragons are. That instinct is valuable. We use it every day.

The part that's wrong: those same instincts make experts catastrophize. They imagine the version of the AI output that contains every bug they've ever shipped, every race condition they've ever debugged, every NULL they've ever forgotten to check. They look at a 200-line diff and see the 50 ways it could go sideways. So they reach for the brake.

Brian doesn't have that instinct. He hasn't shipped twenty years of bugs. He hasn't been on call when a misplaced semicolon brought down production. So when Claude produces 200 lines of code, he reads it the way a kid reads a book: assuming the words on the page are basically saying what they appear to say. He runs it. If it works, he keeps it. If it doesn't, he tells Claude what broke and tries again.

He calls this "build trust through usage." We'd call it "the absence of catastrophic prior knowledge."

Both things are true.

## The Forcing Function of Inability

Here's what makes Brian's trajectory so instructive: he didn't have a choice.

When ChatGPT told him "look around line 72 and overwrite this section," he had to do something with that instruction. He couldn't read the code. He couldn't reason about whether the change was safe. He couldn't even tell if Claude had identified the right line. So he just did it, ran the result, and observed.

That sounds reckless. In a production environment with 12 engineers, customers, and a service-level agreement, it would be reckless. But Brian wasn't running a production environment with 12 engineers. He was running a thing he'd built by himself, with himself as the only user, and a clear failure signal: *did the thing he wanted happen, or didn't it.*

The constraint forced him into a tight feedback loop. Build, observe, iterate. Build, observe, iterate. He shipped a v1 of a game that he says was "not great," put a feedback button on it, and watched 6,000 people leave him notes. He used the notes to build v2, v3, v4. The feedback loop was so tight that the absence of code-reading skill barely mattered.

Senior engineers, by contrast, have the privilege of reading the code. They can pause at any point and inspect. They can look at the diff and worry about it. And many of them spend so much time inspecting and worrying that the feedback loop never tightens. The build–observe–iterate cycle stretches out into build–inspect–debate–revise–inspect–debate–maybe-merge, and somewhere in that stretch, the velocity advantage of AI evaporates.

We've covered this before from the other direction — see [Let Builders Build](/blog/let-builders-build/) — but Brian is the live demonstration. *Inability is a forcing function.* When you can't fall back on inspection, you have to fall forward into shipping.

## Where the Tax Becomes a Premium

Now: this would be a bad essay if we ended it with "expertise is bad, just vibe code your enterprise migration." It isn't, and please don't.

What expertise actually buys, in the AI era, is *direction*. Brian can ship anything Claude can produce. What he can't always do — and admits he can't — is decide which of three architectural options is the one to take. He can't always tell when Claude has confidently picked the wrong abstraction. He can't always look at a feature and know that the right way to structure it is going to save him three weeks in six months.

Senior engineers can. The expertise that taxes them on speed is the same expertise that pays back on judgment.

Which is why the model we keep landing on, with our clients and ourselves, is: **the human as orchestrator and director, not as inspector.** Stop treating Claude like a junior dev whose code you have to read line by line. Start treating Claude like a senior staff engineer whose decisions you direct. You bring the judgment about *what* and *which*. Claude brings the speed of *how*.

Brian is doing this without realizing it. He picks the problem. He defines the success criteria. He breaks the work into 94 tasks. He reviews the output against a template. He decides when something is done. He never reads the code.

The senior engineers we work with would benefit from doing more of what Brian does — and Brian, in turn, would benefit from a senior engineer's instinct on the 5 % of decisions where direction is everything. That's actually most of what we end up doing on a Shipwright engagement: bringing the architectural judgment to a builder who already has the velocity. Or bringing the velocity discipline to a senior team that already has the judgment. Either direction works. Both directions need the human in the loop, just at different altitudes.

## The Last 5 %

Brian flagged a thing on the podcast that we hear from every entrepreneur we talk to right now: "I keep meeting builders who are 95 % of the way there, and stuck on the last 5 %."

The last 5 % is the boring stuff. It's the deploy pipeline. It's the database that keeps timing out under real traffic. It's the secrets that need to live somewhere that isn't a `.env.example`. It's the SSL certificate. It's the fact that "ship it" actually means "make it survive being touched by strangers."

Claude can't reliably do the last 5 %. Not yet. Maybe not ever, depending on which of us you ask. But the gap between "AI can build the feature" and "the feature is in production serving real users" is where engineering experience compounds — and it's where most of the lasting value of senior engineers is going to live for the foreseeable future.

This is why we built the Shipwright bundle the way we did: the agent system handles the build, and Dan and I handle the last 5 %. It's not that Claude *can't* eventually learn to deploy and harden infrastructure. It's that we're not willing to bet a client's launch on the version of Claude that's three releases away. So we ship the autonomy that's working today, and we cover the gap that isn't yet, with our actual hands.

For senior engineers reading this: that gap — the deploy, the secrets, the perf, the production-readiness — is where your expertise is least taxed and most valuable in the AI era. It's also where most teams are bleeding the most time. If you're trying to figure out where to lean in, lean there.

## What to Take From This

Three things we've taken from working with Brian, and from a few months of watching this pattern repeat across a dozen clients:

**The fastest learners we see are the ones who can't read the code.** They're forced into tight feedback loops and they ship before their fear catches up. That speed compounds. Don't be condescending about it.

**The most valuable senior engineers in the AI era are the ones who can put down the inspector's magnifying glass.** Spend less time reading line-by-line and more time directing the system. The orchestration role pays better than the inspector role, both in dollars and in shipped features.

**The bottleneck is moving.** It used to be "can we write the feature." It's becoming "can we make the feature survive contact with reality." That's not where AI is strong yet. That's where you, with twenty years of incident reports, are very, very strong.

Brian closed our conversation by quoting the Matrix: *take the red pill.* He meant it the way most builders mean it right now — that once you see what's possible, you can't unsee it, and you start working harder than you've ever worked because the ceiling moved.

We'll close it the same way. The expertise tax is real. It's also optional. The engineers we know who've put it down are doing the best work of their careers.

The ones who can't put it down are still arguing about whether the diff is good.

---

*This post is adapted from [The Velocity Lab podcast](https://podcasts.apple.com/podcast/the-velocity-lab/id1888653618), Episode 15: From Notepad to Claude: A Non-Coder Builds an AI Empire.*
