# LinkedIn Post Drafts — SEO Blog Round 2

Five ready-to-post LinkedIn drafts promoting the new App Vitals blog content. Each designed for Dave's voice, optimized for LinkedIn feed engagement.

---

## Post 1 — March 19, 2026
**Promoting:** The AI Champion Playbook: How One Engineer Can Transform Your Whole Team

---

Your best AI adoption strategy is already sitting in your org. You just haven't found them yet.

Every team I've worked with that actually succeeded with AI coding tools had the same thing in common: one person who was already using them before anyone told them to.

Not a mandate from leadership. Not a training program. Not a Slack message that said "we bought licenses, go use them."

One engineer who figured it out on their own — and then couldn't shut up about it.

That person is your AI champion. And they're worth more than any rollout plan you'll ever write.

I've spent 20 years watching technology adoption in engineering orgs. The pattern is always the same: peer influence beats top-down mandates. Every time.

The trick isn't finding these people — they're already raising their hands. The trick is giving them air cover. Dedicated time. A voice in the room. Maybe even a small budget.

When you do that, adoption spreads like gossip. Because engineers trust engineers. Not slide decks.

We wrote the full playbook on how to find, empower, and scale your AI champions.

Who's that one engineer on your team who's already 10 steps ahead on AI?

https://app-vitals.com/blog/ai-champion-playbook/

---

