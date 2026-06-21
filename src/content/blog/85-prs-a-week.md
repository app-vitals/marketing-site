---
title: "85 Pull Requests in a Week: What Happens When You Stop Writing the Code"
date: "2026-06-01"
author: "Dave O'Dell"
category: "Engineering Velocity"
excerpt: "Last week our agents opened 85 pull requests. Not drafts, not experiments — reviewed, tested, deployable work. Here's the system behind that number, and why the job that's left is planning and reviewing, not typing."
readTime: "8 min read"
---

I looked at our metrics on a Monday morning and the number was 85.

Eighty-five pull requests, opened by our agents in the previous seven days. Not throwaway spikes or half-finished drafts — branches that synced main, wrote the code, ran the tests locally, passed CI, got reviewed, got patched, and in most cases shipped. Dan and I wrote none of that code. We planned it, we reviewed it, and the system did the rest, around the clock, whether we were at our desks or asleep.

That number is the whole argument. We've said it on the show a hundred times: *you don't need to code anymore if you build a system.* So we built the system. This is what it looks like when it runs.

## The agent and the workflow are two different things

People collapse "AI coding" into one idea, and that's where most of the confusion starts. There are two distinct pieces here, and you can run them independently.

The **workflow** is an agentic coding pipeline built on Claude Code skills — brainstorm a spec, plan it into tasks, build, review, patch, deploy. You can run that workflow locally on your own machine any time you want. I do, occasionally, when I'm adding a new feature and want to watch it work.

The **agent** is that same workflow given a home in the cloud, a persona, a name, and a Slack handle. Ours live in Google Kubernetes Engine, each with its own persistent volume between 40 and 100 gigs — delete the pod and the memory survives, because the volume isn't going anywhere. You talk to the agent in Slack. It writes code for you. It runs 24 hours a day, seven days a week. (Yes, we name them. We're Point Break fans, so the roster runs toward Keanu Reeves movie characters. Warchild has shipped more code than most engineers I know.)

The reason this matters: the agent isn't a chatbot bolted onto your repo. It's a workflow with persistence and context. When it boots, it learns your whole system — and if you organize that system well, it can move across your front end and back end without you holding its hand. This is the same lived practice I wrote about in [We Code Autonomously](/blog/we-code-autonomously/); this episode is the architecture underneath it.

## Why I turn everything into a monorepo

One design choice we made early: mostly one agent per repo. But I take it further — I've really embraced monorepos, and when a company doesn't have one, I organize the agent's workspace *as if* it were a monorepo anyway. A meta-repo that the agent owns.

The reason isn't ideology. It's context. When the agent has everything in one workspace, it can figure out what a feature actually touches — find the front-end repo, assess it, find the back-end repo, and write to its own workspace memory the details of how the whole system fits together. Scatter that across ten disconnected repos and the agent loses the thread. Keep it focused, and the memory compounds.

## The four crons that do the work

Here's the part that makes 85 a believable number instead of a marketing stat. After you plan — and planning is the part you actually do — four cron jobs take over: **dev task, review, patch, and deploy.** They fire every 30 minutes to keep things moving, but they don't burn a single token unless there's real work pending. A sanity check runs first: *are there any PRs open by me? Any tasks in the queue?* No work, no spend.

- **Dev task** is the heavy one. When it grabs the next item off the queue, it syncs the latest main, cuts a branch, does its research, writes tests first, writes the code, runs Claude Code Simplify, runs lint and the unit tests locally, and only *then* opens a PR. There are roughly 15 steps before that PR exists. Every one of them is a step a good engineer would do — and never skip — except the agent doesn't forget any of them, because they're written down. After the PR opens, it watches CI through up to six iterations, diagnosing and fixing failures by root cause until it's green or it gives up and waits for a human.
- **Review** reads the PR — the agent's own work, another agent's, or a human's — and leaves scored comments, each tagged from nit to critical.
- **Patch** picks up those review comments and resolves them. You don't tell Claude to fix anything. You review like you always would, and patch handles it. It'll even rebase and pull main into your branch when it drifts — which, with this many PRs open at once, happens constantly.
- **Deploy** merges, runs a mandatory canary, and promotes to production.

