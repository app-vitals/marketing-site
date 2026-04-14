---
title: "The AI Champion Playbook: How One Engineer Can Transform Your Whole Team"
date: "2026-03-19"
author: "Dave O'Dell"
category: "AI Adoption"
excerpt: "Top-down mandates don't work. Tool rollouts don't work. What works is one engineer who's already bought in — and a system that lets them spread it."
readTime: "7 min read"
---

Every engineering org has that one person.

They were using Copilot before the company had a policy. They've got Claude Code wired into their workflow. They ship features in half the time, and their teammates have started asking how. Not because management told them to ask — because they saw the pull request.

That person is your AI champion. And they're worth more to your AI adoption strategy than any vendor, any training program, or any executive mandate.

The problem is that most companies don't know what to do with them.

## Why Top-Down Doesn't Work

I've watched this play out at a dozen organizations now. Leadership decides AI is a priority. They buy enterprise licenses. They schedule training. They send the all-hands email.

Six weeks later, utilization is at 15%. The people who were already using AI are still using AI. Everyone else opened the tool once, got mediocre results on their codebase, and went back to their old workflow.

We wrote about [why tool rollouts fail](/blog/why-tool-rollouts-fail) in detail, but the short version is: AI adoption isn't a software deployment. It's a practice change. You can't install a practice change. You have to grow it.

And practices spread peer-to-peer, not top-down.

## What a Champion Actually Does

Let me be specific about what I mean by "champion," because the word gets thrown around loosely. I don't mean someone with a title. I don't mean someone who got voluntold to run the AI initiative. I mean an engineer who meets three criteria:

**1. They're already using AI effectively on real work.**

Not demos. Not side projects. Production code, in your codebase, with your constraints. They've already hit the pitfalls — the hallucinations, the context limits, the generated code that technically works but violates every convention your team has. They've figured out what works *for your environment* and what doesn't.

**2. Their peers respect them.**

This is non-negotiable. A champion who doesn't have peer credibility is just another person telling you to use a tool. The whole point is that adoption is peer-driven. When a respected engineer says "this saved me four hours on the billing migration," it carries more weight than any lunch-and-learn.

**3. They actually want to help others adopt.**

Some early adopters are happy to use AI themselves but have zero interest in evangelizing. That's fine — don't force them. The champion role requires someone who genuinely enjoys pairing with teammates, answering questions, and showing people how to get past the initial "this doesn't work for our code" reaction.

## The Champion Multiplier

Here's why champions matter more than training: the multiplier effect.

One champion naturally enables 3-5 engineers on their team. Not through formal sessions — through osmosis. Pairing on a feature. Sharing a prompt that worked. Reviewing AI-generated code together and talking through what to trust and what to rewrite.

Those 3-5 engineers each start having conversations with engineers on adjacent teams. "Have you tried using Claude for the API migration? Sarah showed me a workflow that cut the boilerplate in half."

Within a quarter, one champion has influenced 10-15 engineers. Two or three champions across different teams can shift adoption for an entire organization.

Compare that to a training program. You schedule a session. Half the engineers attend. Of those, maybe a third actually try the tool afterward. Of those, most bounce off because they don't have anyone to ask when they get stuck. The adoption curve is flat.

Champions create exponential adoption. Training creates linear adoption at best. And [95% of AI pilot programs fail to achieve meaningful impact](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai) — not because the technology doesn't work, but because the rollout model doesn't work.

## Building the Champion Program

So you've identified your champions. Now what? Here's the playbook we use.

### Step 1: Find Them (Don't Recruit Them)

Your champions already exist. They're the engineers whose commit frequency went up six months ago. They're the ones with AI tools in their dotfiles. They're the ones whose teammates say "I don't know how they ship so fast."

Don't post a job rec for "AI Champion." Don't ask for volunteers at the all-hands. Look at the data — who's shipping faster, who's already talking about AI in code reviews, who's already helping teammates. Then have a conversation.

### Step 2: Give Them Time

This is where most programs fail. You identify the champion, you get excited, and then you expect them to do champion work on top of their regular sprint commitments.

Champions need 10-20% of their time dedicated to enablement. Not as a side project — as an explicit allocation that their manager supports. If you're not willing to trade some sprint velocity on one engineer to unlock velocity across the whole team, you don't actually want adoption. You want the appearance of adoption.

