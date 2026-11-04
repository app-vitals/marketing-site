# Plan: grain-flicker-fix

Repo: `app-vitals/marketing-site`

## Problem
Dan sees flickering around the border of the site in Chrome (desktop). Unchecking `animation` on `.grain-overlay` in DevTools fixed it, confirming the cause.

`.grain-overlay` (`src/styles/global.css`) is a `position: fixed; inset: 0` layer at 3% opacity running `animation: grain 0.5s steps(1) infinite`. The `grain` keyframes translate the layer by up to -5%..+12% (x) / -15%..+9% (y) in hard steps (~10fps), exposing untextured strips along the viewport edges that change every ~0.1s. It is a faint, motion-only artifact, which is why it does not show in screenshots.

## Findings
- Only `src/styles/global.css` (rule, keyframes, `--animate-grain` theme var) and `src/layouts/BaseLayout.astro:142` (mount) reference grain.
- No tests, docs, or other pages reference grain. `--animate-grain` / `animate-grain` utility is unused.
- Glow orbs are not implicated (DevTools test isolated the grain animation).

## Design (CSS only, one file)
1. Remove `animation: grain ...` from `.grain-overlay`; keep static texture and 3% opacity.
2. Delete `@keyframes grain` and `--animate-grain`.
3. Remove `.grain-overlay` from the `prefers-reduced-motion` selector list (nothing left to reduce); `.reveal` and `.glow-orb` stay.
4. Leave the mobile `display: none` for `.grain-overlay` and the glow orbs unchanged.

## Test decision
Visual CSS change; no unit/e2e layer fits. Verified by `npm run build`, a grep showing no `animate-grain` / `keyframes grain`, and Dan confirming the border is steady on the preview. No existing tests retired (none reference grain).

## Tasks

| ID | Depends on | Blocks | HITL |
|---|---|---|---|
| GFX-1.1 | — | — | |

**GFX-1.1** — `fix: remove grain overlay animation causing border flicker` — Frontend, 1h, complexity 1, model haiku, branch `fix/gfx-1-1-remove-grain-animation`. Safe to deploy standalone: yes.

Acceptance criteria:
- `.grain-overlay` has no `animation`; `@keyframes grain` and `--animate-grain` are removed from `global.css`.
- `.grain-overlay` removed from the reduced-motion selector list; static texture still renders; mobile `display: none` unchanged.
- `npm run build` passes and `grep -rn "animate-grain\|keyframes grain" src` returns nothing.
- Test decision: no test layers affected (visual CSS only); no existing tests retired (none reference grain).
