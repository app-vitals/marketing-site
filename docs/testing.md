# Testing

## The test layer

This is a static Astro site (no SSR, no server-side app code, no backend) —
there is no unit or integration test layer, and none is needed. The only
test layer is a **Playwright smoke suite** in `tests/`, run against a built
preview of the site:

- `tests/home.spec.ts` — the home page returns 200 and renders the expected
  hero heading.
- `tests/blog-index.spec.ts` — `/blog/` lists posts in strict descending
  date order, derived from the actual frontmatter on disk (not hardcoded
  slugs), so it stays correct as new posts are added.
- `tests/utm-forwarding.spec.ts` — UTM params on the page URL get forwarded
  onto the booking CTA links (`vitals-os.com/cal/book/discovery`) on
  `/products/shipwright/` and `/contact/`, only recognized params are
  forwarded, and hrefs are left unchanged when no UTM params are present.
- `tests/linkedin-insight-tag.spec.ts` — the LinkedIn Insight Tag on `/`
  uses the correct partner ID and not a stale/wrong one.

## Running tests

```bash
npm test
```

This runs `playwright test` (see `package.json`). Per `playwright.config.ts`,
the Playwright `webServer` config runs `npm run build && npx astro preview`
on port 4321 and waits for it to be ready before running specs against
`http://localhost:4321` — you don't need to build or start a server
yourself first. Tests run against a single `chromium` project, retries are
off, and tracing is off.

On a fresh environment (e.g. a new CI runner or a machine that's never run
Playwright before), install the browser binary first:

```bash
npx playwright install --with-deps chromium
```

## The `fixtures.ts` network-stubbing convention

Every spec imports `test`/`expect` from `./fixtures` (`tests/fixtures.ts`)
instead of `@playwright/test` directly:

```ts
import { test, expect } from './fixtures';
```

`fixtures.ts` extends Playwright's base `page` fixture to stub network
requests to `fonts.googleapis.com`, `fonts.gstatic.com`, `api.fontshare.com`,
and `googletagmanager.com` — returning an empty 200 response — before any
test navigates.

**Why this matters:** CI runners have real network access (unlike some
sandboxed dev environments), so without this stub, every CI run would load
the real `gtag.js` from Google Tag Manager and the real LinkedIn Insight
Tag pixel, reporting Playwright's synthetic page loads as live traffic in
GA4 and skewing LinkedIn ad analytics. The font stubs exist for the same
reason (avoid unnecessary real requests) and as a side effect make runs
faster and less flaky.

**If you add a new page or a new tracking/analytics pixel:** import from
`./fixtures`, not `@playwright/test`, so this stubbing applies
automatically. If you add a new third-party domain that fires on page load
(another analytics vendor, another font CDN), add it to the route pattern
in `tests/fixtures.ts` rather than letting it leak through to the real
network in CI.

## CI wiring

`.github/workflows/ci.yml` runs on every PR into `main`, in a single
`build-lint-test` job. The relevant steps, in order:

1. **Remove broken google-chrome apt source** (`Remove broken google-chrome
   apt source (known GH Actions runner issue)`) — some GitHub Actions
   runners ship a broken `dl.google.com` apt source that breaks
   `apt-get`/Playwright's Chromium install; this step deletes those source
   list entries before installing anything. This is a workaround for a
   known runner issue, not something specific to this repo's code.
2. **Install Playwright chromium** (`npx playwright install --with-deps
   chromium`) — installs the Chromium binary and its OS-level dependencies.
3. **Playwright smoke** (`npm test`) — runs the full suite described above.

These three steps run after `npm run build` and `npm run check` (astro
check) in the same job, so a build or type error fails fast before the
browser install/test steps even run.
