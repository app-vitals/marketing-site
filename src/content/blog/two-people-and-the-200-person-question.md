---
title: "Two People, Five Automated Departments, and the 200-Person Question"
date: "2026-09-22"
author: "Dave O'Dell"
category: "AI Adoption"
excerpt: "Dan and I haven't written a line of code in eight months. Billing, payroll, marketing, and this podcast all run without us now. Which raises a question we can't stop chewing on: if two people can automate this much, what is a 200-person company actually doing?"
readTime: "8 min read"
---

Dan and I haven't written a line of code in eight months.

That sentence does a lot of work when we say it out loud, so let me be precise about what it means. We still ship software. We ship more of it than we did when we were typing. What we don't do is sit in an editor producing the artifact. We plan, and we validate. The middle part — the part that used to be the whole job — belongs to the agents now.

Here's the thing nobody warned us about: once you stop doing the middle part in engineering, you start noticing the middle part everywhere else. Invoicing has a middle part. Payroll has a middle part. So does the newsletter, and the podcast, and the scheduling tool we were paying thirty bucks a month for. Over the last year, the two of us have quietly automated most of the company that isn't us thinking.

And that leaves a question we genuinely can't put down. If two people can do this, what exactly is a 200-person company doing?

## The Back Office Went First

Finance was the easiest, which surprised us.

Time tracking runs hourly, on its own. Invoices go out monthly, on their own. Payroll and S-corp distributions run through Gusto with our own agents driving the pieces around it. Every day, an agent checks which invoices went out, which ones got paid, and drafts the follow-up for the ones that didn't. Nobody opens a spreadsheet. Nobody remembers it's the first of the month.

We still have a CPA. That's not a hedge — it's the right call. Tax compliance is a place where being wrong is expensive and slow to discover, and the value a good CPA adds isn't data entry, it's judgment about our specific situation. We automated the bookkeeping. We did not automate the accountant, because the accountant was never doing the bookkeeping part anyway. That distinction turns out to be the whole pattern, and we'll come back to it.

Marketing went next. The weekly newsletter builds itself out of what we've published. This podcast — the one this post is adapted from — runs end to end without either of us touching a timeline. It records in Descript, gets edited, gets published to Transistor and YouTube, gets clipped into Shorts, and the Shorts get scheduled out across the week. Dan and I show up, talk for twenty minutes, and pick a title.

Five functions that would be five people's jobs at a company our clients' size. None of them have a person.

## Then We Started Building Instead of Buying

The scheduling thing is small but it's the one I keep telling people about.

We were paying for Cal.com. It was fine. It also didn't do two or three things we wanted, and the gap between "fine" and "what we actually want" used to be a gap you just lived with, because closing it meant a sprint you couldn't justify. So you pay the thirty dollars and you live with the missing features. Every company on earth has a hundred of these.

We wrote our own instead. Now we pay nothing and it does what we want.

I'm not claiming everyone should go rebuild their calendar tool. The interesting part isn't the savings, it's what the savings imply. When the cost of building drops far enough, the build-versus-buy line moves, and it moves a lot further than most teams have re-examined. Software you'd never have written because it wasn't worth an engineer-month is suddenly worth an afternoon. That's not a cost story. That's a "what's possible" story, and the companies that notice it first get to stop negotiating with their vendors about roadmaps.

We run three things internally now: [Shipwright](/blog/shipwright-autonomous-dev-pipeline/), which is the autonomous coding platform we no longer write code for, Vitals OS for time tracking, and Squadron, a goal-driven autonomous project system. Two people. Three products. Plus the consulting work that pays for all of it.

## Where It Still Doesn't Work

I want to be careful here, because this is exactly the point in a post like this where somebody starts overselling.

Our marketing automation results are not great. The pipeline runs beautifully. The machinery works. The outcomes are mediocre, and we know it, and we're working on it. There's a difference between automating an activity and automating a result, and marketing is the place where we've most clearly done the first and not the second.

Sales is worse, and it's worse in an instructive way. Closing a deal is a skill. It's built out of reps, pattern recognition, reading a room, and knowing when to shut up. Dan and I are both engineers by background, which means we are both still climbing that curve. AI has not closed that gap for us. It drafts, it researches, it preps. It does not close.

So when I say we automated the company, I mean we automated the parts of it that are a process. The parts that are a craft we haven't learned yet are still bottlenecked on us learning them. That's not an AI limitation so much as a reminder of which things were ever really processes to begin with.

## The 200-Person Question

Now the part we actually argued about on the episode.

We're a two-person company. We've automated finance, marketing, content production, internal tooling, and most of engineering's throughput. If you take that seriously and scale it up — a 200-person company, right? What does that mean? If we can automate this, shouldn't they be able to automate all this stuff out?

Run the arithmetic honestly and you get something uncomfortable. A meaningful share of roles at a company that size exist to move information between systems and people. Not to decide things. To move things. That category is precisely what agents are good at now.

There are two doors out of that observation, and I think the choice between them is the actual strategic decision of the next few years.

**Door one:** cut headcount. You've automated this much, so you need half as many people, your margins improve, and you're done. It's legible to a board. It shows up in a quarter. It is also, in my opinion, the smaller of the two prizes, and it's the one that's easy to do badly.

**Door two:** keep the people and use the capacity. Same headcount, same payroll, dramatically more output. The work those people were doing was never the point — the point was the judgment underneath it, and now all of that judgment is pointed at building instead of at shuffling. You don't halve the org. You double what it produces.

Dan and I land on door two, and not because it's the nicer answer. It's that door one caps out. There's a floor on how few people you can have, and once you hit it you've collected your one-time margin improvement and the story is over. Door two doesn't have a ceiling in the same way. The company that keeps its hundred people and gets three hundred people of output beats the company that cut to fifty and gets fifty-five. Every time. That's the same argument we've been making about [engineering careers](/blog/no-one-is-paying-you-to-code-anymore/) for a year now, just applied to the whole org chart.

The honest caveat: door two is harder. It requires you to have something worth building with the extra capacity. If your roadmap is thin, door one is going to look awfully tempting, and a thin roadmap is a leadership problem that AI didn't cause and won't fix.

## The Job Becomes Improving the Process

Here's the moment from our own work that made this concrete.

A client questioned an invoice. Meeting time looked high, and it was a fair question. I pulled the thread with Claude, and it came back and told me why: meetings and coding sessions were overlapping in how we were tracking them, so the same wall-clock hour was being counted twice in one category. A real bug in our own billing, found in a conversation.

Then — same session, no context switch — it queued up the fix.

That's the whole shift in one story. The old version of that day is: notice the discrepancy, dig through records for an hour, write up what you found, file a ticket, wait a sprint. The new version is: ask, understand, fix, move on. What got automated wasn't my judgment about whether the invoice was right. What got automated was every step between having that judgment and acting on it.

Which is why I don't think the interesting question is "how many people does this replace." The interesting question is what your people do with the distance between deciding something and it being true. That distance used to be most of the job. It's collapsing. If a two-person company can automate this much, any company can — and the work that's left over isn't doing the process, it's improving it.

Nobody at a 200-person company is going to run out of processes worth improving. That's the part I'd bet on.

---

*This post is adapted from [The Velocity Lab podcast](https://podcasts.apple.com/podcast/the-velocity-lab/id1888653618), Episode 39: We Haven't Written Code in Eight Months (Here's What We Do Instead).*
