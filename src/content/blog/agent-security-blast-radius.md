---
title: "Your Agent Can't Delete What It Can't Touch"
date: "2026-10-19"
author: "Dave O'Dell"
category: "Technical Leadership"
excerpt: "Two years ago an AI mistake meant a typo. Now it can mean a leaked secret or a dropped database. Agent security is the new DevSecOps, and the answer isn't a smarter model. It's a smaller blast radius."
readTime: "6 min read"
---

Two years ago, when an AI hallucinated, the worst case was cosmetic. A misformatted screen. An image that came out wrong. A word spelled badly. You laughed, you fixed it, you moved on.

That's not the world we're in anymore. Go search YouTube for agent horror stories and you'll find plenty: leaked credentials, wiped environments, a production database gone in one confident command. Some of those happened with a human sitting right there in the loop, copy-pasting something into a terminal they didn't fully read.

What changed isn't that the models got worse. They got much better. What changed is that we handed them the keys.

Dan and I spent this week's episode on why agent security is the new DevSecOps, and why the safest place to run an autonomous agent might surprise you.

## Agents are only valuable when they run on their own

Let me be blunt about something first. An agent that needs you watching it is just a slower version of you.

Having Claude open in a console in front of you, approving every step, is fine for some work. But it doesn't save meaningful time or money. The value of an agent comes from building a system and letting it run autonomously, in the cloud, while you do something else. That's the whole multiplier.

Dan put it more gently than I did: agents still add value when you're in the loop, but the real return comes when they're working on their own.

The catch is obvious. The moment nobody is watching, the human safety net is gone. So the question becomes: what replaces it?

## The model will protect you. Usually.

The model labs are doing real work here. Safety protections are increasingly built into the models themselves. I ran into this last week: the latest model flatly refused to run something locally. I switched to an older model, ran the exact same command, and it went straight through.

That tells you two things. The protections are real and getting stronger. And they're not something you can build a security posture on.

Models are probabilistic. They can make one decision on Monday and a different one on Tuesday with the same input. If a model has access to delete your database, 99.9% of the time it'll choose not to. Dan's response on the show was the right one: "Yeah, but it is possible."

At scale, 0.1% isn't a rounding error. It's a schedule.

## Security comes from infrastructure, not intelligence

Here's the part people miss. You don't need the model to make the right choice if the wrong choice isn't available to it.

If the GitHub token you give an agent doesn't have permission to merge a pull request, it cannot merge a pull request. Black and white. It doesn't matter how clever the model is or what it decides. There is no workaround. Use the newest model from outer space and the answer is still no.

That's the shift in thinking. Stop trying to make the agent trustworthy enough to hold every key. Give it only the keys it needs, and make the rest physically unreachable.

Concretely, that looks like:

- **Start from zero.** By default the agent has access to nothing. Not the internet, not your buckets, not your databases.
- **Grant narrowly.** Our agents can reach the model API, GitHub and Slack. Not the whole internet, just the specific endpoints they need.
- **Leave out what isn't required.** Our agents can't touch storage buckets. Not because we wrote a rule telling them not to, but because we never gave them access.
- **Keep state contained.** Each agent gets its own persistent volume for memory, and that's the extent of its footprint.

If something goes wrong in that environment, and eventually something will, the blast radius is tiny. It can't reach anything it was never connected to.

## The surprise: the cloud can be safer than your laptop

We work with a client that handles payment card data. They take security extremely seriously, as they should, and I respect them for it. When we looked hard at their setup together, we landed on a conclusion that sounds backwards at first.

Running an autonomous agent in their cloud is less risky than having engineers run agents locally on their laptops.

Think about what a developer's laptop can reach. Elevated permissions. Credentials for dev, sometimes staging, occasionally production. Years of accumulated access that nobody has audited. An agent running there inherits all of it.

The agent running in their cloud inherits nothing. It can reach exactly what they chose to give it, and nothing else.

This has flipped over the course of the year. Early on, when Dan and I were installing [OpenClaw](/blog/stop-chatting-get-an-ai-assistant/), the advice was don't put it in the cloud, and if you're a careful developer maybe you can run it on your laptop. We put ours on Raspberry Pis because we didn't want them on our laptops. That was the step before the cloud. Now, with proper isolation, the cloud is where we'd tell most teams to start.

## In the loop locally, autonomous in the cloud

None of this means local AI is off the table. Dan does a lot of planning work locally with clients who have strict rules about it, and planning is low risk. It isn't making changes or touching systems, and you expect to be in the loop. When it stops halfway to check in, that's fine. That's the point.

The split we've settled on is simple. Locally, you're in the loop and you expect interruptions. In the cloud, the agent works on your behalf autonomously, and you can trust it because of what it can't reach, not because of what it promises.

## Don't aim to prevent everything

One last thing. Your security goal can't be preventing every possible bad outcome. If a person inside your company who already has access decides to do something nefarious, there's very little any system can do about that.

Agent security is about something narrower and more achievable: preventing accidents. Your agent isn't waking up in the morning wondering when it gets to delete a database. But on the rare day the dice come up wrong, you want the worst case to be boring.

I apply the same rule at home. My personal assistant knows which credit cards I have, because that helps with rewards programs. It will never have a card number. Would it be more convenient if it could just buy things for me? Sure. Why take the chance?

That's also why we built [Shipwright](/blog/shipwright-oss-origin/) to run inside your own infrastructure rather than ours. If a shared, hosted platform gets compromised, every customer on it is exposed. If our own cluster has a problem, our clients aren't affected, because each one runs in their own isolated environment and controls exactly what it can touch.

Everyone is going to be running agents. The teams that do it safely won't be the ones with the cleverest models. They'll be the ones that were smart about what they gave those agents access to.

---

*This post is adapted from [The Velocity Lab podcast](https://podcasts.apple.com/podcast/the-velocity-lab/id1888653618), Episode 42: Your Agent Can't Delete What It Can't Touch.*
