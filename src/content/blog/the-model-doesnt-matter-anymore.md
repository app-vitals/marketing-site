---
title: "The Model Doesn't Matter Anymore (Here's What Does)"
date: "2026-08-28"
author: "Dave O'Dell"
category: "Engineering Velocity"
excerpt: "Open-source models have caught up to Sonnet on the benchmarks. We still won't switch. Here's why the model stopped being the thing that matters, and what actually does."
readTime: "6 min read"
---

One of our clients has real money to spend, and they spend some of it evaluating models. Every time something new drops, they run it through their own benchmarks. Their latest finding: the newest Qwen, which is free, is equal to Sonnet.

So here's the honest question that raises for us. Which model do Dan and I use every single day? Sonnet. Which model does Shipwright, our autonomous coding agent, run on about 75% of the time? Sonnet. If a free open-source model matches it, why haven't we moved?

The answer is the whole point, and it's not the answer you'd expect from two people who build on Anthropic on purpose.

## Benchmarks Aren't the Reason You Switch

Models leapfrog each other every few weeks. One release tops a chart, the next release from someone else tops a different chart. If you chase that, you're re-tooling constantly and never building anything.

The thing benchmarks don't measure is trust. I trust Sonnet's output. When it hands me something, I'm ready to ship it or share it sooner than I am with most tools. That trust took months to build, and it's the actual switching cost. Moving to a new model, even one that benchmarks identically, means going back and re-earning that confidence on my own work. I'm not going to trust someone else's evals for that. Neither should you.

So sure, maybe the new model is equal on paper. I'm still on Sonnet. That's not stubbornness. It's the recognition that the model is no longer the variable worth optimizing.

## Default Your Org to Sonnet, Not Opus

Here's a decision you can make this afternoon that most companies get wrong.

One of our clients had their whole organization defaulted to Opus. Open Claude Code, open the desktop app, and Opus is what runs. It's a reasonable-looking default. It's also the expensive one.

Dan and I do this for a living, and we default to Sonnet. Shipwright defaults to Sonnet. Sonnet runs about 40% cheaper than Opus and solves the overwhelming majority of problems you'll throw at it. You can set the default for your entire organization in one place.

The only time I reach for Opus is when Sonnet starts to spin. On a hard debugging problem, if Sonnet can't even recognize what's wrong after a couple of passes, I switch, and Opus usually finds the way out. That's the workflow: Sonnet by default, Opus as the escalation, not the other way around.

## The $50k Rule of Thumb

When companies ask me how to think about the cost of all this, here's my position. You should expect an engineer to spend around $50,000 a year on an LLM. And you should expect them to at least double their throughput for it.

That sounds like a lot until you do the math against headcount. Instead of paying $400k for two engineers, you're paying roughly $250k for one who does twice the work. When we were heads-down building Shipwright, our own usage ran closer to $10,000 a month. A normal engineer, not running agents around the clock, lands far below that while still clearing the doubling bar.

The spend isn't the risk. Under-using the tool you're already paying for is the risk.

## Don't Fragment Across Tooling

You might be tempted to hedge, run OpenAI here and Anthropic there, keep your options open. Test them, sure. But then choose.

The number one rule is build a system. The rule right behind it is don't fragment across tooling. The moment your team is split across three assistants with three sets of conventions and three memory stores that don't talk to each other, you've traded a small model-quality gain for a large coordination tax. Pick a stack and build around it.

## So What Is the Moat?

If open-source models are 90% of the way there and closing, what are you actually paying Anthropic for? It's a fair question, and it's close to the question we ask about our own business.

The answer is the same in both cases: it's not the model. Anthropic went enterprise while others chased consumer. They built a suite of tools that an entire organization can use, not just engineers, and then they showed up to help teams actually adopt it. That last part is the defensible part. Standing up a model is not the hard problem. Getting a whole company to change how it works is the hard problem, and it's not one a cheaper model solves for you.

That's the shift worth internalizing. The model is table stakes now. The system you build around it, and your ability to get people to actually use it, is the differentiator. It's the same reason we bundle Shipwright with the last-mile work that agents can't reliably do yet. The intelligence is commoditizing. The system isn't.

Stop optimizing the variable that stopped mattering. Default to Sonnet, escalate to Opus when you're stuck, expect real spend and real throughput, and put your energy into the system around the model. That's where the returns are now.

If you want help getting autonomous coding to actually stick inside your org, that's what we do. We wrote Shipwright.
