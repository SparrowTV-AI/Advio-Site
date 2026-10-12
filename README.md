# ADVIO website

Marketing site for ADVIO (formerly SparrowTV) — built with Next.js 15, Tailwind CSS v4, Motion and Lenis.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Home — cinematic hero + Apple-style scroll scenes |
| `/broadcasters`, `/distributors` | Audience pages |
| `/adglean` | Product / operating model |
| `/measurement` | Measurement approach |
| `/company` | About + team |
| `/model` | Opportunity calculator |
| `/contact` | Working-session request form |

## Where things live

- `src/lib/site.ts` — nav links, contact email, tagline
- `src/app/globals.css` — brand colors (navy / lime / cyan / electric blue) and type
- `src/components/home/*` — scroll scenes (HouseholdsScene, ConnectionScene, OperatingModel)
- `src/components/ui/Logo.tsx` — placeholder logo; replace with the official SVG in `public/brand/`

## Contact form email

Add these in Vercel → Project → Settings → Environment Variables:

- `RESEND_API_KEY` — from resend.com
- `CONTACT_TO` — inbox that receives requests
- `CONTACT_FROM` — optional, e.g. `ADVIO <hello@yourdomain>` (domain must be verified in Resend)

Without them, submissions are logged in Vercel's function logs.
