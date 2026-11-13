---
title: "I Made a Video for $0 on a MacBook Air"
date: "2026-11-13"
author: "Dave O'Dell"
category: "AI Adoption"
excerpt: "I spent a weekend running AI models entirely on a fanless MacBook Air and built a full video from a script for $0. Six months ago that same job meant signing up for a stack of paid APIs. Here's the local stack, where it falls short, and why it's worth an afternoon."
readTime: "5 min read"
---

I spent a whole weekend on this. Dan says that means I need a life, and he's probably right. But by Sunday night I had a video that zooms and pans across a script, and every model that touched it ran on my MacBook Air. No API keys, no internet connection, and no fan. It cost me $0.

I'm still a little geeked out about it.

## Six months makes a difference

The project started with my brother. He's an author, and in a meeting he asked whether I could make a video for him. Six months ago my answer would have been a list of chores: sign up for this API, and that one, pay this company and that company, then wire it all together.

This time I wanted to see what I could do with nothing but the laptop. It turns out I could build the whole thing locally, off a script, for free.

I used OpenCode to build the software around the video, and the video itself came out of models running on the same machine. That's the part that surprised me. Six months ago this wasn't realistic on a laptop. Now it's a weekend project.

## The stack, start to finish

If you're a home hacker, here's the whole setup. Every piece is free.

- **OpenCode.** An open-source coding agent in the same vein as Claude Code. You run it in your terminal.
- **Ollama.** It runs the model on your machine and serves it over a local API.
- **Weights from Hugging Face.** You create a free account, use the HF CLI, and download the model that fits your machine.

The flow looks like this. You, a human in a terminal, talk to OpenCode. OpenCode talks to Ollama over its API. Ollama runs the weights you downloaded. That's it. Nothing leaves the box.

The funny part is how I set it up. I had Claude walk me through it. Sign up for Hugging Face, download this weight based on your machine, start the Ollama service, install OpenCode. Claude taught me how to not use Claude. If you want to try this, do the same thing: ask Claude, and have it walk you through each step for your hardware.

## Memory is the real limit

Here's the honest part. My MacBook Air has 24GB of memory, the least you can get. When Ollama is running, it uses about 22GB of it. So while the model is loaded, I can't really open a browser or do much else. It's the laptop's whole job for that session.

For my use case, the limit isn't speed. The work is asynchronous, so if it takes a while, it takes a while. The limit is memory. The bigger the model, the more memory you need to hold it. A slow model that fits is useful. A fast model that doesn't fit is nothing.

There's a neat trick for this at home. You can connect multiple Macs together with a Thunderbolt connection and pool their memory to run a larger model. It might be slow, but you can run something your single machine can't hold.

And if you want the next level up, you can buy a Mac Studio with 128GB of RAM for around $5K. That's way more memory than my laptop has, and my guess is it would run a model in roughly the same range as Sonnet, the model Dan and I use every day. A one-time hardware cost for a local, free-to-run model in that range is a real option now.

## Where local still falls short

I don't want to oversell this. The models I can run on my laptop are not equal to today's Sonnet. They're closer to older versions. The frontier models, Fable, Opus, Sonnet 5.5, will blow them away on hard work.

We're also not leaving Anthropic. We're huge fans, we pay $200 a month, and we very rarely run out of tokens. Our goal right now is to automate as much as we can, and the frontier models are how we do that.

What we are doing is making sure we can switch. We pulled the agent foundation out of Shipwright so it can be used outside the software factory for anything you want, and the plan is to make it easy to point our core agents at a different model, including one running locally. We wrote about why we pulled that foundation out in [My AI Assistants Started Talking to Each Other](/blog/specialist-agents-function-and-access/). Being able to choose the model is part of the same idea.

## The use case I keep thinking about

Dan brought the best example to the episode, from his neighbor on a mountain bike ride.

His neighbor has a Mac Mini running Claude Code, plus a local model. He runs all his mail through it, both email and regular mail. Everything goes through the local model first, to catch things like Social Security numbers and strip them out or handle them locally. Only then does Claude Code do the heavy lifting.

That's a smart pattern. The local model is a privacy filter, and the frontier model does the hard reasoning. You get the quality of the big model without sending it everything. It's the kind of split I expect a lot more people to use once they realize the local half is free.

It's also why I think a small model will eventually ship with your operating system. Dan laughed when I said Apple would put an LLM on every Mac, and given where Siri is, I get it. But there are plenty of small jobs where a local model would help, and you shouldn't have to leave your laptop to do them.

## Try it this weekend

Here's my pitch. Get a Hugging Face account. It's free. Pick a model that fits your machine, run it with Ollama, and point OpenCode at it. Have Claude walk you through the setup. Then build something small with no internet connection and see how far it gets.

Image generation, video, code. I was blown away by what a fanless laptop can do. And this is just where things are today. When I run the same experiment six months from now, I expect to be even more blown away.

---

*This post is adapted from [The Velocity Lab podcast](https://podcasts.apple.com/podcast/the-velocity-lab/id1888653618), Episode 45: I Made a Video for $0 on a MacBook Air.*
