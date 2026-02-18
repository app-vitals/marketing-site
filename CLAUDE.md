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
- **Background**: Navy `#0F172A` (navy-900), `#1E293B` (navy-800)
- **Accent**: Electric blue `#3B82F6` (electric-500)
- **Text**: White on dark backgrounds, `text-gray-400` for secondary
- **Font**: Inter (Google Fonts)
- **Max width**: `max-w-6xl` (1152px)
- **Inspiration**: Linear.app, Vercel.com — clean, fast, developer-friendly

## Content Rules
- NO client names (anonymize everything)
- NO specific pricing or rates
- NO email capture forms
- Cal.com link for booking: https://cal.com/app-vitals/discovery
- Co-founders: Dan McAulay + Dave O'Dell

## Commands
```bash
npm run dev      # Local dev server
npm run build    # Production build
npm run preview  # Preview production build
```

## Deploy
```bash
source /home/pi/.openclaw/workspace/.secrets.env
npx vercel --prod --token "$VERCEL_TOKEN_APP_VITALS"
```
