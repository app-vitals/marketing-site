---
title: "What to Say When the Board Asks About AI"
date: "2026-04-28"
author: "Dave O'Dell"
category: "AI Adoption"
excerpt: "Six questions every board is asking executives about AI right now — inventory, tooling, accountability, ROI, competitive pressure, and institutional knowledge. Here's how to walk in with real answers instead of getting caught flat-footed."
readTime: "9 min read"
---

I don't think board members care about culture very much. Not in this day and age. Bottom line — are you guys shipping?

That's where the board conversation about AI starts now. Five years ago there were soft questions: how's the team feeling, what's the retention story, is the engineering culture healthy. Those questions still get asked, but they're not the ones that set the tone of the meeting. The headline questions are about velocity, competitive position, and whether the AI investment is producing anything you can point to.

We work with executives running AI adoption inside their companies — across engineering, marketing, support, ops. The same set of questions surfaces every time. The execs who can answer them cleanly leave the meeting with confidence. The ones who can't are usually surprised by how much they don't know about their own organization.

This is the list. Six questions. If you can't answer them today, you have a project for the next 90 days.

## 1. Do We Have an Inventory of Where AI Is Operating in the Company?

Most leaders can't answer this. It's the first failure point.

AI is in more places than the engineering org. There's an agent running in the call center. Marketing has a content tool with a model under the hood. The recruiting team is using a screening assistant. The CFO's team has been running a forecast model since Q4. Sales ops bought something through a marketplace integration that nobody on the leadership team has logged into.

When the board asks "where is AI operating in our company?" the honest answer for most companies in 2026 is "I'm not totally sure, let me get back to you." That answer doesn't work for two reasons. One, it signals you don't have visibility into a strategically important capability. Two, every place AI is touching customer data, employee data, or operational decisions is a place that needs governance — and you can't govern what you can't see.

The fix is a quarterly AI inventory. By department, by tool, by use case, by data access. Owned by someone. Refreshed in writing. Reviewed at the board level. It's not glamorous, but the next set of questions all build on this one.

## 2. What Tools Are We Using and Who's Using Them?

This is the inventory question's evil twin. Even where there's visibility into AI use cases, there's almost never visibility into the tooling sprawl.

The pattern we see, over and over: someone in engineering bought GitHub Copilot two years ago. Someone else added Cursor. A few engineers got Claude Code licenses last quarter. Three people are using their personal ChatGPT for work. One product manager has been quietly running Gemini for content drafts. Marketing has Jasper. Support has its own assistant baked into Zendesk.

This isn't an AI strategy. It's a procurement strategy.

The economic argument for picking one tool and standardizing is the part most leaders underestimate. A bunch of individuals using AI is more productive than a team without it. But a team using the same AI together is roughly 10x more productive than a team where everyone has their own tool.

Why? Because the wins compound only when they can be shared. The prompt that works gets posted in Slack. The agent context — your `CLAUDE.md`, your docs, your runbooks — gets written once and benefits everyone. The internal training scales. New hires onboard onto a single platform with documented patterns instead of being told "pick whatever feels good."

Pick one tool. Make it the standard across the org. Pay for the enterprise tier so you can instrument it — Cloud Code Enterprise gives you per-team token dashboards, usage analytics, governance controls. The cost per call is higher than the team plan, but the visibility unlocks everything downstream: actual ROI numbers, governance, accountability, and the ability to make adoption a measurable initiative instead of a feeling.

## 3. Who's Responsible When Something Goes Wrong?

Boards ask this in different ways. "What's our risk exposure?" "What happens if the AI does something it shouldn't?" "Are we okay legally?" Underneath all of it is one question: when an agent ships something that breaks, whose fault is it?

We've covered the agent-accountability gap on the show before, but the short version is this: the company has to take a calculated risk on AI, and the individual using the tool needs a no-fault, no-blame postmortem policy when something goes sideways.

You need both halves. Without the calculated-risk framing, AI adoption stalls — every team becomes too risk-averse to use the tools, because the personal downside of "your agent broke prod" outweighs the upside. Without the no-fault postmortem policy, you get the opposite failure mode: people use the tools, but they hide what they did, which means you can never learn from incidents and the institutional risk grows silently.

Write the policy down. Distribute it. Make it real. The exact language matters less than the fact that everyone in the org knows it exists. Something like:

> We encourage the use of approved AI tools to accelerate work. We acknowledge this introduces risk. If something breaks because of an AI-assisted change, and the engineer was acting in good faith, no individual will be blamed. We will run a no-fault postmortem and put process or tooling in place to prevent the next occurrence.

The board doesn't need the legal-perfect version. They need to know you've thought about it and a real policy exists. Then they can move on to the next question.

## 4. What's the ROI?

This is the question that exposes the soft adoption stories.

