# Writing a LinkedIn post

> Written as a skill-ready doc — see the note in `CLAUDE.md` ("Brand & Voice").
> If you're in an interactive session, feel free to promote this into a real
> `.claude/skills/linkedin-post/SKILL.md` (add YAML frontmatter with `name`
> and `description`, drop this note).
>
> This doc covers **promotional LinkedIn posts tied to a blog post published
> in this repo** — the pattern in `content-calendar/linkedin-drafts.md`. For
> standalone personal thought-leadership posts on the three-account matrix
> (Dave / Dan / App Vitals page, not tied to a specific blog post), see the
> `linkedin-post` skill in the `goals` repo instead — that's a different
> workflow with its own file locations and cadence rules.

## Before you start

Read `docs/content-writing/blog-post.md`'s "Before you start" and "Voice,
condensed" sections first — same voice guide, same AI-tell checklist, applies
here too.

## Format rules (LinkedIn-specific, on top of general voice)

- **Length:** 1,200-1,800 characters (~200-300 words).
- **No external links in the body.** Put the blog URL in a note below the
  copy boundaries — cost of an in-body link is 25-60% of reach.
- **No markdown in the copy itself** — use `→` and `•`, not `-`. Every visual
  line break needs a blank line (single breaks collapse on paste).
- **Author register matches the blog post's `author` field.** Dan's posts
  promote in his infra/ops first-person voice; Dave's promote in his
  build-in-public/strategy voice. Don't swap them.
- **3-5 hashtags** at the end, inside the copy boundaries.
- **Timing:** Tue-Thu, 8-10am PST/ET preferred. If the blog drops on a
  weekend, hold the LinkedIn promo for the next Monday morning
  (see `content-calendar/publishing-schedule.md`'s pattern).

## Hook formulas (first ~140 characters matter most)

| Formula | Example |
|---|---|
| Surprising statistic | "77% of organizations can't measure ROI on AI." |
| Contrarian claim | "Your AI coding tool rollout is failing — and nobody's telling you." |
| In medias res | "The Slack message came in at 6 AM." |
| Curiosity gap | "There's one thing every failed AI rollout has in common." |
| Direct question | "How many of your engineers are hiding their AI usage?" |

Prefer whichever hook is truest to what actually happened in the post — a
manufactured hook that doesn't match the piece is exactly the "formula-shaped
thought leadership" the voice guide calls out as the weakest-performing
pattern.

## Structure

```
[Hook — 1-2 lines, specific or contrarian]

[Context — 2-3 sentences, the real story or problem]

[Insight — the actual takeaway, in our voice, not a listicle]

[Optional supporting points]

[CTA — a real question tied to something specific in the post, not "thoughts?"]

[3-5 hashtags]
```

## What kills reach (avoid these — mechanical lint won't catch them)

- External links in the body
- Not engaging in the first 30-90 minutes after posting
- Editing the post in the first 90 minutes
- Engagement bait ("like if you agree")
- Generic AI content — run the AI-tell checklist before this ships

## Workflow

1. **Pick the post to promote.** Usually the most recently drafted or
   published entry in `src/content/blog/`.
2. **Draft the hook.** 2-3 options, pick the one truest to the post.
3. **Draft the full post** following the structure above, in the matching
   author's register.
4. **Self-edit** with the AI-tell checklist (`docs/content-writing/blog-post.md`
   or `../goals/brand/VOICE.md`).
5. **Mechanical lint:**
   ```bash
   python3 brand/brand-lint.py --brand-dir brand content-calendar/linkedin-drafts.md
   ```
6. **Append to `content-calendar/linkedin-drafts.md`** under a new
   `## Post N — <date>` heading, with a `**Promoting:** <blog post title>`
   line, matching the existing file's format.
7. **Update `content-calendar/publishing-schedule.md`** with the publish
   date, hook, and status.
8. **Note the blog URL** below the copy, not inside it:
   `https://app-vitals.com/blog/<slug>/`.
9. **PR** with a `content:` commit prefix.
