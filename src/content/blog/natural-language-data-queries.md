---
title: "Your Data Team Is the Bottleneck. Here's How AI Fixes It."
date: "2026-06-02"
author: "Dave O'Dell"
category: "Engineering Velocity"
excerpt: "Every company has dashboards nobody reads and engineers constantly fielding data requests. Natural language queries via Claude change the math entirely — and it's not about replacing your data team."
readTime: "7 min read"
---

Picture this scene: someone's on a call. They pull up a project dashboard. Ten questions immediately fly — "Can you scroll down? Where's this metric? Why doesn't that number match what I expected?" The meeting grinds to a halt while someone scrambles to find the right view.

This happens every day, in every company, on every team. And for the last decade, the answer has been the same: file a ticket, find the dashboard person, wait.

Dan and I have been breaking that pattern with our clients. The tool doing it is Claude. The result is something that sounds simple but changes the entire relationship between non-engineers and company data.

## The Dashboard Problem Nobody Talks About

Every organization I've worked with has the same painful relationship with dashboards.

Someone builds the canonical company dashboard. It works. People trust it. Then, six months later, a data pipeline changes. A field gets renamed. An engineer ships something that affects the downstream transform. Now half the numbers are wrong, and the dashboard just silently serves stale data while everyone keeps presenting it in meetings.

Or worse: the person who built it leaves. Now nobody knows what any of the fields mean. You have a dashboard that technically loads, but requires institutional knowledge to interpret.

The other problem: dashboards were built for the average user. The sales lead who wants to see conversion by territory. The engineer who needs error rates by service. The PM who wants feature adoption trends. A single dashboard cannot be optimized for all three — so it tries to serve everyone and ends up truly serving no one.

## What Natural Language Queries Actually Look Like

Here's what we've built for a few clients now: an MCP server that sits in front of their data warehouse (typically Snowflake, but the pattern works with any structured data source) and translates natural language requests into actual queries.

A non-technical employee opens Claude Code Desktop. They type: "Show me this month's conversion by channel, broken out by week, in a bar chart." Claude constructs the SQL, runs it against the warehouse, and renders the visualization — right there.

Don't like how it looks? "Make the bars blue and add a trend line." The visualization updates.

Want to share it? "Export this as a PDF." Done.

No ticket. No waiting. No dashboard dude.

This is what we mean when we talk about giving non-engineers access to company data. Not read access to a shared spreadsheet — actual, on-demand query capability, personalized to the individual.

## The Colorblind Use Case

I'm colorblind. It's a small thing, but it's real: when someone hands me a red/green dashboard, I literally cannot distinguish what they're showing me. Red-green is the most common form of colorblindness, and standard data visualization tools default to it constantly.

Dan doesn't have that problem. So Dan and I could be staring at the exact same data, built the same way, and it would be a completely different experience for both of us.

With natural language queries, I just ask for colorblind-friendly palettes. Dan asks for whatever makes sense to him. We both get something that actually works for us as individuals — built on the exact same underlying data, generated in real time.

This sounds like a minor UX improvement. It's actually a fundamental shift in who data serves.

## Building the System (the Part That Isn't Free)

Here's what we tell every client upfront: this doesn't happen for free. It takes work. But it's a specific kind of work, and once it's done, the system maintains itself.

The first step is documentation — not the kind you write once and forget, but living documentation that actually reflects how your data moves through the system.

Claude can help you build this. You point it at your source code to see how data is used in the application. You point it at your transformation layer to see how data is shaped before it hits the warehouse. You point it at the warehouse itself. Claude synthesizes all of that into a description of your data that's specific enough to generate correct queries.

The key word is "correct." This is where subject matter experts still matter, and they'll always matter. You need the people in your organization who actually understand the data to guide Claude in building this documentation. Not just dumping schema definitions — actually explaining what fields mean, what edge cases exist, what the gotchas are. That institutional knowledge doesn't disappear. It gets encoded into the system.

Once the documentation exists, a nightly cron job checks what changed in the last 24 hours — new fields, modified pipelines, schema updates — and updates the documentation and MCP tooling descriptions accordingly. The system stays current without manual intervention.

That's the unlock: you do the hard work once to get it right, and then the system evolves with your codebase rather than drifting away from it.

## Verification as a Feature

One thing Dan raised that I think is underappreciated: showing the data isn't just about answering the question, it's about building trust.

You could ask Claude: "Is this feature working?" And Claude might say: "Yes, it's working." But Claude could say that and be wrong — not hallucinating exactly, but inferring from incomplete context. "Yes" is an easy answer.

When you instead ask Claude to "show me the data for this feature's adoption over the last 30 days," you're forcing a different kind of answer. You can see the numbers. You can verify the graph makes sense. You can catch it if something looks off.

This matters especially when you're about to present findings to stakeholders. There's a meaningful difference between "Claude told me X" and "I looked at the data, Claude helped me interpret it, and here's what it shows."

The visualization step adds a verification layer that pure text answers don't have. It slows down the query slightly and adds a step, but the confidence it builds is worth every second.

## The Agent Frontier

Here's where this is going: once your data is queryable, accurate, and trusted, you can let agents operate on it.

Right now, we're talking about humans asking questions. That's already powerful. But the next step is agents that watch your data and surface anomalies without being asked. Agents that notice when a key metric drops below a threshold and trigger an investigation workflow automatically. Agents that prepare the data summary before your Monday morning standup so the first five minutes aren't spent pulling up the right dashboard.

None of that works if the underlying data layer isn't reliable. Getting natural language queries right is the foundation. The agent layer is what you build on top.

We're working on this with a couple of clients right now. The early signal is strong. The data-driven decision loop that used to require a human at every step is starting to close on its own.

## What This Isn't

One clarification, because I've seen this framing pop up: this isn't about eliminating your data team.

You still need subject matter experts. You still need people who understand the data well enough to know when something is wrong. You still need engineers who can build and maintain the MCP server and the cron jobs that keep the documentation current.

What you're eliminating is the tax on those people's time. The constant stream of "can you make me a report" requests. The dashboard maintenance tickets. The meeting interruptions where someone needs to pull a number that should have been available in 30 seconds.

Your data experts get to do expert work instead of answering the same question for the fourteenth time this month.

That's the real value. Not eliminating people — giving them back time to do what they're actually good at.

---

*This post is adapted from [The Velocity Lab podcast](https://podcasts.apple.com/podcast/the-velocity-lab/id1888653618), Episode 25: Ask Your Data Anything: Natural Language Queries for Non-Engineers.*
