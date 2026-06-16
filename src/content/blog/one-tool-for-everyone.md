---
title: "One Tool for Everyone: Claude Beyond the Engineering Team"
date: "2026-04-13"
author: "Dave O'Dell"
category: "AI Adoption"
excerpt: "Claude isn't just for engineers. Here's how marketing, ops, and data teams are getting massively accelerated—and why one tool for everyone is the real unlock."
readTime: "8 min read"
---

We've been inside engineering organizations long enough to see a pattern that keeps repeating itself. A company rolls out AI tools for the engineering team, gets real productivity gains, and then stops there. Marketing is still manually pulling Amplitude dashboards. Operations is still wrestling with the same half-broken admin app. Data analysts are still fielding the same five requests from business development every week.

The unlock that most companies are missing isn't a better AI tool. It's using the same AI tool everywhere — across every function, every team, every person in the building.

This week, we saw what that actually looks like in practice. And it changed how we think about the ceiling on what's possible.

## What We've Been Getting Wrong About AI Adoption

Most AI adoption efforts are scoped to engineering. That makes sense on the surface — engineers are technically sophisticated, they can evaluate tools, and they produce software, which is the obvious output you want to accelerate. We've written before about the [common mistakes enterprises make when rolling out AI](/blog/enterprise-ai-adoption-mistakes/), and one of the biggest is treating this as an engineering initiative when it's actually a company-wide one.

The real unlock is when the whole organization converges on a single tool and builds a shared ecosystem on top of it.

We've argued this from the [velocity trap perspective](/blog/velocity-trap/) — that the scattershot approach (Copilot for engineers, ChatGPT for managers, Gemini for somebody who read a blog post) kills adoption and wastes money. But this week reinforced something bigger than just tool consolidation. It's not just that everyone should use one tool. It's that when they do, the things people build start to compound across team boundaries in ways that are genuinely remarkable.

## The Snowflake Setup That Changed Our Thinking

Here's the specific situation we encountered this week. An organization had its data warehouse sitting in Snowflake — production database data, marketing analytics, sales pipeline data, all of it. A subject matter expert who managed that data warehouse spent time building something that changed how everyone in the company accesses information.

He built an MCP server connected to Snowflake. But that alone isn't the interesting part.

The interesting part is what he did with documentation. He had Claude go through the entire data warehouse and self-document the schema — every table, every field, every relationship. Claude explored the data, wrote descriptions, and generated a domain-specific dictionary so that natural language queries would resolve to the right tables without anyone needing to know the join keys or the actual column names.

Then he went through and corrected the parts that were still technically accurate but operationally wrong. You know the kind of thing: an `ended_at` timestamp field that was superseded by a newer field, but the old one still exists in the schema. Claude flagged it. The domain expert fixed the documentation. Now the dictionary reflects how the data actually works, not just how it was built.

The end result: he created a single tool, as a single person, that any team in the company can now use. Developers use it. Marketing uses it. Business development uses it. Customer support uses it. Nobody had to learn a new query language. Nobody had to file a ticket asking for a new dashboard. They just ask Claude what they want to know about the business.

## Why Admin Apps Have Always Been Broken

There's a reason we smiled when this came up. Admin apps are always a mess — not because the engineers who built them were bad, but because they're never the priority. They're internal tooling. They don't ship customer-facing features. They get built fast, they accumulate hacks, they never get refactored because there's always something more urgent.

Customer support teams and ops teams have been suffering with these tools for years, quietly. They adapt. They find workarounds. They accept that certain things just take longer than they should.

The MCP approach inverts this entirely. Instead of building a new admin app feature every time someone in operations needs to do something new, you give them an MCP server and let Claude be the interface. Customer support needs to take an action in your system? MCP. Data team needs to explore a segment they've never looked at before? MCP. No feature request. No sprint cycle. No waiting.

This is what we mean when we talk about [velocity engineering](/blog/velocity-engineering/) — not just writing code faster, but changing the shape of the loop entirely.

## The Person in Marketing Who's 50% More Efficient

We also spent time with someone on the marketing and sales side this week. What she's doing with Claude Desktop is genuinely impressive — the kind of thing that's hard to describe without sounding like hype, but it's real.

