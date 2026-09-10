---
title: "The Four Skills I Hire For Now, and Not One of Them Is Coding"
date: "2026-09-10"
author: "Dave O'Dell"
category: "Technical Leadership"
excerpt: "My wife overheard me talking to an AI agent and said I was good at articulating what I want. That offhand comment turned into the clearest interview rubric I've got: four skills that decide who stays an engineer, and none of them show up in a coding test."
readTime: "8 min read"
---

My wife walked past my office while I was talking to an agent through voice mode. Not typing. Talking, out loud, the way you'd brief a contractor who just showed up at your house.

She listened for a second and said: "Man, you're really good at articulating what you want."

She meant it as a passing compliment. I've been chewing on it for weeks, because she accidentally named the thing. Not a framework, not a tool, not a model. A skill. And once I saw it as a skill, I started seeing the other three, and then I couldn't stop noticing which engineers have them and which don't.

Dan and I have been arguing about this for a while now. The role isn't disappearing. Anyone telling you software engineering is over is selling something. But it is changing dramatically, and the change is not the one people brace for. Everyone braces for "you need to learn the new tool." The actual shift is that the skills that made you valuable are no longer the skills that make you valuable.

Here are the four I interview for now. None of them is coding.

## 1. Articulation

You have to be able to say what you want, and you have to be able to say what done looks like.

Those are two separate sentences and most people only manage the first one. "Build me a login page" is a wish. "Build me a login page, here's the auth provider, here's what happens on failure, and I'll know it works when I can log in with a bad password and get the right error" is an instruction. The agent can act on the second one. The first one produces something that compiles and misses the point.

Dan frames this as loop engineering, and I think that's exactly right: you need a goal plus a way to verify the goal. A loop without verification is just a machine confidently walking in the wrong direction for six hours. This isn't a fringe idea anymore either. Anthropic shipped an official plugin built on the Ralph loop pattern. The industry is standardizing on the thing Dan has been drawing on whiteboards for a year.

What makes articulation a hiring signal rather than a nice-to-have is that it's observable in about four minutes. Ask a candidate to describe a feature they'd build. Listen for whether they ever mention how they'd know it worked. Most don't. They describe the artifact, never the acceptance criteria. That used to be a small gap you'd paper over in code review. Now it's the whole job, because you can't code-review an agent's judgment at the speed it produces work. You have to specify it up front.

If you can't say what success looks like, you cannot delegate to a machine that does exactly what you said.

## 2. Curiosity

Agents run autonomously. That's the point of them. It's also the risk, and the mitigation isn't more oversight, it's more curiosity.

You have to keep asking what the system is doing and why. Not out of paranoia. Out of the recognition that everything under you is moving. Dan brought up something on the podcast that I keep repeating to people: Anthropic deleted roughly 80% of Claude Code's system prompt, and nothing broke. Eighty percent. All that carefully tuned instruction, and the thing worked fine without it.

Then consider that Claude Code's codebase turns over about every nine days.

Sit with that. There is no stable ground. There is no "I learned the tool, I'm set for the next two years." Nothing has evolved this fast in the history of the trade, and the engineers who thrive are the ones who treat every assumption as provisional, including the ones they wrote down last month. The ones who struggle are the ones who found a workflow in March and are still defending it.

In an interview I look for side projects. Not because side projects are morally superior or because I want you working nights. Because a self-started project is the only reliable proof I've found that somebody pokes at things without being assigned to. You cannot fake that with a certification.

## 3. Delegation

This is the one that surprises people, and it's the one I personally had to learn the hard way.

For years I was bad at delegating, and when I finally examined why, it wasn't workload or trust or control. It was that I didn't feel like I had the authority to hand work to someone else. That's a strange thing to admit but I don't think I'm unusual. A lot of engineers carry it.

Here's what's funny: delegating to AI is easier, and Dan nailed why. They're robots. There's no guilt. You're not interrupting someone's evening, you're not loading a teammate who's already underwater, you're not managing anyone's ego. The emotional tax that makes human delegation hard is simply absent.