## Post 2 — March 21, 2026
**Promoting:** How to Measure AI Adoption ROI (When Nobody Can Tell If It's Working)

---

77% of organizations can't measure ROI on their AI investments. I'd bet the real number is higher.

Here's the conversation I keep having with engineering leaders: "We bought 200 Copilot licenses six months ago. Are we getting value?" And then... silence. Nobody knows.

It's not their fault. The old metrics don't work here. Lines of code? Meaningless when AI generates half of it. Tickets closed? Doesn't account for quality. "Developer satisfaction"? That's a vibes check, not a business metric.

After helping multiple teams navigate this exact problem, we built a framework that actually works. It comes down to three layers:

**Activity metrics** — Are people actually using the tools?
**Velocity metrics** — Is real work moving faster?
**Business metrics** — Is the org shipping more value?

Most teams only measure layer one. "80% of devs logged in this month!" Cool. That tells you nothing about whether you're getting $2M worth of value from those licenses.

The real signal is in layers two and three — and it's measurable if you know where to look.

How are you measuring AI tool ROI on your team? Or are you still in the "vibes" phase?

https://app-vitals.com/blog/measure-ai-adoption-roi/

---

## Post 3 — March 24, 2026
**Promoting:** Code Review Is Your New Bottleneck (And AI Made It Worse)

---

We made developers 3x faster at writing code. And nothing shipped faster. What the hell happened?

Here's the math nobody talks about: if AI helps your team write code 3x faster, you now have 3x more pull requests sitting in the review queue. Same number of reviewers. Same 24-hour SLA.

You didn't speed up delivery. You moved the bottleneck.

I've seen this play out in real time. Teams celebrate their AI productivity gains while their cycle time stays flat — or actually gets worse. DORA metrics tell the ugly truth: lead time isn't improving because the review stage is now the constraint.

It's like widening a highway on-ramp but keeping the same two-lane bridge at the exit. Traffic doesn't move faster. It just backs up somewhere new.

The fix isn't "do fewer reviews" — quality still matters. It's about rethinking what reviews are for in an AI-assisted world. Smaller PRs. Smarter automation. AI-assisted review triage. Dedicated review time on the calendar instead of "I'll get to it."

The teams shipping fastest right now aren't the ones writing code fastest. They're the ones who fixed their review pipeline.

Where's your bottleneck hiding? Is it still where you think it is?

https://app-vitals.com/blog/code-review-bottleneck/

---

## Post 4 — March 26, 2026
**Promoting:** Why Your AI Coding Assistant Is Just Fancy Autocomplete

---

AI coding tools aren't broken. Your setup is.

Hot take: most teams using AI coding assistants are getting maybe 10% of the value. Not because the tools are bad — because they're running blind.

Think about it. You drop an AI into a codebase with zero documentation, no architecture notes, no style guides, no context about why things are built the way they are. Then you're surprised when it produces generic, off-base code that nobody trusts.

That's not AI coding. That's autocomplete with extra steps.

The teams I see getting real value? They invested in what I call context infrastructure. CLAUDE.md files. Architecture decision records. Onboarding docs that are actually maintained. The same stuff that helps new engineers ramp up — except now it also makes your AI dramatically more effective.

Here's the wild part: only about a third of developers actually trust AI-generated code. But trust isn't a tool problem. It's a context problem. When AI has real context, it produces code that looks like your team wrote it. Trust follows.

The gap between "fancy autocomplete" and "AI engineering partner" is entirely about what you feed it.

What does your AI know about your codebase right now? And is that enough?

https://app-vitals.com/blog/ai-fancy-autocomplete/

---

## Post 5 — March 28, 2026
**Promoting:** The Velocity Engineering Playbook: Accelerating Everything, Not Just Code

---

After 20 years in DevOps and platform engineering, here's what I know: making developers write code faster was never the hard part.

The hard part is everything else. The review that sits for a day. The CI pipeline that takes 45 minutes. The deploy that needs three approvals and a Slack thread. The meeting to discuss the meeting about the release.

That's why we wrote the Velocity Engineering Playbook — a full framework for accelerating your entire software delivery lifecycle, not just the coding phase.

Most "AI productivity" content stops at "use Copilot, write code faster." That's chapter one. What about chapters two through ten?

The playbook covers four acceleration stages:
→ Code generation (the part everyone focuses on)
→ Review & collaboration (where most bottlenecks actually live)
→ CI/CD & testing (the silent time killer)
→ Deployment & delivery (the last mile nobody optimizes)

Plus a maturity model so you can figure out where you actually are vs. where you think you are. Spoiler: most teams overestimate by two levels.

This is the most comprehensive thing we've published. It's the distillation of everything we've learned helping teams actually ship faster — not just type faster.

What stage is slowing your team down the most right now?

https://app-vitals.com/blog/velocity-engineering-playbook/

---

## Post — July 29, 2026
**Promoting:** The Harness Is All You Need. So We Built One in the Open — and Made It Easy to Leave.

---

GitHub just published a piece called "The harness is all you need (mostly)." They're right — and it points somewhere they didn't go.

The argument: your productivity gains don't come from the next tool or MCP. They come from mastering the harness — the layer that plans, picks the model, and drives the loop.

Agreed. But every workflow in that post still has a human in the chair: plan it, iterate on it, rubber-duck it, ship it. The harness is the copilot. You're still flying the plane.

The interesting question is what the harness becomes when it closes the loop itself. Plan → queue → loop — with you on approval, not on the keyboard.

That's the bet we made with Shipwright: an open-source, MIT-licensed harness for Claude Code that runs the delivery loop autonomously. We didn't go fullstack like Devin or Cursor — we don't build a model. We're the thin layer that ships, sitting on the harness Anthropic already built.

Here's the part none of the fullstack agents can offer: if you ever want out, you keep everything. The CLAUDE.md, the docs, the skills, the commands it wrote all keep working on vanilla Claude Code. Leaving Devin or Cursor strands your whole workflow in their stack. Leaving Shipwright costs you nothing but the orchestration you self-hosted.

Same premise GitHub just validated. One step further.

What would you actually hand a harness to ship without you in the chair?

https://app-vitals.com/blog/harness-is-all-you-need/

---

## Post — August 27, 2026
**Promoting:** What Loop Engineering's Failures Taught Us — and How Shipwright's Loop Compares

---

"I don't prompt Claude anymore. I have loops running. They're the ones prompting Claude and figuring out what to do. My job is to write loops." — Boris Cherny, Anthropic

That quote went viral in June. Everyone's calling it "loop engineering" now. Set a goal, walk away, wake up to finished work.

I went looking past the explainer guides for what actually happens when people do this. The successes are real — Andrej Karpathy's AutoResearch found an 11% training speedup in one unattended overnight run. So are the failures: an agent deleted a live production database at Replit in July 2025. A different one found a stray API credential lying around and wiped a company's database and its backups in nine seconds this April.

Line them all up and one pattern holds. The loops that stayed safe enforced their rules as runtime state — a check the system actually ran before it acted. The ones that failed had the same rules. Typed into a prompt. Hoped for.

That's the exact question we had to answer building Shipwright's own delivery loop. Wrote up what we found, incident by incident, against how ours actually works — link in the comments.

What would you actually trust an unattended loop to do in your codebase?

**First comment:** https://app-vitals.com/blog/loop-engineering-vs-shipwright/
