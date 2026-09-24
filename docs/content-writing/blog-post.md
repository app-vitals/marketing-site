# Writing a blog post

> Written as a skill-ready doc — see the note in `CLAUDE.md` ("Brand & Voice").
> If you're in an interactive session, feel free to promote this into a real
> `.claude/skills/blog-post/SKILL.md` (add YAML frontmatter with `name` and
> `description`, drop this note).

## Before you start

1. **Read the voice guide below.** "Voice, condensed" and "The AI-tell
   checklist" cover the essentials. A fuller narrative version with worked
   examples exists internally — ask Dan or Dave if you want it — but it's
   not required to write a good post.
2. **Check for overlap.** Skim `src/content/blog/` titles and
   `content-calendar/publishing-schedule.md` for posts covering similar
   ground recently. A new post should add a distinct angle, not restate one.
3. **Pick the author.** Dan McAulay writes in an infrastructure/ops
   first-person register ("20 years of DevOps/ops"). Dave O'Dell writes the
   build-in-public and strategy register. Don't put one's voice in the
   other's mouth — read 1-2 recent posts by whichever author you're writing
   as before drafting (e.g. `pointy-haired-boss.md` for Dan,
   `the-model-doesnt-matter-anymore.md` for Dave).

## Frontmatter schema

Enforced by `src/content.config.ts` — a post that doesn't match this fails
the build. That file is the source of truth for the field list below; if the
two ever disagree, trust the schema and update this example.

```yaml
---
title: "..."                              # string
date: "YYYY-MM-DD"                        # must match this exact format
author: "Dan McAulay"                     # or "Dave O'Dell"
category: "AI Adoption"                   # one of the four below, exact string
excerpt: "..."                            # 1-2 sentences, used in previews/SEO
readTime: "6 min read"                    # honest estimate, ~200 wpm
faq:                                      # optional
  - question: "..."
    answer: "..."
---
```

Valid `category` values (exact, case-sensitive): `AI Adoption`,
`Engineering Velocity`, `Technical Leadership`, `Company Updates`.

## Voice, condensed

(A fuller version with worked examples exists internally — ask Dan or Dave.)

- **Direct, not harsh.** Name the failure plainly, aim it at a pattern —
  never a person, team, or named vendor.
- **Expert, not academic.** Plain language, concrete nouns. Don't flaunt
  vocabulary, don't bury the point in it.
- **Contrarian, not edgy.** The counterintuitive take has to be true *and*
  useful — and cost you something to say.
- **Honest about limits, not hedging.** Admitting what didn't work is the
  trust mechanism. "Results may vary" is the opposite of it.
- **Specific, not vague.** Real numbers or nothing. No number, no claim.
- No hype words (world-class, game-changing, blazingly fast, best-in-class,
  revolutionize, cutting-edge) — `brand/terminology.yaml` catches these
  mechanically, but write around them in the first place.

## The AI-tell checklist

Run this on the full draft before it ships — it catches what word-choice
lint can't.

- **Vary the rhythm.** Any three consecutive sentences of similar length —
  break the pattern. Uniform sentence length is a stronger AI tell than any
  single word choice.
- **Cut the connective tissue.** "Moreover," "furthermore," "additionally,"
  "in conclusion," "it's important to note" — just move to the next sentence.
- **Watch for hollow rhetorical scaffolding.** A flat statement followed by a
  one-line turn, or a "not X, not Y, Z" construction, only works when it
  resolves to something concrete and specific. Never ship one as decoration.
- **The "only we could know" test.** Every major beat needs a detail — a
  number, a specific disagreement, a memory — that couldn't have come out
  the same under someone else's byline. If a paragraph could've been written
  by any other AI-adoption consultant, cut it or make it specific to us.
- **Seed the draft, don't cold-start it.** Write the opening two or three
  sentences yourself, or paste in a paragraph from a recent published post as
  a style anchor, before handing the rest to AI. A blank prompt produces
  generic output; a voice sample doesn't.
- **Read it aloud before it ships.** Anything that sounds like a press
  release out loud gets rewritten by hand, not re-prompted.

## Workflow

1. **Topic & angle.** What's the specific insight, story, or number driving
   this post? Confirm the author and category.
2. **Draft.** Match the frontmatter schema exactly. Body is Markdown —
   `##` section headers, internal links to related posts
   (`[text](/blog/slug/)`) where it strengthens the piece.
3. **Self-edit.** Run the AI-tell checklist above.
4. **Mechanical lint.** From repo root:
   ```bash
   python3 brand/brand-lint.py --brand-dir brand src/content/blog/<slug>.md
   ```
   Fix HIGH findings before proceeding; LOW findings are judgment calls (the
   tool's `note` field usually says why).
5. **Save & branch.** File goes in `src/content/blog/<slug>.md`. Branch name:
   `feat/<slug>` or `content/<slug>`. Never commit to `main`.
6. **Build check.** `npm run build` (validates frontmatter against the
   schema) and `npm run check`.
7. **Update the calendar.** Add a row to `content-calendar/publishing-schedule.md`
   if this post is part of a promoted sequence with a LinkedIn companion.
8. **PR.** Conventional commit prefix (`feat:`, `docs:`, `content:`), squash
   merge per repo convention.
