# Brand — vendored copy

Source of truth for App Vitals voice and terminology lives in the private
`goals` repo: `brand/VOICE.md`, `brand/MESSAGING.md`, `brand/decisions.md`.
That's where the judgment calls, the performance data behind them, and the
governance log live — it stays private on purpose (see `goals/CLAUDE.md`).

What's here is the **mechanical subset only** — `terminology.yaml` (word
choices) and `brand-lint.py` (the deterministic checker), synced from `goals`
so this public repo can run an automated check in CI without needing the
private repo checked out. See `CLAUDE.md` for the narrative voice guidance
this lint doesn't cover, and the AI-tell checklist to run by hand before a
post ships.

No `tokens.json` here — this repo has its own design tokens in
`src/styles/global.css`, unrelated to App Vitals' company-level brand colors.
`brand-lint.py` runs fine without one; the color check just no-ops.

**Keeping in sync:** `terminology.yaml` is a manual copy, not a straight
copy-paste — this repo is **public**, and the source file in `goals` has a
`preferred` block of "never-print" competitor/benchmark entries with their
reasoning attached (why a specific name or benchmark is avoided). Do not
vendor those here: stating that policy publicly, reasoning included, is
itself the disclosure the policy exists to prevent. Everything else (casing,
product names, banned hype words, the AI-tell markers) is fine to copy as-is.
When `goals/brand/terminology.yaml` changes, re-copy it here **minus that
block** — check the file header for the current exclusion list before
syncing. There's no automation for this yet; a careful manual sync is the
honest starting point.
