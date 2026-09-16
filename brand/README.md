# Brand — vendored copy

The full voice guide — voice traits, signature moves, tone matrix, claims
policy, competitor-naming rules, and the governance log behind all of it —
lives in a private internal repo, not here. Ask Dan or Dave for it if you
need the fuller version. `docs/content-writing/` in this repo inlines the
parts that matter for drafting a blog post or LinkedIn post, so you don't
need access to it for day-to-day writing.

What's here is the **mechanical subset only** — `terminology.yaml` (word
choices) and `brand-lint.py` (the deterministic checker), synced from that
private source so this public repo can run an automated check in CI without
needing it checked out. See `CLAUDE.md` for the narrative voice guidance
this lint doesn't cover, and the AI-tell checklist to run by hand before a
post ships.

No `tokens.json` here — this repo has its own design tokens in
`src/styles/global.css`, unrelated to App Vitals' company-level brand colors.
`brand-lint.py` runs fine without one; the color check just no-ops.

**Keeping in sync:** `terminology.yaml` is a manual copy, not a straight
copy-paste — this repo is **public**, and the source file has a `preferred`
block of "never-print" competitor/benchmark entries with their reasoning
attached (why a specific name or benchmark is avoided). Do not vendor those
here: stating that policy publicly, reasoning included, is itself the
disclosure the policy exists to prevent. Everything else (casing, product
names, banned hype words, the AI-tell markers) is fine to copy as-is. When
the source file changes, re-copy it here **minus that block** — check the
file header for the current exclusion list before syncing. There's no
automation for this yet; a careful manual sync is the honest starting point.
