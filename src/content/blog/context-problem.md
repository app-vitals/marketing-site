---
title: "Why Your AI Coding Assistant Keeps Getting Your Codebase Wrong"
date: "2026-02-12"
author: "Dave O'Dell"
category: "AI Adoption"
excerpt: "By week three, your team's AI assistant is suggesting patterns you don't use. This is the context problem—and it has a surprisingly simple fix."
readTime: "6 min read"
---

Here's a scenario I see constantly: A team adopts an AI coding assistant. The first week, everyone's impressed. By the third week, complaints start rolling in. "It doesn't understand our codebase." "It keeps suggesting patterns we don't use." "It wrote code that passed linting but broke our integration tests."

The problem isn't the AI. The problem is that the AI has no idea how your team builds software.

## The Context Gap

Most AI coding tools are remarkably good at general programming. Ask them to write a React component, implement a sorting algorithm, or set up a REST endpoint, and you'll get solid code. But "solid code" and "code that belongs in your codebase" are very different things.

Your codebase has opinions. Conventions that evolved over years. Patterns that exist for reasons nobody documented. Architectural decisions that constrain how new code should be written. Error handling approaches. Testing philosophies. Naming conventions that go beyond what a linter can catch.

None of this is in the AI's training data. And if it's not written down anywhere in your repository, the AI can't learn it.

## What Context Actually Means

When we talk about "context" for AI tools, we mean everything an experienced engineer on your team knows intuitively:

**Architectural context.** How services communicate. Where business logic lives versus infrastructure code. Which patterns are preferred and which are legacy. What the dependency graph looks like and why.

**Convention context.** How you name things. How you structure files. How you handle errors. What your PR process expects. Where tests go and what they should cover.

