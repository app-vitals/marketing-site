---
title: "Pick One Project. Crush It. (Why Org-Wide AI Transformation Keeps Failing)"
date: "2026-05-16"
author: "Dave O'Dell"
category: "Technical Leadership"
excerpt: "We spent three months trying to transform whole engineering orgs at once. It didn't move the needle. The fix wasn't more time or more people — it was less surface area. Pick one project. Crush it. Then make the rest of the company copy you."
readTime: "8 min read"
---

We just changed how we work, and we want to tell you why — because the reason is the whole lesson.

For months, the offer was org-wide. We'd come into an engineering organization, get three months, and run two tracks in parallel. Track one: teach everyone how this actually works — what an LLM is, what Claude Code is, how skills and plugins and agents fit together, the stuff we do reflexively every day. Track two: sit with their SDLC, find the bottlenecks, and work alongside their developers to remove them.

It's a reasonable-sounding plan. It under-delivered. Not because the diagnosis was wrong — the bottlenecks were real and we found them — but because in three months across an entire org, you cannot make a measurable difference. The surface area is too big and the clock is too short. We've [written before](/blog/the-three-month-bet/) about why 20% time is the slowest way to adopt AI. This is the companion failure: even with our full attention, *org-wide* is the slowest shape to pour that attention into.

So we're reshaping it. Not dropping the work — narrowing it until it can actually land.

## The math that doesn't work

Here's the structural problem, and it's the same one in almost every engagement we've run.

Organizations say they want to transform. Then they don't allow enough time, and they don't dedicate enough focus. They want it to happen *around the edges* of everything else still shipping. So you get a hundred people each giving AI adoption a sliver of attention, supervised by consultants who are spread just as thin across the same hundred people. Divide three months by that surface area and the per-unit progress rounds to zero.

It's not a motivation problem on our end and it's usually not one on theirs. It's arithmetic. You cannot move a hundred-person needle in ninety days with fractional effort, no matter how good the people pointing at it are. [AI adoption doesn't fail because the tools are bad](/blog/why-ai-adoption-fails/). It fails because the rollout shape guarantees the effort gets diluted below the threshold where anything compounds.

A lot has also changed under us in those same three months. We're not evaluating SDLCs and theorizing about bottlenecks anymore — we have agents coding in the background for us, constantly, and we [ship our own product autonomously](/blog/we-code-autonomously/). We don't need to study your pipeline to find out what's slow. We know what agentic engineering looks like because we live in it. The job isn't diagnosis. The job is: pick a service, and let's go.

## The new shape: one team, one project, one repo

So the model flipped. Instead of embedding in a whole org, we embed in one team. Instead of one team, ideally one project — which can be a single repo.

And we want it to be a *big* project. Something that would normally take six-plus months, that we compress into roughly two. We onboard the repo, point agents at the codebase, and go: migrate the service, rewrite the service, do the thing that's been sitting on the roadmap because nobody had the bandwidth to start it. That last category is the sweet spot — [the migration you've been putting off](/blog/the-migration-youve-been-putting-off/) is exactly the kind of bounded, high-value, agent-friendly work that makes this model obvious instead of theoretical.

Constraining the surface area is the entire trick. It's the same reason a five-person company can disrupt an industry that a ten-thousand-person incumbent owns. Focus, no bureaucracy, a small group of strong people who can actually move. AI doesn't change that dynamic — it amplifies it. The constraint isn't a limitation you tolerate. It's the source of the speed.

## What the work actually becomes

There's a hard truth inside this for individual engineers, and we're not going to soften it: if your day is writing code, then waiting for someone to review it, then deploying it, then checking it works — that loop is already being solved by agents. Not "will be." Is.

The roles that survive most cleanly are the ones that were already mostly judgment. Staff and principal engineers spend their time planning, reviewing, double-checking, keeping the system sane. That's *exactly* the human-in-the-loop shape agentic engineering needs. The shift isn't that those people stop being valuable — it's that everyone else's job moves toward what those people were already doing. It's the same career transition a lot of senior engineers already made once, going from writing most of the code to reviewing most of it. AI just makes that transition mandatory and faster, because there's far more code flowing through review now, not less.

What's striking is how many engineers still aren't curious about this. That's the part we'd push on hardest if we were leading a team. [Resistance is the real bottleneck](/blog/engineering-ai-resistance/), not capability.

## You're not picking a project. You're building a system.

Here's the part that makes the "one project" model more than a productivity trick.

In the months you spend crushing that one project, the deliverable isn't just the shipped migration. It's the **system** you built to ship it — the skills, the plugins, the review loops, the [prepped repo](/blog/prepping-repo-autonomous-programming/) and the guardrails that let agents work safely. That system is portable. It works on your next project too. You might tweak it, add a step, drop one — but the expensive part, figuring out *how your org does agentic engineering*, is done once and reused everywhere.

So the small team is never really in a silo. They're shipping a real project on the roadmap *and* manufacturing the system in the same motion, and they're surfacing it to the rest of the org every week: here's what we did, here's what we saw, here's the tool we built. The output is two things at once — a project delivered faster than normal, and an engineering system the whole company can adopt. That's the actual asset. [Building a system to build code](/blog/building-a-system-to-build-code/) is the durable advantage; the shipped project is just the proof it works.

## The advice, stated plainly

If you're a CEO or CTO under board pressure to show AI velocity this quarter, here's what we'd do. Free advice, no hedging.

Don't transform the whole org. It's too slow and we've watched it not work.

Take your product roadmap. If there are six things on it, cut it to the two or three that matter most and kill the rest. Then take a *handful* of your best people — not a big group, a handful — and have them work only on this. One important project. The one you most need to move fast on.

Flatten the structure around them. Remove the bureaucracy. Let them ship, and let them build the system while they ship. At the end of the quarter you'll have delivered something faster than you would have, and you'll be holding a reusable engineering system you didn't have before.

Then you take that system to the next team, and the next. You open it up honestly to the people who haven't engaged: the industry is changing, here's the system, get on board or this isn't going to be the right seat for you. That's a real decision leaders are making — Block flattened and went all-in publicly — and it's a hard one. But the alternative isn't "stay comfortable." The alternative is going slowly while your competitors don't.

Dan and I are in one of these extreme growth periods ourselves right now. It's genuinely hard — the ground moves every day, Claude Code is effectively a different tool every ninety days, and keeping up is its own full-time discipline. But these periods are also the ones you come out of at 10x. That's true for individuals and it's true for orgs. The companies pulling ahead aren't flipping a switch. They're investing in a system. The ones doing it at 20%, org-wide, are spending real money to stand still.

Pick one project. Crush it. Build the system on the way. Then make the rest of the company copy you.

---

*This post is adapted from [The Velocity Lab podcast](https://podcasts.apple.com/podcast/the-velocity-lab/id1888653618), Episode 18: Pick One Project. Crush It.*
