---
title: "You Can't Transform 200 Engineers at Once (So Stop Trying)"
date: "2026-05-22"
author: "Dave O'Dell"
category: "AI Adoption"
excerpt: "Org-wide AI transformation doesn't fail because the technology is broken. It fails because moving 200 engineers at once is a slog. The teams that win start with one team and let the momentum spread."
readTime: "8 min read"
---

Most of the companies that call us have already tried. That's the part people miss. They didn't ignore AI and wake up behind — they bought the licenses, made the announcement, scheduled the training, and pointed the whole engineering org at the future. Then they waited. And the needle barely moved.

So they call us, and somewhere in the first conversation they say some version of the same thing: "We did the rollout. It didn't really take." And our answer is almost always the same. It's not that org-wide AI transformation *fails*, exactly. It's that it's slower than anyone can stomach. Trying to move an entire organization of 100 or 200 engineers all at once is a slog — it feels like pushing a boulder uphill, it takes forever, and by the time anything visible happens the energy is gone. We've [written before about why these rollouts stall](/blog/why-ai-adoption-fails/). This is the flip side: what to do instead.

## The Whole Org Is the Wrong Unit

Here's the instinct we keep fighting. Leadership decides AI is a priority, so they make it everyone's priority simultaneously. It feels responsible — fair, even. Nobody gets left behind. But it's exactly backwards.

Momentum is the whole game. A small team that goes fast generates traction, and traction is what pulls the rest of the org along. A big group that goes slow generates the opposite: the slog becomes the story, the skeptics get confirmation, and "we tried AI" gets filed next to every other initiative that fizzled. When you spread the effort across 200 people, you don't get 200 people moving a little. You get 200 people stuck, because there's no concentration of effort anywhere for momentum to build.

So we don't do org-wide. We do what we used to call a war room — until people started flinching at the word, so now it's a *tiger team*. Same idea. Get in with a small group, embed with the team working on your single most important product, and build the system there. Two months, heads down, real work. And at the end of two months the honest feeling is usually: *we just got started.* That's not a failure. That's the right amount of ambition for the timeframe. What you walk away with isn't a finished transformation — it's a working system, proven on your hardest real codebase, that the rest of the company can actually adopt. We've made [the case for picking one project and crushing it](/blog/pick-one-project-crush-it/) before, and it applies cleanly here.

## Pick One Tool While You're At It

There's a smaller version of the same mistake happening at the tool layer, and it compounds the org-wide problem. We walk into companies running Copilot *and* ChatGPT *and* Codex *and* Cursor *and* Claude, all at once, and everyone's confused about which one to reach for. Spreading your people thin across five tools has the same effect as spreading transformation across the whole org: no depth anywhere.

Pick one. Right now, that's Claude Code — it's the market leader, and the gap is real. The market is actually consolidating around this; Gemini CLI got pulled back, and the field of serious contenders is shrinking, not growing. You don't need a committee to evaluate all of them. Pick the leader, get your tiger team deep on it, and stop hedging. Depth beats breadth at the tool layer for the exact same reason it beats breadth at the org layer.

## The Part Nobody Says Out Loud: Fear

There's a reason this is harder than rolling out Jira, and it isn't technical. You're dealing with humans, and this change comes with fear attached.

For twenty years, the thing that made tech a great place to build a career was that the job kept changing — new stacks, new tools, constant evolution, and engineers are *wired* to chase that. But for the entire time, the disruption pointed outward. We were the ones disrupting call centers, retail, taxis, somebody else's industry. Now the arrow has turned around and it's pointing at us. *Wait — you're disrupting me?* That's a genuinely different feeling, and it sits underneath a lot of the resistance that gets dressed up as technical objection. We've written about [engineering's quiet resistance to AI](/blog/engineering-ai-resistance/), and the root of a lot of it is this.

I'll be honest about how close to home this lands. We started a company that would've been much harder to start without AI — Claude handles huge amounts of the admin and paperwork we'd never want to do, and it helps us ship faster every single day. And in the same breath, the question still shows up: *when does my job go away?* If two people running a company on this stuff feel it, your engineers feel it. Pretending the fear isn't there doesn't make it go away; it just makes you blind to the biggest thing slowing your rollout down. A tiger team helps here too — it's a lot easier to work through fear with a small group doing real, visible work than to address it in an all-hands.

## The Tell: The Bill Tripled and Nothing Got Faster

If you want one clean diagnostic for whether your AI adoption is actually working, here it is. We saw this a lot this past month: a company adopts Claude, and a month later the bill has tripled. "Wait, our spend tripled."

Good and bad. The spend, by itself, is neither. The only question that matters is the next one: *are you shipping faster?* If you doubled or tripled your AI bill and your delivery velocity is flat, that's not a budgeting problem — it's the symptom that your org-wide adoption has failed. You're paying for activity, not outcomes. People are touching the tool, the usage numbers look great, the invoice proves it — and nothing is reaching production any faster. That gap between spend and speed is the whole tell.

This is also exactly the moment the tiger team earns its keep, because when the system *does* start working, the spend conversation gets serious in a hurry. Go from $20,000 a month on Claude Code to half a million because you built a system that actually runs, and now there are real decisions to make. But that's a good problem — it means spend is finally tracking with output instead of floating free of it.

## Flatten the Org, Because the Code Isn't the Job Anymore

Here's the part that gets the comments. Dan and I have said it before and we'll say it again: if you're still writing code, you're a dinosaur. CEOs and CTOs — if your developers are still hand-writing code in 2026, you're behind the curve, and you need to look in the mirror and figure out why.

That sounds like a shot at engineers. It's the opposite. The real value of a senior engineer was never the typing. As you get senior, the job becomes planning, judgment, mentoring, deciding what's worth building — and *that* is exactly the part that's still 100% in play. All we're removing is the implementation. I review 20 to 50 PRs a day; I did that before AI too, except now Claude is the one putting up the PR and cleaning it up, and I'm doing it across far more surface area than I ever could by hand. The work moved from *writing* to *planning and reviewing*. We've described what that pipeline actually looks like in [how we code autonomously](/blog/we-code-autonomously/), and it connects to a bigger argument about [code becoming the next abstraction layer](/blog/code-next-abstraction-layer/).

Once you internalize that, the org chart has to change too. Top-heavy, top-down, micromanaging structures were always friction, but you could afford them when the bottleneck was human typing speed. You can't anymore. When the system writes and reviews code 24 hours a day, the wall between product and engineering shrinks — a product person can talk to an autonomous agent in Slack, prototype the change themselves, and hand it over. The bureaucracy that built up around coordinating slow human work doesn't have a job to do in that world. Flat orgs move fast. That's the direction, and [letting builders build](/blog/let-builders-build/) is what it looks like in practice.

## So What Do You Actually Do

If you take one thing from this: stop trying to transform the whole org at once. Start with one team — your most important product, your real codebase — and go all in for two months. Pick one tool and get deep. Name the fear instead of pretending it's a technical debate. Watch whether spend and speed move together, because if the bill goes up and velocity stays flat, you've found your failure mode. And build toward the actual goal, which isn't "more people using Claude" — it's autonomous programming, with your people doing the planning and reviewing that machines still defer to them on.

Org-wide education still matters. Keep the learning sessions, keep sharing what the tiger team figures out, because that's how the system spreads past the first team. Just don't expect education alone to move the needle in two months. The needle moves where the effort concentrates. So concentrate it.

---

*This post is adapted from [The Velocity Lab podcast](https://podcasts.apple.com/podcast/the-velocity-lab/id1888653618), Episode 21: If You're Still Writing Code, You're a Dinosaur.*