The honest answer for most teams in 2026 is "it feels faster." That's not an answer a board will accept. "Feels" isn't measurable, and worse — there's published research showing that people who report feeling more productive with AI often aren't, when you measure outcomes.

The number we believe in is dead simple: pull requests deployed to production, by team, per week. Before-and-after the rollout.

Why this number?

- It's outcome-based, not effort-based. "Lines of code shipped" and "PRs opened" are vanity metrics that go up the moment you turn on AI, regardless of quality.
- It's downstream of every other engineering process — review, CI, deploys, on-call. If your AI rollout makes any of those slower, deployed PRs goes down. If it speeds them up, the number goes up.
- It's defensible at the board level. You can show the trend. You can attribute it. You can hold teams accountable to it.

We've watched this metric on our own work. One engineer on our team — me, actually — shipped 20 PRs across our own product last week, plus 30 billable hours of client consulting work. That's a week of output that's not possible without the agent doing the writing while the human reviews. Five years ago that engineer was me, working solo, shipping maybe 5-8 PRs a week if everything was going well.

That's the kind of number you bring to a board. Not "AI is great." A real before-and-after, by team, with the trend line.

If you're not measuring this yet, the easiest thing to put in place this week is a weekly export from your deploy system into a dashboard. Per team. Stacked over time. Annotated with rollout milestones. That dashboard is what you bring to the next board meeting.

## 5. Are We Keeping Up With Competitors?

This is the question that worries CEOs at night.

It's also the hardest one to answer, because most of what your competitors are doing is invisible from the outside. You can see their shipped product, their job postings, their LinkedIn announcements. You can't see their internal velocity, their adoption rate, their tooling stack, or their leadership team's level of seriousness about this.

The thing to remember is that the gap is compounding right now, faster than at any prior moment in software's history. A team that's 20% more efficient than yours without 20% more headcount is winning every single day. They're shipping features faster. They're paying down tech debt while you accumulate it. They're closing deals on capabilities that don't exist on your roadmap yet.

A 20% lead in 2026 is not a 20% lead in 2027. The compounding takes care of that.

The honest answer to give the board: "We don't know exactly what our competitors are doing internally, but here's our trajectory and here's how we're tracking it." Then show them the deploy-PRs-per-week trend from question 4. Show them the AI inventory. Show them the tooling standardization. Show them the policy for accountability.

What you're really telling the board is: "We have a system. We're measuring it. We're improving it. If our competitors are doing the same thing better, we'll see it in our numbers and adjust."

That's a different posture than "we hope AI works out for us." Boards know the difference.

## 6. Are We Losing Institutional Knowledge as We Automate?

This question lands differently than the others. It's quieter, more philosophical, and most boards bring it up in the second half of the meeting once the velocity questions are answered. But it's a real concern.

If Claude is doing the work, and the engineer is reviewing, will the engineer five years from now still know how to do the work without Claude? If something breaks at 3 AM and the AI tools are down, who can troubleshoot it? Are you accidentally turning your engineering team into a layer of reviewers who can't operate the underlying system?

Our answer: counterintuitively, your institutional knowledge should be getting better, not worse. The mechanism is automation of the documentation itself.

Run a nightly cron on every repo. The job: read the recent commits, check the docs, check Notion or Confluence, find anything that's drifted out of sync, and update it. Open a PR with the changes. The engineer reviews and merges in the morning. By the end of the quarter, your docs are more current than any human-maintained system has ever been.

Same pattern for runbooks. When something breaks at 3 AM, you don't want a tribal-knowledge incident. You want a runbook with current commands, current owners, current escalation paths. Have the agent maintain that, too. It's a trivial nightly task.

The deeper insight is one we keep coming back to: everything Claude needs to know is the same thing humans need to know. If your docs are good enough for the agent to operate from, they're good enough for a human in a 3 AM emergency. The agent forces you to maintain the institutional memory that humans-only orgs let decay.

## What This Adds Up To

Six questions:

1. Where is AI operating in the company?
2. What tools are we using and who's using them?
3. Who's responsible when something goes wrong?
4. What's the ROI?
5. Are we keeping up with competitors?
6. Are we losing institutional knowledge as we automate?

If you can answer all six cleanly with real numbers and written policies, your board meeting goes well. If you can't, you have a project list. None of the work is exotic. Most of it is operational discipline that's been overdue for years and that the AI conversation is now forcing into the open.

The pattern we see in the field is consistent. The leaders who get out ahead of these questions look very different two quarters later from the ones who get caught flat-footed. The compounding window is months, not years. A 90-day delay in answering question 4 well is a year of lost competitive ground.

If you're trying to figure out which of these six gaps your team has, hit us up at [App Vitals](/contact). Our [AI Velocity Assessment](/blog/ai-velocity-assessment) is structured around exactly these questions — we walk the org with you, identify what's missing, and tell you what to put in place before the next board cycle.

Listen to the full conversation on [The Velocity Lab](https://share.transistor.fm/s/950e4db5).
