---
title: "Testing Is Phase Zero: You Can't Hand Agents a Codebase Nobody Trusts"
date: "2026-05-18"
author: "Dave O'Dell"
category: "Engineering Velocity"
excerpt: "Every org we walk into has the same broken tests: slow, flaky, thin. That was tolerable when humans shipped. It's disqualifying the moment you want agents to. Here's why testing became the first pillar of repo readiness."
readTime: "8 min read"
---

Here's a thing that happened twice in two days.

Dan opened a pull request. It was ready to ship — clean, scoped, reviewed. The build went red. The failure had nothing to do with his change. The next day, I opened a pull request in the same organization. Different code, different area. The build went red again, for an unrelated reason.

That's the moment one of us said the quiet part: *this ain't working.*

Not the PRs. The tests. And not those specific tests — the whole relationship that team had with its test suite. Nobody trusted it. A red build wasn't information; it was noise you learned to route around. Re-run it. Merge anyway. Shrug.

We've now seen this in nearly every engineering organization we've worked with, plus most of the ones we worked *for* across our careers before this. The tests are slow. The tests are flaky. The tests don't cover the things that actually matter. Pick any two — usually you get all three. Teams launch six-month initiatives to kill the flakes, declare victory, and then find themselves running the same initiative again six months later.

For years, that was a tax. Annoying, expensive, survivable. Humans absorbed the uncertainty — a senior engineer's gut, a careful reviewer, a slow and cautious deploy. The test suite could be mediocre because people were the real safety net.

Then we started handing the keyboard to agents. And a mediocre test suite stopped being a tax. It became a wall.

## The question isn't coverage. It's confidence.

When an agent writes code, there's exactly one question that matters: *how does it know it did the right thing?*

You can run linters. You can have it re-read the diff. But the core mechanism that tells an autonomous system "this change works and didn't break anything else" is the test suite. Tests are how an agent validates itself. They are the substrate that makes background, asynchronous engineering possible at all.

Which reframes the whole conversation. We used to argue about coverage percentages. I was the 90% guy for most of my career — push for 90%, defend it in code review, treat it as the bar. I still think coverage matters. But we built our own autonomous system, ShipRight, with a hard rule: force 90% coverage. Great philosophy. Three months later we'd internalized the obvious: maybe the 10% you're *not* covering is the part that actually matters. Coverage is a proxy. It's an easy thing to measure, which is exactly why it's a seductive thing to optimize, and exactly why it lies to you.

What you actually need is *confidence* — the specific, earned belief that if the suite is green, the system works, and if it's red, something real is wrong. That belief is the thing every team we meet has lost, and it's the thing you have to manufacture before agents can do anything useful in your repo.

This is why, in our [repo-readiness work](/blog/prepping-repo-autonomous-programming/), testing didn't just stay on the list of pillars. It moved to the top. Thirteen pillars get a codebase ready for agentic engineering. Testing is pillar zero — the one that has to be true before the others matter.

## What "getting test-ready" actually looks like

The instinct, when tests are bad, is to point an agent at the codebase and say "write more tests." That produces exactly what you'd expect: a pile of low-value unit tests that move the coverage number and test nothing important. We did a version of this — a nightly cron that found coverage gaps and opened PRs to fill them. It worked, in the narrow sense. It also reliably ignored the flaky end-to-end gaps, because chasing 90% unit coverage is the path of least resistance for an agent too. The tool was fine. The framing was wrong.

So we built it as a system instead of a one-off. We don't do one-offs here. The onboarding runs in distinct phases, and the order is the whole point:

**Phase one: research.** Before deciding anything, figure out what's actually in the repo — exact versions, exact tooling. What test runner, what framework, what's pinned to what. No recommendations yet. Just ground truth.

**Phase two: design the ideal, greenfield.** Deliberately *without* looking at the existing tests, answer: if this repository had no tests at all, what would we build? What functionality and features need coverage — not which lines, which *behaviors*? How would we structure unit, integration, end-to-end, and smoke tests if we were starting clean? This phase is uncontaminated by the sunk cost of whatever's already there.