She's not a software engineer. She's not writing code. But she's using Claude Desktop with connections to the data that matters to her, and she's operating at a level that would have required a data analyst or a BI team a year ago.

Our honest take: without that one tool, she'd be running at roughly half the efficiency. Not because she lacks capability — she's clearly very capable — but because so much of what she was doing before was mechanical. Pulling the same data in the same way, reformatting it, presenting it. Now that's handled. She's focused on what she's actually good at.

The thing that makes this work is curiosity. The people winning at this right now are the curious ones — the ones who don't wait to be trained on the tool, who just start poking at it, who figure out what's possible and then build workflows around it.

## Different Interfaces, Same Ecosystem

Here's something we want to be clear about, because it matters for how you think about rollout. Engineers and non-engineers don't have to use the exact same interface to be on the same tool. In our experience, engineers gravitate toward Claude Code in the terminal — that's where they live, that's where it makes sense. Non-engineers gravitate toward Claude Desktop, where the project management and conversation interface fits how they actually work.

But they're in the same ecosystem. Same underlying model. Same skills and workflows that can be shared. Same MCP servers that one team builds and another team uses.

That's the key. When the data team builds an MCP server that connects to Snowflake, the engineering team can use it too. When someone in marketing builds a skill that produces a weekly report in a particular format, they can share that with anyone on their team. The knowledge compounds horizontally instead of staying siloed inside each function.

This is fundamentally different from a world where engineering uses Cursor and marketing uses ChatGPT. Those ecosystems don't talk to each other. The things people build don't transfer. You pay for two tools and get a fraction of the value of one.

## Skills Are the Compounding Asset

One more thing we've been saying more and more: the first time you do something in Claude is the investment. The skill you build from that session is the return.

This is especially true outside engineering, where people are often doing repeated workflows — weekly reports, monthly analyses, data pulls that follow the same pattern. The instinct is to chat with Claude, get a result, close the tab, and do it again next week from scratch.

That's leaving most of the value on the table.

The better approach: get the result you want the first time, then immediately ask Claude to turn that workflow into a skill. Document what data you pulled, where you got it, how you structured the output. The next time you run it, you invoke the skill instead of rediscovering the workflow. It becomes repeatable, refinable, faster every time.

This is what's missing from a lot of AI adoption advice — the emphasis on building systems, not just using tools. We've talked about the [context problem](/blog/context-problem/) before, but the flip side of that is skills: when you encode the right context into a reusable workflow, every future execution benefits from the work you already did.

## One Thing Anthropic Still Needs to Build

We'll be honest about where this isn't quite there yet. The thing that's noticeably missing is scheduled tasks — the ability to say "run this report every morning and put it in my inbox" without custom infrastructure.

The people who build a great reporting skill in Claude immediately want to automate it. They don't want to invoke it manually every day. They want the morning brief waiting for them. Claude Code has cron support if you build around it, but there's no native scheduled execution in Claude Desktop or the consumer interfaces.

That capability is coming — it's obvious where the product is heading — but it's not there yet. Similarly, there's no clean connection between Claude Code projects and Claude Desktop projects. Someone doing discovery work in Claude Code can't yet automatically surface artifacts into a colleague's Claude Desktop project. You export and import. It works, but it's not seamless.

These are real gaps. But they're the kind of gaps that matter precisely because the rest of the system is working so well that people immediately want more.

## The Bottom Line

If you're in leadership and you're still letting every team pick their own AI tool, you're leaving most of the value on the floor.

Pick one. We recommend Claude — not because we're biased (we are a little biased), but because we've watched it work for software engineers and non-software engineers in the same organization, in the same week, building on top of each other's work. That's not something you get from a fragmented toolset.

Your marketing team should be on it. Your ops team should be on it. Your customer support team should be on it. Not because it's the coolest thing to do, but because every one of those teams has repetitive, knowledge-intensive work that Claude can take off their plate — and every skill they build becomes infrastructure the next person can use.

Get curious. Get building. The people winning right now aren't the ones with the most sophisticated tools. They're the ones who built the best systems.

---

*This post is based on Episode 9 of The Velocity Lab — "One Tool for Everyone: Claude Beyond the Engineering Team." Listen on [Apple Podcasts](https://podcasts.apple.com/podcast/the-velocity-lab/id1888653618).*