What remains is the hard part, and it's the same in both cases: building trust in the system. You delegate a small thing. It comes back right. You delegate a bigger thing. Over time you develop a calibrated sense of what this system is good at and where it needs a tighter leash. That's not a personality trait, it's a process, and it takes reps.

Which brings me to the part I'll defend hardest. Delegation is learnable. I spent ten years in the Army, and the military's entire theory of leadership rests on the premise that you can teach it. They take nineteen-year-olds and make them responsible for other people's lives. When I trained ski patrol, same thing: you can teach someone to run a scene.

Some people arrive already knowing how, usually from sports or from being the oldest kid. Everybody else has to be taught. Nobody is exempt. If you've been telling yourself you're just "not a delegator," that's not a diagnosis, it's a skill you haven't practiced yet.

## 4. Full Lifecycle Awareness

You can no longer live in one repo and the APIs on either side of it.

For twenty years, specialization was the correct career strategy. Go deep on a stack, own a service, become the person who knows that system cold. That was defensible. That was how you got paid.

It doesn't work anymore, and the reason is mechanical rather than philosophical. When AI writes the code, the bottleneck moves off implementation and onto everything around it. Product planning upstream. Observability in production downstream. If you can only operate in the middle third, you're only useful for the part that's already automated.

Dan and I are a decent illustration of this, mostly by accident. He craps on my software engineering skills constantly, and he's not wrong, I don't have them the way he does. What I own is planning and the DevOps and infrastructure decisions. He takes the major architectural work. Neither of us could do the other's job well. But we each know enough about the other's domain to tell when something is broken and, more importantly, who to ask, or which agent to point at it.

That's the actual bar. Not mastery of the whole lifecycle. Enough fluency across it that you can recognize a problem outside your lane and route it. The language you know matters much less now. The system you understand matters much more. We've written before about [why the model doesn't matter anymore](/blog/the-model-doesnt-matter-anymore/), and this is the same shape of argument applied to your own skill set: the thing you thought was the asset was actually the commodity.

## So Here's the Uncomfortable Part

These are not nice to have. If you don't have these, I'm not hiring you.

I know how that sounds. I'm saying it plainly because I think softening it does people a disservice. I'm not going to hire someone who can't articulate what they want, won't ask why the system did what it did, can't hand work off, and only understands their own slice. Not because I'm strict, but because that person cannot be productive in the way work actually happens now. I'd be setting them up to fail and calling it an opportunity.

The flip side, and Dan pushed on this and he's right: none of it is a blocker. Not one of these four requires a degree, a bootcamp, a certification, or permission. You pick them up by building something with Claude or GPT this weekend. That's the whole on-ramp. Articulation improves the moment you start writing acceptance criteria instead of wishes. Curiosity improves when you read the diff instead of merging it. Delegation improves with reps. Lifecycle awareness improves the first time you have to deploy your own thing and watch it fall over.

And if you're sitting there thinking you're too introverted for a job that's apparently all communication, relax. Dan's an introvert. He doesn't especially like talking to people. Telling an agent what to do isn't talking to people. The communication skill here is precision, not charisma. Those are different muscles, and only one of them is on the test.

I'd also push back on my own framing in one respect. I joke about wanting eighty-hour weeks. Dan wants a twenty to forty hour week and thinks the whole point of this technology is to get there. He's more right than I am. If these four skills only let you produce more hours of output, we've built an expensive treadmill. The reason they matter is that they let a small number of people do what used to take a room full, which is either a story about doing more or a story about going home earlier. That's a choice, not a consequence.

The role isn't ending. The bar moved. It moved off the thing that was easy to measure and onto four things that are harder to measure and much harder to fake.

Start with articulation. Go say exactly what you want, and exactly how you'll know you got it.

---

*This post is adapted from [The Velocity Lab podcast](https://podcasts.apple.com/podcast/the-velocity-lab/id1888653618), Episode 35: The Four Soft Skills That Decide Who Stays an Engineer.*
