---
title: "Where Do Senior Engineers Come From Now?"
date: "2026-05-28"
author: "Dave O'Dell"
category: "Technical Leadership"
excerpt: "If AI writes the code, being an engineer becomes planning and reviewing — staff and principal work. But that quietly removes the bottom rung of the ladder. So how does anyone become senior when there's no junior work left to learn from?"
readTime: "8 min read"
---

Here's a contradiction we keep walking into, and we say both halves of it out loud on the show without flinching.

The first half: if you're still writing code by hand in 2026, you're doing something wrong. We mean that. With a real harness, Claude codes faster and cleaner than either of us, and the highest-leverage thing a good engineer does now is plan and review — not type. We've made [that argument before](/blog/your-engineering-career-was-never-safe/), and we'll keep making it.

The second half: planning and reviewing is *senior* work. It's what a staff or principal engineer does. So if the entry-level job — write the code, get it reviewed, learn from the feedback, repeat — is the exact part we just handed to the machine, then where do the next senior engineers come from?

That's the question this episode circles and, honestly, doesn't fully answer. Neither will this post. But the shape of the answer is starting to show up in the engineers we actually work with, and it's worth laying out.

## The Ladder Lost Its Bottom Rung

The traditional path to senior was a grind with a purpose. You wrote a lot of code. Some of it was bad. Someone more experienced told you *why* it was bad — this pattern will bite you in three months, this abstraction is going to leak, this is the kind of thing that pages someone at 2am — and you internalized it. After enough cycles, you'd built the one thing you can't shortcut: a library of scar tissue. You knew what breaks because you'd broken it.

Reviewing a PR well is built entirely on that library. When a strong engineer reviews code, they're not checking syntax. They're running a simulation against everything that's ever gone wrong for them: what's the failure mode here, what does this look like at 100x the load, what assumption is baked in that won't hold. You can't fake that, and you can't download it. It's earned by doing the junior work.

So the uncomfortable math: we've automated the rung people used to climb, and we still need people standing at the top.

## What a Junior Engineer Actually Does Now

The encouraging part — and this came directly from working with people right out of college this year — is that good juniors haven't disappeared. Their job changed.

AI is an amplifier. The research keeps converging on this, and it matches what we see: AI makes mediocre engineers worse and good engineers dramatically better. The mediocre ones lean on it as a crutch and ship more confident garbage. The good ones use it as a force multiplier and the gap widens.

What a good junior does now is *add value on top of Claude*. The baseline — a clean PR off a ticket — is something the agent can do on its own. So the bar moved. A strong junior takes a feature idea or a requirement spec, plans it with Claude, iterates on that plan, and puts up a PR that's measurably better than what the agent produces unsupervised: fewer issues, more complete, aware of the things the model didn't think to ask about. That's a skill. On day one you might be no better than Claude. But every time someone tells you "don't do this, because X," you learn it and you don't make that mistake again — and the same feedback gets folded back into the agent's skills, so the harness gets smarter alongside you.

The payoff is that the climb compresses. What used to be a five-to-ten-year path to staff-level judgment now happens in a couple of years, because every cycle is faster and the feedback loop is tighter. Two things make a good junior right now: you know how to get things done, and you learn from experience. That's it. Those two traits are also exactly what accelerate you toward the senior role that still exists.

## Claude Isn't a Junior Anymore Either

Three months ago the consensus take — and we held it too — was that Claude is roughly a junior engineer. We've completely changed our minds.

With the right harness, Claude is a mid-level engineer, sometimes a senior one. Not "writes a function when asked" — it plans, writes the tests, runs the tests, lints, simplifies, checks its own PR. With [Shipwright](/blog/we-code-autonomously/), the harness our clients run, it does the full loop a solid junior would do, and it does it without getting tired or cutting corners at the end of the day. We've written about why [testing is phase zero](/blog/testing-is-phase-zero/) for exactly this reason: the harness is what turns a capable model into a reliable colleague.

That reclassification is the other half of the squeeze. The agent didn't just take the junior's old tasks — it leveled up past them. So the role formerly called "junior engineer" isn't just automated; the thing doing the automating is now operating a tier above where that role used to sit.

## The Interview Tell

If you can't define a role cleanly, you can at least figure out what you're hiring *for*. And here the signal has gotten sharper, not fuzzier.

The old technical interview had two modules: can you build something, and can you go deep on a system you've worked on. Both still apply. But there's a new filter sitting on top, and it's the cleanest one we've found.

**Anyone can vibe-code anything now.** That's not the differentiator anymore. "Show me what you built with Claude" is table stakes — everyone using these tools has a pile of side projects. The real question is the second one: *show me the system you built to build it.* Did you write the skill? The sub-agent? The harness? Because building a thing is now trivial, and building the system that builds the thing is the actual demonstration of engineering judgment.

That maps to a deep-dive you can't fake. Quiz someone on their harness — how it works, what they'd improve, what they learned, where it broke. Someone who built it can go six levels down. Someone who borrowed it can't. It's the same signal the old architecture deep-dive gave you, pointed at a new artifact.

There's a YC-flavored version of this we like too: skip the proxy entirely and have a candidate work with you for a week. You see how they actually operate, they solve something real. It self-selects for the people who can just get in there and ship — which, transition period or not, is the trait that survives.

## Builders Still Build — Somebody Still Maintains

The other tension the episode keeps coming back to: builders versus maintainers. An old mentor of mine framed every engineer as either a commando or a palace guard. We've modernized it to builders and maintainers, and I'll point you to [Let Builders Build](/blog/let-builders-build/) for the full org-chart version rather than repeat it here.

The new wrinkle is what "maintainer" even means once agents are in the loop. It's not guarding the codebase against change anymore. It's keeping the *harness* healthy — patching the holes where the agent made mistakes, fixing the skill that produced a bad pattern, making sure the metrics didn't quietly break when someone shipped a change. Builders build on top of the system; maintainers keep the system trustworthy. Both still matter. The ratio is the only real question, and most orgs still have it inverted.

And to be clear about who's actually shipping: it isn't us. Our autonomous agents live in the cloud and work 24 hours a day — they do the shipping. The other day I wrote a PRD with Claude locally, handed it to the agent, and it planned, cut a dozen tickets, and did the work. Feature shipped. The builder's thrill is still there; it just comes from queuing up 24 tasks in the morning instead of typing them.

## We Don't Actually Know Yet — and That's Fine

I want to be honest about the part we don't have figured out. We don't know what the junior role becomes. We don't precisely know what staff and principal look like when their main job is managing a fleet of agents. We're in a genuine transition period, and anyone selling you a tidy org chart for 2028 is guessing.

But here's the thing that isn't doom and gloom. In a year or two, engineers will grow up with Claude the way our generation grew up with Stack Overflow and autocomplete. They won't need to be taught that the agent writes good code — they'll expect it, and they'll build from a baseline we had to learn. The definition will settle. It always does.

What doesn't change is the requirement to adapt. The engineers who are kicking ass in this space right now — the ones who'll advance no matter what the titles end up being — all share the same trait: they get in there, they build, they learn, and they don't wait for permission to figure out the new tools. The path to senior got weirder. It didn't get closed.

---

*This post is adapted from [The Velocity Lab podcast](https://podcasts.apple.com/podcast/the-velocity-lab/id1888653618), Episode 23: Anyone Can Vibe Code. Did You Build the System?*