**Phase three: reconcile.** *Now* look at what exists. Compare it to the ideal. What do we keep, what do we throw out, what do we rebuild? Most codebases have tests someone wrote four years ago against technologies that have since changed three times. You can't see that clearly if you start by reading them — you have to know what good looks like first, then measure the gap.

The output isn't a pile of PRs. It's two documents: a human-readable discovery doc — here's what we found, phase by phase — and a detailed task list. A human reviews both. The discovery doc gets sanity-checked for accuracy; the task list gets approved and turned into Jira or Trello tickets. Humans enter the loop at the end, where judgment is cheap and high-leverage, not in the middle, where it's a bottleneck. That's the same principle we keep coming back to when we talk about [where humans belong in an agentic workflow](/blog/let-builders-build/).

## Stop relying on a human to remember the test

Here's the part that matters most, and it's the part teams skip.

Getting the repo to a good baseline is necessary but not sufficient, because entropy is real. New code arrives every day. The classic failure: an engineer (or an agent) builds an API endpoint, is focused on the API endpoint, and adds "a unit test" because that's the test that's top of mind. The integration test, the smoke test, the end-to-end test — the wiring that actually catches the breakage — quietly doesn't happen. Not out of negligence. Out of attention. You're thinking about the thing you're building, not the matrix of ways it should be verified.

So we stopped relying on a human to remember. In our planning phase, *before* a line is written, the plan explicitly decides: of the four test buckets — unit, integration, end-to-end, smoke — which does this change need? Maybe all four. Maybe one. But it's a decision the system makes deliberately, with rules attached: don't duplicate coverage at the same layer (unit tests verify components, end-to-end tests verify the wiring between them — that's legitimate overlap; testing the same logic twice at the same layer is waste), keep it fast, and make it runnable locally so the agent can validate without a round trip.

That last constraint is load-bearing and worth being honest about. The goal is local-first execution: agents run unit tests and linked integration tests (a Postgres, a Redis) locally, every time. More complex orchestration — multi-service setups that don't come up cleanly in a managed agent's environment — gets pushed to CI, and the agent waits. That's a real seam, not a solved problem. We're not going to pretend every test runs locally in every environment. But the principle holds: the closer validation is to the agent, the faster the loop, and the loop speed is the whole game.

## The backstop, because agents cut corners too

A test suite an agent maintains needs its own immune system, because agents fail in specific, recognizable ways. We've seen tests with no assertions — green, meaningless. We've seen a test mock out the very code it was supposed to be exercising, effectively copying the production logic into the test file and asserting against itself. "This is complicated, I'll just mock it" is a very human move, and the models learned it from us.

So there's a daily cron that backstops the whole thing. It catches the coverage gaps and the staleness — the end-to-end hole that the unit-focused work left behind — and it's also where you check that tests actually assert something and actually test the thing they claim to. You catch defects three places: when you build, when you review, and — for whatever slips both — with the cron. Belt, suspenders, and a second pair of suspenders, because the cost of a false-green in an autonomous pipeline isn't a bad test, it's shipped breakage with no human in the path.

## Why this compounds

Strip away the tactics and here's the through-line. Developers are responsible for what they ship. If they don't trust their coverage — if the tests are slow, flaky, and thin — they can't actually take that responsibility, so they don't. They route around the red build. Velocity dies, not because people are slow, but because nobody's confident.

Flip it. When a team can say "our tests are fast, they don't flake, and we haven't shipped anything breaking in months," something changes. People start trusting the green. They move faster because the safety net is real. And then — only then — you can put agents behind that net and let them work while you sleep, because the suite that gives your humans confidence is the same suite that gives your agents validation.

That's why we call it phase zero. Not because testing is new advice — it's the oldest advice in software. But because in an agentic world it stopped being the thing you should do and became the thing you do *first*, before the other twelve pillars mean anything. You can't hand an autonomous system a codebase that its own authors don't trust and expect trustworthy output. The test suite was always the foundation. Agents just made it impossible to keep pretending otherwise.

---

*This post is adapted from [The Velocity Lab podcast](https://podcasts.apple.com/podcast/the-velocity-lab/id1888653618), Episode 19: Testing Is Phase Zero for AI Agents.*
