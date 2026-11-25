---
title: "Claude Ship Is Here. We've Been Running This Loop Since March."
date: "2026-11-25"
author: "Dave O'Dell"
category: "Engineering Velocity"
excerpt: "Anthropic just launched Claude Ship, a review, patch, and approval loop for pull requests. It's the right idea, and it's the same loop we've run in Shipwright since March 2026. Here's how the two line up, what Ship doesn't cover, and the one thing I'd measure before you turn it on."
readTime: "6 min read"
---

This week Anthropic launched Claude Ship in beta. If you read the announcement and thought *that sounds familiar*, you're not imagining it. It's the loop we've been running on our own repos since March 2026.

I'm not saying that to pick a fight. I'm saying it because it's good news. When the company that makes the model ships a product built around review, patch, and approve, that tells you where the bottleneck in AI-assisted development actually is. It was never typing. It's everything that happens after the code exists.

## What Claude Ship is

Three pieces, as Anthropic describes them:

- **Code Review** (generally available). Multiple review passes over a pull request, with each finding checked adversarially before it's posted. Each repo picks a Quick, Standard, or Deep level.
- **PR Steward** (beta). Keeps a PR green by fixing failing CI, resolving merge conflicts, and working through review feedback. It comments after every push with what it changed and how to undo it. It's designed not to approve or merge.
- **Claude Approvals** (beta). A policy file in the repo, pitched as a smarter CODEOWNERS. It can approve routine changes or require a human, using Code Review's findings or your team's own natural-language classifiers.

Developers can run `/ship` in Claude Code to push, open the PR, get it reviewed, and work the feedback. Admins can turn it on per repo so it runs on every PR. It's on Team and Enterprise plans, GitHub only, and billed by token.

Anthropic's own advice is the part worth repeating: start with one repo, and run Approvals in observe-only mode until you trust it.

## How it lines up with Shipwright

[Shipwright](https://github.com/app-vitals/shipwright) is the open-source, Claude Code-based delivery pipeline we built at App Vitals. We [described the pipeline, multi-agent code review included, on March 25](/blog/shipwright-autonomous-dev-pipeline/), later open-sourced it, and laid out the full agent setup in [85 Pull Requests in a Week](/blog/85-prs-a-week/). The mapping is close:

| Claude Ship | Shipwright |
|---|---|
| Code Review | `/shipwright:review` |
| PR Steward | `/shipwright:patch` |
| Claude Approvals | Policy-controlled review posting and a merge gate |
| `/ship` | The dev-task, review, patch loop |

Review reads the PR and leaves scored comments. Patch picks up those comments, fixes them, and rebases when the branch drifts. The merge gate decides what is allowed to go through. Same shape, different packaging.

![The phases of the shipwright-loop in the Shipwright dashboard: dev-task, patch, review, plan-session, and merge](/img/blog/shipwright-loop-phases.png)

*The five phases of the Shipwright loop, straight from our dashboard.*

## Where the two differ

**Claude Ship starts at the pull request. Shipwright starts earlier and ends later.**

Before the PR, Shipwright handles the requirements, the planning session, the task store, and autonomous dispatch, so the agent knows what to build and picks it up without being asked. After the PR, it handles the merge and deploy. Claude Ship doesn't claim to cover either end, and it shouldn't. It's a review and approval layer.

**Shipwright already measures the outcome.** The metrics service tracks Review SHIP IT rate: reviews that came back with an immediate ship-it verdict, divided by total reviews, overall and by feature area. It's been on our metrics dashboard since April 5, 2026, more than seven months before Claude Ship launched. Anthropic's announcement cites PR volume and revert rate for its own team, which are good numbers, but I didn't see an equivalent measure you can point at your own repos.

**Claude Approvals is new to us.** A repo-level policy file that decides which changes can be approved without a person is a clean idea, and we haven't compared it side by side with how Shipwright decides what gets posted and merged. That's on the list.

## The one thing I'd do first

Pick your measure before you turn it on.

"The AI reviews our PRs" is a feeling. It becomes a fact when you can answer: what share of reviews pass cleanly, which areas of the codebase keep failing, and is that trending the right way? If you start in observe mode, as Anthropic suggests, use that period to establish the baseline. Otherwise you'll have no way to tell whether approving more without a person was a good call.

One cost note: Anthropic says a policy that uses Claude's review triggers a billed review even in observe mode. Budget for the observe period.

## Who should use what

If your team is on Claude Team or Enterprise, on GitHub, and your bottleneck is review and PR babysitting, try Claude Ship on one repo. That's a real problem and it's a quick way to find out how much it helps.

If you also want the work before and after the PR automated, or you want something open source you can read and change, Shipwright is there. They also aren't mutually exclusive.

Either way, the direction is settled. The teams pulling ahead aren't the ones whose AI writes code fastest. They're the ones who stopped waiting for review.

*Want help setting up an AI delivery loop on your team's repos? [Book a discovery call](https://cal.com/app-vitals/discovery).*

*Sources: [Introducing Claude Ship](https://claude.com/resources/articles/introducing-claude-ship) and the [Claude Ship docs](https://code.claude.com/docs/en/claude-ship).*