### Step 3: Give Them Context Infrastructure

A champion without [context infrastructure](/blog/context-problem) is fighting with one hand tied behind their back.

When they pair with a teammate and the AI tool produces mediocre output because it doesn't understand the codebase, the lesson that teammate learns is "AI doesn't work here." That's the opposite of what you want.

Champions need the codebase documented in a way AI tools can consume — architecture docs, coding conventions, patterns and anti-patterns. This isn't a wiki that nobody reads. It's living context that makes AI output go from generic to actually useful. It's the difference between your [licenses without lift](/blog/licenses-without-lift) sitting idle and your team actually shipping with them.

### Step 4: Let Them Teach Their Way

Do not hand your champion a slide deck. Do not ask them to run a standardized curriculum. Do not make them schedule sessions in a conference room.

The best champion-led enablement looks like this:
- Pairing on real tickets, not tutorials
- Sharing prompts and workflows in the team's existing Slack channel
- Doing AI-assisted code reviews where they narrate their thinking
- Writing team-specific tips in the repo's docs, not a corporate wiki

Champions are effective because they're authentic. The moment you formalize their role into a corporate program with templates and KPIs, you kill the thing that makes them work.

### Step 5: Measure Outcomes, Not Activity

Don't measure how many pairing sessions your champion did. Don't count Slack messages. Don't track "training hours."

Measure what actually matters:
- **Adoption rate:** What percentage of the team is actively using AI tools weekly? (Not logged in — *using*.)
- **Velocity impact:** Is [cycle time](/blog/velocity-engineering/) decreasing? Are PR lead times dropping?
- **Quality indicators:** Is the defect rate stable or improving as velocity increases?
- **Spread:** Are engineers on adjacent teams starting to adopt without direct champion involvement?

If those numbers are moving, your champion program is working. If they're flat, something in the system is broken — usually Steps 2 or 3.

## The Anti-Patterns

I see these kill champion programs regularly:

**The Voluntold Champion.** Someone gets assigned the role because they're "good at explaining things." But they're not actually an AI power user themselves. They end up teaching from slide decks instead of from experience, and nobody takes them seriously.

**The Lone Champion.** One person trying to shift a 50-engineer org by themselves, with no time allocation and no management support. They burn out in two months and go back to just using AI themselves.

**The Shadow Champion.** An engineer who's incredible at AI adoption but works in a culture where [the early adopters get scolded](/blog/enterprise-ai-adoption-mistakes) for using "unapproved tools." They can't champion what they're not allowed to acknowledge.

**The Champion Without Infrastructure.** They pair with teammates, but the AI output is mediocre because there's no context layer. Every session turns into "yeah, you have to manually add all this context every time." Nobody wants to adopt that workflow.

## What This Looks Like When It Works

When a champion program works, you don't need to push adoption. It pulls itself.

Engineers start asking their champion for help because they saw results on real work. Teams start sharing prompts organically. Someone writes an internal blog post about how they used AI to refactor a service in a day instead of a week. A skeptic tries it on a gnarly bug and becomes a convert.

Utilization goes from 15% to 60% in a quarter. Not because of a mandate — because of momentum.

The companies with proper champion programs and training see significantly higher productivity gains than those doing tool rollouts alone. It's not even close. And Gartner projects that [75% of enterprise developers will use AI code assistants by 2028](https://www.gartner.com/en/articles/top-technology-trends-2026) — the question isn't whether your team will adopt, but whether they'll adopt well or poorly.

## The Real Unlock

Here's the part that matters most: champion-led adoption is self-sustaining.

Training programs need constant investment. Mandates need constant enforcement. Champions, once enabled, create a flywheel. They enable engineers who become champions themselves. The practice spreads because it works, not because someone told people to do it.

Your [AI adoption strategy](/blog/enterprise-ai-adoption-mistakes) doesn't need a bigger budget. It needs the right model. Find your champions, give them time and infrastructure, and get out of the way.

The transformation is already sitting in your org. You just have to let it happen.

---

*Dave O'Dell is co-founder of App Vitals, where he and Dan McAulay help engineering teams build champion programs that turn AI tool investments into real velocity gains. If your utilization numbers are stuck, [let's talk](https://app-vitals.com/contact).*
