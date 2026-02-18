---
title: "Why Tool Rollouts Fail (And What Works Instead)"
date: "2026-02-07"
author: "Dan McAulay"
category: "AI Adoption"
excerpt: "Top-down AI mandates fail. Champion-based adoption works. Here's the 6-week pilot model we use to make AI stick."
readTime: "6 min read"
---

I've watched the same movie play out at a dozen companies now. A CTO reads about AI productivity gains. They buy enterprise licenses for an AI coding tool. They send an all-hands email: "We're now an AI-first engineering organization." Three months later, utilization is at 15% and the licenses are quietly deprecated.

The tool wasn't the problem. The rollout was.

## The Mandate Trap

Top-down technology mandates have a dismal track record, and AI tools are no different. Here's why they fail:

**People adopt tools when they solve a problem they already have.** Not when someone tells them to. The developer who's frustrated with boilerplate will embrace an AI assistant overnight. The developer who's comfortable with their workflow will resist it for months — regardless of what the CTO says.

**Mandates create compliance, not adoption.** When you mandate a tool, you get people who check the box. They'll open the tool, use it superficially, and go back to their normal workflow. You'll see "adoption" in your dashboard, but no actual productivity change.

**One-size-fits-all doesn't work.** Different teams, different codebases, different workflows. The backend team working in a strongly-typed language with great test coverage has a completely different AI experience than the frontend team dealing with design systems and visual components.

## What Champions Look Like

In every engineering organization, there are people who are already experimenting with AI tools on their own time. They're the ones sharing prompts in Slack, writing custom configurations, and quietly shipping more than anyone expects.

These people are your champions. And they're the key to adoption that actually works.

A champion isn't just someone who likes the tool. They have specific characteristics:

- **They're respected by peers.** Other engineers listen to them — not because of title, but because of track record.
- **They can articulate value.** They don't just use AI; they can explain why it's useful and show others how.
- **They're pragmatic.** They know when AI helps and when it doesn't. They won't oversell it.
- **They're generous.** They naturally share what they learn. They want the team to get better.

You probably already know who these people are on your team. If you don't, ask around. They're not hiding.

## The 6-Week Pilot

Here's the model we use. It's not theoretical — it's what we run with real teams.

### Weeks 1-2: Identify and Enable

Meet with 3-5 potential champions. Pair with them on real work — their actual codebase, their actual problems. Not a demo environment. Not a tutorial.

The goal isn't to teach them the tool. It's to show them what's possible in their specific context. An AI assistant that can navigate their architecture, understand their patterns, and produce code that passes their CI pipeline.

By the end of Week 2, you'll know who your real champions are. They're the ones who are already experimenting on their own between sessions.

### Weeks 3-4: Create Quick Wins

Champions need visible wins. Not "I wrote this function 30% faster" — that's invisible to the team. They need wins that other people notice:

- A PR that would normally take three days, done in one
- A refactor that everyone agreed was needed but nobody had time for
- A bug fix that required understanding a part of the codebase nobody fully understood
- Documentation that was perpetually out of date, now current

These wins create curiosity. Other engineers start asking: "How did you do that?"

### Weeks 5-6: Enable Evangelism

This is where the magic happens. Champions start teaching others — not in a formal training session, but organically. Pair programming. Slack threads. Code reviews where they show AI-assisted approaches.

Your role shifts from enabler to support. You're available for questions, you help champions when they get stuck, but they're doing the teaching. By Week 6, the champions should be self-sustaining.

## Why This Works

The 6-week pilot works because it respects how humans actually adopt new tools:

**Social proof over authority.** People trust their peers more than their bosses. When a respected engineer on the team says "this changed how I work," it carries more weight than any executive mandate.

**Specificity over generality.** Champions teach using the team's actual codebase, patterns, and workflows. Not generic examples — real ones. "Here's how AI helps with our service mesh" beats "here's how AI helps with code" every time.

**Pull over push.** When other engineers see champions shipping faster and ask "how are you doing that?", adoption becomes pull-based. People are choosing to learn, not being told to learn. The psychology is completely different.

**Organic scaling.** Each champion naturally enables 3-5 other engineers. Those engineers enable others. By the time you've done this across 2-3 teams, you have a movement, not a mandate.

## Common Objections

**"This is too slow. We need everyone using AI now."**

No, you don't. You need a few people using it well, and then spreading that knowledge. A fast rollout with 15% real adoption is worse than a slow rollout with 80% real adoption.

**"What if we can't find champions?"**

You can. Every team has at least one person who's already curious about AI tools. If truly nobody is interested, that's a signal about your engineering culture that's worth understanding before you throw tools at it.

**"Our leadership wants metrics. How do we measure this?"**

Measure what matters: PR throughput, cycle time, deployment frequency. Not tool logins. Champions should be measurably outperforming their pre-AI baselines by Week 4. If they're not, something's wrong with the enablement, not the approach.

## The Real Goal

The goal of AI adoption isn't "everyone uses AI tools." It's "the team ships better software faster." Sometimes AI tools are part of that. Sometimes fixing the CI pipeline is more impactful. Sometimes it's better documentation. Sometimes it's clearer architecture.

Champions figure this out naturally because they're embedded in the work. They'll tell you what actually moves the needle — if you listen.

Tool rollouts fail because they start with the tool. Successful adoption starts with the people.