**Historical context.** Why that weird abstraction exists (it's working around a vendor limitation). Why that service has its own database (it was acquired). Why that module has 100% test coverage (it handles payments).

**Organizational context.** Which team owns what. Who to ask about which subsystem. What compliance requirements affect the code. What the deployment process looks like.

An experienced engineer on your team carries all of this in their head. An AI assistant starts with none of it.

## The Documentation Multiplier

Here's the counterintuitive thing: **teams that document well get dramatically more value from AI tools than teams that don't.** It's not a small difference. It's the difference between AI being a genuine [force multiplier](/blog/velocity-engineering/) and AI being an expensive autocomplete.

When you have a well-maintained conventions file in your repo root that describes your patterns, architecture decisions, and coding standards, AI tools can read it. They adjust their suggestions accordingly. The code they produce actually looks like it belongs.

When you have architecture decision records that explain why your system is shaped the way it is, AI tools make suggestions that respect those constraints. They don't propose patterns that violate your architectural boundaries.

When you have clear module documentation that describes interfaces and contracts, AI tools generate code that integrates correctly — not just code that compiles.

## What to Document (and What Not To)

You don't need to document everything. You need to document the things that trip up someone new to the codebase — because that's exactly what an AI tool is. A very fast, very capable newcomer with zero institutional knowledge.

**High-value documentation for AI context:**

- **Coding conventions file.** Put it in the repo root. Cover naming, file structure, error handling, testing expectations. Update it when conventions change.
- **Architecture overview.** A single document that describes how the system fits together. Service boundaries, data flow, key abstractions.
- **Pattern catalog.** "When you need to do X, here's how we do it." Real examples from the codebase, not abstract guidelines.
- **Decision records.** Why did we choose this database? Why is authentication handled this way? The "why" is more valuable than the "what."

**Low-value documentation (for AI context):**

- API docs that duplicate what's in the code (AI can read the code)
- Step-by-step tutorials for basic operations
- Documentation that's more than 6 months out of date (worse than no documentation)

## What a Good Conventions File Looks Like

A conventions file lives in your repo root and gets read by AI tools at the start of every session. Most teams either skip it entirely or write something so generic it's useless ("write clean code, add tests"). Here's the structure that actually changes AI behavior:

**Tech stack and real usage (2–3 lines).** Not what's in your `package.json` — the AI can read that. What you actually use in practice. "We're on React 18 with hooks only. No class components. We use React Query for server state; no Redux." This prevents the AI from defaulting to patterns from older documentation it absorbed during training.

**File structure conventions (5–10 lines).** Where does business logic live? Where do types go? What's the folder naming convention? If you put API clients in `services/`, feature flags in `lib/flags.ts`, and shared types in `types/`, write that down. The AI will follow it.

**Patterns you use vs. patterns you don't.** This is the highest-ROI section. List what's idiomatic in your codebase — and just as importantly, what you've explicitly rejected. "We use the repository pattern for data access — no raw database calls in handlers." "No default exports." "Typed errors only, never string messages." Negative constraints matter as much as positive ones.

**Error handling and logging.** How do errors propagate? Custom error classes? Log at the handler level or deeper? One paragraph here saves hours of cleanup on every AI-generated PR.

**Testing expectations.** Unit vs. integration split? Co-located test files or separate directory? Do you mock external dependencies or use test doubles? Coverage gates? The AI will write tests that match whatever you describe here.

**PR and commit conventions.** Commit message format, branch naming, PR checklist items. The AI is writing code that will become a PR — give it the constraints it needs to pass review on the first try.

The whole file should fit under 200 lines. Long enough to be useful, short enough that engineers actually maintain it. Treat it as a living document — when you catch the AI making the same mistake twice, that's a documentation gap worth closing.

## Before and After: What Context Actually Changes

Same task, same AI tool, two different codebases.

**The ask:** "Add an endpoint to fetch user activity for the last 30 days."

**Without context docs**, the AI generates something like:

```typescript
app.get('/users/:id/activity', async (req, res) => {
  try {
    const { id } = req.params;
    const activities = await db.query(
      'SELECT * FROM activities WHERE user_id = ? AND created_at > ?',
      [id, new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)]
    );
    res.json({ data: activities });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
```

It works. It compiles. It would pass a generic code review. But it has raw SQL in a handler (your team uses the repository pattern). It returns a plain object (your team has a response envelope schema). The error swallows the message (your team throws typed errors that middleware catches). The date math is inline (your team has a `dateUtils` module). Every deviation from convention is a PR comment, and PR comments mean another review cycle.

**With a good conventions file**, the AI generates something much closer to:

```typescript
router.get('/:id/activity', requireAuth, async (ctx) => {
  const { id } = ctx.params;
  const since = dateUtils.daysAgo(30);
  const activities = await activityRepo.findByUser(id, { since });
  return ctx.ok({ activities });
});
```

Same feature. But now it's using your router pattern, your auth middleware, your repository, your date utility, your response helper. It looks like it was written by someone who's been on the team for a year. The PR gets approved in one pass and ships.

The difference isn't the AI. The difference is the context.

## One-Hour Context Audit

Before you write a single line of documentation, spend an hour finding your gaps. This is the exercise we run with every team we work with.

**Step 1: Collect three recent PR reviews (15 min).** Pull the last month of merged PRs and look at the review comments. Ignore formatting nits — filter for substantive feedback like "we don't do it this way" or "use the X pattern instead." Every correction that had to be made in review is a documentation gap.

**Step 2: Ask your AI tool to write something it'll get wrong (15 min).** Pick a well-understood, mid-complexity feature — something new, not a change to existing code. Let the AI generate a draft. Don't correct it. Just collect the mistakes. Every deviation from your conventions is something to document.

**Step 3: Interview your most productive code reviewer (15 min).** Ask them: "What do you catch most often in review that linting doesn't catch?" Their answers are your conventions file. These are the things that live in experienced engineers' heads and nowhere else.

**Step 4: Write it down (15 min).** Start the conventions file. Don't aim for perfection — aim for coverage. A rough draft that captures 80% of the important stuff is infinitely more useful than a perfect draft that never gets finished.

That's two hours total to meaningfully improve every AI interaction your team has for the next year. Few investments have that ROI.

## The Compound Effect

Good documentation doesn't just help AI tools. It helps the AI tools help your team help each other. Here's the cycle:

1. You document your conventions and architecture
2. AI tools produce better suggestions that match your patterns
3. Engineers trust the AI more and use it for more complex tasks
4. AI-generated code is easier to review because it follows conventions
5. Reviews go faster, so engineers document more of their decisions
6. The documentation gets better, and the cycle accelerates

We've seen teams go from "AI is useless for our codebase" to "AI handles 60% of the boilerplate perfectly" in the span of a few weeks — just by writing better documentation.

## The Real Objection

I know what you're thinking: "We've tried to get the team to write documentation. It doesn't stick."

Fair. But the calculus has changed. Before AI tools, documentation was a nice-to-have that helped onboarding and reduced bus factor. Now it's a direct multiplier on your AI investment. Every hour spent on good documentation saves dozens of hours of correcting AI suggestions that don't fit your codebase.

Frame it that way to your team. Don't say "we need better docs." Say "the AI keeps writing code that doesn't match our patterns because it doesn't know our patterns. Let's fix that."

## Start Small

You don't need a documentation sprint. Start with one file:

Create a conventions file in your repo root. Spend an hour with your senior engineers capturing the top 20 things a new engineer would need to know. Patterns, anti-patterns, architectural constraints, naming conventions.

Then watch what happens when your AI tools read it.

The teams that get the most out of AI aren't the ones with the best AI tools. They're the ones whose codebases are legible — to humans and machines alike. Without that legibility, even the most powerful AI assistant is [just fancy autocomplete](/blog/ai-fancy-autocomplete). Context isn't just infrastructure for AI. It's infrastructure for your entire engineering organization. AI just makes the ROI undeniable.
