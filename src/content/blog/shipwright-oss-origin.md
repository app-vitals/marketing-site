---
title: "Sharing Proof, Not Promises"
date: "2026-09-21"
author: "Dan McAulay"
category: "Company Updates"
excerpt: "A client asked how they'd know Shipwright would still be maintained in six months. We didn't have a good answer in words, so thirteen days later we gave them the repo instead — 429 commits, a shared queue with nobody's name on any of it, a night four things broke at once, and all of it sitting in public git history for anyone to go check."
readTime: "5 min read"
---

*Sixth post in the series on how Shipwright actually came together — [the first one](/blog/cloud-agent-review-origin/) covered the cloud review pipeline, [the second](/blog/openclaw-todos-origin/) covered OpenClaw and the original todo list, [the third](/blog/vitals-os-merge-origin/) covered the merge into Vitals OS, [the fourth](/blog/task-store-origin/) covered the task store, [the fifth](/blog/shipwright-loop-origin/) covered the dispatcher that actually runs the pipeline today. That post ended with a promise: pulling Shipwright out of the Vitals OS monorepo and putting it in front of anyone who wants to run it themselves. This one's that story — and the reason we actually did it wasn't a roadmap milestone, it was a question we didn't have a good answer to.*

A client asked us, directly, on a call: how do we know Shipwright will still be maintained six months from now? Fair question. We didn't have a good verbal answer for it — "trust us" isn't an answer, it's a request. We'd already been circling open-sourcing the harness before that call. No VC backing means no roadmap promises we can point to as collateral; an open-source product is one a developer can evaluate on its own evidence instead of taking our word for it. But circling an idea and doing something about it are different things, and that call is what moved it from the first column to the second.

## The Numbers

`app-vitals/shipwright` didn't exist until June 6th. Warchild scaffolded it from nothing that day — bun workspaces, CI, the metrics service ported over — not a gradual drift out of the monorepo, an actual extraction with a start date. The next two days were construction, not migration: the entire agent runtime ported wholesale — crypto and config, Slack and cron handling, GitHub auth, the plugin registry, the entrypoint and Dockerfile — alongside a new admin API with session-cookie auth, and by June 7th a public marketing site scaffolded in the same repo. No live agent had touched any of it yet.

Two days after the scaffold, an early test agent got decommissioned — a dry run to prove the new harness worked before anything real touched it. Migration tooling followed June 11th and 12th, verified read-only against all 30 of Bodhi's live crons before anyone let it run for real. The first agent migrated June 12th to prove the path, canary-first; the rest followed over the next several days, each dropping the old runtime's secrets once confirmed. June 17th, the last agent came online. June 18th, one commit deleted the entire legacy `agent/` workspace — 17,165 lines across 107 files, the old Helm chart, the interceptor service, the database tables, the role — gone in a single shot.

Thirteen days, start to finish. Across both repos: 429 commits, roughly 400 merged PRs, one repository inflating from zero to 124,954 lines added while the other shed 105,487 — one side ballooning, the other hollowing out, at the same time. June 17th, the day before the cutover, was the spike: 46 commits in the old repo, 39 in the new one, in one day.

We queue tasks up, and any agent in the fleet with access to shipwright can pick one up and start executing — dev-task, review, patch, and deploy all draw from the same queue, the same pipeline dogfeeding its own extraction the way it works every other queue in the company. What Dave and I actually did for those thirteen days was plan, queue, unblock, and verify — the pipeline did the throughput. I also blew well past my usage plan running this, landed around two thousand dollars over to Anthropic for the stretch, mostly in the June 16th–18th crunch. Not independently verifiable the way a commit hash is, but consistent with two repos sustaining fifteen-plus commits a day for the better part of two weeks.

## The Four-Failure Night

None of this went cleanly, and the honest version says so. Two days before the finish line, migrating `shipwright-deploy` itself to GKE — the service that deploys everything else — produced four separate failures in one night. Encryption keys reset on every upgrade, killing every live agent's auth token. A missing health check caused 503s on the admin service. OAuth redirects silently pointed at localhost in production. A stuck deploy cascaded into blocking everything behind it.

All four hit the same night, and all four hit for the same underlying reason: the tool being migrated was the one doing the migrating. Every fix had to go out through the exact deploy path that was currently broken. That's the real risk in an extraction like this — not that something breaks, but that the thing you'd normally reach for to fix it is the thing that's down. All four got written up afterward as a named failure catalog in the migration runbook, not quietly patched and forgotten.

## The Part You Can Now Go Read Yourself

That night used to be the kind of thing that stays inside the company — a Slack thread, a line in an internal runbook, gone from memory within a quarter. Once the repo went public, that stopped being true. It's sitting in git history now, for anyone deciding whether to trust this tool to go read directly, not take from us secondhand.

Last chapter's "Blast Radius, Not Luck" section covered why the ship-and-patch week that ran the same month never touched a live client — Keanu was on a completely separate path from the pipeline that kept breaking, and there was no mechanism yet that pushed code onto a client's deployment automatically. Same fact applies here, and it's doing different work this time. It's not defending what happened — it's the reason we could afford to let it become visible at all. The chaos was real, but it was contained to our own fleet the whole time, so opening the door on it costs us nothing with the people running Shipwright and buys something with everyone deciding whether to.

That's the actual answer to the question this post opened on. Not a promise that nothing will break — a public record of what already did, and what we did about it.

## Why This Shape

Every post in this series comes back to the same test: does this piece earn its place by pointing at a specific problem it solved for a specific person. Open-sourcing Shipwright is the one place that test points outward instead of in. We didn't answer "will you maintain this" with a better sentence. We gave away the repo, mess included, and let anyone check the work themselves. That's a stranger, harder-to-fake kind of trust than a roadmap slide — and it's the same instinct this whole series runs on, just aimed at readers instead of at code.

Next up: the metrics journey — PostHog first, then a backend-agnostic pivot the moment this thing had to work for people without our accounts, and why we ended up querying the task store directly instead of a separate analytics platform at all.
