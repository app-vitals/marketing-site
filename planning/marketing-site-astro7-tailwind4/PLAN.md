# Plan: marketing-site-astro7-tailwind4

Repo: app-vitals/marketing-site

## Goal
Upgrade to latest astro (7.x, >=7.2.8 fixes critical GHSA-26w7-cxv4-gfx2, AVIF/libheif RCE) and latest tailwind (4.x via `@tailwindcss/vite`), on Node 24 LTS. Resolves the blocked tasks `security-osv-cve-marketing-site-2026-W41` and `security-grype-cve-marketing-site-2026-W41`.

## Findings
- Fix exists only in astro 7.2.8+; no 5.x backport. `@astrojs/tailwind` 6.0.2 (last release) peers astro <=5, so it is removed.
- Astro 7 requires Node >=22.12.0. CI pins Node 20 (EOL April 2026). Node 24 is the current LTS line; Node 22 is in maintenance.
- Real exposure today is low: `output: 'static'`, no `astro:assets`/`<Image>`/AVIF use.
- Tailwind footprint: `src/styles/global.css` (`@tailwind` directives + 3 `@apply`), `src/pages/blog/[id].astro` (~22 `@apply` in scoped `<style>`; Tailwind 4 needs `@reference`), `tailwind.config.mjs` (66 lines: colors, fonts, 8 animations, 4 keyframes -> `@theme`).
- Keep TypeScript on 5.9.x: `@astrojs/check` 0.9.10 peers TS ^5 || ^6.
- `src/content.config.ts` uses glob loader and `z` from `astro:content`; verify against astro 7.
- Playwright smoke tests do not cover styling; visual parity needs before/after screenshots.

## Tasks
| Task | Title | Layer | Hrs | Cx/Model | Deps | HITL |
|---|---|---|---|---|---|---|
| MSA-1.1 | Set Vercel project Node to 24.x | Shared | 0.5 | 1/haiku | - | HITL |
| MSA-1.2 | Move CI/.nvmrc/engines to Node 24 + in-semver lockfile bump | Shared | 2 | 2/haiku | - | |
| MSA-2.1 | Upgrade astro 5->7 and tailwind 3->4 (Vite plugin, @theme) | Frontend | 6 | 4/sonnet | 1.1, 1.2 | |

```
[START]
  ├─ MSA-1.1 (HITL, no deps)
  └─ MSA-1.2 (no deps)
        └─ MSA-2.1 (needs 1.1, 1.2)
```

Astro 7 cannot use `@astrojs/tailwind` and Tailwind 4 needs the Vite plugin, so they ship in one atomic PR.

## Breaking Change Safety
All tasks safe to deploy standalone. 2.1 updates every consumer in the same PR.

## Follow-up
After MSA-2.1 merges, close both blocked security tasks with a note pointing at the PR.

## Decision Log
- TypeScript: kept at 5.9.x (astro check peer range).
- Visual diff lives in the PR as screenshots, not permanent CI tests.
- Node target: 24 (LTS), `engines` floor `>=22.12.0`.
