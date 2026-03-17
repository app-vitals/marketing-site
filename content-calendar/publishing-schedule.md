# Content Calendar — SEO Blog Round 2

## Publishing Schedule

| Date | Day | Blog Post | LinkedIn Draft | Status |
|------|-----|-----------|---------------|--------|
| Mar 19, 2026 | Thursday | The AI Champion Playbook | Post 1 — "Your best AI adoption strategy is already sitting in your org" | Ready |
| Mar 21, 2026 | Saturday | How to Measure AI Adoption ROI | Post 2 — "77% of orgs can't measure ROI on AI" | Ready |
| Mar 24, 2026 | Tuesday | Code Review Is Your New Bottleneck | Post 3 — "We made developers 3x faster and nothing shipped faster" | Ready |
| Mar 26, 2026 | Thursday | Why Your AI Coding Assistant Is Just Fancy Autocomplete | Post 4 — "AI coding tools aren't broken. Your setup is." | Ready |
| Mar 28, 2026 | Saturday | The Velocity Engineering Playbook | Post 5 — "After 20 years in DevOps, here's the playbook" | Ready |

## Cadence
- **Blog posts:** Publish on the dates above (already dated in frontmatter)
- **LinkedIn posts:** Same day as blog publish, ideally morning PST (8-10am for best engagement)
- **Frequency:** 2 posts/week (Tue/Thu or Thu/Sat pattern)

## Blog URLs
1. https://app-vitals.com/blog/ai-champion-playbook/
2. https://app-vitals.com/blog/measure-ai-adoption-roi/
3. https://app-vitals.com/blog/code-review-bottleneck/
4. https://app-vitals.com/blog/ai-fancy-autocomplete/
5. https://app-vitals.com/blog/velocity-engineering-playbook/

## Internal Linking Network
All 5 new posts are internally linked to existing blog content (bidirectional). The Velocity Engineering Playbook serves as the pillar/hub page linking to everything.

## Post-Publish Checklist (per post)
- [ ] Merge PR #11 to main (publishes all 5 posts)
- [ ] Verify each post renders correctly on production
- [ ] Post LinkedIn draft on publish day
- [ ] Monitor Search Console for indexing (expect 1-3 days)
- [ ] Check impressions/clicks after 2 weeks

## Notes
- PR #11 on feat/seo-blog-round2 contains all 5 posts — merge deploys everything at once
- Posts are future-dated so they'll appear in chronological order on the blog
- LinkedIn drafts are in `content-calendar/linkedin-drafts.md` — copy/paste ready
- All posts have been internally linked to existing content (15 bidirectional links added)
