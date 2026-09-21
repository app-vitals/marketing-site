---
title: "Sharing Proof, Not Promises"
date: "2026-09-21"
author: "Dan McAulay"
category: "Company Updates"
excerpt: "A client asked how they'd know Shipwright would still be maintained in six months. We didn't have a good answer to give them in words, so thirteen days later we gave them the repo instead — false starts, a ten-day landmine, a four-failure night, and all of it sitting in public git history for anyone to go read."
readTime: "6 min read"
---

*Sixth post in the series on how Shipwright actually came together — [the first one](/blog/cloud-agent-review-origin/) covered the cloud review pipeline, [the second](/blog/openclaw-todos-origin/) covered OpenClaw and the original todo list, [the third](/blog/vitals-os-merge-origin/) covered the merge into Vitals OS, [the fourth](/blog/task-store-origin/) covered the task store, [the fifth](/blog/shipwright-loop-origin/) covered the dispatcher that actually runs the pipeline today. That post ended with a promise: pulling Shipwright out of the Vitals OS monorepo and putting it in front of anyone who wants to run it themselves. This one's that story — and the reason we actually did it wasn't a roadmap milestone, it was a question we didn't have a good answer to.*

A client asked us, directly, on a call: how do we know Shipwright will still be maintained six months from now? Fair question. We didn't have a good verbal answer for it — "trust us" isn't an answer, it's a request. We'd already been circling open-sourcing the harness before that call. No VC backing means no roadmap promises we can point to as collateral; an open-source product is one a developer can evaluate on its own evidence instead of taking our word for it. But circling an idea and doing something about it are different things, and that call is what moved it from the first column to the second.

## Thirteen Days

`app-vitals/shipwright` didn't exist until June 6th. Warchild scaffolded it from nothing that day — not a gradual drift out of the monorepo, an actual extraction with a start date. Two days later, `sydecar-shipwright` — an early test agent — got decommissioned, which reads like exactly what it was: a dry run to prove the new harness worked before anything real touched it.

The migration tooling came next, June 11th and 12th — a script to move an agent from the old runtime onto Shipwright, with a dry-run mode, and a note in the commit body that it had been verified read-only against all 30 of Bodhi's live crons (19 user, 11 system) before anyone let it run for real. The rollout order was explicit and canary-first: okwow migrated June 12th to prove the path, then the rest followed over the next several days, each one dropping the old runtime's secrets once it was confirmed over. June 17th, the last agent came online and the migration runbook got deleted the same day, marked complete. June 18th, one commit — `c427c7a6` — deleted the entire legacy `agent/` workspace: 17,165 lines across 107 files, the old Helm chart, the interceptor service, the database tables, the role. The commit message doesn't hedge: "All agents now run via Shipwright harness."

Thirteen days, start to finish. Across both repos: 429 commits, roughly 400 merged PRs, one repository inflating from zero to 124,954 lines added while the other shed 105,487 — one side ballooning, the other hollowing out, at the same time. June 17th, the day before the cutover, was the spike: 46 commits in the old repo, 39 in the new one, in a single day.

## Whose Hands Were Actually on This

It'd be easy to read those commit counts as "Dave worked on this repo, I worked on that one" — the numbers even come close to splitting that way if you don't look closely. That's not what happened, and it's worth being precise about it instead of letting the easier story stand. Tasks weren't divided by person; they came off one shared queue, and more precisely than that: a lot of those commits are Shipwright's own loop — the dispatcher from last chapter — picking items off that queue and committing under whichever of our identities happened to be attached. Not "his agent versus my agent." The harness dogfooding its own extraction.

What Dave and I actually did during those thirteen days was plan, queue, unblock, and verify. We trusted the pipeline to run unattended through dev-task, review, patch, and deploy — not just to write code and hand it back for us to ship. That's a bigger claim than "AI wrote the code," and it's the one worth making plainly: the automation extended all the way through review and deployment, on infrastructure that was actively being replaced while it ran. I also blew well past my usage plan running this — landed around two thousand dollars over to Anthropic for the stretch, mostly in the June 16th–18th crunch. That's not independently verifiable the way a commit hash is, but it's consistent with two repos sustaining fifteen-plus commits a day for the better part of two weeks.

## Three Things That Almost Went Wrong

None of this went cleanly, and the honest version says so.

Early in the window, we built a standalone Kubernetes service for Shipwright — its own Terraform-managed database, its own Helm deployment. It merged. It never got applied. Three days later it was reverted, and the revert commit is specific about why: GCP had none of the resources the service would have needed, so pulling it back out was config-only — a whole architectural direction, built and killed, before the real shape (agents as their own deployments, no shared service) took over.

Midway through, on June 12th, we found something that had nothing to do with the migration at all. A separate service — `whisper-svc` — had been silently OOM-crashing on every single deploy attempt for ten days straight, since June 2nd. The commit that finally caught it says the last eighteen-plus deploys had gone red, "including the shipwright-agent bumps that had nothing to do with whisper." An unrelated bug had been quietly poisoning the exact deploy pipeline the migration depended on the entire time it was running, and nobody knew until someone went looking for something else.

Two days before the finish line, migrating Shipwright's own deploy service to GKE produced four failures in one night: encryption keys resetting on every upgrade and killing every live agent's auth token, a missing health check causing 503s on the admin service, OAuth redirects silently pointing at localhost in production, and a stuck deploy that cascaded into blocking everything behind it. All four hit the same night. All four got written up afterward as a named failure catalog in the migration runbook, not quietly patched and forgotten.

## The Part You Can Now Go Read Yourself

Any one of those three used to be the kind of thing that stays inside the company — a Slack thread, a line in an internal runbook, gone from memory within a quarter. Once the repo went public, that stopped being true. The reverted false start, the ten-day OOM landmine, the four-failure night — they're sitting in git history now, for anyone deciding whether to trust this tool to go read directly, not take from us secondhand.

Last chapter's "Blast Radius, Not Luck" section covered why the ship-and-patch week that ran the same month never touched a live client — Keanu was on a completely separate path from the pipeline that kept breaking, and there was no mechanism yet that pushed code onto a client's deployment automatically. Same fact applies here, and it's doing different work this time. It's not defending what happened — it's the reason we could afford to let it become visible at all. The chaos was real, but it was contained to our own fleet the whole time, so opening the door on it costs us nothing with the people running Shipwright and buys something with everyone deciding whether to.

That's the actual answer to the question this post opened on. Not a promise that nothing will break — a public record of what already did, and what we did about it.

## Why This Shape

Every post in this series comes back to the same test: does this piece earn its place by pointing at a specific problem it solved for a specific person. Open-sourcing Shipwright is the one place that test points outward instead of in. We didn't answer "will you maintain this" with a better sentence. We gave away the repo, mess included, and let anyone check the work themselves. That's a stranger, harder-to-fake kind of trust than a roadmap slide — and it's the same instinct this whole series runs on, just aimed at readers instead of at code.

Next up: the metrics journey — PostHog first, then a backend-agnostic pivot the moment this thing had to work for people without our accounts, and why we ended up querying the task store directly instead of a separate analytics platform at all.
