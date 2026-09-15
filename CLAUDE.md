# CLAUDE.md — App Vitals Marketing Site

## Stack
- **Framework**: Astro (static site generation, no SSR)
- **Styling**: Tailwind CSS
- **Hosting**: Vercel
- **Domain**: app-vitals.com

## Project Structure
```
src/
  components/   # Reusable .astro components
  layouts/      # Page layouts (BaseLayout.astro)
  pages/        # File-based routing
  styles/       # Global CSS (global.css)
public/         # Static assets (favicon, images, robots.txt)
planning/       # PRD, task breakdown, clarifying questions
```

## Conventions
- **Commits**: Conventional commits (`feat:`, `fix:`, `docs:`, `chore:`)
- **Branches**: Feature branches (`feat/av1-description`) + squash merge PRs
- **Never commit to main**
- **No runtime JS** unless absolutely needed (Astro islands only if required)
- **Mobile-first** responsive design
- **Files**: ~200 lines max per file

## Design Tokens
- **Background**: Deep navy `#080E1E` (navy-950), `#0F172A` (navy-900)
- **Accent**: Electric blue `#3B82F6`, Cyan `#22D3EE`, Violet `#8B5CF6`
- **Text**: White on dark, `text-white/40-50` for body, `text-white/25` for subtle
- **Display font**: Space Grotesk (Google Fonts) — headings, brand
- **Body font**: General Sans (Fontshare) — paragraphs, UI
- **Mono font**: JetBrains Mono — labels, tags, metadata
- **Max width**: `max-w-6xl` (1152px)
- **Aesthetic**: Premium editorial — grain texture overlay, animated gradient glow orbs, scroll reveals, gradient text, mouse-tracking card glow effects
- **Inspiration**: Linear.app, Stripe annual letters — dark, confident, memorable

## Content Rules
- NO client names (anonymize everything)
- NO specific pricing or rates
- Email capture: ONLY the content-subscription form (double opt-in, with the frequency promise shown). NO lead-gen gates, gated downloads, popups, or interstitials.
- Booking link lives in `src/consts.ts` as `BOOKING_URL` — import it, never hardcode a booking URL
- Co-founders: Dan McAulay + Dave O'Dell

## Brand & Voice

Writing a blog post or a LinkedIn draft in this repo? Read
`docs/content-writing/blog-post.md` or `docs/content-writing/linkedin-post.md`
first — both walk through voice, structure, and the checks below so you don't
have to hold this section in your head. (These are written as skill-ready
docs — promoting them to real `.claude/skills/` entries is a follow-up; that
directory can't be edited from every session, plain docs can.)

- **Narrative source of truth lives in the private `goals` repo**, checked
  out alongside this one at `../goals`: read `brand/VOICE.md` (voice traits,
  signature moves, tone matrix, the AI-tell checklist) and `brand/MESSAGING.md`
  (claims policy, competitor-naming rules) before writing. It stays private
  because it carries internal performance data (impression counts, proof
  gaps) alongside the voice guidance itself — see `../goals/CLAUDE.md`.
- **Mechanical word-choice rules are vendored here** in `brand/terminology.yaml`,
  checked by `brand/brand-lint.py` (stdlib-only Python 3, no deps). CI runs it
  automatically against any changed file under `src/content/blog/` or
  `content-calendar/` on every PR. Run it yourself before pushing:
  ```bash
  python3 brand/brand-lint.py --brand-dir brand $(git diff --name-only --diff-filter=d main -- src/content/blog content-calendar)
  ```
  It's a synced copy, not generated — if `goals/brand/terminology.yaml`
  changes, re-copy it here (see `brand/README.md`).
- **The AI-tell checklist** (`goals/brand/VOICE.md`, "AI-tell checklist"
  section) is the pass that catches what the mechanical lint can't: uniform
  sentence rhythm, connective-tissue filler, hollow use of our own signature
  rhetorical moves, and the "only we could know" specificity test. Run it by
  hand on every AI-assisted draft before it ships — the lint only catches
  banned words, not generic prose shaped correctly.
- **No `goals` checked out?** The two skills inline the essential checklist
  so drafting still works without it — but the full narrative doc has more
  context and worked examples, and is worth reading if you can.

## Testing

Read `docs/testing.md` before touching `tests/` — it covers the Playwright
smoke suite (the only test layer; there's no unit/integration layer on this
static site), how to run it (`npm test`), the `tests/fixtures.ts`
network-stubbing convention (and why: keeps CI from polluting GA4 analytics
with synthetic traffic; LinkedIn suppression is handled separately via a
`BaseLayout.astro` hostname guard), and the CI wiring in
`.github/workflows/ci.yml`.

## Commands
```bash
npm run dev      # Local dev server
npm run build    # Production build
npm run preview  # Preview production build
```

## Deploy model
**direct** — Vercel's GitHub integration auto-deploys `main` on merge (confirmed
2026-08-28 via a real merge). There is no staging/canary/promote pipeline, and
none is needed.

## Deploy
```bash
source /home/pi/.openclaw/workspace/.secrets.env
npx vercel --prod --token "$VERCEL_TOKEN_APP_VITALS"
```
