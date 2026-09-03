---
title: "Am I Building the Pointy-Haired Boss?"
date: "2026-09-03"
author: "Dan McAulay"
category: "Company Updates"
excerpt: "DHH's argument that over-specifying an agent makes it worse got under my skin. The audit came back clean — and that was the tell. The real complexity wasn't in any single piece. It was in teaching two different systems as if they were one."
readTime: "7 min read"
---

*This one isn't part of the numbered origin series — [cloud review](/blog/cloud-agent-review-origin/), [OpenClaw](/blog/openclaw-todos-origin/), [the VitalsOS merge](/blog/vitals-os-merge-origin/), [the task store](/blog/task-store-origin/) — but it runs on the same test that series set up. I said it plainly in the first one: every piece of Shipwright has to earn its place by pointing back to a specific problem it solved for a specific person. If it can't, it probably doesn't belong. I don't just apply that test when I'm building something new. I apply it whenever I catch myself worried I've built too much — which is most weeks, and which is what this post actually is.*

I watched DHH make an argument recently that got under my skin: the instinct to over-specify your agent backfires. Huge instruction files hurt. When you tell a coding agent exactly how to do its job, against its better judgment, you get worse output — the same way a team gets worse output from an engineer whose boss micromanages every decision. An Anthropic engineer put out a post this year showing Claude Code's own system prompt getting cut by somewhere around 70 to 80% — depending on whose remeasurement you trust — moving fixed rules into on-demand skills instead of upfront instructions. Boris Cherny, who built Claude Code, was the one who put it in front of the industry. Either way, the point stands: the model did fine without the parts humans had added for their own comfort, not the model's.

That one landed hard, because I build a tool whose entire pitch is process. Shipwright has a task queue, review gates, merge policy, claim locks, a whole pipeline an agent moves through before code reaches main. The question I couldn't shake: is that scaffolding making the model worse? Am I the pointy-haired boss?

## The fear, stated plainly

DHH's second point made it worse. He said upfront specs never worked — that's the whole lesson of agile. You write a detailed spec, hand it to an engineer, and nobody's happy, because nobody actually knows what they want until they've used the thing. The move is to manifest something rough and *discover* the real requirement through use, not to specify your way to it in advance.

Shipwright looks spec-heavy from the outside — PRDs, plan sessions, skill files that walk an agent through numbered steps. But that's not how any of it actually got built. The whole system grew incrementally, one real problem at a time, closer to what DHH says things should look like than not — rough version first, spec only where using it revealed you needed one. I skip the PRD step myself more often than not; it's not the load-bearing habit "spec-heavy by design" would suggest. Still, some of what got built along the way looks exactly like the upfront specification DHH is warning about. That's the piece actually worth checking.

## The category was itself the trap

My first pass at resolving this was a rule: be loose where you're telling the model *how to write code*, be strict where you're keeping multiple agents from corrupting shared state. Coordination earns rigor. Implementation doesn't. That felt clean, and it's not wrong exactly, but I caught myself about to file every future decision under one of those two buckets and stop thinking once I knew which bucket it was in.

That's the same move DHH is warning about, just one level up. A rule that says "always be rigorous about X, always be loose about Y" is a spec — I'd have specified my way out of specifying too much, which is its own small joke. Something coordination-shaped might turn out not to need the rigor once you actually look at it. Something that looks like plain implementation might turn out to need real discipline — a security-sensitive parsing step doesn't get a pass just because it's "just implementation." The category isn't the discipline. Checking, freshly, every time, is the discipline. The category is just what you reach for when you want to stop checking.

So I stopped trying to find the rule and asked the actual question instead: right now, today, does Shipwright's rigor earn its keep?

## What the honest check actually found

I expected to find bloat. I went looking for it — the numbered skill steps, the mechanical gates, all the places I'd feel silly defending to DHH's face. I didn't find much. Almost every rigid piece I checked still traces to a specific day something broke — a real gate closing a real hole, not a step I added because it felt responsible. Cutting rigor on the strength of this pass would have meant reopening real holes, not trimming decorative ones.

That should have been the end of it. Clean audit, fear addressed, back to work. It wasn't, because an empty audit isn't the same thing as being cleared. If nothing's individually removable, and the system still feels like too much the moment I try to explain it to someone, the problem isn't that any piece is over-specified. It's that "is any piece over-specified" was never the right question.

## Two systems wearing one name

Here's the version of Shipwright I actually believe in, the one I'd draw on a whiteboard: plan the work, break it into tasks, open a PR, review and patch it, deploy it. Five beats. Any engineer already knows this story — it's how software gets built, agent or no agent.

That's not the part that's hard to explain. The part that's hard to explain is everything sitting next to it: crons, the shipwright-loop, agent config, agent provisioning, filtering tasks and PRs, reading cron run logs, watching a work queue drain. None of that is part of the five-beat story. It's a second system — the fleet-operations layer that has to exist so autonomous agents can run that story unattended, at scale, without someone babysitting a terminal.

Some of that layer is genuinely excellent, not incidental complexity. The clearest example: it used to be that a cron would fire a prompt, and the skill itself would burn a full LLM turn on every tick just deciding whether there was anything to do. We pulled that decision out entirely — which task is oldest is a fact, not a judgment call, and no amount of model intelligence improves on plain FIFO — so now a deterministic scheduler picks the target and skills only run once there's real work behind them, cheaper and faster for it. That's a good design, earned the same way everything else in Shipwright is supposed to earn its place. It's also, unmistakably, a second thing to learn. Being well-built doesn't make it part of the first story.

## Nobody was measuring this

I went looking for confirmation that this gap was already covered, because it seemed too obvious to have missed. It wasn't covered. The scanner that runs constantly against this codebase looking for exactly the kind of AI-generated sprawl I was afraid of has a genuinely thorough rule set — dead code, duplicated utilities, architecture layering, a dozen more — and every rule on it is about source code. Nothing in it asks whether a concept is legible, whether two systems have quietly merged into one explanation, whether a newcomer could hold the whole picture in their head. Our own onboarding docs confirmed it from the other direction: they walk through setup end to end and never once stop to say "these are two different kinds of thing you're about to learn." Someone works through it and just arrives at agent provisioning sitting next to task IDs, with nothing marking the seam.

That's the actual shape of the fear DHH's video put a name to. Not that Shipwright over-specifies any single decision — the audit says it mostly doesn't. It's that "over-specified" was measuring the wrong thing entirely. The complexity is real. It was just never where I was looking for it.

## The fix isn't fewer skills

If this had turned up bloat, the fix would have been deletion — cut the step, trim the gate, ship a smaller CLAUDE.md. It didn't, so that's not the fix. The fix is drawing the seam on purpose: teaching the delivery lifecycle as its own complete story, and the fleet-operations layer as a separate one, instead of letting a newcomer discover the seam by tripping over it.

That's not a hypothetical next step. It's already turning into a real change to how we onboard people onto Shipwright — naming the two systems explicitly, before either one turns into a wall of setup instructions. I went looking for a reason to make Shipwright smaller. I came out with a reason to make it clearer instead. That's a different fix than the one I was afraid I needed, and I think it's the better one.
