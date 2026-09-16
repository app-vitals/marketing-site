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

- **The fuller narrative voice guide lives in a private internal repo**, not
  this one — ask Dan or Dave for it if you need the full version (voice
  traits, signature moves, tone matrix, claims policy, competitor-naming
  rules). It stays private on purpose. `docs/content-writing/` below inlines
  the parts that matter for drafting here, so you don't need access to it.
- **Mechanical word-choice rules are vendored here** in `brand/terminology.yaml`,
  checked by `brand/brand-lint.py` (stdlib-only Python 3, no deps). CI runs it
  automatically against any changed file under `src/content/blog/` or
  `content-calendar/` on every PR. Run it yourself before pushing:
  ```bash
  python3 brand/brand-lint.py --brand-dir brand $(git diff --name-only --diff-filter=d main -- src/content/blog content-calendar)
  ```
  It's a synced copy, not generated — see `brand/README.md` for how it's kept
  in sync.
- **The AI-tell checklist** (`docs/content-writing/blog-post.md`, "The
  AI-tell checklist" section) is the pass that catches what the mechanical
  lint can't: uniform sentence rhythm, connective-tissue filler, hollow use
  of our own signature rhetorical moves, and the "only we could know"
  specificity test. Run it by hand on every AI-assisted draft before it
  ships — the lint only catches banned words, not generic prose shaped
  correctly.

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

## Third-Party Service Dependencies
- **GA4** — `src/layouts/BaseLayout.astro`. Measurement id `G-H7QY6C7T1L`, hardcoded
  twice: the `gtag.js` script `src` query param and the `gtag('config', ...)` call.
  Rotating the property means updating both.
- **LinkedIn Insight Tag** — `src/layouts/BaseLayout.astro`. Partner id `9897204`,
  hardcoded in three places: `window._linkedin_partner_id`, the insight.js loader
  snippet, and the `<noscript>` `<img>` pixel fallback (`px.ads.linkedin.com/collect/?pid=...`).
- **Kit (ConvertKit) subscribe form** — `src/consts.ts`, `KIT_SUBSCRIBE_FORM_ACTION`
  (form id `9823357`). Imported by `src/components/SubscribeForm.astro` and used as
  the `action` on both form variants (`primary` and `footer`). Swap the constant, not
  the component.
- **Booking/cal destination** — `src/consts.ts`, `BOOKING_URL`
  (`https://vitals-os.com/cal/book/discovery`, self-hosted). Import it; never hardcode
  a booking URL (see Content Rules above).

**UTM-forwarding contract on `BOOKING_URL`**: `BaseLayout.astro` injects an inline
script that reads `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, and
`utm_term` off the page URL and appends whichever are present onto every on-page link
whose `href` contains the `BOOKING_URL` host+pathname — unrecognized query params are
dropped, and if none of the UTM keys are present the booking link's `href` is left
untouched (no trailing `?`). This is intentional, tested behavior — `tests/utm-forwarding.spec.ts`
asserts it — not incidental. If you change how booking links are rendered or how
`BOOKING_URL` is constructed, re-run that spec.
