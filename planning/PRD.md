# App Vitals Marketing Site — PRD

## Vision
Replace the current bare-bones GitHub Pages site with a professional Astro + Tailwind marketing site on Vercel that positions App Vitals as THE firm for enterprise AI adoption and engineering velocity.

## Current State
- 3-page site on GitHub Pages (Home, About, Contact)
- Minimal copy, no case studies, no social proof, no lead capture
- No analytics, no Search Console
- Doesn't reflect the Diary B positioning or 5Ps framework

## Target Audience (ICP)
- **Primary**: CTOs / VPs Engineering at Series B+ companies and enterprises (40-100+ person eng teams)
- **Secondary**: Engineering managers evaluating AI adoption strategies
- **Tertiary**: Individual contributors who recommend consultants upward

## Positioning
"We help engineering teams adopt AI to ship 2-3x faster — without lowering their standards."

Key differentiators:
1. **Champion-based adoption** — bottom-up through early adopters, not top-down mandates
2. **Context infrastructure** — build the foundation that makes AI tools actually useful (not just tool rollout)
3. **Week 1 delivery** — production code by Friday, not PowerPoints
4. **40+ years combined experience** at Uber, Alto, enterprise scale
5. **2-person team + AI** — startup velocity, enterprise quality

## Brand & Design
- **Tone**: Confident, direct, technical but accessible. No corporate fluff.
- **Palette**: Clean/modern. Suggest dark navy (#0F172A) + electric blue (#3B82F6) + white. Professional but not boring.
- **Typography**: Inter or similar clean sans-serif
- **Inspiration**: Linear.app, Vercel.com — clean, fast, developer-friendly aesthetic

## Pages

### 1. Homepage (`/`)
- Hero: Bold headline + subheadline + CTA (Book a Call)
- Social proof bar: Client logos or "Trusted by engineering teams at..." (anonymized if needed)
- 3 value props (Champion Enablement, Context Infrastructure, Week 1 Delivery)
- How We Work section (the 6-week pilot overview)
- Results/metrics section (anonymized case study snippets)
- Final CTA: Book a discovery call

### 2. About (`/about`)
- Dan + Dave bios with photos
- Company story: Why we started App Vitals
- Philosophy: "Move fast and build things that last"
- Background: Uber, Alto, enterprise experience
- The AI-native approach: 2 founders + AI assistants = 10-person output

### 3. Services (`/services`)
- **AI Champion Enablement**: 6-week pilot, identify champions, create organic adoption
- **AI-Native Infrastructure**: Context layer, Claude Code rollout, governance
- **Technical Leadership**: Staff/principal-level embedded engineers
- Each service: problem → approach → outcome → CTA

### 4. Case Studies (`/case-studies`)
- Template for anonymized case studies
- Placeholder for Client Theta (healthcare integration)
- Placeholder for future Diary B results
- Format: Challenge → Solution → Results → Quote

### 5. Blog (`/blog`)
- Content hub for LinkedIn reposts and longer-form thought leadership
- Categories: AI Adoption, Engineering Culture, Technical Leadership
- Initially empty or with 1-2 seed posts

### 6. Contact (`/contact`)
- Cal.com embed or link for discovery calls
- Contact form (simple, no email provider dependency — just forwards to email)
- Location: Remote-first, US-based

## Tech Stack
- **Framework**: Astro (static site generation)
- **Styling**: Tailwind CSS
- **Hosting**: Vercel (new App Vitals account)
- **Domain**: app-vitals.com
- **Analytics**: GA4 (new property)
- **Search Console**: Set up after launch

## Must-Haves (MVP)
- [ ] Professional design that matches positioning
- [ ] Mobile-responsive
- [ ] Fast (100 Lighthouse score target)
- [ ] SEO fundamentals (meta tags, OG images, sitemap, robots.txt)
- [ ] Cal.com integration for booking
- [ ] No pricing on site (qualify leads through calls)

## Must-NOT-Haves
- ❌ No client names without explicit permission
- ❌ No specific pricing or rates
- ❌ No email capture until provider chosen
- ❌ No dynamic API endpoints
- ❌ No AI chatbot on site

## Success Metrics
- Site live on app-vitals.com within 1 week
- Professional enough to send prospects to
- Positions App Vitals for Diary B enterprise sales
- Supports LinkedIn → Website → Cal.com funnel

## Content Sources
- `sanitized-goals/linkedin-app-vitals-overview.md` — company positioning
- `sanitized-goals/pitch-evolution.md` — messaging by audience
- `sanitized-goals/diary-b-learnings.md` — service descriptions
- `sanitized-goals/priestley-5ps-framework.md` — strategic framework
- `sanitized-goals/linkedin-personal-about.md` — Dave's personal bio
- `sanitized-goals/testimonial-client-theta-one-medical.md` — case study template