The loop between review and patch can run a few rounds — you patch two things, introduce a third, the next review catches it, patch resolves it. That's fine. That's how a careful human works too. The difference is it's happening while you're in a meeting, or asleep.

## The unglamorous secret: right-sized tasks

If you want to know why most "autonomous coding" demos fall apart in production, it's this. A task that produces a thousand-line pull request has a low chance of being right in one shot. A hundred-line change has a much higher one. The single biggest lever on success isn't the model — it's how well the work was sliced before the agent ever touched it.

So the plan session's real job is decomposition: take a PRD and break it into correctly sized, properly ordered tasks, with the blocking dependencies marked. Ten tasks, here's the order, here's what's blocked by what. The tasks can live in a local JSON file, in GitHub issues, in Jira, in Linear — wherever you already work. And critically, *you* don't have to do the slicing. The plan session does it for you. This is the same lesson from [Building a System to Build Code](/blog/building-a-system-to-build-code/): the system is the product, and the first two steps of the system — spec, then decomposition — are the ones we refine the hardest.

## Nobody deploys without a canary

Even after a merge to main, someone is watching. We always run a canary — they're mandatory — then promote to prod. If the canary's telemetry looks wrong, one APM too slow, it rolls back automatically and Slacks you. Not "hey, something broke," but "here's the exact thing that broke and here's what we think will fix it." You engage with the agent right there in Slack — *what's the root cause?* — and the deploy task, which has been watching the whole thing, has the logs and metrics ready.

This is the part people underestimate. So many teams sit and watch their deploys go out. You don't have to. The agent does it for you, and it only interrupts you when interrupting you is the right call. How much autonomy you grant is a set of knobs: disable the deploy cron entirely if you want every merge to be human-gated; let test-only and docs-only PRs merge themselves but require a human on anything touching production; turn self-review on or off. All tunable, per project, per client.

## Everything is measured

Every step the agent takes is metered — PostHog by default, Prometheus if you'd rather. Two reasons. The first is the morning question: *what did the agents do overnight?* The second is improvement. We watch commits-per-PR as our north star. The perfect world is one commit, one PR, merged — perfect after the first pass. Humans can't hit that consistently, and neither can the agents yet. But it's a measurable target, and as we tune the system and the models improve, the number creeps toward it. That's not an "agentic" idea. That's just software engineering: instrument the thing, then improve it on the evidence.

## The job that's left is planning and reviewing

So what do you actually do, once the system is running?

You plan, and you review. That's the job now. You spend an hour with the agent in Slack building a PRD — a good one takes time. You run the plan session and it turns into, say, 24 tasks. You approve, and you go to bed. You flip your laptop open Monday morning and there are 24 PRs, all done, all green, all ready to review and deploy.

Dan and I land in slightly different places on the last mile, and that's worth being honest about. I lean further into trusting the system — let it merge our own internal software when the tests and reviews pass. Dan still runs more things locally, verifies features by hand, watches more deploys go to prod. He'll tell you that's why he has a better track record of fewer outages, mitigated faster. He's not wrong. The point of the knobs is that you don't have to adopt my risk tolerance or his — you set them where your product and your customers need them.

But neither of us is writing the code. When I do step in, it's not to type. It's to say *that's not what I planned* — or to admit I planned it wrong. Even the intervention is planning.

## Where we fit

There are open-source takes on this kind of pipeline, and there are commercial tools in the neighborhood. We built our own, we named it Shipwright, we use it every single day, and we keep improving it on our own metrics — the [pipeline I described here](/blog/shipwright-autonomous-dev-pipeline/) is the same one running against this very business. The difference when you work with us isn't just the software. It's that you get the software *plus* Dan and me, hands-on, customizing the knobs and the extensions to your product and your stack — the last-mile infrastructure work that off-the-shelf tools don't touch.

Eighty-five PRs in a week isn't a flex. It's what "build the system" actually produces when you stop admiring the idea and go build it. The coding was never the hard part. The system is.

---

*This post is adapted from [The Velocity Lab podcast](https://podcasts.apple.com/podcast/the-velocity-lab/id1888653618), Episode 24: We Built an Agent That Ships 85 PRs a Week.*
